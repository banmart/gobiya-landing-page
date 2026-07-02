import React, { useEffect, useRef, useState } from 'react';
import { trackCTA } from '../lib/analytics';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, MapPin, TrendingUp, ShieldAlert, Search,
  Network, Target, BarChart, Zap, Building2, Star
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import SplitTextReveal from './SplitTextReveal';
import CaseStudiesPinned from './CaseStudiesPinned';
import InsightsGrid from './InsightsGrid';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────
   Regional hub data — one entry per market
───────────────────────────────────────── */
interface RegionalHubData {
  slug: string;
  regionLabel: string;
  heroHeadline: string;
  heroSubheadline: string;
  rotatingCities: string[];
  localCaseStudyStat: string;
  localCaseStudyDesc: string;
  localCaseStudyTag: string;
  introText: string;
  bentoHeadline: string;
  bentoSub: string;
  stats: { value: string; label: string }[];
  spokes: { href: string; label: string; icon: React.ReactNode; description: string; highlight?: boolean }[];
  schemaJson: object;
}

const REGIONAL_HUBS: Record<string, RegionalHubData> = {
  'southern-california': {
    slug: 'southern-california',
    regionLabel: 'Southern California',
    heroHeadline: 'Dominating Search in the Most Competitive Market on Earth.',
    heroSubheadline: 'Gobiya is a Los Angeles SEO and AI citation agency founded in 2010, serving businesses across LA County, Orange County, and San Diego. The agency specializes in organic search recovery, Google Map Pack optimization, and Generative Engine Optimization (GEO) for AI platforms including ChatGPT, Perplexity, and Google AI Overviews.',
    rotatingCities: ['Los Angeles.', 'Silicon Beach.', 'Orange County.', 'San Diego.'],
    localCaseStudyStat: '5x',
    localCaseStudyDesc: 'increase in patient inquiries and phone calls for SmileCenter Dentistry after rebuilding their multi-location site architecture — organic impressions grew from 75K to 213K.',
    localCaseStudyTag: 'Multi-location Healthcare · SEO & Web',
    introText: 'Southern California is not just a geography — it is the single most over-served, under-differentiated digital marketing market in the United States. Every mid-market brand in LA, Irvine, and San Diego is fighting for the same high-intent clicks, the same AI citations, and the same enterprise buyers. Generic agency retainers do not move the needle here. Precision engineering does.',
    bentoHeadline: 'SoCal-specific intelligence. Enterprise-grade execution.',
    bentoSub: 'We have operated in the Southern California market since 2012. We understand its search verticals, its competitive dynamics, and the algorithmic patterns specific to its industries — from real estate and legal to SaaS, fintech, and e-commerce.',
    stats: [
      { value: '12+', label: 'Years Serving SoCal Markets' },
      { value: '3x', label: 'Inbound Leads — American Livescan' },
      { value: '213K', label: 'Monthly Impressions — SmileCenter' },
      { value: 'BBB A+', label: 'Better Business Bureau Rated' },
    ],
    spokes: [
      {
        href: '/capabilities/forensic-seo-penalty-recovery',
        label: 'Forensic SEO & Penalty Recovery',
        icon: <ShieldAlert size={36} className="text-[#F26522] mb-6" strokeWidth={1.5} />,
        description: 'SaaS and enterprise brands devastated by algorithm updates get forensic recovery protocols and quality signal repair to reclaim traffic.',
        highlight: false,
      },
      {
        href: '/capabilities/generative-engine-optimization',
        label: 'GEO & AI Citations in SoCal',
        icon: <Network size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Engineer your brand to be cited natively by ChatGPT, Claude, and Gemini when buyers in LA, OC, and San Diego search for your solutions.',
        highlight: false,
      },
      {
        href: '/capabilities/conversion-architecture',
        label: 'Conversion Architecture',
        icon: <Target size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Automated cold outreach, CRM routing, and intent-signal capture funnels built to book qualified enterprise meetings on autopilot.',
        highlight: false,
      },
      {
        href: '/capabilities/semantic-search-intelligence',
        label: 'Semantic Search Intelligence',
        icon: <Search size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Establish entity authority and structured JSON-LD schemas linking your brand to verified knowledge bases to dominate semantic search.',
        highlight: false,
      },
      {
        href: '/capabilities/custom-digital-infrastructure',
        label: 'Custom Digital Infrastructure',
        icon: <Zap size={36} className="text-[#F26522] mb-6" strokeWidth={1.5} />,
        description: 'Sub-second React/Vite platforms, database configurations, and conversion-engineered systems built to rank and convert.',
        highlight: true,
      },
    ],
    schemaJson: {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.gobiya.com/#organization",
      "name": "Gobiya — Southern California",
      "url": "https://www.gobiya.com/markets/southern-california/",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012-11-25",
      "description": "Precision SEO, Generative Engine Optimization (GEO), and B2B pipeline engineering for enterprises in Los Angeles, Orange County, and San Diego.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Los Angeles", "sameAs": "https://www.wikidata.org/wiki/Q65" },
        { "@type": "City", "name": "Irvine", "sameAs": "https://www.wikidata.org/wiki/Q170143" },
        { "@type": "City", "name": "San Diego", "sameAs": "https://www.wikidata.org/wiki/Q16552" },
        { "@type": "City", "name": "Long Beach", "sameAs": "https://www.wikidata.org/wiki/Q16568" },
        { "@type": "City", "name": "Anaheim", "sameAs": "https://www.wikidata.org/wiki/Q107643" },
        { "@type": "AdministrativeArea", "name": "Orange County", "sameAs": "https://www.wikidata.org/wiki/Q107643" },
        { "@type": "AdministrativeArea", "name": "Los Angeles County", "sameAs": "https://www.wikidata.org/wiki/Q18013" },
        { "@type": "AdministrativeArea", "name": "Southern California", "sameAs": "https://www.wikidata.org/wiki/Q84827" }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3580 Wilshire Blvd, Ste 132",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "postalCode": "90010",
        "addressCountry": "US"
      },
      "knowsAbout": [
        "https://en.wikipedia.org/wiki/Search_engine_optimization",
        "https://en.wikipedia.org/wiki/Generative_artificial_intelligence",
        "https://en.wikipedia.org/wiki/B2B_marketing",
        "https://en.wikipedia.org/wiki/Pay-per-click"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/stevemartingobiya/",
        "https://m.yelp.com/biz/gobiya-los-angeles-5",
        "https://www.facebook.com/people/Gobiya/100064043744190/"
      ]
    },
  },
  'glendale': {
    slug: 'glendale',
    regionLabel: 'Glendale',
    heroHeadline: 'Dominating Search & AI Citations in Glendale.',
    heroSubheadline: 'Gobiya is a Los Angeles SEO agency founded in 2010 that provides local search optimization and AI citation engineering for businesses in Glendale, CA. Glendale has the largest Armenian-American population in the U.S. and one of the densest professional-services markets in LA County; the agency has served Glendale clients since 2012.',
    rotatingCities: ['Brand Boulevard.', 'Americana at Brand.', 'Glendale Galleria.', 'Verdugo Woodlands.'],
    localCaseStudyStat: '312%',
    localCaseStudyDesc: 'increase in local map-pack phone calls and B2B consultations for a Glendale professional services firm by structuring their local entity graph and securing high-authority citations.',
    localCaseStudyTag: 'Glendale Professional Services · Local SEO & GEO',
    introText: 'Glendale is a powerhouse business market in Los Angeles County, but most local operators are completely invisible on Brand Blvd and beyond. As consumers and enterprise buyers shift from search bars to AI recommendation engines, winning the Glendale market requires more than standard keywords. You need a localized entity footprint that ChatGPT and Gemini trust.',
    bentoHeadline: 'Hyper-localized Glendale SEO. Precision engineering.',
    bentoSub: 'We have optimized organic pipelines in Glendale since 2012. We understand Glendale\'s unique business geography — from the retail hub of Americana to the corporate towers along Brand Boulevard.',
    stats: [
      { value: '12+', label: 'Years Serving Glendale & LA' },
      { value: '360+', label: 'Untapped Weekly Impressions' },
      { value: '312%+', label: 'Average Map Call Growth' },
      { value: '#1', label: 'Local Maps & GEO Expert' },
    ],
    spokes: [
      {
        href: '/capabilities/forensic-seo-penalty-recovery',
        label: 'Forensic SEO & Penalty Recovery',
        icon: <ShieldAlert size={36} className="text-[#F26522] mb-6" strokeWidth={1.5} />,
        description: 'Glendale businesses hit by algorithm updates get forensic recovery protocols and quality signal repair to reclaim traffic.',
        highlight: false,
      },
      {
        href: '/capabilities/generative-engine-optimization',
        label: 'GEO & AI Citations in Glendale',
        icon: <Network size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Engineer your Glendale brand to be cited natively by ChatGPT, Claude, and Gemini when local buyers search for your solutions.',
        highlight: false,
      },
      {
        href: '/capabilities/conversion-architecture',
        label: 'Conversion Architecture',
        icon: <Target size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Automated cold outreach, CRM routing, and intent-signal capture funnels built to book qualified enterprise meetings on autopilot.',
        highlight: false,
      },
      {
        href: '/capabilities/semantic-search-intelligence',
        label: 'Semantic Search Intelligence',
        icon: <Search size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Establish entity authority and structured JSON-LD schemas linking your brand to Glendale coordinates to dominate semantic search.',
        highlight: false,
      },
      {
        href: '/capabilities/custom-digital-infrastructure',
        label: 'Custom Digital Infrastructure',
        icon: <Zap size={36} className="text-[#F26522] mb-6" strokeWidth={1.5} />,
        description: 'Sub-second React/Vite platforms, database configurations, and conversion-engineered systems built to rank and convert.',
        highlight: true,
      },
    ],
    schemaJson: {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.gobiya.com/#organization",
      "name": "Gobiya — Glendale",
      "url": "https://www.gobiya.com/locations/glendale/",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012-11-25",
      "description": "Precision Glendale SEO, Generative Engine Optimization (GEO), and B2B pipeline engineering for businesses in Glendale, CA.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Glendale", "sameAs": "https://www.wikidata.org/wiki/Q484433" },
        { "@type": "City", "name": "Burbank", "sameAs": "https://www.wikidata.org/wiki/Q193962" },
        { "@type": "City", "name": "Pasadena", "sameAs": "https://www.wikidata.org/wiki/Q486741" }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3580 Wilshire Blvd, Ste 132",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "postalCode": "90010",
        "addressCountry": "US"
      }
    }
  },
  'beverly-hills': {
    slug: 'beverly-hills',
    regionLabel: 'Beverly Hills',
    heroHeadline: 'Premium AI SEO & GEO for Beverly Hills Brands.',
    heroSubheadline: 'Gobiya is a Los Angeles SEO and GEO agency founded in 2010 that builds entity graphs and AI citation signals for luxury businesses and professional practices in Beverly Hills, CA (ZIP 90210). The agency specializes in Google Map Pack rankings, technical SEO, and Generative Engine Optimization for ChatGPT, Claude, and Gemini.',
    rotatingCities: ['Rodeo Drive.', 'Golden Triangle.', 'Wilshire Corridor.', 'Beverly Drive.'],
    localCaseStudyStat: '5x',
    localCaseStudyDesc: 'increase in high-net-worth inquiries and patient bookings for a Beverly Hills medical practice within 120 days of custom React site speed deployment and local schema mapping.',
    localCaseStudyTag: 'Beverly Hills Medical Practice · Conversion Architecture',
    introText: 'In Beverly Hills, competition is fierce and reputation is everything. Winning high-intent queries and securing citations in LLM engines like ChatGPT requires a highly-authoritative digital entity. We align your brand coordinates with verified entity nodes to dominate the luxury and premium markets.',
    bentoHeadline: 'Premium Beverly Hills SEO. High-end conversion.',
    bentoSub: 'We have optimized search positions in Beverly Hills since 2012. We understand Beverly Hills\' unique business demands — from Rodeo Drive retail to elite professional services along the Wilshire Corridor.',
    stats: [
      { value: '12+', label: 'Years Serving Beverly Hills & LA' },
      { value: '5x', label: 'Patient Inquiry Growth' },
      { value: '0.8s', label: 'Average Page Load Time' },
      { value: 'Page 1', label: 'Rankings for High-Intent Queries' },
    ],
    spokes: [
      {
        href: '/capabilities/forensic-seo-penalty-recovery',
        label: 'Forensic SEO & Penalty Recovery',
        icon: <ShieldAlert size={36} className="text-[#F26522] mb-6" strokeWidth={1.5} />,
        description: 'Elite Beverly Hills brands hit by traffic drops get forensic recovery protocols to restore search authority.',
        highlight: false,
      },
      {
        href: '/capabilities/generative-engine-optimization',
        label: 'GEO & AI Citations in Beverly Hills',
        icon: <Network size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Engineer your brand to be cited natively by ChatGPT, Claude, and Gemini when Beverly Hills buyers search for your services.',
        highlight: false,
      },
      {
        href: '/capabilities/conversion-architecture',
        label: 'Conversion Architecture',
        icon: <Target size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Automated CRM routing, scheduling integrations, and premium client booking pipelines.',
        highlight: false,
      },
      {
        href: '/capabilities/semantic-search-intelligence',
        label: 'Semantic Search Intelligence',
        icon: <Search size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Dominate luxury search grids by embedding clear entity attributes in Google\'s Knowledge Graph.',
        highlight: false,
      },
      {
        href: '/capabilities/custom-digital-infrastructure',
        label: 'Custom Digital Infrastructure',
        icon: <Zap size={36} className="text-[#F26522] mb-6" strokeWidth={1.5} />,
        description: 'Bespoke custom React websites built for elite aesthetics, fluid motion, and flawless load times.',
        highlight: true,
      },
    ],
    schemaJson: {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.gobiya.com/#organization",
      "name": "Gobiya — Beverly Hills",
      "url": "https://www.gobiya.com/locations/beverly-hills/",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012-11-25",
      "description": "Precision Beverly Hills SEO, Generative Engine Optimization (GEO), and B2B pipeline engineering for businesses in Beverly Hills, CA.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Beverly Hills", "sameAs": "https://www.wikidata.org/wiki/Q127390" },
        { "@type": "City", "name": "West Hollywood", "sameAs": "https://www.wikidata.org/wiki/Q186419" },
        { "@type": "City", "name": "Century City", "sameAs": "https://www.wikidata.org/wiki/Q1054366" }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3580 Wilshire Blvd, Ste 132",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "postalCode": "90010",
        "addressCountry": "US"
      }
    }
  },
  'northridge': {
    slug: 'northridge',
    regionLabel: 'Northridge',
    heroHeadline: 'Northridge SEO Company: Own the Valley Map Pack.',
    heroSubheadline: 'Gobiya is a Los Angeles SEO agency founded in 2010 that provides Google Map Pack optimization, local citation management, and AI search visibility for businesses in Northridge, CA and the broader San Fernando Valley. The agency documented a 3x increase in online bookings for a Northridge fingerprinting business after local SEO and GBP optimization.',
    rotatingCities: ['Reseda Blvd.', 'CSUN District.', 'Nordhoff St.', 'Tampa Ave.'],
    localCaseStudyStat: '3x',
    localCaseStudyDesc: 'growth in online bookings and customer phone calls for a Northridge fingerprinting and livescan business, displacing national competitors in the local map pack.',
    localCaseStudyTag: 'Northridge Local Business · Map Pack Dominance',
    introText: 'Northridge is the commercial hub of the northern San Fernando Valley. With CSUN and a dense population of local businesses, ranking page-1 on Google and appearing as a primary recommended entity in ChatGPT results is the difference between constant growth and obscurity.',
    bentoHeadline: 'Northridge Map Pack Dominance. Valley-wide SEO.',
    bentoSub: 'We have run localized SEO campaigns in Northridge and the San Fernando Valley since 2012. We know how to map geographic keywords to high-converting local service landing pages.',
    stats: [
      { value: '12+', label: 'Years Valley Experience' },
      { value: '3x', label: 'Increase in Online Bookings' },
      { value: 'Top 3', label: 'Google Maps Pack Ranks' },
      { value: '100%', label: 'NAP Citation Consistency' },
    ],
    spokes: [
      {
        href: '/capabilities/forensic-seo-penalty-recovery',
        label: 'Forensic SEO & Penalty Recovery',
        icon: <ShieldAlert size={36} className="text-[#F26522] mb-6" strokeWidth={1.5} />,
        description: 'San Fernando Valley domains hit by algorithmic updates get rapid recovery audits and topical repair.',
        highlight: false,
      },
      {
        href: '/capabilities/generative-engine-optimization',
        label: 'GEO & AI Citations in Northridge',
        icon: <Network size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Position your Northridge business to be recommended by ChatGPT, Claude, and Gemini when Valley users search.',
        highlight: false,
      },
      {
        href: '/capabilities/conversion-architecture',
        label: 'Conversion Architecture',
        icon: <Target size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Turn local map views and local page visits into booked appointments and inbound calls.',
        highlight: false,
      },
      {
        href: '/capabilities/semantic-search-intelligence',
        label: 'Semantic Search Intelligence',
        icon: <Search size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Embed local schema graphs linking your GBP directly to verified Northridge coordinates.',
        highlight: false,
      },
      {
        href: '/capabilities/custom-digital-infrastructure',
        label: 'Custom Digital Infrastructure',
        icon: <Zap size={36} className="text-[#F26522] mb-6" strokeWidth={1.5} />,
        description: 'Sub-second custom React pages designed to turn mobile map traffic into conversions.',
        highlight: true,
      },
    ],
    schemaJson: {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.gobiya.com/#organization",
      "name": "Gobiya — Northridge",
      "url": "https://www.gobiya.com/locations/northridge/",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012-11-25",
      "description": "Precision Northridge SEO, Generative Engine Optimization (GEO), and B2B pipeline engineering for businesses in Northridge, CA.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Northridge", "sameAs": "https://www.wikidata.org/wiki/Q1025539" },
        { "@type": "City", "name": "Chatsworth", "sameAs": "https://www.wikidata.org/wiki/Q1002360" },
        { "@type": "City", "name": "Porter Ranch", "sameAs": "https://www.wikidata.org/wiki/Q7231649" },
        { "@type": "City", "name": "Granada Hills", "sameAs": "https://www.wikidata.org/wiki/Q5594098" }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3580 Wilshire Blvd, Ste 132",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "postalCode": "90010",
        "addressCountry": "US"
      }
    }
  },
  'studio-city': {
    slug: 'studio-city',
    regionLabel: 'Studio City',
    heroHeadline: 'Studio City Local SEO: Own the Valley\'s Creative Corridor.',
    heroSubheadline: 'Gobiya is a Los Angeles SEO agency founded in 2010 that provides technical SEO, AI citation optimization, and Google Map Pack rankings for creative agencies and professional services businesses in Studio City along the Ventura Boulevard corridor. The agency has served Studio City clients since 2012.',
    rotatingCities: ['Ventura Blvd.', 'Tujunga Village.', 'Laurel Canyon.', 'Colfax Meadows.'],
    localCaseStudyStat: '4.4x',
    localCaseStudyDesc: 'higher client conversion rates for a Studio City creative production agency by shifting their organic presence to AI citations and high-intent local search clusters.',
    localCaseStudyTag: 'Studio City Agency · AI Citation GEO',
    introText: 'Studio City is Ventura Boulevard\'s creative corridor. Traditional SEO is not enough here; your clients are searching in ChatGPT, Perplexity, and Gemini. We build structured entities to ensure your business is the one recommended when buyers look for the best local services.',
    bentoHeadline: 'Creative Studio City SEO. AI-First Strategy.',
    bentoSub: 'We have worked with Studio City creators, production agencies, and businesses since 2012 to align their technical SEO and entity visibility with modern search algorithm changes.',
    stats: [
      { value: '12+', label: 'Years Serving Studio City & LA' },
      { value: '4.4x', label: 'Higher Conversion Rates' },
      { value: 'Top 5', label: 'Rankings on Ventura Blvd' },
      { value: '100%', label: 'AI Overview Visibility' },
    ],
    spokes: [
      {
        href: '/capabilities/forensic-seo-penalty-recovery',
        label: 'Forensic SEO & Penalty Recovery',
        icon: <ShieldAlert size={36} className="text-[#F26522] mb-6" strokeWidth={1.5} />,
        description: 'Creative agencies suffering update drops get rapid forensic diagnostic recovery protocols.',
        highlight: false,
      },
      {
        href: '/capabilities/generative-engine-optimization',
        label: 'GEO & AI Citations in Studio City',
        icon: <Network size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Position your production company or local business as the primary recommendation in ChatGPT and Claude.',
        highlight: false,
      },
      {
        href: '/capabilities/conversion-architecture',
        label: 'Conversion Architecture',
        icon: <Target size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Construct automated appointment booking and pipeline pipelines for B2B creative teams.',
        highlight: false,
      },
      {
        href: '/capabilities/semantic-search-intelligence',
        label: 'Semantic Search Intelligence',
        icon: <Search size={36} className="text-white mb-6" strokeWidth={1.5} />,
        description: 'Map entity associations showing you are a verified player in the entertainment and creative fields.',
        highlight: false,
      },
      {
        href: '/capabilities/custom-digital-infrastructure',
        label: 'Custom Digital Infrastructure',
        icon: <Zap size={36} className="text-[#F26522] mb-6" strokeWidth={1.5} />,
        description: 'Sub-second, highly visual custom React pages tailored for creative agency aesthetics.',
        highlight: true,
      },
    ],
    schemaJson: {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://www.gobiya.com/#organization",
      "name": "Gobiya — Studio City",
      "url": "https://www.gobiya.com/locations/studio-city/",
      "logo": "https://www.gobiya.com/images/gobiya---logo.webp",
      "foundingDate": "2012-11-25",
      "description": "Precision Studio City SEO, Generative Engine Optimization (GEO), and B2B pipeline engineering for businesses in Studio City, CA.",
      "telephone": "(323) 744-1338",
      "priceRange": "$$$$",
      "areaServed": [
        { "@type": "City", "name": "Studio City", "sameAs": "https://www.wikidata.org/wiki/Q1025544" },
        { "@type": "City", "name": "Sherman Oaks", "sameAs": "https://www.wikidata.org/wiki/Q1009139" },
        { "@type": "City", "name": "Universal City", "sameAs": "https://www.wikidata.org/wiki/Q1025549" },
        { "@type": "City", "name": "Toluca Lake", "sameAs": "https://www.wikidata.org/wiki/Q1025547" }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3580 Wilshire Blvd, Ste 132",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "postalCode": "90010",
        "addressCountry": "US"
      }
    }
  },
};

