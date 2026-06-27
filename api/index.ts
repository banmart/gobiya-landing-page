import { IncomingMessage } from 'http';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config();

// Define render function type from server bundle
type RenderFn = (url: string) => { html: string };

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseServer = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

function getRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    if ((req as any).body !== undefined) {
      const b = (req as any).body;
      resolve(typeof b === 'string' ? b : JSON.stringify(b));
      return;
    }
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', err => {
      reject(err);
    });
  });
}

interface OutreachEmail {
  subject: string;
  body: string;
}

async function generateOutreachCopy(
  lead: any, 
  gKey: string, 
  systemPrompt?: string, 
  customPrompt?: string
): Promise<OutreachEmail> {
  const defaultSubject = `Improving your ${lead.category || 'Business'} Search Citations & Security`;
  const defaultBody = `<p>We noticed your business, <strong>${lead.company_name}</strong>, has a strong presence in ${lead.location}, but is currently missing a few crucial schema markup tags and security integrations for AI search engine discovery.</p>
<p>We've created a custom pipeline strategy for your firm. Are you available for a quick 10-minute audit next Tuesday?</p>`;

  if (!gKey) {
    console.warn('generateOutreachCopy: GEMINI_API_KEY is not defined.');
    return { subject: defaultSubject, body: defaultBody };
  }

  try {
    const finalSystemPrompt = systemPrompt || `You are Steve Martin, Founder of Gobiya, a premier technical SEO and custom React web development agency.`;
    const defaultCustomPrompt = `Write a highly personalized, direct, engineering-focused cold outreach email to ${lead.contact_name || 'Business Owner'} at ${lead.company_name} located in ${lead.location}. 
Their website is ${lead.website || 'N/A'} and their category is ${lead.category || 'Business'}.

Focus the pitch on evaluating their search overview citation presence (Generative Engine Optimization) and security architecture. 
The tone must be engineering-first, strictly professional, concise (under 100 words), and zero sales fluff.
Propose a quick 15-minute forensic pipeline audit.`;

    const finalCustomPrompt = customPrompt 
      ? customPrompt
          .replace(/\{contact_name\}/g, lead.contact_name || 'Business Owner')
          .replace(/\{company_name\}/g, lead.company_name)
          .replace(/\{location\}/g, lead.location)
          .replace(/\{website\}/g, lead.website || 'N/A')
          .replace(/\{category\}/g, lead.category || 'Business')
      : defaultCustomPrompt;

    const fullPrompt = `${finalSystemPrompt}\n\n${finalCustomPrompt}\n\nProvide your response strictly in JSON format matching this schema:\n{\n  "subject": "A compelling, concise subject line",\n  "body": "The email body in clean HTML format (only <p> and <strong> tags, no inline styles, no header/footer/greeting/signature wraps, as we wrap those separately)"\n}`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${gKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fullPrompt
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              subject: {
                type: 'STRING',
                description: 'A compelling, concise subject line'
              },
              body: {
                type: 'STRING',
                description: 'The email body in clean HTML format (only <p> and <strong> tags, no inline styles, no header/footer/greeting/signature wraps, as we wrap those separately)'
              }
            },
            required: ['subject', 'body']
          },
          temperature: 0.2
        }
      })
    });

    if (res.ok) {
      const data: any = await res.json();
      const contentText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (contentText) {
        let content = contentText.trim();
        if (content.includes('```json')) {
          content = content.split('```json')[1].split('```')[0].trim();
        } else if (content.includes('```')) {
          content = content.split('```')[1].split('```')[0].trim();
        }
        const parsed = JSON.parse(content);
        if (parsed.subject && parsed.body) {
          return {
            subject: parsed.subject,
            body: parsed.body
          };
        }
      } else {
        console.error('No content returned from Gemini API:', JSON.stringify(data));
      }
    } else {
      const errText = await res.text();
      console.error(`Gemini API returned status ${res.status}: ${errText}`);
    }
  } catch (err) {
    console.error('Error generating AI email copy with Gemini:', err);
  }

  return { subject: defaultSubject, body: defaultBody };
}

function getDomainFromUrl(url: string): string {
  if (!url) return '';
  try {
    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }
    const parsed = new URL(cleanUrl);
    let hostname = parsed.hostname;
    if (hostname.startsWith('www.')) {
      hostname = hostname.substring(4);
    }
    return hostname;
  } catch (e) {
    return '';
  }
}

function getDomainFromCompanyName(name: string): string {
  if (!name) return '';
  const cleanName = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 30);
  return cleanName ? `${cleanName}.com` : '';
}

function wrapBrandedEmail(leadName: string, bodyHtml: string, bookingUrl: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Gobiya Outreach</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #050505;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #e5e7eb;
    }
    .wrapper {
      width: 100%;
      background-color: #050505;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #0c0c0c;
      border: 1px solid #1f2937;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
    }
    .header {
      padding: 30px 40px;
      border-bottom: 1px solid #1f2937;
      background: linear-gradient(to right, #0c0c0c, #111111);
    }
    .logo-text {
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.02em;
    }
    .logo-accent {
      color: #F26522;
    }
    .content {
      padding: 40px;
      font-size: 15px;
      line-height: 1.6;
      color: #d1d5db;
    }
    .content p {
      margin-top: 0;
      margin-bottom: 20px;
    }
    .content strong {
      color: #ffffff;
    }
    .cta-container {
      margin: 35px 0;
      text-align: center;
    }
    .cta-button {
      display: inline-block;
      background-color: #F26522;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 14px 28px;
      border-radius: 6px;
      transition: background-color 0.2s ease;
    }
    .signature {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #1f2937;
      font-size: 14px;
      color: #9ca3af;
    }
    .signature-title {
      font-size: 12px;
      color: #F26522;
      font-weight: 600;
      margin-top: 2px;
    }
    .footer {
      padding: 20px 40px 30px 40px;
      background-color: #080808;
      border-top: 1px solid #1f2937;
      text-align: center;
      font-size: 11px;
      color: #4b5563;
    }
    .footer a {
      color: #9ca3af;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <span class="logo-text">GOBIYA<span class="logo-accent">.</span></span>
      </div>
      <div class="content">
        <p>Hello ${leadName || 'Business Owner'},</p>
        
        ${bodyHtml}
        
        <div class="cta-container">
          <a href="${bookingUrl}" target="_blank" class="cta-button">Book Forensic Pipeline Audit</a>
        </div>
        
        <div class="signature">
          <strong>Steve Martin</strong>
          <div class="signature-title">CEO &amp; Lead Growth Engineer</div>
        </div>
      </div>
      <div class="footer">
        <p>Gobiya &copy; 2026. All rights reserved.</p>
        <p>11601 Wilshire Blvd, Los Angeles, CA 90025</p>
        <p>If you prefer not to receive these technical audits, you can <a href="#">unsubscribe here</a>.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function parsePerplexityLeads(rawText: string): any {
  let cleanText = rawText.trim();
  if (cleanText.includes('```json')) {
    cleanText = cleanText.split('```json')[1].split('```')[0].trim();
  } else if (cleanText.includes('```')) {
    cleanText = cleanText.split('```')[1].split('```')[0].trim();
  }
  try {
    return JSON.parse(cleanText);
  } catch (e) {
    const startIdx = cleanText.indexOf('[');
    const endIdx = cleanText.lastIndexOf(']');
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
      const potentialJson = cleanText.substring(startIdx, endIdx + 1);
      try {
        return JSON.parse(potentialJson);
      } catch (err2) {
        console.error("Failed parsing extracted array: ", err2);
      }
    }
    throw new Error("Could not parse valid JSON array from Perplexity: " + e.message);
  }
}

function findFirstArray(obj: any): any[] | null {
  if (Array.isArray(obj)) {
    return obj;
  }
  if (obj && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      if (Array.isArray(obj[key])) {
        return obj[key];
      }
    }
    for (const key of Object.keys(obj)) {
      const res = findFirstArray(obj[key]);
      if (res) return res;
    }
  }
  return null;
}

interface SEOMetadata {
  title: string;
  description: string;
  image?: string;
}

