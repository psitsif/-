import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  isAuthenticated, logoutAdmin, getCurrentAdmin, getDashboardStats,
  getEvents, createEvent, updateEvent, togglePublishEvent, deleteEvent,
  getStartups, createStartup, updateStartup, deleteStartup,
  getPrograms, createProgram, updateProgram,
  getPartners, createPartner, updatePartner,
  getTeam, createTeamMember, updateTeamMember,
  getFacilities, createFacility, updateFacility,
  getContactMessages, updateMessageStatus, deleteMessage,
  uploadImage, uploadImages
} from '../../lib/api';
import {
  Calendar, Building, Award, Users, Mail, Plus, Edit2, Trash2,
  Search, ExternalLink, LogOut,
  X, Save, ArrowUpRight, Loader2, Upload, Camera, Image
} from 'lucide-react';
import psifLogo from '../../assets/psif_logo_2.png';

const EVENT_ACADEMIC_YEARS = ['2026-27', '2025-26', '2024-25'];
const EVENT_LEVELS = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level Q3', 'Level Q4', 'National'];

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('events');
  const [stats, setStats] = useState({ startups: 0, events: 0, programs: 0, partners: 0, unreadMessages: 0 });
  const [loading, setLoading] = useState(true);

  // Tab Data States
  const [events, setEvents] = useState([]);
  const [startups, setStartups] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [partners, setPartners] = useState([]);
  const [team, setTeam] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [messages, setMessages] = useState([]);

  // Search
  const [searchTerm, setSearchTerm] = useState('');

  // Modals & Uploads
  const [modalState, setModalState] = useState({ open: false, type: '', mode: 'create', data: null });
  const [actionLoading, setActionLoading] = useState(false);
  const [imageValue, setImageValue] = useState('');
  const [photosList, setPhotosList] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  const openModal = (type, mode, data = null) => {
    setImageValue(data?.image || data?.logo || '');
    setPhotosList(Array.isArray(data?.photos) ? data.photos : []);
    setModalState({ open: true, type, mode, data });
  };

  const handleSingleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      const res = await uploadImage(file);
      if (res.url) {
        setImageValue(res.url);
      }
    } catch (err) {
      alert(err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleMultiplePhotosUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      setUploadingPhotos(true);
      const res = await uploadImages(files);
      if (res.urls && Array.isArray(res.urls)) {
        setPhotosList(prev => [...prev, ...res.urls]);
      }
    } catch (err) {
      alert(err.message || 'Photos upload failed');
    } finally {
      setUploadingPhotos(false);
      e.target.value = '';
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotosList(prev => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
      return;
    }

    let cancelled = false;
    async function initializeDashboard() {
      try {
        const admin = await getCurrentAdmin();
        if (cancelled) return;
        setCurrentAdmin(admin);
        await loadAllData();
      } catch (err) {
        if (cancelled) return;
        console.error('Failed to verify admin session:', err);
        if (!isAuthenticated()) {
          navigate('/admin/login');
        }
      }
    }

    initializeDashboard();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  async function loadAllData() {
    try {
      setLoading(true);
      const [sData, evData, stData, prData, ptData, tmData, fcData, msgData] = await Promise.all([
        getDashboardStats(),
        getEvents({ all: true }),
        getStartups({ all: true }),
        getPrograms(true),
        getPartners(true),
        getTeam('', true),
        getFacilities('', true),
        getContactMessages()
      ]);
      setStats(sData);
      setEvents(evData);
      setStartups(stData);
      setPrograms(prData);
      setPartners(ptData);
      setTeam(tmData);
      setFacilities(fcData);
      setMessages(msgData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  // ------------------------------------
  // EVENT ACTIONS
  // ------------------------------------
  const handleTogglePublishEvent = async (id) => {
    try {
      const res = await togglePublishEvent(id);
      setEvents(prev => prev.map(e => e.id === id ? { ...e, published: res.published } : e));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteEvent = async (id, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete event: "${title}"?`)) return;
    try {
      await deleteEvent(id);
      setEvents(prev => prev.filter(e => e.id !== id));
      setStats(prev => ({ ...prev, events: Math.max(0, prev.events - 1) }));
    } catch (err) {
      alert(err.message);
    }
  };

  // ------------------------------------
  // STARTUP ACTIONS
  // ------------------------------------
  const handleDeleteStartup = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete startup: "${name}"?`)) return;
    try {
      await deleteStartup(id);
      setStartups(prev => prev.filter(s => s.id !== id));
      setStats(prev => ({ ...prev, startups: Math.max(0, prev.startups - 1) }));
    } catch (err) {
      alert(err.message);
    }
  };

  // ------------------------------------
  // MESSAGE ACTIONS
  // ------------------------------------
  const handleToggleMessageStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'read' ? 'unread' : 'read';
    try {
      await updateMessageStatus(id, newStatus);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
      setStats(prev => ({
        ...prev,
        unreadMessages: newStatus === 'unread' ? prev.unreadMessages + 1 : Math.max(0, prev.unreadMessages - 1)
      }));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this inquiry message?')) return;
    try {
      await deleteMessage(id);
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // ------------------------------------
  // MODAL SAVE
  // ------------------------------------
  const handleModalSave = async (formData) => {
    setActionLoading(true);
    try {
      if (modalState.type === 'event') {
        if (modalState.mode === 'create') {
          const created = await createEvent(formData);
          setEvents(prev => [created, ...prev]);
        } else {
          const updated = await updateEvent(modalState.data.id, formData);
          setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
        }
      } else if (modalState.type === 'startup') {
        if (modalState.mode === 'create') {
          const created = await createStartup(formData);
          setStartups(prev => [created, ...prev]);
        } else {
          const updated = await updateStartup(modalState.data.id, formData);
          setStartups(prev => prev.map(s => s.id === updated.id ? updated : s));
        }
      } else if (modalState.type === 'program') {
        if (modalState.mode === 'create') {
          const created = await createProgram(formData);
          setPrograms(prev => [created, ...prev]);
        } else {
          const updated = await updateProgram(modalState.data.id, formData);
          setPrograms(prev => prev.map(p => p.id === updated.id ? updated : p));
        }
      } else if (modalState.type === 'partner') {
        if (modalState.mode === 'create') {
          const created = await createPartner(formData);
          setPartners(prev => [created, ...prev]);
        } else {
          const updated = await updatePartner(modalState.data.id, formData);
          setPartners(prev => prev.map(p => p.id === updated.id ? updated : p));
        }
      } else if (modalState.type === 'team') {
        if (modalState.mode === 'create') {
          const created = await createTeamMember(formData);
          setTeam(prev => [created, ...prev]);
        } else {
          const updated = await updateTeamMember(modalState.data.id, formData);
          setTeam(prev => prev.map(t => t.id === updated.id ? updated : t));
        }
      } else if (modalState.type === 'facility') {
        if (modalState.mode === 'create') {
          const created = await createFacility(formData);
          setFacilities(prev => [created, ...prev]);
        } else {
          const updated = await updateFacility(modalState.data.id, formData);
          setFacilities(prev => prev.map(f => f.id === updated.id ? updated : f));
        }
      }
      setModalState({ open: false, type: '', mode: 'create', data: null });
    } catch (err) {
      alert(err.message || 'Operation failed');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-inter">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-4">
          <Link to="/" className="bg-slate-50 border border-slate-200 p-1.5 rounded-xl flex items-center shrink-0">
            <img src={psifLogo} alt="PSIT SIF" className="h-8 w-auto object-contain" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-slate-900 font-bold text-sm font-outfit">PSIT SIF</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                CMS ADMIN
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Welcome, {currentAdmin?.name || 'Administrator'} ({currentAdmin?.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            Public Site <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow p-6 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-outfit text-slate-900">{stats.startups}</div>
              <div className="text-xs text-slate-500 font-medium">Incubated Startups</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-outfit text-slate-900">{stats.events}</div>
              <div className="text-xs text-slate-500 font-medium">Managed Events</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 border border-purple-100">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-outfit text-slate-900">{stats.programs}</div>
              <div className="text-xs text-slate-500 font-medium">Flagship Programs</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold font-outfit text-slate-900">{stats.partners}</div>
              <div className="text-xs text-slate-500 font-medium">Partners</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 border border-rose-100 relative">
              <Mail className="w-5 h-5" />
              {stats.unreadMessages > 0 && (
                <span className="w-2.5 h-2.5 bg-rose-500 rounded-full absolute -top-0.5 -right-0.5 animate-ping" />
              )}
            </div>
            <div>
              <div className="text-2xl font-bold font-outfit text-slate-900">{stats.unreadMessages}</div>
              <div className="text-xs text-slate-500 font-medium">Unread Inquiries</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'events', label: 'Events Manager', count: events.length },
            { id: 'startups', label: 'Startups Directory', count: startups.length },
            { id: 'programs', label: 'Programs', count: programs.length },
            { id: 'partners', label: 'Partners', count: partners.length },
            { id: 'team', label: 'Team & Dignitaries', count: team.length },
            { id: 'facilities', label: 'Facilities', count: facilities.length },
            { id: 'messages', label: 'Contact Inquiries', count: messages.filter(m => m.status === 'unread').length, alert: true }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearchTerm(''); }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                tab.alert && tab.count > 0 ? 'bg-rose-600 text-white font-bold' : 'bg-slate-100 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Tab Body */}
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-500">Loading CMS records...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`Search ${activeTab}...`}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {activeTab !== 'messages' && (
                <button
                  onClick={() => openModal(activeTab.replace(/s$/, ''), 'create', null)}
                  className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add New {activeTab.slice(0, -1)}
                </button>
              )}
            </div>

            {/* TAB: EVENTS */}
            {activeTab === 'events' && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4">Event & Photos</th>
                        <th className="py-3.5 px-4">Year</th>
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-4">Activity Type</th>
                        <th className="py-3.5 px-4">Level</th>
                        <th className="py-3.5 px-4 text-center">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {events
                        .filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(e => (
                          <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-sm">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                                  {e.image ? (
                                    <img src={e.image} alt={e.title} className="w-full h-full object-cover" />
                                  ) : (
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                  )}
                                </div>
                                <div>
                                  <div className="line-clamp-1">{e.title}</div>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    {e.featured === 1 && (
                                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                        Flagship
                                      </span>
                                    )}
                                    {Array.isArray(e.photos) && e.photos.length > 0 && (
                                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1">
                                        <Camera className="w-2.5 h-2.5" /> {e.photos.length} photo{e.photos.length > 1 ? 's' : ''}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 font-medium">{e.year}</td>
                            <td className="py-3.5 px-4 text-slate-600 font-medium">{e.date || e.month}</td>
                            <td className="py-3.5 px-4 text-slate-500">{e.type}</td>
                            <td className="py-3.5 px-4 text-slate-600 font-medium">{e.level || 'Level 1'}</td>
                            <td className="py-3.5 px-4 text-center">
                              <button
                                onClick={() => handleTogglePublishEvent(e.id)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                                  e.published === 1
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                                    : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                                }`}
                              >
                                {e.published === 1 ? 'Published' : 'Hidden'}
                              </button>
                            </td>
                            <td className="py-3.5 px-4 text-right space-x-2">
                              <button
                                onClick={() => openModal('event', 'edit', e)}
                                className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteEvent(e.id, e.title)}
                                className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: STARTUPS */}
            {activeTab === 'startups' && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4">Company Name & Logo</th>
                        <th className="py-3.5 px-4">Founders</th>
                        <th className="py-3.5 px-4">Sector</th>
                        <th className="py-3.5 px-4">Stage</th>
                        <th className="py-3.5 px-4">Website</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {startups
                        .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || (s.founders && s.founders.toLowerCase().includes(searchTerm.toLowerCase())))
                        .map(s => (
                          <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-slate-900">
                              <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0">
                                  {s.logo ? (
                                    <img src={s.logo} alt={s.name} className="max-h-12 w-auto object-contain" />
                                  ) : (
                                    <Building className="w-5 h-5 text-slate-400" />
                                  )}
                                </div>
                                <div>
                                  <div className="font-bold">{s.name}</div>
                                  {Array.isArray(s.photos) && s.photos.length > 0 && (
                                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1 mt-0.5">
                                      <Camera className="w-2.5 h-2.5" /> {s.photos.length} photo{s.photos.length > 1 ? 's' : ''}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600">{s.founders}</td>
                            <td className="py-3.5 px-4 text-slate-500">{s.industry}</td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                                {s.stage}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-slate-500">
                              {s.website ? (
                                <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold">
                                  {s.website.replace('https://', '')} <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : <span className="text-slate-400 italic">—</span>}
                            </td>
                            <td className="py-3.5 px-4 text-right space-x-2">
                              <button
                                onClick={() => openModal('startup', 'edit', s)}
                                className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteStartup(s.id, s.name)}
                                className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 rounded-lg"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: PROGRAMS */}
            {activeTab === 'programs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programs.map(p => (
                  <div key={p.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0">
                          {p.image ? (
                            <img src={p.image} alt={p.title} className="w-full h-full object-contain" />
                          ) : (
                            <Award className="w-6 h-6 text-emerald-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900 font-outfit">{p.title}</h4>
                          {Array.isArray(p.photos) && p.photos.length > 0 && (
                            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1 mt-0.5">
                              <Camera className="w-2.5 h-2.5" /> {p.photos.length} photo{p.photos.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => openModal('program', 'edit', p)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{p.description}</p>
                    <div className="text-[11px] text-emerald-700 font-bold">{p.status}</div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: PARTNERS */}
            {activeTab === 'partners' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {partners.map(pt => (
                  <div key={pt.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0">
                          {pt.logo ? (
                            <img src={pt.logo} alt={pt.name} className="max-h-10 w-auto object-contain" />
                          ) : (
                            <Building className="w-6 h-6 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{pt.name}</h4>
                          <span className="text-[10px] text-emerald-700 uppercase font-bold">{pt.category}</span>
                          {Array.isArray(pt.photos) && pt.photos.length > 0 && (
                            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-flex items-center gap-1 mt-0.5 block">
                              <Camera className="w-2.5 h-2.5" /> {pt.photos.length} photo{pt.photos.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => openModal('partner', 'edit', pt)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{pt.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: TEAM */}
            {activeTab === 'team' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map(m => (
                  <div key={m.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{m.name}</h4>
                      <p className="text-xs text-slate-600">{m.position}</p>
                      <span className="text-[10px] text-emerald-700 uppercase font-bold">{m.category}</span>
                    </div>
                    <button
                      onClick={() => openModal('team', 'edit', m)}
                      className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: FACILITIES */}
            {activeTab === 'facilities' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map(f => (
                  <div key={f.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900 text-sm">{f.title}</h4>
                      <button
                        onClick={() => openModal('facility', 'edit', f)}
                        className="p-1.5 text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{f.description}</p>
                    <span className="inline-block text-[10px] font-bold text-emerald-700 uppercase">{f.category}</span>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: CONTACT INQUIRIES */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-4">From</th>
                        <th className="py-3.5 px-4">Subject</th>
                        <th className="py-3.5 px-4">Message Preview</th>
                        <th className="py-3.5 px-4 text-center">Status</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {messages.map(m => (
                        <tr key={m.id} className={`hover:bg-slate-50/80 transition-colors ${m.status === 'unread' ? 'bg-emerald-50/30' : ''}`}>
                          <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                            {new Date(m.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{m.name}</div>
                            <div className="text-slate-500 text-[11px]">{m.email}</div>
                            {m.phone && <div className="text-slate-400 text-[10px]">{m.phone}</div>}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-700">{m.subject}</td>
                          <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">{m.message}</td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => handleToggleMessageStatus(m.id, m.status)}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                m.status === 'unread'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                            >
                              {m.status}
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => alert(`From: ${m.name} (${m.email})\nPhone: ${m.phone || 'None'}\nSubject: ${m.subject}\n\nMessage:\n${m.message}`)}
                              className="p-1.5 text-slate-700 hover:text-slate-900 bg-slate-100 rounded-lg text-xs"
                              title="Read Message"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDeleteMessage(m.id)}
                              className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 rounded-lg"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {messages.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-500">
                            No contact messages received yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL FOR ADD / EDIT */}
      {modalState.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-xl shadow-2xl my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 font-outfit capitalize">
                {modalState.mode} {modalState.type}
              </h3>
              <button
                onClick={() => setModalState({ open: false, type: '', mode: 'create', data: null })}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const obj = Object.fromEntries(fd.entries());
                if (['event', 'program', 'facility', 'team'].includes(modalState.type)) {
                  obj.image = imageValue;
                }
                if (['startup', 'partner'].includes(modalState.type)) {
                  obj.logo = imageValue;
                }
                if (['event', 'startup', 'program', 'partner'].includes(modalState.type)) {
                  obj.photos = photosList;
                }
                handleModalSave(obj);
              }}
              className="space-y-4 text-xs max-h-[80vh] overflow-y-auto pr-1"
            >
              {modalState.type === 'event' && (
                <>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Title *</label>
                    <input name="title" defaultValue={modalState.data?.title || ''} required className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 uppercase font-bold mb-1">Academic Year</label>
                      <select name="year" defaultValue={modalState.data?.year || EVENT_ACADEMIC_YEARS[0]} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900">
                        {modalState.mode === 'edit' && modalState.data?.year && !EVENT_ACADEMIC_YEARS.includes(modalState.data.year) && (
                          <option value={modalState.data.year}>{modalState.data.year} (existing event)</option>
                        )}
                        {EVENT_ACADEMIC_YEARS.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 uppercase font-bold mb-1">Date</label>
                      <input name="date" defaultValue={modalState.data?.date || ''} placeholder="e.g. 15-11-2024" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 uppercase font-bold mb-1">Activity Type</label>
                      <input name="type" defaultValue={modalState.data?.type || 'Workshop'} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                    </div>
                    <div>
                      <label className="block text-slate-700 uppercase font-bold mb-1">Theme</label>
                      <input name="theme" defaultValue={modalState.data?.theme || 'Start up & Innovation'} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Event Level</label>
                    <select
                      name="level"
                      defaultValue={modalState.data?.level || 'Level 1'}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                    >
                      {modalState.data?.level && !EVENT_LEVELS.includes(modalState.data.level) && (
                        <option value={modalState.data.level}>{modalState.data.level}</option>
                      )}
                      {EVENT_LEVELS.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Speakers / Guests</label>
                    <input name="speakers" defaultValue={modalState.data?.speakers || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Venue</label>
                    <input name="venue" defaultValue={modalState.data?.venue || 'PSIT Campus, Kanpur'} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Description</label>
                    <textarea name="description" rows={3} defaultValue={modalState.data?.description || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                </>
              )}

              {modalState.type === 'startup' && (
                <>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Startup Name *</label>
                    <input name="name" defaultValue={modalState.data?.name || ''} required className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 uppercase font-bold mb-1">Founders</label>
                      <input name="founders" defaultValue={modalState.data?.founders || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                    </div>
                    <div>
                      <label className="block text-slate-700 uppercase font-bold mb-1">Industry / Sector</label>
                      <input name="industry" defaultValue={modalState.data?.industry || 'IoT / DeepTech'} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 uppercase font-bold mb-1">Stage</label>
                      <input name="stage" defaultValue={modalState.data?.stage || 'Early Revenue'} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                    </div>
                    <div>
                      <label className="block text-slate-700 uppercase font-bold mb-1">Official Website URL</label>
                      <input name="website" defaultValue={modalState.data?.website || ''} placeholder="https://..." className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Description</label>
                    <textarea name="description" rows={3} defaultValue={modalState.data?.description || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                </>
              )}

              {modalState.type === 'program' && (
                <>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Program Title *</label>
                    <input name="title" defaultValue={modalState.data?.title || ''} required className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Description</label>
                    <textarea name="description" rows={3} defaultValue={modalState.data?.description || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Status</label>
                    <input name="status" defaultValue={modalState.data?.status || 'Active'} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                </>
              )}

              {modalState.type === 'partner' && (
                <>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Partner Name *</label>
                    <input name="name" defaultValue={modalState.data?.name || ''} required className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Official Website</label>
                    <input name="official_website" defaultValue={modalState.data?.official_website || ''} placeholder="https://..." className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Description</label>
                    <textarea name="description" rows={2} defaultValue={modalState.data?.description || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                </>
              )}

              {modalState.type === 'team' && (
                <>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Full Name *</label>
                    <input name="name" defaultValue={modalState.data?.name || ''} required className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Position / Role *</label>
                    <input name="position" defaultValue={modalState.data?.position || ''} required className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Category</label>
                    <select name="category" defaultValue={modalState.data?.category || 'team'} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900">
                      <option value="leadership">Leadership / Dignitary</option>
                      <option value="management">Management / Executive</option>
                      <option value="team">Team / Associate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">LinkedIn Profile</label>
                    <input name="linkedin" defaultValue={modalState.data?.linkedin || ''} placeholder="https://linkedin.com/in/..." className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                </>
              )}

              {modalState.type === 'facility' && (
                <>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Facility Name *</label>
                    <input name="title" defaultValue={modalState.data?.title || ''} required className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Category</label>
                    <select name="category" defaultValue={modalState.data?.category || 'core'} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900">
                      <option value="core">Core Facility</option>
                      <option value="workstation">Advanced Workstation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 uppercase font-bold mb-1">Description</label>
                    <textarea name="description" rows={3} defaultValue={modalState.data?.description || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900" />
                  </div>
                </>
              )}

              {/* MEDIA & PHOTO GALLERY UPLOADER */}
              {['event', 'startup', 'program', 'partner', 'team', 'facility'].includes(modalState.type) && (
                <div className="pt-3 border-t border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                      <Camera className="w-3.5 h-3.5 text-emerald-600" />
                      Media & Visuals
                    </span>
                    <span className="text-[10px] text-slate-400">JPG, PNG, WEBP up to 10MB</span>
                  </div>

                  {/* 1. Primary Banner / Brand Logo / Profile Image */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-700 font-bold text-[11px] uppercase">
                        {['event', 'program', 'facility'].includes(modalState.type) && 'Cover Banner / Primary Image'}
                        {['startup', 'partner'].includes(modalState.type) && 'Official Brand Logo'}
                        {modalState.type === 'team' && 'Profile Photo'}
                      </label>
                      {imageValue && (
                        <button
                          type="button"
                          onClick={() => setImageValue('')}
                          className="text-[10px] text-rose-600 hover:text-rose-700 font-semibold"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {imageValue ? (
                        <div className="w-14 h-14 rounded-lg border border-slate-300 bg-white overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                          <img src={imageValue} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-lg border-2 border-dashed border-slate-300 bg-slate-100 flex items-center justify-center shrink-0 text-slate-400">
                          <Image className="w-5 h-5" />
                        </div>
                      )}

                      <div className="flex-1 space-y-1.5">
                        <input
                          type="text"
                          placeholder="Image URL or upload a file"
                          value={imageValue}
                          onChange={(e) => setImageValue(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-[11px] text-slate-900"
                        />
                        <div className="flex items-center gap-2">
                          <label className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-300 hover:border-emerald-500 rounded-lg text-[11px] font-semibold text-slate-700 transition-colors shadow-xs ${uploadingImage ? 'opacity-60 pointer-events-none' : ''}`}>
                            {uploadingImage ? <Loader2 className="w-3 h-3 animate-spin text-emerald-600" /> : <Upload className="w-3 h-3 text-emerald-600" />}
                            <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                            <input type="file" accept="image/*" onChange={handleSingleImageUpload} className="hidden" disabled={uploadingImage} />
                          </label>
                          <span className="text-[10px] text-slate-400">Stores on server</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Multiple Photo Gallery (For Events, Startups, Programs, Partners) */}
                  {['event', 'startup', 'program', 'partner'].includes(modalState.type) && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-slate-700 font-bold text-[11px] uppercase block">
                            {modalState.type === 'event' && 'Event Photos Gallery'}
                            {modalState.type === 'startup' && 'Venture Showcase Photos'}
                            {modalState.type === 'program' && 'Program Activity Photos'}
                            {modalState.type === 'partner' && 'Partnership & MoU Photos'}
                          </label>
                          <span className="text-[10px] text-slate-500">Public visitors can view and open these photos in full screen</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {photosList.length} {photosList.length === 1 ? 'photo' : 'photos'}
                        </span>
                      </div>

                      {/* Multi-upload button */}
                      <div className="flex items-center gap-2">
                        <label className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-all shadow-xs ${uploadingPhotos ? 'opacity-60 pointer-events-none' : ''}`}>
                          {uploadingPhotos ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                          <span>{uploadingPhotos ? 'Uploading Photos...' : 'Upload Gallery Photos (Multiple)'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleMultiplePhotosUpload}
                            className="hidden"
                            disabled={uploadingPhotos}
                          />
                        </label>
                        <span className="text-[10px] text-slate-400">Select up to 15 images at once</span>
                      </div>

                      {/* Photo Thumbnails with Delete button */}
                      {photosList.length > 0 ? (
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-1 max-h-48 overflow-y-auto pr-1">
                          {photosList.map((url, idx) => (
                            <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-300 aspect-square bg-white shadow-xs">
                              <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleRemovePhoto(idx)}
                                className="absolute top-1 right-1 bg-rose-600 hover:bg-rose-700 text-white rounded-full p-1 opacity-90 hover:opacity-100 shadow transition-all"
                                title="Remove photo"
                              >
                                <X className="w-3 h-3" />
                              </button>
                              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-1 text-[9px] text-white font-mono text-center">
                                #{idx + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-3 border border-dashed border-slate-200 rounded-lg text-slate-400 text-[11px]">
                          No gallery photos uploaded yet. Select images above to upload.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalState({ open: false, type: '', mode: 'create', data: null })}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
