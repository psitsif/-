import fallbackData from '../data/fallbackData.json';
import { resolveItemAssets, resolveListAssets } from './assetHelper';

// Determine API Base URL:
// 1. If VITE_API_URL is provided in environment, use it.
// 2. Otherwise default to relative '/api' (handled by Vite dev proxy or same-origin backend).
function getApiBase() {
  const envUrl = import.meta.env?.VITE_API_URL;
  if (!envUrl) return '/api';
  const trimmed = envUrl.trim().replace(/\/$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
}

const API_BASE = getApiBase();

// LocalStorage prefix for persisting client-side changes in static/offline demo mode
const STORAGE_PREFIX = 'psit_sif_static_';

function getLocalCollection(key, defaultData) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn(`[PSIT SIF] Error reading localStorage for ${key}:`, e);
  }
  return defaultData || [];
}

function setLocalCollection(key, data) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.warn(`[PSIT SIF] Error writing localStorage for ${key}:`, e);
  }
}

// Helper to get auth header
function getAuthHeaders() {
  const token = localStorage.getItem('psit_sif_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

// Resilient fetch wrapper:
// If the backend fails (404 on GitHub Pages/static hosting, network error, server down, or timeout),
// gracefully falls back to bundled static seed data.
async function safeFetch(url, options = {}, fallbackFn = null) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout for snappy UI
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      if (fallbackFn) {
        console.warn(`[PSIT SIF API] Request to ${url} returned ${res.status}. Falling back to static JSON data.`);
        return fallbackFn();
      }
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Request failed with status ${res.status}`);
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      if (fallbackFn) {
        console.warn(`[PSIT SIF API] Non-JSON response from ${url} (${contentType}). Falling back to static JSON data.`);
        return fallbackFn();
      }
    }

    return await res.json();
  } catch (err) {
    if (fallbackFn) {
      console.warn(`[PSIT SIF API] Connection to ${url} failed (${err.message}). Using bundled static fallback.`);
      return fallbackFn();
    }
    throw err;
  }
}

// ------------------------------------
// AUTHENTICATION
// ------------------------------------
export async function loginAdmin(email, password) {
  let res;
  try {
    res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error('Unable to reach the login server. Start or restart the backend, then try again.');
    }
    throw err;
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status >= 500) {
      throw new Error(`Login server error (${res.status}). Check the backend configuration and server logs.`);
    }
    throw new Error(data.error || 'Invalid email address or password.');
  }
  if (data.token) {
    localStorage.setItem('psit_sif_admin_token', data.token);
    localStorage.setItem('psit_sif_admin_user', JSON.stringify(data.admin));
  }
  return data;
}

export function logoutAdmin() {
  localStorage.removeItem('psit_sif_admin_token');
  localStorage.removeItem('psit_sif_admin_user');
}

export function getStoredAdmin() {
  try {
    const raw = localStorage.getItem('psit_sif_admin_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  const token = localStorage.getItem('psit_sif_admin_token');
  if (token?.startsWith('static-demo-token-')) {
    logoutAdmin();
    return false;
  }
  return !!token;
}

export async function getCurrentAdmin() {
  const res = await fetch(`${API_BASE}/auth/me`, { headers: getAuthHeaders() });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401) {
      logoutAdmin();
    }
    throw new Error(data.error || `Session verification failed with status ${res.status}.`);
  }
  return data;
}

// ------------------------------------
// STATS
// ------------------------------------
export async function getDashboardStats() {
  const data = await safeFetch(`${API_BASE}/stats`, {}, () => {
    const startups = getLocalStartups({ all: false });
    const events = getLocalEvents({ all: false });
    const programs = getLocalPrograms(false);
    const partners = getLocalPartners(false);
    const messages = getLocalCollection('messages', []);
    const unreadMessages = messages.filter(m => m.status === 'unread').length;
    return {
      startups: startups.length,
      events: events.length,
      programs: programs.length,
      partners: partners.length,
      unreadMessages
    };
  });
  return data;
}

// ------------------------------------
// STARTUPS
// ------------------------------------
export function getLocalStartups(params = {}) {
  let list = getLocalCollection('startups', fallbackData.startups);
  if (params.all !== 'true' && params.all !== true) {
    list = list.filter(s => s.published === 1 || s.published === undefined);
  }
  if (params.search) {
    const term = params.search.trim().toLowerCase();
    list = list.filter(s =>
      (s.name && s.name.toLowerCase().includes(term)) ||
      (s.founders && s.founders.toLowerCase().includes(term)) ||
      (s.industry && s.industry.toLowerCase().includes(term)) ||
      (s.description && s.description.toLowerCase().includes(term))
    );
  }
  if (params.industry && params.industry !== 'All') {
    const ind = params.industry.trim().toLowerCase();
    list = list.filter(s => s.industry && s.industry.toLowerCase().includes(ind));
  }
  if (params.stage && params.stage !== 'All') {
    const st = params.stage.trim().toLowerCase();
    list = list.filter(s => s.stage && s.stage.toLowerCase() === st);
  }
  return resolveListAssets(list);
}

export async function getStartups(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.industry && params.industry !== 'All') query.append('industry', params.industry);
  if (params.stage && params.stage !== 'All') query.append('stage', params.stage);
  if (params.all) query.append('all', 'true');

  const data = await safeFetch(
    `${API_BASE}/startups?${query.toString()}`,
    {},
    () => getLocalStartups(params)
  );
  return resolveListAssets(data);
}

export async function getStartupById(idOrSlug) {
  const data = await safeFetch(
    `${API_BASE}/startups/${idOrSlug}`,
    {},
    () => {
      const startups = getLocalStartups({ all: true });
      const found = startups.find(s => String(s.id) === String(idOrSlug) || s.slug === idOrSlug);
      if (!found) throw new Error('Startup not found.');
      return found;
    }
  );
  return resolveItemAssets(data);
}

export async function createStartup(data) {
  return safeFetch(
    `${API_BASE}/startups`,
    {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    },
    () => {
      const list = getLocalCollection('startups', fallbackData.startups);
      const newId = Date.now();
      const newStartup = {
        ...data,
        id: newId,
        slug: (data.name || 'startup').toLowerCase().replace(/\s+/g, '-') + '-' + newId,
        published: 1,
        created_at: new Date().toISOString()
      };
      list.unshift(newStartup);
      setLocalCollection('startups', list);
      return resolveItemAssets(newStartup);
    }
  );
}

export async function updateStartup(id, data) {
  return safeFetch(
    `${API_BASE}/startups/${id}`,
    {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    },
    () => {
      const list = getLocalCollection('startups', fallbackData.startups);
      const idx = list.findIndex(s => String(s.id) === String(id));
      if (idx === -1) throw new Error('Startup not found.');
      const updated = { ...list[idx], ...data };
      list[idx] = updated;
      setLocalCollection('startups', list);
      return resolveItemAssets(updated);
    }
  );
}

export async function deleteStartup(id) {
  return safeFetch(
    `${API_BASE}/startups/${id}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders()
    },
    () => {
      let list = getLocalCollection('startups', fallbackData.startups);
      list = list.filter(s => String(s.id) !== String(id));
      setLocalCollection('startups', list);
      return { success: true, message: 'Startup removed successfully (static mode).' };
    }
  );
}

