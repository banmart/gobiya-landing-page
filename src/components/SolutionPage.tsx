import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggeredMenu from './StaggeredMenu';
import Header from './Header';
import Footer from './Footer';
import RotatingText from './RotatingText';
import InsightsSlider from './InsightsSlider';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';

gsap.registerPlugin(ScrollTrigger);

interface SolutionData {
  h1: string;
  subHeadline: string;
  whyHire: string;
  whatIsTitle: string;
  whatIsParagraphs: string[];
  approach: { step: string; title: string; desc: string }[];
  deliverables: string[];
  whyUs: string;
  ctaText: string;
  ctaLink: string;
  rotatingWords?: string[];
  insightCategory?: string;
}

const SOLUTIONS_DATA: Record<string, SolutionData> = {
  '/services/seo': {
    h1: 'We engineer technical SEO that wins entities, not just keywords.',
    subHeadline: 'Forensic audits, topical authority architectures, and EEAT signal engineering — built for high-stakes brands operating in volatile algorithmic environments.',
    rotatingWords: ['recover traffic.', 'scale pipelines.', 'secure dominance.'],
    insightCategory: 'SEO',
    whyHire: 'Enterprise brands dealing with complex JavaScript applications, aggressive legacy manual actions, or large-scale content library migrations cannot rely on standard checklist SEO. The stakes are too high, and the technical barrier to entry is too severe. We engineer custom architectures built to extract the absolute maximum value from Google\'s neural matching and crawling systems.',
    whatIsTitle: 'What is technical SEO in 2026?',
    whatIsParagraphs: [
      'Modern technical SEO is the practice of making a website legible, trustworthy, and authoritative to algorithmic crawlers, neural matching systems, and generative retrieval pipelines. It is no longer about keyword density or backlink volume. It is about how cleanly your site renders, how completely your topical coverage maps to user intent, and how clearly your entity relationships are defined for the systems that index them.',
      'A high-performing SEO program in 2026 must produce three things simultaneously: clean rendering inside Google\'s core indexing pipeline, semantic alignment with the entities your buyers actually search for, and durable trust signals that survive each algorithmic update.'
    ],
    approach: [
      { step: '1', title: 'Forensic technical audit.', desc: 'We start with a full-stack diagnostic. We crawl every URL, model render latency against Core Web Vitals thresholds, evaluate JavaScript hydration costs, and benchmark your indexation rate against your true page inventory. We surface where Googlebot is wasting crawl budget, which pages are silently de-indexed, and which technical debts are suppressing rankings you should already hold.' },
      { step: '2', title: 'Entity & topical architecture mapping.', desc: 'We model your market as an interconnected semantic graph. We map each service, product, and target buyer to its corresponding entity node in Google\'s Knowledge Graph, then build pillar-and-cluster topical hubs that flow authority from informational queries down to high-intent transactional pages. We eliminate keyword cannibalization at the URL level so every page targets a unique, isolated intent.' },
      { step: '3', title: 'Schema engineering.', desc: 'We build nested JSON-LD structured data that explicitly declares your organization, services, authors, and topical expertise. We connect your schema graph to authoritative external nodes — Wikipedia, DBpedia, official directories — using `about`, `mentions`, and `knowsAbout` properties. This removes ambiguity from how search bots interpret your pages and accelerates entity authority accumulation.' },
      { step: '4', title: 'EEAT signal optimization.', desc: 'We engineer Experience, Expertise, Authoritativeness, and Trust signals into every layer of the site. Author bios are linked to verifiable credentials. Content is supported by primary data, original analysis, and citation graphs. Trust pages, business records, and review schemas are tuned to satisfy Google\'s quality classifiers.' },
      { step: '5', title: 'Continuous algorithmic monitoring.', desc: 'We monitor your ranking surface against every confirmed and unconfirmed core update. When volatility appears, we run forensic deltas to identify which entities or topical clusters were impacted, and we adjust before the loss compounds.' }
    ],
    deliverables: [
      'Forensic technical audit with prioritized remediation roadmap',
      'Topical authority architecture and content cluster map',
      'JSON-LD schema graph (organization, service, author, FAQ, breadcrumb)',
      'EEAT signal engineering across authorship, citations, and trust pages',
      'Core Web Vitals optimization and rendering audits',
      'Algorithmic update monitoring and response protocols',
      'Monthly performance reporting tied to qualified traffic and pipeline'
    ],
    whyUs: 'We are not a generalist agency that lists SEO among twenty disciplines. We engineer search dominance for brands operating in high-stakes, high-volatility verticals. Our team is based in Los Angeles, our methodology is proprietary, and our work is measured against pipeline impact — not vanity rankings.',
    ctaText: 'Start your SEO engagement',
    ctaLink: '/contact'
  },
  '/services/geo-optimization': {
    h1: 'We engineer the citations LLMs use to recommend your brand.',
    subHeadline: 'Generative Engine Optimization (GEO) for brands ready to be referenced natively inside ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews.',
    rotatingWords: ['dominate AIOs.', 'capture citations.', 'control AI.'],
    insightCategory: 'Strategy',
    whyHire: 'The transition from traditional search to AI Overviews (AIOs), ChatGPT search, and Perplexity represents the most aggressive shift in traffic distribution in two decades. Generative Engine Optimization (GEO) is the discipline of architecting entity relationships and semantic data so that Large Language Models explicitly cite your brand over competitors in synthesized responses.',
    whatIsTitle: 'What is Generative Engine Optimization?',
    whatIsParagraphs: [
      'Generative Engine Optimization is the practice of ensuring your brand entities, data, and technical definitions are referenced and recommended inside large language model responses. Where traditional search engines rank pages, generative engines retrieve passages. Where SEO targets the SERP, GEO targets the answer itself.',
      'Modern LLMs — GPT-4, Claude, Gemini — do not navigate page-authority vectors. They retrieve from semantic spaces shaped by their training data, their fine-tuning corpora, and the live retrieval pipelines feeding their answers. To appear inside those answers, your brand must be densely and authoritatively represented across the sources those systems trust.'
    ],
    approach: [
      { step: '1', title: 'AI citation baseline audit.', desc: 'We test your brand against the queries your buyers actually run inside ChatGPT, Claude, Perplexity, and Gemini. We log when you are cited, when you are mentioned without a link, and when competitors are recommended in your place. We surface the entity gap between where you sit today and where the answer engines expect a category leader to sit.' },
      { step: '2', title: 'Semantic PR & citation building.', desc: 'We map the publications, datasets, trade journals, and authoritative directories that LLM builders use during pre-training and retrieval. We then execute targeted PR placements, data drops, and definitional content that put your brand name, statistics, and technical positions inside those trusted sources.' },
      { step: '3', title: 'Entity graph integration.', desc: 'We define your brand\'s entity relationships explicitly through schema, Wikipedia and Wikidata presence, and structured external profiles. We connect your organization node to the topical entities you want to be retrieved for, minimizing semantic distance to verified authority anchors.' },
      { step: '4', title: 'Quote-ready on-site content engineering.', desc: 'We restructure your pages to match LLM extraction habits: clean summaries at the top of every section, tabular comparisons, direct Q&A blocks, and citation-friendly definitional statements. When a retrieval pipeline scans your page, it finds quote-ready answers, not buried marketing prose.' },
      { step: '5', title: 'Citation rate monitoring.', desc: 'We track your LLM citation rate as a primary KPI across model providers. We measure share of voice inside generative answers, monitor citation drift after model updates, and re-deploy entity reinforcement where coverage decays.' }
    ],
    deliverables: [
      'AI citation baseline audit across ChatGPT, Claude, Perplexity, Gemini',
      'Semantic PR strategy and target source list',
      'Entity graph integration (schema, Wikidata, authoritative profiles)',
      'Quote-ready content restructuring across priority pages',
      'Definitional content assets engineered for LLM retrieval',
      'Monthly citation rate reporting by model and query category'
    ],
    whyUs: 'We were among the first agencies to treat generative engine visibility as a discrete engineering discipline. Our methodology is built on entity science, not guesswork. We measure success in citation rate — the percentage of priority queries where your brand appears inside the answer itself.',
    ctaText: 'Start your GEO program',
    ctaLink: '/contact'
  },
  '/google-penalty-recovery': {
    h1: 'We recover the traffic that algorithm updates took away.',
    subHeadline: 'Forensic recovery audits for domains hit by Google Core Updates, the Helpful Content System, link spam updates, or manual actions. We diagnose the drop and restore index standing.',
    rotatingWords: ['lift penalties.', 'restore traffic.', 'remove actions.'],
    insightCategory: 'SEO',
    whyHire: 'A manual action or a severe algorithmic suppression (like the HCU or a core update demolition) is not a standard SEO problem; it is an existential business crisis. The recovery protocol requires forensic data analysis, aggressive content remediation, backlink risk disavowal, and direct communication with Google\'s webspam team. Generalist SEO agencies fail at this because they try to optimize a penalized site. We do not optimize it. We forensically rebuild its trust metrics.',
    whatIsTitle: 'What is Google penalty recovery?',
    whatIsParagraphs: [
      'Google penalty recovery is the discipline of diagnosing and reversing a domain-wide or page-level loss of organic visibility caused by an algorithmic update, a manual action, or a systemic quality degradation. Recovery requires three capabilities: forensic identification of the precise signal that was demoted, structural remediation of the underlying content or technical defect, and the time and patience to allow Google\'s quality classifiers to revalidate the domain.',
      'Most recoveries fail because the operator treats symptoms — adding content, building links — without diagnosing the cause. We invert that. We diagnose first, then we operate.'
    ],
    approach: [
      { step: '1', title: 'Forensic update audit.', desc: 'We anchor your traffic loss to confirmed update windows. We segment the affected URLs by topical cluster, page type, query intent, and historical ranking depth. We benchmark each affected segment against unaffected control segments to isolate the precise structural or content signal that was demoted.' },
      { step: '2', title: 'Quality classifier modeling.', desc: 'We model your site against the public criteria of Google\'s quality rater guidelines and the documented characteristics of Helpful Content System demotions. We score authorship signals, originality, depth of expertise, advertising load, and user experience friction. We identify the exact pages and clusters that fall below the post-update quality threshold.' },
      { step: '3', title: 'Content pruning and restructuring.', desc: 'We prune low-value, thin, and AI-generated content that drags the domain-level quality signal downward. We consolidate near-duplicate pages, restructure thin clusters into authoritative pillar hubs, and re-engineer remaining content to meet the EEAT bar the update enforces.' },
      { step: '4', title: 'Algorithmic trust restoration.', desc: 'We rebuild the trust signals the demotion stripped. We harden authorship and credentialing, repair internal link equity, restore citation density to authoritative sources, and engineer the structured data Google now requires to re-classify the domain.' },
      { step: '5', title: 'Recovery monitoring.', desc: 'We monitor ranking recovery on a daily basis across the affected clusters. We log re-indexation events, ranking returns, and click-through recovery, and we report against a defined recovery curve.' }
    ],
    deliverables: [
      'Forensic update audit with cause-of-drop diagnosis',
      'Affected cluster map with prioritized remediation plan',
      'Content pruning, consolidation, and restructuring program',
      'Authorship, credentialing, and EEAT signal repair',
      'Schema and internal linking restoration',
      'Daily ranking monitoring and recovery reporting'
    ],
    whyUs: 'We recover sites that other agencies have given up on. Our methodology is forensic, our diagnostic is documented, and our recovery work is measured against a baseline established before we touch a single page.',
    ctaText: 'Audit my traffic loss',
    ctaLink: '/contact'
  },
  '/services/lead-generation': {
    h1: 'We engineer pipeline, not leads.',
    subHeadline: 'Automated outbound, real-time intent signal tracking, and CRM routing — built to consistently book qualified meetings with the accounts your sales team actually wants.',
    rotatingWords: ['generate leads.', 'scale sales.', 'capture intent.'],
    insightCategory: 'Strategy',
    whyHire: 'Traffic is vanity. Pipeline is the only metric that matters. B2B lead generation fails when marketing optimizes for top-of-funnel volume rather than bottom-of-funnel intent. We engineer high-intent acquisition systems that integrate search visibility, conversion architecture, and CRM routing to produce sales-qualified opportunities that close. If it does not generate pipeline, we do not build it.',
    whatIsTitle: 'What is B2B pipeline architecture?',
    whatIsParagraphs: [
      'B2B pipeline architecture is the discipline of designing the systems, signals, and sequences that convert anonymous market interest into qualified, sales-ready meetings. It combines outbound automation, intent data infrastructure, CRM workflow design, and attribution modeling into a single closed-loop engine.',
      'A correctly engineered pipeline does three things: it identifies which accounts are in-market before they self-identify, it triggers the right outreach at the right moment in the buying cycle, and it routes the resulting demand into a sales process that closes.'
    ],
    approach: [
      { step: '1', title: 'Account and intent diagnostic.', desc: 'We start by modeling your ideal customer profile against the actual intent signals available to capture them. We audit your existing CRM data, lost-deal records, and traffic patterns to define the in-market account universe. We then design the intent infrastructure required to surface those accounts in real time.' },
      { step: '2', title: 'Reverse-IP de-anonymization.', desc: 'We deploy reverse-IP and identity resolution at the page layer. We resolve visiting IPs to specific corporate networks, log the pages each account reads, and assemble an account-level engagement record before any form is ever submitted. This intent stream feeds directly into your CRM as enriched account signal.' },
      { step: '3', title: 'Automated outbound sequence design.', desc: 'We design and launch cold outreach sequences calibrated against the buyer\'s research behavior. We sequence multi-touch outreach across email, LinkedIn, and direct channels — timed against account-level intent triggers — and we run continuous A/B tests against open rate, reply rate, and meeting conversion.' },
      { step: '4', title: 'CRM routing and attribution.', desc: 'We build the routing logic, lifecycle stages, and attribution model your CRM needs to operate as a pipeline engine. We integrate Salesforce or HubSpot with your outbound platform, your intent infrastructure, and your reporting layer so every meeting booked traces cleanly back to its originating signal.' },
      { step: '5', title: 'Pipeline reporting and optimization.', desc: 'We report against the metrics that matter — qualified meetings, opportunity creation rate, pipeline value, and closed-won attribution — and we optimize the engine continuously against the constraint that limits pipeline yield.' }
    ],
    deliverables: [
      'Ideal customer profile and in-market account modeling',
      'Reverse-IP de-anonymization and intent infrastructure deployment',
      'Automated cold outreach sequences (email, LinkedIn, multi-touch)',
      'CRM integration, lifecycle stages, and routing logic (Salesforce / HubSpot)',
      'Multi-touch attribution model tied to pipeline and closed-won',
      'Weekly pipeline reporting and continuous sequence optimization'
    ],
    whyUs: 'We engineer pipeline systems for brands that have outgrown the spray-and-pray outbound model. Our work is measured against qualified pipeline value and closed-won attribution — the only metrics that justify the investment.',
    ctaText: 'Book a pipeline strategy call',
    ctaLink: '/contact'
  },
  '/services/web-development': {
    h1: 'We engineer websites the way engineers build products.',
    subHeadline: 'Custom React and Vite applications, native CRMs, Web3 platforms, and AI video systems — built from scratch with sub-second load times, conversion architecture, and zero template bloat.',
    rotatingWords: ['build apps.', 'engineer performance.', 'scale conversion.'],
    insightCategory: 'Technical',
    whyHire: 'Brands hire us because page-builder templates and bloated CMS stacks throttle every performance metric that matters — Core Web Vitals, organic ranking eligibility, conversion rate, and pipeline yield. We build sites the way engineers build products: from scratch, in React and Vite, with conversion architecture engineered into the page layer and integration logic engineered into the application itself.',
    whatIsTitle: 'What is performance web development?',
    whatIsParagraphs: [
      'Performance web development is the discipline of building websites and applications that meet the technical standards modern search engines, conversion frameworks, and user expectations now demand. Sub-second time-to-interactive. Clean rendering for both browsers and crawlers. Native integration with the CRM and intent systems that drive pipeline. Conversion architecture engineered into the page layer rather than retrofitted onto it.',
      'A site that fails these standards leaks ranking eligibility at the technical layer, leaks revenue at the conversion layer, and leaks pipeline at the integration layer.'
    ],
    approach: [
      { step: '1', title: 'Technical and conversion baseline.', desc: 'We audit the current site against rendering performance, Core Web Vitals, indexation health, and conversion friction. We benchmark against verticals and define the technical and conversion targets the new build must meet.' },
      { step: '2', title: 'Architecture and stack selection.', desc: 'We design the application architecture in React and Vite — chosen for bundle size, rendering speed, and SEO compatibility. We define the component hierarchy, routing strategy, and rendering model (SSG, SSR, or hybrid) calibrated to your indexation and conversion requirements.' },
      { step: '3', title: 'Conversion architecture engineering.', desc: 'We engineer conversion paths into the page layer from the first line of code. CTA placement, scroll behavior, form architecture, and trust signal sequencing are designed against documented buyer behavior — not retrofitted from a template.' },
      { step: '4', title: 'Native integration layer.', desc: 'We build native integrations with your CRM, intent infrastructure, marketing automation, and analytics stack. Where appropriate, we build custom CRMs, marketplace platforms, smart contract integrations, AI video pipelines, and Web3 wallet connections directly into the application.' },
      { step: '5', title: 'Performance and ranking hand-off.', desc: 'We hand off a site that meets sub-second load times, clean Core Web Vitals, full schema implementation, and the rendering standards modern search engines require. The site is engineered to win indexation, win conversion, and feed pipeline from day one.' }
    ],
    deliverables: [
      'Custom React and Vite application engineered from scratch',
      'Sub-second time-to-interactive and clean Core Web Vitals',
      'Conversion architecture engineered into the page layer',
      'Native CRM, marketplace, or platform integrations',
      'Web3, smart contract, and wallet integrations where applicable',
      'AI video systems and automation pipelines',
      'Full schema, structured data, and indexation readiness at launch'
    ],
    whyUs: 'We do not assemble sites from templates. We engineer them. Our recent builds include the RemodelMe Pros contractor marketplace, the SafetyCentric commercial security platform, The Ark crypto platform on PulseChain, and multi-location dental office systems — every one of them built in React and Vite, every one of them measured against performance and pipeline outcomes.',
    ctaText: 'Start a development project',
    ctaLink: '/contact'
  },
  '/services/ppc-advertising': {
    h1: 'We engineer paid media for return on ad spend, not impressions.',
    subHeadline: 'Precision-targeted paid search, paid social, and LinkedIn B2B pipelines across Google, Microsoft, and Meta — engineered to maximize ROAS and lower customer acquisition cost.',
    rotatingWords: ['drive ROAS.', 'scale media.', 'lower CAC.'],
    insightCategory: 'Analytics',
    whyHire: 'Brands hire us because most paid media programs optimize against the wrong metric. They chase impressions, clicks, and platform-reported conversions while the actual pipeline impact decays. We invert that. We engineer paid media against ROAS, qualified pipeline, and closed-won attribution — and we run the campaign architecture, creative testing, and funnel measurement required to defend those numbers against scrutiny.',
    whatIsTitle: 'What is ROAS-driven paid media?',
    whatIsParagraphs: [
      'ROAS-driven paid media is the discipline of engineering paid acquisition against return on ad spend rather than against platform-reported surface metrics. It requires three capabilities: intent-aligned targeting that surfaces ads to genuinely in-market buyers, conversion architecture that maximizes the value of every click, and an attribution model that traces pipeline and revenue back to the originating ad — not the last-click platform stat.',
      'A paid program that optimizes against the wrong metric scales the wrong thing. We scale the right one.'
    ],
    approach: [
      { step: '1', title: 'Account, audience, and intent audit.', desc: 'We audit your existing accounts, your audience segmentation, your conversion infrastructure, and your attribution model. We surface where budget is being wasted on low-intent surfaces, where creative is decaying, and where conversion friction is suppressing the ROAS your spend should already be producing.' },
      { step: '2', title: 'Intent-based search architecture.', desc: 'We rebuild your paid search around buyer intent rather than keyword volume. We segment campaigns by funnel stage, by buyer persona, and by competitive context. We engineer negative keyword libraries, bid strategies, and ad copy that captures the high-intent slice of every query category.' },
      { step: '3', title: 'LinkedIn B2B pipeline campaigns.', desc: 'For B2B clients, we architect LinkedIn campaigns against company size, role seniority, industry, and intent signal. We engineer the offer, the landing experience, and the lead routing so paid social produces sales-qualified pipeline, not raw lead volume.' },
      { step: '4', title: 'Continuous A/B testing and funnel management.', desc: 'We run continuous, statistically valid A/B testing against creative, copy, landing experience, and offer. We manage the funnel as a system — not a single ad — and we report against funnel-stage conversion rates rather than top-of-funnel surface metrics.' },
      { step: '5', title: 'Attribution and reporting.', desc: 'We connect paid media spend to qualified pipeline and closed-won revenue through a defensible multi-touch attribution model. We report weekly against ROAS, CAC, and pipeline contribution, and we re-allocate spend against the channels and campaigns that produce.' }
    ],
    deliverables: [
      'Account, audience, and conversion infrastructure audit',
      'Intent-based paid search architecture across Google and Microsoft',
      'LinkedIn B2B pipeline campaign design and execution',
      'Continuous A/B testing across creative, copy, and landing experience',
      'Multi-touch attribution model tied to pipeline and revenue',
      'Weekly ROAS, CAC, and pipeline contribution reporting'
    ],
    whyUs: 'We do not run paid media as a standalone discipline. We run it as one engine inside an integrated growth system — connected to the SEO, GEO, pipeline, and web infrastructure we engineer alongside it. That integration is where the ROAS lift comes from.',
    ctaText: 'Book a paid media diagnostic',
    ctaLink: '/contact'
  }
};

