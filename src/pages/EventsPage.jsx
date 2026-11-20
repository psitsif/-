import { useState, useEffect, useMemo } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { getEvents } from '../lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Search, LayoutGrid, List, ChevronRight, ChevronLeft, Loader2, Sparkles, User, Camera,
  ArrowUpRight, BadgeCheck, Clock3, MapPin, Tag
} from 'lucide-react';

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const ACADEMIC_YEARS = ['2026-27', '2025-26', '2024-25'];

const getEventTimestamp = (event) => {
  const date = String(event.date || '').trim();
  const isoDate = date.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoDate) {
    return Date.UTC(Number(isoDate[1]), Number(isoDate[2]) - 1, Number(isoDate[3]));
  }

  const usDate = date.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (usDate) {
    return Date.UTC(Number(usDate[3]), Number(usDate[1]) - 1, Number(usDate[2]));
  }

  const dayMonthYear = date.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
  if (dayMonthYear) {
    return Date.UTC(Number(dayMonthYear[3]), Number(dayMonthYear[2]) - 1, Number(dayMonthYear[1]));
  }

  const normalizedDate = date.replace(/\b(\d{1,2})(st|nd|rd|th)\b/gi, '$1');
  const timestamp = Date.parse(normalizedDate);
  return Number.isNaN(timestamp) ? null : timestamp;
};

const formatEventDate = (event) => {
  const timestamp = getEventTimestamp(event);
  if (timestamp === null) {
    return [event.date, event.month, event.year].filter(Boolean).join(' · ') || 'Date to be announced';
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(timestamp);
};

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(ACADEMIC_YEARS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    async function loadEvents() {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  useEffect(() => {
    if (!selectedEvent) return;

    document.getElementById('selected-event-details')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }, [selectedEvent]);

  const eventTypes = useMemo(() => {
    const types = new Set();
    events.forEach(e => {
      if (ACADEMIC_YEARS.includes(e.year) && e.type) types.add(e.type.trim());
    });
    return ['All', ...Array.from(types)].sort();
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchYear = selectedYear === 'All' || e.year === selectedYear;
      const matchType = selectedType === 'All' || (e.type && e.type.includes(selectedType));
      const matchSearch =
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.theme && e.theme.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (e.speakers && e.speakers.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (e.description && e.description.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchYear && matchType && matchSearch;
    });
  }, [events, selectedYear, selectedType, searchTerm]);

  const flagshipEvents = useMemo(() => {
    return events.filter(e => e.year === '2024-25' && e.featured === 1);
  }, [events]);

  const timelineEvents = useMemo(() => {
    if (!selectedEvent) return [];

    return events
      .filter(event => {
        if (event.year !== selectedEvent.year) return false;
        if (event.id === selectedEvent.id) return true;

        const sameTitle = String(event.title).trim().toLowerCase() === String(selectedEvent.title).trim().toLowerCase();
        const eventDate = getEventTimestamp(event);
        const selectedDate = getEventTimestamp(selectedEvent);
        return !(sameTitle && eventDate !== null && eventDate === selectedDate);
      })
      .sort((a, b) => {
        const aDate = getEventTimestamp(a);
        const bDate = getEventTimestamp(b);
        if (aDate === null && bDate !== null) return 1;
        if (aDate !== null && bDate === null) return -1;
        if (aDate !== bDate) return (aDate || 0) - (bDate || 0);
        return String(a.title).localeCompare(String(b.title));
      });
  }, [events, selectedEvent]);

  const selectedTimelineIndex = timelineEvents.findIndex(event => event.id === selectedEvent?.id);
  const earlierEvents = selectedTimelineIndex > 0
    ? timelineEvents.slice(Math.max(0, selectedTimelineIndex - 2), selectedTimelineIndex).reverse()
    : [];
  const laterEvents = selectedTimelineIndex >= 0
    ? timelineEvents.slice(selectedTimelineIndex + 1, selectedTimelineIndex + 3)
    : [];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0f172a] transition-colors">
      <Navbar />

      <main className="flex-grow pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="section-heading-container mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 mb-3">
              Interactive Incubation Schedule
            </span>
            <h1 className="section-title">
              Our <span className="text-emerald-600">Events</span> & Activities
            </h1>
            <div className="section-title-bar" />
            <p className="section-subtitle">
              Over 120 hackathons, expert conclaves, investor demo days, and hands-on technical workshops organized across academic years to nurture student venture creation.
            </p>
          </div>

          {selectedEvent ? (
            <section aria-label="Event timeline" className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.8fr)] gap-6 lg:gap-8 items-start">
              <div id="selected-event-details" className="relative max-h-[80vh] scroll-mt-24 overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="p-5 sm:p-7">
                  {selectedEvent.image && (
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      className="mb-5 max-h-56 w-full rounded-2xl border border-slate-200 object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {getEventTimestamp(selectedEvent) !== null && getEventTimestamp(selectedEvent) < Date.now()
                        ? 'Event completed'
                        : 'Upcoming event'}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                      <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                      {formatEventDate(selectedEvent)}
                    </span>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                    PSIT SIF <span className="text-slate-400">·</span> {selectedEvent.type || 'Event'}
                  </p>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight text-slate-900">
                    {selectedEvent.title}
                  </h2>
                  {selectedEvent.theme && (
                    <p className="mt-3 inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                      <Tag className="h-3.5 w-3.5" />
                      Theme: {selectedEvent.theme}
                    </p>
                  )}

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    {selectedEvent.time && (
                      <div className="flex items-start gap-3">
                        <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Time</p>
                          <p className="mt-0.5 text-sm font-semibold text-slate-800">{selectedEvent.time}</p>
                        </div>
                      </div>
                    )}
                    {selectedEvent.venue && (
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Location</p>
                          <p className="mt-0.5 text-sm font-semibold text-slate-800">{selectedEvent.venue}</p>
                        </div>
                      </div>
                    )}
                    {selectedEvent.speakers && (
                      <div className="flex items-start gap-3">
                        <User className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Speaker / Host</p>
                          <p className="mt-0.5 text-sm font-semibold text-slate-800">{selectedEvent.speakers}</p>
                        </div>
                      </div>
                    )}
                    {selectedEvent.level && (
                      <div className="flex items-start gap-3">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Program level</p>
                          <p className="mt-0.5 text-sm font-semibold text-slate-800">{selectedEvent.level}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Event overview</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700 whitespace-pre-line">
                      {selectedEvent.description || 'Details regarding this institutional session at PSIT Startup & Incubation Foundation.'}
                    </p>
                  </div>

                  {Array.isArray(selectedEvent.photos) && selectedEvent.photos.length > 0 && (
                    <div className="mt-5 border-t border-slate-200 pt-5">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <h3 className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                          <Camera className="h-4 w-4 text-emerald-600" />
                          Event photos
                        </h3>
                        <span className="text-xs font-medium text-slate-500">
                          {selectedEvent.photos.length} {selectedEvent.photos.length === 1 ? 'photo' : 'photos'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {selectedEvent.photos.map((photoUrl, index) => (
                          <img
                            key={`${photoUrl}-${index}`}
                            src={photoUrl}
                            alt={`${selectedEvent.title} photo ${index + 1}`}
                            className="aspect-[4/3] w-full rounded-xl border border-slate-200 object-cover"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <BadgeCheck className="h-4 w-4 text-emerald-600" />
                      {selectedEvent.year ? `Academic year ${selectedEvent.year}` : 'PSIT SIF event'}
                    </div>
                    {selectedEvent.organizer && (
                      <p className="text-xs font-medium text-slate-500">
                        Organized by <span className="font-bold text-slate-800">{selectedEvent.organizer}</span>
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3">
                      {selectedEvent.registration_url && (
                        <a
                          href={selectedEvent.registration_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-400"
                        >
                          Register for event <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 sm:p-7 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Event timeline</p>
                    <p className="mt-1 text-sm font-semibold text-slate-700">{selectedEvent.year || 'All events'}</p>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]" />
                </div>

                <div className="relative">
                  {(earlierEvents.length > 0 || laterEvents.length > 0) && (
                    <div className="absolute left-[17px] top-5 bottom-5 w-px bg-gradient-to-b from-slate-200 via-emerald-300 to-slate-200" />
                  )}
                  <div className="relative space-y-3">
                    {earlierEvents.map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => setSelectedEvent(event)}
                        className="group relative ml-7 block w-[calc(100%-1.75rem)] rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-all hover:border-emerald-300 hover:bg-emerald-50/60"
                      >
                        <span className="absolute -left-[1.95rem] top-5 h-2.5 w-2.5 rounded-full border-2 border-white bg-slate-400 shadow" />
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Completed</span>
                          <span className="text-[10px] font-medium text-slate-400">{formatEventDate(event)}</span>
                        </span>
                        <span className="mt-2 block line-clamp-2 text-sm font-bold leading-snug text-slate-700 group-hover:text-emerald-800">{event.title}</span>
                        <span className="mt-1 block text-xs text-slate-500">Earlier event</span>
                      </button>
                    ))}

                    <div className="relative ml-7 rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-4 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]">
                      <span className="absolute -left-[2.05rem] top-5 h-3 w-3 rounded-full border-[3px] border-white bg-emerald-500 shadow" />
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">Selected event</span>
                        <span className="text-[10px] font-semibold text-emerald-700">{formatEventDate(selectedEvent)}</span>
                      </span>
                      <span className="mt-2 block line-clamp-2 text-sm font-extrabold leading-snug text-slate-900">{selectedEvent.title}</span>
                      <span className="mt-1 block text-xs font-medium text-emerald-800">You’re viewing this event</span>
                    </div>

                    {laterEvents.map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => setSelectedEvent(event)}
                        className="group relative ml-7 block w-[calc(100%-1.75rem)] rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-all hover:border-emerald-300 hover:bg-emerald-50/60"
                      >
                        <span className="absolute -left-[1.95rem] top-5 h-2.5 w-2.5 rounded-full border-2 border-white bg-slate-300 shadow" />
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Next in timeline</span>
                          <span className="text-[10px] font-medium text-slate-400">{formatEventDate(event)}</span>
                        </span>
                        <span className="mt-2 block line-clamp-2 text-sm font-bold leading-snug text-slate-700 group-hover:text-emerald-800">{event.title}</span>
                        <span className="mt-1 block text-xs text-slate-500">Later event</span>
                      </button>
                    ))}

                    {earlierEvents.length === 0 && laterEvents.length === 0 && (
                      <p className="ml-7 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm leading-6 text-slate-500">
                        This is the only listed event for this academic year so far.
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEvent(null)}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-900"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to all events
                </button>
              </div>
            </section>
          ) : (
            <>
          {/* Flagship Featured Events Carousel / Showcase */}
          {flagshipEvents.length > 0 && selectedYear === '2024-25' && !searchTerm && selectedType === 'All' && (
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">
                  Featured Conclaves & Talk Shows
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {flagshipEvents.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedEvent(item)}
                    className="bg-white dark:bg-[#1e293b] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                            <Calendar className="w-12 h-12 text-slate-400" />
                          </div>
                        )}
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                          Featured
                        </span>
                      </div>

                      <div className="p-6">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                          {item.type}
                        </span>
                        <h4 className="text-lg font-bold font-outfit text-slate-900 dark:text-white mt-1 group-hover:text-emerald-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex justify-between items-center text-xs font-bold text-slate-400 border-t border-slate-100 dark:border-slate-800/80 mt-4">
                      <span>{item.date || item.month}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Event Details <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Academic Year Selection Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {ACADEMIC_YEARS.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all ${
                  selectedYear === year
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                    : 'bg-white dark:bg-[#1e293b] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500'
                }`}
              >
                Academic Year {year}
              </button>
            ))}
          </div>

          {/* Filter & View Switcher Bar */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm mb-10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search */}
              <div className="md:col-span-6 relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search events by title, speaker, theme, or keywords..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Type Filter */}
              <div className="md:col-span-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="All">All Activity Types</option>
                  {eventTypes.filter(t => t !== 'All').map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="md:col-span-2 flex justify-end gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-2xl border transition-all ${
                    viewMode === 'grid'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-400'
                  }`}
                  title="Card View"
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-3 rounded-2xl border transition-all ${
                    viewMode === 'table'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border-emerald-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-400'
                  }`}
                  title="Table Schedule View"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Displaying {filteredEvents.length} events for session {selectedYear}</span>
              {(searchTerm || selectedType !== 'All') && (
                <button
                  onClick={() => { setSearchTerm(''); setSelectedType('All'); }}
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Events Display */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
                <p className="text-sm font-semibold text-slate-500">Loading events schedule...</p>
              </motion.div>
            ) : filteredEvents.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-[#1e293b] p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4"
              >
                <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-xl font-bold font-outfit text-slate-800 dark:text-slate-200">
                  {searchTerm || selectedType !== 'All'
                    ? 'No events found matching your criteria'
                    : `No events listed for ${selectedYear} yet`}
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  {searchTerm || selectedType !== 'All'
                    ? 'Try selecting a different academic year or removing active search keywords.'
                    : `Event details for ${selectedYear} will be added when they are available.`}
                </p>
              </motion.div>
            ) : viewMode === 'grid' ? (
              /* Grid View */
              <motion.div
                key="grid"
                variants={listVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredEvents.map((ev) => (
                  <motion.div
                    key={ev.id}
                    variants={itemVariants}
                    onClick={() => setSelectedEvent(ev)}
                    className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-full">
                      {(ev.image || (Array.isArray(ev.photos) && ev.photos.length > 0)) && (
                        <div className="relative h-44 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-3xl bg-slate-100">
                          <img
                            src={ev.image || ev.photos[0]}
                            alt={ev.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {Array.isArray(ev.photos) && ev.photos.length > 0 && (
                            <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                              <Camera className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{ev.photos.length} {ev.photos.length === 1 ? 'photo' : 'photos'}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 line-clamp-1">
                          {ev.type || 'Event'}
                        </span>
                        <span className="text-xs font-bold text-slate-400 shrink-0">
                          {ev.month}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-outfit text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {ev.title}
                      </h3>

                      {ev.theme && (
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2 line-clamp-1">
                          Theme: {ev.theme}
                        </p>
                      )}


                    <div className="space-y-1.5 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                      {ev.date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{ev.date}</span>
                        </div>
                      )}
                      {ev.speakers && (
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="line-clamp-1 font-medium">{ev.speakers}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-bold">
                    <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Event Details & Register
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {ev.level || 'Level 1'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Table View */
            <div className="bg-white dark:bg-[#1e293b] rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-800 border-b border-slate-200 text-xs uppercase tracking-wider font-outfit">
                    <tr>
                      <th className="py-4 px-6">#</th>
                      <th className="py-4 px-6">Event Title</th>
                      <th className="py-4 px-6">Month</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6">Theme</th>
                      <th className="py-4 px-6">Activity Type</th>
                      <th className="py-4 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredEvents.map((ev, index) => (
                      <tr
                        key={ev.id}
                        onClick={() => setSelectedEvent(ev)}
                        className={`hover:bg-emerald-50/50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer ${
                          index % 2 === 0 ? 'bg-white dark:bg-[#1e293b]' : 'bg-slate-50/50 dark:bg-slate-900/30'
                        }`}
                      >
                        <td className="py-4 px-6 font-bold text-slate-400">{index + 1}</td>
                        <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white max-w-md">
                          <div className="flex items-center gap-2">
                            <span>{ev.title}</span>
                            {Array.isArray(ev.photos) && ev.photos.length > 0 && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                                <Camera className="w-2.5 h-2.5" />
                                {ev.photos.length}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-medium text-slate-600 dark:text-slate-300">{ev.month}</td>
                        <td className="py-4 px-6 font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">{ev.date}</td>
                        <td className="py-4 px-6 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{ev.theme}</td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {ev.type}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedEvent(ev);
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          </AnimatePresence>
          </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EventsPage;