// ------------------------------------
// EVENTS
// ------------------------------------
export function getLocalEvents(params = {}) {
  let list = getLocalCollection('events', fallbackData.events);
  if (params.all !== 'true' && params.all !== true) {
    list = list.filter(e => e.published === 1 || e.published === undefined);
  }
  if (params.year && params.year !== 'All') {
    list = list.filter(e => e.year === params.year.trim());
  }
  if (params.featured === '1' || params.featured === true || params.featured === 'true') {
    list = list.filter(e => e.featured === 1 || e.featured === true);
  }
  if (params.type && params.type !== 'All') {
    const tp = params.type.trim().toLowerCase();
    list = list.filter(e => e.type && e.type.toLowerCase().includes(tp));
  }
  if (params.theme && params.theme !== 'All') {
    const th = params.theme.trim().toLowerCase();
    list = list.filter(e => e.theme && e.theme.toLowerCase().includes(th));
  }
  if (params.search) {
    const term = params.search.trim().toLowerCase();
    list = list.filter(e =>
      (e.title && e.title.toLowerCase().includes(term)) ||
      (e.description && e.description.toLowerCase().includes(term)) ||
      (e.speakers && e.speakers.toLowerCase().includes(term)) ||
      (e.venue && e.venue.toLowerCase().includes(term))
    );
  }
  return resolveListAssets(list);
}

