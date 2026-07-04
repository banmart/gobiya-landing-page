import React, { useEffect, useRef } from 'react';
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import HeroWebGLBackground from './HeroWebGLBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CapabilitiesIndex.css';

gsap.registerPlugin(ScrollTrigger);

export default function OutcomeSalesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const ctx = gsap.context(() => {
      const ease = 'power3.out';
      const heroTl = gsap.timeline({ delay: 0.15, defaults: { ease, duration: 1.15 } });
      heroTl
        .from('[data-hero="1"]', { opacity: 0, y: 14 }, 0)
        .from('.hero h1 .line > span', { yPercent: 110, stagger: 0.1, duration: 1.25 }, 0.08)
        .from('[data-hero="2"]', { opacity: 0, y: 16 }, 0.5);

      gsap.utils.toArray('[data-anim="up"]').forEach(el => {
        gsap.fromTo(el as Element, 
          { y: 30, opacity: 0 },
          { scrollTrigger: { trigger: el as Element, start: 'top 87%' }, y: 0, opacity: 1, duration: 1.2, ease }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="page" ref={containerRef} className="bg-white min-h-screen font-sans flex flex-col">
      <SiteHeader />
      <div id="content" className="site-content flex-grow">
        <main id="primary" className="site-main">
          {/* HERO */}
          <section className="hero" id="top">
            <HeroWebGLBackground />
            <div className="hero-grid" aria-hidden="true"></div>
            <div className="hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', paddingBottom: '40px' }}>
              <div className="hero-copy" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <nav className="breadcrumb justify-center" aria-label="Breadcrumb" data-hero="1">
                  <a href="/">Gobiya</a><i>/</i>
                  <a href="/outcomes">Outcomes</a><i>/</i>
                  <span>Sales & Pipeline</span>
                </nav>
                <h1 className="display" style={{ marginTop: '20px' }}>
                  <span className="line"><span>Turn Traffic into</span></span>
                  <span className="line"><span className="accent">Closed Deals.</span></span>
                </h1>
                <p className="hero-sub body-l mx-auto" data-hero="2" style={{ marginTop: '30px' }}>
                  Traffic without conversion is vanity. We deploy Native CRM systems and AI Prospect Scrapers to guarantee your sales pipeline stays full, whether you're a lean startup or a global enterprise.
                </p>
              </div>
            </div>
          </section>

          {/* AI INTERACTIVE TOOL PLACEHOLDER */}
          <section className="section bg-gray-50">
            <div className="section-inner max-w-5xl mx-auto" data-anim="up">
              <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100 relative">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">AI Prospect Automation</h3>
                    <p className="text-gray-600 mb-6">Our proprietary Outbound AI Agent scans localized directories, B2B databases, and social platforms to extract high-value leads and automatically inject them into your Native CRM.</p>
                    
                    <ul className="space-y-4 mb-8">
                      <li className="flex gap-3 text-gray-800 font-medium">
                        <span className="text-blue-500 font-bold">1.</span> AI identifies target persona (e.g. "Enterprise SaaS CMOs")
                      </li>
                      <li className="flex gap-3 text-gray-800 font-medium">
                        <span className="text-blue-500 font-bold">2.</span> Agent verifies contact data and intent signals
                      </li>
                      <li className="flex gap-3 text-gray-800 font-medium">
                        <span className="text-blue-500 font-bold">3.</span> Automated, personalized drip campaign initiates
                      </li>
                    </ul>

                    <a href="/book" className="btn btn-primary magnetic" style={{ display: 'inline-flex' }}>
                      Automate Your Pipeline
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-6 text-white shadow-2xl transform md:rotate-2">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-800">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-2 text-xs text-gray-400 font-mono">pipeline.sys terminal</span>
                    </div>
                    <div className="font-mono text-sm space-y-2 opacity-80">
                      <p className="text-green-400">&gt; Initializing target parameters...</p>
                      <p>&gt; Scanning sector: Healthcare B2B</p>
                      <p className="text-blue-400">&gt; Found 412 verified prospects</p>
                      <p>&gt; Enriching data with social intent...</p>
                      <p className="text-green-400">&gt; Injecting to CRM and triggering sequence [A]</p>
                      <p className="animate-pulse">&gt; _</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
