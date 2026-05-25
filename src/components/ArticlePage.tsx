import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';
import StaggeredMenu from './StaggeredMenu';
import BlurText from './BlurText';
import GradualBlur from './GradualBlur';
import CustomCursor from './CustomCursor';

interface ArticleData {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  heroAlt: string;
  metaDescription: string;
  content: React.ReactNode;
}

// ─── Article Registry ────────────────────────────────────────────────────────
// Each article is statically registered here so we can do fast client-side
// routing without a DB round-trip. Add new articles to this map.
const ARTICLES: Record<string, ArticleData> = {
  'automated-b2b-sales-pipeline-seo': {
    slug: 'automated-b2b-sales-pipeline-seo',
    title: 'Automated B2B Sales Pipeline SEO: How AI Citations Shape Your Shortlist in 2026',
    category: 'Strategy',
    readTime: '12 min read',
    date: 'May 25, 2026',
    image: '/images/article-b2b-pipeline-seo.webp',
    heroAlt: 'Abstract data-flow visualization representing an automated B2B sales pipeline powered by AI-driven SEO',
    metaDescription: 'How AI-cited content qualifies B2B vendors for buyer shortlists — and what the 2026 shift to AI-driven research means for your pipeline.',
    content: (
      <>
        {/* ── LEAD STATS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 my-10 sm:my-14">
          {[
            { stat: '73%', label: 'B2B buyers using AI tools in vendor research', source: 'Averi, March 2026' },
            { stat: '51%', label: 'B2B software buyers starting research in an AI chatbot', source: 'G2, April 2026' },
            { stat: '5.1×', label: 'AI search conversion rate advantage over Google organic', source: 'SE Ranking 2026' },
          ].map(({ stat, label, source }) => (
            <div key={stat} className="border border-[#F26522]/30 bg-[#F26522]/5 p-6">
              <p className="text-4xl font-bold text-[#F26522] mb-2 font-display">{stat}</p>
              <p className="text-[14px] text-gray-900 leading-snug mb-1">{label}</p>
              <p className="text-[11px] uppercase tracking-wider text-gray-500">{source}</p>
            </div>
          ))}
        </div>

        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-8">
          Automated B2B sales pipeline SEO can mean the difference between a vendor appearing on an AI-generated shortlist
          and a website that never gets surfaced when a buyer asks ChatGPT, Claude, or Perplexity which providers they
          should evaluate. AI assistants now handle the early stages of most B2B research — and the vast majority of that
          research happens before any sales rep is contacted. So buyers arrive at vendor websites with their shortlist
          already built, and traditional SEO playbooks — optimised for Google's blue links — often land on the wrong side
          of that filter.
        </p>

        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-8">
          This is the problem an automated B2B sales pipeline SEO approach solves. The strongest B2B operators have rebuilt
          their content and prospecting workflows around how AI systems retrieve, cite, and recommend vendors. Most
          companies don't find out their pipeline is structurally invisible to AI until an entire quarter of inbound dries
          up — while their Google rankings still look fine.
        </p>

        {/* ── INLINE CTA (interlinking to lead-generation) ── */}
        <div className="bg-gray-900 text-white p-6 sm:p-8 my-10 sm:my-14 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <p className="text-[12px] uppercase tracking-wider text-[#F26522] font-semibold mb-2">Gobiya Service</p>
            <p className="text-[17px] sm:text-[19px] font-medium leading-snug">
              Build a predictable B2B pipeline with AI-aware prospecting systems.
            </p>
          </div>
          <a
            href="/services/lead-generation"
            className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 pr-2 py-2 transition-colors duration-300 whitespace-nowrap shrink-0"
          >
            <span className="text-[13px] font-medium mr-3">B2B Pipeline Architecture</span>
            <div className="w-6 h-6 bg-white flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-[#F26522] transition-transform duration-300 group-hover:-rotate-45" />
            </div>
          </a>
        </div>

        {/* ── SECTION 1 ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          What automated B2B sales pipeline SEO actually does
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Traditional B2B SEO targets keywords and links. The content team writes a blog post, the SEO team builds
          backlinks, and the page ranks for a query a buyer might type into Google. That worked when the buyer journey
          started with a search box and ended on a results page. It works less well now that more than half of B2B software
          buyers begin their research inside an AI chatbot — and that AI chatbot synthesises the answer rather than handing
          them ten links to click.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Automated B2B sales pipeline SEO adds a layer of operational logic on top of{' '}
          <a href="/services/seo" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">
            traditional SEO
          </a>
          . The system identifies which questions buyers actually ask AI tools at each stage of the pipeline, produces
          content engineered to be extracted and cited by those tools, monitors which third-party sources the AI engines
          trust in the category, and feeds prospecting workflows with the accounts already exhibiting research-stage intent.
        </p>

        {/* ── PULL QUOTE ── */}
        <blockquote className="border-l-4 border-[#F26522] pl-6 sm:pl-8 my-10 sm:my-14">
          <p className="text-[18px] sm:text-[22px] font-medium leading-[1.5] text-gray-900 italic">
            "It's not about publishing more posts. It's about making sure the right content is retrievable by the right
            system at the moment a buyer is forming an opinion."
          </p>
        </blockquote>

        <h3 className="text-[18px] sm:text-[20px] font-medium text-gray-900 mt-10 mb-4">
          Why publishing volume alone isn't enough for AI citation
        </h3>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Publishing handles the first pass: more pages, more topical coverage, more chances to be indexed. But indexing is
          not citation. AI assistants don't cite pages because they exist — they cite pages that match a specific question
          with a clean, self-contained answer, are reinforced by third-party sources the model already trusts, and are
          recent enough to clear the freshness threshold the model applies to time-sensitive topics.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-8">
          Volume-only SEO is not sufficient for AI citation eligibility. Entity association across third-party publications
          is the layer that makes a vendor citable and trustable. Without that earned-media footprint, you have a larger
          website — not a more retrievable one.
        </p>

        {/* ── SECTION 2 ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          How the AI citation framework shapes your pipeline outcome
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          AI assistants operate under a retrieval-and-trust framework. Vendors with weak entity association, thin
          third-party coverage, and stale content receive lower citation priority than vendors with clear answers, recent
          updates, and earned-media presence on the sources each platform tends to trust.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Forrester's 2026 Buyers' Journey Survey of nearly 18,000 global buyers found generative AI and conversational
          search are now named as the most meaningful research source — outranking vendor websites, product experts, and
          sales representatives. A separate Moz analysis of 40,000 queries found that{' '}
          <strong className="font-semibold text-gray-900">88% of Google AI Mode citations do not appear in the organic top ten results</strong>.
          The implication is direct: the page that ranks #3 on Google may not be the page the AI cites.
        </p>

        {/* ── COST SECTION ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          The cost of invisibility most operators overlook
        </h2>
        <div className="bg-[#f7f7f7] border border-gray-200 p-6 sm:p-10 my-8">
          <h3 className="text-[15px] uppercase tracking-wider font-semibold text-gray-500 mb-6">U.S. B2B Lead Cost Benchmarks — 2026</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Average qualified B2B lead', value: '$198' },
              { label: 'Healthcare technology lead', value: '$400+' },
              { label: 'Enterprise software lead', value: '$440+' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900 mb-1">{value}</span>
                <span className="text-[13px] text-gray-600 leading-snug">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-gray-500 mt-6 leading-relaxed border-t border-gray-200 pt-4">
            <strong>Note:</strong> Cost-per-qualified-lead benchmarks vary by industry, ACV, and geography. These figures reflect U.S. B2B SaaS averages reported across multiple 2026 industry analyses. Verify against your own pipeline data before making budget decisions.
          </p>
        </div>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          If 51% of buyers start in an AI chatbot and 69% change their planned vendor based on AI guidance, then the vendor
          that isn't cited has already lost the deal before the SDR sequence begins. A team running a $30,000-per-month{' '}
          <a href="/services/lead-generation" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">
            outbound program
          </a>{' '}
          is buying roughly 150 qualified meetings at the upper end. If even 30% of target accounts have already shortlisted
          competitors via AI before the first cold email lands, that's the equivalent of paying for a sequence sent to
          prospects who already have a different vendor on their evaluation list.
        </p>

        {/* ── SECTION 3 ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          How automated B2B sales pipeline SEO works — from query to captured pipeline
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          When a buyer asks an AI assistant a vendor-research question, the model runs retrieval against its training data
          and live web index. Sources are weighted by authority, third-party validation, freshness, and answer-extractability.
          The model assembles a shortlist of cited vendors within seconds. That shortlist is what the buyer takes into the
          next stage.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          AI search traffic converts at <strong className="font-semibold text-gray-900">14.2%</strong> compared with 2.8%
          for Google organic, and that traffic spends 68% more time on the site (SE Ranking, 2026). Some operators integrate
          intent-signal capture directly into the workflow, surfacing visiting accounts to sales in near real time.
        </p>

        <h3 className="text-[18px] sm:text-[20px] font-medium text-gray-900 mt-10 mb-4">
          How automated lead generation SEO connects to outbound prospecting
        </h3>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          The same content infrastructure that earns AI citations also feeds outbound. When AI-cited content surfaces an
          account, the visit can be matched to a firmographic profile and routed to the SDR queue with full context. This is
          the bridge between automated lead generation SEO and outbound prospecting. The page does the discovery work. The
          intent signal does the routing work. The SDR's first touch becomes a response to a known research session, not a
          cold start.
        </p>

        {/* ── DATA TABLE ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          The citation problem by the numbers
        </h2>
        <div className="overflow-x-auto my-8">
          <table className="w-full border-collapse text-[14px] sm:text-[15px]">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left px-4 py-3 font-semibold text-[12px] uppercase tracking-wider">Finding</th>
                <th className="text-left px-4 py-3 font-semibold text-[12px] uppercase tracking-wider">Stat</th>
                <th className="text-left px-4 py-3 font-semibold text-[12px] uppercase tracking-wider">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                ['B2B buyers start research in AI chatbot', '51%', 'G2, April 2026'],
                ['Changed planned vendor based on AI guidance', '69%', 'G2, April 2026'],
                ['Bought from a vendor never heard of before AI surfaced it', '33%', 'G2, April 2026'],
                ['Think more highly of a vendor when AI mentions them', '85%', 'G2, April 2026'],
                ['Non-paid AI citations from earned media sources', '85%+', 'Muck Rack analysis'],
                ['Google AI Mode citations NOT in organic top 10', '88%', 'Moz analysis, 40k queries'],
              ].map(([finding, stat, source]) => (
                <tr key={finding as string} className="even:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 leading-snug">{finding}</td>
                  <td className="px-4 py-3 font-bold text-[#F26522] whitespace-nowrap">{stat}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-[13px]">{source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── GEO CTA ── */}
        <div className="bg-gray-900 text-white p-6 sm:p-8 my-10 sm:my-14 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <p className="text-[12px] uppercase tracking-wider text-[#F26522] font-semibold mb-2">Related Service</p>
            <p className="text-[17px] sm:text-[19px] font-medium leading-snug">
              Get cited by ChatGPT, Claude, Perplexity, and Gemini — not just Google.
            </p>
          </div>
          <a
            href="/services/geo-optimization"
            className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 pr-2 py-2 transition-colors duration-300 whitespace-nowrap shrink-0"
          >
            <span className="text-[13px] font-medium mr-3">Generative Engine Optimization</span>
            <div className="w-6 h-6 bg-white flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-[#F26522] transition-transform duration-300 group-hover:-rotate-45" />
            </div>
          </a>
        </div>

        {/* ── SECTION 4 ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          What separates legitimate automation from a marketing claim
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Not every agency or platform calling itself "AI SEO" operates at the same standard. Start with measurement. Ask
          any prospective vendor what they track. If the only metrics they report are Google rankings, organic clicks, and
          domain authority, they are not running AI-aware pipeline SEO — they are running classical{' '}
          <a href="/services/seo" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">
            SEO
          </a>{' '}
          with a new label.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-4">Real programs track:</p>
        <ul className="space-y-3 mb-8 pl-0">
          {[
            'AI citation share across ChatGPT, Claude, Perplexity, and Gemini',
            'Third-party sources cited in AI answers for your category',
            'Referral traffic from AI platforms (all four pass identifiable referrer signals)',
            'robots.txt access for GPTBot, ClaudeBot, PerplexityBot, and Google-Extended',
            'Scheduled freshness updates on revenue-tied pages (AI citations skew toward content updated in the last 30–90 days)',
            'Earned-media or digital-PR motion — over 85% of non-paid AI citations originate from earned media sources',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-[16px] sm:text-[17px] leading-[1.6] text-gray-800">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#F26522] shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* ── B2B MOTION CARDS ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Which B2B motions get the clearest return
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            {
              title: 'Product-Led Growth SaaS',
              body: 'Buyers who arrive from an AI-cited shortlist convert into trials at materially higher rates than paid-acquisition traffic, and the time-to-value compression compounds quarter over quarter.',
              link: '/services/geo-optimization',
              linkLabel: 'Explore GEO',
            },
            {
              title: 'Enterprise & High-ACV Platforms',
              body: 'Procurement teams research independently in different AI tools. A vendor that wins ChatGPT but is invisible in Claude may be missing the developer audience that decides whether the deal moves to commercial review.',
              link: '/services/seo',
              linkLabel: 'Explore SEO',
            },
            {
              title: 'Outsourced Services Firms',
              body: 'Agencies and consultancies benefit most from earned-media-led citation strategies, because their categories are saturated with self-promotional content that AI engines have learned to deprioritise.',
              link: '/services/lead-generation',
              linkLabel: 'Explore lead gen',
            },
            {
              title: 'B2B Marketplaces & Platform Plays',
              body: 'Need category-defining content that AI engines can use to map the category itself — since the platform\'s value depends on being cited as the answer to "where do I find providers in this space?"',
              link: '/company/approach',
              linkLabel: 'Our approach',
            },
          ].map(({ title, body, link, linkLabel }) => (
            <div key={title} className="border border-gray-200 p-6 hover:border-[#F26522]/40 transition-colors duration-300 group">
              <h3 className="text-[16px] font-semibold text-gray-900 mb-3">{title}</h3>
              <p className="text-[14px] text-gray-700 leading-relaxed mb-4">{body}</p>
              <a href={link} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-wider font-semibold text-[#F26522] group-hover:gap-3 transition-all duration-300">
                {linkLabel} <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        {/* ── CONCLUSION ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Making the right call for your pipeline
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          B2B operators still running ranking-first SEO are watching organic traffic erode while their rankings stay stable,
          and watching outbound reply rates flatten while their target accounts quietly shortlist competitors in AI tools
          the SDR team never sees. The shift to automated B2B sales pipeline SEO isn't about chasing a new acronym. It's
          about operating a program that the systems your buyers actually use will surface.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Two decisions matter most. First: whether your current{' '}
          <a href="/services/seo" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">
            SEO and content program
          </a>{' '}
          produces output that AI engines retrieve and cite, or output that only Google indexes. Second: whether the team
          running the program tracks the right signals — citation share, earned-media footprint, AI referral traffic,
          intent-routed outbound — or only the legacy metrics that no longer correlate with pipeline.
        </p>

        {/* ── FINAL CTA ── */}
        <div className="bg-gray-900 text-white p-8 sm:p-12 my-10 sm:my-14">
          <p className="text-[12px] uppercase tracking-wider text-[#F26522] font-semibold mb-4">Start With an Audit</p>
          <h3 className="text-[22px] sm:text-[28px] font-medium leading-[1.2] tracking-[-0.02em] mb-4 max-w-xl">
            Find out exactly where your program stands relative to the AI citation threshold.
          </h3>
          <p className="text-gray-400 text-[15px] leading-relaxed max-w-2xl mb-8">
            A credible engagement starts with a citation audit, not a content calendar. We run your brand and core category
            queries through ChatGPT, Claude, Perplexity, and Gemini, capture the citation landscape, identify the
            third-party sources each engine trusts, and audit your owned content for AI extractability.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-6 pr-2 py-3 transition-colors duration-300"
          >
            <span className="text-[14px] font-medium mr-4">Request a citation audit</span>
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 group-hover:-rotate-45" />
            </div>
          </a>
        </div>
      </>
    ),
  },

  // ─────────────────────────────────────────────────────────────────────────────
  'automated-lead-generation-seo': {
    slug: 'automated-lead-generation-seo',
    title: 'Automated Lead Generation SEO: How AI Pre-Qualifies Your Pipeline in 2026',
    category: 'Strategy',
    readTime: '13 min read',
    date: 'May 25, 2026',
    image: '/images/article-lead-gen-seo.webp',
    heroAlt: 'Glowing geometric funnel with orange data-flow nodes representing AI-driven automated lead generation SEO',
    metaDescription: 'How AI-cited content produces pre-qualified pipeline at conversion rates traditional lead gen cannot match — and what the 2026 shift means for how B2B teams should measure lead quality.',
    content: (
      <>
        {/* ── LEAD STATS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 my-10 sm:my-14">
          {[
            { stat: '4.4×', label: 'Conversion premium of AI-referred traffic vs traditional organic', source: 'Conductor, 2026' },
            { stat: '87.4%', label: "ChatGPT's share of all AI referral traffic to websites", source: 'Conductor, 2026' },
            { stat: '90%', label: 'B2B click-through rate on AI Overview sources', source: 'Omniscient Digital, 2026' },
          ].map(({ stat, label, source }) => (
            <div key={stat} className="border border-[#F26522]/30 bg-[#F26522]/5 p-6">
              <p className="text-4xl font-bold text-[#F26522] mb-2 font-display">{stat}</p>
              <p className="text-[14px] text-gray-900 leading-snug mb-1">{label}</p>
              <p className="text-[11px] uppercase tracking-wider text-gray-500">{source}</p>
            </div>
          ))}
        </div>

        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-8">
          Automated lead generation SEO can mean the difference between a sales team working pre-qualified inbound and a
          team grinding through form-fills who downloaded an ebook eight weeks ago and ghosted. AI assistants now sit
          between the buyer and the vendor for a growing share of B2B research, and the leads that come out the other side
          of that filter behave fundamentally differently — they convert faster, spend more time on site, and arrive with
          the vendor already shortlisted in their head.
        </p>

        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-8">
          Most teams don't realize the gap exists until they look at the numbers and find that 1% of their traffic is
          producing 12% of their pipeline, and ask why. This is the problem an{' '}
          <a href="/insights/automated-b2b-sales-pipeline-seo" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">
            automated lead generation SEO
          </a>{' '}
          approach solves.
        </p>

        {/* ── INLINE CTA (lead gen service) ── */}
        <div className="bg-gray-900 text-white p-6 sm:p-8 my-10 sm:my-14 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <p className="text-[12px] uppercase tracking-wider text-[#F26522] font-semibold mb-2">Gobiya Service</p>
            <p className="text-[17px] sm:text-[19px] font-medium leading-snug">
              Build AI-aware lead capture systems that route pre-qualified buyers directly to your pipeline.
            </p>
          </div>
          <a
            href="/services/lead-generation"
            className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 pr-2 py-2 transition-colors duration-300 whitespace-nowrap shrink-0"
          >
            <span className="text-[13px] font-medium mr-3">B2B Pipeline Architecture</span>
            <div className="w-6 h-6 bg-white flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-[#F26522] transition-transform duration-300 group-hover:-rotate-45" />
            </div>
          </a>
        </div>

        {/* ── SECTION 1 ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          What automated lead generation SEO actually does
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Traditional lead generation SEO targets a volume number. The marketing team builds gated assets, the demand gen
          team drives traffic to them, and the funnel reports CPL as the headline metric. That worked when buyers were
          willing to trade an email address for a whitepaper. It works less well now that the average B2B buyer has filled
          out a thousand of those forms and learned the only consequence is a six-week SDR sequence they didn't ask for.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Automated lead generation SEO replaces volume-first capture with intent-first capture. The system identifies the
          buyer-research questions{' '}
          <a href="/services/geo-optimization" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">
            AI tools are surfacing in the category
          </a>
          , produces content engineered to be cited inside those answers, captures the inbound visits AI citations generate,
          and routes those visits to sales with full context — which page, which AI referrer, which research-stage intent.
        </p>

        {/* ── PULL QUOTE ── */}
        <blockquote className="border-l-4 border-[#F26522] pl-6 sm:pl-8 my-10 sm:my-14">
          <p className="text-[18px] sm:text-[22px] font-medium leading-[1.5] text-gray-900 italic">
            "It's not about producing more leads. It's about producing leads who arrived because an AI assistant told them
            the vendor was worth evaluating — and converting them while they're still in the consideration window."
          </p>
        </blockquote>

        <h3 className="text-[18px] sm:text-[20px] font-medium text-gray-900 mt-10 mb-4">
          Why gated content alone isn't enough anymore
        </h3>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          The lead that fills out a form in 2026 is not the same lead that filled out a form in 2018. They have already
          researched the category in ChatGPT or Claude before they ever found the gate. They are filling out the form to
          validate a decision they have largely made — not to begin a buying journey. Programs reporting CPL improvements
          while pipeline-to-close ratios decline are solving for the wrong metric.
        </p>

        {/* ── SECTION 2: FLYWHEEL ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          How the AI pre-qualification flywheel changes lead economics
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          AI assistants pre-qualify buyers before they ever click through to a vendor's site. The buyer asks a question,
          the AI assembles an answer that names a small number of vendors, and the buyer clicks through only after the AI
          has effectively endorsed the click. That endorsement is what produces the conversion premium.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Pixis's 2026 analysis found that AI search traffic converts at 4–5 times the rate of organic. In single-company
          case studies of B2B SaaS products, the differential reaches <strong className="font-semibold text-gray-900">23×</strong>.
          Eyeful Media's portfolio data places AI referral traffic at{' '}
          <strong className="font-semibold text-gray-900">534% higher conversion influence</strong> than the average across
          all website channels.
        </p>

        {/* ── COST BOX ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          The cost of optimizing for the wrong metric
        </h2>
        <div className="bg-[#f7f7f7] border border-gray-200 p-6 sm:p-10 my-8">
          <h3 className="text-[15px] uppercase tracking-wider font-semibold text-gray-500 mb-6">CPL Reality Check — 2026</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Reported CPL on a $30k/mo demand gen program', value: '$200' },
              { label: 'Real cost per SQL (70% MQL-to-SQL falloff)', value: '$670' },
              { label: 'All-in cost per opportunity in most B2B SaaS segments', value: '$2,500+' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900 mb-1">{value}</span>
                <span className="text-[13px] text-gray-600 leading-snug">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-gray-500 mt-6 leading-relaxed border-t border-gray-200 pt-4">
            <strong>Note:</strong> Lead quality benchmarks vary by ACV, sales motion, and category maturity. These figures reflect U.S. B2B SaaS averages from 2026 industry analyses. Run your own pipeline-to-close math against current funnel data before reallocating budget.
          </p>
        </div>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          A program that produces 30 AI-sourced leads per month instead of 150 form-fills sounds like a step backward —
          until the conversion math is applied. At a 9× conversion premium, those 30 leads produce more closed pipeline
          than 270 traditional form-fills. The visible CPL is higher. The cost per actual revenue dollar is dramatically
          lower. CPL optimization in an AI-decided market is the modern equivalent of optimizing print ad placement during
          the rise of digital.
        </p>

        {/* ── SECTION 3 ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          How automated lead generation SEO works — from citation to closed pipeline
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          When an AI assistant returns a category answer that names a vendor, the cited vendor's site receives a visit with
          a specific referrer signal — ChatGPT, Perplexity, Claude, and Gemini all pass identifiable headers that can be
          captured in analytics. That visit arrives with context the visitor doesn't even know they're carrying: the prompt
          that generated the citation, the position the vendor held in the answer, the comparison set the AI assembled
          around them.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Conductor's 2026 benchmark places AI referral traffic at roughly <strong className="font-semibold text-gray-900">1% of total website volume</strong> but
          driving a wildly disproportionate share of conversion events. In a B2B SaaS case study, AI-referred visitors
          accounted for 0.5% of sessions but produced <strong className="font-semibold text-gray-900">12.1% of signups</strong> — a 23× conversion differential
          within a single program.
        </p>

        <h3 className="text-[18px] sm:text-[20px] font-medium text-gray-900 mt-10 mb-4">
          How outbound SEO prospecting connects to AI-sourced leads
        </h3>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          The same citation infrastructure that produces inbound also informs outbound. When an account visits an AI-cited
          page, that visit can be matched to a firmographic profile via reverse-IP enrichment and routed to the{' '}
          <a href="/services/lead-generation" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">
            SDR queue with full context
          </a>
          . The outbound touch becomes a response to a known research session, not a cold start. Without that connection,
          outbound sequences fire into accounts that may have already shortlisted a competitor twenty minutes earlier in
          ChatGPT.
        </p>

        {/* ── GEO CTA ── */}
        <div className="bg-gray-900 text-white p-6 sm:p-8 my-10 sm:my-14 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <p className="text-[12px] uppercase tracking-wider text-[#F26522] font-semibold mb-2">Related Article</p>
            <p className="text-[17px] sm:text-[19px] font-medium leading-snug">
              How AI citations shape your B2B vendor shortlist — the pipeline SEO playbook.
            </p>
          </div>
          <a
            href="/insights/automated-b2b-sales-pipeline-seo"
            className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 pr-2 py-2 transition-colors duration-300 whitespace-nowrap shrink-0"
          >
            <span className="text-[13px] font-medium mr-3">B2B Pipeline SEO</span>
            <div className="w-6 h-6 bg-white flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-[#F26522] transition-transform duration-300 group-hover:-rotate-45" />
            </div>
          </a>
        </div>

        {/* ── DATA TABLE ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          The lead quality problem by the numbers
        </h2>
        <div className="overflow-x-auto my-8">
          <table className="w-full border-collapse text-[14px] sm:text-[15px]">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left px-4 py-3 font-semibold text-[12px] uppercase tracking-wider">Finding</th>
                <th className="text-left px-4 py-3 font-semibold text-[12px] uppercase tracking-wider">Stat</th>
                <th className="text-left px-4 py-3 font-semibold text-[12px] uppercase tracking-wider">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                ['AI referral conversion premium over organic', '4.4×', 'Conductor, 2026'],
                ['AI referral conversion influence vs all channels', '+534%', 'Eyeful Media, 2026'],
                ['AI search referral conversion rate (conservative)', '+22%', 'DigitalApplied, 2026'],
                ['AI referral vs Google organic conversion rate', '15.9% vs 1.8%', 'Data-Mania B2B SaaS, 2026'],
                ['B2B buyers click AI Overview sources', '90%', 'Omniscient Digital, 2026'],
                ['ChatGPT share of all AI referral traffic', '87.4%', 'Conductor, 2026'],
              ].map(([finding, stat, source]) => (
                <tr key={finding as string} className="even:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 leading-snug">{finding}</td>
                  <td className="px-4 py-3 font-bold text-[#F26522] whitespace-nowrap">{stat}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-[13px]">{source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── SECTION 4: SEPARATING REAL FROM REBRAND ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          What separates real automated lead generation SEO from a content retainer
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Start with what is being measured. If the deliverable is still organic sessions, MQL volume, and CPL, the program
          is not built for AI-sourced lead generation — it's a traditional{' '}
          <a href="/services/seo" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">
            content marketing engagement
          </a>{' '}
          with new vocabulary.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-4">Real programs report on:</p>
        <ul className="space-y-3 mb-8 pl-0">
          {[
            'AI citation share across ChatGPT, Claude, Perplexity, and Gemini',
            'Conversion rate segmented by AI referrer source (not aggregated channel)',
            'Intent-routing logic connecting AI-sourced visits to the SDR queue with context',
            'robots.txt access for GPTBot, ClaudeBot, PerplexityBot, and Google-Extended',
            'Freshness cadence on revenue-tied pages — AI citations skew toward content updated in the last 30–90 days',
            'Third-party earned-media placement — 85%+ of non-paid AI citations originate from earned media',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-[16px] sm:text-[17px] leading-[1.6] text-gray-800">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#F26522] shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* ── B2B TEAM CARDS ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Which B2B teams get the clearest return
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            {
              title: 'Product-Led Growth SaaS',
              body: 'Buyers who arrive from an AI citation often convert directly into trials without a sales touch, eliminating the SDR-to-trial step and compressing time-to-revenue on smaller deal sizes.',
              link: '/services/geo-optimization',
              linkLabel: 'Explore GEO',
            },
            {
              title: 'Sales-Led Enterprise SaaS',
              body: 'The deal still requires a human sales motion, but AI-sourced leads convert at materially higher rates once an SDR engages. Routing SDRs to AI-sourced leads vs cold lists is the most direct ROI compounding lever available.',
              link: '/services/lead-generation',
              linkLabel: 'Build the pipeline',
            },
            {
              title: 'High-ACV Consulting & Services',
              body: 'A single trusted-publication mention often produces more qualified inbound than a quarter of self-published thought leadership. Earned media-led citation strategies reward credibility over content volume.',
              link: '/services/seo',
              linkLabel: 'Explore SEO',
            },
            {
              title: 'Vertical SaaS & Niche Category Leaders',
              body: 'AI engines compress categories aggressively — once a small set of vendors is consistently cited, the citation gap widens faster than in broader markets. Defensive citation strategies are essential.',
              link: '/company/approach',
              linkLabel: 'Our approach',
            },
          ].map(({ title, body, link, linkLabel }) => (
            <div key={title} className="border border-gray-200 p-6 hover:border-[#F26522]/40 transition-colors duration-300 group">
              <h3 className="text-[16px] font-semibold text-gray-900 mb-3">{title}</h3>
              <p className="text-[14px] text-gray-700 leading-relaxed mb-4">{body}</p>
              <a href={link} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-wider font-semibold text-[#F26522] group-hover:gap-3 transition-all duration-300">
                {linkLabel} <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        {/* ── CONCLUSION ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Making the right call for your funnel
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          B2B teams still optimizing for CPL volume are paying for leads that arrive uneducated in a market where the buyer
          is already educated by an AI, and watching pipeline-to-close ratios decline while the dashboard reports steady
          lead production. The shift to automated lead generation SEO isn't about a new content tactic. It's about
          operating a{' '}
          <a href="/services/lead-generation" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">
            lead gen program
          </a>{' '}
          built around how buyers actually research in 2026 — through an AI assistant first, the vendor's site second, and
          the form-fill only as a confirmation step.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Two decisions matter most. First: whether your current lead gen program produces leads pre-qualified by{' '}
          <a href="/insights/automated-b2b-sales-pipeline-seo" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">
            AI citation
          </a>
          , or leads pre-qualified only by being willing to trade an email address for a download. Second: whether the team
          tracks AI citation share, conversion rate by AI source, and intent-routed pipeline — or only legacy metrics that
          no longer correlate with revenue.
        </p>

        {/* ── FINAL CTA ── */}
        <div className="bg-gray-900 text-white p-8 sm:p-12 my-10 sm:my-14">
          <p className="text-[12px] uppercase tracking-wider text-[#F26522] font-semibold mb-4">Start With a Lead-Source Audit</p>
          <h3 className="text-[22px] sm:text-[28px] font-medium leading-[1.2] tracking-[-0.02em] mb-4 max-w-xl">
            Find out exactly where in your funnel AI-sourced leads are being lost.
          </h3>
          <p className="text-gray-400 text-[15px] leading-relaxed max-w-2xl mb-8">
            A credible engagement starts with a lead-source audit — not a content brief. We segment your current pipeline
            by source, isolate AI-referred traffic, run your brand through ChatGPT, Claude, Perplexity, and Gemini to
            capture current citation share, and identify exactly where the funnel is leaking AI-sourced intent.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-6 pr-2 py-3 transition-colors duration-300"
          >
            <span className="text-[14px] font-medium mr-4">Request a lead-source audit</span>
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 group-hover:-rotate-45" />
            </div>
          </a>
        </div>
      </>
    ),
  },

  'outbound-seo-prospecting': {
    slug: 'outbound-seo-prospecting',
    title: 'Outbound SEO Prospecting: Timing-Anchored Outreach Powered by Intent Signals in 2026',
    category: 'Strategy',
    readTime: '12 min read',
    date: 'May 25, 2026',
    image: '/images/article-outbound-seo-prospecting.webp',
    heroAlt: 'Abstract network visualization representing signal-anchored outbound SEO prospecting',
    metaDescription: 'How SEO-derived intent signals turn outbound from a volume game into a timing game — and what the 2026 data says about cold vs signal-anchored prospecting.',
    content: (
      <>
        {/* ── LEAD STATS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 my-10 sm:my-14">
          {[
            { stat: '3.43%', label: 'Industry-average cold email reply rate across billions of sends', source: 'Instantly, 2026' },
            { stat: '15–25%', label: 'Reply rate for signal-anchored outreach', source: 'Sopro / Salesmotion, 2026' },
            { stat: '70–80%', label: 'Share of the B2B buying journey completed before rep contact', source: 'Salesmotion, 2026' },
          ].map(({ stat, label, source }) => (
            <div key={stat} className="border border-[#F26522]/30 bg-[#F26522]/5 p-6">
              <p className="text-4xl font-bold text-[#F26522] mb-2 font-display">{stat}</p>
              <p className="text-[14px] text-gray-900 leading-snug mb-1">{label}</p>
              <p className="text-[11px] uppercase tracking-wider text-gray-500">{source}</p>
            </div>
          ))}
        </div>

        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-8">
          Outbound SEO prospecting can mean the difference between a sequence that lands in an inbox at the exact moment an account is researching the category and a sequence that fires into the void of someone who decided eighteen months ago that they don't need what's being sold. The vast majority of cold outbound now goes to accounts that aren't in-market. The Ehrenberg-Bass 95:5 rule is the most-cited frame for the problem: at any given moment, only about 5 percent of target buyers are actively in a buying cycle. Traditional outbound sprays the other 95 percent and hopes to catch someone mid-decision. SEO-derived signals tell you which 5 percent are actually in-market this week, which page they read, and what intent the page is built around.
        </p>

        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-8">
          This is the problem outbound SEO prospecting solves. The strongest B2B operators have stopped treating outbound and SEO as separate disciplines and started routing the intent data their content generates directly into the SDR queue. Most teams don't realize how much intent data their site is already producing — most of it gets discarded in analytics dashboards no one in the sales org has ever opened.
        </p>

        {/* ── INLINE CTA (interlinking to lead-generation) ── */}
        <div className="bg-gray-900 text-white p-6 sm:p-8 my-10 sm:my-14 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <p className="text-[12px] uppercase tracking-wider text-[#F26522] font-semibold mb-2">Gobiya Service</p>
            <p className="text-[17px] sm:text-[19px] font-medium leading-snug">
              Route your SEO intent signals directly into your sales outbound queue.
            </p>
          </div>
          <a
            href="/services/lead-generation"
            className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-5 pr-2 py-2 transition-colors duration-300 whitespace-nowrap shrink-0"
          >
            <span className="text-[13px] font-medium mr-3">Build Your Outreach System</span>
            <div className="w-6 h-6 bg-white flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-[#F26522] transition-transform duration-300 group-hover:-rotate-45" />
            </div>
          </a>
        </div>

        {/* ── SECTION 1 ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          What outbound SEO prospecting actually does
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Traditional outbound starts with a target account list and a sequence template. The SDR works the list top to bottom, the sequence fires, replies come back at industry-average rates, and the team chalks up the response to the message, the data, or the timing. None of those are usually the actual problem. The actual problem is that the list was assembled from firmographic fit — company size, industry, role — with no information about whether the account was in-market in the first place. Firmographic fit tells you who the buyer <em>could</em> be. It tells you nothing about whether the buyer is <em>currently looking</em>.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Outbound SEO prospecting adds a behavioral layer on top of firmographic targeting. The SEO and content infrastructure that exists to attract organic traffic also generates a stream of intent signals — which accounts visited which pages, what referrer brought them, how long they engaged, whether they came from an AI citation or a Google result, what comparison query likely surfaced the page. Those signals are matched to account records via reverse-IP enrichment and routed to the SDR queue with context attached. This signal layer is what separates outbound SEO prospecting from cold outbound. It's not about sending more sequences. It's about sending fewer sequences to better-timed accounts with messaging anchored to a known research event.
        </p>

        <h3 className="text-[18px] sm:text-[20px] font-medium text-gray-900 mt-10 mb-4">
          Why firmographic targeting alone produces the wrong math
        </h3>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Firmographic targeting handles the first pass: who could buy. But "could buy" and "is buying this quarter" are different states, and the gap between them is where outbound goes to die. Backlinko's analysis of 12 million outreach emails found only 8.5 percent receive any reply at all — including the "not interested" and "unsubscribe me" responses. The remaining 91.5 percent vanish into inboxes that were never going to engage in the first place.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-8">
          Volume-only outbound is not sufficient for a pipeline that compounds. Timing-anchored outreach is the layer that makes a sequence land. Without it, you have a high-effort prospecting motion that produces lottery-style outcomes. Programs reporting steady sequence volume while reply rates decline are sending more emails to the same not-in-market accounts.
        </p>

        {/* ── SECTION 2 ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          How the signal-to-outreach framework reshapes outbound economics
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Signal-anchored outbound operates under a fundamentally different framework than cold outbound. Instead of sending sequences and waiting for replies, the team waits for a signal that indicates an account has entered the 5 percent in-market window, then reaches out within minutes or hours of the signal firing. Sopro's 2026 data places cold email reply rates at 1 to 5 percent and signal-anchored outreach at 15 to 25 percent — a 3x to 25x improvement depending on signal quality and outreach speed. Instantly's 2026 Benchmark Report places the platform-wide cold reply average at 3.43 percent and notes that elite teams running intelligence-led outbound consistently hit double-digit replies on the same data.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          This framework exists for a reason. A buyer who has just read a comparison page on the vendor's site is not the same prospect as a buyer who fits the ICP but has shown no behavior. The intent gap between those two prospects is enormous, and it shows up in every downstream metric — open rate, reply rate, meeting-set rate, opportunity creation, deal velocity. The vendor that wires SEO intent directly into the SDR motion is reaching out at the moment the account is most receptive. The vendor that doesn't is paying full SDR cost for outreach to accounts the AI assistants have already steered toward competitors.
        </p>

        {/* ── COST SECTION ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          The cost of pure cold outbound in 2026
        </h2>
        <div className="bg-[#f7f7f7] border border-gray-200 p-6 sm:p-10 my-8">
          <h3 className="text-[15px] uppercase tracking-wider font-semibold text-gray-500 mb-6">SDR Economics & Efficiency Benchmarks — 2026</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Fully-loaded SDR (US average)', value: '$50k–$80k' },
              { label: 'Cold outreach cost per booked meeting', value: '$300–$500' },
              { label: 'Signal-anchored reply rate premium', value: '15%–25%' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900 mb-1">{value}</span>
                <span className="text-[13px] text-gray-600 leading-snug">{label}</span>
              </div>
            ))}
          </div>
          <p className="text-[12px] text-gray-500 mt-6 leading-relaxed border-t border-gray-200 pt-4">
            <strong>Note:</strong> SDR economics and reply rate benchmarks vary by ACV, segment maturity, and message quality. The figures above reflect U.S. B2B SaaS averages from 2026 industry analyses. Audit your own reply rate by signal source before reallocating headcount.
          </p>
        </div>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          A fully-loaded SDR in the U.S. runs $50,000 to $80,000 per year and produces 30 to 50 qualified leads per month at the upper end of well-run programs. At a 3.43 percent reply rate, an SDR sending 100 cold emails per day across a 22-day workweek month is generating roughly 75 replies — most of which are "not interested," with maybe 20 substantive conversations and a smaller number of booked meetings. The cost per booked meeting in pure cold outbound regularly clears $300 to $500 once SDR salary, tooling, and data subscriptions are layered in. Enterprise segments routinely run higher.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Frame it against signal-anchored alternatives. The same SDR working a list of 200 SEO-signal-qualified accounts per month — accounts that visited a competitor-comparison page, downloaded a category report, or arrived from an AI citation — operates in a different reply rate regime entirely. At 15 to 25 percent reply rates, the same SDR generates 30 to 50 substantive conversations from a list one-tenth the size. The visible activity volume is lower. The cost per meeting drops materially, and the meetings that do get booked convert to pipeline at a higher rate because the prospect was already in-market when the sequence fired. Volume-first outbound looks productive on the dashboard. Signal-first outbound produces revenue on the close report.
        </p>

        {/* ── PULL QUOTE ── */}
        <blockquote className="border-l-4 border-[#F26522] pl-6 sm:pl-8 my-10 sm:my-14">
          <p className="text-[18px] sm:text-[22px] font-medium leading-[1.5] text-gray-900 italic">
            "Stop treating outbound and SEO as separate silos. Route the intent data your content generates directly to your SDR queues to turn cold prospecting into a high-converting timing game."
          </p>
        </blockquote>

        {/* ── SECTION 3 ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          How outbound SEO prospecting works from page visit to booked meeting
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          When an account visits a page on the vendor's site, the visit is captured via analytics and matched to a firmographic profile through reverse-IP enrichment or a similar identity-resolution layer. The match produces an account-level record with context attached: which page was visited, how long the visitor spent on it, what referrer brought them (Google, ChatGPT, Claude, Perplexity, direct, paid), what other pages on the site the account has touched historically, and what the dominant intent of the visited page suggests about where the account sits in the buying cycle. That enriched record is routed to the SDR queue in near real time — minutes to hours, not days — and the SDR's first touch becomes a response to a known research event rather than a cold opener.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          The sequence itself looks different too. A signal-anchored opener references the comparison set the page was built around, the question the page was structured to answer, or the category problem the AI citation that surfaced the page was tied to. The SDR isn't guessing what the account cares about — the page visit has already told them. Multi-channel sequences in 2026 average 40 percent higher engagement than single-channel sends, and that lift compounds further when each channel touch is anchored to the same intent signal rather than reading like three different reps reaching out about three different things.
        </p>

        <h3 className="text-[18px] sm:text-[20px] font-medium text-gray-900 mt-10 mb-4">
          How automated lead generation SEO connects to the outbound layer
        </h3>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          The same SEO infrastructure that generates inbound leads also feeds outbound prospecting. When an AI-cited page or a high-intent comparison page is visited by an account that doesn't convert on the form, the visit is still valuable — it becomes an outbound signal rather than an inbound lead. This is the operational bridge between{' '}
          <a href="/insights/automated-lead-generation-seo" className="text-[#F26522] underline underline-offset-4 hover:text-[#e05a1a] transition-colors">
            automated lead generation SEO
          </a>{' '}
          and outbound SEO prospecting: the page captures every visitor it can convert directly, and routes every visitor it can't convert to outbound with the context already attached. Nothing is wasted. The 99 percent of visitors who don't fill out a form become the highest-quality SDR list the team has access to, because the visit itself was the qualification.
        </p>

        {/* ── DATA TABLE ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          The reply rate problem by the numbers
        </h2>
        <div className="overflow-x-auto my-8">
          <table className="w-full border-collapse text-[14px] sm:text-[15px]">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left px-4 py-3 font-semibold text-[12px] uppercase tracking-wider">Prospecting Method</th>
                <th className="text-left px-4 py-3 font-semibold text-[12px] uppercase tracking-wider">Reply Rate</th>
                <th className="text-left px-4 py-3 font-semibold text-[12px] uppercase tracking-wider">Timing & Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                ['Pure Cold Outreach', '1.0% - 5.0%', 'Out-of-market spraying, generic lists'],
                ['Platform-wide Cold Email Average', '3.43%', 'Instantly 2026 data, high saturation'],
                ['Signal-Based Target Outreach', '15.0% - 25.0%', 'Reaching out within hours of intent signals'],
                ['AI-Referred Traffic Conversion', '14.2%', 'Highest buyer readiness, pre-qualified by LLMs'],
              ].map(([method, rate, timing]) => (
                <tr key={method as string} className="even:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 leading-snug">{method}</td>
                  <td className="px-4 py-3 font-bold text-[#F26522] whitespace-nowrap">{rate}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-[13px]">{timing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── SECTION 4 ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          What separates real outbound SEO prospecting from a "we have intent data" claim
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Not every vendor or agency selling intent-based outbound operates at the same standard. The category has filled rapidly with third-party intent data resellers, generic firmographic filtering rebranded as "intent," and dashboards that surface signals nobody routes into outreach.
        </p>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-4">
          Real outbound SEO prospecting is built on first-party intent. Ask your providers:
        </p>
        <ul className="space-y-3 mb-8 pl-0">
          {[
            'Where do the signals originate? (First-party visits to comparison pages are exclusive and run in real time; third-party intent is resold to competitors and arrives too late.)',
            'What is the signal-to-outreach latency? (Minutes/hours is the standard; days is too late.)',
            'Are reply and meeting rates segmented by signal source? (Aggregated data hides low-quality sources.)',
            'How is the SDR sequence customized to the specific page visited? (Generic openers defeat the purpose.)',
            'Is there visibility into AI-source referrers? (ChatGPT, Claude, Gemini, and Perplexity pass identifiable headers.)',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-[16px] sm:text-[17px] leading-[1.6] text-gray-800">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-[#F26522] shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* ── B2B TEAM CARDS ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Which B2B teams get the clearest return
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            {
              title: 'Sales-Led SaaS Teams',
              body: 'Teams with established SEO traffic benefit fastest by routing existing anonymous site visits into targeted outreach campaigns without needing new content retainers.',
              link: '/services/lead-generation',
              linkLabel: 'Explore Outreach Systems',
            },
            {
              title: 'ABM-Focused Enterprise',
              body: 'Enterprise teams combine static named-account lists with real-time SEO page visit alerts to target multi-million dollar deals at the precise moment they begin researching.',
              link: '/services/seo',
              linkLabel: 'Explore ABM SEO',
            },
            {
              title: 'Outsourced BDR Providers',
              body: 'Agencies that replace third-party data feeds with clients first-party SEO signals secure a structural conversion advantage that generic list sellers cannot match.',
              link: '/services/geo-optimization',
              linkLabel: 'Explore GEO Integration',
            },
            {
              title: 'High-Velocity B2B',
              body: 'Shorter sales cycles require near-zero signal-to-outreach latency. Reaching out within minutes of a pricing page visit captures deals before the window closes.',
              link: '/company/approach',
              linkLabel: 'Our Approach',
            },
          ].map(({ title, body, link, linkLabel }) => (
            <div key={title} className="border border-gray-200 p-6 hover:border-[#F26522]/40 transition-colors duration-300 group">
              <h3 className="text-[16px] font-semibold text-gray-900 mb-3">{title}</h3>
              <p className="text-[14px] text-gray-700 leading-relaxed mb-4">{body}</p>
              <a href={link} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-wider font-semibold text-[#F26522] group-hover:gap-3 transition-all duration-300">
                {linkLabel} <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        {/* ── CONCLUSION ── */}
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em] text-gray-900 mt-14 mb-6">
          Why Gobiya is positioned differently for B2B operators
        </h2>
        <p className="text-[16px] sm:text-[18px] leading-[1.75] text-gray-800 mb-6">
          Gobiya provides complete operational alignment between search acquisition and outbound pipeline engineering. We do not sell third-party intent databases or run generic email spam sequences. We audit your existing traffic, set up real-time reverse-IP enrichment layers, configure direct routing into your CRM, and build custom SEO structures designed specifically to generate high-intent outbound signals.
        </p>

        {/* ── FINAL CTA ── */}
        <div className="bg-gray-900 text-white p-8 sm:p-12 my-10 sm:my-14">
          <p className="text-[12px] uppercase tracking-wider text-[#F26522] font-semibold mb-4">Request a Signal Audit</p>
          <h3 className="text-[22px] sm:text-[28px] font-medium leading-[1.2] tracking-[-0.02em] mb-4 max-w-xl">
            Identify the buying intent signals you are currently discarding.
          </h3>
          <p className="text-gray-400 text-[15px] leading-relaxed max-w-2xl mb-8">
            A credible engagement starts with auditing your existing traffic. We run a comprehensive audit to map your anonymous traffic to target accounts, isolate high-intent SEO visits, and show you exactly where to insert signal-based outreach into your outbound flow.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-6 pr-2 py-3 transition-colors duration-300"
          >
            <span className="text-[14px] font-medium mr-4">Request a signal audit</span>
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 group-hover:-rotate-45" />
            </div>
          </a>
        </div>
      </>
    ),
  },
};

// ─── Related Articles per slug ────────────────────────────────────────────────
const RELATED_ARTICLES_MAP: Record<string, { href: string; category: string; title: string; image: string }[]> = {
  'automated-b2b-sales-pipeline-seo': [
    {
      href: '/insights/automated-lead-generation-seo',
      category: 'Strategy',
      title: 'Automated Lead Generation SEO: How AI Pre-Qualifies Your Pipeline in 2026',
      image: '/images/article-lead-gen-seo.webp',
    },
    {
      href: '/insights/outbound-seo-prospecting',
      category: 'Strategy',
      title: 'Outbound SEO Prospecting: Timing-Anchored Outreach Powered by Intent Signals in 2026',
      image: '/images/article-outbound-seo-prospecting.webp',
    },
    {
      href: '/services/geo-optimization',
      category: 'GEO',
      title: 'Generative Engine Optimization: Be Cited by AI',
      image: '/images/article-ai-seo-2024.webp',
    },
  ],
  'automated-lead-generation-seo': [
    {
      href: '/insights/automated-b2b-sales-pipeline-seo',
      category: 'Strategy',
      title: 'Automated B2B Sales Pipeline SEO: How AI Citations Shape Your Shortlist in 2026',
      image: '/images/article-b2b-pipeline-seo.webp',
    },
    {
      href: '/insights/outbound-seo-prospecting',
      category: 'Strategy',
      title: 'Outbound SEO Prospecting: Timing-Anchored Outreach Powered by Intent Signals in 2026',
      image: '/images/article-outbound-seo-prospecting.webp',
    },
    {
      href: '/services/lead-generation',
      category: 'Strategy',
      title: 'B2B Pipeline Architecture for Predictable Revenue',
      image: '/images/article-predictive-analytics.webp',
    },
  ],
  'outbound-seo-prospecting': [
    {
      href: '/insights/automated-b2b-sales-pipeline-seo',
      category: 'Strategy',
      title: 'Automated B2B Sales Pipeline SEO: How AI Citations Shape Your Shortlist in 2026',
      image: '/images/article-b2b-pipeline-seo.webp',
    },
    {
      href: '/insights/automated-lead-generation-seo',
      category: 'Strategy',
      title: 'Automated Lead Generation SEO: How AI Pre-Qualifies Your Pipeline in 2026',
      image: '/images/article-lead-gen-seo.webp',
    },
    {
      href: '/services/lead-generation',
      category: 'Strategy',
      title: 'B2B Pipeline Architecture for Predictable Revenue',
      image: '/images/article-predictive-analytics.webp',
    },
  ],
};

// Fallback for articles not in the map
const DEFAULT_RELATED_ARTICLES = [
  {
    href: '/services/geo-optimization',
    category: 'GEO',
    title: 'Generative Engine Optimization: Be Cited by AI',
    image: '/images/article-ai-seo-2024.webp',
  },
  {
    href: '/services/lead-generation',
    category: 'Strategy',
    title: 'B2B Pipeline Architecture for Predictable Revenue',
    image: '/images/article-predictive-analytics.webp',
  },
  {
    href: '/services/seo',
    category: 'SEO',
    title: 'Technical SEO & Algorithmic Dominance',
    image: '/images/article-technical-seo.webp',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
interface ArticlePageProps {
  slug: string;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ slug }) => {
  const [time, setTime] = useState('');
  const article = ARTICLES[slug];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // SEO updates
  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} | Gobiya`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', article.metaDescription);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${article.title} | Gobiya`);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', article.metaDescription);
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', `https://www.gobiya.com${article.image}`);

    // Article JSON-LD
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title,
      "description": article.metaDescription,
      "image": `https://www.gobiya.com${article.image}`,
      "datePublished": "2026-05-25",
      "dateModified": "2026-05-25",
      "author": {
        "@type": "Person",
        "name": "Steve Martin",
        "jobTitle": "CEO, Lead Developer & Marketer",
        "url": "https://www.gobiya.com/about/steve-martin",
        "sameAs": [
          "https://www.linkedin.com/in/stevemartingobiya/"
        ]
      },
      "publisher": {
        "@type": "Organization",
        "name": "Gobiya",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.gobiya.com/images/gobiya---logo.webp"
        }
      }
    };
    let scriptTag = document.getElementById('article-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'article-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);
  }, [article]);

  // 404 fallback
  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-[#F26522] text-[12px] uppercase tracking-widest font-semibold mb-4">404</p>
          <h1 className="text-3xl font-medium text-gray-900 mb-4">Article not found</h1>
          <a href="/company/insights" className="text-[#F26522] underline">Back to Insights</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative font-sans selection:bg-[#F26522] selection:text-white page-wrapper">
      <CustomCursor />

      {/* ── HERO ── */}
      <section className="relative w-full h-[65vh] min-h-[480px] bg-[#EFEFEF] overflow-hidden flex flex-col justify-end cursor-default">
        {/* Shader background */}
        <div className="absolute inset-0 z-10 pointer-events-none w-full h-full [&>div]:w-full [&>div]:h-full [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:object-cover">
          <Shader>
            <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
            <ChromaFlow baseColor="#ffffff" downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={13} radius={3.5} />
            <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
            <FilmGrain strength={0.05} />
          </Shader>
        </div>

        {/* Nav */}
        <div className="fixed top-0 left-0 z-50 w-full">
          <nav className="flex items-center justify-between bg-white/30 backdrop-blur-md border-b border-white/40 p-[5px] sm:px-4">
            <div className="flex items-center gap-6 relative z-50">
              <a href="/">
                <img src="/images/gobiya---logo.webp" alt="Gobiya Logo" className="h-8 sm:h-9 w-auto object-contain" />
              </a>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 ml-auto">
              <div className="hidden md:flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-900" />
                <span className="text-[13px] text-gray-900 font-medium">{time} in Los Angeles</span>
              </div>
              <a href="/contact" className="hidden sm:flex group items-center bg-gray-900 text-white pl-5 pr-2 py-2">
                <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                  <span className="text-[13px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Book a strategy call</span>
                  <span className="text-[13px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Book a strategy call</span>
                </div>
                <div className="w-6 h-6 bg-white flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
                </div>
              </a>
              <div className="flex items-center justify-center px-2">
                <StaggeredMenu
                  isFixed={true}
                  colors={['#111111', '#F26522']}
                  items={[
                    { label: 'SEO Traffic Recovery', link: '/google-penalty-recovery' },
                    { label: 'B2B Lead Pipelines', link: '/services/lead-generation' },
                    { label: 'Generative Search (GEO)', link: '/services/geo-optimization' },
                    { label: 'Custom Web Apps', link: '/services/web-design' },
                    { label: 'Paid Media Management', link: '/services/advertising' },
                    { label: 'Search Engine Optimization', link: '/services/seo' },
                  ]}
                  socialItems={[
                    { label: 'Twitter', link: '#' },
                    { label: 'LinkedIn', link: '#' },
                  ]}
                  menuButtonColor="#111"
                  openMenuButtonColor="#111"
                  accentColor="#F26522"
                />
              </div>
            </div>
          </nav>
        </div>

        {/* Hero text */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pb-10 sm:pb-14 pt-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-gray-600 mb-6" aria-label="breadcrumb">
            <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
            <ChevronRight className="w-3 h-3" />
            <a href="/company/insights" className="hover:text-gray-900 transition-colors">Insights</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 truncate max-w-[200px]">{article.title}</span>
          </nav>

          <span className="inline-block px-3 py-1 bg-[#F26522] text-white text-[10px] uppercase tracking-wider font-semibold mb-4">
            {article.category}
          </span>
          <h1 className="text-[clamp(1.4rem,4vw,3rem)] font-medium leading-[1.15] tracking-[-0.03em] text-gray-900 max-w-[900px] mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-[13px] text-gray-600">
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span>{article.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span>By <a href="/about/steve-martin" className="underline hover:text-[#F26522] transition-colors font-medium">Steve Martin</a></span>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ── */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 -mt-8 relative z-30">
        <div className="w-full aspect-[16/7] overflow-hidden shadow-2xl">
          <img
            src={article.image}
            alt={article.heroAlt}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      </div>

      {/* ── ARTICLE BODY ── */}
      <main className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 xl:gap-20">

          {/* Main article content */}
          <article className="max-w-[760px]" id="article-content">
            {article.content}
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">

              {/* Article meta */}
              <div className="border border-gray-200 p-6 mb-6">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-500 mb-4">About This Article</p>
                <div className="flex flex-col gap-3 text-[14px] text-gray-700">
                  <div><span className="font-semibold text-gray-900">Published:</span> {article.date}</div>
                  <div><span className="font-semibold text-gray-900">Reading time:</span> {article.readTime}</div>
                  <div><span className="font-semibold text-gray-900">Category:</span> {article.category}</div>
                </div>
              </div>

              {/* CTA box */}
              <div className="bg-gray-900 p-6 mb-6">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-[#F26522] mb-3">Get A Citation Audit</p>
                <p className="text-white text-[14px] leading-relaxed mb-4">
                  Find out where your brand stands across ChatGPT, Claude, Perplexity, and Gemini.
                </p>
                <a
                  href="/contact"
                  className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-4 pr-2 py-2 transition-colors duration-300 text-[13px] font-medium w-full justify-between"
                >
                  Request audit
                  <div className="w-6 h-6 bg-white flex items-center justify-center ml-3">
                    <ArrowRight className="w-3 h-3 text-[#F26522] group-hover:-rotate-45 transition-transform duration-300" />
                  </div>
                </a>
              </div>

              {/* Related services */}
              <div className="border border-gray-200 p-6">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-500 mb-4">Related Services</p>
                <div className="flex flex-col gap-3">
                  {[
                    { href: '/services/lead-generation', label: 'B2B Pipeline Architecture' },
                    { href: '/services/geo-optimization', label: 'Generative Engine Optimization' },
                    { href: '/services/seo', label: 'Search Engine Optimization' },
                    { href: '/google-penalty-recovery', label: 'Penalty Recovery' },
                  ].map(({ href, label }) => (
                    <a
                      key={href}
                      href={href}
                      className="flex items-center gap-2 text-[13px] text-gray-700 hover:text-[#F26522] transition-colors group"
                    >
                      <ArrowRight className="w-3 h-3 text-[#F26522] group-hover:translate-x-1 transition-transform duration-300" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ── RELATED ARTICLES ── */}
      <section className="bg-[#111] py-20 lg:py-28 w-full">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between mb-10 sm:mb-14">
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white">
              Related Insights
            </h2>
            <a
              href="/company/insights"
              className="hidden sm:flex items-center gap-2 text-[13px] text-gray-400 hover:text-white transition-colors font-medium"
            >
              All Insights <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {([...(RELATED_ARTICLES_MAP[slug] || DEFAULT_RELATED_ARTICLES)].sort((a, b) => {
              const aMatches = a.category === article.category;
              const bMatches = b.category === article.category;
              if (aMatches && !bMatches) return -1;
              if (!aMatches && bMatches) return 1;
              return 0;
            })).map(({ href, category, title, image }) => (
              <a
                key={href}
                href={href}
                className="group relative w-full aspect-[4/5] overflow-hidden block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                  <div className="mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-[#F26522] text-white text-[10px] uppercase tracking-wider font-semibold">
                      {category}
                    </span>
                  </div>
                  <h3 className="text-white text-xl sm:text-2xl font-medium leading-tight mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {title}
                  </h3>
                  <div className="flex items-center text-[#F26522] translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                    <span className="text-[13px] font-semibold mr-2 uppercase tracking-wide">Read More</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111] text-white pt-20 sm:pt-28 px-5 sm:px-8 lg:px-12 w-full overflow-hidden flex flex-col relative border-t border-white/10">
        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-8 mb-10 sm:mb-20 relative z-10">
          <div className="flex flex-col pr-0 lg:pr-12">
            <a href="/">
              <img src="/images/gobiya---logo.webp" alt="Gobiya Logo" className="h-8 sm:h-9 w-auto object-contain mb-4 invert brightness-0" />
            </a>
            <h3 className="text-3xl font-semibold tracking-tight mb-4">Gobiya.</h3>
            <p className="text-gray-400 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-sm">
              We leverage cutting-edge AI and advanced data strategies to help brands recover lost traffic, dominate search, and scale revenue globally.
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-6">Services</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-gray-400">
              <li><a href="/services/geo-optimization" className="hover:text-white transition-colors">AI Content Strategies</a></li>
              <li><a href="/google-penalty-recovery" className="hover:text-white transition-colors">Traffic Recovery</a></li>
              <li><a href="/services/seo" className="hover:text-white transition-colors">Technical SEO</a></li>
              <li><a href="/services/lead-generation" className="hover:text-white transition-colors">B2B Pipeline</a></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-6">Company</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-gray-400">
              <li><a href="/company/about" className="hover:text-white transition-colors">About the Agency</a></li>
              <li><a href="/company/success-stories" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="/company/insights" className="hover:text-white transition-colors">Industry Insights</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-6">Connect</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1440px] w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10 pt-8 pb-8 relative z-[60]">
          <p className="text-[13px] text-gray-500">© 2026 Gobiya. Engineering search dominance.</p>
          <div className="flex items-center gap-6 text-[13px] text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-4 sm:mt-10 overflow-hidden relative">
          <BlurText
            text="GOBIYA"
            animateBy="letters"
            delay={150}
            className="text-[17vw] sm:text-[23vw] leading-[0.75] font-bold tracking-tighter text-white select-none text-center justify-center flex-nowrap whitespace-nowrap"
          />
        </div>
      </footer>

      <GradualBlur target="page" position="bottom" height="6rem" strength={2} divCount={5} curve="bezier" exponential={true} opacity={1} zIndex={50} />
    </div>
  );
};

export { ARTICLES };
export default ArticlePage;