export async function getEvents(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.append('search', params.search);
  if (params.year && params.year !== 'All') query.append('year', params.year);
  if (params.type && params.type !== 'All') query.append('type', params.type);
  if (params.theme && params.theme !== 'All') query.append('theme', params.theme);
  if (params.featured) query.append('featured', '1');
  if (params.all) query.append('all', 'true');

  const data = await safeFetch(
    `${API_BASE}/events?${query.toString()}`,
    {},
    () => getLocalEvents(params)
  );
  return resolveListAssets(data);
}

export async function getEventById(idOrSlug) {
  const data = await safeFetch(
    `${API_BASE}/events/${idOrSlug}`,
    {},
    () => {
      const events = getLocalEvents({ all: true });
      const found = events.find(e => String(e.id) === String(idOrSlug) || e.slug === idOrSlug);
      if (!found) throw new Error('Event not found.');
      return found;
    }
  );
  return resolveItemAssets(data);
}

export async function createEvent(data) {
  return safeFetch(
    `${API_BASE}/events`,
    {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    },
    () => {
      const list = getLocalCollection('events', fallbackData.events);
      const newId = Date.now();
      const newEvent = {
        ...data,
        id: newId,
        slug: (data.title || 'event').toLowerCase().replace(/\s+/g, '-') + '-' + newId,
        published: 1,
        featured: data.featured ? 1 : 0,
        created_at: new Date().toISOString()
      };
      list.unshift(newEvent);
      setLocalCollection('events', list);
      return resolveItemAssets(newEvent);
    }
  );
}

export async function updateEvent(id, data) {
  return safeFetch(
    `${API_BASE}/events/${id}`,
    {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    },
    () => {
      const list = getLocalCollection('events', fallbackData.events);
      const idx = list.findIndex(e => String(e.id) === String(id));
      if (idx === -1) throw new Error('Event not found.');
      const updated = { ...list[idx], ...data };
      list[idx] = updated;
      setLocalCollection('events', list);
      return resolveItemAssets(updated);
    }
  );
}

export async function togglePublishEvent(id) {
  return safeFetch(
    `${API_BASE}/events/${id}/publish`,
    {
      method: 'PATCH',
      headers: getAuthHeaders()
    },
    () => {
      const list = getLocalCollection('events', fallbackData.events);
      const idx = list.findIndex(e => String(e.id) === String(id));
      if (idx === -1) throw new Error('Event not found.');
      const newStatus = list[idx].published === 1 ? 0 : 1;
      list[idx].published = newStatus;
      setLocalCollection('events', list);
      return { id, published: newStatus };
    }
  );
}

export async function deleteEvent(id) {
  return safeFetch(
    `${API_BASE}/events/${id}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders()
    },
    () => {
      let list = getLocalCollection('events', fallbackData.events);
      list = list.filter(e => String(e.id) !== String(id));
      setLocalCollection('events', list);
      return { success: true, message: 'Event deleted successfully (static mode).' };
    }
  );
}

// ------------------------------------
// PROGRAMS
// ------------------------------------
export function getLocalPrograms(all = false) {
  let list = getLocalCollection('programs', fallbackData.programs);
  if (!all) {
    list = list.filter(p => p.published === 1 || p.published === undefined);
  }
  return resolveListAssets(list);
}

export async function getPrograms(all = false) {
  const data = await safeFetch(
    `${API_BASE}/programs${all ? '?all=true' : ''}`,
    {},
    () => getLocalPrograms(all)
  );
  return resolveListAssets(data);
}

export async function createProgram(data) {
  return safeFetch(
    `${API_BASE}/programs`,
    {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    },
    () => {
      const list = getLocalCollection('programs', fallbackData.programs);
      const newId = Date.now();
      const newProgram = {
        ...data,
        id: newId,
        slug: (data.title || 'program').toLowerCase().replace(/\s+/g, '-') + '-' + newId,
        published: 1,
        created_at: new Date().toISOString()
      };
      list.push(newProgram);
      setLocalCollection('programs', list);
      return resolveItemAssets(newProgram);
    }
  );
}

export async function updateProgram(id, data) {
  return safeFetch(
    `${API_BASE}/programs/${id}`,
    {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    },
    () => {
      const list = getLocalCollection('programs', fallbackData.programs);
      const idx = list.findIndex(p => String(p.id) === String(id));
      if (idx === -1) throw new Error('Program not found.');
      const updated = { ...list[idx], ...data };
      list[idx] = updated;
      setLocalCollection('programs', list);
      return resolveItemAssets(updated);
    }
  );
}

export async function deleteProgram(id) {
  return safeFetch(
    `${API_BASE}/programs/${id}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders()
    },
    () => {
      let list = getLocalCollection('programs', fallbackData.programs);
      list = list.filter(p => String(p.id) !== String(id));
      setLocalCollection('programs', list);
      return { success: true };
    }
  );
}

