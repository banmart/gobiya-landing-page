import React, { useEffect, useState } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import HeroQuickForm from './HeroQuickForm';
import ContentCta from './ContentCta';

const SPOKES = [
  {
    title: 'Custom Web App Development',
    query: '"custom web app development agency"',
    href: '/performance/custom-web-app-development-agency',
    desc: 'Bespoke React, Next.js, and Vite applications engineered for speed, clean architecture, and seamless API integration.',
  },
  {
    title: 'Mobile App Development',
    query: '"mobile app development agency"',
    href: '/performance/mobile-app-development-agency',
    desc: 'Cross-platform mobile applications built on modern frameworks — designed to perform natively across iOS and Android.',
  },
  {
    title: 'IT Consulting & Strategy',
    query: '"it consulting services agency"',
    href: '/performance/it-consulting-services-agency',
    desc: 'Architecture reviews, technology selection, and digital transformation roadmaps that align your stack to business outcomes.',
  },
  {
    title: 'E-commerce Development',
    query: '"ecommerce web development agency"',
    href: '/performance/ecommerce-web-development-agency',
    desc: 'High-performance online stores with optimized checkout flows, inventory systems, and conversion-first product architecture.',
  },
];

const VALUE_PROPS = [
  { n: '01', title: 'Your current site loads in 4 seconds — and every second costs you rankings and leads before anyone reads a word', body: "Sub-second load time and a 90+ Lighthouse score aren't aspirational — they're written into the brief before a line of code is written. Because slow sites don't just frustrate visitors, they rank below faster competitors on identical content." },
  { n: '02', title: 'You\'re paying a monthly platform fee on a site you don\'t actually own and will someday pay someone to migrate off', body: 'Custom-coded sites mean your code and your data are yours — no software subscription, no rebuild every two years because the page-builder fell behind the framework, no migration fee when you outgrow the platform.' },
  { n: '03', title: 'Your site has traffic but visitors read one paragraph and leave without contacting you', body: "Information architecture and conversion flow get mapped before visual design starts. The goal isn't a site that looks good in a portfolio — it's one where the visitor journey ends at your phone or inbox, not the back button." },
  { n: '04', title: 'Your designer, developer, and SEO agency don\'t talk to each other — and your lead funnel breaks in the gaps between them', body: 'Frontend, backend, API integrations, performance, and SEO architecture all run through the same team — so page speed, schema markup, and conversion flow are built in from the start, not patched on after launch.' },
];

const STEPS = [
  'Technical brief and scope definition — goals, integrations, performance benchmarks, and SEO architecture established upfront',
  'Information architecture and user journey mapping — designed before a single line of code is written',
  'Component library and design system build — visual and functional consistency locked in at scale',
  'Frontend and backend development with explicit performance budgets — load time, Lighthouse score, and Core Web Vitals targets written into the brief',
  'Quality assurance across devices, browsers, and network conditions — signed off before staging goes live',
  'Deployment with monitoring, analytics, and optimization protocols — the site becomes a compounding asset, not a maintenance burden',
];

const FAQS = [
  { q: 'Our current site is slow and we\'re losing leads before the form even loads. Do we need a full rebuild?', a: "Not always. We start with a technical audit to see whether the fix is architectural or just a performance tune-up — then recommend the smaller path first if it'll get the job done." },
  { q: "We're not developers. How involved do we need to be?", a: 'As involved as you want. We run the technical brief, IA, and build end-to-end; you weigh in at the milestones that matter — scope, design direction, and final sign-off.' },
  { q: 'Our last developer built us something that was outdated in two years. How is this different?', a: 'We build on modern, actively maintained frameworks (React, Next.js, Vite) with a performance budget baked into the brief from day one, not bolted on after launch. That\'s what keeps a site from aging out.' },
  { q: 'We want a site that actually generates leads, not just one that looks good. What does that take?', a: 'Conversion-focused IA, fast load times, and clean technical SEO foundations — set up before visual design starts, not patched in afterward.' },
];

const STATS = [
  { val: '<1s', label: 'Target page load time on every build' },
  { val: '90+', label: 'Lighthouse performance score target' },
  { val: '100%', label: 'Client code and data ownership, no exceptions' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: '1px solid #e5e7eb' }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1.5rem' }} aria-expanded={open}>
        <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>{q}</span>
        <span style={{ flexShrink: 0, color: '#6b7280', fontSize: '1.2rem', lineHeight: 1 }}>{open ? '-' : '+'}</span>
      </button>
      {open && <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.75, paddingBottom: '1.5rem', maxWidth: '72ch' }}>{a}</p>}
    </div>
  );
}
function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div>
      {items.map((item, i) => <React.Fragment key={i}><FaqItem q={item.q} a={item.a} /></React.Fragment>)}
      <div style={{ borderTop: '1px solid #e5e7eb' }} />
    </div>
  );
}

