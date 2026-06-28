import React, { useEffect } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const SPOKES = [
  {
    title: 'Technical SEO Audit',
    query: '"technical seo audit agency"',
    href: '/performance/technical-seo-audit-agency',
    desc: 'Full crawl health diagnostic, Core Web Vitals, structured data, and a ranked fix list scoped by ranking impact — not a generic checklist.',
  },
  {
    title: 'Google Penalty Recovery',
    query: '"google penalty recovery"',
    href: '/google-penalty-recovery',
    desc: 'Manual action removal, algorithmic suppression diagnosis, and Search Console reconsideration — the forensic path back from a confirmed penalty.',
  },
  {
    title: 'On-Page SEO',
    query: '"on page seo los angeles"',
    href: '/on-page-seo-los-angeles',
    desc: 'Entity structure, schema injection, heading hierarchy, and semantic content clustering — the page-level signals that directly determine rank.',
  },
  {
    title: 'Authority Building',
    query: '"authority building agency"',
    href: '/relations/authority-building-agency',
    desc: 'Editorial backlinks, structured citations, and entity alignment — the off-site repair work that makes a recovery hold across future updates.',
  },
];

const STATS = [
  { val: '−74%', label: 'Organic traffic an e-commerce client lost to the Helpful Content Update — fully recovered in six weeks' },
  { val: '9 days', label: 'From diagnosis to first deployed fix in one documented engagement, because the cause was known before anything was changed' },
  { val: '6 wks', label: 'Median time from forensic read to restored rankings across recovery engagements' },
];

const STEPS = [
  'Update mapping — the traffic curve is plotted against Google\'s full update history to identify the specific event responsible, not just the most recent one',
  'Cause classification — the hit is categorized: algorithmic suppression, manual action, technical regression, link devaluation, or content quality signal',
  'Fix specification — a correction plan is written before a single change is made, targeting only the signals responsible for the drop',
  'Deployment — content restructuring, technical corrections, and authority repair executed in one coordinated push',
  'Reconsideration filing — where a manual action is involved, the Search Console request is filed with a complete documented correction record',
  'Hold monitoring — weekly Search Console diagnostics and rank tracking until the recovery holds across multiple Google algorithm cycles',
];

