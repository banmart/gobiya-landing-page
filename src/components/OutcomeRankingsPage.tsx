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
    <div id="page" ref={containerRef} className="bg-white text-gray-900 antialiased font-sans min-h-screen flex flex-col">
      <SiteHeader />
      <div id="content" className="site-content flex-grow">
        <main id="primary" className="site-main">
          {/* HERO */}
          <section className="hero" id="top">
            <HeroWebGLBackground />
            <div className="hero-grid" aria-hidden="true"></div>
            <div className="max-w-5xl mx-auto py-24 px-6">
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
          <section className="section" style={{ background: '#0a0a0a', borderTop: '1px solid #1f2937', borderBottom: '1px solid #1f2937' }}>
            <div className="max-w-5xl mx-auto py-24 px-6" data-anim="up">
              <div className="rounded-2xl p-10 shadow-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-white">Entity & Authority Simulator</h3>
                    <p style={{ color: '#9ca3af' }}>How our AI agents structure your semantic web footprint.</p>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(209, 248, 81, 0.1)', color: 'var(--color-green)', border: '1px solid rgba(209, 248, 81, 0.2)' }}>
                    Proprietary Tech
                  </span>
                </div>
                
                <div className="relative rounded-xl overflow-hidden p-8 flex items-center justify-center min-h-[300px]" style={{ background: '#000', border: '1px solid rgba(255,255,255,0.05)' }}>
                  {/* Decorative Node Network */}
                  <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at center, var(--color-green) 0%, transparent 60%)' }}></div>
                  <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center" style={{ boxShadow: '0 0 30px rgba(209,248,81,0.5)' }}>
                      <span className="font-bold text-gray-900 text-xl">Your Brand</span>
                    </div>
                    <div className="flex gap-12 w-full justify-center">
                      <div className="flex flex-col items-center gap-2">
                         <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs" style={{ background: '#111827', border: '1px solid #374151' }}>Knowledge</div>
                         <div className="h-16 w-[1px]" style={{ background: '#374151' }}></div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                         <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs" style={{ background: '#111827', border: '1px solid #374151' }}>Citations</div>
                         <div className="h-16 w-[1px]" style={{ background: '#374151' }}></div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                         <div className="w-12 h-12 rounded-full flex items-center justify-center text-gray-900 font-bold text-xs" style={{ background: 'var(--color-green)', boxShadow: '0 0 20px rgba(209,248,81,0.4)' }}>Google AI</div>
                         <div className="h-16 w-[1px]" style={{ background: 'var(--color-green)' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-white">For Enterprise</h4>
                    <p className="text-sm" style={{ color: '#9ca3af' }}>Programmatic SEO at scale, deploying millions of optimized pages tightly woven into your data architecture.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-white">For Small/Medium Business</h4>
                    <p className="text-sm" style={{ color: '#9ca3af' }}>Hyper-local dominance through flawless Google Business Profile orchestration and zero-click search strategies.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* PAINPOINTS SECTION */}
          <section className="section">
            <div className="max-w-5xl mx-auto py-24 px-6">
              <div className="text-center mb-16" data-anim="up">
                <h2 className="display text-4xl">Stop settling for mediocre rankings.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12" data-anim="up">
                <div>
                  <h3 className="text-2xl font-bold mb-4">The Pain</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-gray-600"><span className="text-red-500">✕</span> You're creating content, but it's not ranking.</li>
                    <li className="flex gap-3 text-gray-600"><span className="text-red-500">✕</span> Competitors with lower quality content outrank you.</li>
                    <li className="flex gap-3 text-gray-600"><span className="text-red-500">✕</span> You're invisible for high-intent commercial keywords.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">The Outcome</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-gray-600"><span className="text-green-500">✓</span> Total topical authority and semantic relevance.</li>
                    <li className="flex gap-3 text-gray-600"><span className="text-green-500">✓</span> Dominance for high-converting commercial search terms.</li>
                    <li className="flex gap-3 text-gray-600"><span className="text-green-500">✓</span> Advanced entity schema and technical architecture.</li>
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