export default function WebDevelopmentPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }) }} />
      <SiteHeader />

      {/* -- HERO -- */}
      <section style={{ background: '#ffffff', padding: 'clamp(7rem,15vw,13rem) 5vw 5rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 480px', minWidth: 0 }}>
        <nav style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</a>
          <span>/</span>
          <a href="/performance" style={{ color: '#9ca3af', textDecoration: 'none' }}>Performance</a>
          <span>/</span>
          <span style={{ color: '#374151' }}>Web Development Agency</span>
        </nav>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', maxWidth: '920px', marginBottom: '1.5rem' }}>
          Web Development: Sub-Second Loads, Higher Rankings, More Leads
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.75, maxWidth: '640px', marginBottom: '1.5rem' }}>
          Most business websites were built to look good in a portfolio — not to rank on Google or convert the visitors who do arrive. The result is a slow, template-based site that loses search positions to faster competitors, fails to turn traffic into inquiries, and locks you into a platform you'll eventually have to pay someone to escape. Gobiya builds custom React, Next.js, and Vite sites in Los Angeles — engineered backward from one goal: qualified leads.
        </p>
        <p style={{ fontSize: '0.9rem', color: '#9ca3af', fontFamily: 'monospace', marginBottom: '2.5rem' }}>
          No templates. No page-builder bloat. No software tax. Just code you own and a site that compounds.
        </p>
          </div>
          <div style={{ flex: '1 1 460px', maxWidth: '560px' }}>
            <HeroQuickForm source="Web Development Agency" variant="light" heading="Start a development project" subheading="Tell us about your project and we'll respond quickly." />
          </div>
        </div>
      </section>

      {/* -- STATS BAR -- */}
      <section style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div className="rg-stats" style={{ padding: '0 5vw' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: '2rem 0', borderRight: i < 2 ? '1px solid #e5e7eb' : 'none', paddingLeft: i > 0 ? '3rem' : 0 }}>
              <span style={{ display: 'block', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.04em', color: '#111827', lineHeight: 1 }}>{s.val}</span>
              <span style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginTop: '0.5rem' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* -- QUERY CLUSTER MAP -- */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>Query fan-out cluster</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', maxWidth: '600px' }}>
            How we cover the full web development search landscape
          </h2>
        </div>

        {/* Hub card */}
        <div style={{ border: '2px solid #111827', padding: '1.75rem 2rem', marginBottom: '1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6b7280', display: 'block', marginBottom: '0.4rem' }}>Hub — you are here</span>
            <strong style={{ fontSize: '1.05rem', color: '#111827' }}>Web Development Agency Los Angeles</strong>
            <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginTop: '0.2rem', fontFamily: 'monospace' }}>"web development agency Los Angeles"</span>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', border: '1px solid #e5e7eb', padding: '0.3rem 0.75rem', borderRadius: '100px' }}>
            /performance/web-development-agency
          </span>
        </div>

        {/* Spoke cards */}
        <div className="rg-spokes" style={{ border: '1px solid #e5e7eb', borderTop: 'none' }}>
          {SPOKES.map((s, i) => (
            <a
              key={i}
              href={s.href}
              style={{ display: 'block', padding: '1.5rem', borderRight: i < 3 ? '1px solid #e5e7eb' : 'none', textDecoration: 'none', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', display: 'block', marginBottom: '0.6rem' }}>
                Spoke {String(i + 1).padStart(2, '0')}
              </span>
              <strong style={{ fontSize: '0.9rem', color: '#111827', display: 'block', marginBottom: '0.4rem', lineHeight: 1.3 }}>{s.title}</strong>
              <span style={{ fontSize: '0.7rem', fontFamily: 'monospace', color: '#9ca3af', display: 'block', marginBottom: '0.75rem' }}>{s.query}</span>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.6 }}>{s.desc}</p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#374151', marginTop: '1rem', borderBottom: '1px solid #d1d5db', paddingBottom: '2px' }}>
                View page
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </a>
          ))}
        </div>
      </section>

      <ContentCta headline="Ready to build a site that compounds instead of decays?" sub="Start with a free technical audit — no commitment, 24-hour turnaround." accent="#111827" background="#f9fafb" />

      {/* -- VALUE PROPS -- */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>What your current site is costing you</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' }}>
            Four problems with template-built sites — and what a hand-coded build solves
          </h2>
        </div>
        <div className="rg-value-2" style={{ border: '1px solid #e5e7eb', background: '#e5e7eb', gap: '1px' }}>
          {VALUE_PROPS.map((s) => (
            <div key={s.n} style={{ background: '#ffffff', padding: '2.5rem' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>{s.n}</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -- PROCESS -- */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '6rem' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>How we build</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.15 }}>
              From brief to compounding asset in 6 stages
            </h2>
          </div>
          <div style={{ borderTop: '1px solid #e5e7eb' }}>
            {STEPS.map((step, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', padding: '1.75rem 0', borderBottom: '1px solid #e5e7eb', alignItems: 'start' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#9ca3af', paddingTop: '2px' }}>0{i + 1}</span>
                <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.7 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- SOCIAL PROOF / CASE STUDY -- */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>In the field</span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.2, marginBottom: '1rem' }}>
            Web development that shipped, ranked, and converted — not theory.
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75, marginBottom: '0.75rem' }}>
            Smile Center Dentistry's custom React rebuild delivered a 5x increase in patient inquiry volume — driven by technical architecture changes, correct schema markup, and sub-second page performance.
          </p>
          <p style={{ fontSize: '0.8rem', color: '#9ca3af', fontFamily: 'monospace', marginBottom: '2rem' }}>
            Trusted by teams at: Smile Center Dentistry, American Livescan, Remodel Me Pros, SafetyCentric, QuickPass AiD, The ARK Crypto, and others.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/case-studies/smile-center-dentistry" className="btn btn-primary magnetic">Read the case study</a>
            <a href="/case-studies" className="btn btn-ghost magnetic">All case studies</a>
          </div>
        </div>
        <a href="/case-studies/smile-center-dentistry" style={{ display: 'block', overflow: 'hidden', aspectRatio: '16/9' }}>
          <img
            src="/images/smile-center-homepage.webp"
            alt="Smile Center Dentistry — custom React build results"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
            onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.04)')}
            onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
          />
        </a>
      </section>

      <ContentCta headline="Ready to build a site that compounds instead of decays?" sub="Start with a free technical audit — no commitment, 24-hour turnaround." accent="#111827" background="#f9fafb" />

      {/* -- FAQs -- */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ maxWidth: '860px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>Common questions</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '3rem' }}>Things clients ask before they start</h2>
          <FaqList items={FAQS} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
