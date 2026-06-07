import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, TrendingUp, Phone, MapPin, BarChart2,
  Users, Star, ExternalLink
} from 'lucide-react';
import DeferredShader, { Swirl, ChromaFlow, FlutedGlass, FilmGrain } from './DeferredShader';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import ParallaxMedia from './ParallaxMedia';
import SplitTextReveal from './SplitTextReveal';
import { trackCTA } from '../lib/analytics';

gsap.registerPlugin(ScrollTrigger);

const AmericanLivescanCaseStudy: React.FC = () => {
  useEffect(() => {
    let ctx: gsap.Context;

    function createTimeline() {
      if (ctx) ctx.revert();

      ctx = gsap.context(() => {
        const darkSections = gsap.utils.toArray('[data-logo-dark]') as HTMLElement[];
        const box = document.querySelector('#animated-logo') as HTMLElement;
        if (box) {
          darkSections.forEach((section) => {
            ScrollTrigger.create({
              trigger: section,
              start: 'top 50%',
              end: 'bottom 50%',
              onEnter: () => gsap.to(box, { filter: 'brightness(0) invert(1)', duration: 0.3, overwrite: 'auto' }),
              onLeave: () => gsap.to(box, { filter: 'brightness(1) invert(0)', duration: 0.3, overwrite: 'auto' }),
              onEnterBack: () => gsap.to(box, { filter: 'brightness(0) invert(1)', duration: 0.3, overwrite: 'auto' }),
              onLeaveBack: () => gsap.to(box, { filter: 'brightness(1) invert(0)', duration: 0.3, overwrite: 'auto' }),
            });
          });
        }
      });
    }

    setTimeout(createTimeline, 100);
    window.addEventListener('resize', createTimeline);
    return () => {
      window.removeEventListener('resize', createTimeline);
      if (ctx) ctx.revert();
    };
  }, []);

  const metrics = [
    { value: '3x', label: 'Online appointments', sub: 'period-over-period', icon: <BarChart2 className="w-5 h-5" />, highlight: true },
    { value: '3x', label: 'Inbound phone calls', sub: 'period-over-period', icon: <Phone className="w-5 h-5" />, highlight: true },
    { value: '+30%', label: 'Walk-in traffic', sub: 'measured at point of service', icon: <Users className="w-5 h-5" />, highlight: false },
    { value: '+47%', label: 'Organic clicks', sub: '426 → 625 clicks', icon: <TrendingUp className="w-5 h-5" />, highlight: false },
    { value: 'Pos. 10', label: 'Passport photos ranking', sub: 'from position 55.8', icon: <Star className="w-5 h-5" />, highlight: false },
    { value: '#1–2', label: 'Brand search rankings', sub: '15%+ click-through rate', icon: <MapPin className="w-5 h-5" />, highlight: false },
  ];

  const nearMeRankings = [
    { query: 'walk in live scan near me', before: 'No visibility', after: 'Page 1 (~Pos. 7)' },
    { query: 'livescan near me', before: '3 clicks', after: '16 clicks (+3x CTR)' },
    { query: 'live scan fingerprinting near me', before: 'Low', after: 'Improved' },
    { query: 'live scan near me open now', before: 'Low', after: 'Improved' },
    { query: 'passport photos [location]', before: 'Pos. 55.8', after: 'Pos. 10 (Page 1)' },
  ];

  const whatWeDid = [
    {
      num: '01',
      title: 'Full site rebuild & migration',
      body: 'We replaced the legacy .htm/.html site with a modern, fast, clean-URL architecture — and migrated carefully so every page\'s search equity transferred to the new URLs instead of being lost in the switch.',
    },
    {
      num: '02',
      title: 'Service-specific landing pages',
      body: 'We built dedicated pages for each service line — Live Scan fingerprinting, mobile fingerprinting, passport photos, background checks — so each could rank on its own merits instead of being buried under one generic homepage.',
    },
    {
      num: '03',
      title: 'Google Business Profile optimization',
      body: 'We tightened the local profile and signals that drive map-pack visibility, calls, and walk-ins — the channel that matters most for a same-day, in-person service like Live Scan.',
    },
    {
      num: '04',
      title: 'Content engine & topical authority',
      body: 'We launched an insights hub targeting high-intent questions: California record-sealing under SB 731, cannabis screening law, REAL ID, passport-photo rejections — building topical authority and capturing informational traffic ready to convert.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white relative font-sans selection:bg-[#F26522] selection:text-white page-wrapper">
      <CustomCursor />

      {/* ─── HERO ─── */}
      <section className="relative w-full h-[65vh] min-h-[480px] bg-[#050505] overflow-hidden flex flex-col justify-center cursor-default">
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full [&>div]:w-full [&>div]:h-full [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover opacity-85">
          <DeferredShader>
            <Swirl colorA="#050505" colorB="#0f0f0f" detail={1.7} />
            <ChromaFlow baseColor="#050505" downColor="#f26522" leftColor="#f26522" rightColor="#f26522" upColor="#f26522" momentum={13} radius={3.5} />
            <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
            <FilmGrain strength={0.05} />
          </DeferredShader>
        </div>

        <Header theme="dark" />

        <div className="relative z-20 max-w-[1440px] w-full mx-auto flex flex-col justify-center px-5 sm:px-8 lg:px-12 pt-16 pb-0">
          <p className="text-[13px] sm:text-[14px] text-gray-400 tracking-wide mb-4 uppercase font-medium">
            Gobiya Case Studies &gt; Local SEO &amp; Site Rebuild
          </p>
          <h1 className="text-[clamp(1.5rem,5.5vw,3.2rem)] sm:text-[clamp(1.8rem,4.5vw,3.8rem)] font-medium leading-[1.15] tracking-[-0.03em] text-white max-w-[1100px]">
            How American Livescan{' '}
            <span className="text-[#F26522]">tripled bookings &amp; calls</span>{' '}
            with a site rebuild and local SEO.
          </h1>
          <p className="mt-6 text-[15px] sm:text-[17px] text-gray-400 max-w-[720px] leading-relaxed">
            Website redesign · Legacy migration · Google Business Profile · Service-specific landing pages · Content engine
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <a
              href="/book"
              id="livescan-hero-cta"
              data-cta-location="livescan_hero"
              data-cta-text="Get a similar result"
              onClick={() => trackCTA({ cta_location: 'livescan_hero', cta_text: 'Get a similar result' })}
              className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 sm:pl-6 pr-2 py-2 transition-colors duration-300"
            >
              <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  Get a similar result
                </span>
                <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  Get a similar result
                </span>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
              </div>
            </a>
            <a
              href="/company/success-stories"
              className="text-[13px] sm:text-[14px] font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              ← All case studies
            </a>
          </div>
        </div>
      </section>

      {/* ─── SCROLL REVEAL ─── */}
      <section className="w-full relative" data-logo-dark>
        <SplitTextReveal text="We rebuilt for speed and for booking, not just for traffic. A faster, cleaner site captured the local searches, service-specific pages made each offering findable, and an optimized Google Business Profile turned 'near me' visibility into calls, walk-ins, and appointments — 3x more of them." />
      </section>

      {/* ─── METRICS SNAPSHOT ─── */}
      <section className="bg-[#F26522] w-full relative z-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white text-[#F26522] text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">1</div>
            <div className="text-[12px] sm:text-[13px] font-medium text-white border border-white/40 px-3 sm:px-4 py-1 sm:py-1.5">Results Snapshot</div>
          </div>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.02em] text-white mb-10 max-w-2xl">
            The numbers that run the business.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {metrics.map((m, i) => (
              <div
                key={i}
                className={`p-6 sm:p-8 border backdrop-blur-sm ${m.highlight
                  ? 'bg-white/20 border-white/50'
                  : 'bg-white/10 border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 text-white/60 mb-3">
                  {m.icon}
                  <span className="text-[11px] uppercase tracking-wider font-semibold">{m.label}</span>
                </div>
                <div className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-none text-white font-display mb-1">
                  {m.value}
                </div>
                <div className="text-[11px] text-white/50 font-medium">{m.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-[13px] mt-6">*Period: last 6 months vs. prior 6 months.</p>
        </div>
      </section>

      {/* ─── CHALLENGE ─── */}
      <section className="bg-[#050505] text-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden w-full" data-logo-dark>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#F26522] text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">2</div>
            <div className="text-[12px] sm:text-[13px] font-medium text-white border border-white/20 px-3 sm:px-4 py-1 sm:py-1.5">Context &amp; Challenge</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-8 max-w-3xl">
                A high-volume local service buried on an aging website.
              </h2>
              <div className="flex flex-col gap-6 text-[15px] sm:text-[16px] leading-[1.75] text-gray-400">
                <p>
                  American Livescan is a high-volume Live Scan fingerprinting and background-check provider, serving walk-in customers, online bookings, and mobile appointments across the area.
                </p>
                <p>
                  But the business was running on an aging website built on legacy <code className="bg-white/10 text-white px-1.5 py-0.5 text-[13px]">.htm</code> and <code className="bg-white/10 text-white px-1.5 py-0.5 text-[13px]">.html</code> pages — slow, hard to update, and architecturally incapable of competing for the "near me" searches that drive a local, walk-in service.
                </p>
                <p>
                  For a business where most customers are searching on a phone, in a hurry, and ready to walk in or call, that's a direct revenue problem: every visitor who couldn't quickly find a location, see services, or tap to book was a <em className="text-white not-italic font-medium">lost appointment</em>.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              <div className="border border-white/10 p-6 bg-white/[0.03]">
                <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-4 font-semibold">Client Overview</p>
                <dl className="flex flex-col gap-3 text-[14px]">
                  {[
                    { dt: 'Client', dd: 'American Livescan' },
                    { dt: 'Location', dd: 'California, USA' },
                    { dt: 'Services', dd: 'Live Scan fingerprinting, passport photos, background checks' },
                    { dt: 'Engagement', dd: 'Site rebuild · GMB · Local SEO · Content engine' },
                    { dt: 'Vertical', dd: 'Government services · Local search' },
                  ].map((item) => (
                    <div key={item.dt} className="grid grid-cols-[100px_1fr] gap-2">
                      <dt className="text-gray-500">{item.dt}</dt>
                      <dd className="text-white">{item.dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="aspect-[4/3] overflow-hidden relative">
                <ParallaxMedia
                  type="image"
                  src="/images/livescan-office.webp"
                  alt="American Livescan fingerprinting office — placeholder"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-black/70 text-white text-[11px] px-3 py-1.5 backdrop-blur-sm">
                  📷 Placeholder — replace with actual American Livescan photos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE DID ─── */}
      <section className="bg-white text-gray-900 py-16 sm:py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-black text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">3</div>
            <div className="text-[12px] sm:text-[13px] font-medium text-black border border-black px-3 sm:px-4 py-1 sm:py-1.5">What We Did</div>
          </div>

          <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 max-w-3xl">
            Four decisions that turned a legacy site into a booking engine.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {whatWeDid.map((item) => (
              <div key={item.num} className="border-t-2 border-[#F26522] pt-8">
                <div className="text-[12px] font-bold text-[#F26522] uppercase tracking-widest mb-4">{item.num}</div>
                <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 text-[15px] sm:text-[16px] leading-[1.7]">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Placeholder results image */}
          <div className="mt-14 sm:mt-20 relative aspect-[16/7] overflow-hidden">
            <ParallaxMedia
              type="image"
              src="/images/livescan-results.webp"
              alt="American Livescan analytics — placeholder"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 text-white text-[12px] px-4 py-2 backdrop-blur-sm">
              📷 Placeholder — replace with Search Console / GMB screenshots
            </div>
          </div>
        </div>
      </section>

      {/* ─── RESULTS IN DEPTH ─── */}
      <section className="bg-[#050505] text-white py-16 sm:py-20 lg:py-32 border-t border-white/10 relative z-20" data-logo-dark>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#F26522] text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">4</div>
            <div className="text-[12px] sm:text-[13px] font-medium text-white border border-white/20 px-3 sm:px-4 py-1 sm:py-1.5">Results in Depth</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-20">
            <div className="flex flex-col gap-12">

              {/* Conversions */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-[#F26522] text-white flex items-center justify-center font-bold text-[14px]">01</div>
                  <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Conversions</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
                  The numbers that run the business.
                </h3>
                <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-5">
                  <p>
                    Walk-in traffic grew <strong className="text-white">30%</strong>, while online appointments and phone calls each grew <strong className="text-white">3x</strong>. These gains came primarily from the rebuild and GMB optimization.
                  </p>
                  <p>
                    Organic clicks grew a healthy 47% over the same window, but the outsized lift in calls, walk-ins, and bookings came from converting that visibility far more effectively — a faster site, clearer paths to book and call, and a local profile engineered to turn a "live scan near me" search into someone walking through the door.
                  </p>
                </div>
              </div>

              {/* "Near me" rankings */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-[#F26522] text-white flex items-center justify-center font-bold text-[14px]">02</div>
                  <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Local "Near Me" Visibility</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
                  Every walk-in keyword moved.
                </h3>
                <p className="text-gray-400 text-[15px] leading-[1.7] mb-6">
                  The terms that produce actual foot traffic all improved — from no visibility to page one for the highest-intent queries.
                </p>

                {/* Rankings table */}
                <div className="border border-white/10 overflow-hidden">
                  <div className="bg-white/5 px-5 py-3 grid grid-cols-[1fr_110px_110px] text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                    <span>Query</span>
                    <span className="text-center">Before</span>
                    <span className="text-right text-[#F26522]">After</span>
                  </div>
                  {nearMeRankings.map((r) => (
                    <div key={r.query} className="px-5 py-4 grid grid-cols-[1fr_110px_110px] border-t border-white/[0.06] items-center">
                      <span className="text-[13px] text-gray-300 font-mono pr-4">"{r.query}"</span>
                      <span className="text-center text-[13px] text-gray-500">{r.before}</span>
                      <span className="text-right text-[13px] font-bold text-[#F26522]">{r.after}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* New service line + brand */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-[#F26522] text-white flex items-center justify-center font-bold text-[14px]">03</div>
                  <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">New Service Line &amp; Brand Dominance</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
                  Passport photos: from invisible to page one.
                </h3>
                <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-5">
                  <p>
                    The passport-photos page went from effectively invisible at position <strong className="text-white">55.8</strong> to <strong className="text-white">page one (position 10)</strong> — from 1 click to 79 — opening a service line that wasn't competing at all before the rebuild.
                  </p>
                  <p>
                    American Livescan also holds <strong className="text-white">#1–2</strong> for its brand searches with a <strong className="text-white">15%+ click-through rate</strong> — the local-brand dominance that a high-volume walk-in service is built on.
                  </p>
                  <p>
                    The rebuilt service pages (live scan fingerprinting, mobile fingerprinting, background check) and the insights articles are already ranking on page one or close to it — a pipeline of visibility set to convert into clicks as they mature.
                  </p>
                </div>
              </div>

            </div>

            {/* ─── Sidebar ─── */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#F26522] p-7">
                <h3 className="text-xl font-bold text-white mb-4 leading-tight">Why it worked</h3>
                <div className="text-white/85 text-[14px] leading-[1.7] flex flex-col gap-4">
                  <p>
                    We rebuilt for speed and for booking, not just for traffic.
                  </p>
                  <p>
                    A faster, cleaner site captured the local searches. Service-specific pages made each offering findable. And an optimized Google Business Profile turned "near me" visibility into calls, walk-ins, and appointments — 3x more of them.
                  </p>
                </div>
              </div>

              {/* Impression note */}
              <div className="border border-white/10 p-7 bg-white/[0.03]">
                <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-4 font-semibold">A Note on the Data</p>
                <p className="text-gray-300 text-[14px] leading-[1.7]">
                  Total search impressions dropped from 149K to 120K — and it's a healthy signal. The drop is almost entirely the retirement of legacy pages: old URLs shed their impressions as the site migrated. In their place, the new architecture ranks <em className="text-white not-italic">higher</em> (avg. position improved 5 spots), earns clicks at a far better rate (CTR 0.3% → 0.5%), and drives 47% more traffic from fewer, better-qualified impressions.
                </p>
              </div>

              {/* Phase two */}
              <div className="border border-white/10 p-7 bg-white/[0.03]">
                <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-4 font-semibold">Phase Two Focus</p>
                <p className="text-gray-300 text-[14px] leading-[1.7]">
                  Pushing the live-scan, mobile, and background-check pages from the bottom of page one into the top three — where the bulk of "near me" clicks actually happen.
                </p>
              </div>

              {/* CTR improvement callout */}
              <div className="border border-[#F26522]/30 bg-[#F26522]/5 p-7">
                <p className="text-[11px] uppercase tracking-widest text-[#F26522] mb-4 font-semibold">CTR Improvement</p>
                <div className="flex items-end gap-4">
                  <div>
                    <div className="text-[11px] text-gray-500 mb-1">Before</div>
                    <div className="text-2xl font-bold text-gray-500 font-display">0.3%</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#F26522] mb-1.5" />
                  <div>
                    <div className="text-[11px] text-gray-400 mb-1">After</div>
                    <div className="text-2xl font-bold text-[#F26522] font-display">0.5%</div>
                  </div>
                </div>
                <p className="text-gray-400 text-[13px] mt-3 leading-relaxed">
                  Average position also improved 5 spots: 20.8 → 15.8
                </p>
              </div>

              <a
                href="/book"
                id="livescan-sidebar-cta"
                data-cta-location="livescan_sidebar"
                data-cta-text="Build your local presence"
                onClick={() => trackCTA({ cta_location: 'livescan_sidebar', cta_text: 'Build your local presence' })}
                className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 pr-2 py-3 transition-colors duration-300 self-start"
              >
                <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                  <span className="text-[13px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                    Build your local presence
                  </span>
                  <span className="text-[13px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                    Build your local presence
                  </span>
                </div>
                <div className="w-7 h-7 bg-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES HIGHLIGHT ─── */}
      <section className="bg-[#0a0a0a] py-16 sm:py-20 border-t border-white/10 relative z-20" data-logo-dark>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#F26522] text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">5</div>
            <div className="text-[12px] sm:text-[13px] font-medium text-white border border-white/20 px-3 sm:px-4 py-1 sm:py-1.5">Service Lines Ranked</div>
          </div>
          <h2 className="text-[clamp(1.3rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-white mb-8 max-w-xl">
            Every service line now has its own rankable presence.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Live Scan Fingerprinting', status: 'Page 1 ranking', icon: '🖐' },
              { title: 'Mobile Fingerprinting', status: 'Page 1 ranking', icon: '📱' },
              { title: 'Passport Photos', status: 'Pos. 55 → Pos. 10', icon: '📷' },
              { title: 'Background Checks', status: 'Climbing to top 3', icon: '📋' },
            ].map((s) => (
              <div key={s.title} className="border border-white/10 p-6 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                <div className="text-2xl mb-4">{s.icon}</div>
                <h3 className="text-[15px] font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-[13px] text-[#F26522] font-medium">{s.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section className="bg-[#050505] py-16 sm:py-20 border-t border-white/10 relative z-20" data-logo-dark>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <blockquote className="max-w-3xl">
            <p className="text-[clamp(1.1rem,2.5vw,1.6rem)] text-gray-300 leading-[1.6] font-medium italic mb-6">
              "Our online bookings and phone calls tripled almost immediately after the new site went live. We've also seen a steady increase in daily walk-in traffic, and we're now ranking on page one for terms we were completely invisible for before."
            </p>
            <footer className="text-[13px] text-gray-500 uppercase tracking-widest">
              — Dev Panday · Owner, American Livescan
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="bg-[#050505] py-16 sm:py-24 border-t border-white/10 relative z-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <p className="text-[13px] sm:text-[14px] text-gray-400 tracking-wide mb-3 uppercase font-medium">More Client Wins</p>
              <h2 className="text-[clamp(1.4rem,3vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white max-w-xl">
                Want results like these for your local service business?
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/book"
                id="livescan-bottom-cta"
                data-cta-location="livescan_bottom"
                data-cta-text="Start your audit"
                onClick={() => trackCTA({ cta_location: 'livescan_bottom', cta_text: 'Start your audit' })}
                className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 sm:pl-6 pr-2 py-2 transition-colors duration-300"
              >
                <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                  <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                    Start your audit
                  </span>
                  <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                    Start your audit
                  </span>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                </div>
              </a>
              <a
                href="/company/success-stories"
                className="group flex items-center border border-white/20 hover:border-white/40 text-white pl-5 sm:pl-6 pr-2 py-2 transition-colors duration-300"
              >
                <span className="text-[13px] sm:text-[14px] font-medium mr-3">All case studies</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/10 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AmericanLivescanCaseStudy;
