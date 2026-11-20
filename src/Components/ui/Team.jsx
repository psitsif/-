import sandeep from "../../assets/team/sandeep.jpeg";
import anurag from "../../assets/team/anurag.jpeg";
import vijay from "../../assets/team/vijay_scaled.jpg";
import rajat from '../../assets/team/rajat sir.jpg';
import nandkishore from '../../assets/team/nandkishore.jpg';
import deepak from '../../assets/team/deepak.jpeg';
import lavit from '../../assets/team/lavit_scaled.jpg'
import kumar from '../../assets/team/kumar_saurabh.png'

function Team() {
  const teamMembers = [
    { name: "Dr. Nand Kishore Sharma", position: " Associate Professor/Add-HOD - CSE", image: nandkishore },
    { name: "Dr. Rajat Verma", position: "Associate Professor/Add-HOD - CSE", image: rajat },
    { name: "Mr. Deepak Gupta", position: "Assistant Professor/Add HOD - CSE", image: deepak },
    { name: "Mr. Kumar Saurabh", position: "Associate professor", image: kumar },
    { name: "Mr. Anurag Dhawan", position: "CEO - PSIT SIF", image: anurag },
    { name: "Mr. Sandeep Kumar Khare", position: "Technical Incubation Associate", image: sandeep },
    { name: "Mr. Vijay Kumar Yadav", position: "Incubation Associate", image: vijay },
    { name: "Mr. Lavitra Sahu", position: "Incubation Associate", image: lavit },
  ];

  /*  // State to manage the current carousel index
   const [currentIndex, setCurrentIndex] = useState(0);
 
   // Function to go to the next set of 5 members
   const goToNext = () => {
     if (currentIndex + 5 < teamMembers.length) {
       setCurrentIndex(currentIndex + 5);
     }
   };
 
   // Function to go to the previous set of 5 members
   const goToPrev = () => {
     if (currentIndex - 5 >= 0) {
       setCurrentIndex(currentIndex - 5);
     }
   }; */

  return (
    <div className="team py-16 sm:py-20">
      {/* Section Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Our Team
        </h2>
        <div className="flex justify-center">
          <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-600" />
        </div>
        <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-xl mx-auto px-4">
          Meet the brilliant minds driving innovation forward
        </p>
      </div>

      {/* Team Grid */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-10 sm:gap-14">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group flex flex-col items-center"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              {/* Photo with gradient ring */}
              <div
                className="relative p-[3px] rounded-full transition-all duration-500 ease-out"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 40%, #0d9488 70%, #14b8a6 100%)',
                }}
              >
                <div className="rounded-full p-[3px] bg-white">
                  <img
                    className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full object-cover object-top transition-all duration-500 z-50 relative"
                    src={member.image}
                    alt={member.name}
                  />
                </div>
              </div>

              {/* Name */}
              <p className="mt-4 text-slate-800 font-semibold text-lg tracking-tight text-center transition-colors duration-300 ">
                {member.name}
              </p>

              {/* Position — small grey text below the name */}
              <p className="mt-1 text-gray-400 text-xs font-normal tracking-wide text-center">
                {member.position}
              </p>

              {/* Subtle underline accent on hover */}
              <div className="mt-1.5 h-0.5 w-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;