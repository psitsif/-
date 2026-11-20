import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, ExternalLink, Sparkles, Building, Camera, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const StartupDetailModal = ({ startup, isOpen, onClose }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight' && Array.isArray(startup?.photos)) {
        setLightboxIndex((prev) => (prev + 1) % startup.photos.length);
      }
      if (e.key === 'ArrowLeft' && Array.isArray(startup?.photos)) {
        setLightboxIndex((prev) => (prev - 1 + startup.photos.length) % startup.photos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, startup]);

  if (!isOpen || !startup) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/50 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        >
          {/* Top Banner */}
          <div className="relative p-6 sm:p-8 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50 border-b border-slate-200 flex items-center gap-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center shadow-xs border border-slate-200 transition-all"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {startup.website ? (
              <a
                href={startup.website.startsWith('http') ? startup.website : `https://${startup.website}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${startup.name} official website`}
                className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-2xl p-2 flex items-center justify-center shadow-xs border border-slate-200 shrink-0 hover:border-emerald-500 hover:scale-105 transition-all cursor-pointer group/mlogo"
              >
                {startup.logo ? (
                  <img
                    src={startup.logo}
                    alt={startup.name}
                    className="w-full h-full object-contain transition-transform group-hover/mlogo:scale-105"
                  />
                ) : (
                  <Building className="w-10 h-10 text-slate-400 group-hover/mlogo:text-emerald-600" />
                )}
              </a>
            ) : (
              <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-2xl p-2 flex items-center justify-center shadow-xs border border-slate-200 shrink-0">
                {startup.logo ? (
                  <img
                    src={startup.logo}
                    alt={startup.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Building className="w-10 h-10 text-slate-400" />
                )}
              </div>
            )}

            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1.5">
                {startup.stage || 'Incubated'}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-outfit text-slate-900">
                {startup.name}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm font-medium mt-0.5">
                {startup.industry}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 space-y-6">
            {startup.founders && (
              <div className="flex items-start gap-3 bg-[#f8fafc] p-4 rounded-2xl border border-slate-200">
                <Users className="w-5 h-5 text-emerald-700 mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Founders / Promoters</div>
                  <div className="text-sm font-semibold text-slate-900 mt-0.5">{startup.founders}</div>
                </div>
              </div>
            )}

            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">About Venture</h4>
              <p className="text-slate-700 leading-relaxed text-sm">
                {startup.description || `An innovative startup incubating at PSIT Startup & Incubation Foundation specializing in ${startup.industry}.`}
              </p>
            </div>

            {startup.impact && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  Ecosystem Value & Impact
                </div>
                <p className="text-emerald-950 text-sm font-medium">
                  {startup.impact}
                </p>
              </div>
            )}

            {/* Venture Showcase Photos */}
            {Array.isArray(startup.photos) && startup.photos.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-800 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-emerald-600" />
                    Venture & Product Showcase ({startup.photos.length})
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">Click photo to zoom</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {startup.photos.map((photoUrl, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className="group relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 hover:shadow-md transition-all text-left focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    >
                      <img
                        src={photoUrl}
                        alt={`${startup.name} showcase ${index + 1}`}
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
          </div>

          {/* Action Footer */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors text-xs"
            >
              Close
            </button>

            {startup.website ? (
              <a
                href={startup.website.startsWith('http') ? startup.website : `https://${startup.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm flex items-center gap-2 text-xs transition-all"
              >
                Visit Official Website
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs font-semibold text-slate-400 italic">
                Official website not listed
              </span>
            )}
          </div>
        </motion.div>

        {/* Fullscreen Lightbox Viewer */}
        {lightboxIndex !== null && Array.isArray(startup.photos) && (
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
              {lightboxIndex + 1} / {startup.photos.length}
            </div>

            {/* Prev Button */}
            {startup.photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev - 1 + startup.photos.length) % startup.photos.length);
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
                src={startup.photos[lightboxIndex]}
                alt={`${startup.name} large view ${lightboxIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Next Button */}
            {startup.photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev + 1) % startup.photos.length);
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

export default StartupDetailModal;
