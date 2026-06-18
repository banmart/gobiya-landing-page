import React, { useEffect, useRef, useState } from 'react';
import HeroWebGLBackground from './HeroWebGLBackground';
import './InsightsPage.css';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { ARTICLE_META } from '../lib/articlesMeta';

interface InsightsPageProps {
  currentPath?: string;
}

const InsightsPage: React.FC<InsightsPageProps> = ({ currentPath }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [noteText, setNoteText] = useState('// update-driven cadence · unsubscribe anytime');

  const getPageFromPath = (pathStr?: string) => {
    if (!pathStr) return 1;
    try {
      const search = pathStr.split('?')[1];
      if (search) {
        const params = new URLSearchParams(search);
        const p = parseInt(params.get('page') || '1', 10);
        return isNaN(p) ? 1 : p;
      }
    } catch (e) {
      console.error(e);
    }
    return 1;
  };

  const initialPage = getPageFromPath(currentPath || (typeof window !== 'undefined' ? window.location.pathname + window.location.search : ''));
  const [currentPage, setCurrentPage] = useState(initialPage);
  const PAGE_SIZE = 5;
  
  const articlesList = ARTICLE_META.map(data => ({ ...data }));
  const totalPages = Math.ceil(articlesList.length / PAGE_SIZE);
  const currentArticles = articlesList.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    const p = getPageFromPath(currentPath || (typeof window !== 'undefined' ? window.location.pathname + window.location.search : ''));
    setCurrentPage(p);
  }, [currentPath]);

  useEffect(() => {
    if (currentPage > 1) {
      document.querySelector('.section-title')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Initial load fade in
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });

    const ctx = gsap.context(() => {
      const ease = 'power3.out';

      const heroTl = gsap.timeline({ delay: 0.15, defaults: { ease, duration: 1.15 } });
      heroTl
        .from('[data-hero="1"]', { opacity: 0, y: 14 }, 0)
        .from('.hero h1 .line > span', { yPercent: 110, stagger: 0.1, duration: 1.25 }, 0.08)
        .from('[data-hero="2"]', { opacity: 0, y: 16 }, 0.5)
        .from('[data-hero="3"] .btn', { opacity: 0, y: 14, stagger: 0.08 }, 0.65)
        .from('[data-hero="4"] > div', { opacity: 0, y: 12, stagger: 0.08 }, 0.8)
        .from('[data-hero="5"]', { opacity: 0, y: 26, duration: 1.4 }, 0.3)
        .from('[data-hero="6"]', { opacity: 0 }, 1.1);

      /* seismograph draw + volatility counter */
      const paths = document.querySelectorAll('.monitor-body path');
      paths.forEach(p => {
        const pathEl = p as SVGPathElement;
        const len = pathEl.getTotalLength();
        gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: len });
      });

      const seisTl = gsap.timeline({ delay: 1.0 });
      seisTl
        .to('#seis-1', { strokeDashoffset: 0, duration: 1.5, ease: 'none' })
        .to('#seis-2', { strokeDashoffset: 0, duration: 1.1, ease: 'none' }, '>-0.05');

      const volEl = document.getElementById('vol-read');
      if (volEl) {
        const volObj = { v: 0 };
        gsap.to(volObj, {
          v: 7.2, duration: 2.4, ease: 'power2.out', delay: 1.0,
          onUpdate: () => { volEl.textContent = volObj.v.toFixed(1); }
        });
      }

      gsap.to('.monitor', {
        y: -26, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });

      /* scroll reveals */
      const sc = (el: Element) => ({ trigger: el, start: 'top 87%' });
      
      gsap.utils.toArray('[data-anim="up"]').forEach(el => {
        gsap.from(el as Element, { scrollTrigger: sc(el as Element), y: 30, opacity: 0, duration: 1.2, ease });
      });
      
      gsap.utils.toArray('[data-anim="fade"]').forEach(el => {
        gsap.from(el as Element, { scrollTrigger: sc(el as Element), opacity: 0, duration: 1.2, ease });
      });
      
      gsap.utils.toArray('[data-anim="stagger"]').forEach(parent => {
        const kids = (parent as Element).querySelectorAll('[data-anim-child]');
        if (!kids.length) return;
        gsap.from(kids, { scrollTrigger: sc(parent as Element), y: 26, opacity: 0, duration: 1.15, ease, stagger: 0.12 });
      });

      /* counters */
      gsap.utils.toArray('[data-count]').forEach(el => {
        const targetEl = el as HTMLElement;
        const target = parseInt(targetEl.dataset.count || '0', 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: targetEl, start: 'top 90%' },
          onUpdate: () => { targetEl.textContent = Math.round(obj.v).toString(); }
        });
      });

      /* featured chart line draws */
      gsap.utils.toArray('.fv-chart path').forEach(p => {
        const pathEl = p as SVGPathElement;
        const len = pathEl.getTotalLength();
        gsap.set(pathEl, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(pathEl, {
          strokeDashoffset: 0, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: pathEl.closest('.featured'), start: 'top 80%' }
        });
      });

      /* magnetic buttons */
      if (window.matchMedia('(pointer:fine)').matches) {
        document.querySelectorAll('.magnetic').forEach(btn => {
          const btnEl = btn as HTMLElement;
          const strength = 10;
          btn.addEventListener('mouseenter', () => { (btn as any)._cachedRect = btn.getBoundingClientRect(); });
          btnEl.addEventListener('mousemove', (e) => {
            const r = (btnEl as any)._cachedRect || btnEl.getBoundingClientRect();
            const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
            const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
            gsap.to(btnEl, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power2.out' });
          });
          btnEl.addEventListener('mouseleave', () => {
            gsap.to(btnEl, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.45)' });
          });
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      const el = document.getElementById('wire-email');
      if (el) el.focus();
      setNoteText('// enter a valid email to join the wire');
      return;
    }
    setNoteText('// establishing secure connection to the wire...');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Subscriber',
          email: trimmedEmail,
          service: 'Newsletter Subscription',
          message: 'Subscribed to the wire from Insights page.'
        })
      });
      const data = await res.json();
      if (data.success) {
        setNoteText('// subscription established — welcome to the wire');
        setEmail('');
      } else {
        throw new Error(data.error || 'Failed to submit subscription');
      }
    } catch (err: any) {
      setNoteText('// ingestion alert: ' + (err.message || 'connection failed'));
    }
  };

  return (
    <div ref={containerRef} className="insights-page">
      <SiteHeader />

      <section className="hero" id="top">
      <HeroWebGLBackground />
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-inner">
          <div className="hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb" data-hero="1">
              <a href="/">Gobiya</a><i>/</i>
              <span>Industry insights</span>
            </nav>

            <h1 className="display">
              <span className="line"><span>Briefs from the</span></span>
              <span className="line"><span>algorithm</span></span>
              <span className="line"><span className="accent">front.</span></span>
            </h1>

            <p className="hero-sub body-l" data-hero="2">
              Read our SEO Insights for advanced tactical intelligence on Google and AI search — update
              forensics, GEO citation tactics, entity engineering, and pipeline
              field notes. Written from live client signal, not press releases.
            </p>

            <div className="hero-actions" data-hero="3">
              <a href="#briefs" className="btn btn-primary magnetic">
                Read the briefs
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="#wire" className="btn btn-ghost magnetic">Join the wire</a>
            </div>

            <div className="hero-meta" data-hero="4">
              <div>
                <p className="mono-tag">Sources</p>
                <p>Live client accounts · SERP telemetry</p>
              </div>
              <div>
                <p className="mono-tag">Beats covered</p>
                <p>Algo watch · GEO · Tech SEO · Pipeline</p>
              </div>
              <div>
                <p className="mono-tag">Engines tracked</p>
                <p>Google · ChatGPT · Claude · Perplexity · Gemini</p>
              </div>
            </div>
          </div>

          <div className="hero-exhibit">
            <figure className="monitor" data-hero="5">
              <div className="monitor-head">
                <span>EXH-008 / serp volatility monitor — rolling 30 days</span>
                <span className="right"><span className="pulse-dot" aria-hidden="true"></span>tracking</span>
              </div>

              <div className="monitor-reading">
                <div>
                  <span className="label">Current volatility index</span>
                  <p className="big"><span id="vol-read">0.0</span><sub>/10</sub></p>
                </div>
                <span className="state">elevated — update suspected</span>
              </div>

              <div className="monitor-body">
                <svg viewBox="0 0 560 220" role="img" aria-label="SERP volatility seismograph over thirty days, with a spike marked where a suspected core update began">
                  <g className="seis-grid">
                    <line x1="10" y1="50"  x2="550" y2="50"/>
                    <line x1="10" y1="100" x2="550" y2="100"/>
                    <line x1="10" y1="150" x2="550" y2="150"/>
                  </g>
                  <path className="seis-line" id="seis-1" d="M10 150 L34 142 L52 156 L74 138 L92 150 L116 132 L134 148 L158 140 L176 154 L198 136 L216 146 L240 130 L258 150 L282 138 L300 152 L324 134 L342 146 L366 140"/>
                  <path className="seis-spike" id="seis-2" d="M366 140 L382 96 L394 158 L408 64 L422 132 L438 52 L452 118 L468 76 L484 124 L500 88 L518 112 L534 96 L550 104"/>
                  <circle cx="366" cy="140" r="3.2" fill="#E0795F"/>
                  <text className="seis-label" x="16" y="32">calm baseline</text>
                  <text className="seis-label seis-label-hot" x="372" y="34">volatility spike — day 24</text>
                  <text className="seis-label" x="16" y="206">−30d</text>
                  <text className="seis-label" x="524" y="206">today</text>
                </svg>
              </div>

              <div className="monitor-foot">
                <span>illustrative composite of gobiya serp telemetry</span>
                <span>brief in progress ↓</span>
              </div>
            </figure>

            <div className="exhibit-caption" data-hero="6">
              <span className="mono-tag">Fig. 1 — when the line spikes, a brief ships</span>
              <span className="mono-tag">34.05°N&nbsp;118.24°W</span>
            </div>
          </div>
        </div>

        <div className="ticker" aria-label="Monitoring coverage">
          <div className="ticker-track" id="ticker-track">
            {[0, 1].map(i => (
              <div className="ticker-group" key={i} aria-hidden={i === 1 ? 'true' : undefined}>
                <span className="ticker-item">Core updates <em>— tracked live</em></span>
                <span className="ticker-item">AI Overviews <em>— monitored</em></span>
                <span className="ticker-item">GPTBot crawl activity <em>— logged</em></span>
                <span className="ticker-item">SERP volatility <em>— daily readings</em></span>
                <span className="ticker-item">Schema changes <em>— diffed</em></span>
                <span className="ticker-item">LLM citations <em>— sampled weekly</em></span>
                <span className="ticker-item">Spam updates <em>— flagged</em></span>
                <span className="ticker-item">Next brief <em>— in progress</em></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Coverage record">
        <div className="stats-grid">
          <div className="stat" data-anim="up">
            <span className="mono-tag">Monitoring</span>
            <p className="stat-num"><span data-count="24">0</span><sub>/7</sub></p>
            <p className="stat-desc">SERP telemetry and client signal watched continuously — briefs ship when the line moves, not on a content calendar.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">Updates covered</span>
            <p className="stat-num"><span data-count="14">0</span><sub>yrs</sub></p>
            <p className="stat-desc">Every major Google update since Gobiya's founding in 2012, analyzed from inside live client accounts.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">AI engines tracked</span>
            <p className="stat-num"><span data-count="5">0</span></p>
            <p className="stat-desc">Google, ChatGPT, Claude, Perplexity, and Gemini — citation behavior sampled across all five.</p>
          </div>
          <div className="stat" data-anim="up">
            <span className="mono-tag">Recycled press releases</span>
            <p className="stat-num">0</p>
            <p className="stat-desc">Every brief is written from primary observation — telemetry, crawl logs, and client account data.</p>
          </div>
        </div>
      </section>

      <section className="section" id="briefs">
        <div className="section-inner">
          <aside className="section-rail">
            <div className="rail-sticky" data-anim="stagger">
              <div className="eyebrow" data-anim-child>Intelligence briefs</div>
              <p className="rail-note" data-anim-child>
                Tactical reads on what the algorithm is doing right now — and what
                to do about it before your competitors read the same brief.
              </p>
              <div className="rail-cats" data-anim-child>
                <span style={{ color: 'var(--penalty)' }}>● Algo watch</span>
                <span style={{ color: 'var(--green)' }}>● GEO / AI search</span>
                <span>● Technical SEO</span>
                <span style={{ color: '#8C6D2E' }}>● Pipeline</span>
              </div>
            </div>
          </aside>

          <div className="section-main">
            <h2 className="section-title display" data-anim="up">
              The latest from the <span className="accent">monitoring desk.</span>
            </h2>

            {(() => {
              const latestArticle = articlesList[0];
              const latestNum = String(articlesList.length).padStart(3, '0');
              const latestCatLower = latestArticle.category.toLowerCase();
              const latestCatClass = latestCatLower.includes('algo') ? 'algo' :
                                     latestCatLower.includes('tech') ? 'tech' :
                                     latestCatLower.includes('pipe') ? 'pipe' : 'geo';

              return (
                <a href={`/insights/${latestArticle.slug}`} className="featured" data-anim="up">
                  <div className="featured-copy">
                    <div className="featured-meta">
                      <span className={`cat-pill ${latestCatClass}`}>{latestArticle.category}</span>
                      <span className="mono-tag">BRIEF-{latestNum} · featured · {latestArticle.readTime}</span>
                    </div>
                    <h3>{latestArticle.title}</h3>
                    <p>{latestArticle.metaDescription}</p>
                    <span className="text-link">
                      Read the brief
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </div>
                  <div className="featured-visual" aria-hidden="true" style={{ padding: 0, overflow: 'hidden' }}>
                    {latestArticle.image && (
                      <img 
                        src={latestArticle.image} 
                        alt={latestArticle.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                      />
                    )}
                  </div>
                </a>
              );
            })()}

            <div className="brief-list" data-anim="stagger">
              {currentArticles.map((article, i) => {
                const num = String(articlesList.length - ((currentPage - 1) * PAGE_SIZE + i)).padStart(3, '0');
                const catLower = article.category.toLowerCase();
                const catClass = catLower.includes('algo') ? 'algo' :
                                 catLower.includes('tech') ? 'tech' :
                                 catLower.includes('pipe') ? 'pipe' : 'geo';
                return (
                  <a key={article.slug} href={`/insights/${article.slug}`} className="brief" data-anim-child="true">
                    <div className="brief-id">
                      <span className="num">BRIEF-{num}</span>
                      <span className={`cat-pill ${catClass}`}>{article.category}</span>
                    </div>
                    <div className="brief-info">
                      <h3>{article.title}</h3>
                      <p>{article.metaDescription}</p>
                    </div>
                    <div className="brief-meta"><span>{article.readTime}</span><span>{article.category}</span></div>
                    <span className="brief-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </a>
                );
              })}
            </div>
            
            {totalPages > 1 && (
              <div className="pagination" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--line)' }}>
                <a 
                  href={`/insights?page=${Math.max(1, currentPage - 1)}`} 
                  className="btn btn-ghost"
                  style={{ 
                    opacity: currentPage === 1 ? 0.3 : 1, 
                    pointerEvents: currentPage === 1 ? 'none' : 'auto',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  <span aria-hidden="true" style={{marginRight: '0.5rem'}}>←</span> Previous
                </a>
                <span className="mono-tag" style={{ color: 'var(--ink-soft)' }}>Page {currentPage} of {totalPages}</span>
                <a 
                  href={`/insights?page=${Math.min(totalPages, currentPage + 1)}`} 
                  className="btn btn-ghost"
                  style={{ 
                    opacity: currentPage === totalPages ? 0.3 : 1, 
                    pointerEvents: currentPage === totalPages ? 'none' : 'auto',
                    display: 'inline-flex',
                    alignItems: 'center'
                  }}
                >
                  Next <span aria-hidden="true" style={{marginLeft: '0.5rem'}}>→</span>
                </a>
              </div>
            )}

            {/* Full Archive Index Accordion for Search Engine Discovery & Topic Mapping */}
            <div className="archive-disclosure" style={{ marginTop: '3rem', borderTop: '1px dashed var(--line)', paddingTop: '2rem' }}>
              <details style={{ cursor: 'pointer' }}>
                <summary className="mono-tag" style={{ color: 'var(--ink-soft)', outline: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', userSelect: 'none' }}>
                  <span>[+]</span> SYSTEM.INDEX: View All Briefs Archive ({articlesList.length} articles)
                </summary>
                <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', paddingLeft: '1.5rem', borderLeft: '1px solid rgba(224,121,95,0.2)' }}>
                  {articlesList.map((article, i) => {
                    const num = String(articlesList.length - i).padStart(3, '0');
                    return (
                      <div key={`archive-${article.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span className="mono-tag" style={{ color: 'var(--signal)', fontSize: '0.85em' }}>BRIEF-{num}</span>
                        <a href={`/insights/${article.slug}`} className="text-link" style={{ fontSize: '0.95em', textDecoration: 'none' }}>
                          {article.title}
                        </a>
                        <span className="mono-tag" style={{ fontSize: '0.8em', color: 'var(--ink-soft)', marginLeft: 'auto' }}>{article.category}</span>
                      </div>
                    );
                  })}
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="wire" id="wire">
        <div className="wire-inner">
          <div data-anim="stagger">
            <div className="eyebrow" data-anim-child>The wire</div>
            <h2 className="display" data-anim-child>Get the brief before the <span style={{ color: 'var(--signal)' }}>volatility settles.</span></h2>
            <p className="body-l" data-anim-child>
              When the monitor spikes, a brief ships — what moved, who got hit, and
              the tactical response. No content-calendar filler, no recycled press
              releases.
            </p>
          </div>
          <div data-anim="up">
            <form className="wire-form" id="wire-form" onSubmit={handleSubscribe}>
              <label htmlFor="wire-email" className="mono-tag" style={{ position: 'absolute', left: '-9999px' }}>Your email</label>
              <input 
                className="wire-input" 
                id="wire-email" 
                type="email" 
                placeholder="you@company.com" 
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-light" type="submit">
                Subscribe
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </form>
            <p className="wire-note" id="wire-note">{noteText}</p>
          </div>
        </div>
      </section>

      <section className="section cta-section" id="contact">
        <div className="wrap" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
          <div className="cta-card" data-anim="up">
            <div>
              <div className="eyebrow">From reading to acting</div>
              <h2 className="display">Intelligence is free. The <span className="accent">fix</span> is an engagement.</h2>
              <p className="body-l">
                If a brief described what's happening to your traffic, skip the
                self-diagnosis. One audit gets you the forensic read on your own
                numbers — and the sequence that closes the gap.
              </p>
            </div>
            <div className="cta-actions">
              <a href="/book" className="btn btn-primary magnetic">
                Get a growth audit
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/approach" className="btn btn-ghost magnetic">Read the methodology</a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default InsightsPage;
