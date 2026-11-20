import img from "../assets/raghuraj_singh_suryavanshi.png";

const Dean = () => {
  return (
    <div className="section-container">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="lg:w-1/3 flex flex-col items-center">
          <div className="standard-card p-4 group">
            <img 
              className="transition-transform duration-500 group-hover:scale-105 rounded-xl"
              src={img}
              alt="Director's portrait"
            />
          </div>
          <div className="mt-6 text-center">
            <h4 className="text-xl font-bold font-outfit text-gray-900">Prof.(Dr.) Raghuraj Singh Suryavanshi</h4>
            <p className="text-emerald-700 font-semibold uppercase tracking-wider text-sm mt-1">Director, Startup Incubation, PSIT</p>
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="section-heading-container text-left items-start mb-8">
            <h2 className="section-title !text-left">Meet our Director</h2>
            <div className="section-title-bar !mx-0" />
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-lg text-gray-600 leading-relaxed font-medium italic">
              &ldquo;Dr. Raghuraj Singh Suryavanshi, Director of Startup Incubation at PSIT, is a visionary leader with a deep commitment to fostering innovation, entrepreneurship, and the spirit of problem-solving among students. With a rich background in mentoring startups, Dr. Suryavanshi brings invaluable expertise in business development, venture creation, and strategic growth.
              <br /><br />
              Under Dr. Suryavanshi&apos;s leadership, the Startup Cell has evolved into a dynamic and thriving ecosystem that supports students at every stage of their entrepreneurial journey. From ideation and prototyping to funding and market entry, the Startup Cell provides the necessary resources and mentorship to turn innovative ideas into successful business ventures.&rdquo;
            </p>
          </div>

          <div className="mt-12 flex justify-start">
            <div className="bg-green-50 px-8 py-6 rounded-2xl border border-green-100 max-w-xl relative">
              <span className="absolute -top-4 -left-2 text-6xl text-green-200 font-serif opacity-50">&ldquo;</span>
              <p className="text-xl font-bold text-green-800 font-outfit text-center italic px-4">
                &ldquo;Our mission is to bake innovation into the DNA of every student, turning potential into world-changing startups.&rdquo;
              </p>
              <span className="absolute -bottom-10 -right-2 text-6xl text-green-200 font-serif opacity-50">&rdquo;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dean;