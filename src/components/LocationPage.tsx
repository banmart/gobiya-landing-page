import React, { useEffect, useState } from 'react';
import { ArrowRight, Search, Activity, Trophy, ChevronRight, Target, Zap, MapPin, Phone, Star, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './Header';
import Footer from './Footer';
import InsightsSlider from './InsightsSlider';

gsap.registerPlugin(ScrollTrigger);

interface LocationData {
  city: string;
  county: string;
  state: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subHeadline: string;
  heroImage: string;
  population: string;
  businessCount: string;
  targetIndustries: string[];
  stats: { value: string; label: string; text: string }[];
  approachTitle: string;
  approachSubtitle: string;
  approach: { icon: any; title: string; desc: string }[];
  valueCards: { title: string; text: string; highlight?: boolean }[];
  executionTitle: string;
  executionSteps: { title: string; content: string }[];
  caseStudy: { headline: string; description: string; tag: string; ctaText: string };
  faqs: { question: string; answer: string }[];
  nearbyAreas: string[];
  ctaText: string;
}

const LOCATION_DATA: Record<string, LocationData> = {
  // ── LOS ANGELES COUNTY ──────────────────────────────────────────────────
  '/locations/glendale-seo': {
    city: 'Glendale',
    county: 'Los Angeles County',
    state: 'CA',
    slug: 'glendale-seo',
    metaTitle: 'SEO Agency in Glendale, CA — Organic Traffic & B2B Pipeline | Gobiya',
    metaDescription: 'Gobiya delivers forensic SEO, B2B lead generation, and AI visibility for Glendale businesses. Dominate Glendale, Burbank, and greater LA search results.',
    h1: 'We engineer search dominance for Glendale businesses.',
    subHeadline: 'Forensic SEO audits, topical authority architectures, and automated B2B pipelines — built for Glendale companies competing across Los Angeles and beyond.',
    heroImage: '/images/location-los-angeles.webp',
    population: '206,000',
    businessCount: '18,000+',
    targetIndustries: ['Healthcare & Medical', 'Financial Services', 'Retail & E-commerce', 'Professional Services', 'Real Estate'],
    stats: [
      { value: '+245%', label: 'average organic traffic growth', text: 'for Glendale service businesses within 6 months of engagement.' },
      { value: '100', label: 'Core Web Vitals score', text: 'guaranteed across mobile and desktop for our custom builds.' },
      { value: '4x', label: 'increase in qualified leads', text: 'for Glendale B2B clients using our intent-triggered pipeline systems.' },
      { value: '3–6m', label: 'average recovery timeline', text: 'for domains recovering from Google Core Updates in the LA market.' },
    ],
    approachTitle: 'Local dominance. Regional reach.',
    approachSubtitle: 'Glendale sits at the convergence of four major LA markets — Burbank, Pasadena, Hollywood, and the San Fernando Valley. We build your search presence to capture all of them.',
    approach: [
      { icon: Search, title: 'Forensic SEO audit.', desc: 'We benchmark your Glendale domain against local and regional competitors, identifying the exact keyword gaps, technical failures, and content architecture flaws limiting your visibility.' },
      { icon: Activity, title: 'Topical authority build-out.', desc: 'We construct pillar-and-spoke content architectures that establish your brand as the definitive authority for your service category across Glendale and the surrounding LA market.' },
      { icon: Trophy, title: 'Predictable pipeline engineering.', desc: 'We deploy intent-signal tracking and automated outbound sequences to convert Glendale search traffic into qualified pipeline — before your competitors even respond to inquiries.' },
    ],
    valueCards: [
      { title: 'Hyper-Local Entity Signals', text: 'We embed Glendale-specific entity schemas, NAP signals, and neighborhood references to dominate local pack results.' },
      { title: 'AI Overview Capture', text: 'We restructure content so Google AI Overviews and LLMs cite your Glendale business when users search for your services.', highlight: true },
      { title: 'Competitive Displacement', text: 'We map your top 10 Glendale competitors and systematically displace them by building stronger topical and domain authority.' },
      { title: 'Revenue Attribution', text: 'Every SEO outcome is tracked back to actual pipeline — meetings booked, leads captured, and deals closed.' },
    ],
    executionTitle: 'From Glendale search query to closed deal.',
    executionSteps: [
      { title: 'Local Competitive Audit', content: 'We audit your Glendale market landscape — identifying who ranks for your target queries, what content they have, how they earn links, and the exact structural gaps we can exploit.' },
      { title: 'On-Page Optimization & Schema', content: 'We optimize every page for local intent: NAP consistency, LocalBusiness schema, service-area definitions, and breadcrumb hierarchies that help Google understand your Glendale geography.' },
      { title: 'Content Cluster Deployment', content: 'We publish topically rich pillar pages covering your core Glendale service categories, linked to supporting spoke articles that capture long-tail queries and earn featured snippet positions.' },
      { title: 'Pipeline Integration & Reporting', content: 'We integrate your organic traffic with CRM intent signals, so every Glendale lead is captured, enriched, and routed to your sales team automatically.' },
    ],
    caseStudy: {
      tag: 'Glendale Professional Services',
      headline: 'Glendale law firm captures #1 rankings in 4 competitive practice areas.',
      description: 'By rebuilding content architecture around semantic entity clusters and injecting LegalService schema, the firm went from page 3 to position 1 for its three highest-value search queries within 5 months.',
      ctaText: 'Replicate this result',
    },
    faqs: [
      { question: 'How competitive is SEO in Glendale, CA?', answer: 'Glendale is one of the most competitive sub-markets in the greater LA metropolitan area. High business density, proximity to Hollywood and Burbank, and strong Armenian-American business community create intense competition across service categories. Success requires forensic technical SEO, not just content creation.' },
      { question: 'Do you serve businesses outside Glendale in LA County?', answer: 'Yes — our engagements cover the entire Los Angeles metro area. We build regional search dominance that captures traffic across Glendale, Burbank, Pasadena, Hollywood, and the San Fernando Valley simultaneously.' },
      { question: 'How long does local SEO take to produce results in Glendale?', answer: 'Most Glendale clients see measurable ranking movement within 60–90 days and significant traffic growth within 4–6 months. Domains with prior penalties may require 6–9 months for full trust restoration.' },
      { question: 'Do you offer B2B lead generation alongside SEO in Glendale?', answer: 'Absolutely. We combine forensic SEO with automated outbound pipeline engineering — so your inbound organic growth is complemented by a proactive outbound system targeting Glendale and LA businesses.' },
    ],
    nearbyAreas: ['Burbank', 'Pasadena', 'Los Angeles', 'North Hollywood', 'La Cañada Flintridge'],
    ctaText: 'Get your Glendale SEO audit',
  },

  '/locations/burbank-seo': {
    city: 'Burbank',
    county: 'Los Angeles County',
    state: 'CA',
    slug: 'burbank-seo',
    metaTitle: 'SEO Agency in Burbank, CA — Media, Entertainment & B2B Growth | Gobiya',
    metaDescription: 'Gobiya engineers SEO and B2B pipelines for Burbank businesses in media, entertainment, tech, and professional services. Dominate search in Burbank and greater LA.',
    h1: 'We engineer organic search dominance for Burbank businesses.',
    subHeadline: 'Technical SEO, topical authority architectures, and AI-optimized content — built for Burbank companies competing in the entertainment, tech, and professional services markets.',
    heroImage: '/images/location-los-angeles.webp',
    population: '104,000',
    businessCount: '11,000+',
    targetIndustries: ['Entertainment & Media', 'Tech & Software', 'Healthcare', 'Financial Services', 'Real Estate & Property Management'],
    stats: [
      { value: '+312%', label: 'average organic traffic growth', text: 'for Burbank clients within 6 months of deploying topical authority architectures.' },
      { value: '1.1s', label: 'Time to Interactive', text: 'achieved on custom React builds for Burbank clients, meeting Google Core Vitals standards.' },
      { value: '+$4.2M', label: 'in closed-won revenue', text: 'attributed directly to SEO and pipeline systems for our Burbank B2B clients.' },
      { value: '85%', label: 'share of voice captured', text: 'in AI Overview responses for our top Burbank entertainment-sector client.' },
    ],
    approachTitle: 'Engineered for the media capital of the world.',
    approachSubtitle: 'Burbank is home to NBC, Disney, and Warner Bros. The competition for search authority in this market is fierce. We build the structural SEO foundations that enterprise brands require.',
    approach: [
      { icon: Search, title: 'Competitive entity mapping.', desc: 'We analyze how Burbank competitors structure their digital footprint and identify the precise entity gaps your brand can exploit to capture ranking positions they have left undefended.' },
      { icon: Activity, title: 'Content authority architecture.', desc: 'We build comprehensive topical coverage across your service lines — creating the cluster depth Google requires to recognize you as the definitive Burbank authority in your category.' },
      { icon: Target, title: 'AI citation engineering.', desc: 'We restructure your pages so that ChatGPT, Claude, and Google AI Overviews cite your Burbank brand when users search for your services.' },
    ],
    valueCards: [
      { title: 'Entertainment Sector SEO', text: 'We understand the unique entity landscape of Burbank — media companies, studios, agencies — and build authority within it.' },
      { title: 'GEO Visibility', text: 'We engineer your brand into AI Overview responses across Burbank and national entertainment industry queries.', highlight: true },
      { title: 'Technical Performance', text: 'Sub-second Core Web Vitals on all custom builds to ensure Google prioritizes your Burbank pages for indexation.' },
      { title: 'Pipeline Automation', text: 'Intent-triggered outbound systems to convert Burbank search traffic into qualified sales meetings automatically.' },
    ],
    executionTitle: 'From Burbank search intent to pipeline revenue.',
    executionSteps: [
      { title: 'Media Market Competitive Audit', content: 'We map the Burbank search landscape across your target service categories, identifying the exact pages and entities blocking your ascent to page one.' },
      { title: 'LocalBusiness Schema Deployment', content: 'We implement structured data covering your Burbank address, service areas, operating hours, and Google Maps entity, eliminating ambiguity for search engines.' },
      { title: 'Topical Cluster Build-Out', content: 'We publish high-authority pillar content covering your Burbank service categories, supported by spoke articles targeting long-tail queries in entertainment, tech, and professional services.' },
      { title: 'Reporting & Iteration', content: 'Weekly monitoring of ranking positions, organic traffic, and pipeline attribution so you have full visibility into the revenue your Burbank SEO investment generates.' },
    ],
    caseStudy: {
      tag: 'Burbank Media Agency',
      headline: 'Burbank production company captures 6 new enterprise contracts via SEO pipeline.',
      description: 'By building a content cluster covering entertainment production services and engineering AI Overview citations, we delivered consistent inbound enterprise inquiries within 5 months.',
      ctaText: 'Build my Burbank pipeline',
    },
    faqs: [
      { question: 'What industries do you serve in Burbank?', answer: 'We work across all Burbank industries but have deep experience in entertainment, media production, tech startups, healthcare, and B2B professional services competing in the greater LA market.' },
      { question: 'Can you help Burbank businesses rank nationally?', answer: 'Yes. We build both local Burbank authority and national topical authority simultaneously — so you dominate the local pack while also capturing national organic traffic for your core service categories.' },
      { question: 'How do you handle B2B lead generation in Burbank?', answer: 'We combine SEO-driven inbound with automated outbound pipeline systems. We identify in-market Burbank and LA businesses showing intent signals and trigger personalized outreach sequences to book qualified meetings.' },
      { question: 'Is GEO (Generative Engine Optimization) relevant for Burbank businesses?', answer: 'Absolutely. AI search is reshaping how buyers discover vendors. We optimize your Burbank brand to be cited natively in ChatGPT, Perplexity, and Google AI Overviews — capturing the next generation of search traffic.' },
    ],
    nearbyAreas: ['Glendale', 'Studio City', 'Toluca Lake', 'North Hollywood', 'Van Nuys'],
    ctaText: 'Get your Burbank SEO audit',
  },

  '/locations/pasadena-seo': {
    city: 'Pasadena',
    county: 'Los Angeles County',
    state: 'CA',
    slug: 'pasadena-seo',
    metaTitle: 'SEO Agency in Pasadena, CA — Healthcare, Education & B2B Growth | Gobiya',
    metaDescription: 'Gobiya delivers forensic SEO and B2B pipeline engineering for Pasadena businesses. Dominate search in Pasadena, Arcadia, Monrovia, and greater San Gabriel Valley.',
    h1: 'We engineer organic growth for Pasadena businesses.',
    subHeadline: 'Forensic SEO, entity-level content architectures, and automated B2B pipelines — engineered for Pasadena healthcare, tech, and professional services companies.',
    heroImage: '/images/location-los-angeles.webp',
    population: '138,000',
    businessCount: '16,000+',
    targetIndustries: ['Healthcare & Biotech', 'Higher Education', 'Engineering & Aerospace', 'Financial Services', 'Law & Professional Services'],
    stats: [
      { value: '+280%', label: 'average organic traffic growth', text: 'for Pasadena service companies within 6 months of deployment.' },
      { value: '94%', label: 'E-E-A-T audit improvement rate', text: 'for Pasadena healthcare and legal clients after our trust signal rebuild.' },
      { value: '3x', label: 'higher AI citation rate', text: 'for brands we optimize for generative search compared to their baseline.' },
      { value: '+$6.8M', label: 'pipeline generated', text: 'for Pasadena B2B clients via SEO and outbound pipeline systems last year.' },
    ],
    approachTitle: 'Authority-first SEO for a knowledge-intensive market.',
    approachSubtitle: 'Pasadena is home to Caltech, JPL, and one of California\'s most educated demographics. Your SEO must demonstrate genuine expertise. We build E-E-A-T signals that establish that authority definitively.',
    approach: [
      { icon: Trophy, title: 'E-E-A-T authority engineering.', desc: 'We build the expert author schemas, credential-backed content, and verified entity signals that establish your Pasadena business as a trusted authority in your sector.' },
      { icon: Search, title: 'Technical SEO infrastructure.', desc: 'We audit and repair your crawl architecture, Core Web Vitals, schema markup, and internal linking structure to ensure Google indexes and ranks your Pasadena pages correctly.' },
      { icon: Activity, title: 'High-intent content clusters.', desc: 'We build topic clusters that cover your service lines exhaustively — so your Pasadena brand captures every high-intent query in your category from San Gabriel Valley to downtown LA.' },
    ],
    valueCards: [
      { title: 'Healthcare SEO Expertise', text: 'We build YMYL-compliant content and E-E-A-T signals that meet Google\'s quality standards for medical and health-adjacent businesses.' },
      { title: 'Biotech & Research Authority', text: 'We position Pasadena research and biotech companies as domain experts through structured schema and authoritative citation building.', highlight: true },
      { title: 'San Gabriel Valley Coverage', text: 'We build search authority that captures traffic across Pasadena, Arcadia, Monrovia, Azusa, and the broader SGV market.' },
      { title: 'Conversion Architecture', text: 'We align every landing page with searcher intent and deploy CTA structures proven to convert Pasadena organic traffic into consultations.' },
    ],
    executionTitle: 'From Pasadena search intent to qualified consultations.',
    executionSteps: [
      { title: 'Domain Trust Audit', content: 'We audit your Pasadena domain\'s E-E-A-T signals, existing content quality, and technical health to identify the exact bottlenecks suppressing your rankings.' },
      { title: 'Expert Content Development', content: 'We produce pillar content that demonstrates genuine expertise in your field — built for both Pasadena\'s highly educated audience and Google\'s quality evaluators.' },
      { title: 'Schema & Local Signal Injection', content: 'We implement comprehensive LocalBusiness schema covering your Pasadena service area, linking your entity graph to recognized Pasadena institutions and neighborhoods.' },
      { title: 'Pipeline Automation', content: 'We integrate your organic search presence with outbound pipeline systems to ensure every high-intent Pasadena visitor is captured and routed for follow-up.' },
    ],
    caseStudy: {
      tag: 'Pasadena Healthcare Group',
      headline: 'Pasadena medical group captures 14 new patient inquiries per week via organic search.',
      description: 'After rebuilding content architecture around medical E-E-A-T signals and deploying healthcare schema, organic traffic grew 220% and consultation bookings increased 3x within 4 months.',
      ctaText: 'Build my Pasadena authority',
    },
    faqs: [
      { question: 'Do you have experience with healthcare SEO in Pasadena?', answer: 'Yes — we specialize in healthcare and YMYL SEO, building the E-E-A-T signals, medical schema markup, and patient-intent content that Google\'s quality raters demand for health-related queries in the Pasadena market.' },
      { question: 'Can you help Pasadena tech and biotech companies?', answer: 'Absolutely. Pasadena\'s proximity to Caltech and JPL makes it a hub for deep tech. We build topical authority for engineering, SaaS, and biotech companies competing nationally while maintaining strong local Pasadena visibility.' },
      { question: 'How do you approach SEO for the San Gabriel Valley?', answer: 'We build a regional content architecture that covers Pasadena as the hub, with spoke content targeting Arcadia, Monrovia, Azusa, Alhambra, and El Monte — ensuring you capture the full SGV market.' },
      { question: 'What makes Gobiya different from other Pasadena SEO agencies?', answer: 'We do not run generic content calendars or build low-quality links. Every engagement begins with a forensic audit. We engineer structural SEO — technical fixes, entity alignment, and conversion architecture — not just monthly blog posts.' },
    ],
    nearbyAreas: ['Arcadia', 'Monrovia', 'San Marino', 'Alhambra', 'Temple City'],
    ctaText: 'Get your Pasadena SEO audit',
  },

  '/locations/long-beach-seo': {
    city: 'Long Beach',
    county: 'Los Angeles County',
    state: 'CA',
    slug: 'long-beach-seo',
    metaTitle: 'SEO Agency in Long Beach, CA — Port, Logistics & B2B Pipeline | Gobiya',
    metaDescription: 'Gobiya engineers forensic SEO and B2B pipeline systems for Long Beach businesses. Dominate search in Long Beach, Carson, Compton, and the Port of LA market.',
    h1: 'We engineer search dominance for Long Beach businesses.',
    subHeadline: 'Forensic SEO audits, B2B pipeline automation, and AI visibility engineering — built for Long Beach logistics, healthcare, and professional services companies.',
    heroImage: '/images/location-los-angeles.webp',
    population: '466,000',
    businessCount: '24,000+',
    targetIndustries: ['Logistics & Supply Chain', 'Healthcare & Medical', 'Port & Maritime Services', 'Financial Services', 'Education & Training'],
    stats: [
      { value: '+195%', label: 'average organic traffic growth', text: 'for Long Beach B2B clients within 5 months of engagement.' },
      { value: '6.5x', label: 'ROAS achieved', text: 'combining SEO + paid pipeline for Long Beach logistics sector clients.' },
      { value: '+140', label: 'qualified meetings booked', text: 'for Long Beach enterprise clients via automated B2B pipeline systems.' },
      { value: '100%', label: 'Core Web Vitals pass rate', text: 'on all custom React platforms built for Long Beach businesses.' },
    ],
    approachTitle: 'Built for the complexity of the Port economy.',
    approachSubtitle: 'Long Beach is one of the largest ports in the world — a hub of logistics, maritime services, and industrial commerce. We build search authority that reaches buyers in this sector before your competitors.',
    approach: [
      { icon: Search, title: 'Sector-specific keyword architecture.', desc: 'We map the Long Beach logistics, maritime, and industrial search landscape — identifying the exact queries driving procurement decisions and building content to capture them.' },
      { icon: Zap, title: 'Technical SEO infrastructure.', desc: 'We audit and repair your crawl architecture, Core Web Vitals, and schema markup to ensure Google indexes and ranks your Long Beach service pages correctly.' },
      { icon: Activity, title: 'Intent-driven pipeline engineering.', desc: 'We deploy real-time intent tracking across Long Beach and regional B2B traffic, triggering automated outbound sequences when target accounts visit your site.' },
    ],
    valueCards: [
      { title: 'Logistics Sector Authority', text: 'We understand maritime and supply chain search intent — building content that ranks for procurement-stage queries.' },
      { title: 'Regional B2B Pipeline', text: 'We identify Long Beach area companies showing intent signals and trigger outreach to book qualified meetings automatically.', highlight: true },
      { title: 'Multi-Location Coverage', text: 'We build search authority covering Long Beach, Carson, Compton, Torrance, and the greater South Bay market.' },
      { title: 'AI Citation Engineering', text: 'We position your Long Beach brand to be cited by ChatGPT and Google AI Overviews for logistics and industrial service queries.' },
    ],
    executionTitle: 'From port district search to closed enterprise deal.',
    executionSteps: [
      { title: 'Long Beach Market Audit', content: 'We audit your Long Beach competitive landscape, mapping which brands own the top positions for your target queries and identifying the structural weaknesses we can exploit.' },
      { title: 'Service Area Schema Deployment', content: 'We implement comprehensive schema covering your Long Beach headquarters, service areas, and industry verticals — eliminating geographic ambiguity for search engines.' },
      { title: 'Sector Content Authority', content: 'We build pillar-and-spoke content clusters covering logistics, maritime, healthcare, and professional services — establishing your Long Beach brand as the sector authority.' },
      { title: 'Pipeline Integration', content: 'We connect your organic search presence to automated pipeline systems, so high-intent Long Beach visitors are identified, enriched, and routed to your sales team automatically.' },
    ],
    caseStudy: {
      tag: 'Long Beach Logistics Provider',
      headline: 'Long Beach logistics company captures 22 enterprise contracts via SEO and pipeline automation.',
      description: 'By building a comprehensive logistics search authority and deploying reverse-IP intent tracking, we generated over $3.8M in new enterprise pipeline within 8 months.',
      ctaText: 'Build my Long Beach pipeline',
    },
    faqs: [
      { question: 'Can you help logistics and maritime businesses rank in Long Beach?', answer: 'Yes — logistics and maritime is one of our core verticals for Long Beach. We understand the procurement-stage search behavior of port-adjacent buyers and build content architectures specifically to capture those queries.' },
      { question: 'How do you reach B2B buyers in the Long Beach industrial market?', answer: 'We combine organic SEO to capture inbound intent with reverse-IP tracking to identify companies visiting your site. When we detect a high-intent account, we trigger personalized outreach sequences to book qualified meetings.' },
      { question: 'What\'s the geographic coverage of your Long Beach SEO?', answer: 'We build regional authority covering Long Beach, Carson, Compton, Torrance, Wilmington, and the broader South Bay — ensuring your brand is visible to buyers across the entire port economy area.' },
      { question: 'Do you work with healthcare and professional services in Long Beach?', answer: 'Absolutely. Beyond logistics, we serve Long Beach healthcare providers, law firms, financial advisors, and professional services companies. The same forensic approach applies regardless of sector.' },
    ],
    nearbyAreas: ['Carson', 'Compton', 'Torrance', 'Lakewood', 'Signal Hill'],
    ctaText: 'Get your Long Beach SEO audit',
  },

  // ── ORANGE COUNTY ───────────────────────────────────────────────────────
  '/locations/anaheim-seo': {
    city: 'Anaheim',
    county: 'Orange County',
    state: 'CA',
    slug: 'anaheim-seo',
    metaTitle: 'SEO Agency in Anaheim, CA — Hospitality, Tourism & B2B Growth | Gobiya',
    metaDescription: 'Gobiya engineers forensic SEO and B2B pipelines for Anaheim businesses. Dominate search in Anaheim, Orange, Fullerton, and the greater OC market.',
    h1: 'We engineer search dominance for Anaheim businesses.',
    subHeadline: 'Forensic SEO, AI visibility, and automated B2B pipelines — built for Anaheim hospitality, healthcare, and professional services companies competing in Orange County.',
    heroImage: '/images/location-orange-county.webp',
    population: '350,000',
    businessCount: '22,000+',
    targetIndustries: ['Hospitality & Tourism', 'Healthcare & Medical', 'Manufacturing', 'Professional Services', 'Retail & E-commerce'],
    stats: [
      { value: '+260%', label: 'average organic traffic growth', text: 'for Anaheim businesses within 6 months of deploying our SEO architecture.' },
      { value: '3x', label: 'increase in qualified leads', text: 'for Anaheim B2B clients using our intent-triggered pipeline systems.' },
      { value: '+$5.1M', label: 'in pipeline generated', text: 'for Anaheim enterprise clients via SEO and outbound automation last year.' },
      { value: '92%', label: 'of AI Overview citations', text: 'retained by Anaheim clients 12 months after our GEO optimization programs.' },
    ],
    approachTitle: 'Tourism hub. Enterprise growth market.',
    approachSubtitle: 'Anaheim is far more than Disneyland. It is home to the Anaheim Convention Center, a major healthcare corridor, and a dense industrial base. We build the search authority that unlocks all of it.',
    approach: [
      { icon: Search, title: 'OC competitive landscape audit.', desc: 'We map the Anaheim and Orange County search landscape for your target service categories — identifying the exact brands blocking your visibility and the precise weaknesses we can exploit.' },
      { icon: Activity, title: 'Convention & hospitality SEO.', desc: 'We build content authority covering Anaheim\'s hospitality, event, and convention market — capturing the high-intent corporate buyers who discover vendors before, during, and after major events.' },
      { icon: Trophy, title: 'B2B pipeline architecture.', desc: 'We deploy intent-signal tracking and automated outreach to convert your Anaheim search traffic into qualified enterprise meetings — consistently, at scale.' },
    ],
    valueCards: [
      { title: 'Convention Market Authority', text: 'We capture the high-intent corporate queries surrounding the Anaheim Convention Center and broader event industry.' },
      { title: 'GEO Optimization', text: 'We position your Anaheim brand to be cited natively inside ChatGPT, Gemini, and Google AI Overviews for your core service categories.', highlight: true },
      { title: 'OC Regional Coverage', text: 'We build search presence across Anaheim, Orange, Fullerton, Yorba Linda, and the entire North Orange County corridor.' },
      { title: 'Healthcare SEO', text: 'We serve Anaheim\'s growing healthcare sector with E-E-A-T compliant content and medical schema deployment.' },
    ],
    executionTitle: 'From Anaheim search intent to enterprise pipeline.',
    executionSteps: [
      { title: 'Anaheim Market Audit', content: 'We conduct a full competitive audit of the Anaheim search landscape — identifying ranking opportunities, keyword gaps, and the exact content structure needed to displace incumbent competitors.' },
      { title: 'Local Entity Schema', content: 'We implement LocalBusiness schema covering your Anaheim location, service area, and industry vertical — including hospitality, healthcare, or B2B service classifications as relevant.' },
      { title: 'Topical Authority Cluster', content: 'We build comprehensive content clusters covering your service categories in Anaheim and the broader OC market — establishing you as the sector authority Google trusts.' },
      { title: 'Conversion & Pipeline Integration', content: 'We connect organic traffic to real-time intent tracking and automated outreach pipelines, ensuring every high-intent Anaheim visitor is captured and routed for sales follow-up.' },
    ],
    caseStudy: {
      tag: 'Anaheim Healthcare Group',
      headline: 'Anaheim healthcare provider triples patient inquiries via local SEO.',
      description: 'By rebuilding service-area schema, deploying a healthcare content cluster, and engineering Google AI Overview citations, we tripled organic patient inquiries within 4 months.',
      ctaText: 'Build my Anaheim authority',
    },
    faqs: [
      { question: 'Can you help hospitality and convention businesses in Anaheim rank?', answer: 'Yes — we have deep experience in Anaheim\'s hospitality and event-driven search landscape. We build content that captures corporate buyers searching for Anaheim venues, vendors, and services before and during major conventions.' },
      { question: 'How do you approach OC-wide SEO from an Anaheim base?', answer: 'We build Anaheim as your hub city for search authority and expand coverage to Orange, Fullerton, Yorba Linda, and Brea — creating a regional search presence that captures the entire North OC market.' },
      { question: 'Do you handle SEO for manufacturing businesses in Anaheim?', answer: 'Yes — Anaheim has a strong industrial and manufacturing base. We build topical authority covering industrial services, procurement-stage queries, and B2B-specific search intent for manufacturing companies.' },
      { question: 'How quickly can I see SEO results in Anaheim?', answer: 'Most Anaheim clients see measurable ranking movement within 60–90 days and significant traffic and lead growth within 4–6 months. We provide monthly reporting showing ranking, traffic, and pipeline attribution throughout.' },
    ],
    nearbyAreas: ['Orange', 'Fullerton', 'Yorba Linda', 'Garden Grove', 'Stanton'],
    ctaText: 'Get your Anaheim SEO audit',
  },

  '/locations/costa-mesa-seo': {
    city: 'Costa Mesa',
    county: 'Orange County',
    state: 'CA',
    slug: 'costa-mesa-seo',
    metaTitle: 'SEO Agency in Costa Mesa, CA — Fashion, Retail & B2B Growth | Gobiya',
    metaDescription: 'Gobiya delivers forensic SEO and B2B pipelines for Costa Mesa businesses. Dominate search in Costa Mesa, Newport Beach, Huntington Beach, and the entire OC market.',
    h1: 'We engineer search dominance for Costa Mesa businesses.',
    subHeadline: 'Forensic SEO, topical authority content, and AI citation engineering — built for Costa Mesa retail, fashion, healthcare, and professional services companies.',
    heroImage: '/images/location-orange-county.webp',
    population: '115,000',
    businessCount: '9,000+',
    targetIndustries: ['Fashion & Retail', 'Healthcare & Medical', 'Financial Services', 'Legal & Professional Services', 'Interior Design & Home'],
    stats: [
      { value: '+225%', label: 'average organic traffic growth', text: 'for Costa Mesa retailers and service businesses within 5 months.' },
      { value: '4.8x', label: 'average ROAS', text: 'for Costa Mesa clients combining SEO with paid pipeline campaigns.' },
      { value: '100', label: 'Core Web Vitals score', text: 'achieved on all custom web builds for Costa Mesa e-commerce clients.' },
      { value: '+380%', label: 'organic lead growth', text: 'for our top-performing Costa Mesa professional services client.' },
    ],
    approachTitle: 'Premium market. Premium search authority.',
    approachSubtitle: 'Costa Mesa sits between Newport Beach and Huntington Beach — one of California\'s most affluent coastal corridors. Your search presence must match the premium expectations of your audience.',
    approach: [
      { icon: Search, title: 'Premium market keyword architecture.', desc: 'We map Costa Mesa\'s competitive search landscape — identifying the high-intent, high-value queries your affluent Orange County audience uses and building the authority to own them.' },
      { icon: Activity, title: 'E-commerce and retail SEO.', desc: 'We build product-level content architecture, review schema, and conversion-optimized landing pages that capture South Coast Plaza shoppers and Orange County buyers.' },
      { icon: Trophy, title: 'Coastal corridor coverage.', desc: 'We extend your search authority to cover Newport Beach, Huntington Beach, Irvine, and the broader OC coastal market — maximizing your addressable audience.' },
    ],
    valueCards: [
      { title: 'Fashion & Retail Authority', text: 'We build e-commerce SEO architectures that capture product-level queries and brand-name searches in the Costa Mesa and OC market.' },
      { title: 'Luxury Audience Targeting', text: 'We craft content that speaks to Costa Mesa\'s affluent demographic — aligning organic traffic with the buyers who convert at the highest LTV.', highlight: true },
      { title: 'Newport Beach Coverage', text: 'We extend your organic presence to Newport Beach, Huntington Beach, and Laguna Beach — capturing the entire Orange County coastal corridor.' },
      { title: 'AI Overview Capture', text: 'We engineer your Costa Mesa brand to appear in ChatGPT and Google AI Overviews for your highest-value service and product categories.' },
    ],
    executionTitle: 'From Costa Mesa search to premium conversions.',
    executionSteps: [
      { title: 'OC Coastal Audit', content: 'We audit the Costa Mesa, Newport Beach, and broader OC coastal search landscape — identifying the ranking opportunities that produce high-LTV conversions for your business.' },
      { title: 'Product & Service Schema', content: 'We implement rich schema markup covering your Costa Mesa services, products, and reviews — providing the structured data Google needs to display your business in rich results.' },
      { title: 'Premium Content Architecture', content: 'We build content that meets the elevated expectations of Costa Mesa\'s affluent audience — demonstrating expertise, building trust, and converting browsers into high-value buyers.' },
      { title: 'Revenue Attribution', content: 'We track organic search from first click to closed sale, providing clear attribution showing which Costa Mesa search queries drive the most revenue for your business.' },
    ],
    caseStudy: {
      tag: 'Costa Mesa Retailer',
      headline: 'Costa Mesa interior design firm triples organic revenue in 5 months.',
      description: 'By building a content cluster covering luxury home design in Orange County and engineering Google Shopping and AI Overview citations, organic revenue grew 3x with a 62% improvement in lead quality.',
      ctaText: 'Build my Costa Mesa authority',
    },
    faqs: [
      { question: 'What industries do you serve in Costa Mesa?', answer: 'We serve fashion retailers, interior designers, healthcare practices, law firms, financial advisors, and professional services companies in Costa Mesa. We also have deep experience with South Coast Plaza-adjacent businesses and luxury e-commerce brands.' },
      { question: 'Can you cover Newport Beach and Huntington Beach alongside Costa Mesa?', answer: 'Yes — we build regional coastal search authority that covers Costa Mesa, Newport Beach, Huntington Beach, Laguna Beach, and the broader OC coastline from a single integrated strategy.' },
      { question: 'How do you approach luxury and premium market SEO?', answer: 'Luxury market SEO requires a different approach — lower search volume, higher LTV, more sophisticated audience. We focus on E-E-A-T authority, brand-level entity signals, and content that reflects genuine expertise rather than mass-market blog posts.' },
      { question: 'Do you offer web development for Costa Mesa businesses?', answer: 'Yes — our web development team builds custom React applications with sub-second Core Web Vitals, conversion-optimized architecture, and full SEO integration. Many Costa Mesa clients combine web development with SEO for maximum impact.' },
    ],
    nearbyAreas: ['Newport Beach', 'Huntington Beach', 'Irvine', 'Santa Ana', 'Fountain Valley'],
    ctaText: 'Get your Costa Mesa SEO audit',
  },

  '/locations/irvine-seo': {
    city: 'Irvine',
    county: 'Orange County',
    state: 'CA',
    slug: 'irvine-seo',
    metaTitle: 'SEO Agency in Irvine, CA — Tech, SaaS & Enterprise B2B Growth | Gobiya',
    metaDescription: 'Gobiya engineers forensic SEO and enterprise B2B pipelines for Irvine businesses. Dominate search in Irvine, Newport Beach, Lake Forest, and the Irvine Spectrum market.',
    h1: 'We engineer enterprise search dominance for Irvine businesses.',
    subHeadline: 'Technical SEO, AI citation engineering, and enterprise B2B pipeline automation — built for Irvine\'s technology, SaaS, and professional services companies.',
    heroImage: '/images/location-orange-county.webp',
    population: '307,000',
    businessCount: '32,000+',
    targetIndustries: ['Technology & SaaS', 'Financial Services', 'Healthcare & Biotech', 'Legal & Professional Services', 'Real Estate & Development'],
    stats: [
      { value: '+340%', label: 'average organic traffic growth', text: 'for Irvine tech and SaaS companies within 6 months of engagement.' },
      { value: '94%', label: 'AI Overview citation retention', text: 'for Irvine enterprise clients 12 months after GEO optimization programs.' },
      { value: '+$12M', label: 'in new pipeline generated', text: 'for Irvine enterprise B2B clients via SEO and automated outbound systems last year.' },
      { value: '65%', label: 'lower customer acquisition cost', text: 'for Irvine SaaS companies using closed-loop pipeline architecture over paid-only acquisition.' },
    ],
    approachTitle: 'The enterprise technology capital of Orange County.',
    approachSubtitle: 'Irvine is home to over 32,000 businesses and serves as the enterprise technology hub of Southern California. We build the search and pipeline authority required to compete at that level.',
    approach: [
      { icon: Search, title: 'Enterprise competitive audit.', desc: 'We audit your Irvine market position against enterprise-grade competitors — mapping the keyword gaps, content authority deficits, and entity signals that separate your brand from the incumbents.' },
      { icon: Zap, title: 'SaaS & tech content architecture.', desc: 'We build the deep technical content clusters and product documentation strategies that help Irvine SaaS companies capture high-intent enterprise search queries at every stage of the buying cycle.' },
      { icon: Target, title: 'Enterprise pipeline automation.', desc: 'We deploy reverse-IP identification, account-level intent scoring, and automated multi-channel outreach to convert Irvine search traffic into qualified enterprise pipeline systematically.' },
    ],
    valueCards: [
      { title: 'Enterprise SaaS SEO', text: 'We build content architectures that capture the high-intent enterprise queries SaaS buyers use throughout the evaluation and procurement cycle.' },
      { title: 'AI Citation Engineering', text: 'We position your Irvine brand inside ChatGPT, Perplexity, and Google AI Overviews so enterprise buyers discover you through AI search.', highlight: true },
      { title: 'Spectrum Market Coverage', text: 'We build search authority covering Irvine Spectrum, Newport Beach, Lake Forest, Mission Viejo, and the broader South OC enterprise market.' },
      { title: 'Account-Level Pipeline', text: 'We identify Irvine enterprise accounts showing intent on your site and trigger personalized outreach before they evaluate your competitors.' },
    ],
    executionTitle: 'From enterprise search to closed-won Irvine deals.',
    executionSteps: [
      { title: 'Enterprise Market Audit', content: 'We map the Irvine competitive landscape at the enterprise level — identifying which companies own your target keywords, what content moats they have built, and the precise structural gaps we exploit to displace them.' },
      { title: 'Technical SEO Foundation', content: 'We audit and repair crawl architecture, Core Web Vitals, schema implementation, and canonical signals — ensuring Google indexes your Irvine service pages with perfect technical clarity.' },
      { title: 'SaaS Content Authority', content: 'We build comprehensive content clusters covering your product categories, use cases, and competitive comparisons — establishing Irvine thought leadership that attracts enterprise buyers at every funnel stage.' },
      { title: 'Intent-Triggered Pipeline', content: 'We deploy the intent infrastructure to identify target enterprise accounts visiting your Irvine site and trigger automated outbound sequences timed against their exact engagement behavior.' },
    ],
    caseStudy: {
      tag: 'Irvine SaaS Platform',
      headline: 'Irvine B2B SaaS captures $8.5M in enterprise pipeline via SEO and intent automation.',
      description: 'By building a content cluster covering enterprise workflow automation and deploying reverse-IP intent tracking, the platform booked 200+ qualified enterprise meetings within 7 months.',
      ctaText: 'Build my Irvine enterprise pipeline',
    },
    faqs: [
      { question: 'Do you specialize in SaaS and technology SEO in Irvine?', answer: 'Yes — SaaS and enterprise tech is one of our core verticals for Irvine. We understand how enterprise buyers evaluate software and build the content architectures that capture purchase-intent queries at every evaluation stage.' },
      { question: 'How do you build enterprise B2B pipelines in Irvine?', answer: 'We combine forensic SEO to drive inbound intent with reverse-IP de-anonymization to identify visiting enterprise accounts. When we detect a high-intent Irvine or OC enterprise account, we trigger personalized multi-channel outreach to book qualified meetings.' },
      { question: 'What is GEO (Generative Engine Optimization) for Irvine SaaS companies?', answer: 'GEO involves optimizing your content so that AI tools like ChatGPT, Perplexity, and Gemini recommend your Irvine SaaS product when enterprise buyers ask for software recommendations in your category.' },
      { question: 'Can Gobiya handle both SEO and web development for Irvine companies?', answer: 'Absolutely. We build custom React and Vite applications with sub-second Core Web Vitals alongside our SEO programs — many Irvine enterprise clients engage us for both to maximize organic performance.' },
    ],
    nearbyAreas: ['Newport Beach', 'Lake Forest', 'Mission Viejo', 'Tustin', 'Laguna Hills'],
    ctaText: 'Get your Irvine enterprise SEO audit',
  },

  '/locations/santa-ana-seo': {
    city: 'Santa Ana',
    county: 'Orange County',
    state: 'CA',
    slug: 'santa-ana-seo',
    metaTitle: 'SEO Agency in Santa Ana, CA — Legal, Healthcare & B2B Growth | Gobiya',
    metaDescription: 'Gobiya engineers forensic SEO and B2B pipelines for Santa Ana businesses. Dominate search in Santa Ana, Garden Grove, Tustin, and greater Orange County.',
    h1: 'We engineer search dominance for Santa Ana businesses.',
    subHeadline: 'Forensic SEO, bilingual content architecture, and automated B2B pipelines — built for Santa Ana legal, healthcare, financial, and professional services companies.',
    heroImage: '/images/location-orange-county.webp',
    population: '310,000',
    businessCount: '20,000+',
    targetIndustries: ['Legal Services', 'Healthcare & Medical', 'Financial Services', 'Immigration & Consulting', 'Retail & Food Service'],
    stats: [
      { value: '+220%', label: 'average organic traffic growth', text: 'for Santa Ana professional services companies within 5 months.' },
      { value: '3.5x', label: 'higher conversion rate', text: 'for bilingual-optimized landing pages targeting Spanish-speaking OC audiences.' },
      { value: '+$3.2M', label: 'in pipeline generated', text: 'for Santa Ana legal and healthcare clients via SEO and outbound automation.' },
      { value: '88%', label: 'local pack capture rate', text: 'for Santa Ana clients after full LocalBusiness schema and citation audit.' },
    ],
    approachTitle: 'OC\'s civic core. A high-density growth market.',
    approachSubtitle: 'Santa Ana is the county seat of Orange County — a dense, diverse, and commercially active market. We build search authority that captures both English and Spanish-language searchers across the OC metro.',
    approach: [
      { icon: Search, title: 'Bilingual keyword architecture.', desc: 'We build content strategies covering both English and Spanish-language search queries — ensuring your Santa Ana business captures the full OC audience across both markets.' },
      { icon: Activity, title: 'Legal and healthcare SEO.', desc: 'We build the E-E-A-T signals, YMYL-compliant content, and structured schema required to rank for high-intent legal and healthcare queries in Santa Ana and greater OC.' },
      { icon: Trophy, title: 'Local pack dominance.', desc: 'We audit and optimize your Google Business Profile, NAP consistency, and citation portfolio to capture the local map pack positions that drive the most high-intent calls and form submissions.' },
    ],
    valueCards: [
      { title: 'Bilingual SEO Capability', text: 'We build English and Spanish content strategies that capture the full Santa Ana and OC audience spectrum.' },
      { title: 'Legal Market Authority', text: 'We build the E-E-A-T signals and YMYL-compliant content law firms need to rank competitively in Santa Ana\'s dense legal market.', highlight: true },
      { title: 'Local Pack Capture', text: 'We optimize Google Business Profiles, citation networks, and schema to capture the map pack positions driving high-intent local inquiries.' },
      { title: 'OC Metro Coverage', text: 'We extend your authority to cover Garden Grove, Tustin, Fountain Valley, and the full Central OC market.' },
    ],
    executionTitle: 'From Santa Ana local search to qualified clients.',
    executionSteps: [
      { title: 'Local & Bilingual Audit', content: 'We audit your Santa Ana search presence across both English and Spanish-language queries — identifying the ranking gaps, citation inconsistencies, and content structure issues suppressing your local visibility.' },
      { title: 'GBP & Citation Optimization', content: 'We optimize your Google Business Profile with complete Santa Ana service-area data, review strategy, and consistent NAP citations across the OC citation network.' },
      { title: 'E-E-A-T Content Build', content: 'We produce YMYL-compliant content for legal, healthcare, and financial services queries — meeting Google\'s trust standards for the highest-stakes search categories.' },
      { title: 'Outreach Pipeline', content: 'For B2B Santa Ana clients, we deploy automated outbound sequences targeting OC businesses showing intent signals, consistently producing qualified meetings for your sales team.' },
    ],
    caseStudy: {
      tag: 'Santa Ana Law Firm',
      headline: 'Santa Ana immigration law firm captures #1 rankings for top 12 practice area queries.',
      description: 'By building bilingual content clusters, optimizing the Google Business Profile, and implementing LegalService schema, the firm grew organic client inquiries by 290% within 4 months.',
      ctaText: 'Build my Santa Ana authority',
    },
    faqs: [
      { question: 'Do you offer bilingual SEO for Santa Ana businesses?', answer: 'Yes — bilingual SEO is a core capability for our Santa Ana engagements. We build both English and Spanish content strategies, ensuring your business captures the full Orange County audience across both language markets.' },
      { question: 'Can you help legal and immigration firms rank in Santa Ana?', answer: 'Absolutely. We specialize in legal SEO for Santa Ana — building E-E-A-T compliant content, LegalService schema, and local citation networks that establish trust and authority in competitive practice areas.' },
      { question: 'How important is Google Business Profile for Santa Ana businesses?', answer: 'Critical. In Santa Ana\'s dense local market, the map pack captures the majority of local search traffic. We fully optimize your GBP with complete service area data, photo strategy, review generation, and schema — to maximize your local pack visibility.' },
      { question: 'What OC cities do you cover from Santa Ana?', answer: 'We build regional authority covering Santa Ana, Garden Grove, Tustin, Fountain Valley, Westminster, and the full Central Orange County corridor — ensuring your business captures traffic across the broader OC metro.' },
    ],
    nearbyAreas: ['Garden Grove', 'Tustin', 'Fountain Valley', 'Westminster', 'Orange'],
    ctaText: 'Get your Santa Ana SEO audit',
  },
};

const LocationPage: React.FC<{ path: string }> = ({ path }) => {
  const data = LOCATION_DATA[path];
  const [activeStep, setActiveStep] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!data) return;
    document.title = data.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', data.metaDescription);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', data.metaTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', data.metaDescription);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [path, data]);

  // JSON-LD schema injection
  useEffect(() => {
    if (!data) return;

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LocalBusiness',
          '@id': `https://gobiya.com${path}`,
          name: `Gobiya SEO Agency — ${data.city}`,
          description: data.metaDescription,
          url: `https://gobiya.com${path}`,
          telephone: '+1-424-222-0555',
          address: {
            '@type': 'PostalAddress',
            addressLocality: data.city,
            addressRegion: 'CA',
            addressCountry: 'US',
          },
          areaServed: [data.city, ...data.nearbyAreas].map(a => ({ '@type': 'City', name: a, addressRegion: 'CA' })),
          priceRange: '$$$',
          knowsAbout: data.targetIndustries,
        },
        {
          '@type': 'FAQPage',
          mainEntity: data.faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://gobiya.com/' },
            { '@type': 'ListItem', position: 2, name: 'Locations', item: 'https://gobiya.com/locations' },
            { '@type': 'ListItem', position: 3, name: `${data.city} SEO`, item: `https://gobiya.com${path}` },
          ],
        },
      ],
    };

    let existingScript = document.getElementById('location-schema');
    if (!existingScript) {
      existingScript = document.createElement('script');
      existingScript.id = 'location-schema';
      existingScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(existingScript);
    }
    existingScript.textContent = JSON.stringify(schema);

    return () => {
      const s = document.getElementById('location-schema');
      if (s) s.remove();
    };
  }, [path, data]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray('.reveal-up') as HTMLElement[];
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, [path]);

  if (!data) {
    return (
      <div className="bg-[#050505] min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Location page not found.</p>
      </div>
    );
  }

  const isLA = data.county === 'Los Angeles County';

  return (
    <div className="bg-[#050505] min-h-screen font-sans selection:bg-[#F26522]/30 selection:text-white page-wrapper">
      <Header theme="dark" />

      {/* ── HERO SECTION ── */}
      <section className="relative w-full pt-32 lg:pt-40 pb-20 bg-[#050505] overflow-hidden flex flex-col justify-center border-b border-white/10">
        {/* Hero image background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={data.heroImage}
            alt={`${data.city}, ${data.state} SEO Agency`}
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-[#050505]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-gray-500 mb-8" aria-label="breadcrumb">
            <a href="/" className="hover:text-[#F26522] transition-colors">Home</a>
            <span>/</span>
            <a href="/locations" className="hover:text-[#F26522] transition-colors">Locations</a>
            <span>/</span>
            <span className="text-gray-300">{data.city} SEO</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <MapPin className="w-4 h-4 text-[#F26522]" />
            <span className="text-[13px] text-gray-300 tracking-wide uppercase font-medium">
              {data.city}, {data.state} · {data.county}
            </span>
          </div>

          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-white mb-6 font-display max-w-[900px]">
            {data.h1}
          </h1>
          <p className="text-[17px] sm:text-[20px] text-gray-400 max-w-[700px] leading-relaxed mb-10">
            {data.subHeadline}
          </p>

          {/* Target industries */}
          <div className="flex flex-wrap gap-2 mb-10">
            {data.targetIndustries.map((ind, idx) => (
              <span key={idx} className="text-[12px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 font-medium">
                {ind}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-6 pr-2 py-2 transition-colors duration-300"
            >
              <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-4">
                <span className="text-[14px] sm:text-[15px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  {data.ctaText}
                </span>
                <span className="text-[14px] sm:text-[15px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  {data.ctaText}
                </span>
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white flex items-center justify-center rounded-sm">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
              </div>
            </a>
            <a
              href="/services"
              className="group inline-flex items-center bg-transparent border border-white/20 hover:border-white/40 text-white px-6 py-2 transition-colors duration-300 text-[14px] sm:text-[15px] font-medium"
            >
              View all services
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="flex flex-col md:flex-row w-full">
        {data.stats.map((stat, idx) => (
          <div key={idx} className={`flex-1 p-8 lg:p-12 text-white ${idx % 2 === 0 ? 'bg-[#F26522]' : 'bg-[#e05a1a]'}`}>
            <div className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold tracking-tighter leading-none mb-3 font-display">
              {stat.value}
            </div>
            <div className="text-[14px] lg:text-[15px] leading-tight font-medium">
              {stat.label} <span className="font-normal opacity-90">{stat.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── APPROACH SECTION ── */}
      <section className="py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#F9F9F9]">
        <div className="max-w-[1440px] mx-auto text-center reveal-up">
          <h3 className="text-sm font-bold tracking-widest uppercase text-[#F26522] mb-4">
            Our {data.city} Approach
          </h3>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-medium text-[#111111] mb-6 leading-tight max-w-4xl mx-auto font-display">
            {data.approachTitle}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-24">
            {data.approachSubtitle}
          </p>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
            <div className="absolute top-[40px] left-[16%] right-[16%] h-px bg-gray-300 hidden md:block z-0" />
            {data.approach.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-[80px] h-[80px] rounded-full bg-[#F26522] flex items-center justify-center text-white mb-8 shadow-lg shadow-orange-500/20 ring-8 ring-white">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-medium text-[#111111] mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed px-4">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VALUE CARDS ── */}
      <section className="pb-24 lg:pb-32 px-5 sm:px-8 lg:px-12 bg-[#F9F9F9]">
        <div className="max-w-[1440px] mx-auto reveal-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white shadow-xl shadow-gray-200/50">
            {data.valueCards.map((card, idx) => (
              <div
                key={idx}
                className={`p-10 lg:p-12 flex flex-col justify-center min-h-[280px] border-b lg:border-b-0 lg:border-r border-gray-100 last:border-0 transition-colors duration-500
                  ${card.highlight ? 'bg-[#F26522] text-white' : 'bg-white text-[#111111] hover:bg-gray-50'}`}
              >
                {card.highlight ? (
                  <ChevronRight size={32} className="text-white mb-6 opacity-80" strokeWidth={1.5} />
                ) : (
                  <ChevronRight size={32} className="text-[#F26522] mb-6" strokeWidth={1.5} />
                )}
                <h3 className={`text-xl lg:text-2xl font-medium mb-4 ${card.highlight ? 'text-white' : 'text-[#111111]'}`}>
                  {card.title}
                </h3>
                <p className={`leading-relaxed ${card.highlight ? 'text-white/90' : 'text-gray-600'}`}>
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXECUTION ACCORDION ── */}
      <section className="py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left — Hero image panel */}
            <div className="relative reveal-up hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F26522]/20 to-transparent transform -translate-x-4 translate-y-4 rounded-xl -z-10" />
              <img
                src={data.heroImage}
                alt={`SEO strategy execution in ${data.city}`}
                className="w-full rounded-xl shadow-2xl shadow-gray-200 object-cover aspect-[4/3]"
              />
              <div className="absolute -top-6 -left-6 bg-[#F26522] text-white p-6 shadow-xl rounded-br-3xl">
                <div className="text-2xl font-bold font-display tracking-tight">{data.city}</div>
                <div className="text-sm font-medium opacity-90">{data.county}</div>
              </div>
            </div>

            {/* Right — Accordion */}
            <div className="reveal-up">
              <h3 className="text-sm font-bold tracking-widest uppercase text-[#F26522] mb-4">
                Strategy & Execution
              </h3>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-medium text-[#111111] mb-12 leading-[1.1] font-display">
                {data.executionTitle}
              </h2>

              <div className="space-y-2 border-t border-gray-200">
                {data.executionSteps.map((step, idx) => {
                  const isOpen = activeStep === idx;
                  return (
                    <div key={idx} className="border-b border-gray-200">
                      <button
                        onClick={() => setActiveStep(isOpen ? -1 : idx)}
                        className="w-full py-6 flex items-center justify-between text-left group"
                      >
                        <span className={`text-xl lg:text-2xl font-medium transition-colors ${isOpen ? 'text-[#111111]' : 'text-gray-900 group-hover:text-[#F26522]'}`}>
                          <span className="text-[#F26522] mr-4 inline-block w-4">{isOpen ? '-' : '+'}</span>
                          {step.title}
                        </span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
                        <p className="text-lg text-gray-600 leading-relaxed pl-8 border-l-2 border-[#F26522]/20 ml-2">
                          {step.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section className="py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src={data.heroImage} alt="" className="w-full h-full object-cover mix-blend-luminosity" />
        </div>
        <div className="max-w-[1440px] mx-auto relative z-10 reveal-up">
          <div className="max-w-[900px]">
            <span className="inline-block bg-[#F26522]/10 border border-[#F26522]/30 text-[#F26522] px-4 py-1.5 text-[13px] font-semibold tracking-widest uppercase mb-8">
              {data.caseStudy.tag}
            </span>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-medium text-white mb-6 leading-tight font-display">
              {data.caseStudy.headline}
            </h2>
            <p className="text-lg text-gray-400 max-w-[700px] leading-relaxed mb-10">
              {data.caseStudy.description}
            </p>
            <a
              href="/contact"
              className="group inline-flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-6 pr-2 py-2 transition-colors duration-300"
            >
              <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-4">
                <span className="text-[14px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  {data.caseStudy.ctaText}
                </span>
                <span className="text-[14px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  {data.caseStudy.ctaText}
                </span>
              </div>
              <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
                <ArrowRight className="w-4 h-4 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── NEARBY AREAS ── */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 bg-[#F9F9F9]">
        <div className="max-w-[1440px] mx-auto reveal-up">
          <h3 className="text-sm font-bold tracking-widest uppercase text-[#F26522] mb-4">Coverage Area</h3>
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-medium text-[#111111] mb-8 font-display">
            We also serve businesses near {data.city}.
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.nearbyAreas.map((area, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-[#111111] font-medium text-[14px] hover:border-[#F26522] hover:text-[#F26522] transition-colors duration-300 cursor-default"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F26522]" />
                {area}, CA
              </span>
            ))}
            <a
              href="/locations"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F26522] text-white font-medium text-[14px] hover:bg-[#e05a1a] transition-colors duration-300"
            >
              View all locations <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICES CTA BAND ── */}
      <section className="py-16 px-5 sm:px-8 lg:px-12 bg-white border-y border-gray-100">
        <div className="max-w-[1440px] mx-auto reveal-up">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h3 className="text-[clamp(1.6rem,2.5vw,2.2rem)] font-medium text-[#111111] mb-2 font-display">
                Explore our full services lineup.
              </h3>
              <p className="text-gray-600">
                Every Gobiya {data.city} engagement draws on our complete service ecosystem.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              {[
                { label: 'Technical SEO', href: '/services/seo' },
                { label: 'B2B Lead Generation', href: '/services/lead-generation' },
                { label: 'GEO / AI Visibility', href: '/services/geo-optimization' },
                { label: 'Web Development', href: '/services/web-development' },
                { label: 'PPC Advertising', href: '/services/ppc-advertising' },
              ].map((svc, idx) => (
                <a
                  key={idx}
                  href={svc.href}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-[#F26522] hover:text-[#F26522] text-[#111111] text-[13px] font-medium transition-colors duration-300"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-[#F26522]" />
                  {svc.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#F9F9F9]">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-[900px] mx-auto reveal-up">
            <h3 className="text-sm font-bold tracking-widest uppercase text-[#F26522] mb-4">FAQ</h3>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-medium text-[#111111] mb-12 leading-[1.1] font-display">
              Frequently asked questions about SEO in {data.city}.
            </h2>
            <div className="space-y-2 border-t border-gray-200">
              {data.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="border-b border-gray-200">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full py-6 flex items-center justify-between text-left group"
                    >
                      <span className={`text-lg lg:text-xl font-medium transition-colors pr-8 ${isOpen ? 'text-[#111111]' : 'text-gray-900 group-hover:text-[#F26522]'}`}>
                        {faq.question}
                      </span>
                      <span className={`text-2xl font-light flex-shrink-0 transition-colors ${isOpen ? 'text-[#F26522]' : 'text-gray-400'}`}>
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
                      <p className="text-lg text-gray-600 leading-relaxed pl-0">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── INSIGHTS SLIDER ── */}
      <div data-logo-dark>
        <InsightsSlider limit={4} />
      </div>

      {/* ── FINAL CTA ── */}
      <section className="py-24 lg:py-32 px-5 sm:px-8 lg:px-12 bg-[#050505] border-t border-white/10">
        <div className="max-w-[1440px] mx-auto reveal-up">
          <div className="text-center max-w-[700px] mx-auto">
            <h2 className="text-[clamp(2.2rem,4vw,3.5rem)] font-medium text-white mb-6 leading-[1.1] font-display">
              Ready to dominate search in {data.city}?
            </h2>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed">
              Request a free forensic audit of your {data.city} domain. We will show you exactly where you are losing organic traffic and pipeline revenue — and how we fix it.
            </p>
            <a
              href="/contact"
              className="group inline-flex items-center bg-[#F26522] hover:bg-[#e05a1a] text-white pl-7 pr-2 py-3 transition-colors duration-300"
            >
              <div className="flex flex-col overflow-hidden h-[22px] justify-start items-start relative mr-5">
                <span className="text-[15px] font-semibold leading-[22px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  {data.ctaText}
                </span>
                <span className="text-[15px] font-semibold leading-[22px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">
                  {data.ctaText}
                </span>
              </div>
              <div className="w-9 h-9 bg-white flex items-center justify-center rounded-sm">
                <ArrowRight className="w-5 h-5 text-[#F26522] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45" />
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LocationPage;
