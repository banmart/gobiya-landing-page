import React, { useEffect, useRef } from 'react';
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import HeroWebGLBackground from './HeroWebGLBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CapabilitiesIndex.css';

gsap.registerPlugin(ScrollTrigger);

export default function OutcomeTrafficPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const ctx = gsap.context(() => {
      const ease = 'power3.out';
      const heroTl = gsap.timeline({ delay: 0.15, defaults: { ease, duration: 1.15 } });
      heroTl
        .from('[data-hero="1"]', { opacity: 0, y: 14 }, 0)
        .from('.hero h1 .line > span', { yPercent: 110, stagger: 0.1, duration: 1.25 }, 0.08)
        .from('[data-hero="2"]', { opacity: 0, y: 16 }, 0.5)
        .from('[data-hero="3"]', { opacity: 0, y: 26, duration: 1.4 }, 0.3);

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
            <div className="hero-inner" style={{ gridTemplateColumns: '1fr', textAlign: 'center', paddingBottom: '40px' }}>
              <div className="hero-copy" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <nav className="breadcrumb justify-center" aria-label="Breadcrumb" data-hero="1">
                  <a href="/">Gobiya</a><i>/</i>
                  <a href="/outcomes">Outcomes</a><i>/</i>
                  <span>Traffic Growth</span>
                </nav>
                <h1 className="display" style={{ marginTop: '20px' }}>
                  <span className="line"><span>Exponential Traffic,</span></span>
                  <span className="line"><span className="accent">Engineered by AI.</span></span>
                </h1>
                <p className="hero-sub body-l mx-auto" data-hero="2" style={{ marginTop: '30px' }}>
                  Whether you're an enterprise brand looking for millions of impressions, or a local business needing targeted neighborhood clicks, our AI-driven approach guarantees compounding organic traffic that actively converts.
                </p>
              </div>
            </div>
          </section>

          {/* AI INTERACTIVE TOOL PLACEHOLDER */}
          <section className="section" style={{ background: '#0a0a0a', borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937' }}>
            <div className="max-w-5xl mx-auto py-24 px-6" data-anim="up">
              <div className="rounded-2xl p-10 shadow-2xl relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <div className="absolute top-0 right-0 p-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2" style={{ background: 'rgba(209, 248, 81, 0.1)', color: 'var(--color-green)', border: '1px solid rgba(209, 248, 81, 0.2)' }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-green)' }}></span>
                    AI Agent Active
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">Interactive Traffic Forecaster</h3>
                <p className="mb-8 max-w-2xl" style={{ color: '#9ca3af' }}>Use our AI agent to calculate your potential traffic growth over the next 12 months based on your business size.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="rounded-xl p-6 transition-all duration-300 cursor-pointer group hover:scale-[1.02]" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                    <h4 className="font-bold text-xl text-white group-hover:text-[var(--color-green)] transition-colors">Enterprise</h4>
                    <p className="text-sm mt-2" style={{ color: '#6b7280' }}>100k+ monthly visitors. Focus: Global semantic dominance.</p>
                  </div>
                  <div className="rounded-xl p-6 transition-all duration-300 cursor-pointer group scale-[1.02]" style={{ border: '1px solid var(--color-green)', background: 'rgba(209, 248, 81, 0.05)', boxShadow: '0 0 20px rgba(209, 248, 81, 0.05)' }}>
                    <h4 className="font-bold text-xl text-[var(--color-green)]">Medium Business</h4>
                    <p className="text-sm mt-2" style={{ color: '#9ca3af' }}>10k-100k visitors. Focus: Aggressive market capture.</p>
                  </div>
                  <div className="rounded-xl p-6 transition-all duration-300 cursor-pointer group hover:scale-[1.02]" style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                    <h4 className="font-bold text-xl text-white group-hover:text-[var(--color-green)] transition-colors">Small Business</h4>
                    <p className="text-sm mt-2" style={{ color: '#6b7280' }}>&lt;10k visitors. Focus: Hyper-local dominance & lead generation.</p>
                  </div>
                </div>

                <div className="rounded-xl p-8" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-sm font-mono" style={{ color: '#6b7280' }}>Predicted Growth Curve (Month 1-12)</div>
                    <div className="font-bold text-2xl" style={{ color: 'var(--color-green)' }}>+342%</div>
                  </div>
                  <div className="h-40 w-full flex items-end justify-between gap-2">
                    {/* Fake Bar Chart */}
                    {[10,15,25,40,45,60,80,110,140,180,220,280].map((val, i) => (
                      <div key={i} className="rounded-t-sm w-full transition-all duration-1000" style={{ background: 'var(--color-green)', height: `${(val/280)*100}%`, opacity: (i/12)*0.8 + 0.2 }}></div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 text-center">
                   <a href="/book" className="btn btn-primary magnetic" style={{ display: 'inline-flex' }}>
                    Deploy This Strategy For Your Business
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* PAINPOINTS SECTION */}
          <section className="section">
            <div className="max-w-5xl mx-auto py-24 px-6">
              <div className="text-center mb-16" data-anim="up">
                <h2 className="display text-4xl">Stop settling for mediocre traffic.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12" data-anim="up">
                <div>
                  <h3 className="text-2xl font-bold mb-4">The Pain</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-gray-600"><span className="text-red-500">✕</span> You're paying for clicks, but margins are shrinking.</li>
                    <li className="flex gap-3 text-gray-600"><span className="text-red-500">✕</span> Organic traffic has flatlined despite publishing content.</li>
                    <li className="flex gap-3 text-gray-600"><span className="text-red-500">✕</span> Competitors are capturing all the AI search volume.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">The Outcome</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-gray-600"><span className="text-green-500">✓</span> Predictable, compounding organic traffic that runs 24/7.</li>
                    <li className="flex gap-3 text-gray-600"><span className="text-green-500">✓</span> Automated AI content systems that scale out topical relevance.</li>
                    <li className="flex gap-3 text-gray-600"><span className="text-green-500">✓</span> Direct integration with our Native CRM to capture the traffic.</li>
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