const FAQ_ITEMS = [
  {
    q: 'Our traffic dropped 40% last month and we have no idea why. What is the first thing we should do?',
    a: 'The first step is matching the timing of the drop to the Google update calendar. Pull your Search Console data and overlay it against Google\'s confirmed update dates — most drops have a clear correlation to a specific rollout. If the timing aligns with a core update, content quality or authority signals are likely the cause. If it aligns with a technical update, look at crawl coverage and index status first. If there is no update correlation, check for site changes made around the same time. Diagnosis before any action is the rule — making changes before you know the cause is the most common reason recoveries drag on for months.',
  },
  {
    q: 'We have been ranking on page one for years. Now we are gone. Was it a penalty or an algorithm update?',
    a: 'A manual penalty leaves a notification in Google Search Console under Security & Manual Actions. If there is nothing there, it is almost certainly algorithmic. The distinction matters because the fixes are completely different. A manual action requires documenting the specific violation, correcting it, and filing a formal reconsideration request. An algorithmic suppression requires identifying the content or technical pattern that triggered the update and fixing the underlying signal. Treating an algorithmic drop like a manual penalty — or vice versa — is one of the main reasons recoveries fail.',
  },
  {
    q: 'We hired an SEO agency that made changes right before our traffic dropped. How do we know if they caused it?',
    a: 'Look at what changed and when. The most common agency-caused drops come from a few patterns: aggressive anchor text optimization that triggers a link quality evaluation, title tag rewrites that break SERP click-through and send negative engagement signals, bulk content publication on thin topics, or technical changes that created crawl errors or canonical conflicts. Pull Search Console\'s coverage report and compare the date of any coverage drops against the dates changes were deployed. If the timing aligns, that is your starting hypothesis. We run this forensic read as the first stage of every recovery engagement.',
  },
  {
    q: 'How long will it take to recover? We are losing real revenue every week.',
    a: 'Honest answer: it depends on the cause. Technical recoveries — crawl errors, index exclusions, redirect failures — can show results in two to four weeks once fixed, because the issue is structural rather than a signal evaluation. Algorithmic suppressions tied to content quality typically take one to two Google update cycles to reverse after the fix is deployed — that is three to six months at current update frequency. Manual action recoveries vary based on how long the reconsideration process takes, which Google controls. What we can compress is the time from diagnosis to first fix deployed. One documented engagement went from forensic read to deployed fix in nine days.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function SeoTrafficRecoveryPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <SiteHeader />

      {/* ── HERO ── */}
      <section style={{ background: '#ffffff', padding: '13rem 5vw 5rem', borderBottom: '1px solid #e5e7eb' }}>
        <nav style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <a href="/" style={{ color: '#9ca3af', textDecoration: 'none' }}>Home</a>
          <span>/</span>
          <a href="/performance" style={{ color: '#9ca3af', textDecoration: 'none' }}>Performance</a>
          <span>/</span>
          <span style={{ color: '#374151' }}>SEO Traffic Recovery</span>
        </nav>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', maxWidth: '920px', marginBottom: '1.5rem' }}>
          SEO Traffic Recovery
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', lineHeight: 1.75, maxWidth: '680px', marginBottom: '2.5rem' }}>
          SEO traffic recovery is the process of diagnosing exactly what caused an organic traffic drop — a Google algorithm update, a manual penalty, a technical error, or a competitive shift — and executing the specific fix that restores rankings. If you've lost traffic, the most common mistake is making changes before you know the cause. We run every recovery the same way: forensic read first, targeted fix second. That order is what compresses recovery from quarters to weeks. Our <a href="/performance/seo-discoverability-agency" style={{ color: 'var(--green)', textDecoration: 'none' }}>SEO &amp; Discoverability practice</a> is built entirely around this model.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="/book" className="btn btn-primary magnetic">
            Audit your traffic drop
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
          <a href="/performance" className="btn btn-ghost magnetic">All performance services</a>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '0 5vw' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: '2rem 0', borderRight: i < 2 ? '1px solid #e5e7eb' : 'none', paddingLeft: i > 0 ? '3rem' : 0 }}>
              <span style={{ display: 'block', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.04em', color: '#111827', lineHeight: 1 }}>{s.val}</span>
              <span style={{ display: 'block', fontSize: '0.78rem', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#9ca3af', marginTop: '0.5rem' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUERY CLUSTER MAP ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>Query fan-out cluster</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', maxWidth: '600px' }}>
            How we cover the full SEO traffic recovery search landscape
          </h2>
        </div>

        <div style={{ border: '2px solid #111827', padding: '1.75rem 2rem', marginBottom: '1px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#6b7280', display: 'block', marginBottom: '0.4rem' }}>Hub — you are here</span>
            <strong style={{ fontSize: '1.05rem', color: '#111827' }}>SEO Traffic Recovery</strong>
            <span style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginTop: '0.2rem', fontFamily: 'monospace' }}>"seo traffic recovery agency"</span>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9ca3af', border: '1px solid #e5e7eb', padding: '0.3rem 0.75rem', borderRadius: '100px' }}>
            /performance/seo-traffic-recovery
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #e5e7eb', borderTop: 'none' }}>
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

      {/* ── PAA SECTION 1: IS SEO DEAD? ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ maxWidth: '860px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>People also ask</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Is SEO dead or evolving in 2026?
          </h2>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            SEO is evolving faster than at any point since Penguin — it is not dead. What changed is the surface where results appear. Google AI Overviews now answer queries above the first organic result for a growing share of searches. Perplexity, ChatGPT, and Claude serve answers directly. Traffic declines are not proof that search demand fell; they reflect that visibility now spans more surfaces than ten blue links.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            The brands that are winning in 2026 haven't abandoned SEO — they've extended it. They hold Google rankings <em>and</em> appear in AI-generated answers. If your traffic dropped but your rankings held, AI Overviews are likely intercepting clicks that used to reach you. If your rankings dropped, you're dealing with a classic algorithmic or technical recovery problem.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            Both problems are recoverable. Our <a href="/performance/seo-discoverability-agency" style={{ color: 'var(--green)' }}>SEO &amp; Discoverability practice</a> handles the ranking restoration. Our <a href="/performance/ai-llms-business-agency" style={{ color: 'var(--green)' }}>AI &amp; LLM visibility work</a> handles the citation gap. Running them together is what produces a durable pipeline — not just a metric that looks good for a quarter.
          </p>
          <div style={{ borderLeft: '3px solid #111827', paddingLeft: '1.5rem' }}>
            <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75, fontStyle: 'italic' }}>
              "SEO traffic recovery in 2026 means restoring both traditional rankings and AI citation presence simultaneously. Fixing one without the other leaves half the funnel undefended."
            </p>
          </div>
        </div>
      </section>

      {/* ── PAA SECTION 2: 80/20 RULE ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ maxWidth: '860px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>People also ask</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            What is the 80/20 rule of SEO?
          </h2>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            In most sites we audit, roughly 20% of pages drive 80% or more of organic traffic. The rest rank for low-volume queries, have never earned a click-generating position, or have drifted out of active index coverage. The ratio isn't always exactly 80/20 — sometimes it's 90/10, sometimes 70/30 — but the concentration is almost always there.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            This matters for recovery because Google updates rarely suppress an entire site equally. There's usually a cluster — a content type, a URL pattern, a topic group — where the signal deteriorated. Finding that cluster is the first job of a <a href="/performance/technical-seo-audit-agency" style={{ color: 'var(--green)' }}>technical SEO audit</a>. Once you know which 20% powered your pre-drop traffic and what specifically changed for those pages, you can build a fix that produces visible results fast rather than spreading effort across 500 URLs hoping something moves.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: '2rem', letterSpacing: '-0.01em' }}>
            How we apply the 80/20 rule in a recovery
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1px', border: '1px solid #e5e7eb', background: '#e5e7eb', marginTop: '1rem' }}>
            {[
              { step: '01', title: 'Identify the 20%', body: 'Map which pages drove traffic before the drop using Search Console impressions and GA4 organic sessions, going back at least 12 months.' },
              { step: '02', title: 'Classify the damage', body: 'Determine whether the drop on those pages is a content quality signal, a crawl/index issue, a link devaluation, or an intent mismatch.' },
              { step: '03', title: 'Fix in impact order', body: 'Corrections are prioritized by ranking impact, not by page count. One core landing page fixed correctly beats 40 thin blog posts rewritten.' },
              { step: '04', title: 'Defend the perimeter', body: 'Once the 20% recovers, structural improvements protect those pages from the next update cycle — so you\'re not doing this again in six months.' },
            ].map(c => (
              <div key={c.step} style={{ background: '#ffffff', padding: '2rem' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#9ca3af', display: 'block', marginBottom: '0.75rem' }}>{c.step}</span>
                <strong style={{ fontSize: '0.95rem', color: '#111827', display: 'block', marginBottom: '0.5rem' }}>{c.title}</strong>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.7 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAA SECTION 3: IS SEO TRAFFIC DECLINING? ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ maxWidth: '860px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>People also ask</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Is SEO traffic declining?
          </h2>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            Aggregate organic click-through is declining for many sites — but the reason isn't that users stopped searching. Zero-click searches, AI Overviews, the Local Pack, and featured snippets intercept queries that used to produce a click to an organic result. For informational queries, the click-through rate has dropped measurably since AI Overviews launched at scale in 2024.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            This makes raw organic traffic a less reliable health metric than it was two years ago. A site can hold every ranking it had and still see a 20–30% traffic decline because Google is now answering the query in the SERP. That's a visibility structure problem, not an SEO failure.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', marginTop: '2rem', letterSpacing: '-0.01em' }}>
            What to measure instead of raw traffic
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', border: '1px solid #e5e7eb', background: '#e5e7eb', margin: '1rem 0 1.5rem' }}>
            {[
              { metric: 'Impression share', desc: 'Total impressions across your target query set — if impressions hold while clicks fall, AI Overviews are intercepting, not your rankings.' },
              { metric: 'AI citation rate', desc: 'How often your brand or pages appear in AI Overviews, ChatGPT answers, and Perplexity results for target queries.' },
              { metric: 'Organic pipeline', desc: 'Leads and revenue attributed to organic search — the metric that tells you whether recovered traffic is actually converting.' },
            ].map((m, i) => (
              <div key={i} style={{ background: '#ffffff', padding: '1.75rem' }}>
                <strong style={{ fontSize: '0.9rem', color: '#111827', display: 'block', marginBottom: '0.5rem' }}>{m.metric}</strong>
                <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.65 }}>{m.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8 }}>
            Pairing SEO traffic recovery with <a href="/on-page-seo-los-angeles" style={{ color: 'var(--green)' }}>on-page optimization</a> and GEO content architecture is what restores pipeline, not just the traffic number. Clicks that convert are what matter — and those come from ranking for commercial-intent queries where AI Overviews don't intercept.
          </p>
        </div>
      </section>

      {/* ── PAA SECTION 4: WHAT IS AN SEO CRISIS RECOVERY? ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <div style={{ maxWidth: '860px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '1rem' }}>People also ask</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            What is the recovery of an SEO crisis?
          </h2>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            An SEO crisis is any event that produces a sudden, measurable drop in organic traffic — a Google core update, a manual penalty notification in Search Console, a site migration that broke URL structure, a technical deployment that blocked crawling, or a mass link devaluation. Recovery is a surgical event, not a content calendar.
          </p>
          <p style={{ fontSize: '1rem', color: '#374151', lineHeight: 1.8, marginBottom: '1rem' }}>
            The five cause categories each require a different fix sequence. Confusing them is what makes recoveries drag on for months. An algorithmic suppression fix (content quality signal) does nothing for a technical crawl exclusion. A link building campaign does nothing for a manual action. Diagnosis first — always.
          </p>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#111827', marginBottom: '1rem', marginTop: '2rem', letterSpacing: '-0.01em' }}>
            The five SEO crisis types and what each requires
          </h3>
          <div style={{ borderTop: '1px solid #e5e7eb' }}>
            {[
              { type: 'Algorithmic suppression', signal: 'Rankings dropped across a defined content type or topic cluster after an update rollout', fix: 'Content quality improvement, thin-content consolidation, E-E-A-T signal strengthening, semantic restructuring' },
              { type: 'Manual penalty', signal: 'Manual action notification in Search Console — unnatural links, thin content, user-generated spam, or cloaking', fix: 'Precise correction matching the action category, documented evidence of the fix, Search Console reconsideration request' },
              { type: 'Technical regression', signal: 'Traffic dropped after a site deployment, migration, or CMS change — crawl errors, index exclusions, or redirect failures', fix: 'Crawl diagnostic, index coverage audit, redirect chain repair, canonical tag correction' },
              { type: 'Link devaluation', signal: 'Rankings dropped without a clear content or technical cause — often following a Penguin-type link quality evaluation', fix: 'Backlink audit, disavow file submission, authority rebuilding through editorial links' },
              { type: 'Intent mismatch', signal: 'Rankings were never stable or dropped after a BERT/HCU-type update — content doesn\'t match what users actually want from the query', fix: 'SERP analysis, content restructuring to match dominant intent, internal link architecture correction' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr', padding: '1.5rem 0', borderBottom: '1px solid #e5e7eb', gap: '2rem', alignItems: 'start' }}>
                <strong style={{ fontSize: '0.9rem', color: '#111827', lineHeight: 1.4 }}>{r.type}</strong>
                <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.65, margin: 0 }}><span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', display: 'block', marginBottom: '0.3rem' }}>Signal</span>{r.signal}</p>
                <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.65, margin: 0 }}><span style={{ fontFamily: 'monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', display: 'block', marginBottom: '0.3rem' }}>Fix</span>{r.fix}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75, marginTop: '1.5rem' }}>
            One pattern we see repeatedly: a site responds to a traffic drop by publishing more content. More content is a scale tactic, not a recovery tactic. The right response is to read the cause, scope the fix, and deploy it — then scale once the signal is clean. See the <a href="/approach" style={{ color: 'var(--green)' }}>three-phase approach</a> we run every engagement through.
          </p>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '6rem' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>How we run a recovery</span>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.15 }}>
              Forensic read to restored rankings in 6 stages
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.7, marginTop: '1rem' }}>
              Every stage feeds the next. No stage is skipped to save time — skipping diagnosis is what makes recoveries take six months instead of six weeks.
            </p>
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

      {/* ── CASE STUDY CTA ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#ffffff', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>In the field</span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', lineHeight: 1.2, marginBottom: '1rem' }}>
            −74% organic traffic recovered in six weeks — not six months.
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75, marginBottom: '1rem' }}>
            An e-commerce client lost roughly 74% of organic traffic after Google's Helpful Content Update. The forensic read identified a thin-content cluster spread across 140 product category pages — pages that ranked but didn't actually answer the queries they were targeting.
          </p>
          <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: 1.75, marginBottom: '2rem' }}>
            Content was restructured to match dominant search intent, authority signals repaired across the affected cluster, and <a href="/performance/technical-seo-audit-agency" style={{ color: 'var(--green)' }}>technical corrections</a> applied to crawl coverage. Rankings restored within six weeks and held through the subsequent core update cycle.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/book" className="btn btn-primary magnetic">Start a recovery audit</a>
            <a href="/case-studies" className="btn btn-ghost magnetic">All case studies</a>
          </div>
        </div>
        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { label: 'Traffic lost to Helpful Content Update', val: '−74%' },
            { label: 'Time from forensic read to first fix deployed', val: '9 days' },
            { label: 'Time to full ranking restoration', val: '6 weeks' },
            { label: 'Recovery held through subsequent core update', val: 'Yes' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: i < 3 ? '1px solid #e5e7eb' : 'none', paddingBottom: i < 3 ? '1.5rem' : 0 }}>
              <span style={{ fontSize: '0.82rem', color: '#6b7280', fontFamily: 'monospace' }}>{r.label}</span>
              <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827' }}>{r.val}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '5rem 5vw', borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
        <div style={{ marginBottom: '3rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af', display: 'block', marginBottom: '0.5rem' }}>Common questions</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827' }}>
            SEO traffic recovery — answered directly
          </h2>
        </div>
        <div style={{ borderTop: '1px solid #e5e7eb', maxWidth: '860px' }}>
          {FAQ_ITEMS.map((f, i) => (
            <div key={i} style={{ padding: '2rem 0', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>{f.q}</h3>
              <p style={{ fontSize: '0.92rem', color: '#6b7280', lineHeight: 1.8 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ padding: '5rem 5vw', background: '#111827' }}>
        <div style={{ maxWidth: '680px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '1rem' }}>Start here</span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '1rem', lineHeight: 1.2 }}>
            Submit your domain. We'll tell you exactly what caused the drop.
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: '2rem' }}>
            A pre-read is the first stage of every recovery engagement. We map your traffic curve against the Google update timeline, classify the cause, and tell you what we'd fix — before you commit to anything. See <a href="/performance/seo-discoverability-agency" style={{ color: 'rgba(255,255,255,0.8)' }}>SEO &amp; Discoverability</a> for the full practice scope.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/book" className="btn btn-primary magnetic">
              Get a recovery pre-read
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="/google-penalty-recovery" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', alignSelf: 'center', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Manual penalty? See Google Penalty Recovery →
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
