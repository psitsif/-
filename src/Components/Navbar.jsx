import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, Shield, ExternalLink } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import psitKanpurLogo from "../assets/psit_kanpur_logo.png";
import psitSifLogo from "../assets/psif_logo_2.png";

import startInUpLogo from "../assets/startinup.png";
import naacLogo from "../assets/naac.png";
import msmeLogo from "../assets/msme.png";
import dstNidhiLogo from "../assets/dst_nidhi.jpg";
import startupIndiaLogo from "../assets/logos/startup-india.png";

// Ultra-smooth 3D card-flip animation variants
// Ultra-smooth horizontal slide animation variants
const slideVariants = {
  enter: {
    x: "100%",
    opacity: 0,
  },
  center: {
    x: "0%",
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.75,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const leftLogos = [
  { src: psitKanpurLogo, alt: "PSIT Kanpur", link: "https://www.psit.ac.in" },
  { src: psitSifLogo, alt: "PSIT Startup & Incubation Foundation", link: "/" },
  { src: naacLogo, alt: "NAAC Accredited with Grade A+", link: "http://www.naac.gov.in/" },
];

const rightLogos = [
  { src: startInUpLogo, alt: "StartInUP - Government of Uttar Pradesh", link: "https://startinup.up.gov.in/" },
  { src: msmeLogo, alt: "Ministry of MSME, Govt of India", link: "https://msme.gov.in/" },
  { src: dstNidhiLogo, alt: "DST NIDHI - Startup Support", link: "https://dst.gov.in/" },
  { src: startupIndiaLogo, alt: "Startup India", link: "https://www.startupindia.gov.in/" },
];

const LeftLogoShowcase = ({ className }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={`relative isolate overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_3px_14px_rgba(15,23,42,0.05)] backdrop-blur-md transition-all hover:border-emerald-300/70 hover:shadow-md ${className}`}
    >
      <div className="flex h-full w-full items-center justify-around px-1">
        {leftLogos.map((logo, index) => {
          const logoImage = (
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-full w-full object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
            />
          );
          const linkClassName = `group relative flex h-full min-w-0 flex-1 items-center justify-center p-1.5 ${
            index < leftLogos.length - 1 ? "border-r border-slate-100" : ""
          }`;

          return logo.link.startsWith("/") ? (
            <Link
              key={logo.alt}
              to={logo.link}
              className={linkClassName}
              title={logo.alt}
              aria-label={logo.alt}
            >
              {logoImage}
            </Link>
          ) : (
            <a
              key={logo.alt}
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
              title={logo.alt}
              aria-label={logo.alt}
            >
              {logoImage}
            </a>
          );
        })}
      </div>

      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          initial={{ x: "-110%" }}
          animate={{ x: "360%" }}
          transition={{
            duration: 1.35,
            delay: 1,
            repeat: Infinity,
            repeatDelay: 2.8,
            ease: "easeInOut",
          }}
          style={{
            clipPath: "polygon(30% 0, 100% 0, 70% 100%, 0 100%)",
            willChange: "transform",
          }}
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent backdrop-blur-[2px] mix-blend-screen"
        />
      )}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [rightLogoIndex, setRightLogoIndex] = useState(0);
  const location = useLocation();

  const navItems = [
    { title: "Home", route: "/" },
    { title: "About", route: "/about" },
    { title: "Incubation", route: "/incubation" },
    { title: "Startups", route: "/startups" },
    { title: "Programs", route: "/programs" },
    { title: "Events", route: "/events" },
    { title: "Ecosystem", route: "/ecosystem" },
    { title: "Team", route: "/team" },
    { title: "IIC", route: "/iic" },
    { title: "Contact", route: "/contact" },
  ];

  const isActive = (route) => {
    if (route === "/" || route === "/home") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname.startsWith(route);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Auto-cycle right partner logos with smooth 3D card animation
  useEffect(() => {
    const timer = setInterval(() => {
      setRightLogoIndex((prev) => (prev + 1) % rightLogos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative w-full z-40 bg-white">
            {/* 1. Top Institutional Accreditation Header */}
      <div className="bg-gradient-to-b from-slate-50/70 via-white to-white border-b border-slate-200/80 py-4 sm:py-5 lg:py-6">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10">

          {/* ── Mobile Header Layout (< md): Exactly Matches Reference ── */}
          <div className="flex flex-col items-center md:hidden w-full text-center">
            
            {/* 1. Logo Row: Left & Right animated logo boxes side-by-side */}
            <div className="flex flex-row items-center justify-between w-full max-w-[310px] min-[390px]:max-w-[340px] sm:max-w-md mx-auto mb-3.5">
              
              <LeftLogoShowcase className="h-[84px] w-[164px] sm:h-24 sm:w-44" />

              {/* Right Animated Partner Logo Box + Pagination */}
              <div className="flex flex-col items-center">
                <div className="relative h-[76px] w-[132px] sm:h-24 sm:w-40 rounded-2xl bg-white/95 border border-slate-200/80 shadow-[0_3px_14px_rgba(15,23,42,0.05)] hover:shadow-md hover:border-emerald-300/70 transition-all overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={rightLogoIndex}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 flex items-center justify-center p-2"
                      style={{ willChange: "transform, opacity" }}
                    >
                      {rightLogos[rightLogoIndex].link.startsWith("/") ? (
                        <Link
                          to={rightLogos[rightLogoIndex].link}
                          className="flex items-center justify-center w-full h-full p-0.5 group"
                          title={rightLogos[rightLogoIndex].alt}
                        >
                          <img
                            src={rightLogos[rightLogoIndex].src}
                            alt={rightLogos[rightLogoIndex].alt}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
                          />
                        </Link>
                      ) : (
                        <a
                          href={rightLogos[rightLogoIndex].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-full h-full p-0.5 group"
                          title={rightLogos[rightLogoIndex].alt}
                        >
                          <img
                            src={rightLogos[rightLogoIndex].src}
                            alt={rightLogos[rightLogoIndex].alt}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
                          />
                        </a>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Right Pagination Indicator Bar */}
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  {rightLogos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setRightLogoIndex(i)}
                      className="py-1 px-0.5 group focus:outline-none"
                      aria-label={`Switch to partner logo ${i + 1}`}
                    >
                      <span
                        className={`block h-1 rounded-full transition-all duration-300 ${
                          i === rightLogoIndex
                            ? "w-5 bg-emerald-600 shadow-xs"
                            : "w-1.5 bg-slate-300 group-hover:bg-slate-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* 2. Central Heading: Exact 3-line arrangement */}
            <h1 className="font-outfit text-slate-900 tracking-tight leading-none my-1.5 flex flex-col items-center">
              <span className="block text-[22px] min-[390px]:text-2xl sm:text-2xl font-black tracking-tight text-slate-900 leading-tight">
                PSIT STARTUP
              </span>
              <span className="block text-xs min-[390px]:text-sm sm:text-sm font-extrabold text-emerald-700 leading-tight my-1">
                &amp;
              </span>
              <span className="block text-[22px] min-[390px]:text-2xl sm:text-2xl font-black tracking-tight text-slate-900 leading-tight">
                INCUBATION FOUNDATION
              </span>
            </h1>

            {/* 3. DST Supported Banner: full-width pill outline */}
            <div className="w-full max-w-sm px-2 mt-2.5 mb-2">
              <span className="inline-flex items-center justify-center gap-1.5 text-[8px] min-[390px]:text-[8.5px] sm:text-[11px] uppercase tracking-tight font-extrabold text-emerald-800 bg-emerald-50/90 border border-emerald-200/80 px-2.5 sm:px-3.5 py-1 rounded-full shadow-xs w-full text-center whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                Department of Science &amp; Technology (DST) Supported
              </span>
            </div>

            {/* 4. DST inclusive-TBI Label */}
            <div className="mt-0.5">
              <span className="inline-block text-[10px] sm:text-xs font-bold text-slate-700 bg-slate-100/90 border border-slate-200/60 px-2.5 py-0.5 rounded-md">
                DST inclusive-TBI
              </span>
            </div>

            {/* 5. Center for AI/ML and Wearable Devices */}
            <div className="mt-1.5">
              <span className="block text-[9px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Center for AI/ML and Wearable Devices
              </span>
            </div>

          </div>

          {/* ── Desktop Layout (>= md): Existing Layout Completely Preserved ── */}
          <div className="hidden md:flex flex-row items-center justify-between gap-6 lg:gap-8 xl:gap-12 min-w-0">

            <LeftLogoShowcase className="h-24 w-48 lg:h-24 lg:w-56 xl:h-28 xl:w-64" />

            {/* ── Centre: Institutional Title ── */}
            <div className="flex flex-col items-center text-center min-w-0 flex-1 px-4 sm:px-6 max-w-4xl">
              <div className="mb-1.5 sm:mb-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] md:text-xs uppercase tracking-widest font-extrabold text-emerald-800 bg-emerald-50/90 border border-emerald-200/70 px-3 py-1 rounded-full shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Department of Science &amp; Technology (DST) Supported
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-[2.65rem] font-black font-outfit text-slate-950 tracking-tight leading-tight sm:leading-snug break-words">
                PSIT STARTUP <span className="text-emerald-700">&amp;</span> INCUBATION FOUNDATION
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 mt-1.5 sm:mt-2.5">
                <span className="text-xs md:text-sm font-bold text-slate-700 bg-slate-100/90 border border-slate-200/60 px-2.5 py-0.5 rounded-md">
                  DST inclusive-TBI
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Center for AI/ML and Wearable Devices
                </span>
              </div>
            </div>

            {/* ── Right: Animated Partner Logo Carousel (4 Logos) ── */}
            <div className="shrink-0 flex flex-col items-center">
              <span className="hidden sm:block text-[9px] sm:text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                Partners &amp; Accreditations
              </span>
              <div className="relative md:w-36 md:h-24 lg:w-44 lg:h-24 xl:w-48 xl:h-28 rounded-2xl bg-white/95 border border-slate-200/80 shadow-[0_3px_14px_rgba(15,23,42,0.05)] hover:shadow-md hover:border-emerald-300/70 transition-all overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={rightLogoIndex}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 flex items-center justify-center p-3"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {rightLogos[rightLogoIndex].link.startsWith("/") ? (
                      <Link
                        to={rightLogos[rightLogoIndex].link}
                        className="flex items-center justify-center w-full h-full p-0.5 group"
                        title={rightLogos[rightLogoIndex].alt}
                      >
                        <img
                          src={rightLogos[rightLogoIndex].src}
                          alt={rightLogos[rightLogoIndex].alt}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
                        />
                      </Link>
                    ) : (
                      <a
                        href={rightLogos[rightLogoIndex].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full h-full p-0.5 group"
                        title={rightLogos[rightLogoIndex].alt}
                      >
                        <img
                          src={rightLogos[rightLogoIndex].src}
                          alt={rightLogos[rightLogoIndex].alt}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-xs"
                        />
                      </a>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slim Minimalist Indicator Bar for Right Carousel */}
              <div className="flex items-center justify-center gap-1.5 mt-2.5">
                {rightLogos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setRightLogoIndex(i)}
                    className="py-1 px-0.5 group focus:outline-none"
                    aria-label={`Switch to partner logo ${i + 1}`}
                  >
                    <span
                      className={`block h-1 rounded-full transition-all duration-300 ${
                        i === rightLogoIndex
                          ? "w-4 bg-emerald-600 shadow-xs"
                          : "w-1.5 bg-slate-300 group-hover:bg-slate-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav
        className={`w-full sticky top-0 transition-all duration-300 z-50 ${isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-2.5 border-b border-slate-200"
            : "bg-[#f8fafc] py-3 border-b border-slate-200/80"
          }`}
      >
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-7">
              {navItems.map((item) => {
                const active = isActive(item.route);
                return (
                  <Link
                    key={item.route}
                    to={item.route}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noopener noreferrer" : undefined}
                    className={`relative py-1 text-sm font-bold transition-colors ${active
                        ? "text-emerald-700"
                        : "text-slate-700 hover:text-slate-950"
                      }`}
                  >
                    {item.title}
                    {active && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                to="/admin"
                className="px-3.5 py-2 text-xs font-bold text-slate-600 hover:text-emerald-700 rounded-lg hover:bg-slate-100 transition-all flex items-center gap-1.5"
                title="Admin Management Panel"
              >
                <Shield className="w-3.5 h-3.5" />
                CMS Admin
              </Link>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdC7JnM4DRB5AhCctMmgUiCG73-uiDLR8NxbIky6UUOUCC8mA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center gap-1.5"
              >
                Apply for Incubation
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Header / Toggle */}
            <div className="lg:hidden flex items-center justify-between w-full">
              <Link to="/" className="text-sm font-extrabold font-outfit text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full animate-pulse" />
                PSIT SIF
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  to="/admin"
                  className="p-2 text-xs font-bold text-slate-600 rounded-lg"
                  title="Admin Portal"
                >
                  <Shield className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
                  aria-label="Toggle navigation menu"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-200 px-4 sm:px-6 py-4 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.route}
                    to={item.route}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noopener noreferrer" : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-3 px-3 rounded-xl text-sm font-bold flex justify-between items-center transition-colors ${isActive(item.route)
                        ? "bg-emerald-50 text-emerald-700 font-extrabold"
                        : "text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    {item.title}
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </Link>
                ))}

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdC7JnM4DRB5AhCctMmgUiCG73-uiDLR8NxbIky6UUOUCC8mA/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center text-sm shadow-md flex items-center justify-center gap-2"
                  >
                    Apply for Incubation
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-2.5 text-center text-xs font-semibold text-slate-500 hover:text-emerald-700 flex items-center justify-center gap-1.5"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Admin CMS Login
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
