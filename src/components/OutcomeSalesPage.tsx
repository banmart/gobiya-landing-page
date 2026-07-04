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
    <div id="page" ref={containerRef} className="bg-white text-gray-900 antialiased font-sans min-h-screen flex flex-col">
      <SiteHeader />
      <div id="content" className="site-content flex-grow">
        <main id="primary" className="site-main">
          {/* HERO */}
          <section className="hero" id="top">
            <HeroWebGLBackground />
            <div className="hero-grid" aria-hidden="true"></div>
            <div className="max-w-5xl mx-auto py-24 px-6" style={{ textAlign: 'center', paddingBottom: '40px' }}>
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
          <section className="section" style={{ background: '#0a0a0a', borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937' }}>
            <div className="max-w-5xl mx-auto py-24 px-6" data-anim="up">
              <div className="rounded-2xl p-10 shadow-2xl relative" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-4 text-white">AI Prospect Automation</h3>
                    <p className="mb-6" style={{ color: '#9ca3af' }}>Our proprietary Outbound AI Agent scans localized directories, B2B databases, and social platforms to extract high-value leads and automatically inject them into your Native CRM.</p>
                    
                    <ul className="space-y-4 mb-8">
                      <li className="flex gap-3 text-white font-medium">
                        <span className="font-bold" style={{ color: 'var(--color-green)' }}>1.</span> AI identifies target persona (e.g. "Enterprise SaaS CMOs")
                      </li>
                      <li className="flex gap-3 text-white font-medium">
                        <span className="font-bold" style={{ color: 'var(--color-green)' }}>2.</span> Agent verifies contact data and intent signals
                      </li>
                      <li className="flex gap-3 text-white font-medium">
                        <span className="font-bold" style={{ color: 'var(--color-green)' }}>3.</span> Automated, personalized drip campaign initiates
                      </li>
                    </ul>

                    <a href="/book" className="btn btn-primary magnetic" style={{ display: 'inline-flex' }}>
                      Automate Your Pipeline
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </div>

                  <div className="rounded-xl p-6 shadow-2xl transform md:rotate-2" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-2 text-xs font-mono" style={{ color: '#6b7280' }}>pipeline.sys terminal</span>
                    </div>
                    <div className="font-mono text-sm space-y-2 opacity-80">
                      <p style={{ color: 'var(--color-green)' }}>&gt; Initializing target parameters...</p>
                      <p className="text-white">&gt; Scanning sector: Healthcare B2B</p>
                      <p style={{ color: 'var(--color-green)' }}>&gt; Found 412 verified prospects</p>
                      <p className="text-white">&gt; Enriching data with social intent...</p>
                      <p style={{ color: 'var(--color-green)' }}>&gt; Injecting to CRM and triggering sequence [A]</p>
                      <p className="animate-pulse text-white">&gt; _</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
          {/* PAINPOINTS SECTION */}
          <section className="section">
            <div className="max-w-5xl mx-auto py-24 px-6">
              <div className="text-center mb-16" data-anim="up">
                <h2 className="display text-4xl">Stop settling for mediocre conversions.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12" data-anim="up">
                <div>
                  <h3 className="text-2xl font-bold mb-4">The Pain</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-gray-600"><span className="text-red-500">✕</span> You're driving traffic, but leads are flat.</li>
                    <li className="flex gap-3 text-gray-600"><span className="text-red-500">✕</span> Your pipeline is empty despite marketing spend.</li>
                    <li className="flex gap-3 text-gray-600"><span className="text-red-500">✕</span> Sales team is wasting time on unqualified prospects.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">The Outcome</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-gray-600"><span className="text-green-500">✓</span> High-converting landing pages built for B2B buyers.</li>
                    <li className="flex gap-3 text-gray-600"><span className="text-green-500">✓</span> Automated AI prospect scraping and enrichment.</li>
                    <li className="flex gap-3 text-gray-600"><span className="text-green-500">✓</span> Seamless integration with your Native CRM.</li>
                  </ul>
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
