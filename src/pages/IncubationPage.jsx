import { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import IncubationJourney from '../Components/IncubationJourney';
import Facilities from '../Components/Facilities';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, BadgeDollarSign, Shield, Cpu, Users, Building } from 'lucide-react';

const offerings = [
  {
    icon: BadgeDollarSign,
    title: "Seed Grant Support",
    desc: "Direct access to prototype seed funding grants up to ₹10 Lakhs under the DST inclusive-TBI scheme to build tangible proofs-of-concept and market pilots."
  },
  {
    icon: Building,
    title: "Co-Working & Prototyping",
    desc: "Fully equipped plug-and-play incubation workspaces, meeting rooms, discussion lounges, and high-speed research networks inside PSIT Kanpur."
  },
  {
    icon: Cpu,
    title: "AICTE IDEA Lab Hardware",
    desc: "Access to industrial 3D printers, laser cutters, CNC machines, embedded firmware testing benches, and electronic design automation stations."
  },
  {
    icon: Users,
    title: "Ecosystem Mentorship",
    desc: "Regular 1-on-1 strategy sessions with successful founders, domain-expert faculty, intellectual property attorneys, and investor networks."
  },
  {
    icon: Shield,
    title: "Intellectual Property Support Centre",
    desc: "End-to-end facilitation for patent search, provisional drafting, patent lifecycle management, and corporate technology transfer."
  },
  {
    icon: CheckCircle2,
    title: "Corporate & Government Links",
    desc: "Showcase opportunities through MSME schemes, Start in UP, National Demo Days, and UP Global Investors Summits."
  }
];

const IncubationPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Header */}
        <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-16 sm:py-20 px-4 border-b border-slate-200/80 text-center">
          <div className="max-w-7xl mx-auto relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4 shadow-2xs">
              DST inclusive-TBI Flagship Architecture
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-outfit text-slate-900 tracking-tight leading-tight">
              Incubation at PSIT SIF
            </h1>
            <div className="h-1.5 w-16 bg-emerald-600 rounded-full mx-auto my-4" />
            <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
              We empower student creators, academic researchers, and ambitious entrepreneurs with seed funding, world-class lab infrastructure, and seasoned venture mentorship.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdC7JnM4DRB5AhCctMmgUiCG73-uiDLR8NxbIky6UUOUCC8mA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 text-sm"
              >
                Apply for Incubation
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#offerings"
                className="px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl border border-slate-200 shadow-2xs transition-all text-sm"
              >
                Explore Offerings
              </a>
            </div>
          </div>
        </section>

        {/* Incubation Pipeline Journey */}
        <IncubationJourney />

        {/* Core Offerings Grid */}
        <section id="offerings" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-heading-container">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-4 border border-emerald-200 shadow-2xs">
                Institutional Infrastructure
              </div>
              <h2 className="section-title">Resources to Build and Scale Your Startup</h2>
              <div className="section-title-bar" />
              <p className="section-subtitle">
                A 360-degree support system designed to eliminate technical, logistical, and financial bottlenecks so founders can focus on product validation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {offerings.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-8 rounded-3xl bg-slate-50/60 border border-slate-200 shadow-xs hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <Facilities />

        {/* CTA Banner */}
        <section className="py-20 bg-emerald-600 text-white px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-outfit">
              Ready to Turn Your Innovation into an Enterprise?
            </h2>
            <p className="text-emerald-100 text-lg leading-relaxed">
              Applications are reviewed on a rolling basis by the PSIT SIF Incubation Committee.
            </p>
            <div className="pt-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdC7JnM4DRB5AhCctMmgUiCG73-uiDLR8NxbIky6UUOUCC8mA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-800 hover:bg-slate-100 font-extrabold rounded-2xl shadow-xl transition-all text-base"
              >
                Submit Incubation Application
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default IncubationPage;
