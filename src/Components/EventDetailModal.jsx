import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, User, Tag, ExternalLink, Camera, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const EventDetailModal = ({ event, isOpen, onClose }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight' && Array.isArray(event?.photos)) {
        setLightboxIndex((prev) => (prev + 1) % event.photos.length);
      }
      if (e.key === 'ArrowLeft' && Array.isArray(event?.photos)) {
        setLightboxIndex((prev) => (prev - 1 + event.photos.length) % event.photos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, event]);

  if (!isOpen || !event) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        >
          {/* Header Image / Clean Frame */}
          <div className="relative h-48 sm:h-60 w-full bg-slate-100 overflow-hidden border-b border-slate-200">
            {event.image ? (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-emerald-50 to-slate-100 flex items-center justify-center">
                <Calendar className="w-16 h-16 text-emerald-600/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-md transition-all z-20"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Tag Overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap gap-2 z-10">
              {event.type && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm">
                  {event.type}
                </span>
              )}
              {event.year && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-slate-800 shadow-sm">
                  Academic Year {event.year}
                </span>
              )}
              {event.level && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white backdrop-blur-xs">
                  {event.level}
                </span>
              )}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-16rem)] overflow-y-auto">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-slate-900 leading-tight mb-2">
                {event.title}
              </h2>
              {event.theme && (
                <p className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80">
                  <Tag className="w-3.5 h-3.5" />
                  Theme: {event.theme}
                </p>
              )}
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f8fafc] p-4 rounded-2xl border border-slate-200">
              {event.date && (
                <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Date</div>
                    <div className="text-slate-900 font-semibold">{event.date} {event.month ? `(${event.month})` : ''}</div>
                  </div>
                </div>
              )}

              {event.time && (
                <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Time</div>
                    <div className="text-slate-900 font-semibold">{event.time}</div>
                  </div>
                </div>
              )}

              {event.venue && (
                <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Venue</div>
                    <div className="text-slate-900 font-semibold">{event.venue}</div>
                  </div>
                </div>
              )}

              {event.speakers && (
                <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Guest / Speaker</div>
                    <div className="text-slate-900 font-semibold">{event.speakers}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Event Overview</h4>
            <p className="text-slate-700 leading-relaxed text-sm text-justify [text-justify:inter-word] [hyphens:none]">
                {event.description || 'Details regarding this institutional session at PSIT Startup & Incubation Foundation.'}
              </p>
            </div>

            {/* Event Photo Gallery */}
            {Array.isArray(event.photos) && event.photos.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-800 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-emerald-600" />
                    Event Photo Gallery & Moments
                  </h4>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {event.photos.length} {event.photos.length === 1 ? 'photo' : 'photos'}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {event.photos.map((photoUrl, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className="group relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 hover:shadow-md transition-all text-left focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    >
                      <img
                        src={photoUrl}
                        alt={`${event.title} photo ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors flex items-center justify-center">
                        <Maximize2 className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Organizer */}
            {event.organizer && (
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-100">
                <span>Organized by:</span>
                <span className="text-slate-900 font-bold">{event.organizer}</span>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left font-medium">
              PSIT SIF • DST inclusive-TBI Flagship Activities
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors text-xs"
              >
                Close
              </button>
              {event.registration_url && (
                <a
                  href={event.registration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm flex items-center justify-center gap-2 text-xs transition-all"
                >
                  Register / Apply Now
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Fullscreen Lightbox Viewer */}
        {lightboxIndex !== null && Array.isArray(event.photos) && (
          <div
            className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Lightbox */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Photo Counter */}
            <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-sm z-20">
              {lightboxIndex + 1} / {event.photos.length}
            </div>

            {/* Prev Button */}
            {event.photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev - 1 + event.photos.length) % event.photos.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-20"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Main Image */}
            <div
              className="max-w-4xl max-h-[85vh] flex items-center justify-center overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={event.photos[lightboxIndex]}
                alt={`${event.title} large view ${lightboxIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Next Button */}
            {event.photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev + 1) % event.photos.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-20"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default EventDetailModal;
