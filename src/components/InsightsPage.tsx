import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './InsightsPage.css';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { ARTICLE_META } from '../lib/articlesMeta';

gsap.registerPlugin(ScrollTrigger);

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
    <div id="page" ref={containerRef} className="insights-page min-h-screen flex flex-col">
      <SiteHeader />
      <div id="content" className="site-content flex-grow">
        <main id="primary" className="site-main">

      <section id="top" style={{ background: '#ffffff', padding: '17rem 5vw 5rem', borderBottom: '1px solid #e5e7eb', position: 'relative' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', display: 'block', marginBottom: '1.5rem' }}>
          Gobiya / Industry insights
        </span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', maxWidth: '880px', marginBottom: '1.75rem' }}>
          Tactical Briefs for Winning Google and AI Search
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.75, maxWidth: '640px', marginBottom: '2.5rem' }}>
          Advanced tactical intelligence on Google and AI search — update forensics, GEO citation tactics, entity engineering, and pipeline field notes. Written from live client signal, not press releases.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#briefs" className="btn btn-primary magnetic">
            Read the briefs
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="#wire" className="btn btn-ghost magnetic">Join the wire</a>
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


        </main>
      </div>

      <SiteFooter />
    </div>
  );
};

export default InsightsPage;