// ------------------------------------
// PARTNERS
// ------------------------------------
export function getLocalPartners(all = false) {
  let list = getLocalCollection('partners', fallbackData.partners);
  if (!all) {
    list = list.filter(p => p.published === 1 || p.published === undefined);
  }
  return resolveListAssets(list);
}

export async function getPartners(all = false) {
  const data = await safeFetch(
    `${API_BASE}/partners${all ? '?all=true' : ''}`,
    {},
    () => getLocalPartners(all)
  );
  return resolveListAssets(data);
}

export async function createPartner(data) {
  return safeFetch(
    `${API_BASE}/partners`,
    {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    },
    () => {
      const list = getLocalCollection('partners', fallbackData.partners);
      const newPartner = { ...data, id: Date.now(), published: 1 };
      list.push(newPartner);
      setLocalCollection('partners', list);
      return resolveItemAssets(newPartner);
    }
  );
}

export async function updatePartner(id, data) {
  return safeFetch(
    `${API_BASE}/partners/${id}`,
    {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    },
    () => {
      const list = getLocalCollection('partners', fallbackData.partners);
      const idx = list.findIndex(p => String(p.id) === String(id));
      if (idx === -1) throw new Error('Partner not found.');
      const updated = { ...list[idx], ...data };
      list[idx] = updated;
      setLocalCollection('partners', list);
      return resolveItemAssets(updated);
    }
  );
}

export async function deletePartner(id) {
  return safeFetch(
    `${API_BASE}/partners/${id}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders()
    },
    () => {
      let list = getLocalCollection('partners', fallbackData.partners);
      list = list.filter(p => String(p.id) !== String(id));
      setLocalCollection('partners', list);
      return { success: true };
    }
  );
}

// ------------------------------------
// TEAM
// ------------------------------------
export function getLocalTeam(category = '', all = false) {
  let list = getLocalCollection('team', fallbackData.team);
  if (!all) {
    list = list.filter(t => t.published === 1 || t.published === undefined);
  }
  if (category) {
    list = list.filter(t => t.category === category);
  }
  return resolveListAssets(list);
}

export async function getTeam(category = '', all = false) {
  const query = new URLSearchParams();
  if (category) query.append('category', category);
  if (all) query.append('all', 'true');
  const data = await safeFetch(
    `${API_BASE}/team?${query.toString()}`,
    {},
    () => getLocalTeam(category, all)
  );
  return resolveListAssets(data);
}

export async function createTeamMember(data) {
  return safeFetch(
    `${API_BASE}/team`,
    {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    },
    () => {
      const list = getLocalCollection('team', fallbackData.team);
      const newMember = { ...data, id: Date.now(), published: 1 };
      list.push(newMember);
      setLocalCollection('team', list);
      return resolveItemAssets(newMember);
    }
  );
}

export async function updateTeamMember(id, data) {
  return safeFetch(
    `${API_BASE}/team/${id}`,
    {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    },
    () => {
      const list = getLocalCollection('team', fallbackData.team);
      const idx = list.findIndex(t => String(t.id) === String(id));
      if (idx === -1) throw new Error('Team member not found.');
      const updated = { ...list[idx], ...data };
      list[idx] = updated;
      setLocalCollection('team', list);
      return resolveItemAssets(updated);
    }
  );
}

export async function deleteTeamMember(id) {
  return safeFetch(
    `${API_BASE}/team/${id}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders()
    },
    () => {
      let list = getLocalCollection('team', fallbackData.team);
      list = list.filter(t => String(t.id) !== String(id));
      setLocalCollection('team', list);
      return { success: true };
    }
  );
}

// ------------------------------------
// FACILITIES
// ------------------------------------
export function getLocalFacilities(category = '', all = false) {
  let list = getLocalCollection('facilities', fallbackData.facilities);
  if (!all) {
    list = list.filter(f => f.published === 1 || f.published === undefined);
  }
  if (category) {
    list = list.filter(f => f.category === category);
  }
  return resolveListAssets(list);
}

