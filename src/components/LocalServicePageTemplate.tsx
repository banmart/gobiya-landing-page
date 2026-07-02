import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import HeroQuickForm from './HeroQuickForm';
import ContentCta from './ContentCta';
import LatestInsights from './LatestInsights';

gsap.registerPlugin(ScrollTrigger);

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center py-6 bg-transparent border-none cursor-pointer text-left gap-6"
        aria-expanded={open}
      >
        <span className="text-base sm:text-lg font-semibold text-gray-900 leading-normal">{q}</span>
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-500 text-xl font-medium leading-none">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed pb-6 max-w-3xl">{a}</p>
      )}
    </div>
  );
}

export interface ServiceItem {
  title: string;
  body: string;
}

export interface StatItem {
  val: string;
  label: string;
}

export interface SpokeItem {
  title: string;
  query: string;
  href: string;
  desc: string;
}

export interface SpecItem {
  label: string;
  val: string;
}

export interface LocalServicePageTemplateProps {
  schema: any;
  breadcrumb: string;
  heroTitle: React.ReactNode;
  heroSubtitle: React.ReactNode;
  tags?: string[];
  specs?: SpecItem[];
  introHeading: React.ReactNode;
  introParagraphs: React.ReactNode[];
  stats?: StatItem[];
  servicesLabel?: string;
  servicesTitle?: string;
  services?: ServiceItem[];
  faqs?: { q: string; a: string }[];
  spokes?: SpokeItem[];
  spokesTitle?: string;
  spokesLabel?: string;
  useHeroForm?: boolean;
  relevantSlugs?: string[];
  children?: React.ReactNode;
}

