import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { getPartners, getStartups } from '../lib/api';
import StartupDetailModal from '../Components/StartupDetailModal';
import { motion } from 'framer-motion';
import { ExternalLink, Building, ArrowRight, Loader2, Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const EcosystemPage = () => {
  const [partners, setPartners] = useState([]);
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [partnerLightbox, setPartnerLightbox] = useState({ open: false, photos: [], index: 0, title: '' });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!partnerLightbox.open) return;
      if (e.key === 'Escape') setPartnerLightbox(prev => ({ ...prev, open: false }));
      if (e.key === 'ArrowRight' && partnerLightbox.photos.length > 0) {
        setPartnerLightbox(prev => ({ ...prev, index: (prev.index + 1) % partnerLightbox.photos.length }));
      }
      if (e.key === 'ArrowLeft' && partnerLightbox.photos.length > 0) {
        setPartnerLightbox(prev => ({ ...prev, index: (prev.index - 1 + partnerLightbox.photos.length) % partnerLightbox.photos.length }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [partnerLightbox]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    async function load() {
      try {
        const [parts, starts] = await Promise.all([
          getPartners(),
          getStartups()
        ]);
        setPartners(parts);
        setStartups(starts);
      } catch (err) {
        console.error('Failed to fetch ecosystem data:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* Banner */}
        <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-16 sm:py-20 px-4 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4 shadow-2xs">
              Collaborative Innovation Network
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-outfit text-slate-900 tracking-tight">
              Ecosystem & Strategic Partners
            </h1>
            <div className="h-1.5 w-16 bg-emerald-600 rounded-full mx-auto my-4" />
            <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
              PSIT SIF operates in close alignment with national government ministries, premier funding bodies, industrial accelerators, and university research facilities.
            </p>
          </div>
        </section>

        {/* Strategic Partners Section */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="section-heading-container">
            <h2 className="section-title">Institutional & Government Partners</h2>
            <div className="section-title-bar" />
            <p className="section-subtitle">
              Click on any institutional partner to visit their official governmental portal.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mb-3" />
              <p className="text-xs text-slate-400 font-semibold">Loading partners...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {partners.map((partner, idx) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-slate-50/60 p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {partner.official_website ? (
                      <a
                        href={partner.official_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Visit ${partner.name} Official Website`}
                        className="h-32 bg-white rounded-2xl p-5 flex items-center justify-center border border-slate-200 mb-6 shadow-2xs hover:border-emerald-500 hover:scale-105 transition-all cursor-pointer group/plogo"
                      >
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-24 w-auto max-w-full object-contain transition-transform group-hover/plogo:scale-105"
                        />
                      </a>
                    ) : (
                      <div className="h-32 bg-white rounded-2xl p-5 flex items-center justify-center border border-slate-200 mb-6 shadow-2xs">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-24 w-auto max-w-full object-contain"
                        />
                      </div>
                    )}
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      {partner.category}
                    </span>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 mt-1 mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {partner.description}
                    </p>

                    {/* Partnership & MoU Photos Gallery */}
                    {Array.isArray(partner.photos) && partner.photos.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                            <Camera className="w-3 h-3 text-emerald-600" />
                            MoU & Event Photos ({partner.photos.length})
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {partner.photos.map((photoUrl, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => setPartnerLightbox({ open: true, photos: partner.photos, index: pIdx, title: partner.name })}
                              className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white hover:shadow-md transition-all text-left focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                            >
                              <img
                                src={photoUrl}
                                alt={`${partner.name} moment ${pIdx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/25 transition-colors flex items-center justify-center">
                                <Maximize2 className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200">
                    {partner.official_website ? (
                      <a
                        href={partner.official_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                      >
                        Visit Official Website
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Official portal</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Startups Portfolio Grid */}
        <section className="py-20 bg-slate-50/50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-heading-container">
              <h2 className="section-title">Incubated Startups</h2>
              <div className="section-title-bar" />
              <p className="section-subtitle">
                Over 40 high-impact ventures actively building products across AI/ML, healthcare, deeptech, agriculture, robotics, and SaaS.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-12">
              {startups.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedStartup(s)}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-emerald-500/50 cursor-pointer transition-all flex flex-col items-center text-center group min-w-0"
                >
                  {s.website ? (
                    <a
                      href={s.website.startsWith('http') ? s.website : `https://${s.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title={`Visit ${s.name} Official Website`}
                      className="w-24 h-24 bg-white rounded-xl p-2 flex items-center justify-center mb-3 hover:scale-110 hover:border-emerald-500 hover:shadow-xs border border-slate-200 transition-all cursor-pointer"
                    >
                      {s.logo ? (
                        <img src={s.logo} alt={s.name} className="max-h-20 w-auto max-w-full object-contain" />
                      ) : (
                        <Building className="w-8 h-8 text-slate-400" />
                      )}
                    </a>
                  ) : (
                    <div className="w-24 h-24 bg-white rounded-xl p-2 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-slate-200">
                      {s.logo ? (
                        <img src={s.logo} alt={s.name} className="max-h-20 w-auto max-w-full object-contain" />
                      ) : (
                        <Building className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                  )}
                  <h4 className="text-xs font-bold font-outfit text-slate-900 line-clamp-1">
                    {s.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {s.industry}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/startups"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-xs transition-all"
              >
                Browse Full Startup Directory
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <StartupDetailModal
        startup={selectedStartup}
        isOpen={!!selectedStartup}
        onClose={() => setSelectedStartup(null)}
      />

      {/* Fullscreen Partner Photos Lightbox */}
      {partnerLightbox.open && partnerLightbox.photos.length > 0 && (
        <div
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPartnerLightbox(prev => ({ ...prev, open: false }))}
        >
          {/* Close */}
          <button
            onClick={() => setPartnerLightbox(prev => ({ ...prev, open: false }))}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter and Title */}
          <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-sm z-20 flex items-center gap-2">
            <span>{partnerLightbox.title}</span>
            <span>•</span>
            <span>{partnerLightbox.index + 1} / {partnerLightbox.photos.length}</span>
          </div>

          {/* Prev Button */}
          {partnerLightbox.photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPartnerLightbox(prev => ({ ...prev, index: (prev.index - 1 + prev.photos.length) % prev.photos.length }));
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Large Image */}
          <div
            className="max-w-4xl max-h-[85vh] flex items-center justify-center overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={partnerLightbox.photos[partnerLightbox.index]}
              alt={`Partner moment ${partnerLightbox.index + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Next Button */}
          {partnerLightbox.photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPartnerLightbox(prev => ({ ...prev, index: (prev.index + 1) % prev.photos.length }));
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-20"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default EcosystemPage;
