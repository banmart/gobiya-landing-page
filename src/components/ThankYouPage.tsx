import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import SEO from './SEO';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const ThankYouPage: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });

    const ease = 'power3.out';
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease, duration: 1.1 } });
      tl.from('.ty-icon', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, 0)
        .from('.ty-title', { y: 20, opacity: 0 }, 0.1)
        .from('.ty-copy', { y: 16, opacity: 0 }, 0.25)
        .from('.ty-actions > a', { y: 14, opacity: 0, stagger: 0.1 }, 0.4);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased font-sans flex flex-col">
      <SEO path="/thank-you" />
      <SiteHeader />

      <main className="flex-grow flex flex-col justify-center items-center px-[5vw] pt-40 pb-24">
        <div className="max-w-2xl w-full text-center">
          <div className="ty-icon w-20 h-20 bg-[#d1f851] rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <span className="ty-title text-sm font-mono uppercase tracking-widest text-gray-500 block mb-4">
            Request received
          </span>

          <h1 className="ty-title text-4xl sm:text-6xl font-black tracking-tight text-gray-900 leading-[1.05] mb-6">
            Thank you — we're on it.
          </h1>

          <p className="ty-copy text-lg sm:text-xl leading-relaxed text-gray-600 mb-10 max-w-lg mx-auto">
            Our team has received your information and will be in touch shortly to discuss your pipeline architecture.
          </p>

          <div className="ty-actions flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-[#111827] hover:bg-gray-700 text-white px-7 py-3.5 rounded-full font-bold text-[15px] transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Homepage
            </a>

            <a
              href="/insights"
              className="inline-flex items-center gap-2 bg-transparent border border-gray-200 hover:border-gray-900 text-gray-900 px-7 py-3.5 rounded-full font-bold text-[15px] transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              Read Latest Insights
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ThankYouPage;
