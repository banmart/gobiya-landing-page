import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const caseStudies = [
  {
    id: 1,
    title: "RemodelMe Pros Contractors",
    description: "React Vite. New Website w/ Native CRM and marketplace.",
    videoSrc: "/videos/caveman.webm",
    link: undefined,
    badge: undefined,
    ctaText: "Learn more",
  },
  {
    id: 2,
    title: "SafetyCentric",
    description: "Commercial Security Integrators - React Vite.",
    videoSrc: "/videos/sc-hero-background-compressed.webm",
    link: undefined,
    badge: undefined,
    ctaText: "View case study",
  },
  {
    id: 3,
    title: "The Ark Crypto on Pulsechain",
    description: "Web3, Wallet Connect, Smart Contracts - React Vite.",
    videoSrc: "/videos/ark------final-----01.webm",
    link: undefined,
    badge: undefined,
    ctaText: "View case study",
  },
  {
    id: 4,
    title: "SmileCenter Dental Offices",
    description: "5x patient inquiries · 2.8x search impressions · Multi-location SEO · React Vite.",
    videoSrc: "/videos/smilecenter-screencast.webm",
    link: "/case-studies/smile-center-dentistry",
    badge: "5x Inquiries",
    ctaText: "View case study",
  },
  {
    id: 5,
    title: "American Livescan Fingerprinting",
    description: "3x online bookings & calls · +30% walk-ins · Local SEO & site rebuild.",
    imageSrc: "/images/livescan-office.webp",
    link: "/case-studies/american-livescan",
    badge: "3x Bookings",
    ctaText: "View case study",
  }
];

const CaseStudiesPinned = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, caseStudies.length);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (caseStudies.length <= 1 || isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 seconds per slide
    
    return () => clearInterval(interval);
  }, [isHovered]);

  // Handle video play/pause
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        // Play the active video
        video.play().catch(() => {});
      } else {
        // Pause inactive videos
        video.pause();
      }
    });
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-[#F5F5F5] w-full overflow-hidden relative py-16 sm:py-20 lg:py-28">
      <div className="w-full relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mb-10 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#F26522] text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">3</div>
                <div className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase bg-gray-900 text-white px-4 py-2 rounded-full shadow-md">
                  Client Success Stories
                </div>
              </div>
              <h2 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-2 sm:mb-4">
                AI Youtube Pre-Roll Ads
              </h2>
              <p className="text-gray-600 font-body text-base sm:text-lg lg:text-xl">
                Free with New Full Website Development
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-11 h-11 border border-gray-300 flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 rounded-full"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 border border-gray-300 flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 rounded-full"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div 
          className="w-full h-[500px] sm:h-[600px] flex flex-col sm:flex-row gap-2 sm:gap-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {caseStudies.map((study, index) => {
            const isActive = index === activeIndex;
            
            return (
              <div
                key={study.id}
                onClick={() => setActiveIndex(index)}
                className={`relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group bg-[#1a1d2e]
                  ${isActive ? 'flex-[8] sm:flex-[8]' : 'flex-[1] sm:flex-[1]'}
                `}
              >
                {study.videoSrc ? (
                  <video 
                    ref={el => videoRefs.current[index] = el}
                    src={study.videoSrc}
                    muted
                    loop
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 
                      ${isActive ? 'scale-100' : 'scale-[1.15]'}
                    `}
                  />
                ) : (
                  <img 
                    src={study.imageSrc} 
                    alt={study.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 
                      ${isActive ? 'scale-100' : 'scale-[1.15]'}
                    `} 
                  />
                )}
                
                {/* Metric badge (only visible if there is a badge) */}
                {study.badge && (
                  <div className={`absolute top-4 right-4 bg-[#F26522] text-white text-[12px] font-bold px-3 py-1.5 z-10 rounded-full transition-opacity duration-500
                    ${isActive ? 'opacity-100 delay-300' : 'opacity-0'}
                  `}>
                    {study.badge}
                  </div>
                )}
                
                {/* Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-700 
                  ${isActive ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100' : 'bg-black/60 group-hover:bg-black/40'}
                `} />
                
                {/* Active Content */}
                <div className={`absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col justify-end transition-opacity duration-500
                  ${isActive ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}
                `}>
                  <h3 className="text-white text-2xl sm:text-4xl font-medium leading-[1.15] mb-3 max-w-2xl font-display">
                    {study.title}
                  </h3>
                  <p className="text-gray-300 font-body text-base sm:text-lg max-w-xl mb-6">
                    {study.description}
                  </p>
                  
                  {study.link ? (
                    <a 
                      href={study.link} 
                      className="inline-flex items-center justify-center text-white bg-white/10 hover:bg-white hover:text-black backdrop-blur-md px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 w-max"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent accordion click when clicking the link
                      }}
                    >
                      {study.ctaText} <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center justify-center text-white bg-white/10 px-6 py-3 rounded-full text-sm font-semibold w-max opacity-80">
                      {study.ctaText}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesPinned;
