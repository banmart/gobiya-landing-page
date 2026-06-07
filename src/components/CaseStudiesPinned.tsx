import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import ParallaxMedia from './ParallaxMedia';

const CaseStudiesPinned = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  useEffect(() => {
    const calcMax = () => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const cards = track.children;
      if (cards.length === 0) return;
      const card = cards[0] as HTMLElement;
      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      const cardWidth = card.offsetWidth + gap;
      const visibleCards = Math.floor(track.parentElement!.offsetWidth / cardWidth);
      setMaxIndex(Math.max(0, cards.length - visibleCards));
    };
    calcMax();
    window.addEventListener('resize', calcMax);
    return () => window.removeEventListener('resize', calcMax);
  }, []);

  const slideTo = (index: number) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const cards = track.children;
    if (cards.length === 0) return;
    const card = cards[0] as HTMLElement;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const cardWidth = card.offsetWidth + gap;
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clamped);
    gsap.to(track, { x: -(clamped * cardWidth), duration: 0.6, ease: 'power3.out' });
  };

  const handlePrev = () => slideTo(currentIndex - 1);
  const handleNext = () => slideTo(currentIndex + 1);

  // Touch / drag support
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    currentX.current = e.clientX;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    currentX.current = e.clientX;
  };
  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startX.current - currentX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <section className="bg-[#F5F5F5] w-full overflow-hidden relative py-16 sm:py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#F26522] text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">3</div>
            <div className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase bg-gray-900 text-white px-4 py-2 rounded-full shadow-md">
              Client Success Stories
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-11 h-11 border border-gray-300 flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 disabled:opacity-20 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="w-11 h-11 border border-gray-300 flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300 disabled:opacity-20 disabled:pointer-events-none"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <h2 className="text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-2 sm:mb-4">
          AI Youtube Pre-Roll Ads
        </h2>
        <p className="text-gray-600 font-body text-base sm:text-lg lg:text-xl mb-10 sm:mb-14">
          Free with New Full Website Development
        </p>
      </div>

      <div
        className="pl-5 sm:pl-8 lg:pl-12 w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div ref={trackRef} className="flex gap-5 sm:gap-6 lg:gap-7 w-max pr-5 sm:pr-8 lg:pr-12 pb-4">
          
          {/* Card 1 */}
          <div className="group cursor-pointer flex-none w-[85vw] md:w-[45vw] lg:w-[35vw] select-none">
            <div className="aspect-[4/3] overflow-hidden bg-[#1a1d2e] relative isolate mb-4 rounded-xl shadow-lg">
              <ParallaxMedia type="video" src="/videos/caveman.webm" autoPlay muted loop playsInline className="w-full h-full" />
              <div className="absolute bottom-4 left-4 h-9 bg-white flex items-center overflow-hidden w-9 group-hover:w-[148px] transition-all duration-300 ease-in-out z-10 px-2.5 rounded-full">
                <div className="flex-shrink-0 w-4 h-4 mr-2 flex items-center justify-center -ml-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </div>
                <span className="text-[13px] font-medium text-gray-900 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                  Learn more
                </span>
              </div>
            </div>
            <h3 className="text-[16px] sm:text-[18px] font-display font-medium text-gray-900 mt-3">RemodelMe Pros Contractors</h3>
            <p className="text-[14px] text-gray-600 mt-1.5 leading-relaxed font-body">React Vite. New Website w/ Native CRM and marketplace.</p>
          </div>

          {/* Card 2 */}
          <div className="group cursor-pointer flex-none w-[85vw] md:w-[45vw] lg:w-[35vw] select-none">
            <div className="aspect-[4/3] overflow-hidden bg-[#1a1d2e] relative isolate mb-4 rounded-xl shadow-lg">
              <ParallaxMedia type="video" src="/videos/sc-hero-background-compressed.webm" autoPlay muted loop playsInline className="w-full h-full" />
              <div className="absolute bottom-4 left-4 h-9 bg-gray-900 flex items-center overflow-hidden w-9 group-hover:w-[168px] transition-all duration-300 ease-in-out z-10 px-2.5 rounded-full">
                <div className="flex-shrink-0 w-4 h-4 mr-2 flex items-center justify-center -ml-0.5">
                  <ArrowRight className="w-3.5 h-3.5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out" />
                </div>
                <span className="text-[13px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                  View case study
                </span>
              </div>
            </div>
            <h3 className="text-[16px] sm:text-[18px] font-display font-medium text-gray-900 mt-3">SafetyCentric</h3>
            <p className="text-[14px] text-gray-600 mt-1.5 leading-relaxed font-body">Commercial Security Integrators - React Vite.</p>
          </div>

          {/* Card 3 */}
          <div className="group cursor-pointer flex-none w-[85vw] md:w-[45vw] lg:w-[35vw] select-none">
            <div className="aspect-[4/3] overflow-hidden bg-[#1a1d2e] relative isolate mb-4 rounded-xl shadow-lg">
              <ParallaxMedia type="video" src="/videos/ark------final-----01.webm" autoPlay muted loop playsInline className="w-full h-full" />
              <div className="absolute bottom-4 left-4 h-9 bg-gray-900 flex items-center overflow-hidden w-9 group-hover:w-[168px] transition-all duration-300 ease-in-out z-10 px-2.5 rounded-full">
                <div className="flex-shrink-0 w-4 h-4 mr-2 flex items-center justify-center -ml-0.5">
                  <ArrowRight className="w-3.5 h-3.5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out" />
                </div>
                <span className="text-[13px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                  View case study
                </span>
              </div>
            </div>
            <h3 className="text-[16px] sm:text-[18px] font-display font-medium text-gray-900 mt-3">The Ark Crypto on Pulsechain</h3>
            <p className="text-[14px] text-gray-600 mt-1.5 leading-relaxed font-body">Web3, Wallet Connect, Smart Contracts - React Vite.</p>
          </div>

          {/* Card 4 */}
          <a href="/case-studies/smile-center-dentistry" className="group cursor-pointer flex-none w-[85vw] md:w-[45vw] lg:w-[35vw] select-none">
            <div className="aspect-[4/3] overflow-hidden bg-[#1a1d2e] relative isolate mb-4 rounded-xl shadow-lg">
              <ParallaxMedia type="video" src="/videos/smilecenter-screencast.webm" autoPlay muted loop playsInline className="w-full h-full" />
              {/* Metric badge */}
              <div className="absolute top-4 right-4 bg-[#F26522] text-white text-[12px] font-bold px-3 py-1.5 z-10 rounded-full">
                5x Inquiries
              </div>
              <div className="absolute bottom-4 left-4 h-9 bg-gray-900 flex items-center overflow-hidden w-9 group-hover:w-[168px] transition-all duration-300 ease-in-out z-10 px-2.5 rounded-full">
                <div className="flex-shrink-0 w-4 h-4 mr-2 flex items-center justify-center -ml-0.5">
                  <ArrowRight className="w-3.5 h-3.5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out" />
                </div>
                <span className="text-[13px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                  View case study
                </span>
              </div>
            </div>
            <h3 className="text-[16px] sm:text-[18px] font-display font-medium text-gray-900 mt-3">SmileCenter Dental Offices</h3>
            <p className="text-[14px] text-gray-600 mt-1.5 leading-relaxed font-body max-w-[90%]">5x patient inquiries · 2.8x search impressions · Multi-location SEO · React Vite.</p>
          </a>

          {/* Card 5 */}
          <a href="/case-studies/american-livescan" className="group cursor-pointer flex-none w-[85vw] md:w-[45vw] lg:w-[35vw] select-none">
            <div className="aspect-[4/3] overflow-hidden bg-[#1a1d2e] relative isolate mb-4 rounded-xl shadow-lg">
              <img src="/images/livescan-office.webp" alt="American Livescan" className="w-full h-full object-cover" />
              {/* Metric badge */}
              <div className="absolute top-4 right-4 bg-[#F26522] text-white text-[12px] font-bold px-3 py-1.5 z-10 rounded-full">
                3x Bookings
              </div>
              <div className="absolute bottom-4 left-4 h-9 bg-gray-900 flex items-center overflow-hidden w-9 group-hover:w-[168px] transition-all duration-300 ease-in-out z-10 px-2.5 rounded-full">
                <div className="flex-shrink-0 w-4 h-4 mr-2 flex items-center justify-center -ml-0.5">
                  <ArrowRight className="w-3.5 h-3.5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out" />
                </div>
                <span className="text-[13px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100">
                  View case study
                </span>
              </div>
            </div>
            <h3 className="text-[16px] sm:text-[18px] font-display font-medium text-gray-900 mt-3">American Livescan Fingerprinting</h3>
            <p className="text-[14px] text-gray-600 mt-1.5 leading-relaxed font-body max-w-[90%]">3x online bookings & calls · +30% walk-ins · Local SEO & site rebuild.</p>
          </a>

        </div>
      </div>
    </section>
  );
};

export default CaseStudiesPinned;
