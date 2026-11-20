import { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Dean from '../Components/Dean';
import TestimonialSection from '../Components/TestimonialSection';
import Team from '../Components/ui/Team';

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-16 sm:py-20 px-4 border-b border-slate-200/80 text-center">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 mb-4 shadow-2xs">
              Institutional Leadership & Mentorship
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-outfit text-slate-900 tracking-tight">
              Our Leadership & Team
            </h1>
            <div className="h-1.5 w-16 bg-emerald-600 rounded-full mx-auto my-4" />
            <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
              Guided by distinguished academic visionaries and industry professionals committed to accelerating student-led technology ventures.
            </p>
          </div>
        </section>

        <TestimonialSection />
        <Dean />
        <Team />
      </main>

      <Footer />
    </div>
  );
};

export default TeamPage;
