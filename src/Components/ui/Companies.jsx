import { Link } from 'react-router-dom';
import logo1 from '../../assets/logos/bay.png';
import logo2 from '../../assets/logos/eyw.png';
import logo3 from '../../assets/logos/KCKM.png';
import logo4 from '../../assets/logos/logo.png';
import logo5 from '../../assets/logos/ochaat.png';
import logo6 from '../../assets/logos/senseoriginal.png';
import logo7 from '../../assets/logos/shakti.png';
import logo8 from '../../assets/logos/smoocha.png';
import logo9 from '../../assets/logos/strinity.png';
import logo10 from '../../assets/logos/logo2.png';
import logo11 from '../../assets/logos/dualite.png';
import logo12 from '../../assets/logos/kojo.png';
import logo13 from '../../assets/logos/wyvate.png';
import logo14 from '../../assets/logos/bharatonecare.png';
import logo15 from '../../assets/logos/tepiai.jpg';

const Companies = () => {
  const companies = [
    { name: "Good Ferment Beverages (Bay Kombucha)", logo: logo1, url: "https://baykombucha.com" },
    { name: "EPR Recyclers", logo: logo2, url: "https://eprrecycler.com" },
    { name: "KCKM Healthcare Electronics", logo: logo3, url: "/startups" },
    { name: "Soulo Hair Care", logo: logo4, url: "https://soulo.co.in" },
    { name: "Ochaat Technical Analytics", logo: logo5, url: "https://ochaat.in" },
    { name: "Senseoriginal Technologies", logo: logo6, url: "https://senseoriginal.com" },
    { name: "Shakti Wearables", logo: logo7, url: "https://shaktiwearables.com" },
    { name: "Samocha Stories Around Chai", logo: logo8, url: "https://samocha.co" },
    { name: "Strinity Automation", logo: logo9, url: "https://strinityautomation.in" },
    { name: "Srishti Sharma Wearables", logo: logo10, url: "https://shaktiwearables.com" },
    { name: "Dualite Technology", logo: logo11, url: "https://dualite.dev" },
    { name: "Greenhale Wellness (Kojo Life)", logo: logo12, url: "https://kojolife.com" },
    { name: "Wyvate Tech", logo: logo13, url: "https://wyvate.com" },
    { name: "BharatOne Care", logo: logo14, url: "https://bharatonecare.com" },
    { name: "Tepi AI", logo: logo15, url: "https://tepiai.com" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mx-3 sm:mx-8 lg:mx-24">
      {companies.map((company, index) => {
        const isExternal = company.url.startsWith('http');
        const cardContent = (
          <div className="relative w-full h-[120px] sm:h-[150px] flex items-center justify-center p-3 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-emerald-500/50 hover:scale-105 transition-all duration-300 group cursor-pointer">
            <img
              src={company.logo}
              alt={company.name}
              className="max-h-20 sm:max-h-24 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <span className="sr-only">{company.name}</span>
          </div>
        );

        if (isExternal) {
          return (
            <a
              key={index}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visit ${company.name} official website`}
              className="block"
            >
              {cardContent}
            </a>
          );
        }

        return (
          <Link
            key={index}
            to={company.url}
            title={`View ${company.name} in Startup Directory`}
            className="block"
          >
            {cardContent}
          </Link>
        );
      })}
    </div>
  );
};

export default Companies;