import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';
import { Clock, Menu, X, ArrowRight } from 'lucide-react';

import RotatingText from './RotatingText';
import StaggeredMenu from './StaggeredMenu';
import Marquee from './Marquee';
import HorizontalScrollText from './HorizontalScrollText';
import BlurText from './BlurText';
import GradualBlur from './GradualBlur';
import ParallaxMedia from './ParallaxMedia';
import CustomCursor from './CustomCursor';
import ServicesBento from './ServicesBento';
import CaseStudiesPinned from './CaseStudiesPinned';
import InsightsSlider from './InsightsSlider';
import TestimonialsSlider from './TestimonialsSlider';
import SatisfiedClients from './SatisfiedClients';
import RoiCalculator from './RoiCalculator';

const AxionLanding = () => {
  const [time, setTime] = useState('');

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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: 'America/Los_Angeles', 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white relative font-sans selection:bg-[#F26522] selection:text-white page-wrapper">
      <CustomCursor />

      {/* FLOATING ANIMATED LOGO */}
      <img 
        id="animated-logo"
        src="/images/gobiya---logo.webp" 
        alt="Gobiya Logo" 
        className="h-8 sm:h-9 w-auto object-contain absolute left-[5px] sm:left-[16px] top-[5px] sm:top-[8px] pointer-events-none" 
        style={{ willChange: 'transform, filter', transition: 'filter 0.3s ease', zIndex: 9999 }}
      />

      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen bg-[#EFEFEF] overflow-hidden flex flex-col cursor-default">
        {/* Shaders Background */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full [&>div]:w-full [&>div]:h-full [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover">
          <Shader>
            <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
            <ChromaFlow baseColor="#ffffff" downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={13} radius={3.5} />
            <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
            <FilmGrain strength={0.05} />
          </Shader>
        </div>

        {/* Navigation */}
        <div className="fixed top-0 left-0 z-50 w-full">
          <nav className="flex items-center justify-between bg-white/30 backdrop-blur-md border-b border-white/40 p-[5px] sm:px-4">
            {/* LEFT */}
            <div className="flex items-center gap-6 relative z-50">
              <div className="h-8 sm:h-9 w-[100px] sm:w-[110px]" /> {/* Invisible placeholder */}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4 sm:gap-6 ml-auto">
              <div className="hidden md:flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-900" />
                <span className="text-[13px] text-gray-900 font-medium">{time} in Los Angeles</span>
              </div>
              <a href="/contact" className="hidden sm:flex group items-center bg-gray-900 text-white pl-5 pr-2 py-2">
                <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                  <span className="text-[13px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Book a strategy call</span>
                  <span className="text-[13px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Book a strategy call</span>
                </div>
                <div className="w-6 h-6 bg-white flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                </div>
              </a>
              
              <div className="flex items-center justify-center px-2">
                <StaggeredMenu 
                  isFixed={true}
                  colors={['#111111', '#F26522']}
                  items={[
                    { label: 'Services', link: '/services' },
                    { label: 'Company', isHeader: true },
                    { label: 'About the Agency', link: '/company/about' },
                    { label: 'Success Stories', link: '/company/success-stories' },
                    { label: 'Our Approach', link: '/company/approach' },
                    { label: 'Industry Insights', link: '/insights' },
                    { label: 'Careers', link: '/company/careers' }
                  ]}
                  socialItems={[
                    { label: 'Twitter', link: '#' },
                    { label: 'LinkedIn', link: 'https://www.linkedin.com/in/stevemartingobiya/' }
                  ]}
                  menuButtonColor="#111"
                  openMenuButtonColor="#111"
                  accentColor="#F26522"
                />
              </div>
            </div>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex-1 max-w-[1440px] w-full mx-auto flex flex-col justify-end px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
          <p className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide mb-5 sm:mb-8 uppercase font-medium">Gobiya AI & SEO Agency</p>
          <h1 className="text-[clamp(1.5rem,5.5vw,3.2rem)] sm:text-[clamp(1.8rem,4.5vw,3.8rem)] font-medium leading-[1.15] tracking-[-0.03em] text-gray-900 max-w-[1200px]">
            We engineer AI-driven SEO for brands ready to dominate search and&nbsp;
            <RotatingText
              texts={['recover traffic.', 'drive sales.', 'scale revenue.']}
              mainClassName="inline-flex overflow-hidden text-[#F26522] align-text-bottom"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1 -mb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </h1>
          <p className="mt-6 text-[15px] sm:text-[17px] text-gray-700 max-w-[800px] leading-relaxed">
            Accepting new clients in LA & beyond
          </p>
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <a href="/contact" className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 sm:pl-6 pr-2 py-2 transition-colors duration-300">
              <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Start a project</span>
                <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Start a project</span>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
              </div>
            </a>
            <div className="flex items-center gap-3 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300 px-3 py-2 cursor-pointer">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8704E] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z"/>
              </svg>
              <span className="text-[13px] sm:text-[14px] font-medium text-gray-900">Certified Partner</span>
              <span className="text-[10px] sm:text-[11px] bg-gray-900 text-white px-1.5 sm:px-2 py-0.5 rounded">Featured</span>
            </div>
          </div>
        </div>
        <div className="logo-marker absolute left-[50%] bottom-[15%] w-10 h-10 pointer-events-none" />
      </section>

      {/* SECTION 2: MARQUEE */}
      <div className="relative w-full">
        <Marquee items={['AI-DRIVEN SEO', 'CONTENT CLUSTERS', 'TRAFFIC RECOVERY', 'TECHNICAL SEO', 'ALGORITHMIC DOMINANCE']} />
        <div className="logo-marker absolute right-[15%] top-[50%] w-10 h-10 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* SECTION 3: SCROLL REVEAL INTRO */}
      <section className="w-full relative" data-logo-dark>
        <HorizontalScrollText 
          text="AI-powered SEO and content, delivering fast rankings and recovery. Through cutting-edge AI and data strategies, we help brands recover traffic and skyrocket visibility." 
        />
        <div className="logo-marker absolute left-[10%] top-[50%] w-10 h-10 -translate-y-1/2 pointer-events-none" />
      </section>

      {/* SECTION 4: RECOGNIZED & TRUSTED BY (REMOVED) */}

      {/* SECTION 5: ABOUT */}
      <section className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden w-full max-w-[1440px] mx-auto">
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-black text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">2</div>
          <div className="text-[12px] sm:text-[13px] font-medium text-black border border-black px-3 sm:px-4 py-1 sm:py-1.5">Introducing Gobiya</div>
        </div>
        
        <div className="px-5 sm:px-8 lg:px-12">
          <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-28 max-w-4xl">
            Stop guessing with your SEO. <br className="hidden sm:block" /><span className="sm:hidden"> </span>
            Start dominating with data.
          </h2>

          {/* Responsive Content Area */}
          <div className="block lg:hidden">
            <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900 mb-6">
              Our proprietary methodology combines machine learning insights with elite technical SEO, ensuring your brand captures the most valuable search real estate available.
            </p>
            <a href="/contact" className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 pr-2 py-2 transition-colors duration-300 mb-8 inline-flex">
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

          <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8">
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
              <p className="text-[16px] xl:text-[18px] leading-[1.65] font-medium text-gray-900 mb-8">
                Our proprietary methodology combines machine learning insights with elite technical SEO for maximum ROI.
              </p>
              <a href="/contact" className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-6 pr-2 py-2 transition-colors duration-300">
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
        <InsightsSlider />
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

      {/* SECTION 7.5: SATISFIED CLIENTS */}
      <div className="relative">
        <SatisfiedClients />
        <div className="logo-marker absolute right-[20%] top-[50%] w-10 h-10 pointer-events-none" />
      </div>

      {/* SECTION 8: ROI CALCULATOR */}
      <div data-logo-dark className="relative">
        <RoiCalculator />
        <div className="logo-marker absolute left-[10%] top-[50%] w-10 h-10 pointer-events-none" />
      </div>

      {/* SECTION 9: FOOTER */}
      <footer className="bg-[#111] text-white pt-20 sm:pt-28 px-5 sm:px-8 lg:px-12 w-full overflow-hidden flex flex-col relative" data-logo-dark>
        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-8 mb-10 sm:mb-20 relative z-10">
          
          {/* Col 1 */}
          <div className="flex flex-col pr-0 lg:pr-12 relative">
            <div className="logo-marker h-8 sm:h-9 w-[100px] sm:w-[110px] pointer-events-none mb-3" />
            <h3 className="text-3xl font-semibold tracking-tight mb-4">Gobiya.</h3>
            <p className="text-gray-400 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-sm">
              We leverage cutting-edge AI and advanced data strategies to help brands recover lost traffic, dominate search, and scale revenue globally.
            </p>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-3">Subscribe</h4>
            <div className="flex items-center w-full max-w-sm bg-white/10 p-1">
              <input 
                type="email" 
                placeholder="Enter your E-mail" 
                className="bg-transparent text-[14px] text-white placeholder-gray-500 w-full px-4 py-2 outline-none"
              />
              <button className="bg-white text-black px-4 py-2 text-[13px] font-semibold hover:bg-gray-200 transition-colors">
                Submit
              </button>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-6">Services</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-gray-400">
              <li><a href="/services/geo-optimization" className="hover:text-white transition-colors">AI Content Strategies</a></li>
              <li><a href="/google-penalty-recovery" className="hover:text-white transition-colors">Traffic Recovery</a></li>
              <li><a href="/services/seo" className="hover:text-white transition-colors">Technical SEO</a></li>
              <li><a href="/services/seo" className="hover:text-white transition-colors">Algorithmic Audits</a></li>
              <li><a href="/services/lead-generation" className="hover:text-white transition-colors">Programmatic SEO</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-6">Company</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-gray-400">
              <li><a href="/company/about" className="hover:text-white transition-colors">About the Agency</a></li>
              <li><a href="/company/success-stories" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="/company/approach" className="hover:text-white transition-colors">Our Approach</a></li>
              <li><a href="/insights" className="hover:text-white transition-colors">Industry Insights</a></li>
              <li><a href="/company/careers" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-6">Connect</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1440px] w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10 pt-8 pb-8 relative z-[60]">
          <p className="text-[13px] text-gray-500">© 2026 Gobiya. Engineering search dominance.</p>
          <div className="flex items-center gap-6 text-[13px] text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

        {/* Huge Text */}
        <div className="w-full flex justify-center items-center mt-4 sm:mt-10 overflow-hidden relative">
          <BlurText 
            text="GOBIYA" 
            animateBy="letters" 
            delay={150}
            className="text-[17vw] sm:text-[23vw] leading-[0.75] font-bold tracking-tighter text-white select-none text-center justify-center flex-nowrap whitespace-nowrap" 
          />
        </div>
      </footer>

      {/* Gradual Blur fixed at the bottom of the page */}
      <GradualBlur
        target="page"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
        zIndex={50}
      />
    </div>
  );
};

export default AxionLanding;
