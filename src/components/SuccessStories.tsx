import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import './SuccessStories.css';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import ContentCta from './ContentCta';

gsap.registerPlugin(ScrollTrigger);

const outcomes: { title: string; desc: string; href: string }[] = [
  { title: 'Traffic Recovery', desc: 'Search traffic restored after Google algorithm updates through content quality improvements, E-E-A-T signals, and technical remediation.', href: '/performance/seo-traffic-recovery' },
  { title: 'Local Map Pack Rankings', desc: 'Google 3-Pack visibility for competitive local service categories via GBP optimization and review velocity programs.', href: '/performance/local-seo-services-agency' },
  { title: 'Pipeline Attribution', desc: 'Organic search connected directly to CRM qualified meetings and closed-won revenue — not just session volume.', href: '/performance/b2b-seo-agency' },
  { title: 'AI Search Visibility', desc: 'Brand entity established in Google AI Overviews, ChatGPT, and Perplexity for category-relevant queries.', href: '/creativity/geo-ai-content-writing-agency' },
  { title: 'Technical SEO Fixes', desc: 'Crawl budget restored, redirect chains cleaned, schema implemented, and Core Web Vitals optimized to eliminate indexation barriers.', href: '/performance/technical-seo-audit-agency' },
];

const measurementSteps: string[] = [
  'Search impressions and clicks tracked by keyword cluster, not just aggregate sessions',
  'Organic sessions filtered to the high-intent queries that map to real buyer journey stages',
  'Form submissions and phone calls attributed back to the organic-visitor session that produced them',
  'Pipeline opportunities tagged with organic search as the attributed source inside the CRM',
  'Closed-won revenue traced back to the original organic query and landing page',
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: 'What results does Gobiya produce for SEO clients?',
    a: <>Gobiya case studies show <a href="/performance/seo-traffic-recovery" className="text-gray-900 font-semibold underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900">traffic recovery after algorithm updates</a>, local 3-Pack rankings for competitive service categories, pipeline growth from organic search, and AI search visibility across Google AI Mode, ChatGPT, and Perplexity. Results are reported at the position and pipeline level — not just aggregate traffic dashboards. Every case study discloses the specific actions taken and the resulting rank and revenue changes.</>,
  },
  {
    q: 'How does Gobiya measure SEO success?',
    a: <>Gobiya measures success in qualified pipeline and closed-won revenue, not just traffic. Every organic program is connected to CRM data so results trace to specific deals — see how we build that in our <a href="/performance/b2b-seo-agency" className="text-gray-900 font-semibold underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900">B2B SEO practice</a>. Traffic without pipeline attribution is treated as a vanity metric.</>,
  },
  {
    q: 'What industries does Gobiya have SEO results in?',
    a: <>Gobiya has documented results across dental and medical practices, professional services firms, B2B SaaS companies, local service businesses, and e-commerce. Case studies cover both <a href="/performance/local-seo-services-agency" className="text-gray-900 font-semibold underline underline-offset-4 decoration-gray-300 hover:decoration-gray-900">local SEO</a> (map pack visibility, GBP recovery) and B2B organic search (pipeline attribution, buying committee content, AI search visibility). Industry-specific case studies are available on request for prospective clients in similar categories.</>,
  },
  {
    q: 'How long did it take Gobiya to produce these results?',
    a: <>Timeline varies by starting point and competitive category. Technical fixes (redirect cleanup, schema implementation, Core Web Vitals) typically produce measurable ranking changes within 30–60 days. Content programs and authority building take 90–180 days for significant organic traffic growth. Local SEO map pack improvements are often visible within 30–90 days when review velocity and GBP optimization are addressed together.</>,
  },
];

