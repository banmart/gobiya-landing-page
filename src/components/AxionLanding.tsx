import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

import DeferredShader, { Swirl, ChromaFlow, FlutedGlass, FilmGrain } from './DeferredShader';
import { Clock, Menu, X, ArrowRight, Check } from 'lucide-react';
import { trackCTA, trackFormSubmit } from '../lib/analytics';

import Header from './Header';
import Footer from './Footer';
import Marquee from './Marquee';
import HorizontalScrollText from './HorizontalScrollText';
import ParallaxMedia from './ParallaxMedia';
import CustomCursor from './CustomCursor';
import StackedBento from './StackedBento';
import CaseStudiesPinned from './CaseStudiesPinned';
import InsightsSlider from './InsightsSlider';
import TestimonialsSlider from './TestimonialsSlider';
import SatisfiedClients from './SatisfiedClients';

const AxionLanding = () => {
  const [time, setTime] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  
  // Interactive Hero Form State
  const [domain, setDomain] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;
    trackFormSubmit({ form_name: 'homepage_hero_audit', services: selectedServices.join(','), has_domain: !!domain });
    const servicesParam = selectedServices.join(',');
    const targetUrl = `/book?domain=${encodeURIComponent(domain)}&services=${encodeURIComponent(servicesParam)}`;
    window.history.pushState({}, '', targetUrl);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    let ctx: gsap.Context;

    function createTimeline() {
      if (ctx) ctx.revert();
      
      ctx = gsap.context(() => {
        const box = document.querySelector("#animated-logo") as HTMLElement;
        if (!box) return;

        const boxStartRect = box.getBoundingClientRect();
        const containers = gsap.utils.toArray(".logo-marker") as HTMLElement[];
        
        if (containers.length === 0) return;

        // Calculate points relative to initial logo position
        const points = containers.map((container) => {
           const r = container.getBoundingClientRect();
           return {
             x: r.left + r.width / 2 - (boxStartRect.left + boxStartRect.width / 2),
             y: r.top + r.height / 2 - (boxStartRect.top + boxStartRect.height / 2)
           };
        });

        // Map each marker to the exact scroll position (in pixels) where it centers in the viewport
        const scrollPositions = containers.map((container, index) => {
          if (index === 0) return 0;
          const r = container.getBoundingClientRect();
          const targetScroll = r.top + r.height / 2 - window.innerHeight / 2;
          return Math.max(0, targetScroll);
        });

        const maxScroll = scrollPositions[scrollPositions.length - 1];

        // Create timeline scrubbed by page scroll from 0 to maxScroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: `+=${maxScroll}`,
            scrub: 1
          }
        });

        // Segment-by-segment absolute-scroll-based movement triggers
        for (let i = 0; i < containers.length - 1; i++) {
          const endPos = points[i+1];
          const startTime = scrollPositions[i];
          const duration = scrollPositions[i+1] - scrollPositions[i];

          tl.to(box, {
            x: endPos.x,
            y: endPos.y,
            duration: duration,
            ease: "power1.inOut" // Smooth deceleration/acceleration between markers
          }, startTime);
        }

        // Scale animation
        const scaleDuration = Math.min(200, maxScroll * 0.15);
        tl.set(box, { scale: 1 }, 0);
        tl.to(box, {
          scale: 2.2,
          duration: scaleDuration,
          ease: "power1.out"
        }, 0);

        tl.to(box, {
          scale: 1,
          duration: scaleDuration,
          ease: "power1.in"
        }, maxScroll - scaleDuration);

        // Per-section inversion triggers
        // Dark sections need filter: brightness(0) invert(1) to make logo white
        const darkSections = gsap.utils.toArray("[data-logo-dark]") as HTMLElement[];
        darkSections.forEach((section) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => gsap.to(box, { filter: "brightness(0) invert(1)", duration: 0.3, overwrite: "auto" }),
            onLeave: () => gsap.to(box, { filter: "brightness(1) invert(0)", duration: 0.3, overwrite: "auto" }),
            onEnterBack: () => gsap.to(box, { filter: "brightness(0) invert(1)", duration: 0.3, overwrite: "auto" }),
            onLeaveBack: () => gsap.to(box, { filter: "brightness(1) invert(0)", duration: 0.3, overwrite: "auto" }),
          });
        });
      });
    }

    setTimeout(createTimeline, 100);
    window.addEventListener("resize", createTimeline);
    return () => {
      window.removeEventListener("resize", createTimeline);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] relative font-sans selection:bg-[#F26522] selection:text-white page-wrapper">
      <CustomCursor />

      {/* FLOATING ANIMATED LOGO */}
      <img 
        id="animated-logo"
        src="/images/gobiya---logo.webp" 
        alt="Gobiya Logo" 
        className="h-8 sm:h-9 w-auto object-contain absolute left-[5px] sm:left-[16px] top-[5px] sm:top-[8px] pointer-events-none" 
        style={{ willChange: 'transform, filter', transition: 'filter 0.3s ease', zIndex: 9999, filter: 'brightness(0) invert(1)' }}
      />

      {/* SECTION 1: HERO */}
      <section data-logo-dark className="relative w-full min-h-screen pt-24 lg:pt-32 pb-16 bg-[#050505] overflow-hidden flex flex-col justify-center cursor-default">
        {/* Shaders Background */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full [&>div]:w-full [&>div]:h-full [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover opacity-85">
          <DeferredShader>
            <Swirl colorA="#050505" colorB="#0f0f0f" detail={1.7} />
            <ChromaFlow baseColor="#050505" downColor="#f26522" leftColor="#f26522" rightColor="#f26522" upColor="#f26522" momentum={13} radius={3.5} />
            <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
            <FilmGrain strength={0.05} />
          </DeferredShader>
        </div>

        {/* Navigation */}
        <Header theme="dark" hideLogo={true} />

        {/* Hero Content */}
        <div className="relative z-20 flex-1 max-w-[1440px] w-full mx-auto flex items-center justify-start px-5 sm:px-8 lg:px-12 py-12 lg:py-16">
          
          {/* Hero Heading and Subtitle */}
          <div className="flex flex-col justify-center items-start text-left w-full">
            <p className="text-[13px] sm:text-[14px] text-[#F26522] tracking-[0.2em] mb-4 sm:mb-6 uppercase font-bold">Gobiya Web Design & Engineering</p>
            <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white font-display mb-6 w-full">
              Fast, custom websites engineered to <span className="text-[#F26522] font-semibold">rank</span> — with native CRM and blockchain built in.
            </h1>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-[1.6] tracking-normal text-gray-400 max-w-[800px] mb-10">
              We replace bloated page-builders with sub-second custom React/Vite builds, integrate lightweight customer pipelines directly into your codebase for 100% data ownership, and implement secure smart contracts natively.
            </p>
            
            <div className="flex flex-wrap justify-start items-center gap-4 sm:gap-5">
              <a 
                href="/book" 
                data-cta-location="homepage_hero_sub"
                data-cta-text="Book a strategy call"
                onClick={() => trackCTA({ cta_location: 'homepage_hero_sub', cta_text: 'Book a strategy call', destination: '/book' })}
                className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-6 sm:pl-8 pr-2 py-3 transition-colors duration-300"
              >
                <div className="flex flex-col overflow-hidden h-[24px] justify-start items-start relative mr-4">
                  <span className="text-[14px] sm:text-[16px] font-medium leading-[24px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Book a strategy call</span>
                  <span className="text-[14px] sm:text-[16px] font-medium leading-[24px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Book a strategy call</span>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                </div>
              </a>
            </div>
            
            {/* Partner Logos */}
            <div className="mt-16 pt-8 border-t border-white/10 w-full">
              <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-6 font-body text-left">Satisfied Clients</p>
              <div className="flex flex-wrap justify-start items-center gap-x-8 gap-y-6 sm:gap-x-12 sm:gap-y-8">
                {[
                  '/images/remodelmepros.webp',
                  '/images/smilecenter.webp',
                  '/images/quickpass-logo.webp',
                  '/images/mytrustwills.webp',
                  '/images/tidder-pro-logo.webp',
                  '/images/totalcapital.webp',
                  '/images/logo-DeEgMiH0.png',
                  '/images/americanlivescan.webp'
                ].map((logo, index) => (
                  <img 
                    key={index} 
                    src={logo} 
                    alt={`Client logo ${index + 1}`} 
                    className="h-6 sm:h-8 w-auto object-contain brightness-0 invert opacity-45 hover:opacity-85 transition-opacity duration-300"
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
        <div className="logo-marker absolute left-[50%] bottom-[10%] w-10 h-10 pointer-events-none" />
      </section>

      {/* STATS BAR */}
      <div className="flex flex-col md:flex-row w-full bg-[#e05a1a] border-y border-white/10 z-20 relative">
        {[
          { value: '5x', label: 'Patient inquiries', text: 'SmileCenter Dentistry — form completions & phone calls.', href: '/case-studies/smile-center-dentistry', client: 'SmileCenter' },
          { value: '3x', label: 'Bookings & calls', text: 'American Livescan — online appointments & inbound calls.', href: '/case-studies/american-livescan', client: 'Livescan' },
          { value: '+30%', label: 'Walk-in traffic', text: 'American Livescan — driven by speed & technical discoverability.', href: '/case-studies/american-livescan', client: 'Livescan' },
          { value: '100', label: 'Core Web Vitals', text: 'score guaranteed on our custom React/Vite builds.' }
        ].map((stat, idx) => (
          <div key={idx} className={`flex-1 p-8 lg:p-10 ${idx % 2 === 0 ? 'bg-[#F26522]' : 'bg-[#e05a1a]'} text-white ${stat.href ? 'group cursor-pointer hover:brightness-110 transition-[filter] duration-300' : ''}`}
            onClick={stat.href ? () => { window.history.pushState({}, '', stat.href); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0,0); } : undefined}
          >
            <div className="text-[clamp(2.2rem,3.5vw,3rem)] font-bold tracking-tighter leading-none mb-2 font-display">
              {stat.value}
            </div>
            <div className="text-[13px] sm:text-[14px] leading-tight font-medium opacity-90 font-body">
              <span className="font-semibold block sm:inline">{stat.label}</span> — <span className="opacity-80 font-normal">{stat.text}</span>
            </div>
            {stat.href && (
              <div className="mt-2 text-[11px] font-semibold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                View case study →
              </div>
            )}
          </div>
        ))}
      </div>

      {/* SECTION 2: MARQUEE */}
      <div data-logo-dark className="relative w-full">
        <Marquee items={['CUSTOM WEB DEV', 'NATIVE CRM', 'BUILT-IN SEO', 'SMART CONTRACTS', 'CORE WEB VITALS', 'REACT & VITE']} />
        <div className="logo-marker absolute right-[15%] top-[50%] w-10 h-10 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* SECTION 3: SCROLL REVEAL INTRO */}
      <section className="w-full relative" data-logo-dark>
        <HorizontalScrollText 
          text="We don't sell SEO. We build fast, modern websites engineered to rank and convert — with native CRM and blockchain built in." 
        />
        <div className="logo-marker absolute left-[10%] top-[50%] w-10 h-10 -translate-y-1/2 pointer-events-none" />
      </section>

      {/* SECTION 3.5: CORE CAPABILITIES */}
      <div id="capabilities" data-logo-dark className="relative scroll-mt-20">
        <StackedBento />
        <div className="logo-marker absolute right-[15%] top-[50%] w-10 h-10 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* SECTION 3.75: FORENSIC METHODOLOGY */}
      <section className="py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-white text-gray-900 relative">
        <div className="logo-marker absolute left-[12%] top-[40%] w-10 h-10 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Image/Badge Mockup */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F26522]/20 to-transparent transform -translate-x-4 translate-y-4 rounded-xl -z-10" />
              <ParallaxMedia 
                type="image"
                src="/images/seo_exec.webp" 
                alt="Forensic Audits Platform" 
                className="w-full rounded-xl shadow-2xl shadow-gray-200 aspect-[4/3]"
              />
              <div className="absolute -top-6 -left-6 bg-[#F26522] text-white p-6 shadow-xl rounded-br-3xl">
                <div className="text-2xl font-bold font-display tracking-tight">Forensic</div>
                <div className="text-sm font-medium opacity-90">Analysis Suite</div>
              </div>
            </div>

            {/* Right Column: Accordion */}
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-[#F26522] mb-4 font-body">Capabilities</p>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-medium text-gray-900 mb-12 leading-[1.1] font-display">
                Core Operational Capabilities
              </h2>
              
              <div className="space-y-2 border-t border-gray-200 font-body">
                {[
                  {
                    title: '01 / Web Development (React & Vite)',
                    content: 'We build high-performance custom websites in React and Vite, engineered from the ground up for sub-second speeds and flawless crawler readability.'
                  },
                  {
                    title: '02 / Native CRM Integration',
                    content: 'Bespoke customer databases and lead pipelines built directly into your application codebase, giving you 100% data ownership.'
                  },
                  {
                    title: '03 / SEO & Discoverability',
                    content: 'Built-in crawler-readiness, semantic graphs, and structuring designed to capture search rankings and AI citations natively.'
                  },
                  {
                    title: '04 / Blockchain & Web3 Dev',
                    content: 'Custom Solidity/Rust smart contracts, dApps, and secure decentralized wallet integrations engineered into your product stack.'
                  }
                ].map((step, idx) => {
                  const isOpen = activeStep === idx;
                  return (
                    <div key={idx} className="border-b border-gray-200">
                      <button 
                        onClick={() => setActiveStep(isOpen ? -1 : idx)}
                        className="w-full py-6 flex items-center justify-between text-left group"
                      >
                        <span className={`text-xl lg:text-2xl font-medium transition-colors ${isOpen ? 'text-[#111111]' : 'text-gray-900 group-hover:text-[#F26522]'}`}>
                          <span className="text-[#F26522] mr-4 inline-block w-4">{isOpen ? '-' : '+'}</span>
                          {step.title}
                        </span>
                      </button>
                      
                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}
                      >
                        <p className="text-lg text-gray-600 leading-relaxed pl-8 border-l-2 border-[#F26522]/20 ml-2">
                          {step.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: ABOUT */}
      <section className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden w-full max-w-[1440px] mx-auto relative">
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-black text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">2</div>
          <div className="text-[12px] sm:text-[13px] font-medium text-black border border-black px-3 sm:px-4 py-1 sm:py-1.5 font-body">Introducing Gobiya</div>
        </div>
        
        <div className="px-5 sm:px-8 lg:px-12">
          <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-28 max-w-4xl">
            Stop guessing with your SEO. <br className="hidden sm:block" /><span className="sm:hidden"> </span>
            Start dominating with data.
          </h2>

          {/* Responsive Content Area */}
          <div className="block lg:hidden font-body">
            <div className="space-y-4 text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900 mb-6">
              <p>
                <strong>Gobiya</strong> is a precision-engineered digital firm and growth agency. Founded in 2012, the agency specializes in advanced search mechanics, performance marketing, and digital infrastructure design.
              </p>
              <p className="text-gray-600 font-normal text-sm sm:text-base">
                Rather than deploying broad, generalist marketing tactics, Gobiya focuses on high-stakes technical environments and data-driven revenue generation. The agency operates primarily out of its headquarters on Wilshire Boulevard, servicing mid-market to enterprise brands that require high-performance technical SEO and scalable digital revenue engines.
              </p>
            </div>
            <a
              href="/book"
              id="homepage-about-cta-mobile"
              data-cta-location="homepage_about_mobile"
              data-cta-text="About our agency"
              onClick={() => trackCTA({ cta_location: 'homepage_about_mobile', cta_text: 'About our agency' })}
              className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 pr-2 py-2 transition-colors duration-300 mb-8 inline-flex"
            >
              <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                <span className="text-[13px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">About our agency</span>
                <span className="text-[13px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">About our agency</span>
              </div>
              <div className="w-7 h-7 bg-white flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
              </div>
            </a>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full">
              <ParallaxMedia 
                type="video" 
                src="/videos/space-girl.webm" 
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                className="w-full sm:w-[45%] aspect-[438/346]" 
              />
              <ParallaxMedia 
                type="video" 
                src="/videos/gobiyaRace.webm" 
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                className="w-full sm:w-[55%] aspect-[900/600]" 
              />
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8 font-body">
            <div className="self-end">
              <ParallaxMedia 
                type="video" 
                src="/videos/space-girl.webm" 
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                className="w-full aspect-[438/346]" 
              />
            </div>
            <div className="self-start flex flex-col items-start justify-start pt-2">
              <div className="space-y-4 text-[16px] xl:text-[18px] leading-[1.65] font-medium text-gray-900 mb-8">
                <p>
                  <strong>Gobiya</strong> is a precision-engineered digital firm and growth agency. Founded in 2012, the agency specializes in advanced search mechanics, performance marketing, and digital infrastructure design.
                </p>
                <p className="text-gray-600 font-normal text-sm xl:text-base">
                  Rather than deploying broad, generalist marketing tactics, Gobiya focuses on high-stakes technical environments and data-driven revenue generation. The agency operates primarily out of its headquarters on Wilshire Boulevard, servicing mid-market to enterprise brands that require high-performance technical SEO and scalable digital revenue engines.
                </p>
              </div>
              <a
                href="/book"
                id="homepage-about-cta-desktop"
                data-cta-location="homepage_about_desktop"
                data-cta-text="About our agency"
                onClick={() => trackCTA({ cta_location: 'homepage_about_desktop', cta_text: 'About our agency' })}
                className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-6 pr-2 py-2 transition-colors duration-300"
              >
                <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                  <span className="text-[14px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">About our agency</span>
                  <span className="text-[14px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">About our agency</span>
                </div>
                <div className="w-8 h-8 bg-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                </div>
              </a>
            </div>
            <div className="self-end">
              <ParallaxMedia 
                type="video" 
                src="/videos/gobiyaRace.webm" 
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                className="w-full aspect-[3/2]" 
              />
            </div>
          </div>
        </div>
        <div className="logo-marker absolute right-[20%] top-[50%] w-10 h-10 pointer-events-none" />
      </section>

      {/* SECTION 6.5: LATEST INSIGHTS */}
      <div data-logo-dark className="relative">
        <InsightsSlider limit={5} />
        <div className="logo-marker absolute right-[15%] top-[50%] w-10 h-10 pointer-events-none" />
      </div>

      {/* SECTION 7: CASE STUDIES PINNED */}
      <div className="relative">
        <CaseStudiesPinned />
        <div className="logo-marker absolute left-[12%] top-[40%] w-10 h-10 pointer-events-none" />
      </div>

      {/* SECTION 7.25: TESTIMONIALS */}
      <div data-logo-dark className="relative">
        <TestimonialsSlider />
        <div className="logo-marker absolute right-[12%] top-[50%] w-10 h-10 pointer-events-none" />
      </div>



      {/* SECTION 8: CONTACT AUDIT FORM */}
      <section data-logo-dark className="relative py-24 sm:py-32 bg-[#050505] flex justify-center px-5 sm:px-8 lg:px-12 border-t border-white/10 z-20 overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F26522] rounded-full mix-blend-screen opacity-[0.03] blur-[100px]"></div>
        </div>

        <div className="relative w-full max-w-[600px] mx-auto z-20">
          <div className="liquid-glass p-8 sm:p-12 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F26522] to-transparent opacity-50"></div>
            
            {formState !== 'success' ? (
              <form onSubmit={handleFormSubmit} className="space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-[clamp(1.8rem,3vw,2.5rem)] font-medium text-white mb-3 font-display leading-tight">How can we help you get found?</h3>
                  <p className="text-base text-gray-400">Select services of interest and request a direct technical audit.</p>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'dev', label: 'Web Development (React & Vite)' },
                    { id: 'crm', label: 'Native CRM & Lead Pipelines' },
                    { id: 'seo', label: 'SEO & Discoverability' },
                    { id: 'web3', label: 'Blockchain & Web3 Dev' }
                  ].map((service) => {
                    const isChecked = selectedServices.includes(service.id);
                    return (
                      <div 
                        key={service.id} 
                        onClick={() => handleServiceToggle(service.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                          isChecked 
                            ? 'bg-[#F26522]/10 border-[#F26522] text-white shadow-[0_0_20px_rgba(242,101,34,0.15)]' 
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="text-[15px] font-medium">{service.label}</span>
                        <div className={`w-6 h-6 rounded flex items-center justify-center border transition-all duration-300 ${
                          isChecked 
                            ? 'bg-[#F26522] border-[#F26522] text-white' 
                            : 'border-white/30 text-transparent'
                        }`}>
                          <Check className="w-4 h-4" strokeWidth={3} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-3">
                  <label className="block text-[13px] uppercase tracking-widest font-semibold text-gray-400">Your Website Domain</label>
                  <input 
                    type="text" 
                    required
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="e.g. yourcompany.com" 
                    className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded-xl p-4 text-[16px] outline-none transition-all placeholder:text-gray-600 focus:shadow-[0_0_30px_rgba(242,101,34,0.1)]"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full flex items-center justify-center bg-[#F26522] hover:bg-[#e05a1a] disabled:bg-gray-700 text-white py-4 px-6 font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer rounded-xl text-[15px] hover:shadow-[0_0_40px_rgba(242,101,34,0.3)]"
                >
                  {formState === 'submitting' ? (
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Analyzing Domain...</span>
                    </div>
                  ) : (
                    <span>Request Build Audit</span>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-6 animate-fade-rise">
                <div className="w-20 h-20 bg-[#F26522]/10 border border-[#F26522] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-10 h-10 text-[#F26522]" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-3xl font-medium text-white mb-3 font-display">Request Received</h3>
                  <p className="text-gray-400 text-[16px] leading-relaxed max-w-sm mx-auto">
                    We are running a baseline performance audit of <strong className="text-white">{domain}</strong>. Our team will contact you with custom build recommendations within 24 hours.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setFormState('idle');
                    setDomain('');
                    setSelectedServices([]);
                  }}
                  className="text-[#F26522] hover:text-[#e05a1a] transition-colors text-[15px] font-semibold underline underline-offset-4 font-body mt-4 inline-block"
                >
                  Audit another website
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="logo-marker absolute left-[10%] top-[50%] w-10 h-10 pointer-events-none" />
      </section>

      {/* SECTION 8.5: FAQ */}
      <section data-logo-dark className="py-24 sm:py-32 px-5 sm:px-8 lg:px-12 bg-[#050505] text-white border-t border-white/10 relative z-20">
        <div className="logo-marker absolute right-[15%] top-[50%] w-10 h-10 pointer-events-none" />
        <div className="max-w-[1440px] mx-auto">
          <p className="text-sm font-bold tracking-widest uppercase text-[#F26522] mb-4 font-body">[ FAQ ]</p>
          <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-medium text-white mb-12 leading-[1.12] font-display max-w-2xl">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 font-body text-gray-400">
            {[
              {
                q: "How does Generative Engine Optimization (GEO) work?",
                a: "GEO structures your brand's digital footprints—including custom schema graphs, entity connections, and structured tables—so conversational LLMs (such as ChatGPT, Claude, Perplexity, and Gemini) can confidently parse, recommend, and cite your business as a trusted authority."
              },
              {
                q: "How long does it take to recover from a Google Core Update penalty?",
                a: "Reversing algorithmic suppressions typically takes 12 to 24 weeks. The recovery process involves a forensic update audit, consolidation or pruning of thin URLs, and building clear E-E-A-T credentials that Google's quality classifiers recognize during core update cycles."
              },
              {
                q: "Why do traditional SEO metrics fail B2B companies?",
                a: "Traditional SEO tracks traffic volume and generic rankings. B2B programs require targeting low-volume, high-intent keyword clusters (like alternatives, comparison pages, and integration tables) that speak to multi-stakeholder buying committees, attributing traffic directly to CRM pipeline value."
              },
              {
                q: "What is the difference between manual actions and algorithmic suppressions?",
                a: "A manual action is issued by a Google reviewer and explicitly listed in Search Console's manual actions panel; it is cleared by submitting a reconsideration request. An algorithmic suppression is automated, has no notification, and only recovers when the underlying quality classifiers are satisfied during a core rollout."
              }
            ].map((item, idx) => (
              <div key={idx} className="border-t border-white/10 pt-6">
                <h3 className="text-lg font-medium text-white mb-3 flex items-start gap-2">
                  <span className="text-[#F26522] font-mono">Q:</span>
                  {item.q}
                </h3>
                <p className="leading-relaxed pl-6 text-gray-400">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: FOOTER */}
      <Footer />

    </div>
  );
};

export default AxionLanding;