export default function LocalServicePageTemplate({
  schema,
  breadcrumb,
  heroTitle,
  heroSubtitle,
  tags,
  specs,
  introHeading,
  introParagraphs,
  stats,
  servicesLabel = "What we do",
  servicesTitle = "Capabilities",
  services,
  faqs,
  spokes,
  spokesTitle = "Related Services",
  spokesLabel = "Explore",
  useHeroForm = false,
  relevantSlugs,
  children,
}: LocalServicePageTemplateProps) {
  useEffect(() => {
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });

    const ctx = gsap.context(() => {
      const ease = 'power3.out';

      // Intro animations
      gsap.utils.toArray('[data-anim="up"]').forEach(el => {
        gsap.fromTo(el as Element,
          { y: 30, opacity: 0 },
          { scrollTrigger: { trigger: el as Element, start: 'top 87%' }, y: 0, opacity: 1, duration: 1.2, ease }
        );
      });

      // Stats counters
      gsap.utils.toArray('[data-count]').forEach(el => {
        const text = (el as HTMLElement).dataset.count || '0';
        const numericMatch = text.match(/\d[\d.]*/);
        if (!numericMatch || numericMatch.index === undefined) return;
        const target = parseFloat(numericMatch[0]);
        if (isNaN(target)) return;
        const prefix = text.slice(0, numericMatch.index);
        const suffix = text.slice(numericMatch.index + numericMatch[0].length);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: el as Element, start: 'top 90%' },
          onUpdate: () => {
            const val = target % 1 !== 0 ? obj.v.toFixed(1) : Math.round(obj.v);
            (el as HTMLElement).textContent = prefix + String(val) + suffix;
          }
        });
      });

      // Cards stagger
      gsap.from('.cat-card', {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.cat-cards-grid', start: 'top 80%' },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased font-sans flex flex-col">
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
      <SiteHeader />

      {/* 01. Hero Section (Light mode matching /creativity/ai-videos-agency) */}
      <section className="bg-white pt-28 pb-20 lg:pt-40 lg:pb-24 border-b border-gray-200 px-[5vw]">
        <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap gap-12 lg:gap-24 items-start justify-between">
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* Breadcrumb */}
            <nav className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-400 mb-6 flex items-center gap-2">
              <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
              <span>/</span>
              <span className="text-gray-600">{breadcrumb}</span>
            </nav>
            
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.05] mb-6">
              {heroTitle}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl">
              {heroSubtitle}
            </p>

            {/* Tags (pills format) */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="font-mono text-[10px] uppercase tracking-wider text-gray-700 border border-gray-200 px-3 py-1 rounded-full bg-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Specs (grid format) */}
            {specs && specs.length > 0 && (
              <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8 mt-10">
                {specs.map((spec, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-gray-400">
                      {spec.label}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {spec.val}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {!tags && !specs && (
              <div className="flex flex-wrap gap-4">
                <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-semibold text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors">
                  Book a consultation
                </a>
                <a href="#intro" className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-gray-200 text-gray-900 font-semibold text-sm uppercase tracking-wider hover:bg-gray-50 transition-colors">
                  Read our approach
                </a>
              </div>
            )}
          </div>

          {/* Form Widget */}
          {useHeroForm && (
            <div className="w-full lg:w-[460px] lg:shrink-0 lg:max-w-[560px]">
              <HeroQuickForm 
                source={typeof heroTitle === 'string' ? heroTitle : "Local Service Page"} 
                variant="light" 
                heading="Request a consultation" 
                subheading="Tell us about your business and we'll respond quickly." 
              />
            </div>
          )}
        </div>
      </section>

      {/* 02. Intro Section (50/50 split matching homepage) */}
      <section id="intro" className="py-24 border-b border-gray-200 bg-white">
        <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 px-[5vw]">
          <div className="flex flex-col justify-start" data-anim="up">
            <span className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-4">
              Overview
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-[1.1]">
              {introHeading}
            </h2>
          </div>
          <div className="flex flex-col justify-start text-gray-600 text-lg leading-relaxed" data-anim="up">
            {introParagraphs.map((p, i) => (
              <div key={i} className={i > 0 ? "mt-6" : ""}>{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* 03. Stats Bar (Matching homepage Numbers Grid but using CategoryPage stats style) */}
      {stats && stats.length > 0 && (
        <section className="border-b border-gray-200 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {stats.map((s, i) => (
              <div key={i} className={`text-center py-16 px-8 ${i > 0 ? 'md:border-l border-gray-200 border-t md:border-t-0' : ''}`} data-anim="up">
                <div className="text-5xl sm:text-7xl font-light text-gray-900 leading-none tracking-tight mb-3">
                  <span data-count={s.val}>{s.val.replace(/\d[\d.]*/, '0')}</span>
                </div>
                <div className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 04. Services / Capabilities Grid */}
      {services && services.length > 0 && (
        <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
          <div className="mb-12">
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">{servicesLabel}</span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
              {servicesTitle}
            </h2>
          </div>

          <div className="cat-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-gray-200">
            {services.map((svc, i) => (
              <div 
                key={i} 
                className="cat-card p-10 flex flex-col justify-between"
                style={{
                  borderRight: (i + 1) % 3 !== 0 ? '1px solid #e5e7eb' : 'none',
                  borderBottom: i < services.length - (services.length % 3 || 3) ? '1px solid #e5e7eb' : 'none',
                }}
              >
                <div>
                  <span className="font-mono text-xs text-gray-400 block mb-4">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 tracking-tight">{svc.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{svc.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 05. Hub / Spokes Grid (if applicable) */}
      {spokes && spokes.length > 0 && (
        <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
          <div className="mb-12">
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">{spokesLabel}</span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900">
              {spokesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spokes.map((spoke, i) => (
              <a 
                key={i} 
                href={spoke.href}
                className="group block p-8 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
                data-anim="up"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-black transition-colors">{spoke.title}</h3>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400 group-hover:text-black transition-colors">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7 7C7 6.44772 7.44772 6 8 6H17C17.5523 6 18 6.44772 18 7V16C18 16.5523 17.5523 17 17 17C16.4477 17 16 16.5523 16 16V9.41421L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L14.5858 8H8C7.44772 8 7 7.55228 7 7Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="font-mono text-xs text-gray-500 mb-3 bg-white inline-block px-2 py-1 border border-gray-200">
                  {spoke.query}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{spoke.desc}</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 06.5. Custom Sections */}
      {children}

      {/* 07. FAQs */}
      {faqs && faqs.length > 0 && (
        <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
          <div className="max-w-3xl">
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Common questions</span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-12">
              Things clients ask before they start
            </h2>
            <div>
              {faqs.map((item, i) => (
                <React.Fragment key={i}><FaqItem q={item.q} a={item.a} /></React.Fragment>
              ))}
              <div className="border-t border-gray-200" />
            </div>
          </div>
        </section>
      )}

      <ContentCta />
      <LatestInsights relevantSlugs={relevantSlugs} />
      <SiteFooter />
      
      {/* Mobile grid card border overrides for responsive design */}
      <style>{`
        .cat-card {
          padding: 2.5rem !important;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        @media (max-width: 900px) {
          .cat-card { border-right: none !important; border-bottom: 1px solid #e5e7eb !important; padding: 2rem 1.5rem !important; }
          .cat-card:last-child { border-bottom: none !important; }
        }
      `}</style>
    </div>
  );
}