const SuccessStories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Initial load fade in
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });

    const ctx = gsap.context(() => {
      const ease = 'power3.out';

      /* scroll reveals */
      const sc = (el: Element) => ({ trigger: el, start: 'top 87%' });

      gsap.utils.toArray('[data-anim="up"]').forEach(el => {
        gsap.from(el as Element, { scrollTrigger: sc(el as Element), y: 30, opacity: 0, duration: 1.2, ease });
      });

      gsap.utils.toArray('[data-anim="fade"]').forEach(el => {
        gsap.from(el as Element, { scrollTrigger: sc(el as Element), opacity: 0, duration: 1.2, ease });
      });

      gsap.utils.toArray('[data-anim="scale"]').forEach(el => {
        gsap.from(el as Element, { scrollTrigger: sc(el as Element), scale: 0.97, opacity: 0, duration: 1.4, ease: 'power2.out' });
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

  return (
    <div id="page" ref={containerRef} className="success-stories-page bg-white text-gray-900 min-h-screen font-sans selection:bg-black selection:text-white">
      <SiteHeader />

      <main id="primary" className="site-main w-full">

        {/* ── BREADCRUMB + H1 ── */}
        <div className="bg-white" style={{ paddingTop: '17rem', paddingBottom: '5rem', paddingLeft: '5vw', paddingRight: '5vw' }}>
          <nav className="text-[13px] font-medium text-gray-400 mb-12 flex items-center gap-2 tracking-wide">
            <a href="/" className="hover:text-gray-700 transition-colors">Home</a>
            <span className="text-gray-200">/</span>
            <span className="text-gray-900 font-semibold">Case Studies</span>
          </nav>
          <h1 className="text-[clamp(2.5rem,5.5vw,4.75rem)] font-bold tracking-tight text-gray-900 leading-[1.05] mb-7" style={{ maxWidth: '1100px' }}>
            SEO Case Studies: 5x Inquiries, 3x Bookings, Real Numbers
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 font-light leading-relaxed" style={{ maxWidth: '640px' }}>
            Data-backed search recovery and pipeline results — exactly what Gobiya built, why it was built, and what moved as a result. Query by query, position by position.
          </p>
        </div>

        {/* ── BREADCRUMB SCHEMA ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.gobiya.com/" },
                { "@type": "ListItem", "position": 2, "name": "Case Studies", "item": "https://www.gobiya.com/case-studies" }
              ]
            })
          }}
        />

        {/* ── FAQ SCHEMA ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What kind of SEO results does Gobiya produce?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Gobiya's case studies show measurable outcomes including traffic recovery after Google algorithm updates, local 3-Pack rankings for competitive service categories, and pipeline growth from organic search. Results are reported at the query and position level — not just aggregate traffic numbers. Every case study discloses what was built, why it was built, and what ranking or pipeline movement resulted."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What industries does Gobiya have SEO case studies for?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Gobiya has documented case studies across industries including dental and medical practices, professional services, B2B SaaS, local service businesses, and e-commerce. Case studies cover both local SEO (map pack visibility and Google Business Profile recovery) and B2B organic search (pipeline attribution and buying committee content programs)."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does Gobiya measure SEO success?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Gobiya measures success in pipeline and closed revenue — not just traffic and keyword rankings. Every organic search program is connected to CRM data so results can be traced to qualified meetings and closed-won deals. Traffic without pipeline attribution is treated as a vanity metric, not a success signal."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long did it take Gobiya to produce SEO results for clients?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Timeline varies by starting point and competitive category. Technical fixes (redirect cleanup, schema implementation, Core Web Vitals) typically produce measurable ranking changes within 30–60 days. Content programs and authority building take 90–180 days for significant organic traffic growth. Local SEO map pack improvements are often visible within 30–90 days when review velocity and GBP optimization are addressed together."
                  }
                }
              ]
            })
          }}
        />

        {/* ── FULL-BLEED OVERLAY ── */}
        <div className="relative w-full flex items-end" style={{ minHeight: '80vh', backgroundColor: '#0d0d0d' }}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/livescan-results.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.55,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
          <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end" style={{ padding: '8rem 5vw 4rem' }}>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] mb-5" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>We measure results in pipeline, not just rankings</p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white leading-[1.05]">
                Real clients. Real numbers. Every engagement is on the record.
              </h2>
            </div>
            <div className="flex flex-col gap-5">
              <p className="text-base leading-[1.8]" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>Every case study on this page discloses what was built, why it was built, and what moved — query by query, position by position.</p>
              <p className="text-base leading-[1.8]" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>We connect organic search directly to CRM pipeline and closed revenue, so the numbers below are attributed, not aggregated.</p>
              <div className="pt-2 hero-actions">
                <a
                  href="/book"
                  id="case-studies-overlay-cta"
                  className="btn bg-white text-gray-900 border-white hover:bg-gray-200 hover:border-gray-200 transition-colors"
                >
                  Start your audit
                  <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── WHAT TO EXPECT ── */}
        <div className="bg-white border-b border-gray-100" style={{ padding: '5rem 5vw' }}>
          <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-16 md:gap-28 items-start">
            <div className="md:sticky md:top-32">
              <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight text-gray-900 leading-[1.1]">
                What to expect from a Gobiya case study
              </h2>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-[clamp(1.1rem,2vw,1.3rem)] text-gray-600 leading-[1.8]">
                Every Gobiya case study discloses what was built, why it was built, and what moved — query by query, position by position. Results are measured in pipeline and closed revenue, not just organic sessions.
              </p>
            </div>
          </div>
        </div>

        {/* ── HOW WE MEASURE SUCCESS ── */}
        <div className="bg-[#f8f8f7] border-b border-gray-100" style={{ padding: '5rem 5vw' }}>
          <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-16 md:gap-28 items-start">
            <div className="md:sticky md:top-32">
              <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight text-gray-900 leading-[1.1]">
                How we measure success
              </h2>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 leading-snug">Pipeline and closed revenue, not vanity traffic</h3>
              <div className="flex flex-col gap-8">
                <p className="text-lg text-gray-500 leading-[1.85]">
                  Gobiya measures success in qualified pipeline and closed-won revenue, not just traffic. Every organic program is connected to CRM data so results trace to specific deals. Traffic without pipeline attribution is treated as a vanity metric, not a success signal.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── MEASUREMENT FRAMEWORK, STEP BY STEP ── */}
        <div className="bg-white border-b border-gray-100" style={{ padding: '5rem 5vw' }}>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-gray-900 mb-16 leading-tight">
            The measurement framework, step by step
          </h2>
          <div className="border-t border-gray-200">
            {measurementSteps.map((step, idx) => (
              <div key={idx} className="grid grid-cols-[80px_1fr] py-8 border-b border-gray-100 items-start">
                <span className="text-sm font-mono text-gray-300 pt-0.5">0{idx + 1}.</span>
                <p className="text-[clamp(1rem,1.8vw,1.2rem)] text-gray-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <ContentCta
          headline="Ready to see these numbers on your business?"
          sub="Our team responds within one business day."
          accent={'#111827'}
          background="#f9fafb"
        />

        {/* ── OUTCOME CARDS ── */}
        <div className="bg-[#f8f8f7] border-b border-gray-100" style={{ padding: '5rem 5vw' }}>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-gray-900 mb-16 leading-tight">
            Explore the services behind these results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: '#e5e7eb' }}>
            {outcomes.map((o, idx) => (
              <a key={o.title} href={o.href} className="ss-outcome-card bg-white flex flex-col justify-between transition-colors" style={{ padding: '2.5rem', minHeight: '300px' }}>
                <div>
                  <span className="text-xs font-mono text-gray-300 block mb-8">0{idx + 1}.</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 leading-snug">{o.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{o.desc}</p>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-900 font-semibold mt-6">Explore this service →</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="bg-white border-b border-gray-100" style={{ padding: '5rem 5vw' }}>
          <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-16 md:gap-28 items-start">
            <div className="md:sticky md:top-32">
              <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight text-gray-900 leading-[1.1]">
                Common questions about our results
              </h2>
            </div>
            <div>
              {faqs.map((f, i) => (
                <details key={i} className="group border-b border-gray-200">
                  <summary className="py-6 cursor-pointer font-bold text-lg sm:text-xl text-gray-900 list-none flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg className="shrink-0 transition-transform group-open:rotate-180" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M19 9l-7 7-7-7"/></svg>
                  </summary>
                  <p className="pb-6 text-base text-gray-500 leading-[1.85]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* ── CLIENT CARDS GRID ── */}
        <div id="case-001" className="bg-[#f8f8f7] border-b border-gray-100" style={{ padding: '5rem 5vw' }}>
          <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-12 md:gap-24 mb-16">
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold text-gray-900 leading-tight">The Case Files</h2>
            <div>
              <p className="text-xl text-gray-500 font-light mb-6 leading-relaxed">Every client below is a real engagement with real numbers.</p>
              <a href="/book" className="inline-flex items-center gap-2 text-gray-900 font-medium underline underline-offset-4 hover:text-gray-500 transition-colors text-sm tracking-wide">
                Walk through any of them in detail on a strategy call →
              </a>
            </div>
          </div>

          <style>{`
            .ss-outcome-card:hover { background: #f4f4f3 !important; }
            .cs-card {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              text-decoration: none;
              background: #ffffff;
            }
            .cs-card-featured { aspect-ratio: 16/9; }
            .cs-card-regular  { aspect-ratio: 4/3; }
            .cs-bg {
              position: absolute;
              inset: -8%;
              background-size: cover;
              background-position: center;
              transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .cs-bg-photo { filter: brightness(0.9); }
            .cs-bg-dark  { background: #f9fafb; inset: 0; filter: none; }
            .cs-card:hover .cs-bg { transform: scale(1.07); }
            .cs-overlay {
              position: absolute;
              inset: 0;
              background: rgba(255,255,255,0.85);
              transition: background 0.3s;
              z-index: 1;
            }
            .cs-card:hover .cs-overlay { background: rgba(255,255,255,0.75); }
            .cs-logo {
              position: relative;
              z-index: 2;
              width: 44%;
              max-width: 200px;
              object-fit: contain;
              filter: grayscale(1) brightness(0.2);
              opacity: 0.82;
              transition: opacity 0.35s, transform 0.35s;
            }
            .cs-card:hover .cs-logo { opacity: 1; transform: scale(1.05); }
            .cs-logo.no-filter { filter: none; }
            .cs-badge {
              position: absolute;
              z-index: 3;
              bottom: 1.25rem;
              left: 1.5rem;
              right: 1.5rem;
            }
            .cs-badge-name {
              display: block;
              font-size: 0.875rem;
              font-weight: 600;
              color: #111827;
              margin-bottom: 0.2rem;
            }
            .cs-badge-cat {
              display: block;
              font-size: 0.65rem;
              font-family: monospace;
              text-transform: uppercase;
              letter-spacing: 0.12em;
              color: #6b7280;
            }
            /* Staggered Row Grids on Desktop */
            .cs-row-2col {
              display: grid;
              grid-template-columns: 1fr 1fr;
              border-bottom: 1px solid #e5e7eb;
            }
            .cs-row-2col .cs-card { border-right: 1px solid #e5e7eb; }
            .cs-row-2col .cs-card:last-child { border-right: none; }

            .cs-row-3col {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              border-bottom: 1px solid #e5e7eb;
            }
            .cs-row-3col .cs-card { border-right: 1px solid #e5e7eb; }
            .cs-row-3col .cs-card:last-child { border-right: none; }

            .cs-row-4col {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
            }
            .cs-row-4col .cs-card { border-right: 1px solid #e5e7eb; }
            .cs-row-4col .cs-card:last-child { border-right: none; }

            .cs-grid-container { border: 1px solid #e5e7eb; border-bottom: none; background: #ffffff; }

            @media (max-width: 900px) {
              .cs-grid-container {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                border-top: 1px solid #e5e7eb;
              }
              .cs-row-2col, .cs-row-3col, .cs-row-4col {
                display: contents;
              }
              .cs-card {
                border-right: 1px solid #e5e7eb !important;
                border-bottom: 1px solid #e5e7eb !important;
              }
              .cs-card:nth-child(2n) {
                border-right: none !important;
              }
              .cs-card:nth-last-child(-n+2) {
                border-bottom: none !important;
              }
            }
            @media (max-width: 520px) {
              .cs-grid-container {
                grid-template-columns: 1fr;
              }
              .cs-card {
                border-right: none !important;
                border-bottom: 1px solid #e5e7eb !important;
              }
              .cs-card:last-child {
                border-bottom: none !important;
              }
            }
          `}</style>

          <div className="cs-grid-container">
            {/* Row 1 (2 columns - Featured) */}
            <div className="cs-row-2col">
              <div className="cs-card cs-card-featured">
                <div className="cs-bg cs-bg-photo" style={{ backgroundImage: 'url(/images/smile-center-homepage.webp)' }} />
                <div className="cs-overlay" />
                <img src="/images/smilecenter.webp" alt="Smile Center" className="cs-logo" />
                <div className="cs-badge">
                  <span className="cs-badge-name">Smile Center Dentistry</span>
                  <span className="cs-badge-cat">Multi-location SEO · Conversion architecture · React/Vite</span>
                </div>
              </div>
              <div className="cs-card cs-card-featured">
                <div className="cs-bg cs-bg-photo" style={{ backgroundImage: 'url(/images/american-livescan-storefront.webp)' }} />
                <div className="cs-overlay" />
                <img src="/images/americanlivescan.webp" alt="American Livescan" className="cs-logo" />
                <div className="cs-badge">
                  <span className="cs-badge-name">American Livescan</span>
                  <span className="cs-badge-cat">Site rebuild · Local SEO · Google Business Profile</span>
                </div>
              </div>
            </div>

            {/* Row 2 (3 columns - Regular) */}
            <div className="cs-row-3col">
              {[
                { name: 'Remodel Me Pros',   cat: 'SEO · Lead generation',           logo: '/images/remodelmepros-opt.webp',  bg: '/images/caveman-remodel-me-pros.webp' },
                { name: 'SafetyCentric',      cat: 'SEO · Discoverability',            logo: '/images/safetycentric-logo.png',  bg: '/images/safety-centric-home.webp' },
                { name: 'Total Capital Inc',  cat: 'Financial SEO · Pipeline',         logo: '/images/totalcapital-opt.webp',   bg: '/images/delano-home.webp' },
              ].map(c => (
                <div key={c.name} className="cs-card cs-card-regular">
                  {c.bg
                    ? <div className="cs-bg cs-bg-photo" style={{ backgroundImage: `url(${c.bg})` }} />
                    : <div className="cs-bg cs-bg-dark" />
                  }
                  <div className="cs-overlay" />
                  <img src={c.logo} alt={c.name} className={`cs-logo ${c.name === 'DG Plumbing' ? 'no-filter' : ''}`} />
                  <div className="cs-badge">
                    <span className="cs-badge-name">{c.name}</span>
                    <span className="cs-badge-cat">{c.cat}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 3 (2 columns - Regular) */}
            <div className="cs-row-2col">
              {[
                { name: 'QuickPass AiD',      cat: 'Custom build · Native CRM',        logo: '/images/quickpass-logo-opt.webp', bg: '/images/quickpass-aid.webp' },
                { name: 'DG Plumbing',        cat: 'Local SEO · Google Business',      logo: '/images/logo-DeEgMiH0-opt.png',   bg: '/images/dgplumbing-front-home.webp' },
              ].map(c => (
                <div key={c.name} className="cs-card cs-card-regular" style={{ aspectRatio: '16/9' }}>
                  {c.bg
                    ? <div className="cs-bg cs-bg-photo" style={{ backgroundImage: `url(${c.bg})` }} />
                    : <div className="cs-bg cs-bg-dark" />
                  }
                  <div className="cs-overlay" />
                  <img src={c.logo} alt={c.name} className={`cs-logo ${c.name === 'DG Plumbing' ? 'no-filter' : ''}`} />
                  <div className="cs-badge">
                    <span className="cs-badge-name">{c.name}</span>
                    <span className="cs-badge-cat">{c.cat}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 4 (4 columns - Regular) */}
            <div className="cs-row-4col">
              {[
                { name: 'The ARK Crypto',     cat: 'Web development · Branding',       logo: '/images/ark-logo---01-dark.webp', bg: '/images/the-ark-dark.webp' },
                { name: 'EliZilberstein.com', cat: 'Personal brand · SEO',             logo: '/images/client-5.webp',           bg: '/images/eli-zilberstein-suit-home.webp' },
                { name: 'Healing Metta',      cat: 'Healthcare SEO · Content',         logo: '/images/medicine-metta-logo-1.webp', bg: '/images/healing-metta-home.webp' },
                { name: 'Trusted Home Contractors', cat: 'General Contractors · Los Angeles & OC', logo: '/images/trusted-logo-home.webp', bg: '/images/trusted-home-contractors-home.webp' },
              ].map(c => (
                <div key={c.name} className="cs-card cs-card-regular">
                  {c.bg
                    ? <div className="cs-bg cs-bg-photo" style={{ backgroundImage: `url(${c.bg})` }} />
                    : <div className="cs-bg cs-bg-dark" />
                  }
                  <div className="cs-overlay" />
                  <img src={c.logo} alt={c.name} className={`cs-logo ${c.name === 'DG Plumbing' ? 'no-filter' : ''}`} />
                  <div className="cs-badge">
                    <span className="cs-badge-name">{c.name}</span>
                    <span className="cs-badge-cat">{c.cat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HEADLINE STATS ── */}
        <section className="stats" aria-label="Headline results">
          <div className="stats-grid">
            <div className="stat" data-anim="up">
              <span className="mono-tag">SmileCenter — inquiries</span>
              <p className="stat-num"><span data-count="5">0</span><sub>×</sub></p>
              <p className="stat-desc">Form completions and phone calls each grew fivefold — same visitors, far better conversion.</p>
            </div>
            <div className="stat" data-anim="up">
              <span className="mono-tag">SmileCenter — impressions</span>
              <p className="stat-num"><span data-count="213">0</span><sub>K</sub></p>
              <p className="stat-desc">Total search impressions nearly tripled, from 75.3K to 213K, across all markets.</p>
            </div>
            <div className="stat" data-anim="up">
              <span className="mono-tag">Livescan — bookings &amp; calls</span>
              <p className="stat-num"><span data-count="3">0</span><sub>×</sub></p>
              <p className="stat-desc">Online appointments and phone calls each tripled after the legacy migration.</p>
            </div>
            <div className="stat" data-anim="up">
              <span className="mono-tag">Livescan — walk-ins</span>
              <p className="stat-num">+<span data-count="30">0</span><sub>%</sub></p>
              <p className="stat-desc">Physical walk-in traffic grew 30% on the back of map-pack and "near me" visibility.</p>
            </div>
          </div>
        </section>

        {/* ── CLIENT NAME BAND ── */}
        <section className="clients" aria-label="Clients">
          <div className="clients-inner" data-anim="fade">
            <span className="mono-tag">Also on the record —</span>
            <span className="client-name">RemodelMe Pros</span>
            <span className="client-name">QuickPass</span>
            <span className="client-name">MyTrustWills</span>
            <span className="client-name">Tidder Pro</span>
            <span className="client-name">Total Capital</span>
          </div>
        </section>

      </main>

      <ContentCta
        headline="Want your business to be the next case file?"
        sub="Start with a free audit. We respond within one business day."
        accent={'#111827'}
        background="#ffffff"
      />

      <SiteFooter />
    </div>
  );
};

export default SuccessStories;
