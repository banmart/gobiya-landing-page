import React, { useEffect, useRef } from 'react';
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import HeroWebGLBackground from './HeroWebGLBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CapabilitiesIndex.css';

gsap.registerPlugin(ScrollTrigger);

export default function OutcomesIndex() {
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
        .from('[data-hero="3"] .btn', { opacity: 0, y: 14, stagger: 0.08 }, 0.65)
        .from('[data-hero="4"] > div', { opacity: 0, y: 12, stagger: 0.08 }, 0.8)
        .from('[data-hero="5"]', { opacity: 0, y: 26, duration: 1.4 }, 0.3);

      gsap.utils.toArray('[data-anim="up"]').forEach(el => {
        gsap.fromTo(el as Element, 
          { y: 30, opacity: 0 },
          { scrollTrigger: { trigger: el as Element, start: 'top 87%' }, y: 0, opacity: 1, duration: 1.2, ease }
        );
      });
      
      gsap.utils.toArray('[data-anim="stagger"]').forEach((parent: any) => {
        const children = parent.querySelectorAll('[data-anim-child]');
        gsap.fromTo(children,
          { y: 24, opacity: 0 },
          { scrollTrigger: { trigger: parent, start: 'top 87%' }, y: 0, opacity: 1, duration: 1, ease, stagger: 0.12 }
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
            <div className="hero-inner">
              <div className="hero-copy">
                <nav className="breadcrumb" aria-label="Breadcrumb" data-hero="1">
                  <a href="/">Gobiya</a><i>/</i>
                  <span>Outcomes</span>
                </nav>
                <h1 className="display">
                  <span className="line"><span>We don't sell services.</span></span>
                  <span className="line"><span>We engineer</span></span>
                  <span className="line"><span className="accent">Guaranteed Outcomes.</span></span>
                </h1>
                <p className="hero-sub body-l" data-hero="2">
                  Whether you are an enterprise scaling globally, a medium business breaking plateaus, or a local small business needing rapid growth, our AI agents and built-in pipelines are designed for one thing: your traffic, rankings, and sales.
                </p>
                <div className="hero-actions" data-hero="3">
                  <a href="/book" className="btn btn-primary magnetic">
                    Get an Outcome Audit
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  <a href="#outcomes" className="btn btn-ghost magnetic">View Outcome Vectors</a>
                </div>
              </div>
              <div className="hero-exhibit">
                <figure className="sysmap" data-hero="5">
                  <div className="sysmap-head">
                    <span>EXH-001 / AI-Driven Outcome Engine</span>
                  </div>
                  <div className="sysmap-body" style={{ padding: '40px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827' }}>The Gobiya AI Agent Protocol</h3>
                      <p style={{ color: '#6b7280', marginTop: '10px' }}>Analyzing your data in real-time to adjust strategy continuously.</p>
                    </div>
                    {/* Placeholder for AI tool visualization */}
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#5227FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>AI</div>
                      <div style={{ height: '2px', width: '40px', background: '#ccc' }}></div>
                      <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>ROI</div>
                    </div>
                  </div>
                </figure>
              </div>
            </div>
          </section>

          {/* OUTCOMES INDEX */}
          <section className="section" id="outcomes">
            <div className="section-inner">
              <aside className="section-rail">
                <div className="rail-sticky" data-anim="stagger">
                  <div className="eyebrow" data-anim-child>The Vectors</div>
                  <p className="rail-note" data-anim-child>
                    Choose the exact business metric you need to scale. We deploy the AI systems and infrastructure to guarantee it.
                  </p>
                </div>
              </aside>

              <div className="section-main">
                <div className="mods-head">
                  <h2 className="section-title display" data-anim="up">
                    Scale exactly <span className="accent">what matters.</span>
                  </h2>
                </div>

                <div className="mod-list" data-anim="stagger">
                  <a href="/outcomes/traffic" className="mod" data-anim-child>
                    <div className="mod-id">
                      <span className="mono-tag">Vector</span>
                      <span className="num">01</span>
                      <span className="mono-tag" style={{color: 'var(--green)'}}>TRAFFIC.SYS</span>
                    </div>
                    <div className="mod-info">
                      <h3>Traffic Growth</h3>
                      <p>Stop paying for hollow clicks. We use Generative Engine Optimization and AI content strategies to bring qualified buyers directly to your landing pages.</p>
                    </div>
                    <span className="mod-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </a>

                  <a href="/outcomes/rankings" className="mod" data-anim-child>
                    <div className="mod-id">
                      <span className="mono-tag">Vector</span>
                      <span className="num">02</span>
                      <span className="mono-tag" style={{color: 'var(--green)'}}>DOMINANCE.SYS</span>
                    </div>
                    <div className="mod-info">
                      <h3>Search Rankings</h3>
                      <p>Take over the top spots on Google and AI search engines like Perplexity. We build topical authority and semantic relevance that competitors can't touch.</p>
                    </div>
                    <span className="mod-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </a>

                  <a href="/outcomes/sales" className="mod" data-anim-child>
                    <div className="mod-id">
                      <span className="mono-tag">Vector</span>
                      <span className="num">03</span>
                      <span className="mono-tag" style={{color: 'var(--green)'}}>REVENUE.SYS</span>
                    </div>
                    <div className="mod-info">
                      <h3>Sales & Pipeline</h3>
                      <p>Traffic is useless without conversion. Our native CRM integrations and AI prospect scrapers turn every visitor into an active, nurtured lead in your pipeline.</p>
                    </div>
                    <span className="mod-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </a>
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
