import React, { useState } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

interface ServiceLink {
  href: string;
  label: string;
}

interface CategoryConfig {
  label: string;
  heading: string;
  introParagraph: string;
  introLink: string;
  stat1: { value: string; label: string };
  stat2: { value: string; label: string };
  stat3: { value: string; label: string };
  video: string;
  services: ServiceLink[];
  cards: {
    number: string;
    title: string;
    desc: string;
    links: ServiceLink[];
    href: string;
  }[];
  faqs: { q: string; a: string }[];
}

const CATEGORIES: Record<string, CategoryConfig> = {
  creativity: {
    label: 'Creativity',
    heading: 'Your competitors are ranking for what you do. Your site isn\'t. That\'s a content and strategy problem.',
    introParagraph: 'Most businesses have a visibility gap: they do good work but the right buyers never find them. The content on their site either misses the queries buyers actually search, isn\'t structured for AI platforms to cite, or is too generic to earn trust once someone lands. We map every piece of content to a specific buyer query or problem — then write, script, or produce it from there.',
    introLink: '/about',
    stat1: { value: '5+', label: 'Brand systems delivered' },
    stat2: { value: '100%', label: 'Custom — no templates' },
    stat3: { value: '3×', label: 'Avg. engagement lift' },
    video: '/videos/rollb.webm',
    services: [
      { href: '/creativity/seo-web-copywriting-agency', label: 'SEO & Web Copywriting' },
      { href: '/creativity/seo-content-strategy-agency', label: 'SEO Content Strategy' },
      { href: '/creativity/geo-ai-content-writing-agency', label: 'GEO & AI Content Writing' },
      { href: '/creativity/ai-videos-agency', label: 'AI Videos & Ads' },
      { href: '/creativity/crypto-web3-agency', label: 'Crypto & Web3' },
    ],
    faqs: [
      {
        q: 'Do we really need a brand strategy if we already have a logo?',
        a: 'A logo is a mark — a brand strategy is what that mark means. Without a defined voice, visual system, and positioning, every piece of content your business produces pulls in a slightly different direction. Over time that inconsistency erodes trust, especially with buyers who research across multiple channels before making a decision. A strategy gives your team a shared language so that your website, your ads, your emails, and your social posts feel like they came from the same place.'
      },
      {
        q: 'We need a website rewrite and better SEO. Does the copy actually move the needle?',
        a: 'It is usually the biggest lever. Technical SEO can fix crawlability and site speed, but Google ranks pages based on what they say and how well they answer the query. Thin, generic copy is the most common reason technically healthy sites stall in the 10–20 position range. Copy written around specific search intent, with natural semantic variation and a clear answer in the first paragraph, is what closes the gap from page two to the top three.'
      },
      {
        q: 'How do we keep our brand consistent when different people are writing for us?',
        a: 'The practical fix is a brand guidelines document — not a 60-page PDF nobody reads, but a concise reference that covers voice, tone, what the company does and does not say, and a handful of before/after examples. Once that exists, it becomes the brief for every writer, designer, and social manager you work with. We build that as part of brand identity work, and the difference in output consistency is immediate.'
      },
      {
        q: "We're rebranding. How disruptive is that going to be to our search rankings?",
        a: 'It depends on what changes. A visual rebrand — new logo, new colour palette, updated imagery — has almost no SEO impact. A URL change or domain migration is a different situation: without proper 301 redirect mapping and Search Console management, you can lose a significant portion of your organic traffic in the weeks after launch. We plan the technical migration alongside the creative rebrand so both happen cleanly at the same time.'
      },
      {
        q: 'What does a content strategy actually deliver that a one-off article push does not?',
        a: 'A single article builds one signal. A content strategy builds a topic cluster — a hub page supported by spokes that cover every related question your buyer asks during the research phase. That architecture concentrates authority on a single topic and gives search engines a clear signal about what your site is the authority on. One-off articles scatter that signal. The compounding effect of a structured cluster shows up in organic traffic within three to six months and continues building after that.'
      },
    ],
    cards: [
      {
        number: '01',
        title: 'SEO & Web Copywriting',
        desc: 'Your pages don\'t rank because nothing on your site maps to the queries your buyers actually search. We write keyword-mapped web copy, landing pages, and editorial content that ranks on Google and gets cited by AI platforms.',
        links: [
          { href: '/creativity/seo-web-copywriting-agency', label: 'SEO landing pages' },
          { href: '/creativity/seo-web-copywriting-agency', label: 'Editorial content' },
          { href: '/creativity/seo-web-copywriting-agency', label: 'Email & ad copy' },
        ],
        href: '/creativity/seo-web-copywriting-agency',
      },
      {
        number: '02',
        title: 'AI Videos & Ads',
        desc: 'A traditional 30-second video production quote runs $30,000–$80,000 and takes 8 weeks. We produce YouTube pre-roll, Amazon Prime, and social video using Veo 3 in 3–5 days — script, voice, and delivery included.',
        links: [
          { href: '/creativity/ai-videos-agency', label: 'YouTube pre-roll ads' },
          { href: '/creativity/ai-videos-agency', label: 'Amazon Prime & Paramount+' },
          { href: '/creativity/ai-videos-agency', label: 'Veo 3 & AI voiceover' },
        ],
        href: '/creativity/ai-videos-agency',
      },
      {
        number: '03',
        title: 'Crypto & Web3',
        desc: 'Your protocol doesn\'t fail because the code is bad — it fails because no investor outside your Telegram ever finds it. We build the smart contract, the dApp, and the SEO content that puts your project in front of people actively searching for it.',
        links: [
          { href: '/creativity/crypto-web3-agency', label: 'Smart contract development' },
          { href: '/creativity/crypto-web3-agency', label: 'Pulsechain & Ethereum dApps' },
          { href: '/creativity/crypto-web3-agency', label: 'Crypto SEO & Web3 content' },
        ],
        href: '/creativity/crypto-web3-agency',
      },
    ],
  },

  performance: {
    label: 'Performance',
    heading: 'Your site, ads, or rankings aren\'t performing. We find the specific constraint and fix it.',
    introParagraph: 'Most performance problems have one root cause — a slow site blocking rankings, ad spend wasted on unqualified clicks, or a technical gap suppressing traffic that should be converting. We run a forensic read before touching anything, identify the specific constraint, and build the fix that moves the metric you actually care about: qualified leads.',
    introLink: '/about',
    stat1: { value: '100/100', label: 'Core Web Vitals target' },
    stat2: { value: '61%', label: 'Avg. CPL reduction' },
    stat3: { value: '5×', label: 'Pipeline growth achieved' },
    video: '/videos/rollb.webm',
    services: [
      { href: '/performance/seo-discoverability-agency', label: 'SEO & Discoverability' },
      { href: '/performance/web-development-agency', label: 'Web & IT App Development' },
      { href: '/performance/google-ads-ppc-strategy-agency', label: 'Google Ads & PPC Strategy' },
      { href: '/performance/cro-ux-analysis-agency', label: 'CRO & UX Analysis' },
      { href: '/performance/ai-llms-business-agency', label: 'AI & LLM Systems Consulting' },
      { href: '/ai-search-marketing-santa-clarita', label: 'AI Search Marketing (Santa Clarita)' },
    ],
    faqs: [
      {
        q: 'Our traffic dropped after a Google update. Where do we even start?',
        a: 'The first step is matching the drop to the specific update that caused it — not every update, just the one whose timing aligns with your traffic curve. Each update targets a different pattern: thin content, low authority, over-optimized anchor text, helpful content signals. Once you know which pattern triggered the drop, the fix is targeted. Making broad changes without that forensic read is the most common reason sites take 12 to 18 months to recover instead of six weeks.'
      },
      {
        q: 'We tried SEO before and it did not work. What is different here?',
        a: 'Most SEO engagements stall because the work is scattered across too many signals without a clear hypothesis about what is actually holding rankings back. We run a forensic audit before touching anything — looking at the exact update timeline, the content patterns that got suppressed, and the technical gaps in the crawl. From that read we build one targeted fix, not a 50-item checklist. If we cannot identify a clear, high-probability lever in the first two weeks, we say so.'
      },
      {
        q: 'Should we run Google Ads while we wait for SEO to kick in?',
        a: 'For most businesses, yes — but with one important caveat. Paid search buys you time-to-market in the short term and gives you real conversion data (which queries actually close) that makes your SEO targeting sharper. The caveat is attribution: if your tracking is not set up to distinguish paid and organic conversions, you end up paying for clicks you were going to earn anyway. We set up clean attribution before scaling any paid budget.'
      },
      {
        q: 'What is the difference between SEO and PPC — which should we start with?',
        a: 'SEO is a compounding asset: slow to build, expensive to dislodge once established, zero marginal cost per click at scale. PPC is a linear cost: fast to launch, immediate data, but stops the moment you stop paying. The right answer depends on your timeline and your margin. If you need pipeline in the next 90 days, start with paid and use the data to inform your organic content. If you are playing a 12-month game and have content capacity, SEO compounds faster than most clients expect once the technical foundation is right.'
      },
      {
        q: 'How do we know if our website speed is actually hurting our rankings?',
        a: 'Check your Core Web Vitals data in Google Search Console under the Experience tab. If you are seeing pages flagged as Poor or Needs Improvement on LCP, INP, or CLS, those are confirmed signals — not hypothetical ones. The CrUX data Google uses for ranking is field data from real users on your site, not a lab test. The fix list varies by site: oversized images, render-blocking scripts, and third-party tag bloat are the three most common culprits we find on audits.'
      },
    ],
    cards: [
      {
        number: '01',
        title: 'SEO & Discoverability',
        desc: 'Your site has been doing SEO for a year and rankings haven\'t moved. There\'s a structural reason — crawl errors, keyword cannibalization, or a technical ceiling no content will break through. We find it and fix it first.',
        links: [
          { href: '/performance/seo-discoverability-agency', label: 'Technical SEO audits' },
          { href: '/performance/seo-discoverability-agency', label: 'Entity & schema markup' },
          { href: '/performance/seo-discoverability-agency', label: 'Core Web Vitals' },
          { href: '/ai-search-marketing-santa-clarita', label: 'AI Search Marketing' },
        ],
        href: '/performance/seo-discoverability-agency',
      },
      {
        number: '02',
        title: 'Web & IT Development',
        desc: 'Your current site is slow, template-built, and locks you into a platform that charges you to leave. We build custom React and Next.js sites that rank fast, convert cleanly, and belong entirely to you.',
        links: [
          { href: '/performance/web-development-agency', label: 'React / Next.js builds' },
          { href: '/performance/web-development-agency', label: 'Native CRM pipelines' },
          { href: '/performance/web-development-agency', label: 'API & database integration' },
        ],
        href: '/performance/web-development-agency',
      },
      {
        number: '03',
        title: 'Google Ads & PPC',
        desc: 'You\'re spending on Google Ads and can\'t tell which campaign generated a single qualified lead. We rebuild around one metric — cost per lead — and verify attribution before a dollar of new budget goes live.',
        links: [
          { href: '/performance/google-ads-ppc-strategy-agency', label: 'Search & Display campaigns' },
          { href: '/performance/google-ads-ppc-strategy-agency', label: 'Conversion tracking' },
          { href: '/performance/google-ads-ppc-strategy-agency', label: 'Bid strategy & ROAS' },
        ],
        href: '/performance/google-ads-ppc-strategy-agency',
      },
      {
        number: '04',
        title: 'CRO & UX Analysis',
        desc: 'You\'re getting traffic but visitors read one screen and leave without contacting you. We audit where they drop off, test the specific friction points, and redesign the flows that turn visits into inquiries.',
        links: [
          { href: '/performance/cro-ux-analysis-agency', label: 'Funnel audit & heatmaps' },
          { href: '/performance/cro-ux-analysis-agency', label: 'A/B & multivariate tests' },
          { href: '/performance/cro-ux-analysis-agency', label: 'UX redesign' },
        ],
        href: '/performance/cro-ux-analysis-agency',
      },
      {
        number: '05',
        title: 'AI & LLM Consulting',
        desc: 'You\'re doing repetitive manual work that should be automated — intake, routing, reporting, follow-up — but don\'t know which tools are trustworthy or where to start. We build the specific integrations that remove the daily friction.',
        links: [
          { href: '/performance/ai-llms-business-agency', label: 'Custom LLM integrations' },
          { href: '/performance/ai-llms-business-agency', label: 'Workflow automation' },
          { href: '/performance/ai-llms-business-agency', label: 'AI-powered pipelines' },
        ],
        href: '/performance/ai-llms-business-agency',
      },
    ],
  },

  relations: {
    label: 'Relations',
    heading: 'Your competitors get press, backlinks, and AI citations. You don\'t. Here\'s how that gap closes.',
    introParagraph: 'Authority signals — editorial backlinks, press mentions, structured citations — are what tell Google and AI platforms that your site is the credible answer. Without them, even technically correct pages lose to competitors with stronger external signals. We build those signals over 12 months through earned editorial coverage, structured outreach, and entity optimization.',
    introLink: '/about',
    stat1: { value: '300+', label: 'Placements secured' },
    stat2: { value: 'DR 50+', label: 'Avg. domain rating of links' },
    stat3: { value: '12mo', label: 'Avg. authority build cycle' },
    video: '/videos/rollb.webm',
    services: [
      { href: '/relations/authority-building-agency', label: 'Authority & Link Building' },
      { href: '/relations/digital-pr-media-outreach-agency', label: 'Digital PR & Media Outreach' },
      { href: '/relations/google-ads-ppc-strategy-agency', label: 'Google Ads & PPC Strategy' },
    ],
    faqs: [
      {
        q: 'Can we just buy backlinks to speed this up?',
        a: "You can, and it will appear to work for a few months. Then a link spam update will wipe the gains and leave your domain in a worse position than when you started. Google's link spam detection has improved substantially — it uses pattern analysis across anchor text, domain diversity, and link velocity that catches most paid link schemes within one or two update cycles. The sites we have seen recover fastest from link penalties are the ones that switched to earned editorial links before the next update window."
      },
      {
        q: 'We got mentioned in a local news article. Does that actually help our rankings?',
        a: 'It depends on whether the mention includes a link. A citation without a link (a bare brand mention) contributes to entity recognition and can appear in AI search results, but it does not pass the domain authority signal that a hyperlink does. A followed link from a local news domain with real traffic is a strong signal — especially for local SEO. If you have unlinked brand mentions from press coverage, outreach to convert them to links is one of the highest-ROI link building moves available to you.'
      },
      {
        q: 'How long does link building take to show up in rankings?',
        a: 'Typically six to twelve weeks for new links to be indexed and weighted, and three to six months before you can draw a clean line from a link building campaign to a ranking movement. The timeline is shorter when the links come from domains Google already crawls frequently and longer when they come from lower-traffic or newer domains. We track this at the page level rather than waiting for a domain authority number to move — page-level rank data shows the signal faster.'
      },
      {
        q: 'What is the difference between a paid placement and earned media coverage?',
        a: 'A paid placement is marked as sponsored and carries no editorial weight — Google treats it as advertising, not a vote of confidence. Earned coverage is when a journalist or editor decides your story is worth writing about independent of payment. That independence is exactly what makes it valuable as an authority signal. The practical difference for your SEO: editorial links pass full link equity; paid placements and sponsored posts typically use nofollow or sponsored attributes, which do not.'
      },
      {
        q: 'How do we measure whether authority building is actually working?',
        a: 'Three things we track on a rolling 90-day basis: new referring domains (the count and quality of sites linking to you for the first time), domain rating or domain authority trend, and organic impressions for the pages the links are pointing to. The clearest signal is when a target page that has been stuck on page two starts moving to positions four through six — that movement usually correlates with new high-authority links indexing. We report on all three in monthly updates.'
      },
    ],
    cards: [
      {
        number: '01',
        title: 'Authority & Link Building',
        desc: 'Your site has clean content and solid technical SEO, but competitors with weaker pages outrank you because they have more authoritative sites linking to them. We earn editorial backlinks through manual outreach — no link farms, no paid placements.',
        links: [
          { href: '/relations/authority-building-agency', label: 'Editorial link outreach' },
          { href: '/relations/authority-building-agency', label: 'Competitor backlink audits' },
          { href: '/relations/authority-building-agency', label: 'Domain authority strategy' },
        ],
        href: '/relations/authority-building-agency',
      },
      {
        number: '02',
        title: 'Digital PR & Media Outreach',
        desc: 'Journalists cover companies they\'ve heard of. If your brand never appears in the outlets your buyers read, you\'re invisible when it matters most. We pitch and place stories that generate press coverage and the editorial links that compound authority over time.',
        links: [
          { href: '/relations/digital-pr-media-outreach-agency', label: 'Media pitch campaigns' },
          { href: '/relations/digital-pr-media-outreach-agency', label: 'Press release distribution' },
          { href: '/relations/digital-pr-media-outreach-agency', label: 'Journalist relationships' },
        ],
        href: '/relations/digital-pr-media-outreach-agency',
      },
    ],
  },
};

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M7 7C7 6.44772 7.44772 6 8 6H17C17.5523 6 18 6.44772 18 7V16C18 16.5523 17.5523 17 17 17C16.4477 17 16 16.5523 16 16V9.41421L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L14.5858 8H8C7.44772 8 7 7.55228 7 7Z" fill="currentColor"/>
  </svg>
);

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: '1px solid #e5e7eb' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.5rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1.5rem',
        }}
        aria-expanded={open}
      >
        <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>{q}</span>
        <span style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
          {open
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          }
        </span>
      </button>
      {open && (
        <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.75, paddingBottom: '1.5rem', maxWidth: '72ch' }}>{a}</p>
      )}
    </div>
  );
}

