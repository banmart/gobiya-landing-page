import { supabase } from '../lib/supabase';
import { trackCTA } from '../lib/analytics';
import React, { useState, useEffect, useRef } from 'react';
import DeferredShader, { Swirl, ChromaFlow, FlutedGlass, FilmGrain } from './DeferredShader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Clock, ArrowRight, ShieldAlert, TrendingUp, Search, Network, PenTool, BarChart, Megaphone, Target, Briefcase, Code, Cpu, Database } from 'lucide-react';
import SplitTextReveal from './SplitTextReveal';
import ParallaxMedia from './ParallaxMedia';
import StackedBento from './StackedBento';
import InsightsSlider from './InsightsSlider';
import InsightsGrid from './InsightsGrid';
import CaseStudiesPinned from './CaseStudiesPinned';
import SatisfiedClients from './SatisfiedClients';
import RoiCalculator from './RoiCalculator';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import HeroWebGLBackground from './HeroWebGLBackground';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

import RotatingText from './RotatingText';
import StaggeredMenu from './StaggeredMenu';
import BlurText from './BlurText';
import GradualBlur from './GradualBlur';
import CustomCursor from './CustomCursor';
import RotatingAILogos from './RotatingAILogos';

interface ServiceSubpageProps {
  path: string;
  isFanOut?: boolean;
  category?: string | null;
  slug?: string | null;
}

interface PageConfig {
  subtitle: string;
  title: string;
  rotatingWords: string[];
  outcomeMessage: string;
  ctaText: string;
  introScrollText?: string;
  introHeading?: React.ReactNode;
  introParagraph?: string;
  introVideo1?: string;
  introVideo2?: string;
  bentoHeadline?: React.ReactNode;
  bentoDescription?: string;
  insightCategory?: string;
  bentoCards?: any[];
  showCalculator?: boolean;
  calculatorProps?: any;
}