/* ─────────────────────────────
   City badge component
───────────────────────────── */
const CityBadge: React.FC<{ city: string; delay: number }> = ({ city, delay }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, delay, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 90%' } }
    );
  }, [delay]);
  return (
    <div ref={ref} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
      <MapPin size={12} className="text-[#F26522]" />
      <span className="text-[13px] text-white/80 font-medium">{city}</span>
    </div>
  );
};

/* ─────────────────────────────
   Stat card component
───────────────────────────── */
const StatCard: React.FC<{ value: string; label: string; index: number }> = ({ value, label, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, delay: index * 0.12, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 85%' } }
    );
  }, [index]);
  return (
    <div ref={ref} className="flex flex-col border-l border-white/20 pl-6">
      <span className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-none mb-1">{value}</span>
      <span className="text-[13px] text-white/50 font-medium leading-snug mt-1">{label}</span>
    </div>
  );
};

/* ─────────────────────────────
   Spoke card component
───────────────────────────── */
const SpokeCard: React.FC<{
  href: string; label: string; icon: React.ReactNode;
  description: string; highlight?: boolean; colSpan?: number; index: number;
}> = ({ href, label, icon, description, highlight, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.7, delay: index * 0.1, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 88%' } }
    );
  }, [index]);
  return (
    <div ref={ref} className="col-span-1">
      <a
        href={href}
        className={`group flex flex-col h-full p-7 sm:p-8 border transition-all duration-300 cursor-pointer relative overflow-hidden ${
          highlight
            ? 'bg-[#F26522] border-[#F26522] hover:bg-[#d9551a]'
            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/25'
        }`}
      >
        {icon}
        <h3 className="text-[17px] sm:text-[19px] font-semibold text-white mb-3 leading-snug tracking-tight">{label}</h3>
        <p className="text-[14px] text-white/60 leading-relaxed mb-6 flex-grow">{description}</p>
        <div className={`flex items-center gap-2 text-[13px] font-semibold transition-colors ${
          highlight ? 'text-white' : 'text-[#F26522]'
        }`}>
          <span>Learn more</span>
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </a>
    </div>
  );
};

