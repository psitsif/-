import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Award, BadgeCheck, CalendarDays, Star, Users, X } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import raghurajSingh from '../assets/raghuraj_singh_suryavanshi.png';
import vishalNagar from '../assets/team/vishal_nagar.png';
import rajatVerma from '../assets/team/rajat sir.jpg';
import nandKishoreSharma from '../assets/team/nandkishore.jpg';
import anuragDhawan from '../assets/team/anurag.jpeg';
import vijayYadav from '../assets/team/vijay_scaled.jpg';
import prashantKumarMishra from '../assets/team/prashant_kumar_mishra.png';
import manishKumar from '../assets/team/manish_kumar.png';
import ankushVerma from '../assets/team/ankush_verma.png';
import ashutoshPandey from '../assets/team/ashutosh_pandey.png';
import subhashSinghParihar from '../assets/team/subhash_singh_parihar.png';

const coreTeamMembers = [
  { name: 'Prof. (Dr.) Raghuraj Singh Suryavanshi', role: 'President', image: raghurajSingh },
  { name: 'Prof. Prashant Kumar Mishra', role: 'Vice President', image: prashantKumarMishra },
  { name: 'Dr. Vishal Nagar', role: 'NIRF Coordinator', image: vishalNagar },
  { name: 'Dr. Rajat Verma', role: 'Convener', image: rajatVerma },
  { name: 'Dr. Satyasundara Mahapatra', role: 'IPR Activity Coordinator' },
  { name: 'Prof. Manish Kumar', role: 'Innovation Activity', image: manishKumar },
  { name: 'Ankush Verma', role: 'Social Media Coordinator', image: ankushVerma },
  { name: 'Mr. Deepak Verma', role: 'Internship Activity Coordinator' },
];

const teachingMembers = [
  { name: 'Dr. Nand Kishore Sharma', image: nandKishoreSharma },
  { name: 'Dr. Ashutosh Pandey', image: ashutoshPandey },
  { name: 'Dr. Subhash Singh Parihar', image: subhashSinghParihar },
  { name: 'Ankit Jain' },
];

const nonTeachingMembers = [
  { name: 'Mr. Anurag Dhawan', image: anuragDhawan },
  { name: 'Mr. Vijay Yadav', image: vijayYadav },
  { name: 'Mr. Harpreet Singh Chawla' },
  { name: 'Mr. Aditya Dwivedi' },
  { name: 'Mr. Anirudh Shukla' },
];

const annualCertifications = [
  {
    id: 'rating-2022-23',
    label: 'Annual IIC rating',
    title: 'IIC Star Rating Certificate 2022–23',
    period: 'Calendar year 2022–23',
    rating: '3-star rating',
    image: '/iic/certificates/rating-2022-23.png',
    issuedOn: '16 November 2023',
    certificateNumber: '3862',
    description: 'Recognizes that the Institution’s Innovation Council established at Pranveer Singh Institute of Technology, Kanpur Nagar, undertook Innovation Cell, Ministry of Education, Government of India prescribed activities to promote innovation and start-ups on campus during the IIC calendar year 2022–23.',
    signatories: 'Prof. T. G. Sitharam, Dr. Abhay Jere, and Mr. Dipan Sahu',
  },
  {
    id: 'rating-2023-24',
    label: 'Annual IIC rating',
    title: 'IIC Star Rating Certificate 2023–24',
    period: 'Calendar year 2023–24',
    rating: '3-star rating',
    image: '/iic/certificates/rating-2023-24.png',
    issuedOn: '16 January 2025',
    certificateNumber: '3862',
    description: 'Recognizes that the Institution’s Innovation Council established at Pranveer Singh Institute of Technology, Kanpur Nagar, undertook Innovation Cell, Ministry of Education, Government of India prescribed activities to promote innovation and start-ups on campus during the IIC calendar year 2023–24.',
    signatories: 'Prof. T. G. Sitharam, Dr. Abhay Jere, and Mr. Dipan Sahu',
  },
  {
    id: 'rating-2024-25',
    label: 'Annual IIC rating',
    title: 'IIC Star Rating Certificate 2024–25',
    period: 'Calendar year 2024–25',
    rating: '4-star rating',
    image: '/iic/certificates/rating-2024-25.png',
    issuedOn: '5 October 2026',
    certificateNumber: '3862',
    description: 'Recognizes that the Institution’s Innovation Council established at Pranveer Singh Institute of Technology, Kanpur Nagar, undertook Innovation Cell, Ministry of Education, Government of India prescribed activities to promote innovation and start-ups on campus during the IIC calendar year 2024–25.',
    signatories: 'Prof. Yogesh Singh, Chairman, AICTE, and Prof. Shyama Rath, Member Secretary, AICTE',
  },
];

