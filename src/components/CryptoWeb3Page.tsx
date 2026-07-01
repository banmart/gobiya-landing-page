import React, { useEffect, useState } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import HeroQuickForm from './HeroQuickForm';
import ContentCta from './ContentCta';

const SERVICES = [
  {
    n: '01',
    title: 'Smart Contract Development',
    body: 'Audited Solidity and Vyper contracts for token launches, staking protocols, NFT minting, and DAO governance. Written for gas efficiency, upgradability, and security — not just functionality.',
  },
  {
    n: '02',
    title: 'Web3 Interface & dApp Development',
    body: 'React-based decentralized application frontends with wallet connection (MetaMask, WalletConnect), live on-chain data reads, and transaction signing flows that work across mobile and desktop.',
  },
  {
    n: '03',
    title: 'Pulsechain & Ethereum Deployment',
    body: 'Contract deployment and verification on Ethereum mainnet, Pulsechain, and EVM-compatible L2s. We bridge the gap between chain selection, testnet validation, and production launch.',
  },
  {
    n: '04',
    title: 'Crypto SEO & Discoverability',
    body: 'Keyword architecture, on-page optimization, and AI-citation content built around how investors search: "best DeFi protocols", "Pulsechain projects", "how to stake [token]". Organic discoverability compounds where paid ads cannot run.',
  },
  {
    n: '05',
    title: 'Web3 Content & GEO Writing',
    body: 'Long-form educational content written to rank in Google and be cited by ChatGPT, Perplexity, and AI Overviews. Tokenomics explainers, protocol comparisons, staking guides, and whitepaper-level editorial.',
  },
  {
    n: '06',
    title: 'Project Marketing & Launch Strategy',
    body: 'Pre-launch visibility architecture: landing page, SEO foundation, content calendar, and community funnel — built before TGE so the project has search equity and organic traffic on day one.',
  },
];

const STEPS = [
  'Discovery: chain selection, contract requirements, SEO keyword targets, and launch timeline scoped together — not in separate silos',
  'Architecture: smart contract structure, dApp component map, and content cluster designed in parallel before any build begins',
  'Contract development: Solidity / EVM contract written, unit tested on testnet, and reviewed for common vulnerabilities (reentrancy, overflow, access control)',
  'Frontend build: React dApp with wallet integration, on-chain state reads, and transaction flows verified across wallets and devices',
  'SEO foundation: title tags, structured data, internal link architecture, and pillar page live before the contract deploys',
  'Launch & growth: contract verified on Etherscan / PulseScan, site indexed, content publishing cadence active — organic traffic building from day one',
];

const STATS = [
  { val: 'EVM', label: 'Ethereum, Pulsechain, and L2-compatible builds' },
  { val: 'Full stack', label: 'Contract + dApp + SEO — one agency, no coordination gap' },
  { val: '2010', label: 'Founded — agency track record behind every Web3 engagement' },
];

