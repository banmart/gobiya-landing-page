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
          <section className="section bg-gray-50">
            <div className="section-inner max-w-5xl mx-auto" data-anim="up">
              <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    AI Agent Active
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-900">Interactive Traffic Forecaster</h3>
                <p className="text-gray-500 mb-8 max-w-2xl">Use our AI agent to calculate your potential traffic growth over the next 12 months based on your business size.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors cursor-pointer group">
                    <h4 className="font-bold text-xl group-hover:text-blue-600">Enterprise</h4>
                    <p className="text-sm text-gray-500 mt-2">100k+ monthly visitors. Focus: Global semantic dominance.</p>
                  </div>
                  <div className="border border-blue-500 bg-blue-50/50 rounded-xl p-6 cursor-pointer group">
                    <h4 className="font-bold text-xl text-blue-600">Medium Business</h4>
                    <p className="text-sm text-gray-500 mt-2">10k-100k visitors. Focus: Aggressive market capture.</p>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-500 transition-colors cursor-pointer group">
                    <h4 className="font-bold text-xl group-hover:text-blue-600">Small Business</h4>
                    <p className="text-sm text-gray-500 mt-2">&lt;10k visitors. Focus: Hyper-local dominance & lead generation.</p>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-8 text-white">
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-gray-400 font-mono">Predicted Growth Curve (Month 1-12)</div>
                    <div className="text-green-400 font-bold text-2xl">+342%</div>
                  </div>
                  <div className="h-40 w-full flex items-end justify-between gap-2">
                    {/* Fake Bar Chart */}
                    {[10,15,25,40,45,60,80,110,140,180,220,280].map((val, i) => (
                      <div key={i} className="bg-blue-500 rounded-t-sm w-full transition-all duration-1000" style={{ height: `${(val/280)*100}%`, opacity: (i/12)*0.8 + 0.2 }}></div>
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
            <div className="section-inner" style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
