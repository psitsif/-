import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, Cpu, Users, BadgeDollarSign, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stages = [
  {
    step: '01',
    title: 'Ideation & Outreach',
    subtitle: 'Discover & Conceptualize',
    desc: 'Engaging student innovators, researchers, and early-stage founders through hackathons, outreach campaigns, and problem-identification bootcamps.',
    icon: Lightbulb,
    color: 'from-amber-500 to-orange-500'
  },
  {
    step: '02',
    title: 'Screening & Evaluation',
    subtitle: 'Validation & Selection',
    desc: 'Rigorous review by our institutional screening committee to assess technological merit, commercial viability, and founder dedication.',
    icon: CheckCircle2,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    step: '03',
    title: 'Incubation & Prototyping',
    subtitle: 'Infrastructure & Labs',
    desc: 'Access to dedicated co-working spaces, AICTE IDEA Lab facilities, industrial 3D printing, precision CNC machining, and computing workstations.',
    icon: Cpu,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    step: '04',
    title: 'Mentorship & IPR',
    subtitle: 'Domain Expertise & Patents',
    desc: 'One-on-one technical and business mentorship from senior academic leaders and industry veterans, backed by specialized patent filing support.',
    icon: Users,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    step: '05',
    title: 'Seed Grants & Funding',
    subtitle: 'Financial Acceleration',
   desc: 'Direct assistance in accessing prototype grant funding of up to ₹10 lakh through DST, StartInUP, and UPSM Inclusive-TBI programmes, along with MSME grants and early-stage angel investment opportunities.',
    icon: BadgeDollarSign,
    color: 'from-green-600 to-emerald-700'
  },
  {
    step: '06',
    title: 'Scale & Commercialization',
    subtitle: 'Market Launch & Growth',
    desc: 'Connecting validated startups with corporate partners, angel syndicates, and national venture capitalists through Demo Days and Conclaves.',
    icon: Rocket,
    color: 'from-rose-500 to-red-600'
  }
];

const IncubationJourney = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-[#11161d] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-heading-container">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-4 border border-emerald-200 dark:border-emerald-800">
            Lifecycle & Support
          </div>
          <h2 className="section-title">The Incubation Journey</h2>
          <div className="section-title-bar" />
          <p className="section-subtitle">
            From visionary breakthrough to sustainable commercial enterprise, our structured 6-stage pipeline provides the mentorship, infrastructure, and capital founders need at every milestone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative mt-12">
          {stages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-white dark:bg-[#1e293b] p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-outfit text-slate-200 dark:text-slate-700 group-hover:text-emerald-500/30 transition-colors">
                      {stage.step}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stage.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {stage.subtitle}
                  </span>
                  <h3 className="text-xl font-bold font-outfit text-slate-900 dark:text-white mt-1 mb-3">
                    {stage.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-bold text-slate-400 group-hover:text-emerald-600 transition-colors">
                  <span>Stage {idx + 1} of 6</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/incubation"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 transition-all text-sm"
          >
            Explore Incubation Guidelines & Benefits
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IncubationJourney;
