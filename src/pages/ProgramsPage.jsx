import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { getPrograms } from '../lib/api';
import { motion } from 'framer-motion';
import { CheckCircle2, ExternalLink, Award, Loader2, Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const applicationFormUrls = {
  'inclusive-technology-business-incubator-i-tbi': 'https://docs.google.com/forms/d/e/1FAIpQLSdiTMLP7mEmAiXgmIpRUpwqbHUCuYBS9pz5_wwlQj0B6Qqm6A/viewform',
  'psit-innovation-hub-idea-lab': 'https://docs.google.com/forms/d/e/1FAIpQLSdC7JnM4DRB5AhCctMmgUiCG73-uiDLR8NxbIky6UUOUCC8mA/viewform',
};
const officialProgramUrls = {
  'msme-incubation-scheme': 'https://msme.gov.in/',
  'start-in-up-program': 'https://startinup.up.gov.in/',
};

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxState, setLightboxState] = useState({ open: false, photos: [], index: 0, title: '' });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxState.open) return;
      if (e.key === 'Escape') setLightboxState(prev => ({ ...prev, open: false }));
      if (e.key === 'ArrowRight' && lightboxState.photos.length > 0) {
        setLightboxState(prev => ({ ...prev, index: (prev.index + 1) % prev.photos.length }));
      }
      if (e.key === 'ArrowLeft' && lightboxState.photos.length > 0) {
        setLightboxState(prev => ({ ...prev, index: (prev.index - 1 + prev.photos.length) % prev.photos.length }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxState]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    async function load() {
      try {
        const data = await getPrograms();
        setPrograms(data);
      } catch (err) {
        console.error('Failed to fetch programs:', err);
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
              Government & Institutional Initiatives
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-outfit text-slate-900 tracking-tight">
              Flagship Programs
            </h1>
            <div className="h-1.5 w-16 bg-emerald-600 rounded-full mx-auto my-4" />
            <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
              Explore our structured incubation schemes supported by the Department of Science & Technology (DST), the Ministry of Micro, Small and Medium Enterprises (MSME), and the Government of Uttar Pradesh.
            </p>
          </div>
        </section>

        {/* Programs List */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
              <p className="text-sm font-semibold text-slate-500">Loading incubation programs...</p>
            </div>
          ) : (
            <div className="space-y-16">
              {programs.map((program, idx) => {
                let parsedBenefits = [];
                try {
                  parsedBenefits = typeof program.benefits === 'string' ? JSON.parse(program.benefits) : (program.benefits || []);
                } catch {
                  parsedBenefits = [];
                }
                const applicationUrl = applicationFormUrls[program.slug] || officialProgramUrls[program.slug];
                const usesApplicationForm = Boolean(applicationFormUrls[program.slug]);

                return (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-slate-50/60 rounded-3xl border border-slate-200 p-8 lg:p-12 shadow-xs hover:shadow-md transition-all"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      <div className="lg:col-span-8 space-y-6">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {program.status || 'Active Program'}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            Program #{idx + 1}
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-slate-900 leading-tight">
                          {program.title}
                        </h2>

                        <p className="text-slate-600 text-base leading-relaxed">
                          {program.description}
                        </p>

                        {/* Benefits list */}
                        {parsedBenefits.length > 0 && (
                          <div className="pt-2">
                            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3">Key Program Offerings</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {parsedBenefits.map((benefit, bIdx) => (
                                <div key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                                  <span>{benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {program.eligibility && (
                          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs shadow-2xs">
                            <strong className="text-slate-900 uppercase tracking-wider block mb-1 font-bold">Eligibility Criteria:</strong>
                            <span className="text-slate-600 leading-normal">{program.eligibility}</span>
                          </div>
                        )}

                        {applicationUrl && (
                          <div className="pt-2">
                            <a
                              href={applicationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-xs transition-all"
                            >
                              {`Apply for ${program.title}`}
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Image / Logo Column */}
                      <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 shadow-2xs h-full min-h-[220px]">
                        {program.image ? (
                          <img
                            src={program.image}
                            alt={program.title}
                            className="max-h-48 w-auto object-contain"
                          />
                        ) : (
                          <Award className="w-16 h-16 text-emerald-600" />
                        )}
                      </div>
                    </div>

                    {/* Program Activity Photos Gallery */}
                    {Array.isArray(program.photos) && program.photos.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700 flex items-center gap-1.5">
                            <Camera className="w-3.5 h-3.5 text-emerald-600" />
                            Program Activity & Cohort Moments ({program.photos.length})
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">Click photo to enlarge</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                          {program.photos.map((photoUrl, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => setLightboxState({ open: true, photos: program.photos, index: pIdx, title: program.title })}
                              className="group relative aspect-4/3 rounded-xl overflow-hidden border border-slate-200 bg-white hover:shadow-md transition-all text-left focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                            >
                              <img
                                src={photoUrl}
                                alt={`${program.title} photo ${pIdx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/25 transition-colors flex items-center justify-center">
                                <Maximize2 className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Fullscreen Lightbox Modal */}
      {lightboxState.open && lightboxState.photos.length > 0 && (
        <div
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxState(prev => ({ ...prev, open: false }))}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxState(prev => ({ ...prev, open: false }))}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter and Title */}
          <div className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-sm z-20 flex items-center gap-2">
            <span>{lightboxState.title}</span>
            <span>•</span>
            <span>{lightboxState.index + 1} / {lightboxState.photos.length}</span>
          </div>

          {/* Prev Button */}
          {lightboxState.photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxState(prev => ({ ...prev, index: (prev.index - 1 + prev.photos.length) % prev.photos.length }));
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
              src={lightboxState.photos[lightboxState.index]}
              alt={`Program view ${lightboxState.index + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Next Button */}
          {lightboxState.photos.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxState(prev => ({ ...prev, index: (prev.index + 1) % prev.photos.length }));
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

export default ProgramsPage;
