import React, { useState, useRef } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import HeroQuickForm from './HeroQuickForm';
import ContentCta from './ContentCta';

// ── Video catalogue ──────────────────────────────────────────────────────────
const VIDEOS = [
  {
    src: '/videos/space-girl.webm',
    title: 'Space Girl — Webpage Section Background',
    category: 'Web Background · Veo 3',
    desc: 'AI-generated cinematic loop used as a full-bleed section background. Replaces static imagery with motion — no camera crew, no stock license, no compression artifacts.',
    format: 'Web Background',
  },
  {
    src: '/videos/gobiyaRace.webm',
    title: 'The Race — Gobiya Home Hero Background',
    category: 'Hero Background · Veo 3',
    desc: 'The video running behind the Gobiya homepage hero. High-contrast motion that holds behind overlaid text — generated with Veo 3 and cut to loop seamlessly at 16:9.',
    format: 'Hero Background',
  },
  {
    src: '/videos/caveman.webm',
    title: 'RemodelMePros — YouTube Pre-Roll',
    category: 'YouTube Pre-Roll · Google Omni',
    desc: 'A 30-second pre-roll ad produced for a home remodeling client. Hook-first structure engineered to hold attention past the 5-second skip threshold on YouTube.',
    format: 'YouTube Pre-Roll',
  },
  {
    src: '/videos/ark------final-----01.webm',
    title: 'The ARK — Website Hero Background',
    category: 'Hero Background · Veo 3',
    desc: 'Full-bleed hero video produced for The ARK Crypto. Broadcast-quality motion delivered without a production crew — AI scriptwriting, AI visuals, three-day turnaround.',
    format: 'Hero Background',
  },
];

// ── Capability list ──────────────────────────────────────────────────────────
const CAPABILITIES = [
  {
    n: '01',
    title: 'AI Script & Concept Development',
    body: 'Every video starts with a brief. We use AI-assisted scriptwriting to develop concepts, dialogue, voiceover scripts, and scene-by-scene shot lists aligned to your brand voice and conversion objective.',
  },
  {
    n: '02',
    title: 'Text-to-Voice & AI Voiceover',
    body: 'Professional-quality AI voiceover using ElevenLabs, Google text-to-speech, and OpenAI TTS models. We match tone, pacing, and accent to your brand — no voice actor scheduling, no studio booking.',
  },
  {
    n: '03',
    title: 'Veo 3 & Google Omni Video Generation',
    body: 'We generate video using Google Veo 3 and Google Omni — the most capable AI video generation models available. Cinematic motion, realistic lighting, and coherent scene continuity at scale.',
  },
  {
    n: '04',
    title: 'YouTube Pre-Roll Ad Production',
    body: 'We produce 6-second bumpers, 15-second skippable ads, and 30-second non-skippable spots formatted for Google Ads / YouTube campaigns — with hooks engineered to beat the 5-second skip threshold.',
  },
  {
    n: '05',
    title: 'Connected TV: Amazon Prime & Paramount+',
    body: 'We produce 15- and 30-second spots formatted for connected TV inventory on Amazon DSP, Paramount+ Advertising, Peacock, and Hulu — high-reach placements previously out of reach for SMBs.',
  },
  {
    n: '06',
    title: 'Social Video: Shorts, Reels & TikTok',
    body: 'Vertical-format AI video for YouTube Shorts, Instagram Reels, and TikTok. Fast iteration means you can test 5 creative angles in the time a traditional production takes to produce one.',
  },
];

// ── Process steps ────────────────────────────────────────────────────────────
const PROCESS = [
  'Brief: campaign objective, target audience, tone, and distribution channels',
  'Script & storyboard: AI-assisted concept, scene-by-scene shot list, and voiceover draft',
  'Voice generation: AI voiceover recorded, paced, and mixed with ambient audio',
  'Video generation: Veo 3 / Google Omni renders scenes from script and visual direction',
  'Edit & assembly: scenes cut, timed to voiceover, motion graphics and captions added',
  'Format export: delivered in all required aspect ratios (16:9, 9:16, 1:1) and specs',
];

// ── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'How is AI-generated video different from traditional video production?',
    a: 'Traditional video requires location scouting, casting, a production crew, shoot days, and post-production editing — a process that takes weeks and costs $10,000 to $100,000+ for a 30-second spot. AI video generation produces comparable visual quality in days, not months, at a fraction of the cost. The tradeoff is that complex live-action scenes with specific talent still benefit from traditional production. The sweet spot for AI video is concept-driven creative: brand storytelling, product visualizations, narrative ads, and high-volume social content.',
  },
  {
    q: 'What platforms can AI-generated video run on?',
    a: 'AI-generated video is indistinguishable from traditionally produced content on all major distribution platforms. We deliver ads formatted and spec-compliant for Google Ads (YouTube), Amazon DSP (Prime Video), Paramount+ Advertising, Hulu, Peacock, Meta Ads (Instagram/Facebook), TikTok, and YouTube Shorts. Each platform has specific requirements for resolution, bitrate, aspect ratio, and length — we handle all of that in the export process.',
  },
  {
    q: 'Can you produce a YouTube pre-roll ad that actually converts?',
    a: 'Yes. YouTube pre-roll conversion depends almost entirely on the first 5 seconds — the window before the skip button appears. We engineer the hook first: a visual or audio pattern interrupt that creates enough curiosity or relevance to keep the viewer watching. The script structure for a converting 30-second pre-roll is: hook (0–5s), problem or desire (5–12s), solution (12–22s), call to action (22–30s). AI scriptwriting lets us iterate on multiple hook variations quickly and test which performs.',
  },
  {
    q: 'What is the typical turnaround time for an AI video ad?',
    a: 'A single 30-second spot with one creative direction takes 3 to 5 business days from approved brief to delivered files. Multiple variations of the same concept (different hooks, different CTAs) can be produced concurrently. Traditional production for the same deliverable typically takes 4 to 8 weeks.',
  },
  {
    q: 'How does AI voiceover compare to a professional voice actor?',
    a: 'Modern AI voiceover models — particularly ElevenLabs and Google TTS — produce output that is statistically indistinguishable from human voice talent in blind tests for most use cases. For brand characters or campaigns requiring extreme specificity in delivery, a human voice actor remains the better choice. For most commercial applications — informational ads, product explainers, how-to content, and brand spots — AI voiceover delivers professional quality at zero casting or recording cost.',
  },
  {
    q: 'Do you also manage the Google Ads or YouTube campaign after producing the video?',
    a: 'Yes. Gobiya manages Google Ads and YouTube video campaigns as a separate service. We can produce the creative and run the campaign end-to-end — audience targeting, bid strategy, A/B creative testing, and performance reporting. Producing the video and running the ads under one roof eliminates the disconnect between creative and media buying that typically causes underperformance.',
  },
];

// ── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { val: '3–5 days', label: 'From brief to finished spot' },
  { val: '6 formats', label: 'Platform export specs covered' },
  { val: '90%+', label: 'Cost reduction vs. traditional production' },
];

