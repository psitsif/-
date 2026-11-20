import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import founderCollaboration from "../assets/banner/sif-founder-collaboration.png";
import incubationWelcome from "../assets/banner/sif-incubation-welcome.jpeg";
import learningSpace from "../assets/banner/sif-learning-space.jpeg";
import incubationTeamwork from "../assets/banner/sif-incubation-teamwork.jpeg";
import innovationHub from "../assets/banner/sif-innovation-hub.jpg";

const SLIDE_DURATION = 6000;

const slides = [
  {
    image: founderCollaboration,
    title: "Ideas grow through collaboration",
    description: "Mentorship and peer learning help founders turn early concepts into promising ventures."
  },
  {
    image: incubationWelcome,
    title: "A welcoming home for innovation",
    description: "PSIT-SIF brings student innovators and founders into a supportive incubation ecosystem."
  },
  {
    image: learningSpace,
    title: "Space to learn, build, and iterate",
    description: "Dedicated facilities support focused work, prototyping, and venture development."
  },
  {
    image: incubationTeamwork,
    title: "Where founders shape the next big idea",
    description: "Collaborative spaces connect teams, mentors, and emerging ventures."
  },
  {
    image: innovationHub,
    title: "Innovation starts at PSIT-SIF",
    description: "A dedicated incubation ecosystem helps nurture entrepreneurship from idea to impact."
  }
];

const MissionSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % slides.length);
  }, [currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex]);

  const current = slides[currentIndex];

  return (
    <section className="relative w-full bg-[#f8fafc] py-10 sm:py-14 lg:py-16 border-b border-slate-200/80 overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-emerald-800 text-xs sm:text-sm font-bold tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              PSIT Startup &amp; Incubation Foundation · Kanpur
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-outfit text-slate-900 tracking-tight leading-[1.12]"
            >
              Ideas worth building. Startups ready to grow.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl"
            >
              We help student innovators and early-stage founders turn promising ideas into real ventures through mentorship, labs, and startup support.
            </motion.p>

            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                to="/startups"
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-sm shadow-md shadow-emerald-900/15 transition-colors flex items-center gap-2"
              >
                Explore Startups
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdC7JnM4DRB5AhCctMmgUiCG73-uiDLR8NxbIky6UUOUCC8mA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-slate-700 hover:text-emerald-800 transition-colors"
              >
                Apply for incubation
              </a>
            </div>
          </div>

          {/* Right Image Showcase Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] max-h-[440px] rounded-xl overflow-hidden shadow-xl border border-slate-200/90 bg-white">
              <div className="w-full h-full overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentIndex}
                    src={current.image}
                    alt={current.title}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Subtle soft bottom gradient for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6 sm:p-8">
                  <div className="text-white">
                    <div className="text-xs uppercase tracking-wider font-bold text-emerald-300">PSIT-SIF Incubation Ecosystem</div>
                    <div className="text-lg sm:text-xl font-semibold">{current.title}</div>
                    <p className="mt-1 max-w-2xl text-sm sm:text-base leading-relaxed text-white/90">
                      {current.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Slider Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all z-20"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all z-20"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center items-center gap-2 mt-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-emerald-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
