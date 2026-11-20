import { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ContactSection from '../Components/ContactSection';
import { Clock, ShieldCheck, HelpCircle } from 'lucide-react';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* Banner */}
        <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-16 px-4 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4 shadow-2xs">
              Institutional Communications
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit text-slate-900 tracking-tight">
              Contact PSIT SIF
            </h1>
            <div className="h-1.5 w-16 bg-emerald-600 rounded-full mx-auto my-4" />
            <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-normal">
              Our doors are always open to visionary students, entrepreneurs, research collaborators, and industry leaders.
            </p>
          </div>
        </div>

        {/* Real Contact Section with Form & Map */}
        <ContactSection />

        {/* Operating Information FAQ Strip */}
        <div className="py-12 bg-slate-50/70 border-t border-slate-200 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <Clock className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 font-outfit">Incubation Lab Hours</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Monday to Saturday: 09:00 AM – 06:00 PM<br />
                  Lab & workstation access available for incubated founders.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 font-outfit">IPR & Patent Clinic</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Prior-art search, patent drafting, and disclosure guidance facilitated by our in-house IPR cell.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
              <HelpCircle className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 font-outfit">Incubation Admission</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Rolling admissions for AI/ML, IoT, and wearable prototypes under DST inclusive-TBI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
