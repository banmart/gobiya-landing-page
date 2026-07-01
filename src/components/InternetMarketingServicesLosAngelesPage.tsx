import React from 'react';
import LocalServicePageTemplate from './LocalServicePageTemplate';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.gobiya.com/#organization',
      name: 'Gobiya — Internet Marketing Services Los Angeles',
      url: 'https://www.gobiya.com/internet-marketing-services-los-angeles',
      logo: 'https://www.gobiya.com/images/gobiya---logo.webp',
      foundingDate: '2012',
      description: 'Gobiya is a Los Angeles digital marketing agency specialising in SEO, CRM pipeline automation, web development, and AI-driven search visibility for businesses across California.',
      telephone: '(323) 744-1338',
      email: 'hello@gobiya.com',
      priceRange: '$$$$',
      areaServed: [
        { '@type': 'City', name: 'Los Angeles', sameAs: 'https://www.wikidata.org/wiki/Q65' },
        { '@type': 'State', name: 'California', sameAs: 'https://www.wikidata.org/wiki/Q99' },
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3580 Wilshire Blvd, Ste 132',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '90010',
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 34.0617, longitude: -118.3015 },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
      ],
      sameAs: [
        'https://www.linkedin.com/in/stevemartingobiya/',
        'https://m.yelp.com/biz/gobiya-los-angeles-5',
        'https://www.facebook.com/people/Gobiya/100064043744190/',
      ],
    },
    {
      '@type': 'Service',
      serviceType: 'Internet Marketing Services',
      provider: { '@id': 'https://www.gobiya.com/#organization' },
      areaServed: { '@type': 'City', name: 'Los Angeles', sameAs: 'https://www.wikidata.org/wiki/Q65' },
      description: 'Internet marketing services in Los Angeles covering SEO, CRM pipeline automation, web development, and AI search visibility.',
      url: 'https://www.gobiya.com/internet-marketing-services-los-angeles',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do you offer online appointments for internet marketing services in Los Angeles?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes, we provide fully remote online appointments for all our internet marketing services in Los Angeles. You can book a strategy session via our website, and we’ll meet virtually to diagnose your digital presence and discuss pipeline solutions.' },
        },
        {
          '@type': 'Question',
          name: 'Are your internet marketing services in Los Angeles open now?',
          acceptedAnswer: { '@type': 'Answer', text: 'Our core office hours are Monday through Friday, 9:00 AM to 6:00 PM Pacific Time. However, you can submit inquiries or schedule an online appointment at any time through our portal, and our Los Angeles team will respond promptly during business hours.' },
        },
        {
          '@type': 'Question',
          name: 'What separates an internet marketing agency that generates pipeline from one that just generates traffic?',
          acceptedAnswer: { '@type': 'Answer', text: 'Pipeline-focused agencies connect every marketing channel — organic search, paid, email — directly to your CRM so every lead is tracked from first click to closed deal. Traffic-focused agencies optimise for clicks and impressions but stop there. The practical difference: one shows you revenue attributable to marketing spend, the other shows you a graph of sessions.' },
        },
        {
          '@type': 'Question',
          name: 'What does a Gobiya internet marketing engagement look like in the first 90 days?',
          acceptedAnswer: { '@type': 'Answer', text: 'The first 30 days are diagnostic: technical SEO audit, CRM audit, and keyword intent mapping. Days 31–60 are implementation: fixing crawl issues, deploying structured data, and connecting web forms to your pipeline. Days 61–90 are iteration: content depth improvements, performance reporting, and identifying the next highest-leverage channel. Most clients see measurable ranking or lead-quality changes within the first cycle.' },
        },
      ],
    },
  ],
};

const SPOKES = [
  {
    title: 'SEO & Discoverability',
    query: '"seo discoverability agency"',
    href: '/performance/seo-discoverability-agency',
    desc: 'The technical SEO and entity optimization foundation that drives all search visibility.',
  },
  {
    title: 'Web Development Agency',
    query: '"web development agency"',
    href: '/capabilities/web-development-agency/',
    desc: 'Blazing-fast, responsive web builds designed for conversion performance and crawler readability.',
  },
  {
    title: 'Native CRM & attribution',
    query: '"native crm agency"',
    href: '/capabilities/native-crm-agency/',
    desc: 'Automated CRM integrations that route leads and track every opportunity to its traffic source.',
  },
  {
    title: 'Google Ads & PPC Strategy',
    query: '"google ads agency"',
    href: '/relations/google-ads-ppc-strategy-agency/',
    desc: 'High-intent search campaign management focused on pipeline quality and actual client acquisition.',
  },
];

const STATS = [
  { val: 'Est. 2012', label: 'Over a decade of search engineering and pipeline automation experience' },
  { val: '200+', label: 'Qualified leads per month delivered for B2B and home-services clients' },
  { val: 'Sub-1s', label: 'Average page load speed built for maximum conversion rates' },
];

const SERVICES = [
  { title: 'SEO & Search Visibility', body: 'Technical site health, local map pack optimization, and entity alignment for Google Search and AI Overview citations.' },
  { title: 'Web Development & UX', body: 'Blazing-fast, client-rendered React and static web builds built for conversions, load speed, and crawler accessibility.' },
  { title: 'Native CRM Automation', body: 'Direct connection from web forms and CTAs to your pipeline, automating attribution, tracking, and lead routing.' },
];

