import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import './LocationsHub.css';

const LA_CITIES = [
  {
    name: 'Glendale',
    slug: '/locations/glendale-seo',
    highlight: 'Media & Healthcare Hub',
    stat: '+245% traffic growth',
  },
  {
    name: 'Burbank',
    slug: '/locations/burbank-seo',
    highlight: 'Entertainment & Tech',
    stat: '+312% organic growth',
  },
  {
    name: 'Pasadena',
    slug: '/locations/pasadena-seo',
    highlight: 'Biotech & Education',
    stat: '+280% traffic growth',
  },
  {
    name: 'Long Beach',
    slug: '/locations/long-beach-seo',
    highlight: 'Logistics & Port Economy',
    stat: '+195% organic growth',
  },
];

const OC_CITIES = [
  {
    name: 'Anaheim',
    slug: '/locations/anaheim-seo',
    highlight: 'Hospitality & Healthcare',
    stat: '+260% traffic growth',
  },
  {
    name: 'Costa Mesa',
    slug: '/locations/costa-mesa-seo',
    highlight: 'Fashion & Retail',
    stat: '+225% organic growth',
  },
  {
    name: 'Irvine',
    slug: '/locations/irvine-seo',
    highlight: 'Enterprise Tech & SaaS',
    stat: '+340% traffic growth',
  },
  {
    name: 'Santa Ana',
    slug: '/locations/santa-ana-seo',
    highlight: 'Legal & Financial Services',
    stat: '+220% organic growth',
  },
];

const MARQUEE_ITEMS_LA = [
  'GLENDALE', 'BURBANK', 'PASADENA', 'LONG BEACH', 'STUDIO CITY', 'NORTH HOLLYWOOD',
  'LA CAÑADA', 'ARCADIA', 'MONROVIA', 'ALHAMBRA', 'SAN GABRIEL',
];
const MARQUEE_ITEMS_OC = [
  'ANAHEIM', 'COSTA MESA', 'IRVINE', 'SANTA ANA', 'NEWPORT BEACH', 'HUNTINGTON BEACH',
  'YORBA LINDA', 'FULLERTON', 'GARDEN GROVE', 'MISSION VIEJO', 'LAKE FOREST',
];

const CityCard: React.FC<{ city: typeof LA_CITIES[0]; accent: 'orange' | 'dark' }> = ({ city, accent }) => (
  <a
    href={city.slug}
    className={`locations-city-card group flex flex-col justify-between p-6 border transition-all duration-300 cursor-pointer ${
      accent === 'orange'
        ? 'border-[#F26522]/30 bg-[#F26522]/5 hover:bg-[#F26522]/10 hover:border-[#F26522]/60'
        : 'border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20'
    }`}
    aria-label={`SEO services in ${city.name}`}
  >
    <div>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#F26522] flex-shrink-0 mt-0.5" />
          <h3 className="text-xl font-semibold text-white font-display">{city.name}</h3>
        </div>
        <div className="w-7 h-7 bg-[#F26522]/10 border border-[#F26522]/20 flex items-center justify-center rounded-sm group-hover:bg-[#F26522] group-hover:border-[#F26522] transition-all duration-300">
          <ArrowRight className="w-3.5 h-3.5 text-[#F26522] group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
        </div>
      </div>
      <p className="text-[13px] text-gray-400 font-medium">{city.highlight}</p>
    </div>
    <div className="mt-6 pt-5 border-t border-white/10">
      <span className="text-[12px] font-bold text-[#F26522] tracking-wider uppercase">{city.stat}</span>
    </div>
  </a>
);

const HorizontalMarquee: React.FC<{ items: string[]; reverse?: boolean }> = ({ items, reverse }) => {
  const doubled = [...items, ...items];
  return (
    <div className="locations-marquee-wrapper">
      <div
        className="locations-marquee-track"
        style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {doubled.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-gray-500 whitespace-nowrap px-5">
              {item}
            </span>
            <span className="text-[#F26522] text-[10px] flex-shrink-0">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const LocationsHub: React.FC = () => {
  return (
    <section className="w-full bg-[#050505] py-24 lg:py-32 border-t border-white/10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <p className="text-sm font-bold tracking-widest uppercase text-[#F26522] mb-4 font-body">
              Local SEO Coverage
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.1] tracking-tight text-white font-display max-w-[600px]">
              We engineer search dominance across Southern California.
            </h2>
          </div>
          <a
            href="/services"
            className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 pr-2 py-2 transition-colors duration-300 self-start lg:self-end flex-shrink-0"
          >
            <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
              <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                View all services
              </span>
              <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                View all services
              </span>
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
            </div>
          </a>
        </div>

        {/* ── LOS ANGELES COUNTY ── */}
        <div className="mb-16">
          {/* Region header with image */}
          <div className="relative rounded-2xl overflow-hidden mb-6 h-[200px] lg:h-[240px]">
            <img
              src="/images/location-los-angeles.webp"
              alt="Los Angeles County skyline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#F26522] flex items-center justify-center rounded-sm">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-[12px] font-bold tracking-widest uppercase text-[#F26522]">Los Angeles County</span>
              </div>
              <p className="text-[clamp(1.6rem,3vw,2.4rem)] font-medium text-white font-display leading-tight">
                Serving 10M+ residents across LA's most competitive markets.
              </p>
            </div>
          </div>

          {/* City marquee */}
          <div className="mb-6 py-3 border-y border-white/10 bg-white/[0.02]">
            <HorizontalMarquee items={MARQUEE_ITEMS_LA} />
          </div>

          {/* City cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {LA_CITIES.map((city, idx) => (
              <CityCard key={idx} city={city} accent={idx % 2 === 0 ? 'orange' : 'dark'} />
            ))}
          </div>
        </div>

        {/* ── ORANGE COUNTY ── */}
        <div>
          {/* Region header with image */}
          <div className="relative rounded-2xl overflow-hidden mb-6 h-[200px] lg:h-[240px]">
            <img
              src="/images/location-orange-county.webp"
              alt="Orange County California coastline"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#F26522] flex items-center justify-center rounded-sm">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-[12px] font-bold tracking-widest uppercase text-[#F26522]">Orange County</span>
              </div>
              <p className="text-[clamp(1.6rem,3vw,2.4rem)] font-medium text-white font-display leading-tight">
                Enterprise growth in OC's fastest-scaling business markets.
              </p>
            </div>
          </div>

          {/* City marquee */}
          <div className="mb-6 py-3 border-y border-white/10 bg-white/[0.02]">
            <HorizontalMarquee items={MARQUEE_ITEMS_OC} reverse />
          </div>

          {/* City cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OC_CITIES.map((city, idx) => (
              <CityCard key={idx} city={city} accent={idx % 2 !== 0 ? 'orange' : 'dark'} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default LocationsHub;
