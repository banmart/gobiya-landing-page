import React from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import LatestInsights from './LatestInsights';

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
}

const CATEGORIES: Record<string, CategoryConfig> = {
  creativity: {
    label: 'Creativity',
    heading: 'Express your brand identity and capture market attention.',
    introParagraph: 'We bring together designers, strategists, writers, and directors to develop creative outputs that are not just visually compelling but strategically positioned to drive business outcomes. Every creative decision is grounded in audience insight, competitive analysis, and brand positioning.',
    introLink: '/about',
    stat1: { value: '5+', label: 'Brand systems delivered' },
    stat2: { value: '100%', label: 'Custom — no templates' },
    stat3: { value: '3×', label: 'Avg. engagement lift' },
    video: '/videos/rollb.webm',
    services: [
      { href: '/creativity/brand-identity-strategy-agency', label: 'Brand Identity Strategy' },
      { href: '/creativity/communication-concepts-agency', label: 'Communication Concepts' },
      { href: '/creativity/seo-web-copywriting-agency', label: 'SEO & Web Copywriting' },
      { href: '/creativity/creative-art-direction-agency', label: 'Creative Art Direction' },
      { href: '/creativity/social-media-management-agency', label: 'Social Media Management' },
    ],
    cards: [
      {
        number: '01',
        title: 'Brand Identity Strategy',
        desc: 'We define the unique essence, voice, and visual character of your business — logo, typography, colour palette, and a brand manual to guide all communications.',
        links: [
          { href: '/creativity/brand-identity-strategy-agency', label: 'Visual identity systems' },
          { href: '/creativity/brand-identity-strategy-agency', label: 'Brand voice & tone' },
          { href: '/creativity/brand-identity-strategy-agency', label: 'Brand guidelines' },
        ],
        href: '/creativity/brand-identity-strategy-agency',
      },
      {
        number: '02',
        title: 'Communication Concepts',
        desc: 'We translate complex business objectives into clear, compelling communication that resonates with the people who matter most to your growth — across every channel.',
        links: [
          { href: '/creativity/communication-concepts-agency', label: 'Campaign concepts' },
          { href: '/creativity/communication-concepts-agency', label: 'Messaging architecture' },
          { href: '/creativity/communication-concepts-agency', label: 'Multichannel narratives' },
        ],
        href: '/creativity/communication-concepts-agency',
      },
      {
        number: '03',
        title: 'SEO & Web Copywriting',
        desc: 'We write content that engages human readers and ranks in search algorithms — from landing pages and service copy to long-form editorial that builds authority.',
        links: [
          { href: '/creativity/seo-web-copywriting-agency', label: 'SEO landing pages' },
          { href: '/creativity/seo-web-copywriting-agency', label: 'Editorial content' },
          { href: '/creativity/seo-web-copywriting-agency', label: 'Email & ad copy' },
        ],
        href: '/creativity/seo-web-copywriting-agency',
      },
      {
        number: '04',
        title: 'Creative Art Direction',
        desc: 'We coordinate styling, imagery, layout, and motion across all your digital and print assets — ensuring every touchpoint expresses your brand with clarity and impact.',
        links: [
          { href: '/creativity/creative-art-direction-agency', label: 'Photo & video direction' },
          { href: '/creativity/creative-art-direction-agency', label: 'Digital asset production' },
          { href: '/creativity/creative-art-direction-agency', label: 'Motion & animation' },
        ],
        href: '/creativity/creative-art-direction-agency',
      },
      {
        number: '05',
        title: 'Social Media Management',
        desc: 'We grow active community loops around your core brand message — content calendars, community management, and performance analytics across every platform.',
        links: [
          { href: '/creativity/social-media-management-agency', label: 'Content strategy' },
          { href: '/creativity/social-media-management-agency', label: 'Community management' },
          { href: '/creativity/social-media-management-agency', label: 'Platform analytics' },
        ],
        href: '/creativity/social-media-management-agency',
      },
    ],
  },

  performance: {
    label: 'Performance',
    heading: 'Engineer high-speed digital pipelines to scale conversions.',
    introParagraph: 'Performance is a system, not a set of isolated tactics. We align your technical infrastructure, paid channels, organic search signals, and conversion architecture into a single, coordinated growth engine — designed to generate predictable, compounding pipeline.',
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
    ],
    cards: [
      {
        number: '01',
        title: 'SEO & Discoverability',
        desc: 'We align your technical architecture with modern search intent — Core Web Vitals, semantic schema, entity structure, and crawl optimization for sustained organic growth.',
        links: [
          { href: '/performance/seo-discoverability-agency', label: 'Technical SEO audits' },
          { href: '/performance/seo-discoverability-agency', label: 'Entity & schema markup' },
          { href: '/performance/seo-discoverability-agency', label: 'Core Web Vitals' },
        ],
        href: '/performance/seo-discoverability-agency',
      },
      {
        number: '02',
        title: 'Web & IT Development',
        desc: 'We build custom React, Next.js, and Vite applications with zero templates — engineered for sub-second load times, native CRM integration, and complete data ownership.',
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
        desc: 'We architect hyper-targeted paid acquisition campaigns with rigorous attribution, conversion tracking, and continuous bid optimization to maximize return on ad spend.',
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
        desc: 'We isolate friction in your conversion funnel using heatmaps, session recordings, and A/B tests — then redesign the flows that move visitors to customers.',
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
        desc: 'We deploy secure custom LLM integrations and automated workflows that eliminate daily friction — using open-weight and API-based models with full data sovereignty.',
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
    heading: 'Construct sector authority and earn absolute market trust.',
    introParagraph: 'Building digital authority is an active, ongoing process. We connect your brand with the external signals — media coverage, backlinks, citations, and community presence — that establish genuine credibility. These signals compound over time, becoming more valuable with each passing month.',
    introLink: '/about',
    stat1: { value: '300+', label: 'Placements secured' },
    stat2: { value: 'DR 50+', label: 'Avg. domain rating of links' },
    stat3: { value: '12mo', label: 'Avg. authority build cycle' },
    video: '/videos/rollb.webm',
    services: [
      { href: '/relations/authority-building-agency', label: 'Authority & Link Building' },
      { href: '/relations/digital-pr-media-outreach-agency', label: 'Digital PR & Media Outreach' },
      { href: '/relations/content-marketing-syndication-agency', label: 'Content Marketing Syndication' },
      { href: '/relations/influencer-marketing-agency', label: 'Influencer Marketing' },
      { href: '/relations/local-community-relations-agency', label: 'Local Community Relations' },
    ],
    cards: [
      {
        number: '01',
        title: 'Authority & Link Building',
        desc: 'We earn high-quality contextual backlinks from authoritative industry domains through manually verified outreach — no link farms, no paid placements, no shortcuts.',
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
        desc: 'We pitch compelling stories to top-tier journalists and media outlets — securing editorial coverage that builds brand recognition and generates lasting authority signals.',
        links: [
          { href: '/relations/digital-pr-media-outreach-agency', label: 'Media pitch campaigns' },
          { href: '/relations/digital-pr-media-outreach-agency', label: 'Press release distribution' },
          { href: '/relations/digital-pr-media-outreach-agency', label: 'Journalist relationships' },
        ],
        href: '/relations/digital-pr-media-outreach-agency',
      },
      {
        number: '03',
        title: 'Content Marketing Syndication',
        desc: 'We create high-value research, guides, and analysis — then distribute them across industry publications and aggregators that extend your reach and build external link signals.',
        links: [
          { href: '/relations/content-marketing-syndication-agency', label: 'Topic cluster architecture' },
          { href: '/relations/content-marketing-syndication-agency', label: 'Syndication networks' },
          { href: '/relations/content-marketing-syndication-agency', label: 'Long-form editorial' },
        ],
        href: '/relations/content-marketing-syndication-agency',
      },
      {
        number: '04',
        title: 'Influencer Marketing',
        desc: 'We identify creators whose audience demographics and engagement patterns genuinely align with your brand — managing campaigns from brief to post-campaign analysis.',
        links: [
          { href: '/relations/influencer-marketing-agency', label: 'Creator research & vetting' },
          { href: '/relations/influencer-marketing-agency', label: 'Campaign management' },
          { href: '/relations/influencer-marketing-agency', label: 'Performance reporting' },
        ],
        href: '/relations/influencer-marketing-agency',
      },
      {
        number: '05',
        title: 'Local Community Relations',
        desc: 'We optimize your regional citation footprint, Google Business Profile, and map pack signals — while building community positioning through local partnerships and press.',
        links: [
          { href: '/relations/local-community-relations-agency', label: 'Google Business Profile' },
          { href: '/relations/local-community-relations-agency', label: 'Local citation audit' },
          { href: '/relations/local-community-relations-agency', label: 'Community partnership' },
        ],
        href: '/relations/local-community-relations-agency',
      },
    ],
  },
};

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M7 7C7 6.44772 7.44772 6 8 6H17C17.5523 6 18 6.44772 18 7V16C18 16.5523 17.5523 17 17 17C16.4477 17 16 16.5523 16 16V9.41421L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L14.5858 8H8C7.44772 8 7 7.55228 7 7Z" fill="currentColor"/>
  </svg>
);

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

      {/* Hero — fullscreen video */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black">
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={cfg.video}
        />
        <div className="absolute inset-0 z-10 bg-black/40" />
        <div className="absolute bottom-10 z-20" style={{ left: '5vw' }}>
          <span className="text-white/60 text-xs font-mono uppercase tracking-[0.2em] block">{cfg.label}</span>
        </div>
      </section>

      {/* Intro — 50/50 */}
      <section className="border-b border-gray-200 bg-white" style={{ padding: '6rem 5vw' }}>
        <div className="cat-intro-grid">
          <div>
            <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-4">{cfg.label} overview</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#111827' }}>
              {cfg.heading}
            </h2>
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
                  {card.links.map(l => (
                    <li key={l.href}>
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

      {/* Latest Insights */}
      <LatestInsights />

      <SiteFooter />
    </div>
  );
}