const SolutionPage: React.FC<{ path: string }> = ({ path }) => {
  const data = SOLUTIONS_DATA[path];

  useEffect(() => {
    // Scroll animations
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.reveal-up');
      elements.forEach((el: any) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    window.scrollTo({ top: 0, behavior: 'instant' });

    const baseTitles: Record<string, string> = {
      '/services/seo': 'Technical & Forensic SEO Services in Los Angeles | Gobiya',
      '/services/geo-optimization': 'Generative Engine Optimization (GEO) Services | Gobiya',
      '/google-penalty-recovery': 'Google Penalty Recovery & Traffic Restoration Services | Gobiya',
      '/services/lead-generation': 'B2B Pipeline Architecture & Lead Generation Services | Gobiya',
      '/services/web-development': 'Custom React & Vite Web Development for Performance Brands | Gobiya',
      '/services/ppc-advertising': 'ROAS-Driven PPC & Paid Media Management | Gobiya',
    };
    if (baseTitles[path]) {
      document.title = baseTitles[path];
    }

    return () => ctx.revert();
  }, [path]);

  if (!data) return <div className="text-white text-center py-40">Solution not found.</div>;

  return (
    <div className="bg-[#050505] min-h-screen font-sans selection:bg-[#F26522]/30 selection:text-white page-wrapper">
      
      {/* Nav */}
      <Header theme="light" />

      {/* ── HERO ── */}
      <section className="relative w-full h-[65vh] min-h-[480px] bg-[#EFEFEF] overflow-hidden flex flex-col justify-center cursor-default">
        {/* Shaders Background */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full [&>div]:w-full [&>div]:h-full [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover">
          <Shader>
            <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
            <ChromaFlow baseColor="#ffffff" downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={13} radius={3.5} />
            <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
            <FilmGrain strength={0.05} />
          </Shader>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto flex flex-col justify-center px-5 sm:px-8 lg:px-12 pt-16 pb-0">
          <p className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide mb-4 uppercase font-medium">
            Gobiya Services {'>'} {data.h1}
          </p>
          <h1 className="text-[clamp(1.5rem,5.5vw,3.2rem)] sm:text-[clamp(1.8rem,4.5vw,3.8rem)] font-medium leading-[1.15] tracking-[-0.03em] text-gray-900 max-w-[1200px]">
            {data.h1} {data.rotatingWords ? (
              <RotatingText
                texts={data.rotatingWords}
                mainClassName="inline-flex overflow-hidden text-[#F26522] align-text-bottom"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1 -mb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
            ) : null}
          </h1>
          <p className="mt-6 text-[15px] sm:text-[17px] text-gray-700 max-w-[800px] leading-relaxed">
            {data.subHeadline}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <a href="/contact" className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 sm:pl-6 pr-2 py-2 transition-colors duration-300">
              <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  {data.ctaText}
                </span>
                <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  {data.ctaText}
                </span>
              </div>
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY BRANDS HIRE US ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-4 reveal-up">
              <h2 className="text-sm font-bold tracking-widest uppercase text-[#F26522] mb-4">
                Why brands hire Gobiya
              </h2>
            </div>
            <div className="lg:col-span-8 reveal-up">
              <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed font-light">
                {data.whyHire}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS... ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 bg-white/5 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            <div className="lg:col-span-4 reveal-up">
              <h2 className="text-sm font-bold tracking-widest uppercase text-[#F26522] mb-4">
                {data.whatIsTitle}
              </h2>
            </div>
            <div className="lg:col-span-8 reveal-up">
              <div className="space-y-6">
                {data.whatIsParagraphs.map((para, i) => (
                  <p key={i} className="text-lg text-gray-400 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-16 font-display reveal-up">
            Our Approach
          </h2>
          <div className="grid grid-cols-1 gap-12 relative">
            <div className="absolute left-[27px] top-4 bottom-4 w-px bg-white/10 hidden md:block" />
            {data.approach.map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-6 md:gap-12 relative z-10 reveal-up">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-[#050505] border border-white/20 text-[#F26522] font-display text-xl">
                  {item.step}
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed max-w-3xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES & WHY US ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-12 bg-white/5 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Deliverables */}
          <div className="reveal-up">
            <h2 className="text-2xl font-medium text-white mb-8 font-display">
              Key Deliverables
            </h2>
            <ul className="space-y-4">
              {data.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-gray-400">
                  <CheckCircle2 className="w-5 h-5 text-[#F26522] flex-shrink-0 mt-1" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Gobiya */}
          <div className="reveal-up">
            <h2 className="text-2xl font-medium text-white mb-8 font-display">
              Why Gobiya?
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-10">
              {data.whyUs}
            </p>
            <a href={data.ctaLink} className="inline-flex items-center gap-3 bg-white text-black hover:bg-[#F26522] hover:text-white transition-colors duration-300 px-8 py-4 text-sm font-semibold tracking-wide uppercase group">
              {data.ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </section>

      {/* SECTION: LATEST INSIGHTS */}
      <div data-logo-dark className="relative bg-[#EFEFEF]">
        <InsightsSlider limit={3} filterCategory={data.insightCategory} />
      </div>

      {/* ── FOOTER ── */}
      <Footer />

    </div>
  );
};

export default SolutionPage;
