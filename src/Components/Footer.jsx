import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter, faInstagram, faFacebookF, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { Phone, Mail, MapPin, ExternalLink, Shield } from "lucide-react";
import psifLogo from "../assets/psif_logo_2.png";

const Footer = () => {
  const quickLinks = [
    { name: "About PSIT SIF", path: "/about" },
    { name: "Incubation Journey", path: "/incubation" },
    { name: "Startup Directory", path: "/startups" },
    { name: "Flagship Programs", path: "/programs" },
    { name: "Events & Workshops", path: "/events" },
    { name: "Ecosystem Partners", path: "/ecosystem" },
    { name: "Leadership & Team", path: "/team" },
    { name: "Contact SIF", path: "/contact" },
  ];

  const focusAreas = [
    { name: "AI & Machine Learning", desc: "Autonomous reasoning and predictive intelligence" },
    { name: "Wearable Devices", desc: "Health diagnostics, biometrics and safety hardware" },
    { name: "Computer Science & Systems", desc: "High-performance software and cloud architecture" },
    { name: "AICTE IDEA Lab", desc: "Hands-on rapid prototyping, 3D printing and CNC" }
  ];

  const socialLinks = [
    { icon: faLinkedinIn, url: "https://www.linkedin.com/company/psit-startup-incubation-foundation", label: "LinkedIn" },
    { icon: faFacebookF, url: "https://www.facebook.com/psitkanpur2004", label: "Facebook" },
    { icon: faInstagram, url: "https://www.instagram.com/psit.sif", label: "Instagram" },
    { icon: faXTwitter, url: "https://x.com/psitsif", label: "X (Twitter)" }
  ];

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 items-start gap-x-8 gap-y-12 py-14 sm:py-16">
          {/* Brand & Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <Link to="/" className="inline-flex bg-white p-4 rounded-2xl shadow-xs border border-slate-200">
              <img src={psifLogo} alt="PSIT SIF Logo" className="h-24 sm:h-28 w-auto object-contain" />
            </Link>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-outfit text-slate-900 tracking-tight leading-tight">
                PSIT STARTUP & INCUBATION FOUNDATION
              </h3>
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mt-2 leading-relaxed">
                DST inclusive-TBI • Center for AI/ML and Wearables
              </p>
            </div>
            <p className="text-slate-600 text-sm leading-7 max-w-md">
              Empowering innovators, transforming student projects into scalable enterprises, and driving India&apos;s technological advancement through state-of-the-art infrastructure, seed funding, and expert mentorship.
            </p>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all flex items-center justify-center text-base shadow-2xs"
                >
                  <FontAwesomeIcon icon={item.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-l-2 border-emerald-600 pl-2">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-slate-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <span className="text-emerald-600">›</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Thrust & Focus Areas (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-l-2 border-emerald-600 pl-2">
              Core Thrust Areas
            </h4>
            <div className="space-y-3">
              {focusAreas.map((area, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-sm font-semibold text-slate-900 leading-snug">{area.name}</div>
                  <div className="text-xs text-slate-500 mt-1 leading-relaxed">{area.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Coordinates (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-l-2 border-emerald-600 pl-2">
              Get in Touch
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-slate-700 leading-relaxed">
                  Pranveer Singh Institute of Technology<br />
                  NH 19, Bhauti, Kanpur - 209305,<br />
                  Uttar Pradesh, India
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <a
                    href="tel:+918960510510"
                    className="text-slate-700 hover:text-emerald-700 transition-colors font-semibold"
                >
                     +91 89605 10510
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                <a
                  href="mailto:anurag.dhawan@psit.ac.in"
                  className="text-slate-700 hover:text-emerald-700 transition-colors font-semibold break-all"
                >
                  anurag.dhawan@psit.ac.in
                </a>
              </div>

              <div className="pt-2">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdC7JnM4DRB5AhCctMmgUiCG73-uiDLR8NxbIky6UUOUCC8mA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all w-full justify-center"
                >
                  Apply for Incubation
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div className="max-w-2xl leading-relaxed">
            © {new Date().getFullYear()} PSIT Startup & Incubation Foundation. All factual institutional rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/contact" className="hover:text-emerald-700 transition-colors font-medium">Contact Support</Link>
            <span>•</span>
            <Link to="/admin" className="hover:text-emerald-700 transition-colors flex items-center gap-1 font-medium">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              Staff CMS Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;