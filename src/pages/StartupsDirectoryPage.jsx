import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Users, ExternalLink, ChevronRight,
  Building, Loader2, RefreshCw, Camera
} from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import StartupDetailModal from '../Components/StartupDetailModal';
import { getStartups } from '../lib/api';

const StartupsDirectoryPage = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedStartup, setSelectedStartup] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    async function fetchStartups() {
      try {
        setLoading(true);
        const data = await getStartups();
        setStartups(data);
      } catch (err) {
        console.error('Failed to load startups:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStartups();
  }, []);

  const industries = useMemo(() => {
    const set = new Set();
    startups.forEach(s => {
      if (s.industry) {
        s.industry.split(',').forEach(part => set.add(part.trim()));
      }
    });
    return ['All', ...Array.from(set)].sort();
  }, [startups]);

  const stages = useMemo(() => {
    const set = new Set();
    startups.forEach(s => {
      if (s.stage) set.add(s.stage.trim());
    });
    return ['All', ...Array.from(set)].sort();
  }, [startups]);

  const filteredStartups = useMemo(() => {
    return startups.filter(startup => {
      const matchSearch =
        startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (startup.founders && startup.founders.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (startup.industry && startup.industry.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (startup.description && startup.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchIndustry =
        selectedIndustry === 'All' ||
        (startup.industry && startup.industry.includes(selectedIndustry));

      const matchStage =
        selectedStage === 'All' ||
        (startup.stage && startup.stage.toLowerCase() === selectedStage.toLowerCase());

      return matchSearch && matchIndustry && matchStage;
    });
  }, [startups, searchTerm, selectedIndustry, selectedStage]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0f172a] transition-colors">
      <Navbar />

      <main className="flex-grow pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="section-heading-container mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 mb-3">
                Incubation Portfolio
              </span>
              <h1 className="section-title">
                Startup <span className="text-emerald-600">Directory</span>
              </h1>
              <div className="section-title-bar" />
              <p className="section-subtitle">
                Discover the vibrant ventures incubating at PSIT-SIF. Across AI/ML, healthcare, deeptech, agriculture, and sustainable hardware, explore the future leaders of Indian entrepreneurship.
              </p>
            </motion.div>
          </div>

          {/* Search & Filters Card */}
          <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm mb-12 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Search Bar */}
              <div className="md:col-span-6 relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by company name, founder, sector, or keyword..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>

              {/* Industry Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                >
                  <option value="All">All Sectors & Industries</option>
                  {industries.filter(i => i !== 'All').map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              {/* Stage Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                >
                  <option value="All">All Incubation Stages</option>
                  {stages.filter(s => s !== 'All').map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count indicator */}
            <div className="flex justify-between items-center text-xs font-semibold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Showing {filteredStartups.length} of {startups.length} incubated ventures</span>
              {(searchTerm || selectedIndustry !== 'All' || selectedStage !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedIndustry('All');
                    setSelectedStage('All');
                  }}
                  className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Startups Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
              <p className="text-sm font-semibold text-slate-500">Connecting to PSIT SIF Startup Database...</p>
            </div>
          ) : filteredStartups.length === 0 ? (
            <div className="bg-white dark:bg-[#1e293b] p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
              <Building className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-xl font-bold font-outfit text-slate-800 dark:text-slate-200">No startups matched your search</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Try searching for a different keyword, sector, or reset the filters to view the full directory.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedIndustry('All');
                  setSelectedStage('All');
                }}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-md"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStartups.map((startup, index) => (
                <motion.div
                  key={startup.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
                  onClick={() => setSelectedStartup(startup)}
                  className="bg-white dark:bg-[#1e293b] rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Top Row: Logo & Stage */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      {startup.website ? (
                        <a
                          href={startup.website.startsWith('http') ? startup.website : `https://${startup.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title={`Visit ${startup.name} official website`}
                          className="w-24 h-24 bg-white dark:bg-slate-800 rounded-2xl p-2 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-inner hover:scale-110 hover:border-emerald-500 hover:shadow-xs transition-all shrink-0 cursor-pointer"
                        >
                          {startup.logo ? (
                            <img
                              src={startup.logo}
                              alt={startup.name}
                              className="max-h-20 w-auto max-w-full object-contain"
                            />
                          ) : (
                            <Building className="w-8 h-8 text-slate-400" />
                          )}
                        </a>
                      ) : (
                        <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-2xl p-2 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-inner group-hover:scale-105 transition-transform shrink-0">
                          {startup.logo ? (
                            <img
                              src={startup.logo}
                              alt={startup.name}
                              className="max-h-20 w-auto max-w-full object-contain"
                            />
                          ) : (
                            <Building className="w-8 h-8 text-slate-400" />
                          )}
                        </div>
                      )}

                      <div className="flex flex-col items-end gap-1.5">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {startup.stage || 'Active'}
                        </span>
                        {Array.isArray(startup.photos) && startup.photos.length > 0 && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                            <Camera className="w-2.5 h-2.5 text-emerald-600" />
                            {startup.photos.length} {startup.photos.length === 1 ? 'photo' : 'photos'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title & Industry */}
                    <h3 className="text-xl font-bold font-outfit text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {startup.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {startup.industry}
                    </p>

                    {/* Founders */}
                    {startup.founders && (
                      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                        <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="line-clamp-1 font-medium">{startup.founders}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-3 line-clamp-3">
                      {startup.description || `Innovative venture in ${startup.industry} supported by PSIT SIF.`}
                    </p>
                  </div>

                  {/* Footer Action Links */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      View Venture Details
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>

                    {startup.website && (
                      <a
                        href={startup.website.startsWith('http') ? startup.website : `https://${startup.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
                        title="Visit Official Website"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <StartupDetailModal
        startup={selectedStartup}
        isOpen={!!selectedStartup}
        onClose={() => setSelectedStartup(null)}
      />

      <Footer />
    </div>
  );
};

export default StartupsDirectoryPage;
