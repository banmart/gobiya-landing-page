import React, { useEffect, useRef } from 'react';
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import HeroWebGLBackground from './HeroWebGLBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CapabilitiesIndex.css';

gsap.registerPlugin(ScrollTrigger);

export default function OutcomeRankingsPage() {
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
                  <span>Search Rankings</span>
                </nav>
                <h1 className="display" style={{ marginTop: '20px' }}>
                  <span className="line"><span>Total Authority.</span></span>
                  <span className="line"><span className="accent">Total Dominance.</span></span>
                </h1>
                <p className="hero-sub body-l mx-auto" data-hero="2" style={{ marginTop: '30px' }}>
                  The old SEO model is dead. To rank today, you need AI-driven entity alignment, flawless technical architecture, and undeniable topical authority. We build it all directly into your platform.
                </p>
              </div>
            </div>
          </section>

          {/* AI INTERACTIVE TOOL PLACEHOLDER */}
          <section className="section bg-gray-50">
            <div className="section-inner max-w-5xl mx-auto" data-anim="up">
              <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-gray-900">Entity & Authority Simulator</h3>
                    <p className="text-gray-500">How our AI agents structure your semantic web footprint.</p>
                  </div>
                  <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full border border-purple-200">
                    Proprietary Tech
                  </span>
                </div>
                
                <div className="relative rounded-xl overflow-hidden bg-gray-900 p-8 flex items-center justify-center min-h-[300px]">
                  {/* Decorative Node Network */}
                  <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at center, #5227FF 0%, transparent 60%)' }}></div>
                  <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(82,39,255,0.8)]">
                      <span className="font-bold text-gray-900 text-xl">Your Brand</span>
                    </div>
                    <div className="flex gap-12 w-full justify-center">
                      <div className="flex flex-col items-center gap-2">
                         <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-white text-xs">Knowledge</div>
                         <div className="h-16 w-[1px] bg-gray-700"></div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                         <div className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center text-white text-xs">Citations</div>
                         <div className="h-16 w-[1px] bg-gray-700"></div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                         <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs shadow-[0_0_20px_rgba(37,99,235,0.8)]">Google AI</div>
                         <div className="h-16 w-[1px] bg-blue-500"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-2">For Enterprise</h4>
                    <p className="text-gray-600 text-sm">Programmatic SEO at scale, deploying millions of optimized pages tightly woven into your data architecture.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">For Small/Medium Business</h4>
                    <p className="text-gray-600 text-sm">Hyper-local dominance through flawless Google Business Profile orchestration and zero-click search strategies.</p>
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
