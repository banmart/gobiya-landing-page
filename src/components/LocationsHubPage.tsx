import React, { useEffect } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import LocationsHub from './LocationsHub';
import CustomCursor from './CustomCursor';
import ParallaxMedia from './ParallaxMedia';

const LocationsHubPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Local SEO Agency — Los Angeles & Orange County | Gobiya';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Gobiya engineers search dominance for businesses across Los Angeles and Orange County. Explore our hyper-local SEO and B2B pipeline services by city.');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Local SEO Agency — Los Angeles & Orange County | Gobiya');
    window.scrollTo({ top: 0, behavior: 'instant' });

    // JSON-LD schema
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LocalBusiness',
          name: 'Gobiya SEO Agency',
          description: 'SEO and B2B pipeline engineering agency serving Los Angeles County and Orange County businesses.',
          url: 'https://gobiya.com/locations',
          telephone: '+1-424-222-0555',
          areaServed: [
            { '@type': 'County', name: 'Los Angeles County', addressRegion: 'CA' },
            { '@type': 'County', name: 'Orange County', addressRegion: 'CA' },
          ],
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gobiya.com/' },
            { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://gobiya.com/locations' },
          ],
        },
      ],
    };

    const existing = document.getElementById('locations-hub-schema');
    const script = existing || document.createElement('script');
    script.id = 'locations-hub-schema';
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(schema);
    if (!existing) document.head.appendChild(script);

    return () => {
      const s = document.getElementById('locations-hub-schema');
      if (s) s.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] relative font-sans selection:bg-[#F26522] selection:text-white page-wrapper">
      <CustomCursor />

      {/* ── HERO ── */}
      <section className="relative w-full pt-32 lg:pt-40 pb-20 bg-[#050505] overflow-hidden border-b border-white/10">
        {/* Background imagery */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 grid grid-cols-2">
            <ParallaxMedia
              type="image"
              src="/images/location-los-angeles.webp"
              alt="Los Angeles"
              className="w-full h-full opacity-25"
            />
            <ParallaxMedia
              type="image"
              src="/images/location-orange-county.webp"
              alt="Orange County"
              className="w-full h-full opacity-25"
            />
          </div>
          {/* Centre fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/30 to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
        </div>

        <Header theme="dark" />

        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-gray-500 mb-8" aria-label="breadcrumb">
            <a href="/" className="hover:text-[#F26522] transition-colors">Home</a>
            <span>/</span>
            <span className="text-gray-300">Locations</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <MapPin className="w-4 h-4 text-[#F26522]" />
            <span className="text-[13px] text-gray-300 tracking-wide uppercase font-medium">
              Southern California
            </span>
          </div>

          <h1 className="text-[clamp(2.5rem,6vw,4.8rem)] font-medium leading-[1.05] tracking-tight text-white mb-6 font-display max-w-[860px]">
            We dominate search in every Southern California market.
          </h1>
          <p className="text-[17px] sm:text-[20px] text-gray-400 max-w-[640px] leading-relaxed mb-10">
            From Glendale to Irvine — forensic SEO, AI visibility, and automated B2B pipelines built for the competitive LA and OC markets.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-6 pr-2 py-2 transition-colors duration-300"
            >
              <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-4">
                <span className="text-[14px] sm:text-[15px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  Get a free local SEO audit
                </span>
                <span className="text-[14px] sm:text-[15px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  Get a free local SEO audit
                </span>
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white flex items-center justify-center rounded-sm">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
              </div>
            </a>
            <a
              href="/services"
              className="inline-flex items-center border border-white/20 hover:border-white/40 text-white px-6 py-2 transition-colors duration-300 text-[14px] sm:text-[15px] font-medium"
            >
              View all services
            </a>
          </div>
        </div>
      </section>

      {/* ── LOCATIONS HUB SECTION (2-column) ── */}
      <LocationsHub />

      <Footer />
    </div>
  );
};

export default LocationsHubPage;
