import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';
import { Clock, Menu, X, ArrowRight, Check } from 'lucide-react';

import Header from './Header';
import Footer from './Footer';
import Marquee from './Marquee';
import HorizontalScrollText from './HorizontalScrollText';
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
    const servicesParam = selectedServices.join(',');
    const targetUrl = `/contact?domain=${encodeURIComponent(domain)}&services=${encodeURIComponent(servicesParam)}`;
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
        style={{ willChange: 'transform, filter', transition: 'filter 0.3s ease', zIndex: 9999 }}
      />

      {/* SECTION 1: HERO */}
      <section className="relative w-full min-h-screen pt-24 lg:pt-32 pb-16 bg-[#050505] overflow-hidden flex flex-col justify-center cursor-default">
        {/* Shaders Background */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full [&>div]:w-full [&>div]:h-full [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover opacity-85">
          <Shader>
            <Swirl colorA="#050505" colorB="#0f0f0f" detail={1.7} />
            <ChromaFlow baseColor="#050505" downColor="#f26522" leftColor="#f26522" rightColor="#f26522" upColor="#f26522" momentum={13} radius={3.5} />
            <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
            <FilmGrain strength={0.05} />
          </Shader>
        </div>

        {/* Navigation */}
        <Header theme="dark" />

        {/* Hero Content */}
        <div className="relative z-20 flex-1 max-w-[1440px] w-full mx-auto flex items-center px-5 sm:px-8 lg:px-12 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 w-full items-center">
            
            {/* Left Column: Heading and Subtitle */}
            <div className="flex flex-col justify-center text-left">
              <p className="text-[13px] sm:text-[14px] text-gray-400 tracking-wide mb-5 sm:mb-8 uppercase font-medium">Gobiya AI & SEO Agency</p>
              <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.1] tracking-[-0.03em] text-white font-display mb-6">
                We make sure customers find you everywhere from <span className="text-[#F26522] font-semibold">Google</span> to <span className="text-[#F26522] font-semibold">ChatGPT</span>.
              </h1>
              <p className="text-[16px] sm:text-[18px] text-gray-400 max-w-[700px] leading-relaxed mb-8">
                We engineer AI-driven SEO, topical architectures, and automated B2B sales pipelines to recover lost organic traffic, scale predictable revenue, and secure long-term algorithmic dominance.
              </p>
              
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                <a href="#capabilities" className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 sm:pl-6 pr-2 py-2 transition-colors duration-300">
                  <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                    <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Explore capabilities</span>
                    <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Explore capabilities</span>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column: Interactive Form Card */}
            <div className="relative w-full max-w-[480px] lg:max-w-none mx-auto">
              <div className="liquid-glass p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl shadow-black/80">
                {formState !== 'success' ? (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2 font-display">How can we help you get found?</h3>
                      <p className="text-sm text-gray-400">Select services of interest and request a direct audit.</p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { id: 'geo', label: 'GEO / AI Overview Citation' },
                        { id: 'seo', label: 'Forensic SEO & Traffic Recovery' },
                        { id: 'b2b', label: 'B2B Pipeline & Outbound Automation' },
                        { id: 'dev', label: 'Bespoke React Engineering' }
                      ].map((service) => {
                        const isChecked = selectedServices.includes(service.id);
                        return (
                          <div 
                            key={service.id} 
                            onClick={() => handleServiceToggle(service.id)}
                            className={`flex items-center justify-between p-3.5 rounded-lg border transition-all duration-300 cursor-pointer ${
                              isChecked 
                                ? 'bg-[#F26522]/10 border-[#F26522] text-white' 
                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            <span className="text-[14px] font-medium">{service.label}</span>
                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all duration-300 ${
                              isChecked 
                                ? 'bg-[#F26522] border-[#F26522] text-white' 
                                : 'border-white/30 text-transparent'
                            }`}>
                              <Check className="w-3.5 h-3.5" strokeWidth={3} />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-400">Your Website Domain</label>
                      <input 
                        type="text" 
                        required
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="e.g. yourcompany.com" 
                        className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded-lg p-3.5 text-[14px] outline-none transition-all"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full flex items-center justify-center bg-[#F26522] hover:bg-[#e05a1a] disabled:bg-gray-700 text-white py-3.5 px-6 font-semibold tracking-wide uppercase transition-colors duration-300 cursor-pointer rounded-lg text-sm"
                    >
                      {formState === 'submitting' ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Analyzing Domain...</span>
                        </div>
                      ) : (
                        <span>Request Forensic Audit</span>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-10 space-y-5 animate-fade-rise">
                    <div className="w-16 h-16 bg-[#F26522]/10 border border-[#F26522] rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-[#F26522]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-white mb-2 font-display">Request Received</h3>
                      <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm mx-auto">
                        We are running a forensic baseline of <strong className="text-white">{domain}</strong> against major AI engines and Google core updates. Our team will contact you with the audit package within 24 hours.
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        setFormState('idle');
                        setDomain('');
                        setSelectedServices([]);
                      }}
                      className="text-[#F26522] hover:text-[#e05a1a] transition-colors text-sm font-semibold underline underline-offset-4 font-body"
                    >
                      Audit another website
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
        <div className="logo-marker absolute left-[50%] bottom-[10%] w-10 h-10 pointer-events-none" />
      </section>

      {/* STATS BAR */}
      <div className="flex flex-col md:flex-row w-full bg-[#e05a1a] border-y border-white/10 z-20 relative">
        {[
          { value: '58%', label: 'Zero-Click searches', text: 'intercepted by AI Overviews & featured snippets.' },
          { value: '+2,012%', label: 'AI referral growth', text: 'for our optimized category-defining entity nodes.' },
          { value: '3-6m', label: 'Average recovery timeline', text: 'for search updates during broad evaluation cycles.' },
          { value: '100', label: 'Core Web Vitals', text: 'score guaranteed on our custom React applications.' }
        ].map((stat, idx) => (
          <div key={idx} className={`flex-1 p-8 lg:p-10 ${idx % 2 === 0 ? 'bg-[#F26522]' : 'bg-[#e05a1a]'} text-white`}>
            <div className="text-[clamp(2.2rem,3.5vw,3rem)] font-bold tracking-tighter leading-none mb-2 font-display">
              {stat.value}
            </div>
            <div className="text-[13px] sm:text-[14px] leading-tight font-medium opacity-90 font-body">
              <span className="font-semibold block sm:inline">{stat.label}</span> — <span className="opacity-80 font-normal">{stat.text}</span>
            </div>
          </div>
        ))}
      </div>

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

      {/* SECTION 3.5: CORE CAPABILITIES */}
      <div id="capabilities" className="relative scroll-mt-20">
        <ServicesBento />
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
              <img 
                src="/images/seo_exec.webp" 
                alt="Forensic Audits Platform" 
                className="w-full rounded-xl shadow-2xl shadow-gray-200 object-cover aspect-[4/3]"
              />
              <div className="absolute -top-6 -left-6 bg-[#F26522] text-white p-6 shadow-xl rounded-br-3xl">
                <div className="text-2xl font-bold font-display tracking-tight">Forensic</div>
                <div className="text-sm font-medium opacity-90">Analysis Suite</div>
              </div>
            </div>

            {/* Right Column: Accordion */}
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-[#F26522] mb-4 font-body">Methodology</p>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-medium text-gray-900 mb-12 leading-[1.1] font-display">
                Our approach to search recovery & dominance.
              </h2>
              
              <div className="space-y-2 border-t border-gray-200 font-body">
                {[
                  {
                    title: '01 / Diagnostic Audit',
                    content: 'We audit your domain against search core update rollouts, tracking keyword and click decay metrics to isolate the exact quality, intent, or technical vector that triggered demotion.'
                  },
                  {
                    title: '02 / Entity Mapping',
                    content: 'We model your market as an interconnected semantic graph and map each service to its corresponding entity node, resolving keyword cannibalization at the codebase and URL layer.'
                  },
                  {
                    title: '03 / Trust Restoration',
                    content: 'We build real-world E-E-A-T signals through expert author schemas, credentials, and digital PR campaigns, returning trust back to your root domain.'
                  },
                  {
                    title: '04 / Generative SEO (GEO)',
                    content: 'We restructure content into direct Q&A blocks and structured tables so that generative search engines (ChatGPT, Gemini, Claude, AIOs) easily parse and cite your brand.'
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
      <Footer />

    </div>
  );
};

export default AxionLanding;
