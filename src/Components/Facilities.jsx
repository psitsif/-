import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import library from '../assets/facilities/library.png';
// New Startup Room Gallery
import startup1 from '../assets/facilities/startup1.png';
import startup2 from '../assets/facilities/startup2.jpg';
import startupRoomMeeting2 from '../assets/facilities/startup-room-meeting-2.jpeg';

// Computer Lab Gallery
import computerLab1 from '../assets/facilities/computer-lab-1.jpeg';
import computerLab2 from '../assets/facilities/computer-lab-2.jpeg';
import computerLab3 from '../assets/facilities/computer-lab-3.jpeg';
import computerLab4 from '../assets/facilities/computer-lab-4.jpeg';

// Workstation images
import workstation from '../assets/facilities/workstation.png';
import advancedWorkstations1 from '../assets/facilities/advanced-workstations-1.jpeg';
import advancedWorkstations2 from '../assets/facilities/advanced-workstations-2.jpeg';

import cuttingEdgeResearch2 from "../assets/images/2f42e82e-0a59-4023-a28a-994cc835657a.jpg";

// New Real Gallery Images
import facilityLabPc from '../assets/facilities/facility_lab_pc.jpg';

import gdr4 from '../assets/facilities/classroom.jpg'

// Newly added real photos
import printer3dReal from '../assets/facilities/printer3dReal.jpeg';
import conferenceHall1 from '../assets/facilities/conference-hall-1.jpeg';
import conferenceHall2 from '../assets/facilities/conference-hall-2.jpeg';

const facilities = [
    {
        title: "Co-working Space",
        description: "A dedicated space for budding entrepreneurs to brainstorm and develop their ideas.",
        image: startup1,
        images: [startup1, startup2, startupRoomMeeting2]
    },
    {
        title: "Cutting-edge Research Space",
        description: "Equipped with modern tools and technologies for advanced research and development.",
        image: cuttingEdgeResearch2
    },
    { title: "Session Hall", description: "A collaborative space designed for team meetings and brainstorming sessions.", image: gdr4 },
    { title: "Library", description: "A vast collection of books, research papers, and digital resources for academic enrichment.", image: library },
    {
        title: "Conference Hall",
        description: "Spacious hall for seminars, guest lectures, and industry interactions.",
        image: conferenceHall1,
        images: [conferenceHall1, conferenceHall2]
    },
    {
        title: "Computer Lab",
        description: "State-of-the-art systems for programming, simulations, and research.",
        image: computerLab1,
        images: [computerLab1, computerLab2, computerLab3, computerLab4]
    }
];

const workstationSlides = [
    { image: workstation, title: "Modern Workstations", description: "Equipped with high-performance systems for intensive development and design work." },
    { image: facilityLabPc, title: "R&D Computing", description: "Specialized computing resources for simulation, modeling, and deep-tech research." },
    { image: printer3dReal, title: "3D Prototyping Lab", description: "Industrial-grade 3D printing facilities for rapid product development." },
    { image: advancedWorkstations1, title: "Prototyping Lab", description: "A hands-on workspace equipped for hardware development, testing, and project collaboration." },
    { image: advancedWorkstations2, title: "Hardware Workstations", description: "Dedicated workbenches and computing stations support practical engineering and prototyping." },
    // { image: cnc, title: "CNC Prototyping", description: "Precision machining facilities for creating high-quality physical prototypes." }
];

const FacilityCard = ({ facility }) => {
    const [imgIndex, setImgIndex] = useState(0);
    const hasMultipleImages = facility.images && facility.images.length > 1;

    useEffect(() => {
        if (!hasMultipleImages) return;
        facility.images.forEach((imageSrc) => {
            const image = new window.Image();
            image.src = imageSrc;
        });
        const timer = setInterval(() => {
            setImgIndex((prev) => (prev + 1) % facility.images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [hasMultipleImages, facility.images]);

    const displayImage = hasMultipleImages ? facility.images[imgIndex] : facility.image;

    return (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-500/40 transition-all overflow-hidden flex flex-col group h-full">
            {/* Image on Top (No caption on image) */}
            <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-100 shrink-0">
                <AnimatePresence mode="sync">
                    <motion.img
                        key={imgIndex}
                        src={displayImage}
                        alt={facility.title}
                        initial={{ opacity: 0, scale: 1.025 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.985 }}
                        transition={{ duration: 0.7, ease: 'easeInOut' }}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        loading={hasMultipleImages ? 'eager' : 'lazy'}
                        decoding="async"
                    />
                </AnimatePresence>

                {/* Pagination dots for multi-image cards */}
                {hasMultipleImages && (
                    <div className="absolute top-3 right-3 flex space-x-1.5 z-10 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full">
                        {facility.images.map((_, i) => (
                            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === imgIndex ? 'bg-emerald-400 w-3.5' : 'bg-white/50 w-1.5'}`} />
                        ))}
                    </div>
                )}
            </div>

            {/* Caption UNDER the Image (not on the image) */}
            <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                <div>
                    <div className="flex items-center gap-2 mb-2.5">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Core Facility
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                            PSIT SIF
                        </span>
                    </div>

                    <h3 className="text-xl font-bold font-outfit text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {facility.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mt-2.5">
                        {facility.description}
                    </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        Equipped for Incubatees
                    </span>
                    <span className="text-slate-400 text-[10px]">Active Infrastructure</span>
                </div>
            </div>
        </div>
    );
};

const Facilities = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % workstationSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % workstationSlides.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + workstationSlides.length) % workstationSlides.length);

    return (
        <div className="section-container">
            <div className="section-heading-container">
                <h2 className="section-title">Core Facilities</h2>
                <div className="section-title-bar" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                {facilities.map((facility, index) => (
                    <FacilityCard key={index} facility={facility} />
                ))}
            </div>

            {/* Work Station Slider Section */}
            <div className="mt-20">
                <div className="section-heading-container">
                    <h2 className="section-title">Advanced Workstations</h2>
                    <div className="section-title-bar" />
                    <p className="section-subtitle">
                        Our specialized innovation labs provide the tools and environment for entrepreneurs to build, test, and refine their technological solutions.
                    </p>
                </div>

                <div className="relative h-[260px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-2xl shadow-2xl group image-container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            <img
                                src={workstationSlides[currentIndex].image}
                                alt={workstationSlides[currentIndex].title}
                                className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex items-end">
                                <div className="p-5 sm:p-8 md:p-12 text-white max-w-3xl">
                                    <motion.h3
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="event-showcase-title text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4"
                                    >
                                        {workstationSlides[currentIndex].title}
                                    </motion.h3>
                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-sm sm:text-lg text-white font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                                    >
                                        {workstationSlides[currentIndex].description}
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
                        {workstationSlides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`w-3 h-3 rounded-full transition-all ${i === currentIndex ? 'bg-green-500 w-8' : 'bg-white/50'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Facilities;
