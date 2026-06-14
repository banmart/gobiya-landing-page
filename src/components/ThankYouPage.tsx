import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import SEO from './SEO';

const ThankYouPage: React.FC = () => {
  useEffect(() => {
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    
    const ease = 'power3.out';
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease, duration: 1.1 } });
      tl.from('.w-20', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, 0)
        .from('.font-display', { y: 20, opacity: 0 }, 0.1)
        .from('.text-gray-300', { y: 16, opacity: 0 }, 0.25)
        .from('.flex-col > a', { y: 14, opacity: 0, stagger: 0.1 }, 0.4);
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO path="/thank-you" />
      <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center px-5 sm:px-8 relative overflow-hidden">
        {/* Background elements to match brand aesthetic */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#2F5D50]/10 to-transparent pointer-events-none" />
        
        <div className="max-w-2xl w-full bg-black/40 border border-white/10 p-8 sm:p-14 rounded-2xl shadow-2xl backdrop-blur-md text-center relative z-10">
          <div className="w-20 h-20 bg-[#2F5D50]/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#2F5D50]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-6 font-display">
            Request Received
          </h1>
          
          <p className="text-[16px] sm:text-[18px] leading-relaxed text-gray-300 mb-10 max-w-lg mx-auto">
            Thank you for reaching out. Our team has received your information and will be in touch shortly to discuss your pipeline architecture.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/" 
              className="flex items-center gap-2 bg-[#2F5D50] hover:bg-[#234A40] text-white px-6 py-3.5 rounded font-medium text-[14px] transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Homepage
            </a>
            
            <a 
              href="/insights" 
              className="flex items-center gap-2 bg-transparent border border-white/10 hover:border-[#2F5D50] hover:text-[#2F5D50] text-white px-6 py-3.5 rounded font-medium text-[14px] transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              Read Latest Insights
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