export async function getFacilities(category = '', all = false) {
  const query = new URLSearchParams();
  if (category) query.append('category', category);
  if (all) query.append('all', 'true');
  const data = await safeFetch(
    `${API_BASE}/facilities?${query.toString()}`,
    {},
    () => getLocalFacilities(category, all)
  );
  return resolveListAssets(data);
}

export async function createFacility(data) {
  return safeFetch(
    `${API_BASE}/facilities`,
    {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    },
    () => {
      const list = getLocalCollection('facilities', fallbackData.facilities);
      const newFacility = { ...data, id: Date.now(), published: 1 };
      list.push(newFacility);
      setLocalCollection('facilities', list);
      return resolveItemAssets(newFacility);
    }
  );
}

export async function updateFacility(id, data) {
  return safeFetch(
    `${API_BASE}/facilities/${id}`,
    {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    },
    () => {
      const list = getLocalCollection('facilities', fallbackData.facilities);
      const idx = list.findIndex(f => String(f.id) === String(id));
      if (idx === -1) throw new Error('Facility not found.');
      const updated = { ...list[idx], ...data };
      list[idx] = updated;
      setLocalCollection('facilities', list);
      return resolveItemAssets(updated);
    }
  );
}

export async function deleteFacility(id) {
  return safeFetch(
    `${API_BASE}/facilities/${id}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders()
    },
    () => {
      let list = getLocalCollection('facilities', fallbackData.facilities);
      list = list.filter(f => String(f.id) !== String(id));
      setLocalCollection('facilities', list);
      return { success: true };
    }
  );
}

// ------------------------------------
// SUCCESS STORIES
// ------------------------------------
export async function getSuccessStories() {
  const data = await safeFetch(
    `${API_BASE}/success-stories`,
    {},
    () => {
      const list = getLocalCollection('successStories', fallbackData.successStories);
      return list.filter(s => s.published === 1 || s.published === undefined);
    }
  );
  return resolveListAssets(data);
}

// ------------------------------------
// CONTACT MESSAGES
// ------------------------------------
export async function sendContactMessage(formData) {
  return safeFetch(
    `${API_BASE}/messages`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    },
    () => {
      const messages = getLocalCollection('messages', []);
      messages.unshift({
        ...formData,
        id: Date.now(),
        status: 'unread',
        created_at: new Date().toISOString()
      });
      setLocalCollection('messages', messages);
      return { success: true, message: 'Message sent successfully!' };
    }
  );
}

export async function getContactMessages() {
  return safeFetch(
    `${API_BASE}/messages`,
    { headers: getAuthHeaders() },
    () => getLocalCollection('messages', [])
  );
}

export async function updateMessageStatus(id, status) {
  return safeFetch(
    `${API_BASE}/messages/${id}/status`,
    {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    },
    () => {
      const messages = getLocalCollection('messages', []);
      const idx = messages.findIndex(m => String(m.id) === String(id));
      if (idx !== -1) {
        messages[idx].status = status;
        setLocalCollection('messages', messages);
      }
      return { success: true };
    }
  );
}

export async function deleteMessage(id) {
  return safeFetch(
    `${API_BASE}/messages/${id}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders()
    },
    () => {
      let messages = getLocalCollection('messages', []);
      messages = messages.filter(m => String(m.id) !== String(id));
      setLocalCollection('messages', messages);
      return { success: true };
    }
  );
}

// ------------------------------------
// FILE UPLOADS
// ------------------------------------
export async function uploadImage(file) {
  const token = localStorage.getItem('psit_sif_admin_token');
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: formData
    });
    if (!res.ok) throw new Error('Upload failed');
    return await res.json();
  } catch {
    console.warn('[PSIT SIF API] Image upload backend unavailable. Converting to data URL for static demo.');
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ url: reader.result, filename: file.name });
      reader.readAsDataURL(file);
    });
  }
}

export async function uploadImages(files) {
  const token = localStorage.getItem('psit_sif_admin_token');
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  try {
    const res = await fetch(`${API_BASE}/upload-multiple`, {
      method: 'POST',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: formData
    });
    if (!res.ok) throw new Error('Upload failed');
    return await res.json();
  } catch {
    console.warn('[PSIT SIF API] Multi-image upload backend unavailable. Converting to data URLs for static demo.');
    const promises = Array.from(files).map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ url: reader.result, filename: file.name });
        reader.readAsDataURL(file);
      });
    });
    const results = await Promise.all(promises);
    return { urls: results.map(r => r.url) };
  }
}