// ── Schema ───────────────────────────────────────────────────────────────────
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
        streetAddress: '3580 Wilshire Blvd, Ste 132',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90010',
        addressCountry: 'US',
      },
    },
    {
      '@type': 'Service',
      name: 'AI Video Production Los Angeles',
      serviceType: 'AI Video Production',
      provider: { '@id': 'https://www.gobiya.com/#organization' },
      description: 'AI-generated video ads for YouTube pre-roll, Amazon Prime, Paramount+, and social media. Veo 3 video generation, AI scriptwriting, and text-to-voice production in Los Angeles.',
      url: 'https://www.gobiya.com/creativity/ai-videos-agency',
      areaServed: { '@type': 'City', name: 'Los Angeles', sameAs: 'https://www.wikidata.org/wiki/Q65' },
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

// ── Sub-components ───────────────────────────────────────────────────────────
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

function VideoCard({ video, index }: { video: typeof VIDEOS[0]; index: number }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #e5e7eb', background: '#ffffff', overflow: 'hidden' }}>
      {/* video wrapper */}
      <div
        style={{ position: 'relative', aspectRatio: '16/9', background: '#0f0f0f', cursor: 'pointer', overflow: 'hidden' }}
        onClick={toggle}
      >
        <video
          ref={ref}
          src={video.src}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {/* play / pause overlay */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: playing ? 'transparent' : 'rgba(0,0,0,0.35)',
          transition: 'background 0.2s',
        }}>
          {!playing && (
            <div style={{
              width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#111827">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
        </div>
        {/* format badge */}
        <span style={{
          position: 'absolute', top: '0.75rem', left: '0.75rem',
          fontFamily: 'monospace', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.12em',
          background: 'rgba(0,0,0,0.7)', color: '#ffffff', padding: '0.25rem 0.6rem', borderRadius: '2px',
        }}>
          {video.format}
        </span>
        {/* index */}
        <span style={{
          position: 'absolute', top: '0.75rem', right: '0.75rem',
          fontFamily: 'monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* meta */}
      <div style={{ padding: '1.5rem' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', display: 'block', marginBottom: '0.4rem' }}>
          {video.category}
        </span>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: '0.6rem', letterSpacing: '-0.01em' }}>{video.title}</h3>
        <p style={{ fontSize: '0.825rem', color: '#6b7280', lineHeight: 1.7 }}>{video.desc}</p>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AiVideosPage() {
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
              <span style={{ color: '#374151' }}>AI Videos</span>
            </nav>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', maxWidth: '920px', marginBottom: '1.5rem' }}>
              AI Video Production for YouTube Ads, CTV, and Social.
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.75, maxWidth: '640px', marginBottom: '2.5rem' }}>
              Gobiya is a Los Angeles AI video production agency, founded in 2010, that produces YouTube pre-roll ads, Amazon Prime Video spots, Paramount+ commercials, and social video using Veo 3, Google Omni, AI scriptwriting, and text-to-voice — delivered in 3 to 5 days.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {['Veo 3 Video Generation', 'Google Omni', 'AI Scriptwriting', 'Text-to-Voice', 'YouTube Pre-Roll', 'Amazon Prime Ads', 'Paramount+ Spots', 'YouTube Shorts'].map(tag => (
                <span key={tag} style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#374151', border: '1px solid #e5e7eb', padding: '0.3rem 0.75rem', borderRadius: '100px' }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 460px', maxWidth: '560px' }}>
            <HeroQuickForm source="AI Videos" variant="light" heading="Start an AI video project" subheading="Tell us about your campaign and we'll respond quickly." />
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

      {/* ── PROMO STRIP ── */}
      <div style={{ background: '#111827', borderBottom: '1px solid #1f2937', borderTop: '1px solid #1f2937', padding: '1.25rem 5vw', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#F26522' }}>Limited offer</span>
        <span style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.01em' }}>FREE AI Brand Video with a full website build.</span>
        <a href="/book" style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', borderBottom: '1px solid #374151', paddingBottom: '1px', textDecoration: 'none', flexShrink: 0 }}>Book a call →</a>
      </div>

      {/* ── VIDEO SHOWCASE ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#0f0f0f' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#4b5563', display: 'block', marginBottom: '0.5rem' }}>Production reel</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#ffffff' }}>
            AI-generated ads and brand films
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.75rem', maxWidth: '560px', lineHeight: 1.7 }}>
            Every video below was produced using AI video generation, AI scriptwriting, and AI voiceover — no camera crew, no studio, no 6-week production timeline.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 420px), 1fr))', gap: '1px', background: '#1f2937' }}>
          {VIDEOS.map((v, i) => (
            <React.Fragment key={v.src}><VideoCard video={v} index={i} /></React.Fragment>
          ))}
        </div>
      </section>

      {/* ── PLATFORMS BAND ── */}
      <section style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb', padding: '3rem 5vw' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1.5rem' }}>Distribution platforms</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {[
            'Google Ads / YouTube',
            'YouTube Pre-Roll',
            'YouTube Shorts',
            'Amazon Prime Video',
            'Amazon DSP',
            'Paramount+',
            'Hulu',
            'Peacock',
            'Instagram Reels',
            'TikTok',
            'Facebook Video',
            'Connected TV (CTV)',
          ].map(p => (
            <span key={p} style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#374151', border: '1px solid #d1d5db', background: '#ffffff', padding: '0.5rem 1rem', borderRadius: '2px' }}>{p}</span>
          ))}
        </div>
      </section>

      <ContentCta headline="Ready to produce your first AI video ad?" sub="Our team responds within one business day." accent="#111827" background="#ffffff" />

      {/* ── CAPABILITIES GRID ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>What we build</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' }}>
            Six AI video production capabilities
          </h2>
        </div>
        <div className="rg-services" style={{ border: '1px solid #e5e7eb', background: '#e5e7eb', gap: '1px' }}>
          {CAPABILITIES.map(s => (
            <div key={s.n} style={{ background: '#ffffff', padding: '2.5rem' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>{s.n}</span>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>How it works</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.25rem' }}>
              From brief to broadcast-ready in 3–5 days
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.75 }}>
              Traditional video production involves location scouts, casting calls, production crews, shoot days, and a 4–8 week post-production window. Our AI video pipeline compresses that into a deterministic 6-step process that delivers broadcast-quality output in days — and makes iteration fast enough to actually test creative variations.
            </p>
          </div>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {PROCESS.map((step, i) => (
              <li key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', padding: '1.25rem 0', borderBottom: i < PROCESS.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#9ca3af', flexShrink: 0, marginTop: '0.1rem', minWidth: '1.5rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.65 }}>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .ai-process-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          }
        `}</style>
      </section>

      {/* ── WHY AI VIDEO NOW ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#0f0f0f' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#4b5563', display: 'block', marginBottom: '0.5rem' }}>Why now</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '2rem' }}>
            The cost of video advertising just dropped 90%
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              {
                heading: 'Google Veo 3 changed the production floor',
                body: 'Google\'s Veo 3 model generates cinematic video from text prompts with coherent motion, realistic lighting, and scene continuity that previous models could not achieve. Combined with Google Omni\'s multimodal generation, it is now possible to produce a broadcast-quality 30-second spot from a creative brief in a single day.',
              },
              {
                heading: 'CTV inventory is now accessible to SMBs',
                body: 'Amazon Prime Video and Paramount+ opened self-serve advertising to smaller budgets in 2023–2024. The barrier to CTV was always production cost — a $50,000 spot to run on a $5,000 budget made no sense. At AI production rates, the math inverts: high-quality creative at low cost makes CTV viable for businesses that never considered it.',
              },
              {
                heading: 'YouTube rewards creative iteration',
                body: 'Google\'s Video Reach Campaigns and Demand Gen campaigns reward advertisers who test multiple creative variations. AI video production makes it economically feasible to test 5 versions of a hook, 3 CTAs, and 2 audience angles simultaneously — which is exactly what the algorithm rewards with lower CPMs and higher reach.',
              },
            ].map((item, i) => (
              <div key={i} style={{ borderTop: '1px solid #1f2937', paddingTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.6rem' }}>{item.heading}</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.75 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>FAQ</span>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' }}>
              Common questions about AI video production
            </h2>
          </div>
          <div>
            {FAQS.map((f, i) => <React.Fragment key={i}><FaqItem q={f.q} a={f.a} /></React.Fragment>)}
            <div style={{ borderTop: '1px solid #e5e7eb' }} />
          </div>
        </div>
      </section>

      <ContentCta headline="Let's produce your AI video campaign." sub="Brief us today — first spot delivered in 3–5 days." accent="#111827" background="#f9fafb" />

      <SiteFooter />
    </div>
  );
}
