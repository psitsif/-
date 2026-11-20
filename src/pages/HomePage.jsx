import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import Navbar from "../Components/Navbar";
import MissionSection from "../Components/MissionSection";
import IncubationJourney from "../Components/IncubationJourney";
import MiddleSection from "../Components/MiddleSection";
import ThrustAreas from "../Components/ThrustAreas";
import Facilities from "../Components/Facilities";
import Event from "../Components/Events";
import TestimonialSection from "../Components/TestimonialSection";
import Dean from "../Components/Dean";
import Team from "../Components/ui/Team";
import ProgramPartners from "../Components/ProgramPartners";
import ContactSection from "../Components/ContactSection";
import Footer from "../Components/Footer";
import StartupDetailModal from "../Components/StartupDetailModal";
import { getStartups, getDashboardStats } from "../lib/api";
import fallbackData from "../data/fallbackData.json";
import { ArrowRight, Building } from "lucide-react";

const getFounderCount = (startups) => new Set(
  startups.flatMap((startup) =>
    (startup.founders || "")
      .split(/\s*(?:\/|,|&|\band\b)\s*/i)
      .map((founder) => founder.trim())
      .filter(Boolean)
  )
).size;

const AnimatedStat = ({ value, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const target = Number(value) || 0;

  useEffect(() => {
    if (!isInView) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return undefined;
    }

    const duration = 1400;
    let frameId;
    let startTime;
    const animateCount = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - ((1 - progress) ** 3);
      setCount(Math.round(easedProgress * target));
      if (progress < 1) frameId = window.requestAnimationFrame(animateCount);
    };

    frameId = window.requestAnimationFrame(animateCount);
    return () => window.cancelAnimationFrame(frameId);
  }, [isInView, target]);

  return (
    <div ref={ref}>
      <div className="text-3xl sm:text-4xl font-extrabold font-outfit text-emerald-700">
        {count.toLocaleString()}+
      </div>
      <div className="text-[11px] sm:text-xs uppercase tracking-widest text-slate-600 font-bold mt-1">
        {label}
      </div>
    </div>
  );
};

const HomePage = () => {
  const location = useLocation();
  const [topStartups, setTopStartups] = useState([]);
  const [stats, setStats] = useState(() => ({
    ...fallbackData.stats,
    founders: getFounderCount(fallbackData.startups)
  }));
  const [selectedStartup, setSelectedStartup] = useState(null);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.getElementById(location.hash.substring(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, [location.hash]);

  useEffect(() => {
    async function load() {
      try {
        const [starts, st] = await Promise.all([
          getStartups(),
          getDashboardStats()
        ]);
        setTopStartups(starts.slice(0, 10));
        setStats({ ...st, founders: getFounderCount(starts) });
      } catch (err) {
        console.error("Error loading homepage dynamic data:", err);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white text-slate-800 overflow-hidden">
      <Navbar />

      {/* 1. Hero Section */}
      <MissionSection />

      {/* 2. Ecosystem Stats */}
      <section className="bg-white text-slate-800 py-7 sm:py-8 border-b border-slate-200">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-y-6 text-center"
          >
            {[
              { value: stats.startups, label: "Startups supported" },
              { value: stats.founders, label: "Founders mentored" },
              { value: stats.events, label: "Events conducted" },
              { value: stats.partners, label: "Ecosystem partners" }
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="px-3"
              >
                <AnimatedStat value={item.value} label={item.label} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. SIF Overview Brief */}
      <section className="py-20 bg-white dark:bg-[#161b22] transition-colors">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            About PSIT SIF
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit tracking-tight">
            Catalyzing Innovation at the Core of Central Uttar Pradesh
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            PSIT Startup and Incubation Foundation (PSIT-SIF) is a dedicated technology incubator at Pranveer Singh Institute of Technology (PSIT), Kanpur. Drawing structural inspiration from premier institutional ecosystems like IIT Kanpur, we equip emerging student innovators and deep-tech entrepreneurs with seed capital, research laboratories, patent advisory, and verified venture links.
          </p>
          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Read Full Institutional Overview & Leadership Message
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Incubation Journey */}
      <IncubationJourney />

      {/* 5. Thrust / Focus Areas */}
      <ThrustAreas />

      {/* 6. Facilities & Advanced Workstations */}
      <Facilities />

      {/* 7. Featured Startups Preview */}
      <section className="py-20 bg-slate-50 dark:bg-[#11161d] border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
                Ecosystem Ventures
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit text-slate-900 dark:text-white mt-1">
               Our Incubated Startups 
              </h2>
            </div>
            <Link
              to="/startups"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
            >
              View Full Directory ({stats.startups} Startups)
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-6">
            {topStartups.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelectedStartup(s)}
                className="bg-white dark:bg-[#1e293b] p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-emerald-500/50 cursor-pointer transition-all flex flex-col items-center text-center group min-w-0"
              >
                {s.website ? (
                  <a
                    href={s.website.startsWith('http') ? s.website : `https://${s.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title={`Visit ${s.name} official website`}
                    className="w-24 h-24 bg-white dark:bg-slate-800 rounded-2xl p-2 flex items-center justify-center mb-3 hover:scale-110 hover:border-emerald-500 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs"
                  >
                    {s.logo ? (
                      <img src={s.logo} alt={s.name} className="max-h-20 w-auto max-w-full object-contain" />
                    ) : (
                      <Building className="w-8 h-8 text-slate-400" />
                    )}
                  </a>
                ) : (
                  <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-2xl p-2 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform border border-slate-200 dark:border-slate-700">
                    {s.logo ? (
                      <img src={s.logo} alt={s.name} className="max-h-20 w-auto max-w-full object-contain" />
                    ) : (
                      <Building className="w-8 h-8 text-slate-400" />
                    )}
                  </div>
                )}
                <h4 className="text-xs font-bold font-outfit text-slate-900 dark:text-white line-clamp-1">
                  {s.name}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {s.industry}
                </p>
                <span className="mt-2 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  {s.stage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Flagship i-TBI Program */}
      <MiddleSection />

      {/* 9. Events Platform */}
      <Event />

      {/* 10. Programs & Partners */}
      <ProgramPartners />

      {/* 11. Dignitaries & Dean */}
      <TestimonialSection />
      <Dean />

      {/* 12. Incubation Team */}
      <Team />

      {/* 13. Working Contact Section */}
      <ContactSection />

      {/* 14. Footer */}
      <Footer />

      <StartupDetailModal
        startup={selectedStartup}
        isOpen={!!selectedStartup}
        onClose={() => setSelectedStartup(null)}
      />
    </div>
  );
};

export default HomePage;