interface CategoryPageProps {
  category: 'creativity' | 'performance' | 'relations';
}

export default function CategoryPage({ category }: CategoryPageProps) {
  const cfg = CATEGORIES[category];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <style>{`
        .cat-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start; }
        .cat-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
        .cat-cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid #e5e7eb; }
        .cat-card { padding: 3rem; display: flex; flex-direction: column; justify-content: space-between; min-height: 420px; }
        @media (max-width: 900px) {
          .cat-intro-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .cat-stats-grid { grid-template-columns: 1fr; }
          .cat-stats-grid > div { border-left: none !important; border-top: 1px solid #e5e7eb; padding: 2.5rem 1.5rem; }
          .cat-stats-grid > div:first-child { border-top: none; }
          .cat-cards-grid { grid-template-columns: 1fr; }
          .cat-card { border-right: none !important; border-bottom: 1px solid #e5e7eb !important; min-height: auto; padding: 2.5rem 1.5rem; }
          .cat-card:last-child { border-bottom: none !important; }
        }
        @media (min-width: 901px) and (max-width: 1100px) {
          .cat-cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
      <SiteHeader />

      {/* Hero — fullscreen video on desktop, native 16:9 on mobile (video is 16:9; a 9:16 viewport would crop it to a sliver) */}
      <section className="relative w-full aspect-video md:aspect-auto md:h-screen md:min-h-[600px] overflow-hidden bg-black">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={cfg.video}
        />
        <div className="absolute inset-0 z-10 bg-black/40" />
        <div className="absolute bottom-4 md:bottom-10 z-20" style={{ left: '5vw' }}>
          <span className="text-white/60 text-xs font-mono uppercase tracking-[0.2em] block">{cfg.label}</span>
        </div>
      </section>

      {/* Intro — 50/50 */}
      <section className="border-b border-gray-200 bg-white" style={{ padding: '6rem 5vw' }}>
        <div className="cat-intro-grid">
          <div>
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-4">{cfg.label} overview</span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#111827' }}>
              {cfg.heading}
            </h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2rem' }}>
            <p style={{ color: '#4b5563', fontSize: '1.125rem', lineHeight: 1.75 }}>{cfg.introParagraph}</p>
            <div>
              <ol style={{ listStyleType: 'decimal', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                {cfg.services.map(s => (
                  <li key={s.href}>
                    <a href={s.href} style={{ color: '#374151', fontSize: '0.95rem', textDecoration: 'underline', textUnderlineOffset: '4px', textDecorationColor: '#d1d5db' }}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
              <a href={cfg.introLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', fontWeight: 600, color: '#111827', borderBottom: '2px solid #111827', paddingBottom: '2px' }}>
                More about us <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-gray-200 bg-white">
        <div className="cat-stats-grid">
          {[cfg.stat1, cfg.stat2, cfg.stat3].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '4rem 2rem', borderLeft: i > 0 ? '1px solid #e5e7eb' : 'none' }}>
              <div style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)', fontWeight: 300, lineHeight: 1, color: '#111827', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.75rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Service cards */}
      <section className="border-b border-gray-200 bg-white" style={{ padding: '6rem 5vw' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">What we do</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' }}>
            {cfg.label} services
          </h2>
        </div>

        <div className="cat-cards-grid">
          {cfg.cards.map((card, i) => (
            <div
              key={card.number}
              className="cat-card"
              style={{
                borderRight: (i + 1) % 3 !== 0 ? '1px solid #e5e7eb' : 'none',
                borderBottom: i < cfg.cards.length - (cfg.cards.length % 3 || 3) ? '1px solid #e5e7eb' : 'none',
              }}
            >
              <div>
                <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>{card.number}</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#111827', marginBottom: '1rem', letterSpacing: '-0.01em' }}>{card.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{card.desc}</p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {card.links.map((l, li) => (
                    <li key={`${l.href}-${li}`}>
                      <a href={l.href} style={{ color: '#4b5563', fontSize: '0.8rem', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: '#d1d5db' }}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <a href={card.href} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 500, color: '#374151', borderBottom: '1px solid #d1d5db', paddingBottom: '2px', marginTop: '2rem' }}>
                Find more <ArrowIcon />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="border-b border-gray-200 bg-white" style={{ padding: '6rem 5vw' }}>
        <div style={{ maxWidth: '860px' }}>
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">Common questions</span>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '3rem' }}>
            Things clients ask before they start
          </h2>
          <div>
            {cfg.faqs.map((item, i) => (
              <React.Fragment key={i}><FaqItem q={item.q} a={item.a} /></React.Fragment>
            ))}
            <div style={{ borderTop: '1px solid #e5e7eb' }} />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
