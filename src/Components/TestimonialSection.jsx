import img1 from "../assets/team/dowload_1.jpeg"
import img2 from "../assets/team/download_2.jpeg"
import img3 from "../assets/raghvendra_sir_cropped.jpg"
import img4 from "../assets/raghuraj_singh_suryavanshi.png"
import vishalNagar from "../assets/team/vishal_nagar.png"
const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Shri Pranveer Singh",
      role: "Honorable Chairman PSIT",
      comment: "At PSIT, we are committed to nurturing confident, capable professionals through industry-aligned education, innovation, research, and collaboration. With dedicated faculty, hands-on mentorship, and exposure to emerging technologies, we empower students to pursue meaningful careers, higher studies, and entrepreneurship. Our vision is to transform bright minds into leaders who shape tomorrow.",
      imageSrc: `${img1}`
    },
    {
      name: "Prof.(Dr.) Man Mohan Shukla",
      role: "Vice President PSIT",
      comment: "At PSIT, we embrace technological advancement and innovative learning to prepare students for a rapidly evolving world. Through expert faculty, industry-oriented education, practical exposure, and holistic development, we nurture skilled professionals and future leaders. Our commitment to academic excellence, teamwork, and strong industry partnerships empowers students to achieve success.",
      imageSrc: `${img2}`
    },
    {
      name: "Prof.(Dr.) Raghvendra Singh",
      role: "Director PSIT",
      comment: "At PSIT, we strive to create an environment where academic excellence, innovation, and holistic development go hand in hand. Through dedicated faculty, industry collaboration, research opportunities, and value-based education, we empower students to become responsible professionals, creative thinkers, and future leaders equipped to make meaningful contributions to society.",
      imageSrc: `${img3}`
    },
    {
      name: "Prof.(Dr.) Raghuraj Singh Suryavanshi",
      role: "Director Startup & Incubation PSIT",
      comment: "At PSIT, we believe in turning knowledge into innovation. Through DST-iTBI, we encourage students to explore ideas, develop startups, and create real-world solutions. Our aim is to build future leaders, entrepreneurs, and innovators who use technology and research to make a positive impact on society.",
      imageSrc: `${img4}`
    },
    {
      name: "Dr. Vishal Nagar",
      role: "Director Academics PSIT",
      comment: "At PSIT, we believe education is not only about knowledge; it is about creating a future where innovation, intellect and impact converge. As Director Academics, I envision our Institute as a dynamic hub where technology and human potential blend seamlessly to shape leaders of tomorrow.",
      imageSrc: vishalNagar
    }
  ];

  return (
    <div className="section-container">
      <div className="section-heading-container">
        <h1 className="section-title">Our <span className="text-green-600">Dignitaries</span></h1>
        <div className="section-title-bar" />
        <p className="section-subtitle">
          Guided by the vision and leadership of our esteemed mentors, who pave the way for academic and entrepreneurial excellence.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="standard-card flex flex-col md:flex-row items-center md:items-stretch p-5 sm:p-8 gap-6 sm:gap-8 group"
          >
            <div className="w-40 h-48 sm:w-48 sm:h-56 flex-shrink-0 overflow-hidden rounded-2xl shadow-lg border-2 border-green-100 group-hover:border-green-500 transition-colors duration-500 md:self-center">
              <img
                src={testimonial.imageSrc}
                alt={testimonial.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between text-center md:text-left">
              <div className="mb-6">
                <div className="relative pl-6 text-left">
                  <span className="text-3xl text-green-300 font-serif absolute left-0 top-0 select-none leading-none">“</span>
                  <p className="text-gray-600 italic text-lg leading-relaxed">
                    {testimonial.comment}
                    <span className="text-3xl text-green-300 font-serif ml-1 select-none leading-none">”</span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-2xl text-gray-900 mb-1 font-outfit">{testimonial.name}</h3>
                <p className="text-green-600 font-bold uppercase tracking-widest text-xs font-inter">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;