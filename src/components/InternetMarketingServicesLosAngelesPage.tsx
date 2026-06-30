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
      description: 'Gobiya provides top rated internet marketing services in Los Angeles. We are a digital marketing agency focusing on SEO, CRM pipeline automation, web development, and AI-driven online visibility for businesses across California.',
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
      description: 'Top rated internet marketing services in Los Angeles covering SEO, CRM automation, online visibility, and web development.',
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
          name: 'How do I find top rated internet marketing services in Los Angeles?',
          acceptedAnswer: { '@type': 'Answer', text: 'Finding top rated internet marketing services in Los Angeles requires looking beyond vanity metrics. The best internet marketing services in Los Angeles will focus on measurable pipeline generation—connecting organic traffic, CRM automation, and high-quality lead generation—rather than just selling rankings or traffic volume.' },
        },
        {
          '@type': 'Question',
          name: 'Where can I read internet marketing services Los Angeles reviews?',
          acceptedAnswer: { '@type': 'Answer', text: 'You can read our internet marketing services Los Angeles reviews directly on our Google Business Profile, Yelp, or by exploring our in-depth case studies which showcase exactly how we’ve helped businesses across California scale their online visibility and revenue.' },
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
                If you are looking for internet marketing services Los Angeles, the reality is you don't just need more traffic—you need a system that predictably turns visibility into revenue. We are a full-service digital agency bridging the gap between search discovery, website conversion, and CRM pipeline automation.
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
                  
                  <h2 className="text-3xl font-bold mb-6 mt-12">Top Rated Internet Marketing Services in Los Angeles</h2>
                  <p>
                    When you search for the best internet marketing services Los Angeles has to offer, you'll likely find a sea of marketing companies in Los Angeles promising page-one rankings or massive spikes in traffic. But as the digital landscape shifts—especially with AI-driven search and changing consumer behaviors—traditional marketing metrics are no longer enough.
                  </p>
                  <p>
                    The top internet marketing services in Los Angeles understand that visibility must connect directly to your sales pipeline. At Gobiya, we don't just optimize for clicks. We engineer the entire digital journey. From ensuring your brand is structured correctly for LLMs (Large Language Models) to building native CRM integrations, our approach ensures that every marketing dollar generates a measurable return.
                  </p>

                  <h2 className="text-3xl font-bold mb-6 mt-16">Core Digital Marketing Services Providers</h2>
                  <p>
                    As one of the leading internet marketing companies in California, our methodology covers the complete spectrum of digital growth. We build resilient, high-converting digital footprints for our clients.
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

                  <h2 className="text-3xl font-bold mb-6 mt-16">Why We Stand Out Among Marketing Companies in Los Angeles</h2>
                  <p>
                    Los Angeles is a hyper-competitive market. To stand out among top marketing agencies in Los Angeles, you need more than just standard playbook tactics. Our team reads the algorithms, analyzes the data, and builds structured entity signals that establish genuine market authority. We've spent over a decade diagnosing why organic traffic isn't generating pipeline and deploying the code-level fixes necessary to correct it.
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
                      <h3 className="text-xl font-bold mb-3">How do I find top rated internet marketing services in Los Angeles?</h3>
                      <p className="text-gray-700">Finding top rated internet marketing services in Los Angeles requires looking beyond vanity metrics. The best internet marketing services in Los Angeles will focus on measurable pipeline generation—connecting organic traffic, CRM automation, and high-quality lead generation—rather than just selling rankings or traffic volume.</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-3">Where can I read internet marketing services Los Angeles reviews?</h3>
                      <p className="text-gray-700">You can read our internet marketing services Los Angeles reviews directly on our Google Business Profile, Yelp, or by exploring our in-depth case studies which showcase exactly how we’ve helped businesses across California scale their online visibility and revenue.</p>
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