/* ─────────────────────────────
   Main component
───────────────────────────── */
interface RegionalHubPageProps {
  region: string;
}

const RegionalHubPage: React.FC<RegionalHubPageProps> = ({ region }) => {
  const data = REGIONAL_HUBS[region];
  const heroRef = useRef<HTMLDivElement>(null);
  const caseStudyRef = useRef<HTMLDivElement>(null);
  const [activeCity, setActiveCity] = useState(0);

  // Inject JSON-LD schema
  useEffect(() => {
    if (!data) return;
    const existingScript = document.querySelector('script[data-regional-schema]');
    if (existingScript) existingScript.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-regional-schema', 'true');
    script.textContent = JSON.stringify(data.schemaJson);
    document.head.appendChild(script);
    return () => {
      const s = document.querySelector('script[data-regional-schema]');
      if (s) s.remove();
    };
  }, [data]);

  // Rotating city label
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCity(prev => (prev + 1) % data.rotatingCities.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [data]);

  // Hero entrance
  useEffect(() => {
    if (!heroRef.current) return;
    gsap.fromTo(heroRef.current.querySelectorAll('.hero-fade'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.1 }
    );
  }, []);

  // Case study parallax
  useEffect(() => {
    if (!caseStudyRef.current) return;
    gsap.fromTo(caseStudyRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: caseStudyRef.current, start: 'top 80%' } }
    );
  }, []);

  if (!data) {
    return (
      <>
        <Header theme="dark" />
        <div className="min-h-screen bg-[#111] flex items-center justify-center">
          <p className="text-white/50 text-lg">Regional hub not found.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header theme="dark" />

      <main className="bg-[#0d0d0d] text-white overflow-x-hidden">

        {/* ── HERO ────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex flex-col justify-end pt-40 pb-16 sm:pb-24 px-5 sm:px-8 lg:px-12 overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a00] via-[#0d0d0d] to-[#050515] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_20%,rgba(242,101,34,0.10),transparent)] pointer-events-none" />

          {/* Background Image Hero */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
            <img 
              src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000" 
              alt="Markets Hero Background" 
              className="w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
          </div>

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

          <div className="relative z-10 max-w-[1440px] mx-auto w-full">

            {/* Breadcrumb */}
            <div className="hero-fade flex items-center gap-2 mb-8">
              <a href="/" className="text-[12px] text-white/40 hover:text-white/70 transition-colors">Gobiya</a>
              <span className="text-white/20 text-[12px]">/</span>
              <span className="text-[12px] text-[#F26522] font-medium">Markets</span>
              <span className="text-white/20 text-[12px]">/</span>
              <span className="text-[12px] text-white/40">{data.regionLabel}</span>
            </div>

            {/* Region badge */}
            <div className="hero-fade flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2 bg-[#F26522]/15 border border-[#F26522]/30 px-4 py-1.5 rounded-full">
                <MapPin size={12} className="text-[#F26522]" />
                <span className="text-[12px] text-[#F26522] font-semibold uppercase tracking-wider">{data.regionLabel} Market Hub</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="hero-fade text-4xl sm:text-5xl lg:text-[64px] xl:text-[72px] font-bold leading-[1.05] tracking-tight mb-6 max-w-5xl">
              {data.heroHeadline}
            </h1>

            {/* Rotating city */}
            <div className="hero-fade flex items-center gap-3 mb-6">
              <span className="text-white/40 text-lg sm:text-xl font-medium">Serving</span>
              <div className="relative h-8 overflow-hidden">
                {data.rotatingCities.map((city, i) => (
                  <span
                    key={city}
                    className="absolute inset-0 text-[#F26522] text-lg sm:text-xl font-bold transition-all duration-500"
                    style={{
                      transform: i === activeCity ? 'translateY(0)' : i < activeCity ? 'translateY(-100%)' : 'translateY(100%)',
                      opacity: i === activeCity ? 1 : 0,
                    }}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Subheadline */}
            <p className="hero-fade text-[16px] sm:text-[18px] text-white/55 leading-relaxed max-w-2xl mb-10">
              {data.heroSubheadline}
            </p>

            {/* CTAs */}
            <div className="hero-fade flex flex-wrap gap-4 mb-14">
              <a
                href="/book"
                id="regional-hub-cta-primary"
                data-cta-location="regional_hub_hero"
                data-cta-text="Get a free SoCal audit"
                onClick={() => trackCTA({ cta_location: 'regional_hub_hero', cta_text: 'Get a free SoCal audit' })}
                className="group flex items-center text-white bg-[#F26522] pl-6 pr-3 py-3 hover:bg-[#d9551a] transition-colors"
              >
                <span className="text-[14px] font-semibold mr-3">Get a free SoCal audit</span>
                <div className="w-7 h-7 bg-white flex items-center justify-center">
                  <ArrowRight size={14} className="text-[#F26522] transition-transform duration-300 group-hover:-rotate-45" />
                </div>
              </a>
              <a
                href="/case-studies"
                id="regional-hub-cta-secondary"
                className="flex items-center gap-2 text-white/60 hover:text-white border border-white/15 hover:border-white/40 px-6 py-3 transition-colors text-[14px] font-medium"
              >
                <BarChart size={14} />
                View case studies
              </a>
            </div>

            {/* Stats bar */}
            <div className="hero-fade grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 border-t border-white/10 pt-10">
              {data.stats.map((stat, i) => (
                <StatCard key={stat.label} value={stat.value} label={stat.label} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CITY BADGES ─────────────────────── */}
        <section className="px-5 sm:px-8 lg:px-12 py-10 border-y border-white/[0.06]">
          <div className="max-w-[1440px] mx-auto flex flex-wrap gap-3 items-center">
            <span className="text-[12px] text-white/30 font-semibold uppercase tracking-widest mr-4">Markets We Serve</span>
            {[
              'Los Angeles', 'Beverly Hills', 'Santa Monica', 'Silicon Beach', 'Culver City',
              'Irvine', 'Anaheim', 'Newport Beach', 'Orange County', 'Long Beach',
              'San Diego', 'Carlsbad', 'Chula Vista'
            ].map((city, i) => (
              <CityBadge key={city} city={city} delay={i * 0.05} />
            ))}
          </div>
        </section>

        {/* ── HYPER-LOCAL CASE STUDY ──────────── */}
        <section className="px-5 sm:px-8 lg:px-12 py-20 sm:py-28">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Left: big stat */}
            <div ref={caseStudyRef}>
              <div className="inline-flex items-center gap-2 bg-[#F26522]/10 border border-[#F26522]/25 px-4 py-1.5 rounded-full mb-8">
                <Star size={12} className="text-[#F26522]" />
                <span className="text-[11px] text-[#F26522] font-bold uppercase tracking-wider">Featured SoCal Case Study</span>
              </div>
              <div className="text-[80px] sm:text-[100px] lg:text-[120px] font-black tracking-tighter leading-none text-white mb-4 relative">
                {data.localCaseStudyStat}
                <span className="absolute -top-2 right-0 sm:right-auto sm:left-full sm:ml-3 text-[#F26522] text-[40px] sm:text-[56px]">↑</span>
              </div>
              <div className="inline-block bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
                <span className="text-[12px] text-white/50 font-medium">{data.localCaseStudyTag}</span>
              </div>
              <p className="text-[16px] sm:text-[18px] text-white/60 leading-relaxed max-w-lg">
                {data.localCaseStudyDesc}
              </p>
              <a
                href="/book"
                id="regional-case-study-cta"
                data-cta-location="regional_hub_case_study"
                data-cta-text="Can we do this for your brand?"
                onClick={() => trackCTA({ cta_location: 'regional_hub_case_study', cta_text: 'Can we do this for your brand?' })}
                className="group inline-flex items-center gap-3 mt-8 text-[14px] font-semibold text-[#F26522] hover:text-[#d9551a] transition-colors"
              >
                Can we do this for your brand?
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Right: intro copy */}
            <div>
              <h2 className="text-[26px] sm:text-[32px] font-bold tracking-tight leading-snug mb-6 text-white">
                Southern California demands precision — not<br className="hidden sm:block" /> another generic retainer.
              </h2>
              <p className="text-[15px] sm:text-[16px] text-white/55 leading-relaxed mb-8">
                {data.introText}
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: <Building2 size={16} className="text-[#F26522]" />, text: 'Headquarters on Wilshire Blvd, Los Angeles — embedded in the market' },
                  { icon: <Search size={16} className="text-[#F26522]" />, text: 'Deep knowledge of SoCal\'s most competitive verticals: legal, SaaS, healthcare, real estate' },
                  { icon: <TrendingUp size={16} className="text-[#F26522]" />, text: 'Forensic SEO recovery protocols proven in the LA and OC markets since 2012' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                    <span className="text-[14px] text-white/55 leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SPOKES BENTO GRID ───────────────── */}
        <section className="px-5 sm:px-8 lg:px-12 py-20 sm:py-28 bg-[#0a0a0a]">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-14">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#F26522] mb-4 block">Capabilities → Spoke Pages</span>
              <h2 className="text-[32px] sm:text-[42px] lg:text-[52px] font-bold tracking-tight leading-tight text-white mb-4 max-w-3xl">
                {data.bentoHeadline}
              </h2>
              <p className="text-[15px] sm:text-[16px] text-white/50 leading-relaxed max-w-2xl">
                {data.bentoSub}
              </p>
            </div>

            {/* 3-column bento grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.spokes.map((spoke, i) => (
                <SpokeCard
                  key={spoke.href}
                  href={spoke.href}
                  label={spoke.label}
                  icon={spoke.icon}
                  description={spoke.description}
                  highlight={spoke.highlight}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── INTRO PASSAGE ───────────────────── */}
        <section className="px-5 sm:px-8 lg:px-12 py-20 sm:py-28 border-t border-white/[0.06]">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#F26522] block mb-4">Why Gobiya</span>
              <h2 className="text-[26px] sm:text-[32px] font-bold tracking-tight leading-tight text-white">
                The SoCal market has never been more brutal. We have built the playbook to win it.
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <SplitTextReveal
                text={data.introText}
                containerClassName="w-full"
                textClassName="split text-[16px] sm:text-[18px] text-white/55 leading-relaxed opacity-0"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 border-t border-white/10 pt-8">
                {[
                  { label: 'LA-Based Team', desc: 'Embedded in the market. Not remote consultants parachuting in.' },
                  { label: 'No Boilerplate', desc: 'Every engagement is custom-built — zero templated reports.' },
                  { label: 'ROI-First Mandate', desc: 'We only take engagements where we can demonstrate clear mathematical returns.' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <span className="text-[13px] font-bold text-white mb-2">{item.label}</span>
                    <span className="text-[13px] text-white/40 leading-relaxed">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CASE STUDIES ────────────────────── */}
        <section className="py-4">
          <CaseStudiesPinned />
        </section>

        {/* ── INSIGHTS GRID ───────────────────── */}
        <section className="px-5 sm:px-8 lg:px-12 py-20 sm:py-28 border-t border-white/[0.06]">
          <div className="max-w-[1440px] mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#F26522] block mb-4">SoCal Intelligence</span>
            <h2 className="text-[28px] sm:text-[36px] font-bold tracking-tight text-white leading-tight">
              Insights on the Southern California digital market.
            </h2>
          </div>
          <InsightsGrid />
        </section>

        {/* ── BOTTOM CTA ──────────────────────── */}
        <section className="px-5 sm:px-8 lg:px-12 py-20 sm:py-28 bg-[#F26522] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_80%_50%,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
          <div className="max-w-[1440px] mx-auto relative z-10">
            <div className="max-w-3xl">
              <span className="text-[11px] font-bold uppercase tracking-widest text-white/60 block mb-4">Southern California</span>
              <h2 className="text-[36px] sm:text-[52px] font-bold tracking-tight leading-tight text-white mb-6">
                Ready to dominate the most competitive search market in America?
              </h2>
              <p className="text-[16px] sm:text-[18px] text-white/70 leading-relaxed mb-10 max-w-xl">
                We only take on SoCal partners where we can mathematically guarantee pipeline impact. Request your free forensic audit today.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/book"
                  id="regional-hub-bottom-cta"
                  data-cta-location="regional_hub_bottom"
                  data-cta-text="Request a free SoCal audit"
                  onClick={() => trackCTA({ cta_location: 'regional_hub_bottom', cta_text: 'Request a free SoCal audit' })}
                  className="group flex items-center bg-white text-[#F26522] pl-6 pr-3 py-3 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-[14px] font-bold mr-3">Request a free SoCal audit</span>
                  <div className="w-7 h-7 bg-[#F26522] flex items-center justify-center">
                    <ArrowRight size={14} className="text-white transition-transform duration-300 group-hover:-rotate-45" />
                  </div>
                </a>
                <a
                  href="/case-studies"
                  className="flex items-center gap-2 text-white border border-white/30 hover:border-white px-6 py-3 transition-colors text-[14px] font-medium"
                >
                  View our case studies
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default RegionalHubPage;
