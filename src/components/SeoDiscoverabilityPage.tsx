import React, { useEffect, useState } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import HeroQuickForm from './HeroQuickForm';
import ContentCta from './ContentCta';

const SPOKES = [
  {
    title: 'Technical SEO audit',
    query: '"technical seo audit agency"',
    href: '/performance/technical-seo-audit-agency',
    desc: 'A full diagnostic of crawl health, index coverage, Core Web Vitals, structured data, and duplicate content — with a prioritized fix list.',
  },
  {
    title: 'Local SEO services',
    query: '"local seo services agency"',
    href: '/performance/local-seo-services-agency',
    desc: 'GBP optimization, NAP consistency, local citation building, and map-pack rankings for businesses that serve a geographic area.',
  },
  {
    title: 'B2B SEO',
    query: '"b2b seo agency"',
    href: '/performance/b2b-seo-agency',
    desc: 'Long-cycle, high-value buyer journey optimization — targeting decision-makers and procurement queries, not just traffic volume.',
  },
  {
    title: 'E-commerce SEO',
    query: '"ecommerce seo agency"',
    href: '/performance/ecommerce-seo-agency',
    desc: 'Category and product page architecture, faceted navigation, schema, and commercial-intent content clusters for online stores.',
  },
];

const SERVICES = [
  { n: '01', title: 'Your site has crawl errors Google has been silently suppressing for months — and your SEO agency never flagged them', body: 'Technical problems — crawl errors, duplicate content, incorrect canonical tags, slow Core Web Vitals — create a ceiling that no content or link work can break through. We crawl your site the way Googlebot does and prioritize every finding by ranking impact before any other work begins.' },
  { n: '02', title: 'You\'re publishing content but multiple pages target the same vague keyword — so they compete against each other and both lose', body: 'Keyword cannibalization is one of the most common causes of stalled rankings on sites that are actively producing content. Every page needs a specific, distinct query it owns. We map your full URL set to a non-overlapping keyword target before anything gets written or revised.' },
  { n: '03', title: 'Your highest-value service pages have no internal links pointing to them — Google treats them as orphans', body: 'Internal link equity is how authority flows through your site. Pages that no other page links to look like dead ends to search engines, regardless of how well they\'re written. We restructure your internal linking to concentrate authority on the pages you actually need to rank.' },
  { n: '04', title: 'AI platforms answer questions in your category by citing your competitors — your site has no schema so you\'re invisible to the new search layer', body: 'Google AI Overviews, Perplexity, and ChatGPT pull answers from content with clear entity signals and structured data. Without JSON-LD schema for your business type, services, and FAQs, your content doesn\'t get surfaced — even if it\'s the best answer on the page.' },
  { n: '05', title: 'Your title tags were written at launch and still say "Services | Company Name" — you\'re losing clicks on every ranking you do have', body: 'Title tag and meta description are the two elements that determine whether someone clicks your result or skips to the next one. If they were written during site launch and never optimized around specific buyer queries, you\'re leaving 20–40% of your potential clicks on the table.' },
  { n: '06', title: 'Your traffic dropped and you have no idea which pages changed, which queries stopped sending visitors, or what triggered it', body: 'Without ongoing rank monitoring and Search Console diagnostics, algorithm updates and indexation changes are invisible until the traffic loss is already significant. We set up weekly anomaly detection so drops are caught and diagnosed before they compound.' },
];

const STEPS = [
  'Technical crawl audit and Search Console diagnostic — baseline performance established',
  'Keyword and intent map across all buyer journey stages for your specific market',
  'Page architecture review: URL structure, crawl depth, and internal link equity flow',
  'On-page optimization: titles, metas, headings, semantic clusters, and schema injection',
  'Content gap analysis and roadmap — pages to create, rewrite, or consolidate',
  'Rank monitoring setup: weekly reporting, anomaly detection, and continuous iteration',
];