const FAQS_LIST = [
  { q: 'Do you offer online appointments for internet marketing services in Los Angeles?', a: 'Yes, we provide fully remote online appointments for all our internet marketing services in Los Angeles. You can book a strategy session via our website, and we’ll meet virtually to diagnose your digital presence and discuss pipeline solutions.' },
  { q: 'Are your internet marketing services in Los Angeles open now?', a: 'Our core office hours are Monday through Friday, 9:00 AM to 6:00 PM Pacific Time. However, you can submit inquiries or schedule an online appointment at any time through our portal, and our Los Angeles team will respond promptly during business hours.' },
  { q: 'What separates an internet marketing agency that generates pipeline from one that just generates traffic?', a: 'Pipeline-focused agencies connect every marketing channel — organic search, paid, email — directly to your CRM so every lead is tracked from first click to closed deal. Traffic-focused agencies optimise for clicks and impressions but stop there. The practical difference: one shows you revenue attributable to marketing spend, the other shows you a graph of sessions.' },
  { q: 'What does a Gobiya engagement look like in the first 90 days?', a: 'The first 30 days are diagnostic: technical SEO audit, CRM audit, and keyword intent mapping. Days 31–60 are implementation: fixing crawl issues, deploying structured data, and connecting web forms to your pipeline. Days 61–90 are iteration: content depth improvements, performance reporting, and identifying the next highest-leverage channel. Most clients see measurable ranking or lead-quality changes within the first cycle.' },
];

export default function InternetMarketingServicesLosAngelesPage() {
  return (
    <LocalServicePageTemplate
      schema={SCHEMA}
      breadcrumb="Services / Los Angeles"
      heroTitle="Internet Marketing Services Los Angeles: Visibility Turned Into Pipeline"
      heroSubtitle="Gobiya is a full-service internet marketing agency based in Los Angeles, CA, founded in 2012, providing SEO, Google Ads management, website development, and CRM pipeline automation for B2B and professional services businesses."
      tags={[
        'Digital Marketing',
        'SEO & Discoverability',
        'Google Ads PPC',
        'Web Development',
        'CRM Automation',
        'Los Angeles, CA'
      ]}
      relevantSlugs={[
        'how-do-b2b-companies-use-seo-to-generate-predictable-revenue',
        'multi-location-websites-for-franchises',
        'what-are-ai-seo-services'
      ]}
      introHeading="Internet Marketing in Los Angeles Is a Different Problem"
      introParagraphs={[
        "Los Angeles is one of the most competitive search markets in the country. The businesses ranking at the top aren't there because they spent more — they're there because their digital infrastructure is cleaner: faster pages, better-structured entities, content that matches commercial intent rather than just keyword volume.",
        "The shift to AI-driven search (Google AI Mode, Perplexity, ChatGPT web) has made this gap wider. Search engines now read your site the way a buyer does — evaluating whether your content demonstrates genuine expertise, not just whether it contains the right keywords. Agencies that keep running the same 2018 playbook are quietly losing ground.",
        "We've been reading Google's algorithm changes since 2012 and the LLM citation patterns since they started mattering in 2023. That means we know exactly which signals move the needle right now — and we implement them at the code level, not through plugins."
      ]}
      stats={STATS}
      servicesLabel="What we cover"
      servicesTitle="Three disciplines, one integrated internet marketing system"
      services={SERVICES}
      spokes={SPOKES}
      spokesTitle="How we cover the full internet marketing services Los Angeles search landscape"
      spokesLabel="Query fan-out cluster"
      useHeroForm={true}
      faqs={FAQS_LIST}
    >
      {/* Secondary content custom section */}
      <section className="py-24 border-b border-gray-200 bg-white px-[5vw]">
        <div className="max-w-4xl" data-anim="up">
          <span className="text-sm font-mono uppercase tracking-widest text-gray-400 block mb-3">How we work</span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            A diagnostic first step to internet marketing success
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Every engagement starts with a diagnostic, not a proposal. We audit your technical infrastructure, your CRM pipeline, and your content against both traditional ranking signals and the emerging AI citation criteria. From there we produce a prioritised fix list with projected impact — so you know what you're getting before committing.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            We don't subcontract. The people who do your audit are the people who implement the fixes. No 12-month lock-in. If the work isn't producing measurable improvement, you're not obligated to continue.
          </p>

          <div className="border border-gray-200 bg-gray-50 p-8 rounded-lg flex flex-col md:flex-row gap-8 items-start justify-between">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-widest text-gray-900 mb-4">Service Area Coverage</h3>
              <ul className="space-y-3">
                {[
                  'Los Angeles, CA',
                  'Beverly Hills, CA',
                  'Glendale, CA',
                  'Burbank, CA',
                  'Pasadena, CA'
                ].map((s, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-center gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-green-600' : 'bg-gray-300'}`} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="max-w-sm">
              <h3 className="text-sm font-mono uppercase tracking-widest text-gray-900 mb-4">Ready to scale your pipeline?</h3>
              <p className="text-sm text-gray-500 mb-6">Stop buying traffic vanity metrics. Start building an engineered attribution system.</p>
              <a href="/book" className="inline-flex w-full items-center justify-center py-3 px-6 bg-black text-white text-center text-sm font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">
                Book a strategy audit
              </a>
            </div>
          </div>
        </div>
      </section>
    </LocalServicePageTemplate>
  );
}
