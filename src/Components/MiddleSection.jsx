import { useState } from 'react';
import { ChevronDown, ChevronUp, Target, Lightbulb, Users, BadgeDollarSign, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import incubationHub from "../assets/incubation-hub.png";
import innovationLogo from "../assets/innovation_cell_logo.png";

const MiddleSection = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const highlights = [
    {
      icon: <Target className="w-6 h-6" />,
      text: "Foster Innovation",
      desc: "Nurturing breakthrough ideas"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      text: "Support Startups",
      desc: "End-to-end incubation"
    },
    {
      icon: <Users className="w-6 h-6" />,
      text: "Build Community",
      desc: "Vibrant mentor network"
    },
    {
      icon: <BadgeDollarSign className="w-6 h-6" />,
      text: "Provide Funding",
      desc: "Financial seed support"
    }
  ];

  const toggleExpand = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <section className="py-24 bg-white dark:bg-[#161b22] relative overflow-hidden transition-colors duration-300">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-50/50 blur-[120px] rounded-full -z-1" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50/50 blur-[100px] rounded-full -z-1" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="section-heading-container mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold mb-6 border border-green-100 dark:border-green-800">
            <Zap className="w-4 h-4" />
            Flagship Program
          </div>
          <h2 className="section-title mb-4">i-TBI Program</h2>
          <div className="section-title-bar mb-8" />
          <p className="section-subtitle text-slate-600 dark:text-[#8b949e] max-w-4xl">
            The Inclusive Technology Business Incubator (i-TBI) is a prestigious Department of Science & Technology (DST) initiative, specifically engineered to catalyze innovation and entrepreneurship within our ecosystem.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Content Section */}
          <div className="lg:col-span-7 space-y-10 overflow-hidden pl-6">
            <div className="standard-card p-6 md:p-10 bg-slate-50/30 dark:bg-[#21262d]/50 backdrop-blur-sm border-slate-100 dark:border-[#30363d] w-full overflow-hidden">
              {/* Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start gap-5 bg-white dark:bg-[#21262d] p-5 rounded-2xl border border-slate-100 dark:border-[#30363d] shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-200">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-[#e6edf3] mb-1">{item.text}</h4>
                      <p className="text-xs text-slate-500 dark:text-[#8b949e] font-medium uppercase tracking-wider">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <p className="text-slate-600 dark:text-[#e6edf3] text-base leading-relaxed mb-8 border-l-[1px] border-green-600 pl-4 not-italic font-inter">
                &ldquo;We are committed to fostering a culture of innovation where students and entrepreneurs bridge the gap between visionary ideas and scalable commercial realities.&rdquo;
              </p>

              <p className="text-slate-500 dark:text-[#8b949e] leading-relaxed">
                Supported by the Department of Science & Technology (DST), this initiative provides a robust three-year framework for educational institutions to cultivate a thriving startup culture. We expect innovators to leverage our mentorship ecosystem to build high-impact tech solutions.
              </p>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4">
              <div className="standard-card overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-6 sm:p-8 text-left hover:bg-slate-50 transition-colors"
                  onClick={() => toggleExpand('criteria')}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">01</div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900">Academic Program Criteria</h3>
                  </div>
                  {expandedSection === 'criteria' ? (
                    <ChevronUp className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-emerald-600" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedSection === 'criteria' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 sm:px-8 pb-8 pt-2 border-t border-slate-100 text-sm text-slate-600 space-y-3"
                    >
                      <p>
                        The PSIT SIF incubation committee admits projects that demonstrate technological novelty, market applicability, and dedication to research translation:
                      </p>
                      <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                        <li><strong>Eligibility:</strong> PSIT students, alumni, faculty innovators, and external regional deep-tech entrepreneurs.</li>
                        <li><strong>Domain Focus:</strong> Artificial Intelligence, Wearables & Health IoT, Advanced Computing, and Prototyping Systems.</li>
                        <li><strong>Stage:</strong> Proof-of-concept (TRL 3+) through working functional prototype (TRL 6+).</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="standard-card overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-6 sm:p-8 text-left hover:bg-slate-50 transition-colors"
                  onClick={() => toggleExpand('vision')}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">02</div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900">Institutional Vision and Targets</h3>
                  </div>
                  {expandedSection === 'vision' ? (
                    <ChevronUp className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-emerald-600" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedSection === 'vision' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 sm:px-8 pb-8 pt-2 border-t border-slate-100 text-sm text-slate-600 space-y-3"
                    >
                      <p>
                        Aligned with national STI goals under the Department of Science & Technology (DST):
                      </p>
                      <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                        <li>Incubate and accelerate 40+ high-potential technology startups across the multi-year cycle.</li>
                        <li>Support IP filing, prior-art patent disclosures, and technology transfer via the institutional IPR cell.</li>
                        <li>Facilitate prototype grants up to ₹10 Lakhs under the DST inclusive-TBI scheme.</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Image/Badge Section */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-8 lg:sticky lg:top-32 h-max">
            {[
              { img: incubationHub, title: "Incubation Hub", url: "https://nidhi.dst.gov.in/", subtitle: "World-class infrastructure for tech-focused startups under DST inclusive-TBI." },
              { img: innovationLogo, title: "Innovation Cell", url: "https://mic.gov.in/", subtitle: "Nurturing the next generation of changemakers with MoE Innovation Cell." }
            ].map((banner, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="standard-card group relative bg-white border-slate-200 flex flex-col shadow-xs overflow-hidden"
              >
                <a
                  href={banner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Visit ${banner.title} official portal`}
                  className="w-full h-[180px] sm:h-[220px] image-container relative py-4 bg-white flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={banner.img}
                    alt={banner.title}
                    className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <div className="p-6 flex flex-col flex-grow">
                  <a
                    href={banner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-bold font-outfit mb-2 text-slate-900 hover:text-emerald-700 transition-colors border-l-2 border-emerald-600 pl-3 inline-flex items-center gap-2"
                  >
                    {banner.title}
                    <span className="text-xs font-normal text-emerald-600">↗</span>
                  </a>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal flex-grow">{banner.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiddleSection;