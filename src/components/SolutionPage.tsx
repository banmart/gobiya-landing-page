import SiteHeader from "./SiteHeader";
import HeroWebGLBackground from './HeroWebGLBackground';
import SiteFooter from "./SiteFooter";
import InsightsSlider from "./InsightsSlider";
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SOLUTIONS_DATA } from '../lib/solutionsData';
import './SolutionPage.css';

gsap.registerPlugin(ScrollTrigger);

const SolutionPage: React.FC<{ path: string }> = ({ path }) => {
  const data = SOLUTIONS_DATA[path] || SOLUTIONS_DATA['/capabilities/web-development'];
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Setup global scroll reset and title
    window.scrollTo({ top: 0, behavior: 'instant' });


    // 2. Initial Hero Animations
    const ctx = gsap.context(() => {
      /* ---------- nav ---------- */
      const navInner = document.getElementById('nav-inner');
      const burger = document.getElementById('burger');
      const mobileMenu = document.getElementById('mobile-menu');

      const handleBurgerClick = () => {
        if (!mobileMenu || !burger) return;
        const open = mobileMenu.classList.toggle('open');
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
      };

      if (burger) {
        burger.addEventListener('click', handleBurgerClick);
      }

      if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          if (burger) {
            burger.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
          }
        }));
      }

      const handleScroll = () => {
        if (navInner) {
          navInner.classList.toggle('is-scrolled', window.scrollY > 40);
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });

      /* nav entrance */
      if (navInner) {
        gsap.from(navInner, { y: -22, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.1 });
      }

      // Body fade in
      gsap.to('body', { opacity: 1, duration: 0.6, ease: 'power2.out' });

      // Animate Hero elements in sequence
      const heroTl = gsap.timeline();
      heroTl.fromTo('[data-hero="1"]', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('.hero h1 .line > span',
        { y: '100%' },
        { y: '0%', duration: 0.8, ease: 'power3.out', stagger: 0.15 },
        "-=0.6"
      )
      .fromTo('[data-hero="2"]',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        "-=0.6"
      )
      .fromTo('[data-hero="3"], [data-hero="4"]',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15 },
        "-=0.6"
      );

      // Exhibit Reveal Timeline
      const exhibitTl = gsap.timeline({
        scrollTrigger: {
          trigger: '[data-hero="5"]',
          start: 'top 85%',
        }
      });
      
      exhibitTl.fromTo('[data-hero="5"]',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo('[data-rt="a"] .ln',
        { y: 4, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.08, ease: 'power2.out' },
        "+=0.2"
      )
      .fromTo('[data-rt-verdict="a"]',
        { y: 4, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      .fromTo('[data-rt="b"] .ln',
        { y: 4, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.08, ease: 'power2.out' },
        "+=0.4"
      )
      .fromTo('[data-rt-verdict="b"]',
        { y: 4, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      .fromTo('[data-hero="6"]',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 }
      );

      // Vitals Fill Animations
      gsap.utils.toArray('.vital-fill').forEach((bar: any) => {
        const targetWidth = bar.getAttribute('data-width') + '%';
        gsap.to(bar, {
          width: targetWidth,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.vitals',
            start: 'top 80%',
          }
        });
      });

      // Phases scroll line and dots
      const phases = gsap.utils.toArray('.phase');
      gsap.to('.phase-line-fill', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.phases',
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      });

      phases.forEach((phase: any, i) => {
        ScrollTrigger.create({
          trigger: phase,
          start: 'top center',
          onEnter: () => phase.classList.add('is-active'),
          onLeaveBack: () => phase.classList.remove('is-active')
        });
      });

      // General reveal up
      gsap.utils.toArray('[data-anim="reveal"]').forEach((el: any) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            }
          }
        );
      });
      
      // Case Chart Sparklines
      gsap.fromTo('.spark-rec',
        { strokeDasharray: 500, strokeDashoffset: 500 },
        { 
          strokeDashoffset: 0, duration: 2, ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.case-chart',
            start: 'top 80%'
          }
        }
      );
      
      gsap.fromTo('.spark-pre',
        { strokeDasharray: 500, strokeDashoffset: 500 },
        { 
          strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.case-chart',
            start: 'top 80%'
          }
        }
      );

    });

    return () => {
      const burger = document.getElementById('burger');
      const mobileMenu = document.getElementById('mobile-menu');
      if (burger) burger.replaceWith(burger.cloneNode(true));
      if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(a => a.replaceWith(a.cloneNode(true)));
      }
      ctx.revert();
    };
  }, [path, data]);

  if (!data) return <div className="text-center py-40">Solution not found.</div>;

  return (
    <div className="bg-white min-h-screen font-sans">
      <SiteHeader />

      {/* ================= HERO ================= */}
      <section className="hero" id="top">
      <HeroWebGLBackground />
        <div className="hero-grid" aria-hidden="true"></div>
        <div className="hero-inner">
          <div className="hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb" data-hero="1">
              <a href="/">Gobiya</a><i>/</i>
              <a href="/capabilities">Capabilities</a><i>/</i>
              <span>{data.breadcrumbLabel}</span>
            </nav>

            <h1 className="display">
              {data.hero.lines.map((line, idx) => (
                <span className="line" key={idx}>
                  <span className={idx === data.hero.accentLineIndex ? "accent" : ""}>{line}</span>
                </span>
              ))}
            </h1>

            <p className="hero-sub body-l" data-hero="2">
              {data.hero.sub}
            </p>

            <div className="hero-actions" data-hero="3">
              <a href="/book" className="btn btn-primary magnetic">
                {data.hero.ctaText}
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="#pillars" className="btn btn-ghost magnetic">See the engineering</a>
            </div>

            <div className="hero-meta" data-hero="4">
              <div>
                <p className="mono-tag">{data.hero.meta.label1}</p>
                <p>{data.hero.meta.value1}</p>
              </div>
              <div>
                <p className="mono-tag">{data.hero.meta.label2}</p>
                <p>{data.hero.meta.value2}</p>
              </div>
              <div>
                <p className="mono-tag">{data.hero.meta.label3}</p>
                <p>{data.hero.meta.value3}</p>
              </div>
            </div>
          </div>

          <div className="hero-exhibit">
            <figure className="rt" data-hero="5">
              <div className="rt-head">
                <span>{data.exhibit.id}</span>
                <span className="right"><span className="pulse-dot" aria-hidden="true"></span>live</span>
              </div>

              <div className="rt-panes">
                {/* Left Pane */}
                <div className="rt-pane">
                  <div className="rt-pane-head">
                    <span>{data.exhibit.leftPane.head}</span>
                    <span className={`pill ${data.exhibit.leftPane.pillClass}`}>{data.exhibit.leftPane.pill}</span>
                  </div>
                  <div className="rt-code" data-rt="a">
                    {data.exhibit.leftPane.code.map((lineHtml, i) => (
                      <span className="ln" key={i} dangerouslySetInnerHTML={{ __html: lineHtml }} />
                    ))}
                  </div>
                  <div className={`rt-verdict ${data.exhibit.leftPane.verdictClass}`} data-rt-verdict="a" dangerouslySetInnerHTML={{ __html: data.exhibit.leftPane.verdict }} />
                </div>

                {/* Right Pane */}
                <div className="rt-pane">
                  <div className="rt-pane-head">
                    <span>{data.exhibit.rightPane.head}</span>
                    <span className={`pill ${data.exhibit.rightPane.pillClass}`}>{data.exhibit.rightPane.pill}</span>
                  </div>
                  <div className="rt-code" data-rt="b">
                    {data.exhibit.rightPane.code.map((lineHtml, i) => (
                      <span className="ln" key={i} dangerouslySetInnerHTML={{ __html: lineHtml }} />
                    ))}
                  </div>
                  <div className={`rt-verdict ${data.exhibit.rightPane.verdictClass}`} data-rt-verdict="b" dangerouslySetInnerHTML={{ __html: data.exhibit.rightPane.verdict }} />
                </div>
              </div>

              <div className="rt-foot">
                <span>{data.exhibit.footLeft}</span>
                <span>{data.exhibit.footRight}</span>
              </div>
            </figure>

            <div className="exhibit-caption" data-hero="6">
              <span className="mono-tag">{data.exhibit.captionLeft}</span>
              <span className="mono-tag">{data.exhibit.captionRight}</span>
            </div>
          </div>
        </div>

        {/* stack ticker */}
        <div className="ticker" aria-label="GOBIYA build stack and crawler coverage">
          <div className="ticker-track" id="ticker-track" ref={tickerRef}>
            {[1, 2].map((group) => (
              <div className="ticker-group" key={group}>
                {data.tickerItems.map((item, idx) => (
                  <span className="ticker-item" key={idx}>{item.label} <em>{item.em}</em></span>
                ))}
                {data.tickerItems.map((item, idx) => (
                  <span className="ticker-item" key={`dup-${idx}`}>{item.label} <em>{item.em}</em></span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="stats">
        <div className="stats-grid" data-anim="reveal">
          {data.stats.map((stat, idx) => (
            <div className="stat" key={idx}>
              <div className="stat-num">{stat.num}{stat.sub && <sub>{stat.sub}</sub>}</div>
              <span className="mono-tag">{stat.tag}</span>
              <p className="stat-desc">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PILLARS ================= */}
      <section className="section" id="pillars">
        <div className="section-inner">
          <div className="section-rail">
            <div className="rail-sticky">
              <span className="eyebrow">Engineering</span>
              <p className="rail-note">{data.engGrid.railNote}</p>
            </div>
          </div>

          <div className="section-main">
            <h2 className="section-title display" data-anim="reveal">
              {data.engSectionTitle}
            </h2>

            <div className="eng-grid">
              <div className="eng-text body-l" data-anim="reveal">
                {data.engGrid.mainText.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              
              <figure className="vitals" data-anim="reveal">
                <div className="vitals-head">
                  <span>{data.engGrid.vitals.headLeft}</span>
                  <span>{data.engGrid.vitals.headRight}</span>
                </div>
                <div className="vitals-body">
                  {data.engGrid.vitals.rows.map((row, i) => (
                    <div className="vital" key={i}>
                      <div className="vital-row">
                        <span>{row.label}</span>
                        <span className="score">{row.score}</span>
                      </div>
                      <div className="vital-bar">
                        <div className="vital-fill" data-width={row.percent}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="vitals-foot">
                  <p>{data.engGrid.vitals.footLabel}</p>
                  <p>{data.engGrid.vitals.footValue}</p>
                </div>
              </figure>
            </div>

            <div className="caps-grid" data-anim="reveal">
              {data.engGrid.caps.map((cap, idx) => (
                <div className="cap" key={idx}>
                  <div className="cap-head">
                    <span className="mono-tag">{cap.tag}</span>
                    <span className="cap-sys">{cap.sys}</span>
                  </div>
                  <h3>{cap.title}</h3>
                  <p className="mt-4">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= METHODOLOGY ================= */}
      <section className="section method" id="method">
        <div className="section-inner">
          <div className="section-rail">
            <div className="rail-sticky">
              <span className="eyebrow">Process</span>
              <p className="rail-note">{data.methodSection.railNote}</p>
            </div>
          </div>

          <div className="section-main">
            <h2 className="section-title display" data-anim="reveal">
              {data.methodSection.mainTitle}
            </h2>
            <p className="method-sub body-l" data-anim="reveal">
              {data.methodSection.mainSub}
            </p>

            <div className="phases">
              <div className="phase-line"></div>
              <div className="phase-line-fill"></div>

              {data.methodSection.phases.map((phase, i) => (
                <div className="phase" key={i}>
                  <div className="phase-dot"><i></i></div>
                  <div className="phase-head">
                    <span className="mono-tag">{phase.tag}</span>
                    <h3>{phase.title}</h3>
                  </div>
                  <div className="phase-body">
                    <p>{phase.desc}</p>
                    <div className="phase-tags">
                      {phase.sysTags.map((sys, j) => <span key={j}>{sys}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CASE STUDY ================= */}
      <section className="section case-band">
        <div className="section-inner">
          <div className="section-rail">
            <div className="rail-sticky">
              <span className="eyebrow">Proof</span>
              <p className="rail-note">Measured impact on actual business logic.</p>
            </div>
          </div>

          <div className="section-main">
            <div className="case-grid">
              <div className="case-copy" data-anim="reveal">
                <span className="mono-tag">{data.caseSection.tag}</span>
                <h2 className="display">{data.caseSection.headline}</h2>
                <p className="body-l">
                  {data.caseSection.desc}
                </p>
                <a href={data.caseSection.ctaLink} className="text-link">{data.caseSection.ctaText}</a>
              </div>

              <div className="case-chart" data-anim="reveal">
                <div className="case-chart-head">
                  <span className="mono-tag">{data.caseSection.chartTitleLeft}</span>
                  <span className="mono-tag">{data.caseSection.chartTitleRight}</span>
                </div>
                <svg viewBox="0 0 300 120" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(21,19,14,0.08)" strokeWidth="1"/>
                  <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(21,19,14,0.08)" strokeWidth="1"/>
                  <line x1="0" y1="100" x2="300" y2="100" stroke="rgba(21,19,14,0.08)" strokeWidth="1"/>
                  {/* Divider line for migration */}
                  <line x1="140" y1="0" x2="140" y2="120" stroke="rgba(46,140,104,0.4)" strokeWidth="1" strokeDasharray="4 4"/>
                  
                  {/* Pre-migration Sparkline */}
                  <path className="spark-pre" d="M0,90 Q15,85 30,95 T60,85 T90,92 T110,88 T140,90" />
                  {/* Post-migration Sparkline */}
                  <path className="spark-rec" d="M140,90 Q160,85 180,50 T220,30 T250,20 T280,35 T300,10" />
                  
                  {/* Nodes */}
                  <circle cx="140" cy="90" r="3" fill="#2E8C68"/>
                  <circle cx="300" cy="10" r="4" fill="#2E8C68"/>
                </svg>
                <div className="meta">
                  <span>{data.caseSection.chartMetaLeft}</span>
                  <span><em>{data.caseSection.chartMetaRight}</em></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQs ================= */}
      <section className="section">
        <div className="section-inner">
          <div className="section-rail">
            <div className="rail-sticky">
              <span className="eyebrow">FAQ</span>
              <p className="rail-note">Technical questions on our implementation approach.</p>
            </div>
          </div>

          <div className="section-main">
            <h2 className="section-title display" data-anim="reveal">Answers to common technical queries.</h2>
            <div className="faq-list" data-anim="reveal">
              {data.faqs.map((faq, idx) => (
                <details 
                  className="faq" 
                  key={idx}
                  open={activeFaq === idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveFaq(activeFaq === idx ? null : idx);
                  }}
                >
                  <summary>
                    <h3>{faq.q}</h3>
                    <div className="faq-toggle"></div>
                  </summary>
                  <div className="faq-body">
                    <p>{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta-section">
        <div className="wrap">
          <div className="cta-card">
            <div data-anim="reveal">
              <span className="mono-tag">Next Steps</span>
              <h2 className="display">{data.ctaSection.headline}</h2>
              <p className="body-l">{data.ctaSection.sub}</p>
            </div>
            <div className="cta-actions" data-anim="reveal">
              <a href="/book" className="btn btn-primary magnetic">{data.ctaSection.btnText}</a>
              <a href="mailto:steve@gobiya.com" className="btn btn-ghost magnetic">Email Steve</a>
            </div>
          </div>
        </div>
      </section>

      <div data-logo-dark className="relative">
        <InsightsSlider currentPath={path} limit={3} />
      </div>

      <SiteFooter />
    </div>
  );
};

export default SolutionPage;
