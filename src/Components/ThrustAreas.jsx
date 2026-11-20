import { Satellite } from 'lucide-react';
import cse from '../assets/cse.jpg';
import aiml from '../assets/aiml.jpg';
import wear from '../assets/wear.jpg';

const ThrustAreas = () => {
    const thrustAreas = [
        { title: "CS & Software Engineering", description: "Exploring modern software development, system architecture, and best practices.", image: cse },
        { title: "Artificial Intelligence and Machine Learning", description: "Advancing artificial intelligence and machine learning research.", image: aiml },
        { title: "Wearable & IoT Devices", description: "Innovating in the field of smart wearables and health monitoring technologies.", image: wear },
        { title: "Space and Defence", description: "Exploring innovation in aerospace, satellite systems, and advanced defence technologies." }
    ];

    return (
        <div className="py-8 sm:py-12 lg:py-16 px-4">
            <div className="max-w-7xl mx-auto">
            <div className="heading mb-10">
                <h2 className="flex justify-center font-semibold text-3xl sm:text-5xl text-black pb-5 text-center px-2">
                Thrust Areas
                </h2>
                <div className="flex justify-center">
                <div className="bg-green-500 h-[5px] w-[140px]" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-6 py-4 px-2 min-w-0">
            {thrustAreas.map((area, index) => (
                <div key={index} className="w-full min-w-0 bg-white rounded-lg shadow-md overflow-hidden">
                {area.image ? (
                    <img src={area.image} alt={area.title} className="w-full h-48 object-cover" />
                ) : (
                    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900">
                        <div className="absolute h-36 w-36 rounded-full border border-sky-300/20" />
                        <div className="absolute h-28 w-28 rounded-full border border-sky-300/20" />
                        <Satellite className="relative h-16 w-16 text-sky-200" strokeWidth={1.3} aria-hidden="true" />
                    </div>
                )}
                <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">{area.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{area.description}</p>
                </div>
                </div>
            ))}
            </div>
            </div>
        </div>
    );
}

export default ThrustAreas;