const regionalMeetCertifications = [
  {
    id: 'regional-meet-participation-2025',
    label: 'Regional Meet 2025',
    title: 'Certificate of Participation',
    period: '2 December 2025 · Varanasi',
    image: '/iic/certificates/regional-meet-participation-2025.png',
    recipient: 'Dr. Rajat Verma · PSIT Kanpur',
    description: 'Recognizes Dr. Rajat Verma’s participation in the One Day Regional Meet hosted by Sunbeam Women’s College, Varuna, Varanasi.',
    signatories: 'Prof. T. G. Sitharam, Chairman, AICTE, and Dr. Dipan Sahu, Assistant Innovation Director, MoE’s Innovation Cell',
  },
  {
    id: 'regional-meet-best-innovator-stall-2025',
    label: 'Regional Meet 2025',
    title: 'Best Innovator Stall',
    period: '2 December 2025 · Varanasi',
    image: '/iic/certificates/regional-meet-best-innovator-stall-2025.png',
    recipient: 'Dr. Rajat Verma · PSIT Kanpur',
    description: 'Certificate of Appreciation for outstanding achievement as “Best Innovator Stall” at the IIC Regional Meet 2025, organized by the Ministry of Education’s Innovation Cell and AICTE.',
    signatories: 'Sh. Som Jalkumar, AICTE Innovation Centre; Aman Srivastava, MoE’s Innovation Cell; and Dr. Rajeev Singh, Sunbeam Women’s College, Varuna',
  },
  {
    id: 'regional-meet-best-iic-poster-2025',
    label: 'Regional Meet 2025',
    title: 'Best IIC Poster (Regional)',
    period: '2 December 2025 · Varanasi',
    image: '/iic/certificates/regional-meet-best-iic-poster-2025.png',
    recipient: 'Dr. Rajat Verma · PSIT Kanpur',
    description: 'Certificate of Appreciation for outstanding achievement as “Best IIC Poster (Regional)” during the IIC Regional Meet 2025, hosted by Sunbeam Women’s College, Varuna, Varanasi.',
    signatories: 'Sh. Som Jalkumar, AICTE Innovation Centre; Aman Srivastava, MoE’s Innovation Cell; and Dr. Rajeev Singh, Sunbeam Women’s College, Varuna',
  },
];

const appreciationLetters = [
  {
    id: 'appreciation-letter-2021-22',
    title: 'Letter of Appreciation — AY 2021–22',
    period: 'Academic year 2021–22',
    image: '/iic/appreciation/letter-2021-22-preview.png',
    pdf: '/iic/appreciation/letter-2021-22.pdf',
    description: 'The Ministry of Education’s Innovation Cell thanks PSIT’s IIC functionaries for their continued support in building an innovation and entrepreneurship culture on campus and contributing to the wider IIC network.',
    signatories: 'Dipan Kumar Sahu, Assistant Innovation Director, MoE’s Innovation Cell, Government of India',
  },
  {
    id: 'appreciation-letter-2024-25',
    title: 'Letter of Appreciation — AY 2024–25',
    period: 'Academic year 2024–25',
    image: '/iic/appreciation/letter-2024-25-preview.png',
    pdf: '/iic/appreciation/letter-2024-25.pdf',
    description: 'The Ministry of Education’s Innovation Cell recognizes PSIT’s IIC functionaries for supporting innovation and entrepreneurship on campus and helping other IIC institutions strengthen the IIC network.',
    signatories: 'Dipan Kumar Sahu, Assistant Innovation Director, MoE’s Innovation Cell, Government of India',
  },
];

