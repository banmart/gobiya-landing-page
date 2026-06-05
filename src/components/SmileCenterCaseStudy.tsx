import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, TrendingUp, Search, MapPin, Phone, BarChart2, Award } from 'lucide-react';
import DeferredShader, { Swirl, ChromaFlow, FlutedGlass, FilmGrain } from './DeferredShader';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import ParallaxMedia from './ParallaxMedia';
import SplitTextReveal from './SplitTextReveal';
import { trackCTA } from '../lib/analytics';

gsap.registerPlugin(ScrollTrigger);

const SmileCenterCaseStudy: React.FC = () => {
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
    { value: '5x', label: 'Form completions', icon: <BarChart2 className="w-5 h-5" />, color: 'text-[#F26522]' },
    { value: '5x', label: 'Inbound phone calls', icon: <Phone className="w-5 h-5" />, color: 'text-[#F26522]' },
    { value: '2.8x', label: 'Search impressions', icon: <TrendingUp className="w-5 h-5" />, color: 'text-white' },
    { value: '+44%', label: 'Organic clicks', icon: <Search className="w-5 h-5" />, color: 'text-white' },
    { value: 'Top 5', label: 'Local branded rankings', icon: <Award className="w-5 h-5" />, color: 'text-white' },
    { value: '213K', label: 'Monthly search impressions', icon: <MapPin className="w-5 h-5" />, color: 'text-white' },
  ];

  const localRankings = [
    { query: 'smile center downey', position: '#2' },
    { query: 'smile center palmdale', position: 'Top 5' },
    { query: 'anaheim smile center', position: 'Top 5' },
    { query: 'smile center long beach', position: 'Top 5' },
    { query: 'smile center whittier', position: 'Top 5' },
  ];

  const whatWeDid = [
    {
      num: '01',
      title: 'Fast, mobile-first redesign',
      body: 'We rebuilt the site on a custom React/Vite foundation — lightweight and quick to load, since most dental searches happen on a phone, often when someone is in pain and ready to act.',
    },
    {
      num: '02',
      title: 'Multi-location search architecture',
      body: 'We gave every office its own dedicated, individually optimized page with local schema markup, consistent NAP data, and location-specific content — so each market could rank on its own merits instead of competing under one generic domain.',
    },
    {
      num: '03',
      title: 'Conversion architecture',
      body: 'Prominent click-to-call on mobile, simplified booking forms, and location-aware calls-to-action that route a visitor to their nearest office and let them book in the fewest possible steps.',
    },
    {
      num: '04',
      title: 'Local presence signals',
      body: 'Integrated Yelp and Google Business signals to reinforce each location in map and "near me" results — capturing the demand pool that drives genuinely new patients.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white relative font-sans selection:bg-[#F26522] selection:text-white page-wrapper">
      <CustomCursor />

      {/* HERO SECTION */}
      <section className="relative w-full h-[65vh] min-h-[480px] bg-[#050505] overflow-hidden flex flex-col justify-center cursor-default">
        {/* Shader Background */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full [&>div]:w-full [&>div]:h-full [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover opacity-85">
          <DeferredShader>
            <Swirl colorA="#050505" colorB="#0f0f0f" detail={1.7} />
            <ChromaFlow baseColor="#050505" downColor="#f26522" leftColor="#f26522" rightColor="#f26522" upColor="#f26522" momentum={13} radius={3.5} />
            <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
            <FilmGrain strength={0.05} />
          </DeferredShader>
        </div>

        {/* Navigation */}
        <Header theme="dark" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto flex flex-col justify-center px-5 sm:px-8 lg:px-12 pt-16 pb-0">
          <p className="text-[13px] sm:text-[14px] text-gray-400 tracking-wide mb-4 uppercase font-medium">
            Gobiya Case Studies &gt; Multi-Location Dental
          </p>
          <h1 className="text-[clamp(1.5rem,5.5vw,3.2rem)] sm:text-[clamp(1.8rem,4.5vw,3.8rem)] font-medium leading-[1.15] tracking-[-0.03em] text-white max-w-[1100px]">
            How SmileCenter Dentistry{' '}
            <span className="text-[#F26522]">5x'd patient inquiries</span>{' '}
            across Southern California.
          </h1>
          <p className="mt-6 text-[15px] sm:text-[17px] text-gray-400 max-w-[700px] leading-relaxed">
            Website redesign · Multi-location search architecture · Conversion architecture · React/Vite
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <a
              href="/book"
              id="smilecenter-hero-cta"
              data-cta-location="smilecenter_hero"
              data-cta-text="Get a similar result"
              onClick={() => trackCTA({ cta_location: 'smilecenter_hero', cta_text: 'Get a similar result' })}
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

      {/* SCROLL REVEAL INTRO */}
      <section className="w-full relative" data-logo-dark>
        <SplitTextReveal text="We didn't optimize for traffic. We optimized for booked patients. A faster site captured the searches, a location-aware structure made each office findable, and a conversion-first design turned visits into calls — 5x more of them." />
      </section>

      {/* METRICS SNAPSHOT */}
      <section className="bg-[#F26522] w-full relative z-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white text-[#F26522] text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">1</div>
            <div className="text-[12px] sm:text-[13px] font-medium text-white border border-white/40 px-3 sm:px-4 py-1 sm:py-1.5">Results Snapshot</div>
          </div>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.8rem)] font-medium leading-[1.1] tracking-[-0.02em] text-white mb-10 max-w-2xl">
            The numbers that matter to a dental practice.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {metrics.map((m, i) => (
              <div
                key={i}
                className={`p-6 sm:p-8 border border-white/20 bg-white/10 backdrop-blur-sm ${i === 0 || i === 1 ? 'bg-white/20 border-white/40' : ''}`}
              >
                <div className="flex items-center gap-2 text-white/60 mb-3">
                  {m.icon}
                  <span className="text-[11px] uppercase tracking-wider font-semibold">{m.label}</span>
                </div>
                <div className={`text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-none text-white font-display`}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
          <p className="text-white/60 text-[13px] mt-6">*Period: last 3 months vs. prior 3 months. Search impressions: 75.3K → 213K.</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="bg-[#050505] text-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden w-full" data-logo-dark>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">

          {/* Context Label */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#F26522] text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">2</div>
            <div className="text-[12px] sm:text-[13px] font-medium text-white border border-white/20 px-3 sm:px-4 py-1 sm:py-1.5">Context &amp; Challenge</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-8 max-w-3xl">
                A multi-location practice invisible in its own markets.
              </h2>
              <div className="flex flex-col gap-6 text-[15px] sm:text-[16px] leading-[1.75] text-gray-400">
                <p>
                  SmileCenter runs dental offices across multiple Southern California markets — Anaheim, Palmdale, Downey, Long Beach, Whittier, West Covina, and the Antelope Valley among them. But its previous website didn't reflect that footprint.
                </p>
                <p>
                  A single, slow, generic site funneled every visitor into the same place, with no clear path to the <em className="text-white not-italic font-medium">nearest</em> office and no friction-free way to book or call.
                </p>
                <p>
                  The result was a familiar problem for multi-location healthcare brands: visibility that didn't match the number of locations, and traffic that didn't turn into booked appointments. The site was getting found — it just wasn't converting, and it wasn't capturing local search demand market by market.
                </p>
              </div>
            </div>

            {/* Sidebar: Client info */}
            <div className="flex flex-col gap-5">
              <div className="border border-white/10 p-6 bg-white/[0.03]">
                <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-4 font-semibold">Client Overview</p>
                <dl className="flex flex-col gap-3 text-[14px]">
                  {[
                    { dt: 'Client', dd: 'SmileCenter Dentistry' },
                    { dt: 'Locations', dd: 'Multi-location, Southern California' },
                    { dt: 'Engagement', dd: 'Website redesign · SEO · Conversion architecture' },
                    { dt: 'Stack', dd: 'React / Vite, location pages, Yelp + Google Business' },
                    { dt: 'Vertical', dd: 'Healthcare · Dental · Local Search' },
                  ].map((item) => (
                    <div key={item.dt} className="grid grid-cols-[100px_1fr] gap-2">
                      <dt className="text-gray-500">{item.dt}</dt>
                      <dd className="text-white">{item.dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Placeholder image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <ParallaxMedia
                  type="image"
                  src="/images/smilecenter-office.webp"
                  alt="SmileCenter dental office — placeholder, to be replaced"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-black/70 text-white text-[11px] px-3 py-1.5 backdrop-blur-sm">
                  📷 Placeholder image — replace with actual SmileCenter photos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DID */}
      <section className="bg-white text-gray-900 py-16 sm:py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-black text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">3</div>
            <div className="text-[12px] sm:text-[13px] font-medium text-black border border-black px-3 sm:px-4 py-1 sm:py-1.5">What We Did</div>
          </div>

          <h2 className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 max-w-3xl">
            Four engineering decisions that moved the needle.
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

          {/* Placeholder image 2 */}
          <div className="mt-14 sm:mt-20 relative aspect-[16/7] overflow-hidden">
            <ParallaxMedia
              type="image"
              src="/images/smilecenter-results.webp"
              alt="SmileCenter analytics results dashboard — placeholder"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white text-[12px] px-4 py-2 backdrop-blur-sm max-w-fit">
              📷 Placeholder — replace with actual Search Console / analytics screenshots
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS IN DEPTH */}
      <section className="bg-[#050505] text-white py-16 sm:py-20 lg:py-32 border-t border-white/10 relative z-20" data-logo-dark>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#F26522] text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">4</div>
            <div className="text-[12px] sm:text-[13px] font-medium text-white border border-white/20 px-3 sm:px-4 py-1 sm:py-1.5">Results in Depth</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">
            <div className="flex flex-col gap-10">

              {/* Conversions */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-[#F26522] text-white flex items-center justify-center font-bold text-[14px]">01</div>
                  <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Conversions</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
                  The numbers that matter to a practice.
                </h3>
                <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-5">
                  <p>
                    Form completions and inbound phone calls each grew <strong className="text-white">5x</strong>. Critically, this did not come from a flood of new traffic — organic clicks rose a steady 44% over the same window.
                  </p>
                  <p>
                    The 5x lift came from the redesign and conversion architecture: the same and new visitors converting far more effectively, on a site engineered to turn a search into a booked chair.
                  </p>
                </div>
              </div>

              {/* Local Search */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-[#F26522] text-white flex items-center justify-center font-bold text-[14px]">02</div>
                  <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Local Search Dominance</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
                  Top-5 positions across every market.
                </h3>
                <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-5">
                  <p>
                    SmileCenter now holds top-5 positions for branded searches across its markets. The multi-location architecture lets each office own its local search results instead of fighting for a single shared ranking.
                  </p>
                </div>
                {/* Local rankings table */}
                <div className="mt-6 border border-white/10 overflow-hidden">
                  <div className="bg-white/5 px-5 py-3 grid grid-cols-[1fr_100px] text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                    <span>Search Query</span>
                    <span className="text-right">Position</span>
                  </div>
                  {localRankings.map((r) => (
                    <div key={r.query} className="px-5 py-4 grid grid-cols-[1fr_100px] border-t border-white/[0.06] items-center">
                      <span className="text-[14px] text-gray-300 font-mono">"{r.query}"</span>
                      <span className="text-right text-[14px] font-bold text-[#F26522]">{r.position}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top of Funnel */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-[#F26522] text-white flex items-center justify-center font-bold text-[14px]">03</div>
                  <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Top-of-Funnel Reach</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
                  Total search impressions nearly tripled.
                </h3>
                <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-5">
                  <p>
                    Impressions grew from <strong className="text-white">75.3K → 213K</strong> (~2.8x) as the site began surfacing for high-value non-branded searches like "dentist near me," "emergency dentist near me," and "dentist open Sunday."
                  </p>
                  <p>
                    This is the demand pool that drives genuinely new patients, and SmileCenter is now visible in it. "Dentist near me" alone generates 14,000+ impressions per quarter.
                  </p>
                </div>
              </div>

            </div>

            {/* Sidebar: Why it worked */}
            <div className="flex flex-col gap-6">
              <div className="bg-[#F26522] p-7">
                <h3 className="text-xl font-bold text-white mb-4 leading-tight">Why it worked</h3>
                <div className="text-white/80 text-[14px] leading-[1.7] flex flex-col gap-4">
                  <p>
                    We didn't optimize for traffic. We optimized for booked patients.
                  </p>
                  <p>
                    A faster site captured the searches, a location-aware structure made each office findable in its own market, and a conversion-first design turned visits into calls and forms — 5x more of them.
                  </p>
                </div>
              </div>

              <div className="border border-white/10 p-7 bg-white/[0.03]">
                <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-5 font-semibold">Phase Two Focus</p>
                <p className="text-gray-300 text-[14px] leading-[1.7]">
                  Climbing non-branded head terms — converting the impression growth on "dentist near me" and "emergency dentist" into first-page positions and a second wave of new-patient volume.
                </p>
              </div>

              <div className="border border-white/10 p-7 bg-white/[0.03]">
                <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-5 font-semibold">A Note on the Data</p>
                <p className="text-gray-300 text-[14px] leading-[1.7]">
                  SmileCenter's average ranking position and click-through rate dipped slightly during this period. That's a healthy signal. The site is now appearing for a far larger and more competitive universe of non-branded queries — those new, lower-position impressions naturally pull site-wide averages down even as visibility expands.
                </p>
              </div>

              {/* CTA */}
              <a
                href="/book"
                id="smilecenter-sidebar-cta"
                data-cta-location="smilecenter_sidebar"
                data-cta-text="Build your local presence"
                onClick={() => trackCTA({ cta_location: 'smilecenter_sidebar', cta_text: 'Build your local presence' })}
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

      {/* TESTIMONIAL PLACEHOLDER */}
      <section className="bg-[#0a0a0a] py-16 sm:py-20 border-t border-white/10 relative z-20" data-logo-dark>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <blockquote className="max-w-3xl">
            <p className="text-[clamp(1.1rem,2.5vw,1.6rem)] text-gray-300 leading-[1.6] font-medium italic mb-6">
              "[Client testimonial — a one- or two-sentence quote from the SmileCenter team about the call/booking volume increase.]"
            </p>
            <footer className="text-[13px] text-gray-500 uppercase tracking-widest">
              — SmileCenter Team · Southern California
            </footer>
          </blockquote>
        </div>
      </section>

      {/* MORE CASE STUDIES CTA */}
      <section className="bg-[#050505] py-16 sm:py-24 border-t border-white/10 relative z-20">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <p className="text-[13px] sm:text-[14px] text-gray-400 tracking-wide mb-3 uppercase font-medium">More Client Wins</p>
              <h2 className="text-[clamp(1.4rem,3vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.02em] text-white max-w-xl">
                Want results like these for your practice?
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/book"
                id="smilecenter-bottom-cta"
                data-cta-location="smilecenter_bottom"
                data-cta-text="Start your audit"
                onClick={() => trackCTA({ cta_location: 'smilecenter_bottom', cta_text: 'Start your audit' })}
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

export default SmileCenterCaseStudy;