const FAQS = [
  {
    q: 'What chains do you build on?',
    a: 'We build primarily on Ethereum mainnet and Pulsechain, with experience across EVM-compatible networks including Polygon, Base, Arbitrum, and BNB Smart Chain. Chain selection is part of the discovery process — we help you weigh gas costs, ecosystem liquidity, and your target community before committing to a deployment chain.',
  },
  {
    q: 'Can you build and market a project at the same time?',
    a: 'Yes — and that coordination advantage is the reason clients come to us instead of separate dev and marketing shops. The SEO content architecture, landing page structure, and keyword strategy are built in parallel with the contract so the project has organic search visibility on launch day, not six months later. TheARKCrypto.com is an example of a live Pulsechain project we built and deployed end-to-end.',
  },
  {
    q: 'How do you handle smart contract security?',
    a: 'All contracts go through testnet deployment and unit testing before mainnet. We follow established patterns to avoid the most common attack vectors — reentrancy, integer overflow, access control gaps, and unchecked external calls. For high-value or high-complexity contracts (large staking pools, protocol treasuries), we recommend a third-party audit and can coordinate that as part of the engagement.',
  },
  {
    q: 'Why does a crypto project need SEO if we have a community on Telegram and Twitter?',
    a: 'Community channels are high-velocity but low-permanence — content disappears in 24 hours and requires constant posting to stay visible. SEO compounds: a well-optimized article explaining your protocol ranks for months and captures investors who are in research mode, not community mode. That is the highest-intent user in the funnel. Crypto projects that neglect search are invisible to investors who do not already know the project name — which is most of them.',
  },
  {
    q: 'What is TheARKCrypto.com and can I see it?',
    a: 'TheARKCrypto.com is a live Pulsechain project we built and deployed — smart contract, Web3 dApp interface, and site. It demonstrates what a production-quality crypto web build looks like from our shop. It is live on Pulsechain mainnet.',
  },
  {
    q: 'Do you write whitepapers and tokenomics documentation?',
    a: 'Yes. Whitepaper writing, tokenomics modeling writeups, one-pagers, and technical documentation are part of our Web3 content service. This material serves double duty: it builds investor trust and, when properly structured and published on the web, contributes to SEO authority and AI citation signals for the project name and protocol mechanics.',
  },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.gobiya.com/#organization',
      name: 'Gobiya',
      url: 'https://www.gobiya.com',
      telephone: '(323) 744-1338',
      email: 'hello@gobiya.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '8484 Wilshire Blvd, Suite 515',
        addressLocality: 'Beverly Hills',
        addressRegion: 'CA',
        postalCode: '90211',
        addressCountry: 'US',
      },
      foundingDate: '2010',
      description: 'Los Angeles crypto marketing, Web3 development, and smart contract agency. Smart contracts on Ethereum and Pulsechain, dApp interfaces, and SEO for crypto and DeFi projects.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Crypto & Web3 Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Smart Contract Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web3 dApp Interface Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pulsechain & Ethereum Deployment' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Crypto SEO & Discoverability' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web3 Content & GEO Writing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Crypto Project Marketing & Launch Strategy' } },
        ],
      },
    },
    {
      '@type': 'Service',
      name: 'Crypto & Web3 Marketing Agency Los Angeles',
      provider: { '@id': 'https://www.gobiya.com/#organization' },
      areaServed: { '@type': 'City', name: 'Los Angeles' },
      description: 'Smart contract development, Web3 dApp interfaces, Pulsechain and Ethereum deployment, and crypto SEO for DeFi projects, token launches, and NFT platforms.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: '1px solid #e5e7eb' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1.5rem' }}
        aria-expanded={open}
      >
        <span style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>{q}</span>
        <span style={{ flexShrink: 0, color: '#6b7280', fontSize: '1.2rem', lineHeight: 1 }}>{open ? '−' : '+'}</span>
      </button>
      {open && <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.75, paddingBottom: '1.5rem', maxWidth: '72ch' }}>{a}</p>}
    </div>
  );
}

