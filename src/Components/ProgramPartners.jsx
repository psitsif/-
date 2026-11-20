import img1 from "../assets/th.png";
import img2 from "../assets/msme.png";
import img3 from "../assets/img3.jpg";
import img5 from "../assets/innohub.png";
import { FocusCards } from './ui/focus-cards';
import Companies from './ui/Companies';
import { Link } from 'react-router-dom';

const ProgramPartners = () => {
  const strategicPartners = [
    {
      image: img1,
      title: "NIDHI-DST ITBI",
      url: "https://dst.gov.in/",
      description: "Driving technological entrepreneurship nationwide",
      benefits: [
        "Innovative startup ecosystem",
        "Technology funding",
        "Entrepreneurial development"
      ]
    },
    {
      image: img2,
      title: "MSME",
      url: "https://msme.gov.in/",
      description: "Empowering small business growth",
      benefits: [
        "Economic acceleration",
        "Enterprise support",
        "National development"
      ]
    },
    {
      image: img3,
      title: "Start in UP",
      url: "https://startinup.up.gov.in/",
      description: "UP Government's startup initiative",
      benefits: [
        "State-level startup support",
        "Policy-driven innovation",
        "Entrepreneurial growth"
      ]
    }
  ];

  const ecosystemCards = [
    {
      src: img1,
      title: "NIDHI-DST iTBI",
      url: "https://dst.gov.in/",
      description: "The National Initiative for Developing and Harnessing Innovations (NIDHI) is a flagship program under the Department of Science and Technology (DST), Government of India. It supports innovations addressing societal challenges and fostering entrepreneurship.",
      number: "01"
    },
    {
      src: img2,
      title: "MSME",
      url: "https://msme.gov.in/",
      description: "The Ministry of Micro, Small, and Medium Enterprises (MSME) is a key government body in India responsible for the development and promotion of the Micro, Small, and Medium Enterprises (MSME) sector.",
      number: "02"
    },
    {
      src: img5,
      title: "AICTE IDEA Lab",
      url: "https://idealab.aicte-india.org/",
      description: "Fostering partnerships between academia and industry to drive innovation. Creating opportunities for collaborative research and development in priority sectors.",
      number: "04"
    }
  ];

  return (
    <div>
      {/* Strategic Partners Section */}
      <div id="strategic-partners" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="heading mb-10">
            <h2 className="flex justify-center font-semibold text-3xl sm:text-5xl text-black pb-5 text-center px-2">
              Programs 
            </h2>
            <div className="flex justify-center">
              <div className="bg-green-500 h-[5px] w-[200px]" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {strategicPartners.map((program, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-200/60 min-w-0"
              >
                <a
                  href={program.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Visit ${program.title} Official Portal`}
                  className="w-full max-w-[13rem] h-36 relative mb-6 flex items-center justify-center p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:scale-105 transition-all group/logo cursor-pointer shadow-sm"
                >
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover/logo:scale-105"
                  />
                </a>
                <div className="space-y-4">
                  <a
                    href={program.url}
                    target="_blank"
                
rel="noopener noreferrer"
title={`Visit ${program.title} Official Portal`}
className="text-2xl sm:text-3xl font-bold text-gray-900 hover:text-emerald-700 transition-colors inline-block"
>
  {program.title}
</a>

<p className="text-gray-600 text-base leading-relaxed text-left">
  {program.description}
</p>

<div className="flex justify-center pt-4">
  <ul className="flex flex-col items-start space-y-2 text-left">
    {program.benefits.map((benefit, benefitIndex) => (
      <li
        key={benefitIndex}
        className="flex items-start text-left text-gray-700 font-medium"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-3 mt-2 shrink-0" />
        {benefit}
      </li>
    ))}
  </ul>
</div>
</div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ecosystem Section */}
      <div >
        <div className="heading mb-10 mt-10">
          <h2 className="flex justify-center font-semibold text-3xl sm:text-5xl text-black pb-5 text-center px-2">
            Our Ecosystem
          </h2>
          <div className="flex justify-center">
            <div className="bg-green-500 h-[5px] w-[200px]" />
          </div>
        </div>

        {/* <div className="text-center space-y-5 pt-[70px] pb-[100px]">
          <p className="font-extralight tracking-wider text-3xl text-black">
           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis architecto eum quisquam delectus vel, nihil ipsam ut! Illum neque asperiores et minima, veniam pariatur fugiat alias, amet, provident cupiditate nesciunt!
          </p>
          <p className="font-extralight tracking-wider text-5xl text-black">
            entrepreneurial journeys
          </p>
        </div> */}

        <div className="pb-16 sm:pb-[100px] pt-5 px-4 sm:px-12 lg:px-20">
          <FocusCards cards={ecosystemCards} />
        </div>

        {/* Startups Section */}
        <div>
          <div className="heading ">
            <h2 className="flex justify-center font-semibold text-3xl sm:text-5xl text-black pb-5 text-center px-2">
              Our Startups
            </h2>
            <div className="flex justify-center">
              <div className="bg-green-500 h-[5px] w-[200px]" />
            </div>
          </div>

          <p className="flex justify-center font-extralight tracking-wider text-3xl sm:text-5xl text-black pt-[20px] pb-6 sm:pb-[50px]">
            {/* The Phenomenal Disruptors */}
          </p>

          <Companies />

          <div className="flex justify-center mt-10 pb-[50px]">
            <Link to="/startups">
              <button
                type="button"
                className="py-5 px-10 text-sm bg-green-600 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700"
              >
                View All
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramPartners;