export default function ServiceSubpage({ path, isFanOut, category, slug }: ServiceSubpageProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // If this is a fan-out page, define dynamic generic content mapped from the slug
  if (isFanOut && slug) {
    const formattedSlug = slug.replace(/-agency$/, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const formattedCategory = category ? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Capability';
    const catLower = category ? category.toLowerCase() : '';

    // Map of slugs to page content details
    const slugMap: Record<string, {
      pageTitle: string;
      pageSubheading: string;
      overlaySubtitle: string;
      overlayTitle: string;
      overlayP1: string;
      overlayP2: string;
      deepDiveHeading?: string;
      deepDiveParagraphs?: string[];
      concreteStepsHeading?: string;
      concreteSteps?: string[];
      advantagesHeading?: string;
      advantageCards?: { title: string; description: string }[];
    }> = {
      'brand-identity-strategy-agency': {
        pageTitle: 'Brand identity strategy',
        pageSubheading: 'We define the unique essence, voice, and visual character of your business.',
        overlaySubtitle: 'We translate ideas into high-impact campaigns',
        overlayTitle: 'Art and creative direction for brand identity campaigns',
        overlayP1: 'It seems obvious, but a company presents itself and communicates with its target group through images and content that represent it across multiple channels.',
        overlayP2: 'But who decides how your assets should be designed? Who chooses the quality and tone? Who thinks about, makes, and manages the creation of your creative properties?',
        deepDiveHeading: 'Visual, verbal, and audio identity: telling everyone who you are',
        deepDiveParagraphs: [
          'We develop a distinctive voice for your brand with targeted vocabulary and tone — to communicate transparently and respond to your audience\'s needs. We don\'t just work with words: we devise a powerful visual system in line with who you are, to tell what you do and how you do it across every platform.',
          'We select the ideal synthesis for your logo, typography, and colour palette that best expresses your values and brand personality. These specifications are delivered in a dedicated brand manual so you can always communicate in the most correct and consistent way.',
          'We create a unified identity across all media and channels — online and offline — for consistent communication and a successful brand image: from website to business cards, from social content to digital advertising.'
        ],
        concreteStepsHeading: 'How do we build a brand identity, concretely?',
        concreteSteps: [
          'We put in place multidisciplinary teams where specific skills — design, copy, and strategy — can cross-fertilise and produce the best possible result',
          'We start by meeting and listening to get to know each client in depth: their business context, competitors, and target audience',
          'We analyse the market, the target audience, and search trends to identify positioning opportunities and naming territories',
          'We study the identities and communication of competitors from all points of view — visual, verbal, and digital',
          'We define the copy strategy, concept basis for naming and brand payoff, and overall brand personality',
          'We establish the tone of voice, visual system, and brand manual that will guide all communications going forward'
        ],
        advantagesHeading: 'What are the advantages of investing in brand identity?',
        advantageCards: [
          { title: 'Branding', description: 'Improve brand recognition, reputation, and awareness across every customer touchpoint and channel' },
          { title: 'Visual', description: 'Establish a coordinated visual identity across all channels that builds instant recognition and recall' },
          { title: 'Engagement', description: 'Increase engagement by connecting authentically with your target audience through consistent messaging' },
          { title: 'Control', description: 'Keep creative decisions aligned with a brand manual that guides every output and production partner' }
        ]
      },
      'communication-concepts-agency': {
        pageTitle: 'Communication concepts',
        pageSubheading: 'We will tell about you, with visuals and words',
        overlaySubtitle: 'We translate ideas into high-impact campaigns',
        overlayTitle: 'Creativity is the art of mixing cards to find a new point of view',
        overlayP1: 'At Gobiya, creativity is the contamination of different skills, experiences and sensibilities that allows us to develop communication concepts that position the brand.',
        overlayP2: 'These concepts are functional to the target market, strategic objectives, and channels.',
        deepDiveHeading: 'Strategic concepts engineered to position your brand and move audiences to action',
        deepDiveParagraphs: [
          'Great communication starts with a clear strategic idea. We develop campaign concepts rooted in data, audience psychology, and market positioning — not guesswork. Every concept we create is designed to be functional across multiple channels and formats.',
          'We collaborate with your team to define the emotional and rational hooks that make your messaging memorable. From there, we translate those hooks into headline concepts, visual narratives, and campaign frameworks that perform across digital and physical touchpoints.',
          'The result is a communication system — not a one-off campaign — that gives your brand a consistent, distinctive presence. Every execution, from social post to campaign film, remains anchored in the same strategic idea.'
        ],
        concreteStepsHeading: 'How do we develop a communication concept, concretely?',
        concreteSteps: [
          'We start with an immersion session to understand your brand, audience, competitive landscape, and communication objectives',
          'We conduct insight mapping to identify the emotional and rational drivers that influence your target buyer\'s decisions',
          'We develop multiple creative territories — strategic directions with distinct visual and verbal identities',
          'We prototype the strongest concept across primary formats: headlines, visual direction, and channel executions',
          'We refine the selected concept with your team and align it to campaign rollout requirements and budget',
          'We deliver a campaign toolkit: concept rationale, copy frameworks, visual references, and channel guidelines'
        ],
        advantagesHeading: 'What are the advantages of a strong communication concept?',
        advantageCards: [
          { title: 'Clarity', description: 'A single strategic idea makes every communication output instantly recognisable and purposeful' },
          { title: 'Reach', description: 'Channel-agnostic concepts translate seamlessly from digital ads to events and print without losing impact' },
          { title: 'Engagement', description: 'Emotionally resonant messaging drives higher attention, recall, and audience interaction across platforms' },
          { title: 'Consistency', description: 'A documented concept framework keeps all team members and production partners aligned and on-brand' }
        ]
      },
      'seo-web-copywriting-agency': {
        pageTitle: 'SEO & web copywriting',
        pageSubheading: 'We write words that engage human hearts and rank in search algorithms.',
        overlaySubtitle: 'We translate ideas into high-impact campaigns',
        overlayTitle: 'Words are the code that programs human decisions',
        overlayP1: 'At Gobiya, our copywriting blends semantic SEO optimization with high-conversion storytelling.',
        overlayP2: 'We craft compelling copy for websites, landers, and campaigns that turns readers into buyers.',
        deepDiveHeading: 'Words engineered to rank in algorithms and convert human readers',
        deepDiveParagraphs: [
          'Good copy does two jobs simultaneously: it satisfies search engine crawlers with the right keyword density, semantic context, and entity signals — and it compels human readers to take the next step in the buying journey. At Gobiya, we write for both audiences without compromise.',
          'We begin every copywriting project with a keyword and intent analysis that maps the precise language your target buyers use when searching for solutions. From that data, we build copy architecture: page structure, heading hierarchy, semantic clusters, and internal linking strategy.',
          'The final output is content that ranks for high-intent queries, communicates your brand voice with clarity, and moves readers toward conversion — whether that means a form submission, a call, or a purchase.'
        ],
        concreteStepsHeading: 'How do we write SEO copy that ranks and converts, concretely?',
        concreteSteps: [
          'We audit existing content and identify underperforming pages with untapped ranking and conversion potential',
          'We conduct keyword and intent research to map buyer signals and identify semantic topic clusters worth targeting',
          'We develop a content architecture — page structure, heading hierarchy, and entity plan aligned to search intent',
          'We write draft copy that balances search optimization with high-quality, readable, and persuasive prose',
          'We review for keyword density, readability, internal linking opportunities, and conversion copywriting principles',
          'We publish with complete on-page SEO elements: title tags, meta descriptions, structured data, and image alt text'
        ],
        advantagesHeading: 'What are the advantages of professional SEO copywriting?',
        advantageCards: [
          { title: 'Rankings', description: 'Semantically optimized content places your pages in front of high-intent searchers at the exact right moment' },
          { title: 'Conversions', description: 'Persuasive writing guides readers through the decision journey and reduces friction to conversion action' },
          { title: 'Authority', description: 'Consistent, accurate content establishes your brand as a trusted expert voice in your industry' },
          { title: 'Efficiency', description: 'Organic content compounds over time, reducing cost-per-lead versus paid acquisition channels' }
        ]
      },
      'creative-art-direction-agency': {
        pageTitle: 'Creative art direction',
        pageSubheading: 'We direct visual aesthetics that elevate brand perception.',
        overlaySubtitle: 'We translate ideas into high-impact campaigns',
        overlayTitle: 'Design is intelligence made visible',
        overlayP1: 'Art direction coordinates the styling, imagery, layout, and motion design of your assets.',
        overlayP2: 'This coordinates with selected production teams and partners to ensure your brand feels cohesive, modern, and premium across all media.',
        deepDiveHeading: 'Visual direction that gives your brand a language everyone instantly recognises',
        deepDiveParagraphs: [
          'Art direction is the discipline of making visual decisions with intent. Every colour choice, every typographic decision, every image selection either reinforces your brand\'s identity or erodes it. We ensure every visual decision your brand makes is purposeful and consistent.',
          'We work across all production formats — photography direction, video treatment, digital design systems, and campaign visuals — coordinating with internal teams and external production partners to maintain cohesion at every scale.',
          'The result is a brand that looks as premium as it actually is. Consistency builds trust, and trust builds revenue. Our art direction process ensures your visual identity is never an afterthought.'
        ],
        concreteStepsHeading: 'How do we develop art direction for a brand, concretely?',
        concreteSteps: [
          'We review all existing brand assets and identify visual inconsistencies, quality gaps, and opportunities for improvement',
          'We develop mood boards and visual reference libraries that define the precise aesthetic direction and tone',
          'We produce a detailed art direction brief covering colour, typography, imagery style, and layout principles',
          'We oversee creative production — photography, video, and design — to ensure all outputs match the established brief',
          'We review all deliverables against the art direction standard before sign-off and release to any channel',
          'We compile a visual guidelines document for internal teams and agency partners to reference on future projects'
        ],
        advantagesHeading: 'What are the advantages of professional art direction?',
        advantageCards: [
          { title: 'Coherence', description: 'A unified visual system makes your brand instantly recognisable across every format and touchpoint' },
          { title: 'Quality', description: 'Directed production raises the standard of every deliverable, from social posts to campaign films' },
          { title: 'Efficiency', description: 'Clear visual briefs reduce revision rounds and speed up creative production timelines significantly' },
          { title: 'Premium', description: 'Consistent, considered visuals signal professionalism and build consumer trust at every touchpoint' }
        ]
      },
      'social-media-management-agency': {
        pageTitle: 'Social media management',
        pageSubheading: 'We grow active communities around your brand\'s core message.',
        overlaySubtitle: 'We translate ideas into high-impact campaigns',
        overlayTitle: 'Attention is the new currency of the digital age',
        overlayP1: 'Social media is about more than posts; it is about building relationship loops.',
        overlayP2: 'We handle content creation, community engagement, and distribution strategies to keep your audience loyal.',
        deepDiveHeading: 'Active community management that converts followers into loyal brand advocates',
        deepDiveParagraphs: [
          'Social media growth is not an accident. It is the result of consistent creative execution, data-informed scheduling, and genuine community engagement. We manage your social presence as a full-time discipline — not an afterthought.',
          'We produce original content calendars built around your brand\'s messaging pillars, audience behaviours, and platform-specific algorithm preferences. Every post is crafted to perform — not just to fill a calendar slot.',
          'Beyond posting, we manage comments, DMs, and community interactions to build the relationship loops that turn passive followers into active advocates and repeat customers.'
        ],
        concreteStepsHeading: 'How do we manage social media for a brand, concretely?',
        concreteSteps: [
          'We audit your existing channels: follower quality, engagement rates, top-performing content, and competitive benchmarks',
          'We develop a platform-specific strategy and monthly content calendar aligned to your campaign and sales objectives',
          'We produce original creative assets — graphics, short-form video, and copy — for each platform format and algorithm',
          'We schedule and publish content at optimal times based on your audience\'s activity and engagement data',
          'We actively manage community engagement: responding to comments, moderating conversations, and nurturing relationships',
          'We deliver monthly analytics reports with performance insights, optimizations, and the next month\'s strategic priorities'
        ],
        advantagesHeading: 'What are the advantages of professional social media management?',
        advantageCards: [
          { title: 'Growth', description: 'Consistent, algorithm-optimized content steadily grows your follower base and organic reach over time' },
          { title: 'Engagement', description: 'Active community management builds the relationship loops that drive loyalty and word-of-mouth referrals' },
          { title: 'Authority', description: 'Regular, high-quality content positions your brand as a credible, active voice in your industry' },
          { title: 'Pipeline', description: 'Social channels become active lead generation assets — not just brand awareness tools' }
        ]
      },
      'seo-discoverability-agency': {
        pageTitle: 'SEO & discoverability',
        pageSubheading: 'We align technical structures to place your business at the top of search intent.',
        overlaySubtitle: 'We engineer systems for measurable outcomes',
        overlayTitle: 'Visibility is the foundation of digital pipeline',
        overlayP1: 'We optimize every technical layer of your platform, from Core Web Vitals to semantic structured data.',
        overlayP2: 'We ensure your business ranks natively for high-value buyer queries.',
        deepDiveHeading: 'Technical precision and semantic structure: the twin pillars of search dominance',
        deepDiveParagraphs: [
          'Modern search is not about keyword stuffing — it is about entity clarity, semantic structure, and technical signal integrity. We audit and optimize every layer of your digital presence: from Core Web Vitals and crawl budget to structured data and E-E-A-T signal architecture.',
          'We align your page architecture, internal linking, and content hierarchy with the semantic models that Google\'s quality classifiers use to evaluate relevance and authority. Every technical fix we implement has a direct measurable link to ranking improvement.',
          'Our SEO work is systematic and permanent. We do not chase short-term tactics that reverse at the next core update. We build the foundational technical and content signals that compound in value over time.'
        ],
        concreteStepsHeading: 'How do we optimize for SEO and discoverability, concretely?',
        concreteSteps: [
          'We conduct a full technical audit: crawl errors, index coverage, Core Web Vitals, duplicate content, and structured data validity',
          'We perform comprehensive keyword and intent mapping to identify ranking opportunities across all buyer journey stages',
          'We restructure page architecture, URL patterns, and internal linking to optimize crawl efficiency and link equity flow',
          'We inject validated JSON-LD structured data for entity definition, local business, and content schema types',
          'We execute on-page optimization: title tags, heading hierarchies, semantic content clusters, and image optimization',
          'We monitor Search Console and rank tracking weekly, diagnosing anomalies and iterating on strategy continuously'
        ],
        advantagesHeading: 'What are the advantages of technical SEO optimization?',
        advantageCards: [
          { title: 'Traffic', description: 'Precisely targeted organic rankings deliver high-intent visitors actively searching for your solution' },
          { title: 'Rankings', description: 'Systematic technical and content optimization builds stable ranking positions resistant to algorithm updates' },
          { title: 'AI Citations', description: 'Semantic entity structure makes your content citable by AI answer engines like ChatGPT and Perplexity' },
          { title: 'Compounding', description: 'Organic traffic grows without incremental ad spend — each ranking gained reduces cost-per-lead over time' }
        ]
      },
      'web-development-agency': {
        pageTitle: 'Web & IT app development',
        pageSubheading: 'We build custom, high-speed digital infrastructure that scales.',
        overlaySubtitle: 'We engineer systems for measurable outcomes',
        overlayTitle: 'Speed and security are not features; they are trust metrics',
        overlayP1: 'We build custom React, Vite, and Next.js applications designed for maximum performance, clean code architecture, and seamless CRM and API integration.',
        overlayP2: 'Every millisecond of load speed represents potential customer conversion.',
        deepDiveHeading: 'Speed, architecture, and security: digital infrastructure that drives business outcomes',
        deepDiveParagraphs: [
          'A slow, insecure, or poorly structured website is not a technical problem — it is a business problem. Every second of page load delay reduces conversion rates. Every crawl error reduces organic visibility. We build web infrastructure that eliminates these risks from day one.',
          'We develop using modern frameworks — React, Next.js, and Vite — with a focus on clean component architecture, performant API integrations, and secure server configurations. Every build is optimized for Core Web Vitals, accessibility, and SEO from the ground up.',
          'We manage the full development lifecycle: from technical brief and information architecture through to deployment, monitoring, and ongoing performance optimization. Your website becomes a revenue-generating asset, not a maintenance burden.'
        ],
        concreteStepsHeading: 'How do we build a high-performance website, concretely?',
        concreteSteps: [
          'We start with a technical brief: goals, integrations, CMS requirements, performance benchmarks, and SEO architecture',
          'We design the information architecture and user journey mapping before writing a single line of code',
          'We develop a component library and design system that ensures visual and functional consistency at scale',
          'We build the frontend and backend with performance budgets: target load times, Lighthouse scores, and Core Web Vitals targets',
          'We conduct quality assurance across devices, browsers, and network conditions before launch',
          'We deploy with monitoring, analytics, and ongoing optimization protocols to ensure performance compounds over time'
        ],
        advantagesHeading: 'What are the advantages of professional web development?',
        advantageCards: [
          { title: 'Speed', description: 'Sub-second load times reduce bounce rates, improve Core Web Vitals scores, and lift conversion rates measurably' },
          { title: 'Rankings', description: 'Technically clean builds give search crawlers clear signals, resulting in stronger indexation and ranking positions' },
          { title: 'Security', description: 'Hardened server configurations and secure code architecture protect your platform and your customers' },
          { title: 'Ownership', description: 'Custom-built infrastructure eliminates dependency on third-party platforms and their unpredictable pricing changes' }
        ]
      },
      'google-ads-ppc-strategy-agency': {
        pageTitle: 'Google Ads & PPC strategy',
        pageSubheading: 'We execute hyper-targeted paid acquisition campaigns that return ROI.',
        overlaySubtitle: 'We engineer systems for measurable outcomes',
        overlayTitle: 'Spend is only valuable when mapped to conversion pipelines',
        overlayP1: 'We structure search, display, and retargeting ads around customer acquisition costs.',
        overlayP2: 'We optimize bids, landers, and creatives to yield maximum conversion volume.',
        deepDiveHeading: 'Precision targeting and conversion architecture: maximizing return on every ad dollar',
        deepDiveParagraphs: [
          'Paid search works when spend is mapped directly to conversion architecture. Too many businesses run Google Ads without the landing page optimization, bid strategy, and audience segmentation needed to generate real returns. We build the complete system.',
          'We structure campaigns around customer acquisition cost targets and revenue goals — not vanity metrics like click-through rate. Every campaign is built with conversion tracking, audience segmentation, and a clear optimization protocol from day one.',
          'We manage the full paid acquisition cycle: keyword selection, ad creative, landing page alignment, bid strategy, and ongoing A/B testing. The result is a paid channel that consistently delivers leads at predictable cost.'
        ],
        concreteStepsHeading: 'How do we run a PPC strategy campaign, concretely?',
        concreteSteps: [
          'We audit your Google Ads account — wasted spend, keyword quality scores, conversion tracking gaps, and landing page alignment',
          'We develop a campaign strategy: search intent mapping, audience segmentation, and customer acquisition cost targets',
          'We write high-intent ad copy for each keyword cluster, with variants for A/B testing from the first day of launch',
          'We build or optimize dedicated landing pages for each campaign to ensure message-match and conversion architecture',
          'We configure bid strategies, conversion tracking, and attribution models before any budget goes live',
          'We run ongoing optimization: weekly bid reviews, creative rotation, negative keyword expansion, and landing page testing'
        ],
        advantagesHeading: 'What are the advantages of professional PPC management?',
        advantageCards: [
          { title: 'ROAS', description: 'Systematic bid management and landing page optimization maximize return on every dollar of ad spend' },
          { title: 'Pipeline', description: 'High-intent paid clicks, properly converted, fill your sales pipeline with ready-to-buy prospects' },
          { title: 'Speed', description: 'Paid search delivers immediate visibility and leads while organic SEO strategies compound in the background' },
          { title: 'Control', description: 'Precision audience targeting ensures your budget reaches exactly the right buyers at the right moment' }
        ]
      },
      'cro-ux-analysis-agency': {
        pageTitle: 'CRO & UX analysis',
        pageSubheading: 'We analyze user behavior and redesign paths to eliminate friction.',
        overlaySubtitle: 'We engineer systems for measurable outcomes',
        overlayTitle: 'Every pixel is a decision point for your visitor',
        overlayP1: 'Conversion rate optimization is a science. We run heatmaps, user tests, and data analyses.',
        overlayP2: 'This isolates funnel dropoffs and lets us redesign elements to lift conversions.',
        deepDiveHeading: 'Behavioral data and systematic testing: converting more from the traffic you already have',
        deepDiveParagraphs: [
          'Every website has a conversion rate. Most of them are lower than they should be. CRO is the process of systematically identifying where visitors drop off — and why — then redesigning those moments to remove friction and increase the percentage who convert.',
          'We use session recording, heatmaps, user testing, and funnel analytics to build an evidence base for every design change we propose. Nothing is changed based on opinion. Every test has a hypothesis, a control, and a measurable outcome.',
          'The compounding effect of CRO is significant. A 20% lift in conversion rate on a $100,000 monthly paid search budget is $20,000 more revenue per month — without increasing ad spend. This is why CRO is often the highest-ROI investment available.'
        ],
        concreteStepsHeading: 'How do we run a CRO and UX analysis program, concretely?',
        concreteSteps: [
          'We conduct a UX audit of key pages: landing pages, product pages, and checkout or inquiry completion flows',
          'We install session recording and heatmap tools to capture real visitor behaviour across all device types',
          'We map the conversion funnel and identify specific steps where the largest volume of visitors are dropping off',
          'We develop a prioritized hypothesis backlog — changes ranked by potential impact and ease of implementation',
          'We design and deploy A/B tests with statistically valid sample sizes and clearly defined measurement windows',
          'We compile results, document winning variants, and begin the next test cycle with accumulated learnings'
        ],
        advantagesHeading: 'What are the advantages of CRO and UX analysis?',
        advantageCards: [
          { title: 'Conversions', description: 'Removing friction from key user journeys directly increases the percentage of visitors who take action' },
          { title: 'Revenue', description: 'Higher conversion rates mean more revenue from existing traffic — without increasing acquisition spend' },
          { title: 'Insight', description: 'Real behavioral data reveals what your customers actually want, informing product and messaging strategy' },
          { title: 'Efficiency', description: 'CRO improvements compound: each test cycle builds on learnings to continuously lift performance' }
        ]
      },
      'ai-llms-business-agency': {
        pageTitle: 'AI & LLM systems consulting',
        pageSubheading: 'We deploy secure, custom AI agents and models to automate office tasks.',
        overlaySubtitle: 'We engineer systems for measurable outcomes',
        overlayTitle: 'Intelligence is the ultimate leverage for lean teams',
        overlayP1: 'We build custom LLM workflows, automated doc parsing, and agentic integrations.',
        overlayP2: 'This streamlines manual administrative workflows while maintaining strict data privacy.',
        deepDiveHeading: 'Custom AI workflows that automate repetitive tasks and scale your team\'s output',
        deepDiveParagraphs: [
          'AI is not a product you buy — it is a capability you build. We design and deploy custom LLM workflows, agentic pipelines, and document automation systems tailored to your specific business processes. No off-the-shelf tools, no vendor lock-in.',
          'We work with open-weight and API-based models depending on your privacy and performance requirements. Every system we build is documented, auditable, and designed to remain under your control — your data never trains external models without explicit permission.',
          'From automated document parsing to AI-powered prospect research and internal knowledge retrieval, we identify the highest-value automation opportunities in your business and build the precise systems to capture them.'
        ],
        concreteStepsHeading: 'How do we deploy an AI system for your business, concretely?',
        concreteSteps: [
          'We audit your workflows to identify the highest-value automation opportunities — tasks that are repetitive, data-heavy, or time-sensitive',
          'We define the AI use case: the inputs, the desired outputs, the accuracy thresholds, and the data privacy requirements',
          'We select the appropriate model stack — open-weight or API-based — based on data sensitivity and performance needs',
          'We build the integration: API connections, document ingestion pipelines, and output formatting for your existing tools',
          'We conduct quality assurance: testing edge cases, hallucination mitigation, and output validation protocols',
          'We deploy with monitoring, human-in-the-loop checkpoints, and full documentation for your team to audit and iterate'
        ],
        advantagesHeading: 'What are the advantages of custom AI and LLM systems?',
        advantageCards: [
          { title: 'Efficiency', description: 'Automated workflows eliminate hours of manual processing, freeing your team for high-value strategic work' },
          { title: 'Accuracy', description: 'Precisely configured AI systems outperform manual processes on repetitive, rule-based tasks at scale' },
          { title: 'Privacy', description: 'Custom deployments keep sensitive business data on your infrastructure — not in third-party training sets' },
          { title: 'Scale', description: 'AI systems process thousands of tasks simultaneously, scaling output without scaling headcount' }
        ]
      },
      'authority-building-agency': {
        pageTitle: 'Authority & link building',
        pageSubheading: 'We acquire high-authority references that build domain ranking power.',
        overlaySubtitle: 'We build authority and brand reputation',
        overlayTitle: 'In the search index, links are votes of digital trust',
        overlayP1: 'We build authority through clean, white-hat outreach and content placement.',
        overlayP2: 'We secure natural references from relevant, high-traffic publications that establish search prominence.',
        deepDiveHeading: 'Link acquisition and domain authority: the algorithmic currency of search rankings',
        deepDiveParagraphs: [
          'In the search index, a link from a high-authority domain is a vote of trust. The more high-quality votes your domain accumulates, the stronger your algorithmic standing — and the more competitive your rankings become across all keyword clusters.',
          'We build links through white-hat editorial outreach, content placement, and strategic digital PR. Every link we acquire is editorially earned — never purchased, never from private blog networks. Clean links compound; toxic links penalize.',
          'Our authority-building programs are transparent, documented, and measured against concrete KPIs: domain authority growth, referring domain count, and ranking improvements on target commercial keywords.'
        ],
        concreteStepsHeading: 'How do we build domain authority, concretely?',
        concreteSteps: [
          'We conduct a full backlink audit: current link profile quality, toxic links to disavow, and competitor gap analysis',
          'We build an outreach target list: high-DA domains in your industry with editorial content placement opportunities',
          'We create the link-worthy content assets — research pieces, data studies, expert commentary — that earn editorial mentions',
          'We conduct manual outreach to editors, journalists, and content managers with personalized, relevant pitches',
          'We manage link placement coordination, ensuring anchor text diversity and contextual relevance for each placement',
          'We monitor new backlinks monthly and report on domain authority trajectory and ranking correlation'
        ],
        advantagesHeading: 'What are the advantages of link building and authority growth?',
        advantageCards: [
          { title: 'Domain Authority', description: 'High-quality backlinks increase your site\'s algorithmic standing and improve ranking potential across all queries' },
          { title: 'Rankings', description: 'More referring domains correlate directly with improved ranking positions for competitive commercial keywords' },
          { title: 'Traffic', description: 'Editorial mentions on high-traffic publications drive referral visitors alongside the long-term algorithmic benefits' },
          { title: 'Trust', description: 'Third-party citations from credible sources signal authority to both search engines and human buyers' }
        ]
      },
      'digital-pr-media-outreach-agency': {
        pageTitle: 'Digital PR & media outreach',
        pageSubheading: 'We coordinate brand storytelling to secure editorial coverage.',
        overlaySubtitle: 'We build authority and brand reputation',
        overlayTitle: 'Earned media is the most credible signal you can produce',
        overlayP1: 'We design research-backed campaigns, local studies, and PR assets that journalists actively want to quote.',
        overlayP2: 'We secure high-trust media mentions that drive referral traffic and organic signals.',
        deepDiveHeading: 'Earned media and editorial coverage: the most credible signal your brand can produce',
        deepDiveParagraphs: [
          'A press mention in a trusted publication does something no advertisement can: it confers third-party credibility. When journalists write about your brand, they are implicitly endorsing your authority in your space. We engineer those moments systematically.',
          'We develop newsworthy assets — original data studies, expert commentary, local research, and timely opinion pieces — that give journalists a genuine reason to cover your brand. We then pitch those assets to relevant editors at publications your target buyers actually read.',
          'The result is earned media coverage that drives referral traffic, generates high-authority backlinks, and builds brand awareness in your target market — all at a fraction of the cost of equivalent paid advertising.'
        ],
        concreteStepsHeading: 'How do we run a digital PR campaign, concretely?',
        concreteSteps: [
          'We start with a brand story audit: your credentials, data assets, differentiated positions, and newsworthy angles',
          'We research journalist and editor targets: who covers your industry, what angles they respond to, and their publication\'s DA',
          'We develop the PR asset: a data study, expert analysis, or timely commentary piece designed to be genuinely newsworthy',
          'We write a personalized media pitch for each journalist — specific to their beat and their audience\'s interests',
          'We manage the media relationship: answering follow-up questions, providing additional data, and coordinating quotes',
          'We compile a coverage report: placements secured, DA of publications, backlinks earned, and estimated reach'
        ],
        advantagesHeading: 'What are the advantages of digital PR and media outreach?',
        advantageCards: [
          { title: 'Brand Awareness', description: 'Editorial coverage in respected publications puts your brand in front of your target audience with credibility' },
          { title: 'Backlinks', description: 'Media placements generate high-authority editorial backlinks that strengthen your domain ranking power' },
          { title: 'Trust', description: 'Third-party journalistic coverage is more persuasive than any self-produced marketing content' },
          { title: 'Traffic', description: 'Featured articles in high-traffic publications drive direct referral visitors and long-term SEO benefit' }
        ]
      },
      'content-marketing-syndication-agency': {
        pageTitle: 'Content marketing syndication',
        pageSubheading: 'We distribute research-driven content across authoritative networks.',
        overlaySubtitle: 'We build authority and brand reputation',
        overlayTitle: 'Publishing content is only half the battle; distribution is the other',
        overlayP1: 'We syndicate high-value research, articles, and whitepapers to industry-specific channels.',
        overlayP2: 'This builds brand authority and drives high-intent lead flow.',
        deepDiveHeading: 'Research-driven content distributed where your buyers seek authority and answers',
        deepDiveParagraphs: [
          'Content marketing is not about volume — it is about depth, distribution, and strategic positioning. We create high-value research, guides, and analysis that establish your brand as the definitive authority in your market. Then we distribute that content to the channels where influence lives.',
          'We build content architectures — topic clusters, pillar pages, and supporting content — designed around the specific questions your target buyers ask at every stage of the decision journey. Every piece serves a precise purpose in the ranking and conversion funnel.',
          'Distribution amplifies creation. We syndicate content to industry publications, partner platforms, and aggregators that extend your reach far beyond your own domain — building both brand awareness and the external link signals that drive organic authority.'
        ],
        concreteStepsHeading: 'How do we build a content marketing system, concretely?',
        concreteSteps: [
          'We audit existing content for performance, keyword gaps, cannibalisation, and alignment with current buyer intent',
          'We design a topic cluster architecture: pillar pages, supporting content, and a strategic internal linking plan',
          'We build an editorial calendar aligned to campaign priorities, seasonal trends, and keyword opportunity windows',
          'We produce each content asset with SEO optimization, E-E-A-T signals, and conversion architecture built in from the start',
          'We syndicate published content to industry publications, newsletters, and social platforms for amplified distribution',
          'We track performance metrics — organic traffic, ranking positions, backlinks earned, and leads generated per piece'
        ],
        advantagesHeading: 'What are the advantages of content marketing and syndication?',
        advantageCards: [
          { title: 'Authority', description: 'Consistent, deep content establishes your brand as the go-to expert for buyers and search algorithms alike' },
          { title: 'Traffic', description: 'A well-structured content architecture generates compounding organic traffic from high-intent keyword queries' },
          { title: 'Leads', description: 'Strategic content at each funnel stage captures, nurtures, and qualifies prospects throughout the buying journey' },
          { title: 'Distribution', description: 'Syndicated content multiplies reach, drives referral traffic, and earns the backlinks that build domain authority' }
        ]
      },
      'influencer-marketing-agency': {
        pageTitle: 'Influencer marketing',
        pageSubheading: 'We partner with trusted creators to tell your brand story.',
        overlaySubtitle: 'We build authority and brand reputation',
        overlayTitle: 'Trust is transferred through authentic digital voices',
        overlayP1: 'We identify, contract, and manage creators who align with your brand demographics.',
        overlayP2: 'We engineer creative campaigns that convert attention into business revenue.',
        deepDiveHeading: 'Authentic creator partnerships that transfer trust and drive measurable revenue',
        deepDiveParagraphs: [
          'Influencer marketing works when the partnership is authentic, the brief is clear, and the measurement is precise. We identify creators whose audience demographics, engagement patterns, and content quality genuinely align with your brand — not just those with the highest follower count.',
          'We manage the complete campaign lifecycle: influencer research and vetting, outreach and negotiation, creative briefing, content approval, campaign scheduling, and post-campaign performance analysis. You maintain brand control while we handle the operational work.',
          'We build long-term creator relationships, not one-off transactional campaigns. Repeat partnerships build deeper audience trust and reduce content production costs while increasing campaign effectiveness over time.'
        ],
        concreteStepsHeading: 'How do we run an influencer marketing campaign, concretely?',
        concreteSteps: [
          'We define the campaign brief: objectives, audience demographics, content formats, and performance KPIs',
          'We research and vet potential creators across audience size, engagement rate, content quality, and demographic alignment',
          'We conduct outreach, present the partnership opportunity, and manage fee negotiation and contract execution',
          'We write detailed creative briefs that guide the creator while leaving room for authentic, platform-native execution',
          'We review all content for brand alignment and compliance before it goes live, requesting revisions when necessary',
          'We compile a campaign performance report: reach, engagement, link clicks, conversions, and earned media value'
        ],
        advantagesHeading: 'What are the advantages of influencer marketing?',
        advantageCards: [
          { title: 'Reach', description: 'Established creators amplify your message to highly engaged, targeted audiences you cannot easily reach organically' },
          { title: 'Authenticity', description: 'Creator-native content performs significantly better than traditional advertising in audience trust and engagement' },
          { title: 'Engagement', description: 'Influencer audiences engage with sponsored content at rates that brand-owned channels rarely match' },
          { title: 'Revenue', description: 'Well-executed creator partnerships generate measurable conversions well beyond brand awareness alone' }
        ]
      },
      'local-community-relations-agency': {
        pageTitle: 'Local community relations',
        pageSubheading: 'We secure local maps prominence and regional search authority.',
        overlaySubtitle: 'We build authority and brand reputation',
        overlayTitle: 'All global success begins with dominant local roots',
        overlayP1: 'We optimize your regional citation footprint, map pack signals, and hyper-local sponsorships.',
        overlayP2: 'This ensures your business dominates its core geographic markets.',
        deepDiveHeading: 'Local map pack dominance and community authority: owning your geographic market',
        deepDiveParagraphs: [
          'For businesses that serve defined geographic markets, local search visibility is the highest-value SEO investment available. The Google Maps pack drives the majority of calls and direction requests for local businesses — and it is determined by signals that most businesses fail to optimize.',
          'We audit and optimize every local ranking signal: Google Business Profile completeness, NAP citation consistency across directories, review velocity and sentiment, local schema markup, and hyper-local content that signals geographic relevance.',
          'Beyond technical optimization, we build community positioning through local partnership development, regional press outreach, and sponsorship strategy — signals that both search algorithms and local buyers respond to as indicators of genuine community integration.'
        ],
        concreteStepsHeading: 'How do we build local community authority, concretely?',
        concreteSteps: [
          'We audit your local presence: GBP profile completeness, NAP consistency, citation coverage, review count, and map pack positions',
          'We clean and verify all NAP citations across the top data aggregators and industry-specific directories',
          'We optimize your Google Business Profile: categories, attributes, photos, Q&A, services, and booking integration',
          'We develop a local content strategy: location pages, neighborhood guides, and locally-relevant articles that signal geographic authority',
          'We build local partnerships, sponsorships, and community PR opportunities that generate organic local mentions and backlinks',
          'We monitor map pack rankings, GBP insights, and review velocity monthly, adjusting strategy as local signals evolve'
        ],
        advantagesHeading: 'What are the advantages of local community relations?',
        advantageCards: [
          { title: 'Maps Pack', description: 'Optimized local signals place your business in the top three Google Maps results where the most clicks happen' },
          { title: 'Local Rankings', description: 'Consistent NAP citations and local authority signals improve organic ranking for all geo-targeted queries' },
          { title: 'Reviews', description: 'A proactive review generation strategy builds the social proof that converts local searchers into paying customers' },
          { title: 'Community', description: 'Local partnerships and press coverage build the trust signals that both algorithms and local buyers respond to' }
        ]
      },
      'blockchain-web3-development-agency': {
        pageTitle: 'Blockchain & Web3 development',
        pageSubheading: 'We develop secure, smart-contract-driven decentralized applications.',
        overlaySubtitle: 'We engineer systems for measurable outcomes',
        overlayTitle: 'Decentralization is the next wave of database architecture',
        overlayP1: 'We build secure, audited smart contracts, custom tokens, and dApp frontends.',
        overlayP2: 'We leverage distributed ledger technology to create trusted peer-to-peer applications.'
      },
      'ai-prospect-scraper-agency': {
        pageTitle: 'AI prospect scraper agency',
        pageSubheading: 'We build automated lead scraping pipelines powered by agentic search.',
        overlaySubtitle: 'We engineer systems for measurable outcomes',
        overlayTitle: 'The best pipeline is fueled by real-time target data',
        overlayP1: 'We build intelligent scraping pipelines that identify, extract, and clean high-value target accounts.',
        overlayP2: 'We route qualified leads directly into your CRM.'
      },
      'native-crm-agency': {
        pageTitle: 'Native CRM integration',
        pageSubheading: 'We synchronize sales data and automate communication workflows.',
        overlaySubtitle: 'We engineer systems for measurable outcomes',
        overlayTitle: 'A unified database is the foundation of sales velocity',
        overlayP1: 'We connect your front-of-house forms, chats, and lead sources directly to your CRM.',
        overlayP2: 'We automate outreach loops and optimize tracking.'
      },

      // ── SEO & Web Copywriting fan-out cluster ──────────────────────
      'landing-page-copywriting-agency': {
        pageTitle: 'Landing page copywriting',
        pageSubheading: 'High-conversion landing page copy engineered for the page that decides the sale.',
        overlaySubtitle: 'Part of the SEO & Web Copywriting cluster',
        overlayTitle: 'The page that decides whether your ad spend pays off',
        overlayP1: 'Every paid click and organic visit lands somewhere. That page either converts the intent into a lead or it doesn\'t. We write copy that closes the gap.',
        overlayP2: 'We apply benefit-first framing, friction-reduction copy, and social proof placement to turn landing pages into conversion machines.',
        deepDiveHeading: 'Landing page copy engineered around the psychology of the decided buyer',
        deepDiveParagraphs: [
          'A visitor who lands on your page has already made a micro-decision — they clicked. Landing page copy works by confirming that decision instantly: matching the language of the ad or organic result, communicating the core benefit in the first five seconds, and removing every reason to leave.',
          'We write headline hierarchies that orient the reader, benefit copy that answers "what\'s in it for me," objection-handling sections that neutralize hesitation, and CTAs that are specific enough to feel low-risk and compelling enough to click.',
          'Every word is tested against conversion principles. We\'re not writing to impress — we\'re writing to convert. The metric we optimize for is form fills and phone calls, not page views.'
        ],
        concreteStepsHeading: 'How do we write a landing page that converts?',
        concreteSteps: [
          'Audit the traffic source and match copy tone and message to the ad or organic query that drives the click',
          'Define the single conversion goal and eliminate copy or elements that compete with it',
          'Write the above-fold section: headline, subheadline, and hero copy that confirms the visitor is in the right place',
          'Develop the benefit and proof sections: value propositions, social proof, and objection handling',
          'Write a CTA sequence that is specific, low-risk, and matched to the buyer\'s stage of readiness',
          'Review for keyword density, readability grade, and conversion copywriting principles before publishing'
        ],
        advantagesHeading: 'What makes professional landing page copywriting worth the investment?',
        advantageCards: [
          { title: 'Conversion', description: 'Copy that speaks directly to buyer intent turns more of your ad and organic spend into pipeline' },
          { title: 'Quality Score', description: 'Landing pages with message-match copy earn higher Google Ads Quality Scores, lowering CPC' },
          { title: 'Testing', description: 'Professionally written copy gives A/B tests a meaningful baseline — you\'re testing variations, not fixing fundamentals' },
          { title: 'Speed', description: 'A high-converting landing page amortizes media spend faster and accelerates the sales cycle' }
        ]
      },

      'website-copywriting-services-agency': {
        pageTitle: 'Website copywriting services',
        pageSubheading: 'Your entire website, written to rank in search and convert every visitor into a lead.',
        overlaySubtitle: 'Part of the SEO & Web Copywriting cluster',
        overlayTitle: 'Every page of your site is a sales conversation with a search engine and a human',
        overlayP1: 'Your website is the only marketing channel you own outright. We write every page to work as hard as possible — ranking for the right queries and converting the visitors who arrive.',
        overlayP2: 'Home page, service pages, about page, location pages — each one written to its own intent and conversion goal, consistent in voice, cohesive as a system.',
        deepDiveHeading: 'Website copy that works as a unified system, not a collection of isolated pages',
        deepDiveParagraphs: [
          'Most websites suffer from copy that was written by different people at different times with no shared strategy. Each page competes for attention rather than guiding the visitor on a deliberate path. We write website copy as a system — every page has a role in the buyer journey, a keyword focus, and a handoff to the next step.',
          'We start with a site-wide content architecture: which pages exist, what query each one targets, how they interlink, and what conversion action each one is designed to prompt. Then we write the copy within that structure.',
          'The result is a website that ranks more pages, moves visitors more efficiently toward conversion, and communicates a consistent brand voice across every touchpoint from the homepage to the confirmation email.'
        ],
        concreteStepsHeading: 'How do we approach a full website copywriting project?',
        concreteSteps: [
          'Audit existing copy for keyword coverage gaps, conversion weaknesses, and brand voice inconsistencies',
          'Define the site architecture: priority pages, keyword assignments, and internal link structure',
          'Write the home page: primary brand positioning, core benefit statements, and conversion-driving CTAs',
          'Write service, product, or location pages: intent-matched copy with entity-rich semantic depth',
          'Write supporting pages (About, FAQ, Contact) with conversion copy and trust-building elements',
          'Deliver with full on-page SEO: title tags, meta descriptions, schema markup, and image alt text for every page'
        ],
        advantagesHeading: 'Why invest in professional website copywriting?',
        advantageCards: [
          { title: 'Rankings', description: 'Every page written to a keyword and intent means more of your site appears in search results' },
          { title: 'Consistency', description: 'A unified brand voice builds recognition and trust across every page a visitor might enter on' },
          { title: 'Conversion', description: 'Persuasive, structured copy guides visitors through the buyer journey on every page of the site' },
          { title: 'Scalability', description: 'A documented content architecture makes adding new pages fast, consistent, and SEO-sound' }
        ]
      },

      'seo-content-strategy-agency': {
        pageTitle: 'SEO content strategy',
        pageSubheading: 'The architecture before the words: keyword mapping, topic clusters, and internal link design.',
        overlaySubtitle: 'Part of the SEO & Web Copywriting cluster',
        overlayTitle: 'Strategy first. Every word earns its place in the plan.',
        overlayP1: 'Content without strategy is output. Content with strategy is a compounding asset. We build the plan before a single word is written — mapping queries, intents, competitors, and gaps into a structure that dominates its topic.',
        overlayP2: 'We deliver a content architecture document that tells you exactly what to publish, in what order, at what URL, targeting what query — so every piece contributes to a coherent, authoritative cluster.',
        deepDiveHeading: 'A content strategy built around search intent signals, not editorial instinct',
        deepDiveParagraphs: [
          'Most content strategies are built around what the brand wants to say. Ours are built around what buyers are actively searching for. We begin with keyword research that maps the full query landscape: informational, navigational, commercial, and transactional intent across every stage of the buying cycle.',
          'From that data we build a topic cluster model: a hub page that targets the primary service query, spoke pages that target adjacent intents, and a linking structure that distributes authority from the most credible pages to the ones with the most commercial value.',
          'We deliver the strategy as a living document — a content roadmap with URL structures, target keywords, word count guidance, and internal link specifications that your team or ours can execute against systematically.'
        ],
        concreteStepsHeading: 'How do we build an SEO content strategy?',
        concreteSteps: [
          'Keyword universe build: seed keywords, long-tail variations, competitor gap analysis, and intent classification',
          'Content audit: identify what exists, what ranks, what has untapped potential, and what needs to be retired',
          'Topic cluster design: group keywords by intent, assign hub and spoke roles, map internal linking',
          'URL and architecture plan: clean, crawlable, semantically meaningful URL structures for every piece',
          'Content brief creation: for each planned page — keyword target, intent, outline, word count, and linking spec',
          'Execution roadmap: prioritized production schedule aligned to business goals and competitive opportunity'
        ],
        advantagesHeading: 'Why invest in SEO content strategy before content production?',
        advantageCards: [
          { title: 'Authority', description: 'Topic clusters signal comprehensive expertise to search engines, improving rankings across the whole cluster' },
          { title: 'Efficiency', description: 'A clear strategy eliminates wasted content — every piece produced serves a specific ranking objective' },
          { title: 'Coverage', description: 'Systematic intent mapping ensures every stage of the buyer journey has a dedicated, optimized page' },
          { title: 'Compounding', description: 'A well-structured cluster earns authority that grows over time — each new piece strengthens existing ones' }
        ]
      },

      'geo-ai-content-writing-agency': {
        pageTitle: 'GEO & AI content writing',
        pageSubheading: 'Content engineered to be cited by ChatGPT, Perplexity, and Google AI Overviews — not just indexed.',
        overlaySubtitle: 'Part of the SEO & Web Copywriting cluster',
        overlayTitle: 'The next search frontier: getting your brand into AI-generated answers',
        overlayP1: 'Traditional SEO gets you into the blue links. Generative Engine Optimization (GEO) gets your content cited in the AI answer above those links — where a growing share of search intent is resolved without a click.',
        overlayP2: 'We write content structured for AI consumption: clear factual claims, entity verification signals, FAQ blocks, and citation-worthy data that large language models extract and attribute.',
        deepDiveHeading: 'GEO-optimized content: written for both the human reader and the AI model that summarizes it',
        deepDiveParagraphs: [
          'AI models like ChatGPT, Perplexity, and Google\'s AI Overviews generate answers by extracting and paraphrasing content from the web. The content they cite shares structural characteristics: clear entity signals, verifiable factual claims, structured question-and-answer formats, and passage-level coherence that makes specific excerpts extractable without losing meaning.',
          'We write content that satisfies these structural requirements without sacrificing readability or conversion optimization. The techniques — passage clarity, entity disambiguation, structured data, FAQ blocks, and citation-worthy statistics — are also good SEO and good copywriting practice. They\'re not in tension.',
          'We also implement the technical side of GEO: llms.txt compliance, schema markup that identifies authorship and expertise, and entity verification across Wikidata and Google\'s Knowledge Graph. Content that\'s technically verifiable is more likely to be cited than content that\'s well-written but unverifiable.'
        ],
        concreteStepsHeading: 'How do we write content optimized for AI citation?',
        concreteSteps: [
          'Entity and knowledge graph audit: verify your brand, people, and products appear correctly in structured data sources',
          'Query analysis: identify the AI-visible questions in your topic area and the citation patterns in current AI answers',
          'Content structure design: passage-level outlines, FAQ blocks, and factual claim architecture built for extraction',
          'GEO copywriting: clear claims, entity-rich language, attribution-ready statistics, and structured answer formats',
          'Technical implementation: schema markup, llms.txt, hreflang, and on-page signals that identify authority',
          'Citation monitoring: track brand mentions in AI-generated answers and iterate based on what\'s being cited'
        ],
        advantagesHeading: 'Why does GEO-optimized content matter now?',
        advantageCards: [
          { title: 'Citations', description: 'AI-cited content reaches buyers at the moment of decision — before they click a single search result' },
          { title: 'Visibility', description: 'Zero-click AI answers are growing; brands not present in those answers are invisible to a growing audience' },
          { title: 'Authority', description: 'Being cited by AI models signals credibility that influences buyer perception even before they visit your site' },
          { title: 'Future-proof', description: 'GEO-optimized content compounds — it ranks in traditional search AND earns AI citations simultaneously' }
        ]
      },

      // ── SEO & Discoverability fan-out cluster ──────────────────────────────
      'technical-seo-audit-agency': {
        pageTitle: 'Technical SEO audit',
        pageSubheading: 'A full diagnostic of your crawl health, index coverage, Core Web Vitals, and structured data — with a prioritized fix list.',
        overlaySubtitle: 'Part of the SEO & Discoverability cluster',
        overlayTitle: 'Technical SEO is the foundation every other optimization builds on',
        overlayP1: 'You cannot rank content that Googlebot cannot crawl, cannot index pages blocked by accidental noindex tags, and cannot earn E-E-A-T signals without a clean technical foundation beneath your content.',
        overlayP2: 'Our technical SEO audit exposes every issue suppressing your rankings — and delivers a prioritized fix list tied directly to ranking impact, not just a checklist.',
        deepDiveHeading: 'What a technical SEO audit actually covers',
        deepDiveParagraphs: [
          'A real technical audit goes far beyond running a tool and exporting a CSV. We crawl your site the way Googlebot does — analyzing crawl depth, internal link equity distribution, redirect chains, duplicate content clusters, and canonical conflicts. We cross-reference crawl data with Search Console coverage reports to identify the gap between what\'s submitted and what\'s actually indexed.',
          'Core Web Vitals failures are analyzed at the field data level, not just lab data. We identify LCP, CLS, and INP issues by page type and prioritize fixes based on the pages that drive the most organic traffic or have the highest conversion value.',
          'Structured data is audited for validity, completeness, and strategic deployment. Most sites implement schema reactively — a single Organization markup and nothing else. We map the full structured data opportunity across your page types and implement the entity signals that help Google and AI engines categorize your content accurately.'
        ],
        concreteStepsHeading: 'How we run a technical SEO audit, concretely',
        concreteSteps: [
          'Full site crawl using multiple user agents — desktop, mobile, and Googlebot-matching configuration',
          'Search Console coverage and performance audit: index gaps, excluded URLs, and click-loss anomalies',
          'Core Web Vitals field data analysis: LCP, CLS, INP prioritized by page traffic impact',
          'Structured data review: existing schema validity, missing schema types, and entity coverage gaps',
          'Duplicate content and canonical audit: parameter URLs, pagination, and faceted navigation issues',
          'Prioritized fix list: every finding ranked by estimated ranking impact and implementation complexity'
        ],
        advantagesHeading: 'Why does a technical SEO audit matter before anything else?',
        advantageCards: [
          { title: 'Foundation', description: 'Content, links, and copy improvements compound faster when built on a technically clean site' },
          { title: 'Index health', description: 'Wasted crawl budget and accidental noindex tags silently suppress rankings — most sites have both' },
          { title: 'CWV rankings', description: 'Core Web Vitals are a confirmed ranking signal — field-data failures are costing you positions right now' },
          { title: 'Clarity', description: 'A prioritized fix list eliminates guesswork — you know exactly where to invest development time' }
        ]
      },
      'local-seo-services-agency': {
        pageTitle: 'Local SEO services',
        pageSubheading: 'GBP optimization, NAP consistency, local citation building, and map-pack rankings for businesses that serve a geographic area.',
        overlaySubtitle: 'Part of the SEO & Discoverability cluster',
        overlayTitle: 'Local search is a different algorithm — and most agencies treat it like regular SEO',
        overlayP1: 'Map-pack rankings, GBP prominence, and "near me" query dominance are governed by proximity, relevance, and prominence signals that are entirely separate from organic ranking factors.',
        overlayP2: 'We optimize all three — your Google Business Profile, your NAP consistency across citation sources, and your on-site local signals — as a single integrated system.',
        deepDiveHeading: 'Local SEO: proximity, relevance, and prominence as a unified system',
        deepDiveParagraphs: [
          'Google\'s local algorithm evaluates three factors: proximity to the searcher, relevance of your business to the query, and prominence — a composite of review signals, citation consistency, and on-site local authority. Most agencies focus on GBP optimization and ignore the prominence signals that differentiate businesses at identical proximity and relevance levels.',
          'NAP (Name, Address, Phone) consistency across citations is a foundational trust signal. A single inconsistent address format across Yelp, YellowPages, Foursquare, and industry-specific directories can suppress map-pack rankings for months. We audit, correct, and build citations systematically — prioritizing authoritative sources over high-volume low-quality directories.',
          'Location pages are the most underoptimized asset in local SEO. A single "Contact Us" page with an embedded map is not a location page — it\'s a placeholder. We build location pages with entity-specific content: neighborhood references, local schema, service-area copy, and internal linking structures that concentrate local authority on the pages that compete for map-pack placement.'
        ],
        concreteStepsHeading: 'How we build local SEO dominance, concretely',
        concreteSteps: [
          'GBP audit and optimization: category selection, service areas, photos, Q&A, posts, and attribute completeness',
          'NAP consistency audit across the top 50 citation sources — corrections and new citation submissions',
          'Local keyword and intent mapping: "near me" queries, neighborhood-specific terms, and service-area searches',
          'Location page creation or rewrite: entity-rich content, local schema, and service-area specificity',
          'Review velocity strategy: systematic process for generating consistent, authentic review volume',
          'Monthly GBP monitoring: ranking positions, engagement metrics, and search query performance'
        ],
        advantagesHeading: 'What does local SEO investment return?',
        advantageCards: [
          { title: 'Map-pack visibility', description: 'Three-pack rankings are above organic results — position 1 local is worth more than position 1 organic for local intent queries' },
          { title: 'Intent matching', description: '"Near me" and location-specific searches have the highest purchase intent of any search query category' },
          { title: 'Review authority', description: 'Higher review velocity and rating scores influence both rankings and click-through rates simultaneously' },
          { title: 'Compounding', description: 'Citation consistency and GBP authority build over time — early investment yields disproportionate long-term returns' }
        ]
      },
      'b2b-seo-agency': {
        pageTitle: 'B2B SEO',
        pageSubheading: 'Long-cycle, high-value buyer journey optimization targeting decision-makers and procurement queries — not just traffic volume.',
        overlaySubtitle: 'Part of the SEO & Discoverability cluster',
        overlayTitle: 'B2B SEO is not about impressions — it\'s about reaching the right buyer at the right stage',
        overlayP1: 'B2B purchase decisions involve multiple stakeholders, research cycles measured in weeks, and queries that look nothing like B2C search patterns. Ranking for high-volume keywords is irrelevant if none of those visitors have budget authority.',
        overlayP2: 'We build B2B SEO strategies around decision-maker queries, procurement language, and the specific content types that move buyers from awareness to vendor shortlist.',
        deepDiveHeading: 'B2B SEO strategy: built around how enterprise buyers actually search',
        deepDiveParagraphs: [
          'B2B buyers search differently at each stage of the purchase cycle. Awareness-stage queries are broad and educational — "how to improve B2B pipeline conversion." Mid-funnel queries are comparative — "best CRM for B2B sales teams." Bottom-funnel queries are vendor-specific and high-intent — "Salesforce alternative for mid-market." Each stage requires different content types, different SERP features to target, and different conversion architectures.',
          'Decision-maker SEO targets titles and roles, not just topics. The queries a CFO uses to research a financial SaaS product differ from the queries a VP of Operations uses for the same product. We map buyer personas to search behavior and build content architectures that place the right message in front of the right decision-maker at the right stage.',
          'B2B SEO ROI is measured differently too. A single converted lead from organic search may represent $50,000 in contract value. This changes the keyword prioritization calculus entirely — a low-volume, high-commercial-intent query is worth more than a high-volume informational query that attracts readers, not buyers. We build strategies optimized for pipeline value, not impressions.'
        ],
        concreteStepsHeading: 'How we build a B2B SEO program, concretely',
        concreteSteps: [
          'Buyer persona mapping: identify all stakeholder roles involved in the purchase decision and their specific search behaviors',
          'Purchase-cycle keyword architecture: awareness, consideration, and decision-stage queries mapped to specific URLs',
          'Competitive gap analysis: which decision-stage queries are your competitors ranking for that you are not',
          'Content architecture: pillar pages, topic clusters, and comparison pages targeting vendor-evaluation queries',
          'Technical foundation: Core Web Vitals, structured data, and crawl efficiency for authoritative domain signaling',
          'Pipeline attribution: connect organic rankings to CRM pipeline data so SEO investment is measured in revenue, not traffic'
        ],
        advantagesHeading: 'Why B2B-specific SEO strategy matters',
        advantageCards: [
          { title: 'Quality over volume', description: 'One high-intent B2B visitor is worth more than 1,000 informational readers — strategy reflects that distinction' },
          { title: 'Longer runway', description: 'B2B purchase cycles mean SEO-sourced leads have longer sales windows — content needs to support every stage' },
          { title: 'Decision-maker reach', description: 'Targeting procurement and evaluation queries puts your brand in front of budget holders, not just researchers' },
          { title: 'Pipeline ROI', description: 'SEO measured against contract value, not sessions — every ranking investment is tied to revenue potential' }
        ]
      },
      'ecommerce-seo-agency': {
        pageTitle: 'E-commerce SEO',
        pageSubheading: 'Category and product page architecture, faceted navigation, schema, and commercial-intent content clusters for online stores.',
        overlaySubtitle: 'Part of the SEO & Discoverability cluster',
        overlayTitle: 'E-commerce SEO has unique technical challenges that generic agencies miss entirely',
        overlayP1: 'Faceted navigation, duplicate product pages, thin category content, and crawl budget misallocation are e-commerce-specific problems that standard SEO audits don\'t fully address.',
        overlayP2: 'We specialize in the structural and content challenges unique to product catalogs — building architectures that rank category and product pages for commercial-intent queries at scale.',
        deepDiveHeading: 'E-commerce SEO: architecture, product data, and commercial content at scale',
        deepDiveParagraphs: [
          'The largest technical challenge in e-commerce SEO is faceted navigation — the filter systems that generate thousands of URL combinations (color, size, price, brand) that duplicate content and dilute crawl budget. Handling faceted navigation correctly requires a combination of canonical tags, parameter handling in Search Console, noindex directives for low-value filter combinations, and strategic allowlisting of high-value filter pages that have real ranking potential.',
          'Category pages are the highest-value ranking assets in most e-commerce sites and the most underoptimized. Most category pages contain only a product grid and a heading — no unique content, no internal linking strategy, no structured data. We transform category pages into authoritative hub pages: buyer guides above the fold, comparison tables, internal links to top products, and Category schema that captures rich results.',
          'Product page SEO at scale requires systematic content and schema — not page-by-page manual work. We build templated optimization systems: structured data templates for Product, Offer, and AggregateRating schema; title tag formulas that incorporate commercial-intent modifiers; and automated internal linking patterns that distribute link equity from category pages to high-margin product pages.'
        ],
        concreteStepsHeading: 'How we optimize e-commerce SEO, concretely',
        concreteSteps: [
          'Faceted navigation audit: identify URL permutations wasting crawl budget and implement canonical/noindex strategy',
          'Category page optimization: unique content, internal linking, structured data, and commercial-intent keyword targeting',
          'Product page audit: title tag formulas, schema templates, and systematic on-page optimization at scale',
          'Crawl budget analysis: index coverage versus product catalog size — identify and resolve index bloat',
          'Commercial content strategy: buying guides, comparison content, and "best [category]" pages targeting bottom-funnel queries',
          'Schema deployment: Product, Offer, AggregateRating, and BreadcrumbList structured data for rich results eligibility'
        ],
        advantagesHeading: 'What e-commerce SEO delivers',
        advantageCards: [
          { title: 'Category rankings', description: 'Category pages dominate high-volume commercial queries — systematic optimization unlocks disproportionate traffic' },
          { title: 'Rich results', description: 'Product schema enables star ratings, price, and availability in SERPs — significantly higher CTR than standard results' },
          { title: 'Crawl efficiency', description: 'Fixing faceted navigation frees crawl budget for product pages that actually deserve to rank' },
          { title: 'Revenue per click', description: 'Commercial-intent organic traffic converts at higher rates than informational traffic — quality over volume' }
        ]
      },

      'google-penalty-recovery': {
        pageTitle: 'Google penalty recovery',
        pageSubheading: 'We diagnose algorithmic suppressions and manual actions, then deploy the precise fix.',
        overlaySubtitle: 'We restore organic authority through forensic diagnosis',
        overlayTitle: 'Every penalty has a root cause — and a documented path to recovery',
        overlayP1: 'Google penalties fall into two distinct categories: manual actions issued by a human reviewer, and algorithmic suppressions triggered by quality classifiers during core updates.',
        overlayP2: 'Each type requires a different recovery workflow. We identify which you are dealing with and execute the correct sequence — no guesswork, no generic content rewrites.',
        deepDiveHeading: 'Forensic diagnosis before a single line of code changes: the right way to recover',
        deepDiveParagraphs: [
          'Recovering from a Google penalty without first diagnosing its exact cause is like treating symptoms without identifying the disease. Most agencies jump straight to content rewrites or link removal — and fail. We start with the data: Search Console logs, index coverage reports, and core update timeline correlation.',
          'We categorize the penalty type first — manual action or algorithmic suppression — because each requires a fundamentally different recovery workflow. Manual actions require a reconsideration request with documented evidence of remediation. Algorithmic suppressions require systematic quality signal improvement before the next core update window.',
          'Once the root cause is confirmed, we build a prioritized fix sequence: crawl errors first, then thin content consolidation, then unnatural link disavowal, then E-E-A-T signal architecture. Every fix is documented for the reconsideration request where applicable.'
        ],
        concreteStepsHeading: 'How do we recover from a Google penalty, concretely?',
        concreteSteps: [
          'We conduct a forensic Google Search Console audit: index coverage errors, manual action notices, and traffic drop correlation to core update dates',
          'We identify the penalty type — manual action or algorithmic suppression — and document the specific signals that triggered it',
          'We build a prioritized remediation plan with clear timelines: crawl fixes, content consolidation, and link disavowal file preparation',
          'We execute fixes systematically: resolving technical errors, pruning thin pages, disavowing toxic backlinks, and improving E-E-A-T signals',
          'We submit the reconsideration request (for manual actions) with full documentation of changes and quality commitments',
          'We monitor index coverage, Search Console signals, and organic traffic weekly until recovery is confirmed and stable'
        ],
        advantagesHeading: 'What are the advantages of professional penalty recovery?',
        advantageCards: [
          { title: 'Traffic Recovery', description: 'Systematic root-cause remediation restores suppressed organic traffic — often to levels above the pre-penalty baseline' },
          { title: 'Rankings', description: 'Correctly resolved penalties remove the algorithmic ceiling suppressing your target keyword ranking positions' },
          { title: 'Prevention', description: 'A thorough recovery process identifies the underlying quality gaps that prevent future algorithmic suppression' },
          { title: 'Documentation', description: 'A formal reconsideration request with clear evidence gives Google the confidence to reinstate your previous rankings' }
        ]
      }
    };

    const pageData = slugMap[slug] || {
      pageTitle: formattedSlug,
      pageSubheading: formattedCategory,
      overlaySubtitle: catLower === 'creativity' ? 'We translate ideas into high-impact campaigns' : catLower === 'performance' ? 'We engineer systems for measurable outcomes' : 'We build authority and brand reputation',
      overlayTitle: catLower === 'creativity' ? `Art and creative direction for ${formattedSlug.toLowerCase()} campaigns` : catLower === 'performance' ? `Algorithmic optimization and technical ${formattedSlug.toLowerCase()} engineering` : `Strategic communication and authoritative ${formattedSlug.toLowerCase()} distribution`,
      overlayP1: catLower === 'creativity' ? 'It seems obvious, but a company presents itself and communicates through images and content that represent it.' : catLower === 'performance' ? 'Achieving organic prominence requires a rigorous, structured alignment with modern search intent vectors.' : 'Your digital footprint is shaped by who talks about you and where.',
      overlayP2: catLower === 'creativity' ? 'Who decides how your assets should be designed? Who thinks about, makes, and manages the creation of your creative properties?' : catLower === 'performance' ? 'Who audits your Core Web Vitals? Who designs your data pipeline? Who handles your structured schema markup?' : 'Who manages your digital PR outreach? Who syndicates your content to high-value publications?'
    };

    const overlaySubtitle = pageData.overlaySubtitle;
    const overlayTitle = pageData.overlayTitle;
    const overlayP1 = pageData.overlayP1;
    const overlayP2 = pageData.overlayP2;

    const deepDiveHeading = pageData.deepDiveHeading ?? (
      catLower === 'creativity' ? 'Creative strategy that positions your brand and commands attention' :
      catLower === 'performance' ? 'Technical systems engineered for measurable, compounding outcomes' :
      catLower === 'recovery' ? 'Forensic diagnosis before a single line of code changes' :
      'Strategic positioning that builds authority and earns audience trust'
    );
    const deepDiveParagraphs: string[] = pageData.deepDiveParagraphs ?? (
      catLower === 'creativity' ? [
        'We bring together multidisciplinary creative talent — designers, strategists, writers, and directors — to develop outputs that are not just visually compelling but strategically positioned to drive business outcomes.',
        'Every creative decision we make is grounded in audience insight, competitive analysis, and brand positioning. We translate complex business objectives into clear, memorable communication that resonates with the people who matter most to your growth.',
        'The result is creative work that performs: work that earns attention, builds recognition, and moves audiences from awareness to action.'
      ] : catLower === 'performance' ? [
        'Performance marketing is a system, not a set of isolated tactics. We align your technical infrastructure, paid channels, organic search signals, and conversion architecture into a single, coordinated growth engine.',
        'Every component we build is designed to be measurable, optimizable, and compound in value over time. We do not chase short-term metrics that reverse at the next algorithm update or platform policy change.',
        'The result is a marketing system that generates predictable, sustainable pipeline growth — one that becomes more efficient as we accumulate data and iterate on what works.'
      ] : [
        'Building digital authority is an active, ongoing process that requires consistency, expertise, and a clear long-term strategy. We connect your brand with the external signals — media coverage, backlinks, citations, and community presence — that establish genuine credibility.',
        'Every relationship we build, every piece of coverage we earn, and every citation we secure is a permanent addition to your brand\'s digital authority profile. These signals compound over time, becoming more valuable with each passing month.',
        'The result is a brand that commands attention, earns trust, and maintains dominant visibility in its market — because its authority is built on real, verifiable signals rather than short-term tactics.'
      ]
    );
    const concreteStepsHeading = pageData.concreteStepsHeading ?? `How do we approach ${pageData.pageTitle.toLowerCase()}, concretely?`;
    const concreteSteps: string[] = pageData.concreteSteps ?? (
      catLower === 'creativity' ? [
        'We start with a discovery session to fully understand your brand, audience, competitors, and communication objectives',
        'We conduct market and audience research to ground every creative decision in data and real insight',
        'We develop strategic concepts and present multiple creative directions for collaborative review',
        'We refine the selected direction with your feedback and align it to your production and distribution requirements',
        'We manage creative production across all formats, coordinating with partners to maintain quality and brand cohesion',
        'We deliver all final assets with documentation to ensure consistent application across every touchpoint going forward'
      ] : catLower === 'performance' ? [
        'We start with a full audit of your current performance: technical health, traffic signals, conversion data, and competitive benchmarks',
        'We identify the highest-impact opportunities and build a prioritized roadmap with clear deliverables and timelines',
        'We execute technical improvements in parallel with content and conversion strategy development',
        'We implement tracking, attribution, and reporting infrastructure to measure every outcome with precision',
        'We run iterative optimization cycles: testing, measuring, documenting, and improving based on real performance data',
        'We deliver monthly performance reports with insights, results, and the strategic priorities for the next cycle'
      ] : [
        'We audit your current authority profile: backlink quality, media mentions, citation consistency, and competitive positioning',
        'We identify the highest-value outreach and placement opportunities in your market and build a targeted action plan',
        'We create the content assets and campaign materials needed to earn genuine editorial attention and engagement',
        'We execute outreach systematically: journalists, editors, community partners, and directory managers',
        'We manage placements, relationships, and campaign coordination to ensure maximum quality and relevance',
        'We report on results monthly: placements secured, authority signals gained, and ranking or traffic improvements'
      ]
    );
    const advantagesHeading = pageData.advantagesHeading ?? `What are the advantages of ${pageData.pageTitle.toLowerCase()}?`;
    const advantageCards: { title: string; description: string }[] = pageData.advantageCards ?? (
      catLower === 'creativity' ? [
        { title: 'Branding', description: 'Strong creative strategy builds immediate recognition and lasting brand recall across every channel' },
        { title: 'Engagement', description: 'Relevant, resonant creative content drives higher audience interaction and emotional connection' },
        { title: 'Conversion', description: 'Strategically crafted messaging moves audiences from awareness to consideration to action more efficiently' },
        { title: 'Consistency', description: 'A documented creative system ensures every output — regardless of format — is recognisably on-brand' }
      ] : catLower === 'performance' ? [
        { title: 'Traffic', description: 'Optimized performance systems drive more high-intent visitors to your digital assets every month' },
        { title: 'Pipeline', description: 'Systematic conversion optimization turns more of that traffic into qualified leads and paying customers' },
        { title: 'Efficiency', description: 'Performance marketing generates compounding returns — cost-per-lead decreases as systems mature' },
        { title: 'Stability', description: 'Well-built technical foundations are resilient to algorithm updates and platform policy changes' }
      ] : [
        { title: 'Authority', description: 'External citations and media coverage build domain and brand authority that compounds over time' },
        { title: 'Rankings', description: 'High-quality backlinks and editorial mentions improve ranking potential across all commercial keywords' },
        { title: 'Trust', description: 'Third-party validation from credible sources builds buyer confidence in ways self-promotion cannot' },
        { title: 'Visibility', description: 'Earned media and community presence extend your brand\'s reach beyond the limits of owned channels' }
      ]
    );

    // Determine dynamic texts based on category
    let coreText1 = "";
    let coreText2 = "";
    let methodHeading = "";
    let methodP2 = "";
    let methodP3 = "";
    let addedValueTitle = "";
    let addedValueItems: string[] = [];
    
    if (catLower === 'creativity') {
      coreText1 = `The artistic and creative management of a project works together with selected production teams and partners to deliver high-fidelity outputs.`;
      coreText2 = `From the creation of the idea, functional to the brand in relation to target, sector, language, and positioning, we move on to the creative approach to be given to all assets - mood, style, tone, look, and feel.`;
      methodHeading = `How do we arrive at the realization of a creative project?`;
      methodP2 = `To structure a creative project we always start by meeting and sharing with the client, colleagues, and partners, including professional designers, writers, and directors. From there, we build a strategic and well-coordinated project, defined down to the smallest detail: the aim is to transfer concepts, mood, style, and tone of the brand.`;
      methodP3 = `To do this, we draw up detailed storyboards and style boards, invest time in brainstorming and comparisons with your team in order to transfer concepts and develop solutions that comply with the idea behind the project.`;
      addedValueTitle = `${pageData.pageTitle} management, why is it an added value?`;
      addedValueItems = [
        "Because every communication tool you use needs visuals that tell your brand story at its best",
        "Because the right image or copy must tell the essence and values of your brand, at a glance",
        "Because standing out is not easy, but possible with outputs that respond to well-defined strategies",
        "Because having a clear artistic direction to follow optimises production and turnaround time"
      ];
    } else if (catLower === 'performance') {
      coreText1 = `Technical excellence is the bedrock of digital authority. We optimize every layer of your platform to ensure maximum discoverability by modern search crawlers and AI answer engines.`;
      coreText2 = `From entity alignment to semantic schema injection, we align your digital assets to rank natively and reliably where your target customers look for answers.`;
      methodHeading = `How do we arrive at the realization of a performance optimization cycle?`;
      methodP2 = `To structure an optimization cycle we always start by auditing your existing signals and search performance graphs. From there, we build a technical roadmap that targets indexing gaps, server-side issues, and entity structure definition.`;
      methodP3 = `To do this, we write custom JSON-LD schema, design custom page-speed optimizations, and continuously monitor search console logs to resolve issues before they affect conversions or rankings.`;
      addedValueTitle = `${pageData.pageTitle} integration, why is it an added value?`;
      addedValueItems = [
        "Because optimized codebase architectures ensure sub-second loads and zero crawler friction",
        "Because clean semantic markup defines your entities clearly for LLMs and search engines",
        "Because data-driven conversion frameworks capture and nurture high-intent pipeline",
        "Because proactive error auditing secures stable visibility through core algorithm updates"
      ];
    } else if (catLower === 'recovery') {
      coreText1 = `Recovering from a Google penalty is a structured engineering process, not a content volume exercise. We read Search Console logs, cross-reference core update timelines, and identify the exact quality signal that triggered suppression.`;
      coreText2 = `From the manual action report to algorithmic classifier audits, we map the full diagnostic sequence before touching a single page — ensuring every fix is purposeful and permanent.`;
      methodHeading = `How do we diagnose and recover from a Google penalty?`;
      methodP2 = `We start with a forensic Search Console review and cross-reference the suppression date against known Google core update rollout timelines. From there we categorize the penalty type and build a prioritized fix order: crawl errors, thin content, unnatural links, E-E-A-T gaps.`;
      methodP3 = `To execute recovery, we submit disavow files, write reconsideration requests, restructure entity schema, prune or consolidate underperforming URLs, and monitor index coverage weekly until traffic signals confirm restoration.`;
      addedValueTitle = `Google penalty recovery, why does the approach matter?`;
      addedValueItems = [
        "Because misdiagnosing a manual action as algorithmic means you'll never submit the right reconsideration request",
        "Because generic content rewrites don't satisfy quality classifiers — targeted E-E-A-T signals do",
        "Because a single unresolved crawl error can suppress an entire subdirectory from ranking",
        "Because recovery without root-cause analysis guarantees the same penalty returns at the next core update"
      ];
    } else { // relations or other
      coreText1 = `Building digital authority is an active process of earning trust. We connect your brand with high-authority publications and community hubs that matter.`;
      coreText2 = `Through data-driven PR campaigns and strategic media outreach, we translate brand values into verified external signals that search algorithms and target audiences value.`;
      methodHeading = `How do we arrive at the realization of an outreach campaign?`;
      methodP2 = `To structure an outreach campaign we always start by auditing your backlink profile and market visibility benchmarks. From there, we identify target publications and create editorial content that earns natural citation share.`;
      methodP3 = `To do this, we coordinate with journalists, write research-focused whitepapers, and run active link audits to ensure clean, high-quality reference signals.`;
      addedValueTitle = `${pageData.pageTitle} distribution, why is it an added value?`;
      addedValueItems = [
        "Because clean external backlinks build core algorithmic domain authority",
        "Because high-profile digital PR establishes brand recognition and trust",
        "Because authoritative directory citations secure local map pack prominence",
        "Because syndicated thought leadership translates expertise into organic visibility"
      ];
    }

    const heroBg =
      catLower === 'performance' ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000' :
      catLower === 'relations'   ? 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000' :
      catLower === 'recovery'    ? 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000' :
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000';

    return (
      <div className="bg-white text-gray-900 min-h-screen font-sans selection:bg-black selection:text-white">
        <SiteHeader />

        <main id="primary" className="site-main w-full">

          {/* ── White section: breadcrumbs + H1 ── */}
          <div className="bg-white" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
            <div className="container mx-auto px-6 sm:px-10 max-w-6xl">
              <nav className="text-[13px] font-medium text-gray-400 mb-12 flex items-center gap-2 tracking-wide">
                <a href="/" className="hover:text-gray-700 transition-colors">Home</a>
                <span className="text-gray-200">/</span>
                <a href={`/${catLower}`} className="hover:text-gray-700 transition-colors capitalize">{formattedCategory}</a>
                <span className="text-gray-200">/</span>
                <span className="text-gray-900 font-semibold">{pageData.pageTitle}</span>
              </nav>
              <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-bold tracking-tight text-gray-900 leading-[1.03] max-w-5xl mb-7">
                {pageData.pageTitle}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed">
                {pageData.pageSubheading}
              </p>
            </div>
          </div>

          {/* ── Full-bleed hero image with bottom-aligned marketing copy ── */}
          <div
            className="relative w-full flex items-end"
            style={{ minHeight: '80vh', backgroundColor: '#0d0d0d' }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url('${heroBg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.55,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="relative z-10 w-full container mx-auto px-6 sm:px-10 max-w-6xl pb-16 pt-32 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-end">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] mb-5" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>{overlaySubtitle}</p>
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-tight text-white leading-[1.05]">
                  {overlayTitle}
                </h2>
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-base leading-[1.8]" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{overlayP1}</p>
                <p className="text-base leading-[1.8]" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{overlayP2}</p>
                <div className="pt-2">
                  <a
                    href="/book"
                    className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-7 py-4 rounded-full text-sm hover:bg-gray-100 transition-colors"
                  >
                    Tell us about you →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Core text ── */}
          <div className="bg-white border-b border-gray-100">
            <div className="container mx-auto px-6 sm:px-10 max-w-4xl py-24 sm:py-32 text-center">
              <p className="text-[clamp(1.1rem,2vw,1.5rem)] text-gray-600 leading-[1.8] mb-10">
                {coreText1}
              </p>
              <p className="text-[clamp(1.1rem,2vw,1.5rem)] text-gray-600 leading-[1.8]">
                {coreText2}
              </p>
            </div>
          </div>

          {/* ── Step-by-step ── */}
          <div className="bg-white border-b border-gray-100">
            <div className="container mx-auto px-6 sm:px-10 max-w-6xl py-24 sm:py-32 grid grid-cols-1 md:grid-cols-[36%_1fr] gap-16 md:gap-28 items-start">
              <div className="md:sticky md:top-32">
                <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-tight text-gray-900 leading-[1.1]">
                  Step-by-step<br />{formattedSlug.replace(/-agency$/i, '').toLowerCase()} realization
                </h2>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 leading-snug">{methodHeading}</h3>
                <p className="text-lg text-gray-500 leading-[1.8] mb-7">
                  We follow a precise method, which starts with listening and ends with the concrete realization of the project.
                </p>
                <p className="text-lg text-gray-500 leading-[1.8] mb-7">{methodP2}</p>
                <p className="text-lg text-gray-500 leading-[1.8]">{methodP3}</p>
              </div>
            </div>
          </div>

          {/* ── Added value numbered list ── */}
          <div className="bg-white border-b border-gray-100">
            <div className="container mx-auto px-6 sm:px-10 max-w-6xl py-24 sm:py-32">
              <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-gray-900 mb-20 max-w-3xl leading-tight">
                {addedValueTitle}
              </h2>
              <div className="border-t border-gray-200">
                {addedValueItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-[72px_1fr] py-9 border-b border-gray-100 items-start">
                    <span className="text-sm font-mono text-gray-300 pt-1">0{idx + 1}.</span>
                    <p className="text-[clamp(1.1rem,2vw,1.4rem)] text-gray-800 font-light leading-[1.65]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Deep dive: sticky left heading + right paragraphs ── */}
          <div className="bg-[#f8f8f7] border-b border-gray-100">
            <div className="container mx-auto px-6 sm:px-10 max-w-6xl py-24 sm:py-32 grid grid-cols-1 md:grid-cols-[40%_1fr] gap-16 md:gap-28 items-start">
              <div className="md:sticky md:top-32">
                <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-tight text-gray-900 leading-[1.1]">
                  {deepDiveHeading}
                </h2>
              </div>
              <div className="flex flex-col gap-8">
                {deepDiveParagraphs.map((p, i) => (
                  <p key={i} className="text-lg text-gray-500 leading-[1.85]">{p}</p>
                ))}
              </div>
            </div>
          </div>

          {/* ── Concrete numbered steps ── */}
          <div className="bg-white border-b border-gray-100">
            <div className="container mx-auto px-6 sm:px-10 max-w-6xl py-24 sm:py-32">
              <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-gray-900 mb-16 max-w-3xl leading-tight">
                {concreteStepsHeading}
              </h2>
              <div className="border-t border-gray-200">
                {concreteSteps.map((step, idx) => (
                  <div key={idx} className="grid grid-cols-[80px_1fr] py-8 border-b border-gray-100 items-start">
                    <span className="text-sm font-mono text-gray-300 pt-0.5">0{idx + 1}.</span>
                    <p className="text-[clamp(1rem,1.8vw,1.2rem)] text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Advantage cards ── */}
          <div className="bg-[#f8f8f7] border-b border-gray-100">
            <div className="container mx-auto px-6 sm:px-10 max-w-6xl py-24 sm:py-32">
              <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-gray-900 mb-16 max-w-3xl leading-tight">
                {advantagesHeading}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {advantageCards.map((card, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 p-8 flex flex-col justify-between min-h-[260px]">
                    <div>
                      <span className="text-xs font-mono text-gray-300 block mb-6">0{idx + 1}.</span>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">{card.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Case studies ── */}
          <div className="bg-white border-b border-gray-100">
            <div className="container mx-auto px-6 sm:px-10 max-w-6xl py-24 sm:py-32">
              <div className="grid grid-cols-1 md:grid-cols-[30%_1fr] gap-12 md:gap-24 mb-16">
                <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold text-gray-900 leading-tight">Case Studies</h2>
                <div>
                  <p className="text-xl text-gray-500 font-light mb-6 leading-relaxed">Success stories that can inspire you</p>
                  <a href="/case-studies" className="inline-flex items-center gap-2 text-gray-900 font-medium underline underline-offset-4 hover:text-gray-500 transition-colors text-sm tracking-wide">
                    Discover how we create value together with our clients →
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <a href="/case-studies/smile-center-dentistry" className="group block">
                  <div className="overflow-hidden mb-4" style={{ height: '320px' }}>
                    <img src="/images/smile-center-homepage.webp" alt="Smile Center Dentistry case study" width={720} height={320} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Smile Center Dentistry</h3>
                  <p className="text-sm text-gray-400">SEO & Web Development</p>
                </a>
                <a href="/case-studies/american-livescan" className="group block">
                  <div className="overflow-hidden mb-4" style={{ height: '320px' }}>
                    <img src="/images/american-livescan-storefront.webp" alt="American Livescan case study" width={720} height={320} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">American Livescan</h3>
                  <p className="text-sm text-gray-400">Local SEO & Google Business Profile</p>
                </a>
              </div>
            </div>
          </div>

        </main>

        <SiteFooter />
      </div>
    );
  }

  // --- Base Config Map ---
  const [time, setTime] = useState('');
  const [activeSchema, setActiveSchema] = useState<'business' | 'website' | 'article'>('business');
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [activeSection, setActiveSection] = useState('algorithmic-shift');
  const [activeSuccessSection, setActiveSuccessSection] = useState('recovery-case');
  const [simulatedVisitors, setSimulatedVisitors] = useState([
    { company: 'Acme Corp', page: '/services/seo', time: '2s ago', intent: 98 },
    { company: 'Enterprise Inc', page: '/services/lead-gen', time: '12s ago', intent: 85 },
    { company: 'Global Logistics', page: '/approach', time: '24s ago', intent: 92 },
    { company: 'Fintech Solutions', page: '/services/geo', time: '40s ago', intent: 88 }
  ]);

  const [contactDomain, setContactDomain] = useState('');
  const [contactServices, setContactServices] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const domainParam = params.get('domain');
    const servicesParam = params.get('services');
    if (domainParam) {
      setContactDomain(domainParam);
    }
    if (servicesParam) {
      setContactServices(servicesParam.split(',').filter(Boolean));
    }
  }, [path]);

  const schemas = {
    business: {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "name": "Enterprise Client",
      "url": "https://www.clientdomain.com",
      "telephone": "+1-555-000-0000",
      "priceRange": "$$$",
      "knowsAbout": [
        "https://en.wikipedia.org/wiki/Search_engine_optimization",
        "https://en.wikipedia.org/wiki/Information_retrieval",
        "https://en.wikipedia.org/wiki/B2B_marketing"
      ],
      "areaServed": "Global",
      "description": "Enterprise software platform engineered for high-intent pipeline growth and search visibility."
    },
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Enterprise Platform",
      "url": "https://www.clientdomain.com",
      "publisher": {
        "@type": "Organization",
        "name": "Enterprise Client"
      }
    },
    article: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "Algorithmic Pipeline Domination in the AI Era",
      "url": "https://www.clientdomain.com/insights/algorithmic-pipeline-domination",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.clientdomain.com/insights/algorithmic-pipeline-domination/#webpage"
      },
      "about": [
        {
          "@type": "Service",
          "name": "Entity Optimization",
          "url": "https://www.clientdomain.com/services/entity-optimization"
        }
      ],
      "author": {
        "@type": "Person",
        "name": "Industry Authority"
      }
    }
  };

  const sections = [
    { id: 'algorithmic-shift', label: 'Semantic Entities' },
    { id: 'topical-authority', label: 'Topical Architecture' },
    { id: 'geo-optimization-llm', label: 'AI Citations (GEO)' },
    { id: 'pipeline-orchestration', label: 'Revenue Pipelines' }
  ];

  const successSections = [
    { id: 'recovery-case', label: 'SmileCenter Dentistry' },
    { id: 'pipeline-case', label: 'American Livescan' },
  ];

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  useEffect(() => {
    if (path !== '/approach') return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-300px 0px -40% 0px', threshold: 0 });

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [path]);

  useEffect(() => {
    if (path !== '/case-studies') return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSuccessSection(entry.target.id);
        }
      });
    }, { rootMargin: '-300px 0px -40% 0px', threshold: 0 });

    successSections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [path]);

  useEffect(() => {
    if (path !== '/case-studies') return;
    const interval = setInterval(() => {
      setSimulatedVisitors(prev => {
        const companies = ['SpaceX', 'Stripe', 'Airbnb', 'HubSpot', 'Salesforce', 'Figma', 'Slack', 'Chevron'];
        const pages = ['/services/seo', '/services/lead-gen', '/services/geo', '/approach', '/case-studies'];
        const randomCompany = companies[Math.floor(Math.random() * companies.length)];
        const randomPage = pages[Math.floor(Math.random() * pages.length)];
        const randomIntent = Math.floor(Math.random() * 25) + 75; // 75-100
        
        return [
          { company: randomCompany, page: randomPage, time: 'Just now', intent: randomIntent },
          ...prev.slice(0, 3).map(v => {
            if (v.time === 'Just now') return { ...v, time: '3s ago' };
            if (v.time.endsWith('s ago')) {
              const seconds = parseInt(v.time) + 3;
              return { ...v, time: `${seconds}s ago` };
            }
            return v;
          })
        ];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [path]);

  useEffect(() => {
    let ctx: gsap.Context;

    function createTimeline() {
      if (ctx) ctx.revert();
      
      ctx = gsap.context(() => {
        const darkSections = gsap.utils.toArray("[data-logo-dark]") as HTMLElement[];
        
        // Handle dark mode logo inversions exactly like AxionLanding
        const box = document.querySelector("#animated-logo") as HTMLElement;
        if (box) {
          darkSections.forEach((section) => {
            ScrollTrigger.create({
              trigger: section,
              start: "top 50%",
              end: "bottom 50%",
              onEnter: () => gsap.to(box, { filter: "brightness(0) invert(1)", duration: 0.3, overwrite: "auto" }),
              onLeave: () => gsap.to(box, { filter: "brightness(1) invert(0)", duration: 0.3, overwrite: "auto" }),
              onEnterBack: () => gsap.to(box, { filter: "brightness(0) invert(1)", duration: 0.3, overwrite: "auto" }),
              onLeaveBack: () => gsap.to(box, { filter: "brightness(1) invert(0)", duration: 0.3, overwrite: "auto" }),
            });
          });
        }

        // Hero entrance animations
        const ease = 'power3.out';
        const heroTl = gsap.timeline({ delay: 0.15, defaults: { ease, duration: 1.15 } });
        heroTl
          .fromTo('[data-hero="1"]', { opacity: 0, y: 12 }, { opacity: 1, y: 0 }, 0)
          .fromTo('[data-hero="2"]', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.08)
          .fromTo('[data-hero="3"]', { opacity: 0, y: 16 }, { opacity: 1, y: 0 }, 0.18)
          .fromTo('[data-hero="4"]', { opacity: 0, y: 14 }, { opacity: 1, y: 0 }, 0.28);

        // Scroll reveals
        const sc = (el: Element) => ({ trigger: el, start: 'top 87%' });

        gsap.utils.toArray('[data-anim="up"]').forEach(el => {
          gsap.fromTo(el as Element, 
            { y: 30, opacity: 0 },
            { scrollTrigger: sc(el as Element), y: 0, opacity: 1, duration: 1.2, ease }
          );
        });

        gsap.utils.toArray('[data-anim="fade"]').forEach(el => {
          gsap.fromTo(el as Element, 
            { opacity: 0 },
            { scrollTrigger: sc(el as Element), opacity: 1, duration: 1.2, ease }
          );
        });

        gsap.utils.toArray('[data-anim="scale"]').forEach(el => {
          gsap.fromTo(el as Element, 
            { scale: 0.97, opacity: 0 },
            { scrollTrigger: sc(el as Element), scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' }
          );
        });

        gsap.utils.toArray('[data-anim="stagger"]').forEach(parent => {
          const kids = (parent as Element).querySelectorAll('[data-anim-child]');
          if (!kids.length) return;
          gsap.fromTo(kids, 
            { y: 26, opacity: 0 },
            { scrollTrigger: sc(parent as Element), y: 0, opacity: 1, duration: 1.15, ease, stagger: 0.12 }
          );
        });
      }, containerRef);
    }

    setTimeout(createTimeline, 100);
    window.addEventListener("resize", createTimeline);
    return () => {
      window.removeEventListener("resize", createTimeline);
      if (ctx) ctx.revert();
    };
  }, [path]);

  // Handle hash/anchor scroll on initial mount or path/hash change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          // Wait for rendering to complete
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        }
      }
    };
    
    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [path]);

  // Clock updating
  useEffect(() => {
    // Add logic if needed
  }, []);



  // Map route path to specific page copy and outcome messages
  const getPageConfig = (currentPath: string): PageConfig => {
    const normalPath = currentPath.toLowerCase().replace(/\/$/, '');
    const isServicesPath = normalPath.startsWith('/services/');
    const accentClass = isServicesPath ? 'text-[#2F5D50]' : 'text-[#F26522]';
    
    const defaultPageConfig: PageConfig = {
      subtitle: 'Gobiya Services > Growth Solutions',
      title: 'High-performance digital growth assets built for dominance.',
      rotatingWords: ['recover traffic.', 'scale sales.', 'secure dominance.'],
      outcomeMessage: 'Outcome-driven search & pipeline engineering',
      ctaText: 'Get growth audit',
      introScrollText: "AI-powered SEO and content, delivering fast rankings and recovery. Through cutting-edge AI and data strategies, we help brands recover traffic and skyrocket visibility.",
      introHeading: <>Stop guessing with your growth. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Start dominating with data.</>,
      introParagraph: "Our proprietary methodology combines machine learning insights with elite technical architecture, ensuring your brand captures the most valuable real estate available.",
      introVideo1: "/videos/space-girl.webm",
      introVideo2: "/videos/gobiyaRace.webm",
      bentoHeadline: <>Forensic analysis meets<br/>pipeline architecture.</>,
      bentoDescription: "We do not provide reports. We architect proprietary growth assets that command sector respect and generate predictable B2B revenue.",
      showCalculator: false
    };
    
    switch (normalPath) {
      case '/creativity':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > Creativity Solutions',
          title: 'Express your brand identity and capture market attention.',
          rotatingWords: ['brand identity.', 'communication.', 'art direction.', 'copywriting.'],
          outcomeMessage: 'Cohesive brand assets that command attention and drive conversion.',
          ctaText: 'Get creative audit',
          introScrollText: 'Creativity makes the way you express your identity unique and effective. The presentation of your brand, the digital assets you choose, and the voice you write with all shape your positioning.',
          introHeading: <>Express your unique value. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Communicate with clarity.</>,
          introParagraph: 'We design brand identity systems, write compelling copywriting, and direct creative concepts that turn attention into conversion.',
          introVideo1: "/videos/space-girl.webm",
          introVideo2: "/videos/gobiyaRace.webm",
          bentoHeadline: <>Bespoke brand design meets<br/>strategic positioning.</>,
          bentoDescription: 'We do not use generic templates. We build custom visual identities and communication plans that align with your business goals.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/creativity/brand-identity-strategy-agency', colSpan: 2, icon: <PenTool size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'Brand Identity Strategy', description: 'Define the unique essence, voice, and visual character of your business.' },
            { href: '/creativity/communication-concepts-agency', colSpan: 1, icon: <Megaphone size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Communication Concepts', description: 'Tell your story through dynamic visual and textual concepts.' },
            { href: '/creativity/seo-web-copywriting-agency', colSpan: 1, icon: <BarChart size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'SEO & Copywriting', description: 'Write content that engages human hearts and ranks in algorithms.' },
            { href: '/creativity/creative-art-direction-agency', colSpan: 2, gradient: true, icon: <Target size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Creative Art Direction', description: 'Coordinate styling, imagery, layout, and motion for your assets.' },
            { href: '/creativity/social-media-management-agency', colSpan: 1, icon: <Network size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Social Media', description: 'Grow active community loops around your core brand message.' }
          ],
          showCalculator: false
        };
      case '/performance':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > Performance Solutions',
          title: 'Engineer high-speed digital pipelines to scale conversions.',
          rotatingWords: ['technical SEO.', 'web development.', 'CRO analysis.', 'AI integrations.'],
          outcomeMessage: 'Data-driven systems that generate predictable growth.',
          ctaText: 'Get performance audit',
          introScrollText: 'Performance is about technical precision and conversion engineering. We build instant-load digital platforms with native databases, semantic schema alignment, and automated workflow integrations.',
          introHeading: <>Eliminate pipeline friction. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Dominate the search index.</>,
          introParagraph: 'We leverage modern custom architectures to build sub-second loading applications, integrate native CRM pipelines, and optimize for AI search discovery.',
          introVideo1: "/videos/sc-hero-background-compressed.webm",
          introVideo2: "/videos/ark------final-----01.webm",
          bentoHeadline: <>Technical optimization meets<br/>conversion architecture.</>,
          bentoDescription: 'We do not provide generic reports. We architect high-performance, crawler-ready custom applications with complete data ownership.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/performance/seo-discoverability-agency', colSpan: 2, icon: <Search size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'SEO & Discoverability', description: 'Align technical layers for Core Web Vitals and semantic structured schemas.' },
            { href: '/performance/web-development-agency', colSpan: 1, icon: <Code size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Web & IT App Dev', description: 'Bespoke React, Next.js, and Vite architectures designed for sub-second speeds.' },
            { href: '/performance/google-ads-ppc-strategy-agency', colSpan: 1, icon: <Target size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Google Ads & PPC', description: 'Hyper-targeted paid acquisition campaigns.' },
            { href: '/performance/cro-ux-analysis-agency', colSpan: 2, gradient: true, icon: <BarChart size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'CRO & UX Analysis', description: 'Isolate funnel friction and redesign flows to lift conversions.' },
            { href: '/performance/ai-llms-business-agency', colSpan: 1, icon: <Cpu size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'AI & LLM Consulting', description: 'Deploy secure custom LLM integrations and automated office workflows.' }
          ],
          showCalculator: false
        };
      case '/relations':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > Relations Solutions',
          title: 'Construct sector authority and earn absolute market trust.',
          rotatingWords: ['authority building.', 'digital PR.', 'outreach campaigns.', 'reputation.'],
          outcomeMessage: 'Earned trust and sector-defining visibility.',
          ctaText: 'Get authority audit',
          introScrollText: 'Relations is about authority and reputation. We construct sector-defining visibility through high-quality link acquisition, strategic digital PR, and targeted influencer and community outreach.',
          introHeading: <>Build ultimate authority. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Command sector respect.</>,
          introParagraph: 'We syndicate content to high-value publications and build high-quality backlink profiles to establish your business as the definitive leader.',
          introVideo1: "/videos/gobiyaRace.webm",
          introVideo2: "/videos/space-girl.webm",
          bentoHeadline: <>Reputation building meets<br/>strategic distribution.</>,
          bentoDescription: 'We do not buy cheap links. We execute manually verified PR and outreach campaigns to build long-term search trust.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/relations/authority-building-agency', colSpan: 2, icon: <Network size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'Authority & Link Building', description: 'Earn high-quality contextual links from authoritative industry domains.' },
            { href: '/relations/digital-pr-media-outreach-agency', colSpan: 1, icon: <Megaphone size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Digital PR & Outreach', description: 'Pitch compelling stories to top-tier journalists and media outlets.' },
            { href: '/relations/google-ads-ppc-strategy-agency', colSpan: 1, icon: <Target size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Google Ads & PPC', description: 'Hyper-targeted paid acquisition campaigns that return ROI.' },
            { href: '/relations/content-marketing-syndication-agency', colSpan: 2, gradient: true, icon: <PenTool size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Content Marketing Syndication', description: 'Write and distribute high-resolve content across syndication networks.' },
            { href: '/relations/influencer-marketing-agency', colSpan: 1, icon: <Briefcase size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Influencer Marketing', description: 'Target decision-makers and build brand authority natively.' },
            { href: '/relations/local-community-relations-agency', colSpan: 1, icon: <Clock size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Local Community Relations', description: 'Build authority locally through community engagement and local maps visibility.' }
          ],
          showCalculator: false
        };
      case '/capabilities':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Capabilities > Core Offerings',
          title: 'Custom web development, native CRM, built-in SEO, and blockchain engineering.',
          rotatingWords: ['engineer speed.', 'own your CRM.', 'get cited by AI.', 'deploy smart contracts.'],
          outcomeMessage: 'We build fast, modern web applications with native CRM pipelines, search discoverability, and custom Web3 integrations.',
          ctaText: 'Get growth audit',
          introScrollText: 'We build premium, custom React, Next.js, and Vite sites with native CRM databases, built-in SEO discoverability, and Web3 capabilities.',
          introHeading: <>Four core pillars. <br className="hidden sm:block" /><span className="sm:hidden"> </span>One powerful custom product.</>,
          introParagraph: 'At Gobiya, we do not run generic SEO campaigns. We build custom React/Next.js/Vite platforms, engineer native pipeline integrations, and write secure smart contracts that drive enterprise growth.',
          introVideo1: "/videos/space-girl.webm",
          introVideo2: "/videos/gobiyaRace.webm",
          bentoHeadline: <>Integrated capabilities.<br/>Measurable returns.</>,
          bentoDescription: 'Every capability is engineered to deliver a fast, indexable web application with complete data ownership and specialized Web3 capabilities. Verify our core pillars below.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/performance/web-development-agency/', colSpan: 2, gradient: true, icon: <Code size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Web Development', description: 'Custom React/Next.js/Vite sites engineered for sub-second page loads and flawless crawlability.' },
            { href: '/performance/native-crm-agency/', colSpan: 1, icon: <Database size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Native CRM', description: 'Pipeline and lead databases built directly into your codebase, ensuring 100% data ownership.' },
            { href: '/performance/seo-discoverability-agency/', colSpan: 2, icon: <Search size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'SEO & Discoverability', description: 'Built-in crawler-readiness, semantic data mapping, and formatting designed for Google and AI citation eligibility.' },
            { href: '/performance/blockchain-web3-development-agency/', colSpan: 1, icon: <Cpu size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'Blockchain & Web3 Dev', description: 'On-chain solutions, custom smart contracts, and decentralized application features integrated natively.' },
            { href: '/performance/ai-prospect-scraper-agency/', colSpan: 2, gradient: true, icon: <Search size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'AI Prospect Scraper', description: 'AI-powered scraper extracting NAP lead data and creating custom drip campaigns natively.' },
            { href: '/performance/ai-llms-business-agency/', colSpan: 1, icon: <Cpu size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'AI & LLMs for Businesses', description: 'Secure custom LLM integrations and automated office workflows to eliminate daily SMB friction.' }
          ],
          showCalculator: false
        };
      case '/services/seo':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Search Engine Optimization',
          title: 'Rebuild organic signals and reclaim search visibility.',
          rotatingWords: ['recover traffic.', 'audit signals.', 'rebuild authority.'],
          outcomeMessage: 'Proven organic traffic recovery & rank dominance',
          ctaText: 'Get organic audit',
          introScrollText: 'Entity-level SEO and content architectures delivering search dominance. Through algorithmic data strategies, we help brands recover traffic and scale visibility.',
          introHeading: <>Stop guessing with your SEO. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Start dominating with data.</>,
          introParagraph: 'Our proprietary methodology combines machine learning insights with elite technical SEO, ensuring your brand captures the most valuable search real estate available.',
          introVideo1: "/videos/sc-hero-background-compressed.webm",
          introVideo2: "/videos/ark------final-----01.webm",
          bentoHeadline: <>Forensic analysis meets<br/>algorithmic dominance.</>,
          bentoDescription: 'We do not provide generic reports. We architect proprietary organic assets that command sector respect and generate predictable inbound revenue.',
          insightCategory: 'SEO',
          bentoCards: [
            { href: '/services/seo', colSpan: 2, icon: <Search size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'Market Vector SEO', description: 'Hyper-local authority domination and signal optimization to capture high-intent search volumes.' },
            { href: '/services/geo-optimization', colSpan: 1, icon: <TrendingUp size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Algorithm Alignment', description: 'Data-driven signal processing to ensure your entities meet AI search intent.' },
            { href: '/google-penalty-recovery', colSpan: 1, icon: <ShieldAlert size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Trust Rebuilding', description: 'Reverse algorithmic drops by rebuilding robust E-E-A-T signals.' },
            { href: '/services/lead-generation', colSpan: 2, gradient: true, icon: <Network size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Revenue Conversion', description: 'Turn recovered organic traffic directly into qualified inbound revenue pipeline.' }
          ],
          showCalculator: true,
          calculatorProps: { title: "Calculate Your SEO Traffic Leak", description: "Input the monthly organic traffic you lost. See the pipeline revenue we can recover.", sliderLabel: "Organic Traffic Lost" }
        };
      case '/services/lead-generation':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > B2B Pipeline Architecture',
          title: 'Construct automated acquisition systems for predictable growth.',
          rotatingWords: ['capture leads.', 'scale revenue.', 'automate sales.'],
          outcomeMessage: 'Predictable high-intent B2B sales pipeline systems',
          ctaText: 'Build your pipeline',
          introScrollText: 'High-resolve B2B prospecting built for scale. We engineer automated outbound sales systems that consistently generate qualified pipeline and drive predictable revenue.',
          introHeading: <>Scale your contract value. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Automate your outbound.</>,
          introParagraph: 'We design and launch sophisticated cold outreach protocols and sales acquisition architectures for mid-market and enterprise brands, eliminating the reliance on unpredictable referrals.',
          introVideo1: "/videos/space-girl.webm",
          introVideo2: "/videos/gobiyaRace.webm",
          bentoHeadline: <>Predictable pipeline meets<br/>automated scale.</>,
          bentoDescription: 'Stop relying on referrals. We architect outbound growth engines that consistently land meetings with your ideal customer profiles and drive enterprise conversions.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/services/lead-generation', colSpan: 2, icon: <Network size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'Outbound Architecture', description: 'Cold email protocols and multi-channel prospecting flows built to scale without burning domains.' },
            { href: '/services/advertising', colSpan: 1, icon: <Target size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Intent Capture', description: 'Target decision-makers actively searching for enterprise solutions.' },
            { href: '/services/seo', colSpan: 1, icon: <BarChart size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Conversion Metrics', description: 'End-to-end CRM integration and revenue attribution tracking.' },
            { href: '/about', colSpan: 2, gradient: true, icon: <Briefcase size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Enterprise Sales Engineering', description: 'We do not just generate leads. We engineer systems that book meetings with qualified enterprise buyers.' }
          ],
          showCalculator: true,
          calculatorProps: { title: "Calculate Pipeline Value", description: "Input your target monthly qualified meetings to see potential pipeline value generated.", sliderLabel: "Target Meetings / Month", sliderMin: 10, sliderMax: 500, sliderStep: 5, conversionRate: 0.2, ltv: 25000, resultLabel: "Potential Pipeline Value Generated", disclaimer: "*Based on 20% close rate and $25k average contract value." }
        };
      case '/services/geo-optimization':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Generative Engine Optimization',
          title: 'Position your brand to be cited and recommended by AI.',
          rotatingWords: ['AI citations.', 'model references.', 'knowledge nodes.'],
          outcomeMessage: 'Entity optimization for ChatGPT, Claude, and Gemini',
          ctaText: 'Analyze AI footprint',
          introScrollText: 'Generative Engine Optimization positions your brand natively inside AI. We engineer your digital footprint so language models cite you as the ultimate authority.',
          introHeading: <>Be cited by AI models. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Capture the next search era.</>,
          introParagraph: 'Traditional search is evolving. We optimize your brand entities so that systems like ChatGPT, Claude, and Google AI Overviews recommend your solutions directly to high-intent users.',
          introVideo1: "/videos/ark------final-----01.webm",
          introVideo2: "/videos/space-girl.webm",
          bentoHeadline: <>Entity optimization meets<br/>LLM alignment.</>,
          bentoDescription: 'Secure your place in generative AI responses. We engineer brand signals that force AI models to recognize you as the definitive market leader.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/services/geo-optimization', colSpan: 2, icon: <TrendingUp size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'LLM Brand Surfacing', description: 'Optimize your digital footprint to be the primary recommended entity in ChatGPT and Claude responses.' },
            { href: '/services/seo', colSpan: 1, icon: <Search size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'AI Overviews', description: 'Capture top real estate in Google\'s generative AI search results.' },
            { href: '/services/lead-generation', colSpan: 1, icon: <PenTool size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Semantic PR', description: 'Seed your brand messaging directly into the training data pipelines.' },
            { href: '/insights', colSpan: 2, gradient: true, icon: <Network size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Generative Search Dominance', description: 'The search paradigm has shifted. We ensure your business is not left behind by the AI transition.' }
          ]
        };
      case '/services/web-design':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > High-Performance Engineering',
          title: 'Engineered custom web applications built to convert.',
          rotatingWords: ['load under 1s.', 'drive conversions.', 'scale seamless UI.'],
          outcomeMessage: 'Conversion-engineered high-speed custom React platforms',
          ctaText: 'Start web design',
          introScrollText: 'Speed-optimized, custom-engineered React platforms built to convert. We replace slow templates with lightning-fast landing pages and robust web applications.',
          introHeading: <>Outperform the competition. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Build for speed.</>,
          introParagraph: 'Your website is your ultimate conversion asset. We leverage modern JavaScript frameworks like React and Next.js to deliver instant load times, flawless technical SEO, and premium user experiences.',
          introVideo1: "/videos/smilecenter-screencast.webm",
          introVideo2: "/videos/caveman.webm",
          bentoHeadline: <>Custom engineering meets<br/>conversion architecture.</>,
          bentoDescription: 'No templates. No bloated code. We build bespoke, high-performance web applications that convert visitors into revenue and pass Core Web Vitals with flying colors.',
          insightCategory: 'Technical',
          bentoCards: [
            { href: '/services/web-design', colSpan: 2, icon: <PenTool size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'React UI/UX Engineering', description: 'Next.js architectures delivering seamless interactions and sub-second page loads.' },
            { href: '/services/seo', colSpan: 1, icon: <BarChart size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Core Web Vitals', description: 'Flawless performance metrics ensuring Google ranking boosts.' },
            { href: '/services/advertising', colSpan: 1, icon: <Target size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Landing Page CRO', description: 'High-converting funnels explicitly designed to lower acquisition costs.' },
            { href: '/case-studies', colSpan: 2, gradient: true, icon: <Briefcase size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Conversion Architecture', description: 'Your site should be your best salesperson. We engineer platforms that maximize revenue yield from every visitor.' }
          ],
          showCalculator: true,
          calculatorProps: { title: "Calculate CRO Revenue Uplift", description: "Input your monthly traffic to see the revenue impact of improving your conversion rate via high-performance web design.", sliderLabel: "Monthly Site Traffic", sliderMin: 5000, sliderMax: 200000, sliderStep: 5000, conversionRate: 0.015, ltv: 200, resultLabel: "Added Monthly Revenue (1.5% CRO Uplift)", disclaimer: "*Based on a 1.5% conversion rate increase and $200 Average Order Value." }
        };
      case '/services/advertising':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Paid Search & Social',
          title: 'Maximize conversion yield and lower customer acquisition costs.',
          rotatingWords: ['increase ROAS.', 'lower CAC.', 'scale PPC revenue.'],
          outcomeMessage: 'Maximum ROAS paid search & social ad pipelines',
          ctaText: 'Scale paid ads',
          introScrollText: 'Data-driven paid media strategies to maximize your return on ad spend. We engineer highly targeted campaigns across Google, Meta, and LinkedIn to scale acquisitions.',
          introHeading: <>Maximize your ad spend. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Scale your acquisitions.</>,
          introParagraph: 'Stop burning cash on generic ad campaigns. We build precision-targeted paid pipelines that capture high-intent buyers, aggressively lower customer acquisition costs, and maximize ROAS.',
          introVideo1: "/videos/gobiyaRace.webm",
          introVideo2: "/videos/sc-hero-background-compressed.webm",
          bentoHeadline: <>Performance media meets<br/>funnel optimization.</>,
          bentoDescription: 'We manage multi-channel ad pipelines that turn clicks into qualified leads. Our data-driven approach ensures every dollar spent drives measurable bottom-line growth.',
          insightCategory: 'Analytics',
          bentoCards: [
            { href: '/services/advertising', colSpan: 2, icon: <Megaphone size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'Paid Search Domination', description: 'Google Ads strategies maximizing intent capture and aggressively lowering CPA.' },
            { href: '/services/lead-generation', colSpan: 1, icon: <Target size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'LinkedIn B2B', description: 'Precision targeting for enterprise decision-makers.' },
            { href: '/services/web-design', colSpan: 1, icon: <BarChart size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Funnel Optimization', description: 'A/B testing and attribution modeling for max yield.' },
            { href: '/approach', colSpan: 2, gradient: true, icon: <TrendingUp size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Predictable ROAS Pipeline', description: 'We track every dollar spent to pipeline generated, ensuring your ad budget drives undeniable business growth.' }
          ],
          showCalculator: true,
          calculatorProps: { title: "Calculate Paid Ad Returns", description: "Input your planned monthly ad spend to see projected pipeline returns.", sliderLabel: "Monthly Ad Spend", sliderMin: 5000, sliderMax: 100000, sliderStep: 5000, conversionRate: 4.5, ltv: 1, resultLabel: "Projected Pipeline (4.5x ROAS)", disclaimer: "*Based on a target 4.5x Return on Ad Spend." }
        };
      case '/google-penalty-recovery':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Forensic Update Recovery',
          title: 'Remove manual actions and recover from algorithmic update drops.',
          rotatingWords: ['reverse drops.', 'prune thin content.', 'restore index status.'],
          outcomeMessage: 'Forensic update recovery & search penalty removal',
          ctaText: 'Start recovery protocol',
          introScrollText: 'Immediate intervention for devastating traffic drops. We perform forensic audits to identify algorithmic suppression, remove manual actions, and rebuild your search trust.',
          introHeading: <>Reverse your traffic drops. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Recover your revenue.</>,
          introParagraph: "Whether you were hit by a Core Update, the Helpful Content Update (HCU), or a manual spam action, our forensic recovery protocols diagnose the exact failure points and rebuild your site's algorithmic trust.",
          introVideo1: "/videos/caveman.webm",
          introVideo2: "/videos/ark------final-----01.webm",
          bentoHeadline: <>Forensic diagnosis meets<br/>rapid recovery.</>,
          bentoDescription: 'We deploy emergency triage protocols for suppressed domains. From pruning toxic content to rebuilding E-E-A-T signals, we secure your path back to search dominance.',
          insightCategory: 'SEO',
          bentoCards: [
            { href: '/google-penalty-recovery', colSpan: 2, icon: <ShieldAlert size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'Algorithmic Diagnostics', description: 'Deep-dive audits into Core Updates and HCU suppressions to identify the exact toxic vectors.' },
            { href: '/services/seo', colSpan: 1, icon: <Search size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Manual Actions', description: 'Expert removal of spam penalties and toxic links.' },
            { href: '/services/web-design', colSpan: 1, icon: <PenTool size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Content Pruning', description: 'Architectural restructuring to purge unhelpful content.' },
            { href: '/case-studies', colSpan: 2, gradient: true, icon: <TrendingUp size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Traffic Resurrection', description: 'We have recovered millions in lost pipeline revenue for brands devastated by Google updates.' }
          ],
          showCalculator: true,
          calculatorProps: { title: "Calculate Penalty Revenue Leak", description: "Input the monthly traffic your site lost during the update. See the pipeline revenue leak.", sliderLabel: "Monthly Traffic Lost", sliderMin: 1000, sliderMax: 200000, sliderStep: 1000, conversionRate: 0.02, ltv: 500, resultLabel: "Monthly Revenue Leak", disclaimer: "*Based on 2% conversion rate and $500 LTV." }
        };
      case '/about':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > About the Agency',
          title: 'Steve Martin & Gobiya: Engineering search dominance.',
          rotatingWords: ['SEO specialists.', 'web developers.', 'growth marketers.'],
          outcomeMessage: 'Led by Steve Martin — 25+ years of digital marketing and full-stack development experience.',
          ctaText: 'View profile',
          introScrollText: 'Gobiya is a precision-engineered digital firm and growth agency specializing in advanced search mechanics, performance marketing, and digital infrastructure design.',
          introHeading: <>Stop guessing with your growth. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Start dominating with data.</>,
          introParagraph: 'Gobiya is a precision-engineered search visibility and digital solutions firm. Founded in 2012, we focus on high-stakes technical environments and data-driven revenue generation rather than deploying broad, generalist marketing tactics.',
          introVideo1: "/videos/gobiyaRace.webm",
          introVideo2: "/videos/space-girl.webm",
          bentoHeadline: <>Built on experience.<br/>Dedicated to shipping.</>,
          bentoDescription: 'Operating primarily out of our headquarters, we service mid-market to enterprise brands that require high-performance technical SEO and scalable digital revenue engines.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/about/steve-martin', colSpan: 2, icon: <Briefcase size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: '25+ Years Experience', description: 'Bridging full-stack software engineering and organic search traffic acquisition since 2000.' },
            { href: '/services/web-design', colSpan: 1, icon: <Code size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Core Dev Stack', description: 'React, Next.js, Vite, Tailwind CSS, Supabase, and custom AI chat/automation builds.' },
            { href: '/services/geo-optimization', colSpan: 1, icon: <Search size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'AI-Era SEO', description: 'Schema markup, entity optimization, and structured citations for LLMs.' },
            { href: '/about/steve-martin', colSpan: 2, gradient: true, icon: <TrendingUp size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Steve Martin Credentials', description: 'View professional experience, client projects, certifications, and background.' }
          ]
        };
      case '/case-studies':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > Case Studies',
          title: 'Proven results. Search recovery and revenue scaling.',
          rotatingWords: ['case studies.', 'growth metrics.', 'revenue wins.'],
          outcomeMessage: 'Data-backed search recovery & pipeline success metrics',
          ctaText: 'View case studies',
          introScrollText: 'Millions in recovered pipeline revenue. We provide undeniable proof of our engineering methodologies reversing algorithmic penalties and scaling inbound systems.',
          introHeading: <>Proof of concept. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Millions in revenue.</>,
          introParagraph: 'Do not just take our word for it. Review our extensive library of forensic recoveries, pipeline implementations, and massive CRO uplifts for enterprise clients.',
          introVideo1: "/videos/ark------final-----01.webm",
          introVideo2: "/videos/smilecenter-screencast.webm",
          bentoHeadline: <>Data-backed wins meet<br/>client success.</>,
          bentoDescription: 'Every case study details the exact technical failures we diagnosed, the precise architecture we implemented, and the final pipeline revenue generated.',
          insightCategory: 'Analytics',
          bentoCards: [
            { href: '/google-penalty-recovery', colSpan: 2, icon: <ShieldAlert size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'Penalty Reversals', description: 'Complete restoration of index status and traffic following devastating Google Core Updates.' },
            { href: '/services/seo', colSpan: 1, icon: <Search size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Traffic Scaling', description: '300%+ increases in high-intent organic search volume.' },
            { href: '/services/lead-generation', colSpan: 1, icon: <Target size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Pipeline Generation', description: 'Millions generated via automated B2B outbound sequences.' },
            { href: '/book', colSpan: 2, gradient: true, icon: <TrendingUp size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Become Our Next Success', description: 'Stop losing revenue to competitors. Let us architect your dominance.' }
          ]
        };
      case '/approach':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > Our Approach',
          title: 'Data-driven methodologies for search engine dominance.',
          rotatingWords: ['forensic analysis.', 'entity optimization.', 'algorithmic alignment.'],
          outcomeMessage: 'Proprietary AI strategies for algorithmic search recovery',
          ctaText: 'Discover our methods',
          introScrollText: 'We do not guess. We deploy forensic data analysis, reverse-engineer search algorithms, and architect proprietary growth assets that command market dominance.',
          introHeading: <>Eradicate guesswork. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Deploy pure data.</>,
          introParagraph: 'Our approach strips away the vanity metrics of traditional agencies. We focus entirely on structural engineering, semantic entity alignment, and mathematical revenue models.',
          introVideo1: "/videos/caveman.webm",
          introVideo2: "/videos/space-girl.webm",
          bentoHeadline: <>Algorithmic precision meets<br/>pipeline architecture.</>,
          bentoDescription: 'From our initial forensic audit to the final deployment of your automated outbound systems, our methodology is ruthlessly optimized for ROI.',
          insightCategory: 'Technical',
          bentoCards: [
            { href: '/services/seo', colSpan: 2, icon: <PenTool size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'Forensic Triage', description: 'We start by tearing down your current digital footprint to identify exactly where you are bleeding revenue.' },
            { href: '/services/geo-optimization', colSpan: 1, icon: <Network size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Entity Alignment', description: 'Structuring your brand natively for AI language models.' },
            { href: '/services/lead-generation', colSpan: 1, icon: <Target size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'System Deployment', description: 'Launching customized outbound and inbound pipelines.' },
            { href: '/about', colSpan: 2, gradient: true, icon: <TrendingUp size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Iterative Scaling', description: 'We continuously analyze data sets to widen the gap between you and your competitors.' }
          ]
        };
      case '/insights':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > Industry Insights',
          title: 'Algorithmic intelligence and tactical search analysis.',
          rotatingWords: ['algorithm updates.', 'search trends.', 'AI shifts.'],
          outcomeMessage: 'Advanced tactical intelligence on Google & AI search',
          ctaText: 'Read intelligence briefs',
          introScrollText: 'Stay ahead of the curve. Access our tactical briefs, algorithmic teardowns, and engineering insights directly from the team actively shaping search dominance.',
          introHeading: <>Tactical intelligence. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Unfiltered data.</>,
          introParagraph: 'We publish deep-dive analysis on Google Core Updates, the rise of Generative Engine Optimization, and the exact strategies we use to scale B2B pipelines.',
          introVideo1: "/videos/sc-hero-background-compressed.webm",
          introVideo2: "/videos/ark------final-----01.webm",
          bentoHeadline: <>Advanced analytics meet<br/>actionable intelligence.</>,
          bentoDescription: 'Consume the exact frameworks and strategies we utilize internally to drive millions in pipeline revenue for our partners.',
          insightCategory: 'SEO',
          bentoCards: [
            { href: '/insights', colSpan: 2, icon: <BarChart size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'Algorithm Teardowns', description: 'Forensic breakdowns of Google updates and exactly what signals are currently being rewarded.' },
            { href: '/services/geo-optimization', colSpan: 1, icon: <Network size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'AI Overviews', description: 'The evolving landscape of ChatGPT and Gemini search.' },
            { href: '/services/lead-generation', colSpan: 1, icon: <Target size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Outbound Tactics', description: 'High-converting email copy and sequencing frameworks.' },
            { href: '/book', colSpan: 2, gradient: true, icon: <Briefcase size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Apply These Insights', description: 'Want these strategies implemented for your brand? Partner with our engineering team today.' }
          ]
        };
      case '/company/careers':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > Careers',
          title: 'Join the vanguard of algorithmic search engineering.',
          rotatingWords: ['engineer growth.', 'solve penalties.', 'scale with us.'],
          outcomeMessage: 'Join our elite team of search & growth engineers',
          ctaText: 'View open roles',
          introScrollText: 'We are looking for elite systems thinkers, technical SEOs, and outbound architects. Join a team obsessed with reverse-engineering growth and dominating markets.',
          introHeading: <>Build the future. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Engineer dominance.</>,
          introParagraph: 'Gobiya is not for the faint of heart. We demand excellence, precision, and a relentless pursuit of data-backed results. If you are tired of generic agency work, welcome home.',
          introVideo1: "/videos/gobiyaRace.webm",
          introVideo2: "/videos/caveman.webm",
          bentoHeadline: <>Elite culture meets<br/>massive ambition.</>,
          bentoDescription: 'We offer remote flexibility, unparalleled technical challenges, and the opportunity to work alongside the sharpest minds in digital architecture.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/company/careers', colSpan: 2, icon: <Briefcase size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'Technical SEO Engineers', description: 'Looking for specialists capable of forensic audits, server-log analysis, and entity architecture.' },
            { href: '/company/careers', colSpan: 1, icon: <PenTool size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'React Developers', description: 'Build blazing fast, high-converting digital assets.' },
            { href: '/company/careers', colSpan: 1, icon: <Network size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Sales Architects', description: 'Design automated outbound and CRM pipelines.' },
            { href: '/about', colSpan: 2, gradient: true, icon: <TrendingUp size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Grow With Us', description: 'We invest heavily in the continuous education and algorithmic mastery of every team member.' }
          ]
        };
      case '/contact':
        return { ...defaultPageConfig,
          subtitle: 'Gobiya > Connect',
          title: 'Partner with our engineering team to scale.',
          rotatingWords: ['dominate search.', 'build pipelines.', 'outpace rivals.'],
          outcomeMessage: 'Reach out for algorithmic audits and pipeline architecture',
          ctaText: 'Message us below',
          introScrollText: 'Ready to eradicate the guesswork from your growth? Contact our engineering team today to schedule a forensic technical audit and pipeline strategy session.',
          introHeading: <>Initiate your audit. <br className="hidden sm:block" /><span className="sm:hidden"> </span>Secure your pipeline.</>,
          introParagraph: 'Fill out the form below to connect directly with our senior architecture team. We only take on partners where we can mathematically guarantee substantial ROI.',
          introVideo1: "/videos/ark------final-----01.webm",
          introVideo2: "/videos/sc-hero-background-compressed.webm",
          bentoHeadline: <>Secure your baseline meets<br/>explosive scale.</>,
          bentoDescription: 'Whether you are bleeding traffic from a Google penalty or need to scale your B2B enterprise pipeline, we have the technical infrastructure ready to deploy.',
          insightCategory: 'Strategy',
          bentoCards: [
            { href: '/book', colSpan: 2, icon: <Network size={40} className={`${accentClass} mb-6 sm:mb-10`} strokeWidth={1.5} />, title: 'Strategy Session', description: 'Direct access to our senior engineers to diagnose your current growth bottlenecks.' },
            { href: '/services/seo', colSpan: 1, icon: <Search size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Forensic Audit', description: 'Comprehensive teardown of your digital signals.' },
            { href: '/services/lead-generation', colSpan: 1, icon: <Target size={40} className="text-gray-900 mb-6 sm:mb-10" strokeWidth={1.5} />, title: 'Pipeline Review', description: 'Assessment of your current outbound capabilities.' },
            { href: '/google-penalty-recovery', colSpan: 2, gradient: true, icon: <ShieldAlert size={40} className="text-gray-900 mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />, title: 'Emergency Triage', description: 'Hit by a core update? Contact us immediately for rapid penalty removal protocols.' }
          ]
        };
      default:
        return { ...defaultPageConfig,
          subtitle: 'Gobiya Services > Growth Solutions',
          title: 'High-performance digital growth assets built for dominance.',
          rotatingWords: ['recover traffic.', 'scale sales.', 'secure dominance.'],
          outcomeMessage: 'Outcome-driven search & pipeline engineering',
          ctaText: 'Get growth audit'
        };
    }
  };
    
  const config = getPageConfig(path);
  const isServicesPath = path.startsWith('/services/');
  const isCategoryPage = ['/creativity', '/performance', '/relations'].includes(path);
  const categoryLabel = isCategoryPage ? path.replace('/', '').charAt(0).toUpperCase() + path.replace('/', '').slice(1) : '';

  const themeAccent = isServicesPath ? '#2F5D50' : '#F26522';
  const themeAccentHover = isServicesPath ? '#234A40' : '#e05a1a';
  const themeTextAccent = isServicesPath ? 'text-[#2F5D50]' : 'text-[#F26522]';
  const themeTextAccentHover = isServicesPath ? 'hover:text-[#234A40]' : 'hover:text-[#e05a1a]';
  const themeBgAccent = isServicesPath ? 'bg-[#2F5D50]' : 'bg-[#F26522]';
  const themeBgAccentHover = isServicesPath ? 'hover:bg-[#234A40]' : 'hover:bg-[#e05a1a]';
  const themeBorderAccent = isServicesPath ? 'border-[#2F5D50]' : 'border-[#F26522]';
  const themeBorderAccentHover = isServicesPath ? 'hover:border-[#234A40]' : 'hover:border-[#e05a1a]';

  return (
    <div ref={containerRef} className={`min-h-screen ${isCategoryPage ? 'bg-[#0a0a0a]' : isServicesPath ? 'bg-transparent' : 'bg-[#EFEDE5]'} text-[#15130E] relative font-sans ${isServicesPath ? 'selection:bg-[#2F5D50]' : 'selection:bg-[#F26522]'} selection:text-gray-900 page-wrapper`}>
      <SiteHeader />

      {/* HERO SECTION */}
      {isCategoryPage ? (
        <section className="relative w-full h-screen min-h-[600px] overflow-hidden cursor-default bg-black">
          {/* Fullscreen video background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
            src={config.introVideo1}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 z-10" />
          {/* Category label — bottom left */}
          <div className="absolute bottom-8 left-5 sm:left-8 lg:left-12 z-20">
            <p data-hero="1" className="text-white text-[15px] sm:text-[16px] font-light tracking-wide">
              {categoryLabel}
            </p>
          </div>
          {/* Scroll indicator — bottom right */}
          <div className="absolute bottom-8 right-5 sm:right-8 lg:right-12 z-20 flex items-center gap-2">
            <span className="text-white/60 text-[11px] tracking-[0.2em] uppercase font-light">Scroll</span>
          </div>
        </section>
      ) : (
        <section className={`${isServicesPath ? 'bg-transparent' : 'hero'} relative w-full h-[65vh] min-h-[480px] overflow-hidden flex flex-col justify-center cursor-default`}>
          {/* Shaders Background */}
          <HeroWebGLBackground />

          {/* Hero Content */}
          <div className="relative z-20 max-w-[1440px] w-full mx-auto flex flex-col justify-center px-5 sm:px-8 lg:px-12 pt-16 pb-0">
            <p data-hero="1" className={`text-[13px] sm:text-[14px] ${isServicesPath ? 'text-[#5B564C]' : 'text-[#2F5D50]'} tracking-wide mb-4 uppercase font-medium`}>
              {config.subtitle}
            </p>
            <h1 data-hero="2" className="text-[clamp(1.5rem,5.5vw,3.2rem)] sm:text-[clamp(1.8rem,4.5vw,3.8rem)] font-medium leading-[1.15] tracking-[-0.03em] text-[#15130E] max-w-[1200px]">
              {config.title.substring(0, config.title.lastIndexOf(' ')+1)}
              <RotatingText
                texts={config.rotatingWords}
                mainClassName={`inline-flex overflow-hidden ${themeTextAccent} align-text-bottom`}
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1 -mb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
            </h1>
            <p data-hero="3" className="mt-6 text-[15px] sm:text-[17px] text-[#5B564C] max-w-[800px] leading-relaxed">
              {config.outcomeMessage}
            </p>
            <div data-hero="4" className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <a
                href="/book"
                id="service-hero-cta"
                data-cta-location="service_hero"
                data-cta-text={config.ctaText}
                onClick={() => trackCTA({ cta_location: 'service_hero', cta_text: config.ctaText })}
                className={`group flex items-center ${themeBgAccent} ${themeBgAccentHover} text-gray-900 pl-5 sm:pl-6 pr-2 py-2 transition-colors duration-300`}
              >
                <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                  <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                    {config.ctaText}
                  </span>
                  <span className="text-[13px] sm:text-[14px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                    {config.ctaText}
                  </span>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white flex items-center justify-center">
                  <ArrowRight className={`w-4 h-4 ${themeTextAccent} transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45`} />
                </div>
              </a>
              <div className="flex items-center gap-3 bg-black/5 border border-black/10 hover:bg-black/10 transition-shadow duration-300 px-3 py-2 cursor-pointer">
                <RotatingAILogos />
                <span className="text-[13px] sm:text-[14px] font-medium text-gray-900">Certified Partner</span>
                <span className="text-[10px] sm:text-[11px] bg-gray-900 text-gray-900 px-1.5 sm:px-2 py-0.5 rounded">Featured</span>
              </div>
            </div>
          </div>
        </section>
      )}

      
      {/* SECTION: SCROLL REVEAL INTRO */}
      {path !== '/insights' && path !== '/contact' && path !== '/services' && path !== '/approach' && path !== '/case-studies' && (
        <section className="w-full relative" data-logo-dark>
          <SplitTextReveal text={config.introScrollText} />
        </section>
      )}

      {/* SECTION: INTRO CONTENT */}
      {path !== '/insights' && path !== '/contact' && path !== '/services' && path !== '/approach' && path !== '/case-studies' && (        <section className="bg-[#EFEDE5] text-[#15130E] pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden w-full max-w-[1440px] mx-auto border-t border-[#D3CEC0]">
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <div className={`w-6 h-6 sm:w-7 sm:h-7 ${themeBgAccent} text-gray-900 text-[11px] sm:text-[12px] font-semibold flex items-center justify-center`}>2</div>
            <div className="text-[12px] sm:text-[13px] font-medium text-[#2F5D50] border border-[#D3CEC0] px-3 sm:px-4 py-1 sm:py-1.5">Context & Methodology</div>
          </div>
          
          <div className="px-5 sm:px-8 lg:px-12">
            <h2 data-anim="up" className="text-[clamp(1.5rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-[#15130E] mb-12 sm:mb-16 lg:mb-28 max-w-4xl font-display">
              {config.introHeading}
            </h2>

            <div className="block lg:hidden">
              <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-[#5B564C] mb-6">
                {config.introParagraph}
              </p>
              <a
                href="/book"
                id="service-intro-cta-mobile"
                data-cta-location="service_intro_mobile"
                data-cta-text={config.ctaText}
                onClick={() => trackCTA({ cta_location: 'service_intro_mobile', cta_text: config.ctaText })}
                className={`group flex items-center ${themeBgAccent} ${themeBgAccentHover} text-gray-900 pl-5 pr-2 py-2 transition-colors duration-300 mb-8 inline-flex`}
              >
                <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                  <span className="text-[13px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">{config.ctaText}</span>
                  <span className="text-[13px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">{config.ctaText}</span>
                </div>
                <div className="w-8 h-8 bg-white flex items-center justify-center">
                  <ArrowRight className={`w-4 h-4 ${themeTextAccent} transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45`} />
                </div>
              </a>
              <div className="mt-4 flex items-center gap-3 bg-[#E7E4D9]/50 border border-[#D3CEC0] hover:bg-[#E7E4D9] transition-shadow duration-300 px-3 py-2 cursor-pointer max-w-fit mb-6">
                <RotatingAILogos />
                <span className="text-[13px] sm:text-[14px] font-medium text-[#15130E]">Certified Partner</span>
                <span className="text-[10px] sm:text-[11px] bg-[#15130E] text-gray-900 px-1.5 sm:px-2 py-0.5 rounded">Featured</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full">
                <ParallaxMedia type="video" src={config.introVideo1} autoPlay muted loop playsInline className="w-full sm:w-[45%] aspect-[438/346]" />
                <ParallaxMedia type="video" src={config.introVideo2} autoPlay muted loop playsInline className="w-full sm:w-[55%] aspect-[900/600]" />
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8" data-anim="up">
              <div className="self-end">
                <ParallaxMedia type="video" src={config.introVideo1} autoPlay muted loop playsInline className="w-full aspect-[438/346]" />
              </div>
              <div className="self-start flex flex-col items-start justify-start pt-2">
                <p className="text-[16px] xl:text-[18px] leading-[1.65] font-medium text-[#5B564C] mb-8 max-w-[90%]" style={{ contentVisibility: 'auto' }}>
                  {config.introParagraph}
                </p>
                <a
                  href="/book"
                  id="service-intro-cta-desktop"
                  data-cta-location="service_intro_desktop"
                  data-cta-text={config.ctaText}
                  onClick={() => trackCTA({ cta_location: 'service_intro_desktop', cta_text: config.ctaText })}
                  className={`group flex items-center ${themeBgAccent} ${themeBgAccentHover} text-gray-900 pl-6 pr-2 py-2 transition-colors duration-300`}
                >
                  <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                     <span className="text-[14px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">{config.ctaText}</span>
                     <span className="text-[14px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">{config.ctaText}</span>
                  </div>
                  <div className="w-8 h-8 bg-white flex items-center justify-center">
                    <ArrowRight className={`w-4 h-4 ${themeTextAccent} transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45`} />
                  </div>
                </a>
                <div className="mt-4 flex items-center gap-3 bg-[#E7E4D9]/50 border border-[#D3CEC0] hover:bg-[#E7E4D9] transition-shadow duration-300 px-3 py-2 cursor-pointer max-w-fit">
                  <RotatingAILogos />
                  <span className="text-[13px] sm:text-[14px] font-medium text-[#15130E]">Certified Partner</span>
                  <span className="text-[10px] sm:text-[11px] bg-[#15130E] text-gray-900 px-1.5 sm:px-2 py-0.5 rounded">Featured</span>
                </div>
              </div>
              <div className="self-end">
                <ParallaxMedia type="video" src={config.introVideo2} autoPlay muted loop playsInline className="w-full aspect-[3/2]" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BENTO CARDS SECTION */}
      {path !== '/insights' && path !== '/contact' && path !== '/services' && path !== '/approach' && path !== '/case-studies' && config.bentoHeadline && (
        <StackedBento 
          headline={config.bentoHeadline} 
          description={config.bentoDescription} 
          cards={config.bentoCards} 
        />
      )}

      {/* DETAILED METHODOLOGY FOR THE APPROACH PATH */}
      {path === '/approach' && (
        <section className="bg-gray-50 text-gray-900 py-20 sm:py-32 border-t border-black/10 relative z-20" data-logo-dark>
          <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
              
              {/* Sticky Sidebar Navigation */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 flex flex-col gap-8">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Our Methodology</span>
                    <h3 className="text-xl font-bold text-gray-900">Search Blueprint</h3>
                  </div>
                  
                  <nav className="flex flex-col border-l border-black/10 pl-4 py-2">
                    {sections.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => handleScrollToSection(sec.id)}
                        className={`text-left text-[14px] py-2 transition-all duration-300 relative border-l-2 -ml-[17px] pl-4 cursor-pointer ${
                          activeSection === sec.id
                            ? 'text-[#F26522] border-[#F26522] font-semibold'
                            : 'text-gray-400 border-transparent hover:text-gray-900 hover:border-gray-600'
                        }`}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </nav>

                  <div className="bg-black/5 border border-black/10 p-6 rounded-xl">
                    <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-900 mb-2">Target Metrics</h4>
                    <ul className="flex flex-col gap-3">
                      <li className="flex justify-between text-[13px] text-gray-400">
                        <span>Word count baseline:</span>
                        <span className="font-semibold text-gray-900">2,200+</span>
                      </li>
                      <li className="flex justify-between text-[13px] text-gray-400">
                        <span>LLM Citation Rate:</span>
                        <span className="font-semibold text-gray-900">90%+</span>
                      </li>
                      <li className="flex justify-between text-[13px] text-gray-400">
                        <span>Rendering Latency:</span>
                        <span className="font-semibold text-gray-900">&lt;100ms</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>

              {/* Main Copy Area */}
              <div className="flex flex-col gap-24 max-w-4xl">
                
                {/* Intro Callout */}
                <div className="border-l-4 border-[#F26522] pl-6 py-2">
                  <p className="text-[clamp(1.1rem,2vw,1.4rem)] text-gray-300 font-medium leading-relaxed">
                    Search engine optimization is no longer a marketing checklist. It is a technical engineering discipline. 
                    Below is Gobiya's detailed operating model for algorithmic dominance, entity-based indexing, 
                    and closed-loop B2B pipeline conversion.
                  </p>
                </div>

                {/* Section 1: Algorithmic Shift */}
                <article id="algorithmic-shift" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-[#F26522] text-gray-900 flex items-center justify-center font-bold text-[14px]">01</div>
                    <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">The Paradigm Shift</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-8">
                    How does entity-based search work? (Keywords are strings, Google indexes things)
                  </h2>
                  <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-6">
                    <p>
                      In the early eras of organic search engine optimization, websites were indexed based on direct string-matching algorithms. If a page was designed to rank for a query like "B2B sales pipeline integration tools," the primary operational objective was to verify the presence of that phrase in meta titles, headings, and copy at a specific keyword density. Today, Google's Helpful Content System, core quality classifiers, and neural matching algorithms operate on a fundamentally different paradigm. Search engines no longer index strings; they index entities.
                    </p>
                    <p>
                      An entity is a distinct, well-defined concept, organization, person, place, or thing that is cataloged in Google's Knowledge Graph, often represented by a unique machine-readable Knowledge Graph ID (KGMID). When a user inputs a query, the search engine does not search for pages containing those letters. Instead, it decomposes the prompt into recognized entities, resolves the user's implicit and explicit intent, and queries its graph database. It looks for pages that establish a high-salience connection to the requested entity node.
                    </p>
                    <p>
                      Under this framework, Gobiya's approach is designed around semantic triples (Subject-Predicate-Object). We map out your business entities, service offerings, and target categories to ensure they are represented in the precise format search crawlers expect. Rather than writing arbitrary articles targeting high search volume keywords, we construct content structures that minimize semantic distance to verified authority nodes.
                    </p>
                    <p>
                      This entity-based methodology is also the absolute foundation of Generative Engine Optimization (GEO). Modern Large Language Models (LLMs) such as OpenAI's GPT-4, Anthropic's Claude 3.5, and Google's Gemini do not navigate page authority vectors like traditional search engines. They map out semantic spaces. To ensure your brand is cited and surfaced inside these conversational answers, you must define your entity connections explicitly.
                    </p>
                  </div>
                </article>

                {/* Section 2: Topical Authority */}
                <article id="topical-authority" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-[#F26522] text-gray-900 flex items-center justify-center font-bold text-[14px]">02</div>
                    <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Topical Authority</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-8">
                    Why does topical authority matter for B2B search? (Topological Architecture & Schema Engineering)
                  </h2>
                  <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-6">
                    <p>
                      Search dominance requires topical completeness. You cannot rank high-value transactional landing pages if your site lacks the foundational informational resources that prove expertise. For example, ranking a service page for "B2B sales development pipeline setup" requires an exhaustive topological content map covering peripheral queries: outbound pipeline metrics, lead response times, cold email sequence structures, CRM integration flows, and team scaling guides.
                    </p>
                    <p>
                      Gobiya maps out your market sector as an interconnected semantic graph. We structure your content using strict pillar-and-cluster hubs that flow PageRank and semantic signals smoothly from high-volume informational nodes down to high-intent transactional pages. By carefully mapping intent profiles, we eliminate internal keyword cannibalization, ensuring each URL targets a unique, isolated search intent.
                    </p>
                    <p>
                      We explicitly define these relationships for search bots using advanced, nested JSON-LD structured schema. Rather than basic schema templates, we build customized schema graphs connecting your organization, services, authors, and target markets. We use properties like `about`, `mentions`, and `knowsAbout` pointing directly to DBpedia and Wikipedia entity records. This removes the need for search bots to guess page topics, accelerating indexation and boosting entity authority rankings.
                    </p>

                    {/* Interactive Schema Visualizer component */}
                    <div className="mt-8 bg-gray-900 text-gray-150 rounded-xl overflow-hidden shadow-lg border border-gray-800">
                      <div className="bg-gray-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h4 className="text-[13px] font-bold uppercase tracking-wider text-gray-900">Interactive Schema Blueprint</h4>
                          <p className="text-[12px] text-gray-400">Select entity type to view nested JSON-LD structure</p>
                        </div>
                        <div className="flex gap-2">
                          {(['business', 'website', 'article'] as const).map((type) => (
                            <button
                              key={type}
                              onClick={() => setActiveSchema(type)}
                              className={`text-[12px] px-3 py-1 rounded transition-colors cursor-pointer ${
                                activeSchema === type
                                  ? 'bg-[#F26522] text-gray-900 font-semibold'
                                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                              }`}
                            >
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 font-mono text-[13px] overflow-x-auto relative max-h-[300px]">
                        <button
                          onClick={() => copyToClipboard(JSON.stringify(schemas[activeSchema], null, 2))}
                          className="absolute right-4 top-4 bg-gray-800 hover:bg-gray-700 text-gray-300 text-[11px] px-3 py-1.5 rounded border border-gray-700 transition-colors cursor-pointer"
                        >
                          {copiedSchema ? 'Copied!' : 'Copy Code'}
                        </button>
                        <pre className="text-green-400">{JSON.stringify(schemas[activeSchema], null, 2)}</pre>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Section 3: GEO & LLM Citations */}
                <article id="geo-optimization-llm" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-[#F26522] text-gray-900 flex items-center justify-center font-bold text-[14px]">03</div>
                    <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Generative Optimization</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-8">
                    How do I optimize my business for ChatGPT, Claude, and Perplexity? (Generative Engine Optimization & LLM Visibility)
                  </h2>
                  <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-6">
                    <p>
                      The search environment is undergoing its most significant transition in twenty years. Users are shifting from traditional search queries to dynamic conversational prompts answered directly by LLMs like ChatGPT, Claude, Perplexity, and Gemini. If your brand is not recognized by these models, you are missing out on the primary channel where B2B buyers form their shortlists.
                    </p>
                    <p>
                      Generative Engine Optimization (GEO) is the practice of ensuring your brand entities are referenced and recommended as the definitive answer within generative AI responses. Traditional search engines rank pages based on backlinks and keyword placement. LLM retrieval pipelines and Retrieval-Augmented Generation (RAG) models index pages based on authority overlap, semantic alignment, and the volume of factual mentions across trusted databases.
                    </p>
                    <p>
                      Our GEO strategy builds semantic citation loops. We map out the publications, datasets, trade journals, and directories that LLM builders use to pre-train and fine-tune their models. We then execute targeted PR campaigns to place your brand name, data, and technical definitions inside these trusted sources.
                    </p>
                    <p>
                      We also format your on-site content to match the natural extraction habits of LLMs. This involves structuring page data into clear summaries, tabular formats, and direct Q&A blocks that crawlers can easily parse. When an AI agent scans your page, it finds structured, quote-ready statements that translate directly into citations.
                    </p>
                  </div>
                </article>

                {/* Section 4: Pipeline Orchestration */}
                <article id="pipeline-orchestration" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-[#F26522] text-gray-900 flex items-center justify-center font-bold text-[14px]">04</div>
                    <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Revenue Pipelines</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-8">
                    How do I convert organic traffic into revenue? (Pipeline Integration & Conversion Architecture)
                  </h2>
                  <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-6">
                    <p>
                      Organic search traffic is ultimately a vanity metric unless it converts into pipeline value. Traditional agency models celebrate traffic growth even if it fails to generate qualified revenue. Gobiya operates under a pipeline-first framework. We connect search traffic to automated sales development systems, turning your website into an active, high-yield pipeline generator.
                    </p>
                    <p>
                      We build our web applications with custom React and Vite architectures. Standard templates and heavy page-builders are riddled with code bloat and database overhead that damage conversion rates. By delivering sub-second load times, we satisfy Core Web Vitals and capture high-intent users who would otherwise bounce due to lag.
                    </p>
                    <p>
                      We integrate anonymous visitor de-anonymization technologies directly into the page layer. By resolving visiting IP addresses to specific corporate networks in real time, we log which organizations are researching your products and what pages they read. This intent data is fed directly into your CRM (Salesforce or HubSpot) and triggers automated, timing-optimized sales sequences targeting matching buyers at those accounts.
                    </p>
                    <p>
                      We close the feedback loop with advanced multi-touch attribution. We trace every B2B pipeline opportunity back to the specific content hubs and entity nodes that initially captured the buyer's attention. This ensures that every investment in our search engineering protocol is directly justified by measurable closed-won revenue metrics.
                    </p>

                    {/* Metrics Comparison Table */}
                    <div className="mt-12 overflow-x-auto border border-black/10 rounded-xl">
                      <table className="w-full text-[14px] text-left">
                        <thead>
                          <tr className="bg-black/5 border-b border-black/10 text-gray-900 font-semibold">
                            <th className="p-4 sm:p-5">Performance Vector</th>
                            <th className="p-4 sm:p-5 text-gray-300">Traditional Agency SEO</th>
                            <th className="p-4 sm:p-5 text-[#F26522]">Gobiya Pipeline Engineering</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-gray-400">
                          <tr>
                            <td className="p-4 sm:p-5 font-medium text-gray-900">Key Metric</td>
                            <td className="p-4 sm:p-5">Keyword ranking positions & general traffic volume</td>
                            <td className="p-4 sm:p-5 text-gray-900 font-medium">Qualified B2B meetings & attributed pipeline</td>
                          </tr>
                          <tr>
                            <td className="p-4 sm:p-5 font-medium text-gray-900">Content Model</td>
                            <td className="p-4 sm:p-5">High-volume, keyword-targeted articles (thin content)</td>
                            <td className="p-4 sm:p-5 text-gray-900 font-medium">Entity-mapped, comprehensive topical hubs</td>
                          </tr>
                          <tr>
                            <td className="p-4 sm:p-5 font-medium text-gray-900">AI Readiness</td>
                            <td className="p-4 sm:p-5">None (optimized purely for legacy Google search bots)</td>
                            <td className="p-4 sm:p-5 text-gray-900 font-medium">Generative Engine Optimization (GEO) citation structures</td>
                          </tr>
                          <tr>
                            <td className="p-4 sm:p-5 font-medium text-gray-900">Lead Sourcing</td>
                            <td className="p-4 sm:p-5">Passive contact forms with zero intent tracking</td>
                            <td className="p-4 sm:p-5 text-gray-900 font-medium">Reverse-IP deanonymization & CRM integrations</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </article>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* REAL CASE STUDIES FOR SUCCESS STORIES PATH */}
      {path === '/case-studies' && (
        <section className="bg-gray-50 text-gray-900 py-20 sm:py-32 border-t border-black/10 relative z-20" data-logo-dark>
          <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">

              {/* Sticky Sidebar Navigation */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 flex flex-col gap-8">
                  <div>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Our Case Studies</span>
                    <h3 className="text-xl font-bold text-gray-900">Proven Results</h3>
                  </div>

                  <nav className="flex flex-col border-l border-black/10 pl-4 py-2">
                    {successSections.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => handleScrollToSection(sec.id)}
                        className={`text-left text-[14px] py-2 transition-all duration-300 relative border-l-2 -ml-[17px] pl-4 cursor-pointer ${
                          activeSuccessSection === sec.id
                            ? 'text-[#F26522] border-[#F26522] font-semibold'
                            : 'text-gray-400 border-transparent hover:text-gray-900 hover:border-gray-600'
                        }`}
                      >
                        {sec.label}
                      </button>
                    ))}
                  </nav>

                  <div className="bg-black/5 border border-black/10 p-6 rounded-xl">
                    <h4 className="text-[12px] font-bold uppercase tracking-wider text-gray-900 mb-4">Client Results</h4>
                    <ul className="flex flex-col gap-3">
                      <li className="flex justify-between text-[13px] text-gray-400">
                        <span>Inquiries:</span>
                        <span className="font-semibold text-[#F26522]">5x</span>
                      </li>
                      <li className="flex justify-between text-[13px] text-gray-400">
                        <span>Bookings:</span>
                        <span className="font-semibold text-[#F26522]">3x</span>
                      </li>
                      <li className="flex justify-between text-[13px] text-gray-400">
                        <span>Impressions:</span>
                        <span className="font-semibold text-gray-900">75K → 213K</span>
                      </li>
                      <li className="flex justify-between text-[13px] text-gray-400">
                        <span>Walk-ins:</span>
                        <span className="font-semibold text-gray-900">+30%</span>
                      </li>
                      <li className="flex justify-between text-[13px] text-gray-400">
                        <span>Core Web Vitals:</span>
                        <span className="font-semibold text-gray-900">100/100</span>
                      </li>
                    </ul>
                  </div>

                  <a
                    href="/book"
                    className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-gray-900 pl-5 pr-2 py-2.5 transition-colors duration-300 self-start"
                  >
                    <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                      <span className="text-[13px] font-medium leading-[20px] transition-transform duration-500 group-hover:-translate-y-full">Get started</span>
                      <span className="text-[13px] font-medium leading-[20px] absolute top-full transition-transform duration-500 group-hover:-translate-y-full">Get started</span>
                    </div>
                    <div className="w-7 h-7 bg-white flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 group-hover:-rotate-45" />
                    </div>
                  </a>
                </div>
              </aside>

              {/* Main Copy Area */}
              <div className="flex flex-col gap-24 max-w-4xl">

                {/* Intro Callout */}
                <div className="border-l-4 border-[#F26522] pl-6 py-2">
                  <p className="text-[clamp(1.1rem,2vw,1.4rem)] text-gray-300 font-medium leading-relaxed">
                    Real clients. Real numbers. Here is exactly what we built, why we built it, and what moved as a result.
                  </p>
                </div>

                {/* ── CASE STUDY 1: SmileCenter ── */}
                <article id="recovery-case" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-[#F26522] text-gray-900 flex items-center justify-center font-bold text-[14px]">01</div>
                    <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Multi-Location SEO &amp; Conversion Architecture</span>
                  </div>

                  {/* Headline + CTA row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                      SmileCenter Dentistry — 5x Patient Inquiries
                    </h2>
                    <a
                      href="/case-studies/smile-center-dentistry"
                      className="group flex items-center gap-2 text-[#F26522] hover:text-gray-900 border border-[#F26522]/40 hover:border-black/20 px-4 py-2 text-[13px] font-semibold transition-colors flex-shrink-0"
                    >
                      Full case study <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:-rotate-45" />
                    </a>
                  </div>

                  {/* Metrics strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {[
                      { value: '5x', label: 'Form completions' },
                      { value: '5x', label: 'Phone calls' },
                      { value: '2.8x', label: 'Search impressions' },
                      { value: '+44%', label: 'Organic clicks' },
                    ].map((m) => (
                      <div key={m.label} className="bg-black/5 border border-black/10 p-4">
                        <div className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-[#F26522] font-display leading-none mb-1">{m.value}</div>
                        <div className="text-[11px] text-gray-400 uppercase tracking-wider">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-5">
                    <p>
                      SmileCenter runs dental offices across multiple markets. Its previous website was a single, slow, generic site that funneled every visitor into the same place, with no clear path to the nearest office and no friction-free way to book or call.
                    </p>
                    <p>
                      <strong className="text-gray-900">What we built:</strong> We rebuilt the site on a custom React/Vite foundation and gave every office its own dedicated, individually optimized page with local schema markup, consistent NAP data, and location-specific content. We added prominent click-to-call on mobile, simplified booking forms, and location-aware CTAs that route a visitor to their nearest office in the fewest possible steps. We also integrated Yelp and Google Business signals to reinforce each location in map and general search results.
                    </p>
                    <p>
                      <strong className="text-gray-900">The result:</strong> Form completions and inbound phone calls each grew 5x — not from a flood of new traffic, but from the same visitors converting far more effectively. Total search impressions nearly tripled from 75.3K to 213K. SmileCenter now holds top-5 positions for branded searches across all its markets.
                    </p>

                    {/* Local rankings table */}
                    <div className="border border-black/10 overflow-hidden mt-2">
                      <div className="bg-black/5 px-5 py-3 grid grid-cols-[1fr_100px] text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                        <span>Search Query</span>
                        <span className="text-right">Position</span>
                      </div>
                      {[
                        { q: 'smile center dentist', pos: '#2' },
                        { q: 'smile center dental care', pos: 'Top 5' },
                        { q: 'smile center family dentistry', pos: 'Top 5' },
                        { q: 'smile center locations', pos: 'Top 5' },
                        { q: 'smile center booking', pos: 'Top 5' },
                      ].map((r) => (
                        <div key={r.q} className="px-5 py-3 grid grid-cols-[1fr_100px] border-t border-white/[0.06] items-center">
                          <span className="text-[13px] text-gray-300 font-mono">"{r.q}"</span>
                          <span className="text-right text-[13px] font-bold text-[#F26522]">{r.pos}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-gray-500 text-[13px]">Period: last 3 months vs. prior 3 months. Stack: React / Vite, location pages, Yelp + Google Business integration.</p>
                  </div>
                </article>

                {/* ── CASE STUDY 2: American Livescan ── */}
                <article id="pipeline-case" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded bg-[#F26522] text-gray-900 flex items-center justify-center font-bold text-[14px]">02</div>
                    <span className="text-[12px] font-semibold text-[#F26522] uppercase tracking-wider">Site Rebuild · Local SEO · Google Business Profile</span>
                  </div>

                  {/* Headline + CTA row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                      American Livescan — 3x Bookings &amp; Calls After Legacy Site Migration
                    </h2>
                    <a
                      href="/case-studies/american-livescan"
                      className="group flex items-center gap-2 text-[#F26522] hover:text-gray-900 border border-[#F26522]/40 hover:border-black/20 px-4 py-2 text-[13px] font-semibold transition-colors flex-shrink-0"
                    >
                      Full case study <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:-rotate-45" />
                    </a>
                  </div>

                  {/* Metrics strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {[
                      { value: '3x', label: 'Online bookings' },
                      { value: '3x', label: 'Phone calls' },
                      { value: '+30%', label: 'Walk-in traffic' },
                      { value: '+47%', label: 'Organic clicks' },
                    ].map((m) => (
                      <div key={m.label} className="bg-black/5 border border-black/10 p-4">
                        <div className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-[#F26522] font-display leading-none mb-1">{m.value}</div>
                        <div className="text-[11px] text-gray-400 uppercase tracking-wider">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="text-gray-400 text-[15px] sm:text-[16px] leading-[1.75] flex flex-col gap-5">
                    <p>
                      American Livescan is a high-volume Live Scan fingerprinting and background-check provider, serving walk-in customers, online bookings, and mobile appointments. The business was running on an aging site built on legacy <code className="bg-black/10 text-gray-900 px-1.5 py-0.5 text-[13px]">.htm/.html</code> pages — slow, hard to update, and architecturally incapable of competing for the "near me" searches that drive a local, walk-in service.
                    </p>
                    <p>
                      <strong className="text-gray-900">What we built:</strong> We replaced the legacy site with a modern, clean-URL architecture — migrating carefully so every page's search equity transferred instead of being lost. We built dedicated pages for each service line (Live Scan fingerprinting, mobile fingerprinting, passport photos, background checks), optimized the Google Business Profile for map-pack visibility, and launched a content engine targeting high-intent queries: California record-sealing under SB 731, cannabis screening law, REAL ID, passport-photo rejections.
                    </p>
                    <p>
                      <strong className="text-gray-900">The result:</strong> Walk-in traffic grew 30%, online appointments and phone calls each grew 3x. The passport-photos page went from position 55.8 to page one (position 10) — from 1 click to 79 — opening a service line that wasn't competing before. "Walk in live scan near me" went from no visibility to page one (~position 7). American Livescan now holds #1–2 for brand searches with a 15%+ click-through rate.
                    </p>

                    {/* Near me rankings table */}
                    <div className="border border-black/10 overflow-hidden mt-2">
                      <div className="bg-black/5 px-5 py-3 grid grid-cols-[1fr_110px_110px] text-[11px] uppercase tracking-widest text-gray-500 font-semibold">
                        <span>Query</span>
                        <span className="text-center">Before</span>
                        <span className="text-right text-[#F26522]">After</span>
                      </div>
                      {[
                        { q: 'walk in live scan near me', before: 'No visibility', after: 'Page 1 (~Pos. 7)' },
                        { q: 'livescan near me', before: '3 clicks', after: '16 clicks (+3x CTR)' },
                        { q: 'passport photos', before: 'Pos. 55.8', after: 'Pos. 10 (Page 1)' },
                        { q: 'Brand searches', before: '—', after: '#1–2, 15%+ CTR' },
                      ].map((r) => (
                        <div key={r.q} className="px-5 py-3 grid grid-cols-[1fr_110px_110px] border-t border-white/[0.06] items-center">
                          <span className="text-[13px] text-gray-300 font-mono pr-3">"{r.q}"</span>
                          <span className="text-center text-[13px] text-gray-500">{r.before}</span>
                          <span className="text-right text-[13px] font-bold text-[#F26522]">{r.after}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-gray-500 text-[13px]">Period: last 6 months vs. prior 6 months. Engagement: website redesign, GMB optimization, local SEO, content engine.</p>
                  </div>
                </article>

                {/* ── Bottom CTA ── */}
                <div className="border-t border-black/10 pt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div>
                    <p className="text-[13px] text-gray-400 uppercase tracking-wider mb-2">Ready to be next?</p>
                    <p className="text-lg font-medium text-gray-900">Let's build your case study.</p>
                  </div>
                  <a
                    href="/book"
                    className="group flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-gray-900 pl-5 pr-2 py-2 transition-colors duration-300"
                  >
                    <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
                      <span className="text-[13px] font-medium leading-[20px] transition-transform duration-500 group-hover:-translate-y-full">Start your audit</span>
                      <span className="text-[13px] font-medium leading-[20px] absolute top-full transition-transform duration-500 group-hover:-translate-y-full">Start your audit</span>
                    </div>
                    <div className="w-8 h-8 bg-white flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 group-hover:-rotate-45" />
                    </div>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* SIMPLE SERVICES SHOWCASE FOR CONSOLIDATED PATH */}
      {path === '/services' && (
        <section className="bg-gray-50 text-gray-900 py-16 sm:py-24 border-t border-black/10 relative z-20" data-logo-dark>
          <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12">
            <h2 data-anim="up" className="text-2xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-12">Our Specialized Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-anim="stagger">
              {[
                {
                  id: 'seo',
                  icon: <Search className="text-[#F26522] w-8 h-8" />,
                  title: 'Search Engine Optimization',
                  description: 'Rebuild organic signals and reclaim search engine visibility. We map out topical authority structures and execute forensic technical audits built to win high-intent organic traffic.',
                  deliverables: ['Topical Authority Architectures', 'Algorithmic Search Audits', 'EEAT Signal Optimization']
                },
                {
                  id: 'lead-generation',
                  icon: <Network className="text-[#F26522] w-8 h-8" />,
                  title: 'B2B Pipeline Architecture',
                  description: 'Construct automated sales systems driven by real-time intent signals. We design and launch cold outreach and database routing to consistently book qualified meetings.',
                  deliverables: ['Automated Cold Outreach', 'Intent Signal Tracking', 'CRM Routing & Attribution']
                },
                {
                  id: 'geo-optimization',
                  icon: <Search className="text-[#F26522] w-8 h-8" />,
                  title: 'Generative Engine Optimization (GEO)',
                  description: 'Position your brand to be cited and recommended natively inside generative AI engines. We align your entities so ChatGPT, Claude, and Google AI Overviews reference you directly.',
                  deliverables: ['AI Citation & Reference Building', 'Semantic PR Strategies', 'Entity Graph Integration']
                },
                {
                  id: 'penalty-recovery',
                  icon: <ShieldAlert className="text-[#F26522] w-8 h-8" />,
                  title: 'Google Penalty Recovery',
                  description: 'Emergency triage and recovery protocols for domains hit by Core Updates, Helpful Content Updates, or manual spam actions. We diagnose drops and restore index standing.',
                  deliverables: ['Forensic Update Audit', 'Content Pruning & Restructuring', 'Algorithmic Trust Restorations']
                },
                {
                  id: 'web-design',
                  icon: <Code className="text-[#F26522] w-8 h-8" />,
                  title: 'Website Design & Development',
                  description: 'Custom React, Next.js & Vite landing pages, web applications, and interactive platforms built from scratch with zero bloat, sub-second speed, and conversion architecture.',
                  deliverables: ['Custom Apps & Mobile Platforms', 'Native CRMs & API Integrations', 'Crypto, Web3 & Smart Contracts', 'AI Video Systems & Automations']
                },
                {
                  id: 'advertising',
                  icon: <TrendingUp className="text-[#F26522] w-8 h-8" />,
                  title: 'ROAS-Driven PPC Advertising',
                  description: 'Precision-targeted paid search and paid social ad pipelines. We maximize return on ad spend (ROAS) and lower customer acquisition costs across Google, Microsoft, and Meta.',
                  deliverables: ['Intent-Based Search Ads', 'LinkedIn B2B Lead Pipelines', 'A/B Testing & Funnel Management']
                }
              ].map((service) => (
                <div key={service.id} id={service.id} data-anim-child className="bg-black/5 border border-black/10 p-8 rounded-2xl flex flex-col justify-between hover:border-black/20 transition-all duration-300 scroll-mt-24">
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      {service.icon}
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Service Capabilities</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-400 text-[14px] leading-relaxed mb-6">{service.description}</p>
                  </div>
                  <div>
                    <h4 className="text-[12px] font-semibold text-gray-900 uppercase tracking-wider mb-3">Key Deliverables</h4>
                    <ul className="flex flex-col gap-2 mb-6">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[13px] text-gray-400">
                          <span className={`w-1.5 h-1.5 rounded-full ${themeBgAccent}`} />

                          {item}
                        </li>
                      ))}
                    </ul>
                    <a href="/book" className={`text-[13px] font-semibold ${themeTextAccent} ${themeTextAccentHover} flex items-center gap-1 transition-colors`}>
                      Inquire about this service <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* SECTION: CASE STUDIES PINNED */}
      {path !== '/insights' && path !== '/contact' && path !== '/services' && (
        <div className="relative">
          
        </div>
      )}

      {/* SECTION: SATISFIED CLIENTS */}
      {path !== '/insights' && path !== '/contact' && path !== '/services' && (
        <div className="relative">
          <SatisfiedClients />
        </div>
      )}

      {/* SECTION: ROI CALCULATOR */}
      {path !== '/insights' && path !== '/contact' && (
        <div data-logo-dark className="relative">
          {config.showCalculator !== false && <RoiCalculator {...(config.calculatorProps || {})} />}
        </div>
      )}

      {/* CONTACT SECTION (Only rendered on /contact route) */}
      {path === '/contact' && (
        <section className="relative w-full bg-gray-50 text-gray-900 py-20 sm:py-32 px-5 sm:px-8 lg:px-12 flex flex-col items-center">
          <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Contact Info */}
            <div className="flex flex-col justify-start">
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight mb-8 text-gray-900">Let's build your pipeline.</h2>
              <p className="text-gray-400 text-[15px] sm:text-[16px] leading-relaxed max-w-md mb-12">
                Whether you need a full algorithmic recovery audit or a predictable B2B sales pipeline, our engineering team is ready to scale your growth.
              </p>
              
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Location</h3>
                  <address className="not-italic text-[16px] sm:text-[18px] font-medium leading-relaxed text-gray-300">
                    3580 Wilshire Blvd, Ste 132<br/>
                    Los Angeles, CA 90010<br/>
                    United States
                  </address>
                </div>
                
                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Direct Line</h3>
                  <a href="tel:+13237441338" className="text-[16px] sm:text-[18px] font-medium text-gray-300 hover:text-[#F26522] transition-colors">
                    (323) 744-1338
                  </a>
                </div>
                
                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-2">Email</h3>
                  <a href="mailto:hello@gobiya.com" className="text-[16px] sm:text-[18px] font-medium text-gray-300 hover:text-[#F26522] transition-colors">
                    hello@gobiya.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="w-full bg-black/5 p-8 sm:p-12 rounded-2xl shadow-sm border border-black/10">
              <form 
                className="flex flex-col gap-6" 
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
                  
                  try {
                    if (submitBtn) {
                      submitBtn.disabled = true;
                      submitBtn.textContent = 'Sending...';
                    }
                    
                    const formData = new FormData(form);
                    const selectedServiceNames = contactServices
                      .map(s => {
                        if (s === 'geo') return 'GEO / AI Overview Citation';
                        if (s === 'seo') return 'Forensic SEO & Traffic Recovery';
                        if (s === 'b2b') return 'B2B Pipeline & Outbound Automation';
                        if (s === 'dev') return 'Bespoke React/Next.js Engineering';
                        return s;
                      })
                      .join(', ');

                    const response = await fetch('/api/contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        name: `${formData.get('firstName')} ${formData.get('lastName')}`,
                        email: formData.get('email'),
                        company: formData.get('company'),
                        phone: '',
                        website: formData.get('website'),
                        service: contactServices || 'Service Subpage',
                        message: `[Selected Services: ${selectedServiceNames || 'None'}] -- ${formData.get('message')}`
                      })
                    });
                    const resData = await response.json();
                    if (!resData.success) throw new Error(resData.error || 'Failed to submit form');
                    
                    // Route to thank you page
                    window.location.href = '/thank-you';
                  } catch (err) {
                    console.error('Failed to submit form:', err);
                    alert('There was an error sending your message. Please try again or email us directly.');
                    if (submitBtn) {
                      submitBtn.disabled = false;
                      submitBtn.textContent = 'Submit Request';
                    }
                  }
                }}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col flex-1 gap-2">
                    <label htmlFor="firstName" className="text-[13px] font-medium text-gray-400">First Name</label>
                    <input type="text" name="firstName" id="firstName" required className="w-full bg-black/5 border border-black/10 focus:border-[#F26522] focus:bg-black/10 text-gray-900 rounded p-4 py-3 outline-none transition-all text-[14px]" placeholder="Jane" />
                  </div>
                  <div className="flex flex-col flex-1 gap-2">
                    <label htmlFor="lastName" className="text-[13px] font-medium text-gray-400">Last Name</label>
                    <input type="text" name="lastName" id="lastName" required className="w-full bg-black/5 border border-black/10 focus:border-[#F26522] focus:bg-black/10 text-gray-900 rounded p-4 py-3 outline-none transition-all text-[14px]" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[13px] font-medium text-gray-400">Work Email</label>
                  <input type="email" name="email" id="email" required className="w-full bg-black/5 border border-black/10 focus:border-[#F26522] focus:bg-black/10 text-gray-900 rounded p-4 py-3 outline-none transition-all text-[14px]" placeholder="jane@company.com" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-[13px] font-medium text-gray-400">Company Name</label>
                  <input type="text" name="company" id="company" className="w-full bg-black/5 border border-black/10 focus:border-[#F26522] focus:bg-black/10 text-gray-900 rounded p-4 py-3 outline-none transition-all text-[14px]" placeholder="Acme Corp" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="website" className="text-[13px] font-medium text-gray-400">Website Domain</label>
                  <input 
                    type="text" 
                    name="website" 
                    id="website" 
                    required 
                    value={contactDomain}
                    onChange={(e) => setContactDomain(e.target.value)}
                    className="w-full bg-black/5 border border-black/10 focus:border-[#F26522] focus:bg-black/10 text-gray-900 rounded p-4 py-3 outline-none transition-all text-[14px]" 
                    placeholder="yourcompany.com" 
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[13px] font-medium text-gray-400">Services of Interest</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'geo', label: 'GEO / AI Overview Citation' },
                      { id: 'seo', label: 'Forensic SEO & Traffic Recovery' },
                      { id: 'b2b', label: 'B2B Pipeline & Outbound' },
                      { id: 'dev', label: 'Bespoke React/Next.js Engineering' }
                    ].map((service) => {
                      const isChecked = contactServices.includes(service.id);
                      return (
                        <div 
                          key={service.id} 
                          onClick={() => {
                            setContactServices(prev =>
                              prev.includes(service.id) 
                                ? prev.filter(s => s !== service.id) 
                                : [...prev, service.id]
                            );
                          }}
                          className={`flex items-center justify-between p-3 rounded border transition-all duration-300 cursor-pointer ${
                            isChecked 
                              ? 'bg-[#F26522]/10 border-[#F26522] text-gray-900' 
                              : 'bg-black/5 border-black/10 text-gray-300 hover:bg-black/10 hover:border-black/20'
                          }`}
                        >
                          <span className="text-[13px] font-medium">{service.label}</span>
                          <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-300 ${
                            isChecked 
                              ? 'bg-[#F26522] border-[#F26522] text-gray-900' 
                              : 'border-white/30 text-transparent'
                          }`}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[13px] font-medium text-gray-400">How can we help?</label>
                  <textarea name="message" id="message" required rows={4} className="w-full bg-black/5 border border-black/10 focus:border-[#F26522] focus:bg-black/10 text-gray-900 rounded p-4 py-3 outline-none transition-all text-[14px] resize-none" placeholder="Tell us about your goals..."></textarea>
                </div>

                <button type="submit" className={`mt-4 ${themeBgAccent} ${themeBgAccentHover} text-gray-900 py-4 px-6 rounded font-semibold tracking-wide uppercase transition-colors duration-300 w-full sm:w-auto self-start disabled:opacity-70 disabled:cursor-not-allowed`}>
                  Submit Request
                </button>
              </form>
            </div>

          </div>
        </section>
      )}

      {/* SECTION: LATEST INSIGHTS */}
      {(isServicesPath || path === '/google-penalty-recovery') && (
        <div data-logo-dark className="relative">
          <InsightsSlider filterCategory={config.insightCategory} limit={3} currentPath={path} />
        </div>
      )}

      {/* ── FOOTER ── */}
      <SiteFooter />

    </div>
  );
};