const FAQS = [
  { q: 'We have been doing SEO for a year and our rankings have not moved. What is usually wrong?', a: 'The most common cause is a disconnect between the work being done and the actual ranking constraint. Most stalled SEO engagements involve ongoing content or link work while a technical problem — crawl errors, duplicate content, incorrect canonical tags, or poor Core Web Vitals — is silently suppressing the entire site. The first step is always a full technical audit to rule out structural blockers before adding more content or links. One technical fix on a site-wide issue often moves more than six months of content publication.' },
  { q: 'Our competitor outranks us on every keyword and their site looks worse than ours. How?', a: 'Design has no direct relationship to rankings. What Google evaluates is the strength of the signal: how well the page answers the query, how clearly the content communicates topical expertise, how strong the backlink profile is, and how cleanly the technical foundation is set up. A poorly designed site with strong authority signals, correct schema, and well-structured content will outrank a polished site with weak signals every time. The audit almost always reveals a specific gap in one of those areas that explains the competitive disadvantage.' },
  { q: 'We hired an SEO agency and they send us a monthly report but we have no idea if any of it is working.', a: 'A useful SEO report shows three things: which keywords moved, in which direction, and what specific action correlates with that movement. If your report shows tasks completed (articles published, links acquired, audits done) but no data on ranking position changes for your actual target queries, you cannot evaluate whether the work is producing results. Ask your agency to show you ranking position history for a defined keyword set over the last 90 days. If they cannot produce that, the reporting is covering activity, not outcomes.' },
  { q: 'We want to rank for specific high-value queries but keep getting traffic from unrelated searches instead.', a: 'This is a keyword and architecture problem. If your site is attracting unrelated traffic, it means the pages Google is indexing are targeting vague or broad signals rather than the specific queries you want to own. The fix is a keyword mapping exercise: define the exact query for each page, write the title tag and H1 around that specific query, and make sure the on-page content answers that query better than the current top-ranking pages do. Unrelated traffic is a symptom of unclear page-level intent signals.' },
];

const STATS = [
  { val: '213K', label: 'Monthly impressions for a single client content cluster' },
  { val: 'Top 3', label: 'Local map-pack ranking achieved for service-area clients' },
  { val: '6 mo', label: 'Median time to measurable organic traffic growth' },
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

export default function SeoDiscoverabilityPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
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
          <span style={{ color: '#374151' }}>SEO &amp; Discoverability</span>
        </nav>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', maxWidth: '920px', marginBottom: '1.5rem' }}>
          SEO &amp; Discoverability: Key Pages Out of the "Crawled – Currently Not Indexed" Trap
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.75, maxWidth: '640px', marginBottom: '2.5rem' }}>
          We resolve crawl budget leaks, fix technical index blocks, and build the topical authority needed so Google actually indexes your key commercial pages and drives qualified leads to your business.
        </p>
          </div>
          <div style={{ flex: '1 1 460px', maxWidth: '560px' }}>
            <HeroQuickForm source="SEO & Discoverability" variant="light" heading="Get a free SEO audit" subheading="Tell us about your site and we'll send a quick read." />
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
            How we dominate the full SEO &amp; discoverability search landscape
          </h2>
        </div>

        {/* Hub card */}
        <div style={{ border: '2px solid #111827', padding: '1.75rem 2rem', marginBottom: '1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6b7280', display: 'block', marginBottom: '0.4rem' }}>Hub — you are here</span>
            <strong style={{ fontSize: '1.05rem', color: '#111827' }}>SEO &amp; Discoverability</strong>
            <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginTop: '0.2rem', fontFamily: 'monospace' }}>"seo discoverability agency"</span>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', border: '1px solid #e5e7eb', padding: '0.3rem 0.75rem', borderRadius: '100px' }}>
            /performance/seo-discoverability-agency
          </span>
        </div>

        {/* Spoke cards */}
        <div className="rg-spokes" style={{ border: '1px solid #e5e7eb', borderTop: 'none' }}>
          {SPOKES.map((s, i) => (
            <a
              key={i}
              href={s.href}
              style={{
                display: 'block',
                padding: '1.5rem',
                borderRight: i < 3 ? '1px solid #e5e7eb' : 'none',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
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
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          ))}
        </div>
      </section>


      <ContentCta headline="Ready to build a pipeline that scales?" sub="Our team responds within one business day." accent="#111827" background="#f9fafb" />

      {/* -- SERVICES GRID -- */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>What we optimize</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' }}>
            Six reasons your site isn't ranking despite doing SEO — and how we fix each one
          </h2>
        </div>
        <div className="rg-services" style={{ border: '1px solid #e5e7eb', background: '#e5e7eb', gap: '1px' }}>
          {SERVICES.map((s) => (
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
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>How we work</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.15 }}>
              From audit to compounding rankings in 6 steps
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

      {/* -- CASE STUDIES CTA -- */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>In the field</span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.2, marginBottom: '1rem' }}>
            SEO that shipped and ranked — not theory.
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75, marginBottom: '2rem' }}>
            SmileCenter Dentistry: 213K monthly search impressions driven by technical SEO restructuring, local entity optimization, and a location-specific content architecture built from the ground up.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/case-studies" className="btn btn-primary magnetic">Read the case study</a>
            <a href="/case-studies" className="btn btn-ghost magnetic">All case studies</a>
          </div>
        </div>
        <a href="/case-studies" style={{ display: 'block', overflow: 'hidden', aspectRatio: '16/9' }}>
          <img
            src="/images/smile-center-homepage.webp"
            alt="Smile Center Dentistry — SEO results"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
            onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.04)')}
            onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
          />
        </a>
      </section>


      <ContentCta headline="See how Gobiya-managed campaigns perform." sub="Start with a free audit — no commitment, 24-hour turnaround." accent="#111827" background="#f9fafb" />

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