// Outcome-focused metadata lookup map for crawlers and search bots
const metadataMap: Record<string, SEOMetadata> = {
  '/': {
    title: 'Marketing/growth agency in Koreatown: SEO expert, recovery, PR - Gobiya',
    description: "GOBIYA reads Google's algorithm, identifies the penalty vector, and deploys the fix. SEO recovery, GEO, AI-powered growth. Los Angeles, since 2009."
  },
  '/on-page-seo-los-angeles': {
    title: 'On-page SEO agency in LA: schema, entity structure, speed - Gobiya',
    description: "Struggling with organic drops or low conversions? Our elite on-page SEO services in Los Angeles optimize your site's entity structure, schema, speed, and content mapping for Google and AI engines."
  },
  '/local-seo-company-burbank': {
    title: 'Local SEO Company Burbank: Map Pack & Google Business Profile - Gobiya',
    description: 'Local SEO company Burbank — we engineer Google Map Pack dominance, GBP optimization, citation consistency, and review velocity for businesses on San Fernando Boulevard and throughout the Burbank, CA 91501–91510 market.'
  },
  '/creativity': {
    title: 'Creative brand & identity design agency in LA: styling, voice, copy - Gobiya',
    description: 'Express your brand identity and capture market attention with Gobiya. We design custom brand identity systems, write compelling copy, and direct creative concepts.'
  },
  '/performance': {
    title: 'High-performance digital growth & IT dev agency in LA: React, SEO, CRO - Gobiya',
    description: 'Engineer high-speed digital pipelines to scale conversions. Sub-second React/Next.js/Vite development, technical SEO, and conversion optimization.'
  },
  '/relations': {
    title: 'PR & authority building agency in LA: link acquisition, media outreach - Gobiya',
    description: 'Construct sector authority and earn absolute market trust. Manually verified PR, content syndication, and high-quality contextual link building.'
  },
  '/performance/web-development-agency': {
    title: 'Web & IT development agency in LA: React, custom sites, speed - Gobiya',
    description: 'GOBIYA replaces slow page-builders with custom, hand-coded React and Next.js websites — 100/100 Core Web Vitals, sub-second loads, zero templates, engineered to convert and rank natively.'
  },
  '/performance/native-crm-agency': {
    title: 'PPC & Lead generation agency in LA: CRM integrations, pipeline, ads - Gobiya',
    description: 'We build custom CRM website integrations directly into your codebase. Stop paying monthly software fees and own your pipeline data.'
  },
  '/performance/seo-discoverability-agency': {
    title: 'SEO & Discoverability agency in LA: SEO expert, recovery, audit - Gobiya',
    description: 'We build technical SEO for React websites into the codebase, optimizing crawlability, rendering speed, and AI citations.'
  },
  '/performance/blockchain-web3-development-agency': {
    title: 'Blockchain & Web3 agency in LA: smart contracts, dApps, tokens - Gobiya',
    description: 'Our blockchain Web3 development services integrate smart contracts, dApps, and secure on-chain token functions into React apps.'
  },
  '/performance/ai-prospect-scraper-agency': {
    title: 'AI Prospect Scraper agency in LA: lead scraping, automation, data - Gobiya',
    description: 'Our native CRM features an AI prospect scraper that extracts target contact profiles and coordinates automated outbound email campaigns.'
  },
  '/performance/ai-llms-business-agency': {
    title: 'AI & LLM systems agency in LA: office automation, custom models, workflows - Gobiya',
    description: 'We integrate custom AI models and secure LLMs directly into your everyday office tasks. Automate document parsing, email replies, and CRM syncing with complete data privacy.'
  },
  '/performance/google-ads-ppc-strategy-agency': {
    title: 'Google Ads & PPC strategy agency in LA: paid acquisition, ROAS, targeting - Gobiya',
    description: 'Stop burning cash on generic ad campaigns. We build precision-targeted paid pipelines that capture high-intent buyers, aggressively lower customer acquisition costs, and maximize ROAS.'
  },
  '/performance/cro-ux-analysis-agency': {
    title: 'CRO & UX analysis agency in LA: funnel optimization, conversion lift - Gobiya',
    description: 'We isolate funnel friction and redesign user flows to lift conversions. Data-backed CRO analysis across landing pages, checkout flows, and lead capture forms.'
  },
  '/relations/authority-building-agency': {
    title: 'Authority & PR agency in LA: backlink acquisition, citations, outreach - Gobiya',
    description: 'Build search engine trust with high-quality, relevant backlink acquisition and structured localized entity citations, engineered for long-term organic authority.'
  },
  '/creativity/brand-identity-strategy-agency': {
    title: 'Brand identity strategy agency in LA: brand design, voice, positioning - Gobiya',
    description: 'We define the unique essence, voice, and visual character of your business. Custom brand identity systems that command attention and drive conversion.'
  },
  '/creativity/communication-concepts-agency': {
    title: 'Communication concepts agency in LA: campaigns, storytelling, messaging - Gobiya',
    description: 'Tell your story through dynamic visual and textual concepts. We develop integrated communication campaigns that turn attention into pipeline.'
  },
  '/creativity/seo-web-copywriting-agency': {
    title: 'SEO & web copywriting agency in LA: landing pages, blog, conversion copy - Gobiya',
    description: 'We write content that engages human hearts and ranks in algorithms. SEO-optimized copywriting for websites, landing pages, and campaigns that turns readers into buyers.'
  },
  '/creativity/creative-art-direction-agency': {
    title: 'Creative art direction agency in LA: styling, imagery, layout, motion - Gobiya',
    description: 'We coordinate styling, imagery, layout, and motion for your creative assets. End-to-end art direction for brand campaigns, digital ads, and content production.'
  },
  '/creativity/social-media-management-agency': {
    title: 'Social media management agency in LA: content, community, growth - Gobiya',
    description: 'We grow active community loops around your core brand message. Strategic social content planning, production, and analytics for sustained audience growth.'
  },
  '/about': {
    title: 'SEO & Marketing agency in LA: Gobiya team, Steve Martin, experience - Gobiya',
    description: 'GOBIYA is a precision-engineered search visibility and digital solutions firm, founded 2012 in Los Angeles and led by Steve Martin — 25+ years bridging full-stack engineering and organic search.'
  },
  '/case-studies': {
    title: 'SEO & growth case studies in LA: Smile Center, Livescan, results - Gobiya',
    description: 'Real clients, real numbers. SmileCenter Dentistry: 5x patient inquiries and 213K impressions. American Livescan: 3x bookings after a legacy migration. Data-backed search recovery and pipeline case studies from GOBIYA.'
  },
  '/approach': {
    title: 'Forensic SEO & growth approach in LA: entity structure, GEO, HCU recovery - Gobiya',
    description: "GOBIYA's operating model for algorithmic dominance: entity-based indexing, topical authority and schema engineering, Generative Engine Optimization (GEO) for LLM visibility, and pipeline-first conversion architecture."
  },
  '/case-studies/smile-center-dentistry': {
    title: 'Dental SEO Case Study: 5x Patient Inquiries | Gobiya',
    description: 'How we rebuilt SmileCenter\'s website on React/Vite, architected individual location pages for Southern California markets, and drove a 5x increase in form completions and phone calls.'
  },
  '/case-studies/american-livescan': {
    title: 'Local SEO Case Study: Tripled Online Bookings | Gobiya',
    description: 'How we replaced a legacy .htm site with a clean-URL architecture, optimized the Google Business Profile, and tripled online appointments and phone calls for a high-volume LA fingerprinting service.'
  },
  '/insights': {
    title: 'SEO & Algorithmic Intelligence in LA: insights, core updates, briefs - Gobiya',
    description: 'Advanced tactical intelligence on Google and AI search: algorithm update analysis, GEO and LLM citation tactics, entity SEO, technical recovery briefs, and pipeline engineering field notes from GOBIYA.'
  },
  '/insights/how-to-apply-behavioral-psychology-principles-to-high-ticket-b2b-landing-page-wireframes-to-decrease-friction': {
    title: 'How to Apply Behavioral Psychology Principles to High Ticket B2B Landing Page Wireframes to Decrease Friction | Gobiya',
    description: 'Learn how to apply behavioral psychology principles like the Fogg Behavior Model and Hick\'s Law to high-ticket B2B landing page wireframes to decrease friction.',
    image: '/images/article-behavioral-psychology-b2b-landing-page-wireframes-thumbnail.webp'
  },
  '/insights/multi-location-websites-for-franchises': {
    title: 'Multi Location Websites for Franchises: The 2026 Playbook | Gobiya',
    description: 'A technical guide to multi-location websites for franchises. Learn subdirectory URL configuration, page cannibalization avoidance, and SEO governance.',
    image: '/images/article-multi-location-websites-franchises-thumbnail.webp'
  },
  '/insights/dental-seo-agency': {
    title: 'Dental SEO Agency Evaluation Checklist & KPIs | Gobiya',
    description: 'Avoid costly hiring mistakes. Use our comprehensive evaluation checklist for dental SEO agencies, covering contract traps, KPIs, and case study audits.',
    image: '/images/article-dental-seo-agency.png'
  },
  '/insights/brand-entity-extraction-perception-drift': {
    title: 'Brand Entity Extraction & Perception Drift | Gobiya',
    description: 'How brand entity extraction works across Google, Bing, Wikidata, and LLM knowledge graphs — and how to detect and correct perception drift.',
    image: '/images/article-brand-entity-extraction-perception-drift.webp'
  },
  '/insights/introducing-open-knowledge-format-why-it-matters-for-ai-ready-businesses': {
    title: 'Introducing the Open Knowledge Format: Why It Matters for AI-Ready Businesses | Gobiya',
    description: "Google Cloud's new open spec, OKF, formalizes the 'LLM-wiki' pattern into a portable, vendor-neutral standard for the knowledge AI agents actually need.",
    image: '/images/article-introducing-open-knowledge-format-thumbnail.webp'
  },
  '/contact': {
    title: 'Contact SEO & growth agency in LA: book call, free audit, locations - Gobiya',
    description: 'Reach GOBIYA in Los Angeles. Call 323-744-1338, email hello@gobiya.com, or fill out our contact form for an SEO audit, web development, or AI growth consultation.'
  },
  '/company/careers': {
    title: 'Growth Engineering Careers: Join Our Dev Team | Gobiya',
    description: 'Explore growth engineering jobs at Gobiya. We are hiring React developers, technical SEO specialists, and sales engineers. Apply now.'
  },
  '/book': {
    title: 'Book forensic SEO audit in LA: 15-min review, search recovery, CRM audit - Gobiya',
    description: 'Book pipeline strategy call with Steve Martin, CEO & lead engineer. Audit search performance, local map visibility, and CRM setup.'
  },
  '/book-call': {
    title: 'Book forensic SEO audit in LA: 15-min review, search recovery, CRM audit - Gobiya',
    description: 'Book pipeline strategy call with Steve Martin, CEO & lead engineer. Audit search performance, local map visibility, and CRM setup.'
  },
  '/capabilities': {
    title: 'SEO & Web development capabilities in LA: custom CRM, React, authority - Gobiya',
    description: 'GOBIYA builds fast, modern web applications with native CRM pipelines, built-in SEO discoverability, AI prospect automation, and custom Web3 integrations — one codebase, complete data ownership.'
  },
  '/insights/gobiya-vs-enterprise-seo-agencies': {
    title: 'Enterprise SEO vs Gobiya: Speed & Cost Compare | Gobiya',
    description: 'We compare enterprise SEO agencies vs Gobiya, showing the speed, cost, and CRM pipeline differences for B2B brands.',
    image: '/images/enterprise-seo-agencies-comparison.png'
  },
  '/insights/automated-b2b-sales-pipeline-seo': {
    title: 'Automate B2B Sales Pipelines via AI Citations | Gobiya',
    description: 'Integrate B2B sales pipeline automation with search intent. Learn how AI citation share decides who gets on the buyer shortlist.',
    image: '/images/b2b-sales-pipeline-automation-citation-share.png'
  },
  '/insights/automated-lead-generation-seo': {
    title: 'Automate Lead Generation: Search Intent Maps | Gobiya',
    description: 'Set up automated lead generation by mapping high-intent search clusters to your B2B pipeline to drive closed sales, not just page views.',
    image: '/images/automated-lead-generation-intent-mapping-chart.png'
  },
  '/insights/outbound-seo-prospecting': {
    title: 'Outbound SEO Prospecting: Target Search Intent | Gobiya',
    description: 'Use outbound SEO prospecting to monitor search intent triggers. Learn how to pitch buyers at the exact moment they search for your service.',
    image: '/images/outbound-seo-prospecting-intent-signals.png'
  },
  '/insights/b2b-sales-pipeline-automation': {
    title: 'Automate B2B Sales: Connect Search to CRM | Gobiya',
    description: 'Configure B2B sales pipeline automation workflows. Learn how to connect search intent, lead data enrichment, and automated email campaigns.',
    image: '/images/b2b-sales-pipeline-automation-outreach.png'
  },
  '/insights/best-seo-agency-for-b2b-brands': {
    title: 'Select the Best B2B SEO Agency: 2026 Checklist | Gobiya',
    description: 'How to select the best SEO agency for B2B brands. Follow our evaluation checklist to verify technical authority, case studies, and contracts.',
    image: '/images/best-seo-agency-for-b2b-checklist.png'
  },
  '/insights/seo-for-b2b-lead-generation': {
    title: 'SEO for B2B Lead Gen: Win the Buying Committee | Gobiya',
    description: 'Learn how to deploy SEO for B2B lead generation by mapping landing pages to the full buying committee, satisfying all key decision-makers.',
    image: '/images/seo-for-b2b-lead-generation-committee-structure.png'
  },
  '/insights/b2b-seo-agency': {
    title: 'B2B SEO Agency: Focus on Pipeline Attribution | Gobiya',
    description: 'Partner with a B2B SEO agency built around pipeline value, not just search volume. Verify our committee mapping and conversion playbooks.',
    image: '/images/b2b-seo-agency-funnel-strategy-session.png'
  },
  '/insights/local-seo': {
    title: 'Local SEO Strategy: Dominate the 3-Pack Maps | Gobiya',
    description: 'Optimize your search presence with our local SEO strategy. Learn the weekly rhythm and maps pack audit tactics to win local organic rankings.',
    image: '/images/local-seo-service-maps-performance.png'
  },
  '/insights/local-seo-explained': {
    title: 'Local SEO Explained: Dominate Search in 90 Days | Gobiya',
    description: 'Our local SEO explained playbook delivers a 90-day execution framework. Master business signals, citations, and tracking to dominate local grids.',
    image: '/images/article-local-seo-explained.png'
  },
  '/insights/b2b-organic-traffic-growth': {
    title: 'B2B Organic Traffic: Build CRM Pipeline Value | Gobiya',
    description: 'Why B2B organic traffic is decoupling from pipeline revenue—and how to target high-intent search clusters to build pipeline value.',
    image: '/images/article-b2b-organic-traffic-growth.webp'
  },
  '/insights/multi-location-seo-website-structure': {
    title: 'Multi-Location SEO: Design URL Hierarchies | Gobiya',
    description: 'Learn to structure a multi-location SEO website structure that prevents cannibalization, consolidates link equity, and ranks every city page.',
    image: '/images/multi-location-seo-structure-url-hierarchy.png'
  },
  '/insights/best-website-structure-multiple-locations-different-cities': {
    title: 'Best Website Structure for Multiple Locations | Gobiya',
    description: 'Our guide details the best website structure multiple locations setup. Compare subdirectory vs subdomain hierarchies for localized organic growth.',
    image: '/images/website-structure-for-multiple-locations-setup.png'
  },
  '/insights/google-business-profile-optimization': {
    title: 'Google Business Profile: Suspensions & Audits | Gobiya',
    description: 'Learn our Google Business Profile optimization checklist to recover suspended profiles, appeal algorithmic soft bans, and verify map listings.',
    image: '/images/google-business-profile-optimization-visibility.png'
  },
  '/insights/can-a-site-fully-recover-from-a-google-core-update': {
    title: 'Google Core Update Recovery: Restore Full Traffic | Gobiya',
    description: 'Our Google core update recovery guide details the timeline, content pruning strategies, and quality updates needed to restore search traffic.',
    image: '/images/google-core-update-recovery-traffic-charts.png'
  },
  '/insights/google-manual-action-removal-agency-caused-penalty': {
    title: 'Remove Google Manual Actions: Reconsider Guide | Gobiya',
    description: 'Use our Google manual action removal checklist to audit link profiles, document cleanup, and submit a successful reconsideration appeal.',
    image: '/images/google-manual-action-removal-recovery-checklist.png'
  },
  '/insights/what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty': {
    title: 'Manual Action vs Algorithmic Penalty: Diagnostic | Gobiya',
    description: 'Understand manual action vs algorithmic penalty differences, Search Console reports, and step-by-step diagnostic checklists for recovery.',
    image: '/images/manual-action-vs-algorithmic-penalty-checklist.png'
  },
  '/insights/chatgpt-vs-google-for-business-discovery': {
    title: 'ChatGPT vs Google Search: Customer Discovery | Gobiya',
    description: 'Comparing ChatGPT vs Google search discovery rates. Learn how to optimize your brand footprint to win both AI summaries and clicks.',
    image: '/images/chatgpt-vs-google-search-conversion-rates.png'
  },
  '/insights/how-do-b2b-companies-use-seo-to-generate-predictable-revenue': {
    title: 'B2B Pipeline Revenue: How SEO Drives B2B Leads | Gobiya',
    description: 'Learn how to connect search clusters to B2B pipeline revenue, map content to the buying committee, and scale inbound conversions.',
    image: '/images/b2b-pipeline-revenue-performance-dashboard.png'
  },
  '/insights/what-data-sources-do-llms-crawl-to-verify-b2b-company-information': {
    title: 'LLM Company Verification: Data Sources AI Uses | Gobiya',
    description: 'Discover how ChatGPT and Claude handle LLM company verification by crawling Wikidata, LinkedIn, and review portals to establish trust.',
    image: '/images/llm-company-verification-data-sources.png'
  },
  '/insights/what-is-the-difference-between-google-knowledge-graph-optimization-and-geo': {
    title: 'Knowledge Graph Optimization vs GEO: AI splits | Gobiya',
    description: 'Understand how Knowledge Graph optimization differs from GEO, how entity resolution works, and how to secure AI citation visibility.',
    image: '/images/knowledge-graph-optimization-vs-geo-model.png'
  },
  '/insights/seo-case-study-traffic-recovery': {
    title: 'SEO Case Study: Recover 320% Traffic Growth | Gobiya',
    description: 'A forensic SEO case study on traffic recovery after Google\'s March 2026 dual-update event. Learn the exact 12-week diagnostic sequence and fix order Gobiya used.',
    image: '/images/seo-case-study-traffic-recovery-growth.png'
  },
  '/insights/what-is-generative-engine-optimization-and-how-does-it-work': {
    title: 'Generative Engine Optimization (GEO): AI Guide | Gobiya',
    description: 'A complete technical guide to Generative Engine Optimization (GEO). Learn how RAG-based AI search engines cite content and how to optimize.',
    image: '/images/generative-engine-optimization-rag-citations.png'
  },
  '/insights/are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks': {
    title: 'AI Search Scraping: API vs Server HTML Blocks | Gobiya',
    description: 'Understand how AI search scraping works. Learn why AI crawlers bypass JavaScript APIs and read raw public HTML blocks instead.',
    image: '/images/ai-search-engines-scraping-html-data-comparison.png'
  },
  '/about/steve-martin': {
    title: 'Steve Martin: Lead Growth Engineer & Founder | Gobiya',
    description: 'Credentials and author profile for Steve Martin. Over 15 years engineering search engine dominance, custom React platforms, and sales pipeline automation.'
  },
  '/author/steve-martin': {
    title: 'Steve Martin: Lead Growth Engineer & Founder | Gobiya',
    description: 'Credentials and author profile for Steve Martin. Over 15 years engineering search engine dominance, custom React platforms, and sales pipeline automation.'
  }
};