export default function CryptoWeb3Page() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <SiteHeader />

      {/* ── HERO ── */}
      <section style={{ background: '#ffffff', padding: 'clamp(7rem,15vw,13rem) 5vw 5rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 480px', minWidth: 0 }}>
            <nav style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</a>
              <span>/</span>
              <a href="/creativity" style={{ color: '#9ca3af', textDecoration: 'none' }}>Creativity</a>
              <span>/</span>
              <span style={{ color: '#374151' }}>Crypto &amp; Web3</span>
            </nav>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', maxWidth: '920px', marginBottom: '1.5rem' }}>
              Crypto marketing, smart contracts, and Web3 development — built to launch and rank.
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.75, maxWidth: '640px', marginBottom: '2rem' }}>
              Gobiya is a Los Angeles Web3 agency founded in 2010 that builds smart contracts on Ethereum and Pulsechain, develops dApp interfaces, and produces crypto SEO content that ranks in Google and gets cited by AI. TheARKCrypto.com is a live Pulsechain project we built end-to-end — contract, dApp, and site.
            </p>
            {/* Chain / tech chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0' }}>
              {['ETHEREUM', 'PULSECHAIN', 'EVM COMPATIBLE', 'SOLIDITY', 'REACT DAPPS', 'WALLETCONNECT', 'CRYPTO SEO', 'WEB3 CONTENT'].map(tag => (
                <span key={tag} style={{ fontFamily: 'monospace', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.14em', border: '1px solid #d1d5db', color: '#6b7280', padding: '0.3rem 0.75rem', borderRadius: '2px' }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 460px', maxWidth: '560px' }}>
            <HeroQuickForm source="Crypto & Web3" variant="light" heading="Start a Web3 project" subheading="Tell us about your contract, dApp, or launch — we'll respond quickly." />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
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

      {/* ── DARK FEATURE: THE ARK ── */}
      <section style={{ background: '#0d0d0d', padding: '5rem 5vw', borderBottom: '1px solid #1f2937', position: 'relative', overflow: 'hidden' }}>
        {/* background video loop */}
        <video
          autoPlay muted loop playsInline
          src="/videos/ark------final-----01.webm"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18, pointerEvents: 'none' }}
          preload="metadata"
        />
        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center', maxWidth: '1200px' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#6b7280', display: 'block', marginBottom: '1rem' }}>Live reference build</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#ffffff', marginBottom: '1.5rem' }}>
              TheARKCrypto.com — deployed on Pulsechain mainnet.
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '520px' }}>
              A production Pulsechain project built end-to-end by Gobiya: smart contract, Web3 dApp interface with live wallet connection, and a full marketing site. Not a mockup — live on mainnet.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {['Smart contract', 'Pulsechain mainnet', 'Wallet connect', 'AI video brand film', 'SEO foundation'].map(tag => (
                <span key={tag} style={{ fontFamily: 'monospace', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', border: '1px solid #374151', color: '#9ca3af', padding: '0.3rem 0.75rem', borderRadius: '2px' }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ border: '1px solid #1f2937', padding: '2.5rem', background: 'rgba(255,255,255,0.03)' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#4b5563', display: 'block', marginBottom: '1.5rem' }}>Build scope</span>
            {[
              ['Contract', 'EVM / Pulsechain — Solidity, tested & verified'],
              ['Frontend', 'React dApp with MetaMask + WalletConnect'],
              ['Brand', 'AI video brand film (Veo 3), site design, copy'],
              ['SEO', 'On-page optimization, schema markup, content'],
              ['Chain', 'Pulsechain mainnet — PulseScan verified'],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '2rem', padding: '1rem 0', borderBottom: '1px solid #1f2937' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#4b5563', flexShrink: 0 }}>{label}</span>
                <span style={{ fontSize: '0.85rem', color: '#d1d5db', textAlign: 'right', lineHeight: 1.5 }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>What we build</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' }}>
            Six disciplines — contracts, interfaces, and search visibility
          </h2>
        </div>
        <div className="rg-services" style={{ border: '1px solid #e5e7eb', background: '#e5e7eb', gap: '1px' }}>
          {SERVICES.map(s => (
            <div key={s.n} style={{ background: '#ffffff', padding: '2.5rem' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>{s.n}</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY CRYPTO NEEDS SEO ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>Why it matters</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              Community is fast. Search is permanent.
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Twitter posts and Telegram messages have a 24-hour half-life. A well-optimized article explaining your protocol's staking mechanics ranks for 18 months and captures investors in research mode — the highest-intent users in the funnel.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Most crypto projects never build search equity because paid ads for financial products face platform restrictions. Organic is one of the few acquisition channels that scales without constant spend — and compounds once it's established.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.8 }}>
              We build that foundation before your token launches, not six months after.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { label: 'Community', val: '24h', note: 'Content visibility half-life on social channels' },
              { label: 'Paid ads', val: 'Restricted', note: 'Financial product ad policies on Google, Meta, Twitter' },
              { label: 'Organic SEO', val: '18+ mo', note: 'Compounding traffic from a single well-optimized article' },
              { label: 'AI citation', val: 'Permanent', note: 'Protocol explanations cited by ChatGPT & Perplexity indefinitely' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '2rem', padding: '1.5rem 0', borderBottom: '1px solid #e5e7eb', alignItems: 'start' }}>
                <div>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', display: 'block', marginBottom: '0.4rem' }}>{row.label}</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' }}>{row.val}</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.65, paddingTop: '0.2rem' }}>{row.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContentCta headline="Ready to build and launch your Web3 project?" sub="Contract, dApp, and search visibility — scoped in one call." accent="#111827" background="#f9fafb" />

      {/* ── PROCESS ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '6rem' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>How we build</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.15 }}>
              Contract to indexed site in 6 stages
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

      {/* ── FAQ ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>FAQ</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' }}>
              Common questions about crypto development and Web3 marketing
            </h2>
          </div>
          <div>
            {FAQS.map((f, i) => <React.Fragment key={i}><FaqItem q={f.q} a={f.a} /></React.Fragment>)}
            <div style={{ borderTop: '1px solid #e5e7eb' }} />
          </div>
        </div>
      </section>

      <ContentCta headline="Let's build your Web3 project." sub="Smart contracts, dApp interface, and search visibility — delivered together." accent="#111827" background="#f9fafb" />

      <SiteFooter />
    </div>
  );
}
