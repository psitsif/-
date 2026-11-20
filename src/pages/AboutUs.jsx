import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import dualiteLogo from "../assets/logos/dualite.png";
import senseLogo from "../assets/logos/senseoriginal.png";
import samochaLogo from "../assets/logos/smoocha.png";
import zerythronLogo from "../assets/logos/zerowaste.png";
import goodFermentLogo from "../assets/logos/bay.png";
import wyvateLogo from "../assets/logos/wyvate.png";
import greenhaleLogo from "../assets/logos/kojo.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SuccessStoriesSlider = () => {
  const stories = [
    {
      company: "Dualite",
      logo: dualiteLogo,
      website: "https://dualite.dev",
      achievement: "Secured funding from 100X.VC",
      description: "Dualite transitioned from an early-stage prototype to a venture-backed startup, securing substantial funding from 100X.VC. Their journey demonstrates how technical precision and market-ready innovation, nurtured within our ecosystem, can attract serious investor confidence.",
      impact: "Transforming developer-designer collaboration through seamless design-to-code automation."
    },
    {
      company: "Senseoriginal Technologies",
      logo: senseLogo,
      website: "https://senseoriginal.com",
      achievement: "Early Revenue Growth & Market Traction",
      description: "Senseoriginal achieved early revenue milestones in the IoT and deep-tech landscape, demonstrating exceptional growth. Their commitment to combating counterfeiting through advanced technology has positioned them as an emerging leader in brand protection.",
      impact: "Pioneering deep-tech security solutions that protect global brands from counterfeiting."
    },
    {
      company: "Samocha",
      logo: samochaLogo,
      website: "https://samocha.co",
      achievement: "Growth & Scale",
      description: "Born from the entrepreneurial drive of college students, Samocha delivers premium, hygienic fresh chai, beverages, and snacks through retail outlets.",
      impact: "Building Community Connections Over Tea"
    },
    {
      company: "Zerythron",
      logo: zerythronLogo,
      website: "",
      achievement: "Incubated Waste-Management Venture",
      description: "Zerythron is developing zero-waste segregation and organic-waste bioremediation systems for smart campuses.",
      impact: "Campus zero-waste systems"
    },
    {
      company: "Good Ferment Beverages",
      logo: goodFermentLogo,
      website: "https://baykombucha.com",
      achievement: "Fermented Beverage Innovation",
      description: "Good Ferment Beverages crafts health-forward fermented drinks and kombucha using specialized biotechnology processes.",
      impact: "Health-forward beverage innovation"
    },
    {
      company: "Wyvate Tech",
      logo: wyvateLogo,
      website: "https://wyvate.com",
      achievement: "Enterprise Workflow Automation",
      description: "Wyvate Tech is building a cloud-native business workflow automation suite to support productivity for mid-market enterprises.",
      impact: "Enterprise digital transformation"
    },
    {
      company: "Greenhale Wellness (Kojo Life)",
      logo: greenhaleLogo,
      website: "https://kojolife.com",
      achievement: "Science-Backed Personal Care",
      description: "Greenhale Wellness (Kojo Life) creates natural personal-care formulations with a focus on evidence-backed efficacy.",
      impact: "Clean living and sustainable personal care"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [stories.length]);

  return (
    <div className="relative group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 border border-gray-100 flex flex-col md:flex-row items-center gap-8 md:gap-10"
        >
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <a
              href={stories[currentIndex].website || "/startups"}
              target={stories[currentIndex].website.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              title={`Visit ${stories[currentIndex].company} official website`}
              className="w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-2xl p-4 sm:p-5 flex items-center justify-center mb-6 hover:scale-105 hover:shadow-md transition-all border border-slate-200 cursor-pointer group/logo"
            >
              <img
                src={stories[currentIndex].logo}
                alt={stories[currentIndex].company}
                className="w-full h-full object-contain transition-transform group-hover/logo:scale-105"
              />
            </a>
            <div className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold uppercase tracking-wider text-center">
              {stories[currentIndex].achievement}
            </div>
          </div>

          <div className="w-full md:w-2/3 relative">
            <a
              href={stories[currentIndex].website || "/startups"}
              target={stories[currentIndex].website.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 hover:text-emerald-700 transition-colors inline-block"
            >
              {stories[currentIndex].company} ↗
            </a>
            <p className="text-base sm:text-xl text-gray-600 leading-relaxed mb-6 italic">
              &ldquo;{stories[currentIndex].description}&rdquo;
            </p>
            <div className="flex items-start gap-3">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-green-500 shrink-0" />
              <p className="text-gray-800 font-medium">
                <span className="text-green-600 font-bold">The Impact:</span> {stories[currentIndex].impact}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length)}
          className="p-3 rounded-full bg-white shadow-md border border-gray-100 text-gray-400 hover:text-green-600 hover:border-green-200 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % stories.length)}
          className="p-3 rounded-full bg-white shadow-md border border-gray-100 text-gray-400 hover:text-green-600 hover:border-green-200 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {stories.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-green-500' : 'w-2 bg-gray-200'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function AboutUs() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="section-heading-container mt-12">
          <h2 className="section-title">About Us</h2>
          <div className="section-title-bar" />
        </div>

        {/* Introduction Text */}
        <div className="mt-8 text-lg md:text-xl lg:text-2xl text-neutral-600 space-y-8 max-w-4xl mx-auto text-justify">
          <p>
            PSIT Startup and Incubation Foundation (PSIT-SIF) is an initiative dedicated to
            fostering innovation and entrepreneurship at Pranveer Singh Institute of
            Technology (PSIT), Kanpur. Drawing inspiration from IIT Kanpur&apos;s pioneering
            ecosystem, we strive to build a thriving startup environment by equipping
            entrepreneurs with targeted mentorship, hands-on resources, and the strategic
            support needed to turn bold ideas into viable ventures.
          </p>

          <p>
            Our Incubation Centre operates at the heart of India&apos;s innovation landscape,
            empowering students, transforming industries, and fueling economic growth. We deliver
            an integrated support system comprising expert mentorship, modern research-grade
            facilities, strategic networking, and financial backing, all designed to help
            startups scale with confidence.
          </p>
        </div>

        {/* Key Features Section */}
        <div className="py-20 bg-gray-50 -mx-4 px-4 border-y border-gray-100">
          <div className="section-heading-container">
            <h2 className="section-title">Key Features</h2>
            <div className="section-title-bar" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            {[
              {
                title: "Seed Funding",
                image: "/fet1.png",
                description: "Early-stage financial assistance helps founders launch their ventures and prepare confidently for fundraising and investor engagements."
              },
              {
                title: "Mentorship",
                image: "/fet2.png",
                description: "Dedicated industry mentors guide founders through challenges and help them identify high-impact growth opportunities."
              },
              {
                title: "Infrastructure",
                image: "/fet3.png",
                description: "Modern laboratories, prototyping stations, and co-working spaces provide the infrastructure to innovate and iterate rapidly."
              },
              {
                title: "Networking",
                image: "/fet4.png",
                description: "Curated introductions to investors, industry leaders, and peer founders open doors to partnerships, funding, and market access."
              },
              {
                title: "Training & Workshops",
                image: "/fet5.png",
                description: "Targeted workshops and hands-on training sessions sharpen technical skills, business acumen, and market readiness."
              },
              {
                title: "Community and Collaboration",
                image: "/fet6.png",
                description: "A vibrant peer community enables startups to exchange insights, share resources, and accelerate collective learning."
              }
            ].map((feature, index) => (
              <div key={index} className="card flex flex-col bg-white shadow-md border border-slate-200 rounded-lg">
                <div className="relative w-full h-32 overflow-hidden rounded-t-lg">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h2 className="mb-2 text-slate-800 text-xl md:text-2xl font-semibold">{feature.title}</h2>
                  <p className="text-slate-600 text-sm leading-normal">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fueling Innovation Section */}
        <div className="py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-2/3">
              <div className="section-heading-container text-left items-start mb-8">
                <h2 className="section-title !text-left">Fueling Innovation at PSIT-SIF</h2>
                <div className="section-title-bar !mx-0" />
              </div>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 text-justify">
                Innovation drives lasting change, and our incubation programs exist to
                make that change possible. We equip emerging entrepreneurs with practical
                tools, expert mentorship, and strategic resources  everything required
                to move from concept to market. Through a robust ecosystem of guidance,
                networking, and funding, we help founders navigate obstacles, sharpen
                their business models, and deliver solutions that matter.
              </p>
            </div>
            <div className="lg:w-1/3">
              <img
                className="w-full max-w-md mx-auto"
                src="/fet7.png"
                alt="Innovation illustration"
              />
            </div>
          </div>
        </div>

        {/* Focus Area Section */}
        <div className="py-16">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8">
            <div className="lg:w-1/3">
              <img
                className="w-full max-w-md mx-auto"
                src="/fet8.png"
                alt="Emerging Technology"
              />
            </div>
            <div className="lg:w-2/3">
              <div className="section-heading-container text-left items-start mb-8">
                <h2 className="section-title !text-left">Focus Area: Emerging Technologies</h2>
                <div className="section-title-bar !mx-0" />
              </div>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-600 text-justify">
               Our primary focus spans three domains: Artificial Intelligence (AI),
                Machine Learning (ML), and wearable devices.
                From AI-driven analytics and intelligent healthcare wearables to smart
                consumer devices and next-generation automation, we provide the mentorship,
                funding, and network access that founders need to move from prototype
                to market-ready product.
              </p>
            </div>
          </div>
        </div>

        {/* Success Stories Section - Sliding Carousel */}
        <div className="bg-gradient-to-b from-green-50 to-white py-20 px-4 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <div className="section-heading-container">
              <h2 className="section-title">Success Stories</h2>
              <div className="section-title-bar" />
            </div>

            <SuccessStoriesSlider />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
