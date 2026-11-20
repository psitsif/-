import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const pages = {
  "/": {
    title: "PSIT Startup & Incubation Foundation | PSIT-SIF Kanpur",
    description:
      "PSIT Startup and Incubation Foundation (PSIT-SIF) in Kanpur supports entrepreneurs with startup incubation, mentorship, prototyping facilities, and innovation programs.",
  },
  "/home": {
    title: "PSIT Startup & Incubation Foundation | PSIT-SIF Kanpur",
    description:
      "PSIT Startup and Incubation Foundation (PSIT-SIF) in Kanpur supports entrepreneurs with startup incubation, mentorship, prototyping facilities, and innovation programs.",
    canonicalPath: "/",
  },
  "/about": {
    title: "About Us | PSIT Startup & Incubation Foundation",
    description:
      "Learn about PSIT-SIF in Kanpur, its mission, incubation ecosystem, and commitment to innovation and entrepreneurship.",
  },
  "/incubation": {
    title: "Startup Incubation | PSIT-SIF Kanpur",
    description:
      "Explore startup incubation at PSIT-SIF in Kanpur, including founder mentorship, prototyping resources, and support for early-stage ventures.",
  },
  "/startups": {
    title: "Startup Directory | PSIT-SIF Kanpur",
    description:
      "Explore the PSIT-SIF startup directory featuring ventures supported by the PSIT Startup and Incubation Foundation in Kanpur.",
  },
  "/programs": {
    title: "Programs | PSIT Startup & Incubation Foundation",
    description:
      "Explore startup incubation, entrepreneurship, and innovation programs offered through PSIT-SIF in Kanpur.",
  },
  "/events": {
    title: "Events | PSIT-SIF Kanpur",
    description:
      "Find startup, entrepreneurship, and innovation events hosted by PSIT-SIF in Kanpur, including workshops and founder programs.",
  },
  "/ecosystem": {
    title: "Startup Ecosystem | PSIT-SIF Kanpur",
    description:
      "Meet the institutional and government partners supporting the startup and innovation ecosystem at PSIT-SIF in Kanpur.",
  },
  "/team": {
    title: "Our Team | PSIT Startup & Incubation Foundation",
    description:
      "Meet the leadership, dignitaries, and incubation team supporting entrepreneurs at PSIT-SIF in Kanpur.",
  },
  "/iic": {
    title: "Institution's Innovation Council | PSIT",
    description:
      "Learn about the Institution's Innovation Council (IIC) at Pranveer Singh Institute of Technology (PSIT), including its certifications, events, and team.",
  },
  "/contact": {
    title: "Contact Us | PSIT-SIF Kanpur",
    description:
      "Contact PSIT-SIF in Kanpur to learn about startup incubation, founder support, innovation programs, and entrepreneurship.",
  },
};

const baseUrl = "https://psitsif.co.in";
const shareImage = `${baseUrl}/psit-sif-logo.png`;
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PSIT Startup & Incubation Foundation",
  alternateName: "PSIT-SIF",
  url: baseUrl,
  logo: shareImage,
  description:
    "PSIT-SIF supports entrepreneurs through startup incubation, mentorship, prototyping facilities, and innovation programs in Kanpur, India.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kanpur",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
};

const RouteSEO = () => {
  const { pathname } = useLocation();

  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/+$/,"") : pathname;

  const page = pages[normalizedPath];

  if (!page) {
    return (
      <Helmet>
        <title>Page Not Found | PSIT-SIF</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    );
  }

  const canonicalUrl = `${baseUrl}${page.canonicalPath || normalizedPath}`;

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta
        property="og:site_name"
        content="PSIT Startup and Incubation Foundation"
      />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:image" content={shareImage} />
      <meta
        property="og:image:alt"
        content="PSIT Startup and Incubation Foundation logo"
      />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={shareImage} />
      <meta
        name="twitter:image:alt"
        content="PSIT Startup and Incubation Foundation logo"
      />

      {normalizedPath === "/" && (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default RouteSEO;