export default async function handler(req: IncomingMessage, res: any) {
  try {
    const url = req.url || '/';
    const parsedUrl = new URL(url, 'https://www.gobiya.com');
    const pathname = parsedUrl.pathname.toLowerCase().replace(/\/$/, '') || '/';

    // ── CANONICAL URL REDIRECTS (Casing & Trailing Slashes) ──
    if (!pathname.startsWith('/api')) {
      let targetPath = parsedUrl.pathname;
      
      // Enforce lowercase paths
      if (targetPath !== targetPath.toLowerCase()) {
        targetPath = targetPath.toLowerCase();
      }
      
      // Enforce no trailing slash (except for '/')
      if (targetPath !== '/' && targetPath.endsWith('/')) {
        targetPath = targetPath.replace(/\/$/, '');
      }
      
      if (targetPath !== parsedUrl.pathname) {
        res.writeHead(301, { Location: targetPath + parsedUrl.search });
        res.end();
        return;
      }
    }


    // ── CONTACT FORM ENDPOINT ──
    if (pathname === '/api/contact' && (req.method === 'POST' || req.method === 'OPTIONS')) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
      try {
        const bodyStr = await getRequestBody(req);
        const body = JSON.parse(bodyStr);
        const { name, email, phone, company, message, service, website } = body;
        if (!name || !email) {
          res.writeHead(400);
          res.end(JSON.stringify({ success: false, error: 'Name and email are required.' }));
          return;
        }

        const categoryText = service 
          ? (message ? `${service}: ${message}` : service)
          : (message || 'contact-form');

        const lead = {
          company_name: company || name,
          contact_name: name,
          email,
          phone: phone || '',
          website: website || '',
          category: categoryText,
          location: 'Los Angeles, CA',
          status: 'New Lead'
        };

        if (supabaseServer) {
          const { error: dbError } = await supabaseServer.from('prospects').upsert([lead], { onConflict: 'email' });
          if (dbError) throw dbError;
        }

        const rKey = process.env.RESEND_API_KEY || '';
        if (rKey) {
          const htmlEmail = `
            <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
              <h2 style="color: #F26522; border-bottom: 2px solid #F26522; padding-bottom: 10px; margin-top: 0;">New Lead Received</h2>
              <p><strong>Form Source:</strong> ${service || 'Contact Form'}</p>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Company:</strong> ${company || 'N/A'}</p>
              <p><strong>Website/Domain:</strong> ${website || 'N/A'}</p>
              <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #F26522; border-radius: 4px;">
                <p style="margin: 0; font-weight: bold;">Message / Details:</p>
                <p style="margin: 10px 0 0 0; white-space: pre-wrap; color: #333;">${message || 'No message provided.'}</p>
              </div>
            </div>
          `;

          const resendRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${rKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: 'Gobiya Forms <onboarding@resend.dev>',
              to: ['steve@gobiya.com'],
              subject: `[Gobiya Lead] New submission from ${name}`,
              html: htmlEmail
            })
          });

          if (!resendRes.ok) {
            const errJson = await resendRes.json().catch(() => ({}));
            console.error('[RESEND] notification failed:', errJson);
          }
        }

        res.writeHead(200);
        res.end(JSON.stringify({ success: true }));
      } catch (e: any) {
        res.writeHead(500);
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
      return;
    }

    // ── B2B LEADS PROSPECTOR API ENDPOINTS ──
    if (pathname.startsWith('/api/prospector')) {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
      }

      if (pathname === '/api/prospector/login' && req.method === 'POST') {
        const bodyStr = await getRequestBody(req);
        const { username, password } = JSON.parse(bodyStr);
        if (username === 'admin' && (password === 'gobiya2026!' || password === 'gobya2026!')) {
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, token: 'gobiya-jwt-session-token-2026' }));
        } else {
          res.writeHead(401);
          res.end(JSON.stringify({ success: false, error: 'Invalid username or password' }));
        }
        return;
      }

      if (pathname === '/api/prospector/config' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
          success: true,
          hasPerplexityKey: !!(process.env.PERPLEXITY_API_KEY),
          hasResendKey: !!(process.env.RESEND_API_KEY)
        }));
        return;
      }

      if (pathname === '/api/prospector/leads' && req.method === 'GET') {
        try {
          if (!supabaseServer) throw new Error('Supabase database is not configured. Live mode requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
          const { data, error } = await supabaseServer
            .from('prospects')
            .select('*')
            .order('created_at', { ascending: false });
          if (error) throw error;
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, leads: data || [] }));
        } catch (e: any) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
        return;
      }

      if (pathname === '/api/prospector/leads' && req.method === 'DELETE') {
        try {
          if (!supabaseServer) throw new Error('Supabase database is not configured. Live mode requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
          const { error } = await supabaseServer
            .from('prospects')
            .delete()
            .neq('id', '00000000-0000-0000-0000-000000000000');
          if (error) throw error;
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'All leads cleared.' }));
        } catch (e: any) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
        return;
      }

      if (pathname === '/api/prospector/track-click' && req.method === 'POST') {
        try {
          const bodyStr = await getRequestBody(req);
          const { email } = JSON.parse(bodyStr);
          if (email && supabaseServer) {
            const { error } = await supabaseServer
              .from('prospects')
              .update({ status: 'clicked' })
              .eq('email', email);
            if (error) throw error;
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, message: 'Click tracked successfully.' }));
          } else {
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, message: 'Click tracking simulated.' }));
          }
        } catch (e: any) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
        return;
      }

      if (pathname === '/api/prospector/track-booking' && req.method === 'POST') {
        try {
          const bodyStr = await getRequestBody(req);
          const { email } = JSON.parse(bodyStr);
          if (email && supabaseServer) {
            const { error } = await supabaseServer
              .from('prospects')
              .update({ status: 'booked' })
              .eq('email', email);
            if (error) throw error;
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, message: 'Booking tracked successfully.' }));
          } else {
            res.writeHead(200);
            res.end(JSON.stringify({ success: true, message: 'Booking tracking simulated.' }));
          }
        } catch (e: any) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
        return;
      }

      if (pathname === '/api/prospector/lead' && req.method === 'POST') {
        try {
          const bodyStr = await getRequestBody(req);
          const lead = JSON.parse(bodyStr);
          if (!lead.company_name || !lead.email) {
            res.writeHead(400);
            res.end(JSON.stringify({ success: false, error: 'company_name and email are required fields.' }));
            return;
          }
          const newLead = {
            company_name: lead.company_name,
            contact_name: lead.contact_name || 'Business Owner',
            email: lead.email,
            phone: lead.phone || '',
            website: lead.website || '',
            category: lead.category || 'general',
            location: lead.location || 'N/A',
            status: lead.status || 'New Lead'
          };
          if (!supabaseServer) throw new Error('Supabase database is not configured. Live mode requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
          const { data, error } = await supabaseServer
            .from('prospects')
            .insert([newLead])
            .select();
          if (error) throw error;
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, lead: data?.[0] || newLead }));
        } catch (e: any) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
        return;
      }

      if (pathname === '/api/prospector/lead' && req.method === 'PUT') {
        try {
          const bodyStr = await getRequestBody(req);
          const lead = JSON.parse(bodyStr);
          if (!lead.email) {
            res.writeHead(400);
            res.end(JSON.stringify({ success: false, error: 'email is required to update a lead.' }));
            return;
          }
          const updateData: any = {};
          if (lead.company_name !== undefined) updateData.company_name = lead.company_name;
          if (lead.contact_name !== undefined) updateData.contact_name = lead.contact_name;
          if (lead.phone !== undefined) updateData.phone = lead.phone;
          if (lead.website !== undefined) updateData.website = lead.website;
          if (lead.category !== undefined) updateData.category = lead.category;
          if (lead.location !== undefined) updateData.location = lead.location;
          if (lead.status !== undefined) updateData.status = lead.status;

          if (!supabaseServer) throw new Error('Supabase database is not configured. Live mode requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
          let query = supabaseServer.from('prospects').update(updateData);
          if (lead.id) {
            query = query.eq('id', lead.id);
          } else {
            query = query.eq('email', lead.email);
          }
          const { data, error } = await query.select();
          if (error) throw error;
          res.writeHead(200);
          res.end(JSON.stringify({ success: true, lead: data?.[0] || lead }));
        } catch (e: any) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
        return;
      }

      if (pathname === '/api/prospector/lead' && req.method === 'DELETE') {
        try {
          const id = parsedUrl.searchParams.get('id');
          const email = parsedUrl.searchParams.get('email');
          
          let targetId = id;
          let targetEmail = email;

          if (!targetId && !targetEmail) {
            const bodyStr = await getRequestBody(req).catch(() => '{}');
            const body = JSON.parse(bodyStr || '{}');
            targetId = body.id;
            targetEmail = body.email;
          }

          if (!targetId && !targetEmail) {
            res.writeHead(400);
            res.end(JSON.stringify({ success: false, error: 'id or email is required to delete a lead.' }));
            return;
          }

          if (!supabaseServer) throw new Error('Supabase database is not configured. Live mode requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
          let query = supabaseServer.from('prospects').delete();
          if (targetId) {
            query = query.eq('id', targetId);
          } else {
            query = query.eq('email', targetEmail);
          }
          const { error } = await query;
          if (error) throw error;

          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'Lead deleted successfully.' }));
        } catch (e: any) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
        return;
      }

      if (pathname === '/api/prospector/send-email' && req.method === 'POST') {
        try {
          const bodyStr = await getRequestBody(req);
          const { lead, resendKey, systemPrompt, customPrompt } = JSON.parse(bodyStr);
          if (!lead || !lead.email) {
            res.writeHead(400);
            res.end(JSON.stringify({ success: false, error: 'lead email is required.' }));
            return;
          }
          const rKey = resendKey || process.env.RESEND_API_KEY || '';
          const gKey = process.env.GEMINI_API_KEY || '';

          const emailData = await generateOutreachCopy(lead, gKey, systemPrompt, customPrompt);
          
          if (rKey) {
            const host = req.headers.host || 'www.gobiya.com';
            const protocol = req.headers['x-forwarded-proto'] || 'http';
            const bookingUrl = `${protocol}://${host}/book?email=${encodeURIComponent(lead.email)}&company=${encodeURIComponent(lead.company_name)}&firstName=${encodeURIComponent(lead.contact_name || '')}&utm_source=prospector&utm_medium=email&utm_campaign=outreach`;
            
            const htmlEmail = wrapBrandedEmail(lead.contact_name || 'Business Owner', emailData.body, bookingUrl);

            const resendRes = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${rKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                from: 'Gobiya AI Onboarding <onboarding@resend.dev>',
                to: [lead.email],
                subject: emailData.subject,
                html: htmlEmail
              })
            });

            if (!resendRes.ok) {
              const errJson = await resendRes.json().catch(() => ({}));
              throw new Error(`Resend API error: ${JSON.stringify(errJson)}`);
            }
          }

          if (supabaseServer) {
            const { error } = await supabaseServer
              .from('prospects')
              .update({ status: 'welcome_sent' })
              .eq('email', lead.email);
            if (error) throw error;
          }

          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            message: rKey ? 'Email sent successfully.' : 'Email generation simulated successfully.',
            subject: emailData.subject,
            body: emailData.body
          }));
        } catch (e: any) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
        return;
      }

      if (pathname === '/api/prospector/test-email' && req.method === 'POST') {
        try {
          const bodyStr = await getRequestBody(req);
          const { testEmail, resendKey, systemPrompt, customPrompt } = JSON.parse(bodyStr);
          if (!testEmail) {
            res.writeHead(400);
            res.end(JSON.stringify({ success: false, error: 'testEmail is required.' }));
            return;
          }
          const rKey = resendKey || process.env.RESEND_API_KEY || '';
          const gKey = process.env.GEMINI_API_KEY || '';

          const mockLead = {
            company_name: 'Acme Test Corp',
            contact_name: 'John Doe',
            email: testEmail,
            phone: '(555) 019-2834',
            website: 'https://example-test-acme.com',
            category: 'technical testing',
            location: 'Los Angeles, CA'
          };

          const emailData = await generateOutreachCopy(mockLead, gKey, systemPrompt, customPrompt);
          
          if (rKey) {
            const host = req.headers.host || 'www.gobiya.com';
            const protocol = req.headers['x-forwarded-proto'] || 'http';
            const bookingUrl = `${protocol}://${host}/book?email=${encodeURIComponent(mockLead.email)}&company=${encodeURIComponent(mockLead.company_name)}&firstName=${encodeURIComponent(mockLead.contact_name)}&utm_source=prospector&utm_medium=email&utm_campaign=outreach`;
            
            const htmlEmail = wrapBrandedEmail(mockLead.contact_name, emailData.body, bookingUrl);

            const resendRes = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${rKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                from: 'Gobiya AI Onboarding <onboarding@resend.dev>',
                to: [testEmail],
                subject: `[TEST] ${emailData.subject}`,
                html: htmlEmail
              })
            });

            if (!resendRes.ok) {
              const errJson = await resendRes.json().catch(() => ({}));
              throw new Error(`Resend API error: ${JSON.stringify(errJson)}`);
            }
          }

          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            message: rKey ? 'Test email dispatched successfully.' : 'Test email generation simulated.',
            subject: emailData.subject,
            body: emailData.body
          }));
        } catch (e: any) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
        return;
      }

      if (pathname === '/api/prospector/scrape' && req.method === 'POST') {
        try {
          const bodyStr = await getRequestBody(req);
          const { category, location, numResults, perplexityKey, resendKey, systemPrompt, customPrompt, focusPrompt } = JSON.parse(bodyStr);

          const limit = numResults || 5;
          const pKey = perplexityKey || process.env.PERPLEXITY_API_KEY || '';
          const rKey = resendKey || process.env.RESEND_API_KEY || '';
          const gKey = process.env.GEMINI_API_KEY || '';

          let leads: any[] = [];
          const logMessages: string[] = ['[INFO] Initiating search query...'];

          if (!pKey) {
            throw new Error("Perplexity API Key is required to find live leads. Set it in your configuration.");
          }

          let finalValidLeads: any[] = [];
          let excludedNames: string[] = [];
          let attempt = 0;
          const maxAttempts = 3;

          while (finalValidLeads.length < limit && attempt < maxAttempts) {
            attempt++;
            logMessages.push(`[INFO] Calling Perplexity API for model sonar (Attempt ${attempt}/${maxAttempts})...`);
            
            let currentPrompt = focusPrompt 
              ? focusPrompt.replace(/\{limit\}/g, String(limit)).replace(/\{category\}/g, category).replace(/\{location\}/g, location)
              : `Find exactly ${limit} active ${category} businesses in ${location}. You MUST ONLY include businesses that have a publicly verifiable contact email address. If a business does not have a real email address, SKIP it and find another one. Do NOT make up or construct generic emails. Return a JSON array of objects, each containing: company_name, contact_name, email, phone, website, category, location. Avoid wrapping with text other than json.`;

            if (excludedNames.length > 0) {
              currentPrompt += `\n\nCRITICAL: DO NOT include any of the following businesses because they did not have valid emails in the previous attempt: ${excludedNames.slice(-15).join(', ')}`;
            }

            const perplexityRes = await fetch('https://api.perplexity.ai/chat/completions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${pKey}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                model: 'sonar',
                messages: [
                  {
                    role: 'system',
                    content: 'You are a professional B2B lead generation assistant. Return ONLY valid JSON format in the response. No markdown wrappers other than maybe standard json blocks.'
                  },
                  {
                    role: 'user',
                    content: currentPrompt
                  }
                ]
              })
            });

            if (!perplexityRes.ok) {
              logMessages.push(`[ERROR] Perplexity API returned status ${perplexityRes.status}`);
              break;
            }

            const resData: any = await perplexityRes.json();
            const text = resData.choices[0].message.content;
            
            const parsedObj = parsePerplexityLeads(text);
            const extractedLeads = findFirstArray(parsedObj);
            
            if (Array.isArray(extractedLeads)) {
              for (const lead of extractedLeads) {
                const rawEmail = lead.email ? String(lead.email).trim() : '';
                if (!rawEmail || rawEmail.toLowerCase() === 'null' || rawEmail.toLowerCase() === 'undefined' || !rawEmail.includes('@') || rawEmail.endsWith('.example.com')) {
                  logMessages.push(`[WARNING] Skipping lead "${lead.company_name || 'Unnamed Company'}" — missing or invalid email address.`);
                  if (lead.company_name) excludedNames.push(lead.company_name);
                  continue;
                }
                
                // Avoid duplicates in valid leads
                if (!finalValidLeads.find(l => l.email === rawEmail)) {
                  finalValidLeads.push(lead);
                }
              }
            } else {
              logMessages.push(`[ERROR] Could not parse Perplexity response as a valid JSON array on attempt ${attempt}.`);
            }

            if (finalValidLeads.length >= limit) {
              logMessages.push(`[SUCCESS] Found enough valid leads (${finalValidLeads.length}).`);
              break;
            } else if (attempt < maxAttempts) {
              logMessages.push(`[INFO] Only found ${finalValidLeads.length}/${limit} valid leads. Retrying for more...`);
            }
          }

          const savedLeads: any[] = [];
          for (const lead of finalValidLeads.slice(0, limit)) {
            const rawEmail = lead.email ? String(lead.email).trim() : '';

            logMessages.push(`[DATABASE] Ingesting lead: ${lead.company_name} (${rawEmail})...`);
            
            const databaseLead = {
              company_name: lead.company_name,
              contact_name: lead.contact_name || 'Business Owner',
              email: rawEmail,
              phone: lead.phone || '',
              website: lead.website || '',
              category: lead.category || category,
              location: lead.location || location,
              status: 'new'
            };

            if (!supabaseServer) throw new Error('Supabase database is not configured. Live mode requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
            
            const { data, error } = await supabaseServer
              .from('prospects')
              .upsert([databaseLead], { onConflict: 'email' })
              .select();
              
            if (error) {
              logMessages.push(`[ERROR] Database failure for ${rawEmail}: ${error.message}`);
              continue;
            } else if (data && data[0]) {
              savedLeads.push(data[0]);
            }

            if (rKey) {
              logMessages.push(`[RESEND] Triggering Resend welcome email to ${rawEmail}...`);
              
              logMessages.push(`[GEMINI] Generating AI personalized copy with Gemini for ${lead.company_name}...`);
              const emailData = await generateOutreachCopy(lead, gKey, systemPrompt, customPrompt);
              
              const host = req.headers.host || 'www.gobiya.com';
              const protocol = req.headers['x-forwarded-proto'] || 'http';
              const bookingUrl = `${protocol}://${host}/book?email=${encodeURIComponent(rawEmail)}&company=${encodeURIComponent(lead.company_name)}&firstName=${encodeURIComponent(lead.contact_name || '')}&utm_source=prospector&utm_medium=email&utm_campaign=outreach`;
              
              const htmlEmail = wrapBrandedEmail(lead.contact_name || 'Business Owner', emailData.body, bookingUrl);

              const resendRes = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${rKey}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  from: 'Gobiya AI Onboarding <onboarding@resend.dev>',
                  to: [rawEmail],
                  subject: emailData.subject,
                  html: htmlEmail
                })
              });

              if (resendRes.ok) {
                logMessages.push(`[SUCCESS] Welcome email sent to ${rawEmail} successfully.`);
                if (supabaseServer) {
                  await supabaseServer
                    .from('prospects')
                    .update({ status: 'welcome_sent' })
                    .eq('email', rawEmail);
                }
                databaseLead.status = 'welcome_sent';
              } else {
                const errJson = await resendRes.json().catch(() => ({}));
                logMessages.push(`[ERROR] Resend error for ${rawEmail}: ${JSON.stringify(errJson)}`);
              }
            } else {
              logMessages.push(`[RESEND] Resend API Key omitted. Simulating welcome email dispatch to ${rawEmail}...`);
              databaseLead.status = 'welcome_sent';
            }
          }

          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            leads: savedLeads,
            logs: logMessages
          }));
        } catch (e: any) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
        return;
      }

      if (pathname === '/api/prospector/import' && req.method === 'POST') {
        try {
          const bodyStr = await getRequestBody(req);
          const { leads, assignToDrip, resendKey, systemPrompt, customPrompt } = JSON.parse(bodyStr);

          if (!Array.isArray(leads)) {
            res.writeHead(400);
            res.end(JSON.stringify({ success: false, error: 'leads must be an array.' }));
            return;
          }

          const rKey = resendKey || process.env.RESEND_API_KEY || '';
          const gKey = process.env.GEMINI_API_KEY || '';
          
          const logMessages: string[] = ['[INFO] Starting bulk leads ingestion pipeline...'];
          const savedLeads: any[] = [];

          for (const lead of leads) {
            const rawEmail = lead.email ? String(lead.email).trim() : '';
            if (!rawEmail || !rawEmail.includes('@')) {
              logMessages.push(`[WARNING] Skipping invalid lead "${lead.company_name || 'Unnamed'}" - email is invalid: "${rawEmail}"`);
              continue;
            }

            logMessages.push(`[DATABASE] Ingesting lead: ${lead.company_name} (${rawEmail})...`);
            const databaseLead = {
              company_name: lead.company_name,
              contact_name: lead.contact_name || 'Business Owner',
              email: rawEmail,
              phone: lead.phone || '',
              website: lead.website || '',
              category: lead.category || 'imported',
              location: lead.location || 'N/A',
              status: 'Imported'
            };

            if (!supabaseServer) {
              throw new Error('Supabase database is not configured. Live mode requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
            }

            const { data, error } = await supabaseServer
              .from('prospects')
              .upsert([databaseLead], { onConflict: 'email' })
              .select();

            if (error) {
              logMessages.push(`[ERROR] Database failure for ${rawEmail}: ${error.message}`);
              continue;
            } else if (data && data[0]) {
              savedLeads.push(data[0]);
            }

            if (assignToDrip) {
              if (rKey) {
                logMessages.push(`[RESEND] Triggering Resend outreach email to ${rawEmail}...`);
                logMessages.push(`[GEMINI] Generating AI personalized copy with Gemini for ${lead.company_name}...`);
                
                try {
                  const emailData = await generateOutreachCopy(lead, gKey, systemPrompt, customPrompt);
                  const host = req.headers.host || 'www.gobiya.com';
                  const protocol = req.headers['x-forwarded-proto'] || 'http';
                  const bookingUrl = `${protocol}://${host}/book?email=${encodeURIComponent(rawEmail)}&company=${encodeURIComponent(lead.company_name)}&firstName=${encodeURIComponent(lead.contact_name || '')}&utm_source=prospector&utm_medium=email&utm_campaign=outreach`;
                  
                  const htmlEmail = wrapBrandedEmail(lead.contact_name || 'Business Owner', emailData.body, bookingUrl);

                  const resendRes = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${rKey}`,
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      from: 'Gobiya AI Onboarding <onboarding@resend.dev>',
                      to: [rawEmail],
                      subject: emailData.subject,
                      html: htmlEmail
                    })
                  });

                  if (resendRes.ok) {
                    logMessages.push(`[SUCCESS] Welcome email sent to ${rawEmail} successfully.`);
                    await supabaseServer
                      .from('prospects')
                      .update({ status: 'welcome_sent' })
                      .eq('email', rawEmail);
                    if (savedLeads.length > 0 && savedLeads[savedLeads.length - 1].email === rawEmail) {
                      savedLeads[savedLeads.length - 1].status = 'welcome_sent';
                    }
                  } else {
                    const errJson = await resendRes.json().catch(() => ({}));
                    logMessages.push(`[ERROR] Resend error for ${rawEmail}: ${JSON.stringify(errJson)}`);
                  }
                } catch (gemErr: any) {
                  logMessages.push(`[ERROR] Email generation/dispatch failed for ${rawEmail}: ${gemErr.message}`);
                }
              } else {
                logMessages.push(`[RESEND] Resend API Key omitted. Simulating outreach email dispatch to ${rawEmail}...`);
                await supabaseServer
                  .from('prospects')
                  .update({ status: 'welcome_sent' })
                  .eq('email', rawEmail);
                if (savedLeads.length > 0 && savedLeads[savedLeads.length - 1].email === rawEmail) {
                  savedLeads[savedLeads.length - 1].status = 'welcome_sent';
                }
              }
            }
          }

          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            leads: savedLeads,
            logs: logMessages
          }));
        } catch (e: any) {
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, error: e.message }));
        }
        return;
      }
    }

    if (
      pathname === '/locations' || pathname.startsWith('/locations/') ||
      pathname === '/markets' || pathname.startsWith('/markets/')
    ) {
      res.writeHead(301, { Location: '/' });
      res.end();
      return;
    }

    // ── AI DOMAIN SCANNER ENDPOINT ──
    if (pathname === '/api/scan' && req.method === 'POST') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      try {
        const bodyStr = await getRequestBody(req);
        const { domain } = JSON.parse(bodyStr);
        const gKey = process.env.GEMINI_API_KEY || '';

        if (!gKey) {
          res.writeHead(200);
          res.end(JSON.stringify({ lines: ['[ERROR] GEMINI_API_KEY is not configured on the server.'] }));
          return;
        }

        const prompt = `Perform a technical diagnostic scan evaluating if the domain '${domain}' (and its associated brand/website) is mentioned, indexed, recommended, or cited in AI search engines and LLM training sets (such as ChatGPT, Perplexity, Claude, Gemini, etc.). Return exactly 4 short, highly technical sentences formatted as a JSON string array. The sentences should read like real-time console log outputs from a crawler auditing brand AI citations and LLM visibility. Keep it extremely brief, realistic, and engineering-focused (e.g., "auditing chatgpt/perplexity citation index: verified brand sentiment but missing direct link attribution", "perplexity recommendation visibility check: 38% citation score in primary topic cluster", "gemini training data entity check: indexed in general web crawl, missing structured product graph definition", "claude retrieval-augmented generation (RAG) test: high mention frequency but low context relevance score"). Do NOT hallucinate real private data or specific user accounts; provide plausible, generic technical diagnostic statements about AI engine citation footprint. Do not include timestamps in the strings.`;

        const fetchRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${gKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: 'ARRAY',
                items: { type: 'STRING' }
              },
              temperature: 0.4
            }
          })
        });

        if (!fetchRes.ok) throw new Error('Failed to fetch from Gemini');
        const data: any = await fetchRes.json();
        const contentText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        let lines = [];
        try {
          lines = JSON.parse(contentText);
        } catch (e) {
          lines = ['scanning for penalty vectors ... requires full read', 'cross-referencing update timeline ... queued'];
        }

        res.writeHead(200);
        res.end(JSON.stringify({ lines }));
      } catch (err: any) {
        res.writeHead(500);
        res.end(JSON.stringify({ lines: [`[ERROR] AI Scan failed: ${err.message}`] }));
      }
      return;
    }

    // Server-side legacy redirections (301 Permanent Redirect)
    const legacyRedirects: Record<string, string> = {
      '/company/insights': '/insights',
      '/insights/b2b-seo-agency-los-angeles': '/insights/b2b-seo-agency',
      '/insights/local-seo-los-angeles': '/insights/local-seo',
      '/insights/los-angeles-local-seo-explained': '/insights/local-seo-explained',
      '/insights/google-my-business-optimization': '/insights/google-business-profile-optimization',
      '/company/success-stories': '/case-studies',
      '/success-stories': '/case-studies',
      '/success-stories/smile-center-dentistry': '/case-studies/smile-center-dentistry',
      '/success-stories/american-livescan': '/case-studies/american-livescan',
      '/services': '/capabilities',
      '/services/seo': '/performance/seo-discoverability-agency/',
      '/services/lead-generation': '/performance/native-crm-agency/',
      '/services/web-development': '/performance/web-development-agency/',
      '/services/web-design': '/performance/web-development-agency/',
      '/services/ppc-advertising': '/performance/native-crm-agency/',
      '/services/advertising': '/performance/native-crm-agency/',
      '/google-penalty-recovery': '/performance/seo-discoverability-agency/',
      '/what-we-do.html': '/performance/seo-discoverability-agency/',
      '/capabilities/generative-engine-optimization': '/performance/seo-discoverability-agency/',
      '/capabilities/forensic-seo-penalty-recovery': '/performance/seo-discoverability-agency/',
      '/capabilities/conversion-architecture': '/performance/native-crm-agency/',
      '/capabilities/semantic-search-intelligence': '/performance/seo-discoverability-agency/',
      '/capabilities/custom-digital-infrastructure': '/performance/web-development-agency/',
      '/company/careers': '/',
      '/capabilities/web-development': '/performance/web-development-agency/',
      '/capabilities/native-crm': '/performance/native-crm-agency/',
      '/capabilities/seo-discoverability': '/performance/seo-discoverability-agency/',
      '/capabilities/blockchain-web3-development': '/performance/blockchain-web3-development-agency/',
      '/capabilities/ai-prospect-scraper': '/performance/ai-prospect-scraper-agency/',
      '/capabilities/ai-llms-business': '/performance/ai-llms-business-agency/',
      '/capabilities/authority-building': '/relations/authority-building-agency/',
      
      // Suffix -agency redirects
      '/capabilities/web-development-agency': '/performance/web-development-agency/',
      '/capabilities/native-crm-agency': '/performance/native-crm-agency/',
      '/capabilities/seo-discoverability-agency': '/performance/seo-discoverability-agency/',
      '/capabilities/blockchain-web3-development-agency': '/performance/blockchain-web3-development-agency/',
      '/capabilities/ai-prospect-scraper-agency': '/performance/ai-prospect-scraper-agency/',
      '/capabilities/ai-llms-business-agency': '/performance/ai-llms-business-agency/',
      '/capabilities/authority-building-agency': '/relations/authority-building-agency/',
      '/company/about': '/about',
      '/company/approach': '/approach'
    };

    if (legacyRedirects[pathname]) {
      res.writeHead(301, { Location: legacyRedirects[pathname] });
      res.end();
      return;
    }

    // Load server-side rendering logic
    // Compiled by Vite to dist/server/entry-server.js during deployment build
    const serverModulePath = path.join(process.cwd(), 'dist', 'server', 'entry-server.js');
    
    // Check if SSR bundle exists
    if (!fs.existsSync(serverModulePath)) {
      throw new Error(`SSR build output not found at ${serverModulePath}. Ensure npm run build completes successfully.`);
    }

    const { render } = (await import(pathToFileURL(serverModulePath).href)) as { render: RenderFn };

    // Read index.html from built client assets
    const templatePath = path.join(process.cwd(), 'dist', 'client', 'index.html');
    
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Client build output template not found at ${templatePath}.`);
    }

    let template = fs.readFileSync(templatePath, 'utf-8');

    // Run React SSR rendering
    const { html } = render(req.url || pathname);

    // Replace placeholders with dynamic SSR output
    template = template.replace('<!--ssr-outlet-->', html);

    // Dynamic canonical url builder
    // Ensures bots index the URL path they crawled (e.g. /services/seo)
    const canonicalUrl = `https://www.gobiya.com${pathname === '/' ? '' : pathname}`;
    const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" />`;
    template = template.replace('<!--canonical-outlet-->', canonicalTag);

    // Dynamically inject outcome-focused meta tags for the requested path
    let seo = metadataMap[pathname];
    if (!seo) {
      if (pathname.startsWith('/insights/')) {
        seo = { title: 'Industry Insights | Gobiya', description: 'Deep dives into Google algorithm updates, generative search (GEO), and B2B marketing strategies from the Gobiya team.' };
      } else if (pathname.startsWith('/performance/') || pathname.startsWith('/relations/') || pathname.startsWith('/creativity/') || pathname.startsWith('/capabilities/')) {
        const segments = pathname.split('/').filter(Boolean);
        const category = segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
        const lastSegment = segments[segments.length - 1];
        const formattedTitle = lastSegment.replace(/-agency$/, '').replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
        seo = { title: `${formattedTitle} agency in LA - Gobiya`, description: `${category} solutions: ${formattedTitle} services from Gobiya. Hyper-targeted strategy and execution for measurable discoverability and conversion.` };
      } else {
        seo = metadataMap['/'];
      }
    }

    // Build ogImageUrl
    let ogImageUrl = 'https://www.gobiya.com/images/gobiya---logo.webp';
    if (seo.image) {
      ogImageUrl = seo.image.startsWith('http') ? seo.image : `https://www.gobiya.com${seo.image}`;
    } else if (pathname.startsWith('/insights/')) {
      const slug = pathname.substring('/insights/'.length);
      if (slug === 'are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks') {
        ogImageUrl = `https://www.gobiya.com/images/are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks.webp`;
      } else if (slug === 'seo-case-study-traffic-recovery') {
        ogImageUrl = `https://www.gobiya.com/images/how-we-recovered-320-organic-traffic-after-google-1780266793291.webp`;
      } else {
        ogImageUrl = `https://www.gobiya.com/images/article-${slug}.webp`;
      }
    }

    template = template.replace(
      '<!--ssr-title-->',
      `<title>${seo.title}</title>`
    );
    template = template.replace(
      '<!--ssr-desc-->',
      `<meta name="description" content="${seo.description}" />`
    );
    template = template.replace(
      '<!--ssr-og-title-->',
      `<meta property="og:title" content="${seo.title}" />`
    );
    template = template.replace(
      '<!--ssr-og-desc-->',
      `<meta property="og:description" content="${seo.description}" />`
    );
    template = template.replace(
      '<!--ssr-og-image-->',
      `<meta property="og:image" content="${ogImageUrl}" />`
    );
    template = template.replace(
      '<!--ssr-twitter-title-->',
      `<meta name="twitter:title" content="${seo.title}" />`
    );
    template = template.replace(
      '<!--ssr-twitter-desc-->',
      `<meta name="twitter:description" content="${seo.description}" />`
    );
    template = template.replace(
      '<!--ssr-twitter-image-->',
      `<meta name="twitter:image" content="${ogImageUrl}" />`
    );

    // Dynamic JSON-LD Schema
    const graph: any[] = [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://www.gobiya.com/#organization",
        "name": "Gobiya",
        "url": "https://www.gobiya.com",
        "sameAs": [
          "https://www.linkedin.com/in/stevemartingobiya/",
          "https://x.com/SteveMarti66556",
          "https://www.facebook.com/people/Gobiya/100064043744190/",
          "https://m.yelp.com/biz/gobiya-los-angeles-5"
        ],
        "telephone": "(323) 744-1338",
        "foundingDate": "2012-11-15",
        "priceRange": "$$$$",
        "numberOfEmployees": { "@type": "QuantitativeValue", "value": 5 },
        "logo": {
          "@type": "ImageObject",
          "@id": "https://www.gobiya.com/#logo",
          "url": "https://www.gobiya.com/images/gobiya---logo.webp",
          "caption": "Gobiya Logo"
        },
        "image": "https://www.gobiya.com/images/gobiya---logo.webp",
        "description": "Gobiya is a precision-engineered B2B SEO, Generative Engine Optimization (GEO), and sales pipeline agency. We recover lost organic traffic, architect AI citation strategies, and engineer automated outbound sales systems for mid-market and enterprise brands.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3580 Wilshire Blvd, Ste 132",
          "addressLocality": "Los Angeles",
          "addressRegion": "CA",
          "postalCode": "90010",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 34.0617,
          "longitude": -118.3039
        },
        "areaServed": [
          { "@type": "Country", "name": "United States", "sameAs": "https://www.wikidata.org/wiki/Q30" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Gobiya Services",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development", "url": "https://www.gobiya.com/capabilities/web-development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Native CRM", "url": "https://www.gobiya.com/capabilities/native-crm" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO & Discoverability", "url": "https://www.gobiya.com/capabilities/seo-discoverability" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Blockchain & Web3 Development", "url": "https://www.gobiya.com/capabilities/blockchain-web3-development" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Prospect Scraper", "url": "https://www.gobiya.com/capabilities/ai-prospect-scraper" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI & LLMs for Businesses", "url": "https://www.gobiya.com/capabilities/ai-llms-business" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Authority Building", "url": "https://www.gobiya.com/capabilities/authority-building" } }
          ]
        },
        "knowsAbout": [
          "https://en.wikipedia.org/wiki/Search_engine_optimization",
          "https://en.wikipedia.org/wiki/Generative_artificial_intelligence",
          "https://en.wikipedia.org/wiki/B2B_marketing",
          "https://en.wikipedia.org/wiki/Pay-per-click"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://www.gobiya.com/#website",
        "url": "https://www.gobiya.com",
        "name": "Gobiya",
        "description": "AI-driven SEO, Organic Traffic Recovery, and Sales Pipeline Engineering.",
        "publisher": {
          "@id": "https://www.gobiya.com/#organization"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}/#webpage`,
        "url": canonicalUrl,
        "name": seo.title,
        "description": seo.description,
        "isPartOf": {
          "@id": "https://www.gobiya.com/#website"
        }
      }
    ];

    if (pathname === '/') {
      graph.push({
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does Generative Engine Optimization (GEO) work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GEO structures your brand's digital footprints—including custom schema graphs, entity connections, and structured tables—so conversational LLMs (such as ChatGPT, Claude, Perplexity, and Gemini) can confidently parse, recommend, and cite your business as a trusted authority."
            }
          },
          {
            "@type": "Question",
            "name": "How long does it take to recover from a Google Core Update penalty?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Reversing algorithmic suppressions typically takes 12 to 24 weeks. The recovery process involves a forensic update audit, consolidation or pruning of thin URLs, and building clear E-E-A-T credentials that Google's quality classifiers recognize during core update cycles."
            }
          },
          {
            "@type": "Question",
            "name": "Why do traditional SEO metrics fail B2B companies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Traditional SEO tracks traffic volume and generic rankings. B2B programs require targeting low-volume, high-intent keyword clusters (like alternatives, comparison pages, and integration tables) that speak to multi-stakeholder buying committees, attributing traffic directly to CRM pipeline value."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between manual actions and algorithmic suppressions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A manual action is issued by a Google reviewer and explicitly listed in Search Console's manual actions panel; it is cleared by submitting a reconsideration request. An algorithmic suppression is automated, has no notification, and only recovers when the underlying quality classifiers are satisfied during a core rollout."
            }
          }
        ]
      });
    }

    const jsonLdSchema = {
      "@context": "https://schema.org",
      "@graph": graph
    };

    // Secondary JSON-LD Schema builder for specific page types (Articles and ProfilePage)
    let secondarySchemaTag = '';
    if (pathname.startsWith('/insights/')) {
      const slug = pathname.substring('/insights/'.length);
      const publishDate = (slug === 'how-to-apply-behavioral-psychology-principles-to-high-ticket-b2b-landing-page-wireframes-to-decrease-friction') ? "2026-06-12" :
                          (slug === 'are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks' || slug === 'what-is-the-difference-between-google-knowledge-graph-optimization-and-geo') ? "2026-06-04" :
                          (slug === 'what-data-sources-do-llms-crawl-to-verify-b2b-company-information') ? "2026-06-03" :
                          (slug === 'what-is-generative-engine-optimization-and-how-does-it-work') ? "2026-05-30" : 
                          (slug === 'what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty' || slug === 'chatgpt-vs-google-for-business-discovery') ? "2026-05-29" : 
                          "2026-05-25";

      const articleGraph: any[] = [
        {
          "@type": "BlogPosting",
          "headline": seo.title.replace(' | Gobiya', ''),
          "description": seo.description,
          "image": ogImageUrl,
          "url": `https://www.gobiya.com/insights/${slug}`,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.gobiya.com/insights/${slug}/#webpage`
          },
          "datePublished": publishDate,
          "dateModified": publishDate,
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
            "@id": "https://www.gobiya.com/#organization",
            "name": "Gobiya",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.gobiya.com/images/gobiya---logo.webp"
            }
          }
        }
      ];

      if (slug === 'what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty') {
        articleGraph.push({
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can I submit a reconsideration request for an algorithmic update drop?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Reconsideration requests are reviewed by Google employees and apply strictly to manual actions. If Search Console displays 'No issues detected,' your drop is algorithmic, and there is no manual action to appeal."
              }
            },
            {
              "@type": "Question",
              "name": "How long does it take to recover from a Google manual action vs. an algorithmic suppression?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A manual action typically clears in 10 to 30 days after a successful reconsideration request. An algorithmic suppression is much slower, usually requiring weeks to months of content quality upgrades, and often won't resolve until the next Google core update cycle runs."
              }
            },
            {
              "@type": "Question",
              "name": "What is the first step I should take after seeing a traffic drop?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Immediately check the Security & Manual Actions -> Manual Actions report in Google Search Console. If a notification is present, you have a manual action. If it says 'No issues detected,' your drop is algorithmic."
              }
            }
          ]
        });
      } else if (slug === 'chatgpt-vs-google-for-business-discovery') {
        articleGraph.push({
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How does ChatGPT compare to Google in overall search volume?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Google handles over 100 billion monthly visits, whereas ChatGPT processes around 4 to 5.6 billion monthly visits. While Google maintains a massive raw volume advantage, ChatGPT users have higher engagement metrics and convert better when they navigate to a recommended site."
              }
            },
            {
              "@type": "Question",
              "name": "What is the difference in conversion rates between AI referrals and Google search traffic?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AI-referred visitors are observed to convert at up to 4.4 times the rate of traditional search visitors. This intent gap exists because conversational seekers are looking for synthesis and recommendations rather than just browsing multiple options, moving them further down the sales funnel before they reach a site."
              }
            },
            {
              "@type": "Question",
              "name": "What schema markup should businesses implement for ChatGPT visibility?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "To establish clear machine-readable entity signals, businesses should implement Organization, LocalBusiness, Service, and FAQPage schemas. Writing these in JSON-LD is the best practice for AI retrieval engines."
              }
            }
          ]
        });
      } else if (slug === 'what-is-generative-engine-optimization-and-how-does-it-work') {
        articleGraph.push({
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How does GEO differ from traditional SEO?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "While traditional SEO focuses on ranking positions in a static list of blue links, GEO focuses on maximizing the probability that content is retrieved, synthesized, and cited in conversational AI responses. SEO is the foundational layer that ensures crawlability and indexation, while GEO optimizes content structure and authority for passage-level extraction by LLMs."
              }
            },
            {
              "@type": "Question",
              "name": "What are the most effective tactics for improving GEO visibility?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most empirically validated tactics include adding specific statistics and direct quotations, structuring content with clear headings (H2/H3) for passage-level extraction, building deep topical authority, maintaining consistent schema markup (LocalBusiness, Organization, FAQPage), and earning third-party mentions to influence the retrieval-augmented generation (RAG) pipeline."
              }
            },
            {
              "@type": "Question",
              "name": "Do AI engines crawl sites differently than Google's traditional search bots?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. AI engines use specialized user agents like GPTBot (OpenAI), PerplexityBot, and ClaudeBot to crawl content. Ensuring that your robots.txt file explicitly permits these crawlers and avoiding CDN blocklists is a critical technical requirement to enter the retrieval pool."
              }
            }
          ]
        });
      } else if (slug === 'what-data-sources-do-llms-crawl-to-verify-b2b-company-information') {
        articleGraph.push({
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Which B2B data sources do LLMs trust the most for entity verification?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "LLMs rely on a tiered source hierarchy. Structured reference databases like Wikipedia and Wikidata are Tier 1 (the gold standard). Professional databases like LinkedIn and Crunchbase form Tier 2, while business reviews platforms like G2, Capterra, and TrustRadius constitute Tier 3. High-engagement media platforms (like Reddit and YouTube) and the company's own site serve as lower-tier signals."
              }
            },
            {
              "@type": "Question",
              "name": "Why does inconsistent data across B2B directories lead to AI silence?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "LLMs verify entities by triangulating facts across multiple external databases. If they encounter contradictory data—such as differing company categories, leadership names, or locations—the model's confidence scores drop. To avoid hallucinating wrong answers, conversational engines will typically omit the company entirely rather than risk citing incorrect information."
              }
            },
            {
              "@type": "Question",
              "name": "How can a B2B company technically signal its entity relationships to AI crawlers?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most direct method is implementing Organization schema in JSON-LD format on the company website, utilizing the sameAs property. This explicitly declares the machine-readable links between your website and your official profiles on Wikidata, LinkedIn, Crunchbase, and category-specific review platforms."
              }
            }
          ]
        });
      } else if (slug === 'what-is-the-difference-between-google-knowledge-graph-optimization-and-geo') {
        articleGraph.push({
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the primary difference between Google Knowledge Graph optimization and GEO?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Google Knowledge Graph optimization focuses on entity resolution specifically within Google's database to correctly represent your brand (often resulting in a Knowledge Panel), whereas Generative Engine Optimization (GEO) focuses on getting your content cited and recommended across the entire multi-engine AI ecosystem (such as ChatGPT, Claude, Gemini, and Perplexity)."
              }
            },
            {
              "@type": "Question",
              "name": "Why is Knowledge Graph optimization considered a foundation for GEO?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Generative engines utilize RAG (Retrieval-Augmented Generation) pipelines and require high confidence to cite sources without hallucinating. A cleanly resolved entity in Google's Knowledge Graph, supported by structured data like Wikidata and schema markup, provides the verification foundation that these engines rely on to cite a brand."
              }
            },
            {
              "@type": "Question",
              "name": "How are Google Knowledge Panels and AI answers converging?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Google's Knowledge Panel descriptions, which historically drew from Wikipedia, are increasingly being replaced by Gemini-generated multi-source summaries. This indicates that the entity understanding layer (Knowledge Graph) and the generative answering layer (AI Overviews/AI Mode) are merging into a single system inside Google."
              }
            }
          ]
        });
      } else if (slug === 'are-ai-search-engines-scraping-hidden-api-data-or-public-html-text-blocks') {
        articleGraph.push({
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Do AI search engines scrape data from private or hidden APIs?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No, AI engines do not scrape private or authenticated APIs. They make standard HTTP requests to public URLs and parse the raw HTML response. If your content depends on client-side JavaScript to fetch data from APIs after the page loads, AI crawlers will not see it."
              }
            },
            {
              "@type": "Question",
              "name": "Do ClaudeBot, GPTBot, and PerplexityBot render JavaScript?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Unlike Googlebot, which uses a headless browser to render JavaScript (often with a delay), major AI bots like GPTBot, ClaudeBot, PerplexityBot, Bytespider, and Meta-ExternalAgent only fetch and read raw server-rendered HTML. They do not execute JavaScript at all."
              }
            },
            {
              "@type": "Question",
              "name": "How can I verify if my website is visible to AI search engines?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The simplest test is to disable JavaScript in your browser settings and refresh your page. Any text, images, or schema data that disappears when JavaScript is turned off is client-side rendered and completely invisible to AI search engine crawlers."
              }
            }
          ]
        });
      }

      const articleSchema = {
        "@context": "https://schema.org",
        "@graph": articleGraph
      };
      secondarySchemaTag = `\n    <script id="article-schema" type="application/ld+json">${JSON.stringify(articleSchema)}</script>`;
    } else if (pathname === '/about/steve-martin' || pathname === '/author/steve-martin') {
      const authorSchema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
          "@type": "Person",
          "name": "Steve Martin",
          "jobTitle": "CEO, Lead Developer & Marketer",
          "worksFor": {
            "@type": "Organization",
            "name": "Gobiya",
            "url": "https://www.gobiya.com"
          },
          "image": "https://www.gobiya.com/images/steve-portrait.webp",
          "description": "Steve Martin is the CEO, Lead Developer, and Marketer at Gobiya, with 25+ years of experience helping contractors, dental practices, real estate, and SaaS startups grow through organic search, paid media, and custom React/Vite development.",
          "url": "https://www.gobiya.com/about/steve-martin",
          "sameAs": [
            "https://www.linkedin.com/in/stevemartingobiya/"
          ],
          "knowsAbout": [
            "Search Engine Optimization (SEO)",
            "Generative Engine Optimization (GEO)",
            "React Engineering",
            "B2B Sales Pipeline Automation",
            "Paid Media (PPC)",
            "Digital PR & Link Building"
          ],
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Glendale Career College"
          }
        }
      };
      secondarySchemaTag = `\n    <script id="author-schema" type="application/ld+json">${JSON.stringify(authorSchema)}</script>`;
    }

    const schemaTag = `<script id="schema-script" type="application/ld+json">${JSON.stringify(jsonLdSchema)}</script>${secondarySchemaTag}`;
    template = template.replace('<!--schema-outlet-->', schemaTag);

    // Set response headers and return server-rendered page
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(template);
  } catch (error: any) {
    console.error('Vercel SSR rendering failed:', error);
    res.status(500).send(`SSR Error: ${error.message}`);
  }
}
