import React, { useEffect } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import HeroQuickForm from './HeroQuickForm';
import ContentCta from './ContentCta';

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

export default function InternetMarketingServicesLosAngelesPage() {
  useEffect(() => {
    document.documentElement.classList.add('js');
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 selection:bg-[#F26522] selection:text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <SiteHeader />

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden border-b border-gray-200">
          <div className="absolute inset-0 bg-gray-50 z-0" />
          <div className="w-full mx-auto px-6 lg:px-12 relative z-10" style={{ maxWidth: '1400px', display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div className="max-w-3xl" style={{ flex: '1 1 480px', minWidth: 0 }}>
              <span className="text-sm font-mono uppercase tracking-widest text-[#F26522] mb-6 block">
                Los Angeles, CA
              </span>
              <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight text-gray-900 leading-[1.05] mb-8">
                Internet Marketing Services Los Angeles
              </h1>
              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-3xl mb-10">
                Gobiya is a full-service internet marketing agency based in Los Angeles, CA, founded in 2010, providing SEO, Google Ads management, website development, and CRM pipeline automation for B2B and professional services businesses. The agency operates from 3580 Wilshire Blvd, Los Angeles, and serves clients across Southern California and the U.S.
              </p>
            </div>
            <div style={{ flex: '1 1 460px', maxWidth: '560px' }}>
              <HeroQuickForm source="Internet Marketing Services Los Angeles" variant="light" heading="Get a fast marketing quote" subheading="Tell us about your goals and we’ll respond quickly." />
            </div>
          </div>
        </section>

        {/* HERO IMAGE */}
        <section className="border-b border-gray-200 bg-white">
          <div className="w-full mx-auto px-6 lg:px-12 py-12 lg:py-24" style={{ maxWidth: '1400px' }}>
            <div className="aspect-[21/9] w-full overflow-hidden rounded-xl bg-gray-100">
              <img 
                src="/images/internet-marketing-la-hero.webp" 
                alt="Modern digital marketing agency office in Los Angeles"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </section>

        <ContentCta headline="Ready to grow your LA pipeline?" sub="Our team responds within one business day." accent="#111827" background="#f9fafb" />

        {/* CONTENT & SIDEBAR */}
        <section className="py-24 bg-white">
          <div className="w-full mx-auto px-6 lg:px-12" style={{ maxWidth: '1400px' }}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* MAIN CONTENT */}
              <div className="lg:col-span-8 lg:col-start-1">
                <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-[#F26522] prose-a:no-underline hover:prose-a:underline">
                  
                  <h2 className="text-3xl font-bold mb-6 mt-12">Internet Marketing in Los Angeles Is a Different Problem</h2>
                  <p>
                    Los Angeles is one of the most competitive search markets in the country. The businesses ranking at the top aren't there because they spent more — they're there because their digital infrastructure is cleaner: faster pages, better-structured entities, content that matches commercial intent rather than just keyword volume.
                  </p>
                  <p>
                    The shift to AI-driven search (Google AI Mode, Perplexity, ChatGPT web) has made this gap wider. Search engines now read your site the way a buyer does — evaluating whether your content demonstrates genuine expertise, not just whether it contains the right keywords. Agencies that keep running the same 2018 playbook are quietly losing ground.
                  </p>
                  <p>
                    We've been reading Google's algorithm changes since 2012 and the LLM citation patterns since they started mattering in 2023. That means we know exactly which signals move the needle right now — and we implement them at the code level, not through plugins.
                  </p>

                  <h2 className="text-3xl font-bold mb-6 mt-16">What We Cover</h2>
                  <p>
                    Our engagements are scoped to what your business actually needs — not a bundle of services you'll never use. Most clients start with one core problem (organic traffic not converting, or AI search visibility dropping) and we expand from there.
                  </p>
                  <ul className="space-y-4 mb-8 text-gray-800">
                    <li className="flex gap-3">
                      <span className="text-[#F26522] font-bold shrink-0">→</span>
                      <span><strong>SEO & Search Visibility:</strong> We focus heavily on <a href="/performance/seo-discoverability-agency">SEO & Discoverability</a>. Whether it's technical site health, local map pack optimization, or preparing your content for AI overviews, we make sure you are found when buyers are ready to act.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#F26522] font-bold shrink-0">→</span>
                      <span><strong>Web Development & UX:</strong> Your website is your primary conversion engine. We build fast, scalable, and beautifully designed digital experiences that guide users seamlessly from discovery to action.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#F26522] font-bold shrink-0">→</span>
                      <span><strong>Native CRM Automation:</strong> Generating leads is only half the battle. We automate the backend, connecting your website directly to your CRM to streamline follow-ups and close rates.</span>
                    </li>
                  </ul>

                  {/* SECONDARY IMAGE */}
                  <div className="my-16 aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
                    <img 
                      src="/images/internet-marketing-la-secondary.webp" 
                      alt="Marketing professionals in Los Angeles reviewing analytics data"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <h2 className="text-3xl font-bold mb-6 mt-16">How We Work</h2>
                  <p>
                    Every engagement starts with a diagnostic, not a proposal. We audit your technical infrastructure, your CRM pipeline, and your content against both traditional ranking signals and the emerging AI citation criteria. From there we produce a prioritised fix list with projected impact — so you know what you're getting before committing.
                  </p>
                  <p>
                    We don't subcontract. The people who do your audit are the people who implement the fixes. No 12-month lock-in. If the work isn't producing measurable improvement, you're not obligated to continue.
                  </p>

                  <h2 className="text-3xl font-bold mb-6 mt-16">Frequently Asked Questions</h2>
                  
                  <div className="space-y-6 mt-8">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-3">Do you offer online appointments for internet marketing services in Los Angeles?</h3>
                      <p className="text-gray-700">Yes, we provide fully remote online appointments for all our internet marketing services in Los Angeles. You can book a strategy session via our website, and we’ll meet virtually to diagnose your digital presence and discuss pipeline solutions.</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-3">Are your internet marketing services in Los Angeles open now?</h3>
                      <p className="text-gray-700">Our core office hours are Monday through Friday, 9:00 AM to 6:00 PM Pacific Time. However, you can submit inquiries or schedule an online appointment at any time through our portal, and our Los Angeles team will respond promptly during business hours.</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-3">What separates an internet marketing agency that generates pipeline from one that just generates traffic?</h3>
                      <p className="text-gray-700">Pipeline-focused agencies connect every marketing channel — organic search, paid, email — directly to your CRM so every lead is tracked from first click to closed deal. Traffic-focused agencies optimise for clicks and impressions but stop there. The practical difference: one shows you revenue attributable to marketing spend, the other shows you a graph of sessions.</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-3">What does a Gobiya engagement look like in the first 90 days?</h3>
                      <p className="text-gray-700">The first 30 days are diagnostic: technical SEO audit, CRM audit, and keyword intent mapping. Days 31–60 are implementation: fixing crawl issues, deploying structured data, and connecting web forms to your pipeline. Days 61–90 are iteration: content depth improvements, performance reporting, and identifying the next highest-leverage channel. Most clients see measurable ranking or lead-quality changes within the first cycle.</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* SIDEBAR */}
              <div className="lg:col-span-3 lg:col-start-10">
                <div className="sticky top-32">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
                    <h3 className="text-sm font-mono uppercase tracking-widest text-gray-900 mb-6">Service Area</h3>
                    <ul className="space-y-4 text-sm font-medium text-gray-600">
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
                        Los Angeles, CA
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        Beverly Hills, CA
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        Glendale, CA
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        Burbank, CA
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        Pasadena, CA
                      </li>
                    </ul>

                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <h3 className="text-sm font-mono uppercase tracking-widest text-gray-900 mb-4">Ready to scale?</h3>
                      <p className="text-sm text-gray-600 mb-6">Stop buying traffic. Start building a pipeline.</p>
                      <a href="/book" className="block w-full py-3 px-4 bg-gray-900 text-white text-center text-sm font-bold uppercase tracking-wider hover:bg-[#F26522] transition-colors rounded-sm">
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <ContentCta headline="Let's build your internet marketing system." sub="Start with a free audit — no commitment, 24-hour turnaround." accent="#111827" background="#f9fafb" />
      <SiteFooter />
    </div>
  );
}