const CertificationCard = ({ certificate, onOpen, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: 'easeOut' }}
    whileHover={{ y: -5 }}
    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:border-emerald-300 hover:shadow-xl"
  >
    <button
      type="button"
      onClick={() => onOpen(certificate)}
      className="relative flex aspect-[1.55] w-full items-center justify-center overflow-hidden bg-slate-50 p-3 sm:p-4"
      aria-label={`Open ${certificate.title}`}
    >
      <img
        src={certificate.image}
        alt={certificate.title}
        className="h-full w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-sm backdrop-blur">
        {certificate.rating ? <Star className="h-3.5 w-3.5" /> : <Award className="h-3.5 w-3.5" />}
        {certificate.label}
      </span>
    </button>

    <div className="flex flex-col p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold font-outfit leading-tight">
          {certificate.title}
        </h3>
        {certificate.rating && (
          <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
            {certificate.rating}
          </span>
        )}
      </div>
      {certificate.recipient && (
        <p className="mt-2 text-sm font-semibold text-emerald-800">
          {certificate.recipient}
        </p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {certificate.description}
      </p>
      <details className="mt-4 rounded-xl bg-slate-50 px-3.5 py-3 text-sm">
        <summary className="cursor-pointer font-semibold text-slate-700 marker:text-emerald-600">
          Certificate details
        </summary>
        <dl className="mt-3 space-y-2 border-t border-slate-200 pt-3">
          {certificate.certificateNumber && (
            <div className="flex items-start justify-between gap-3">
              <dt className="shrink-0 text-slate-500">Certificate No.</dt>
              <dd className="text-right font-semibold text-slate-800">{certificate.certificateNumber}</dd>
            </div>
          )}
          {certificate.issuedOn && (
            <div className="flex items-start justify-between gap-3">
              <dt className="shrink-0 text-slate-500">Issued on</dt>
              <dd className="text-right font-semibold text-slate-800">{certificate.issuedOn}</dd>
            </div>
          )}
          <div>
            <dt className="text-slate-500">Signatories</dt>
            <dd className="mt-1 leading-relaxed text-slate-700">{certificate.signatories}</dd>
          </div>
        </dl>
      </details>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <CalendarDays className="h-3.5 w-3.5 text-emerald-600" />
          {certificate.period}
        </span>
        <button
          type="button"
          onClick={() => onOpen(certificate)}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-900"
        >
          View certificate
          <BadgeCheck className="h-4 w-4" />
        </button>
      </div>
    </div>
  </motion.article>
);

const AppreciationLetterCard = ({ letter, onOpen, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
    whileHover={{ y: -5 }}
    className="group grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:border-emerald-300 hover:shadow-xl sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
  >
    <button
      type="button"
      onClick={() => onOpen(letter)}
      aria-label={`Open ${letter.title}`}
      className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-50 p-4 sm:h-full sm:min-h-[330px]"
    >
      <img
        src={letter.image}
        alt={`First page preview of ${letter.title}`}
        className="h-full w-full rounded-lg object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
      <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-emerald-800 shadow-sm backdrop-blur">
        {letter.period}
      </span>
    </button>
    <div className="flex flex-col p-5 sm:p-6">
      <h3 className="text-xl font-bold font-outfit leading-tight sm:text-2xl">
        {letter.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {letter.description}
      </p>
      <div className="mt-4 rounded-xl bg-slate-50 px-3.5 py-3 text-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          From
        </p>
        <p className="mt-1 leading-relaxed text-slate-700">{letter.signatories}</p>
      </div>
      <button
        type="button"
        onClick={() => onOpen(letter)}
        className="mt-auto inline-flex items-center gap-1.5 pt-5 text-left text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-900"
      >
        View full letter
        <BadgeCheck className="h-4 w-4" />
      </button>
    </div>
  </motion.article>
);

const IICPage = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [eventCount, setEventCount] = useState(0);
  const [shouldCountEvents, setShouldCountEvents] = useState(false);

  useEffect(() => {
    if (!selectedDocument) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedDocument(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDocument]);

  useEffect(() => {
    if (!shouldCountEvents) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEventCount(300);
      return undefined;
    }

    const duration = 1600;
    let frameId;
    let startTime;
    const animateCount = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - ((1 - progress) ** 3);
      setEventCount(Math.round(easedProgress * 300));
      if (progress < 1) frameId = window.requestAnimationFrame(animateCount);
    };

    frameId = window.requestAnimationFrame(animateCount);
    return () => window.cancelAnimationFrame(frameId);
  }, [shouldCountEvents]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow px-4 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
        <div className="section-heading-container">
          <h1 className="section-title">Institution&apos;s Innovation Council</h1>
          <div className="section-title-bar" />
        </div>

        <section className="mb-12 sm:mb-16 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-slate-50 px-6 py-10 sm:px-12 sm:py-14 text-center shadow-sm">
          <h2 className="text-4xl sm:text-5xl font-extrabold font-outfit tracking-tight">
            About IIC
          </h2>
          <div className="section-title-bar mt-4" />
          <div className="mx-auto mt-7 max-w-4xl space-y-5 text-lg sm:text-xl leading-relaxed text-slate-700">
            <p>
              The Institution&apos;s Innovation Council (IIC) is part of a nationwide initiative of the Ministry of Education&apos;s Innovation Cell (MIC), created to strengthen a culture of innovation and entrepreneurship in higher education. It is a broader initiative not a department or program owned by PSIT.
            </p>
            <p>
              At Pranveer Singh Institute of Technology (PSIT), the IIC provides a platform for students and faculty to explore ideas, identify real-world challenges, and develop creative, solution-oriented thinking. Its activities can include awareness sessions, workshops, mentoring, idea development, and opportunities to connect innovation with entrepreneurship.
            </p>
            <p>
              By encouraging experimentation, collaboration, and learning beyond the classroom, IIC helps participants build confidence to take an idea forward from its early exploration toward a practical solution with the potential to make an impact.
            </p>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setShouldCountEvents(true)}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12 sm:mb-16 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="grid items-center sm:grid-cols-[minmax(190px,0.7fr)_minmax(0,2fr)]">
            <div className="flex items-center justify-center gap-4 bg-emerald-50 px-6 py-7 sm:h-full sm:flex-col sm:gap-0 sm:py-8">
              <motion.p
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1, type: 'spring', stiffness: 140 }}
                className="text-5xl font-extrabold font-outfit tracking-tight text-emerald-800 sm:text-6xl"
              >
                {eventCount.toLocaleString()}+
              </motion.p>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700 sm:mt-1">
                IIC events
              </p>
            </div>
            <div className="px-6 py-6 sm:px-9 sm:py-8">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                Ideas in action
              </span>
              <h2 className="mt-2 text-2xl font-bold font-outfit leading-tight text-slate-900 sm:text-3xl">
                A growing culture of innovation
              </h2>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
                The IIC has hosted more than 300 events, giving students and faculty opportunities to explore ideas, build skills, and connect innovation with entrepreneurship.
              </p>
            </div>
          </div>
        </motion.section>

        <section className="mb-12 sm:mb-16 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-slate-50 px-5 py-8 shadow-sm sm:px-8 sm:py-10">
          <div className="section-heading-container !mb-8 sm:!mb-10">
            <h2 className="section-title">Certifications Achieved</h2>
            <div className="section-title-bar" />
          </div>

          <div className="space-y-12 sm:space-y-16">
            <div>
              <div className="mb-6 sm:mb-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-outfit">Annual IIC Star Ratings</h3>
                  <p className="mt-1 text-sm sm:text-base text-slate-600">Institutional recognition across successive IIC calendar years.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {annualCertifications.map((certificate, index) => (
                  <CertificationCard
                    key={certificate.id}
                    certificate={certificate}
                    onOpen={setSelectedDocument}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
                <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                      <Award className="h-4 w-4" />
                      Regional achievements
                    </span>
                    <h3 className="mt-2 text-3xl sm:text-4xl font-extrabold font-outfit">
                      IIC Regional Meet 2025
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">
                      Participation and award-winning work by PSIT at the regional gathering in Varanasi.
                    </p>
                  </div>
                  <span className="w-fit rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800">
                    2 December 2025 · Varanasi
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {regionalMeetCertifications.map((certificate, index) => (
                    <CertificationCard
                      key={certificate.id}
                      certificate={certificate}
                      onOpen={setSelectedDocument}
                      index={index}
                    />
                  ))}
                </div>
            </div>
          </div>
        </section>

        <section className="mb-12 sm:mb-16 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-slate-50 px-5 py-8 shadow-sm sm:px-8 sm:py-10">
          <div className="section-heading-container !mb-8 sm:!mb-10">
            <h2 className="section-title">Appreciation Letters</h2>
            <div className="section-title-bar" />
            <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-slate-600 sm:text-base">
              Letters from the Ministry of Education’s Innovation Cell recognizing PSIT’s IIC contributions to innovation and entrepreneurship.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {appreciationLetters.map((letter, index) => (
              <AppreciationLetterCard
                key={letter.id}
                letter={letter}
                onOpen={setSelectedDocument}
                index={index}
              />
            ))}
          </div>
        </section>

        <section className="mb-12 sm:mb-16 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-slate-50 px-5 py-8 shadow-sm sm:px-8 sm:py-10">
          <div className="section-heading-container !mb-8 sm:!mb-10">
            <h2 className="section-title">IIC Team</h2>
            <div className="section-title-bar" />
          </div>

          <div className="space-y-10">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Users className="h-5 w-5" />
                </span>
                <h3 className="text-2xl font-bold font-outfit">Core Team</h3>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {coreTeamMembers.map((member, index) => (
                  <motion.article
                    key={member.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.35, delay: (index % 4) * 0.06 }}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    {member.image && (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-14 w-14 rounded-full border-2 border-emerald-100 object-cover object-top"
                        loading="lazy"
                      />
                    )}
                    <h4 className="mt-4 font-bold leading-snug text-slate-900">{member.name}</h4>
                    <p className="mt-1 text-sm font-medium text-emerald-700">{member.role}</p>
                  </motion.article>
                ))}
              </div>
            </div>

            <div className="border-t border-emerald-100 pt-7">
              <h3 className="mb-5 text-xl font-bold font-outfit">Teaching Members</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {teachingMembers.map((member, index) => (
                  <motion.article
                    key={member.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.35, delay: (index % 4) * 0.06 }}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    {member.image && (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-14 w-14 rounded-full border-2 border-emerald-100 object-cover object-top"
                        loading="lazy"
                      />
                    )}
                    <h4 className="mt-4 font-bold leading-snug text-slate-900">{member.name}</h4>
                  </motion.article>
                ))}
              </div>
            </div>

            <div className="border-t border-emerald-100 pt-7">
              <h3 className="mb-5 text-xl font-bold font-outfit">Non Teaching Members</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {nonTeachingMembers.map((member, index) => (
                  <motion.article
                    key={member.name}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.35, delay: (index % 4) * 0.06 }}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    {member.image && (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-14 w-14 rounded-full border-2 border-emerald-100 object-cover object-top"
                        loading="lazy"
                      />
                    )}
                    <h4 className="mt-4 font-bold leading-snug text-slate-900">{member.name}</h4>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        </div>
      </main>
      <Footer />

      <AnimatePresence>
        {selectedDocument && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={selectedDocument.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedDocument(null);
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm sm:p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative flex max-h-full max-w-7xl flex-col items-center"
            >
              <button
                type="button"
                onClick={() => setSelectedDocument(null)}
                aria-label="Close document and return to IIC page"
                className="absolute -right-2 -top-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-colors hover:bg-emerald-50 sm:-right-4 sm:-top-4"
              >
                <X className="h-6 w-6" />
              </button>
              {selectedDocument.pdf ? (
                <iframe
                  src={selectedDocument.pdf}
                  title={selectedDocument.title}
                  className="h-[calc(100vh-7rem)] w-[min(90vw,1100px)] rounded-xl bg-white shadow-2xl"
                />
              ) : (
                <img
                  src={selectedDocument.image}
                  alt={`Full certificate: ${selectedDocument.title}`}
                  className="max-h-[calc(100vh-7rem)] max-w-full rounded-xl object-contain shadow-2xl"
                />
              )}
              <p className="mt-3 text-center text-sm font-semibold text-white">
                {selectedDocument.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IICPage;
