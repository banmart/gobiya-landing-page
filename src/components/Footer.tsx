import React from 'react';
import BlurText from './BlurText';
import GradualBlur from './GradualBlur';

const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-[#111] text-white pt-20 sm:pt-28 px-5 sm:px-8 lg:px-12 w-full overflow-hidden flex flex-col relative" data-logo-dark>
        <div className="max-w-[1440px] w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 lg:gap-8 mb-10 sm:mb-20 relative z-10">
          
          {/* Col 1 */}
          <div className="flex flex-col pr-0 lg:pr-12 relative">
            <div className="logo-marker h-8 sm:h-9 w-[100px] sm:w-[110px] pointer-events-none mb-3" />
            <h3 className="text-3xl font-semibold tracking-tight mb-4">Gobiya.</h3>
            <p className="text-gray-400 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-sm">
              We leverage cutting-edge AI and advanced data strategies to help brands recover lost traffic, dominate search, and scale revenue globally.
            </p>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-3">Subscribe</h4>
            <div className="flex items-center w-full max-w-sm bg-white/10 p-1">
              <input 
                type="email" 
                placeholder="Enter your E-mail" 
                className="bg-transparent text-[14px] text-white placeholder-gray-500 w-full px-4 py-2 outline-none"
              />
              <button className="bg-white text-black px-4 py-2 text-[13px] font-semibold hover:bg-gray-200 transition-colors">
                Submit
              </button>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-6">Services</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-gray-400">
              <li><a href="/services/geo-optimization" className="hover:text-white transition-colors">AI Content Strategies</a></li>
              <li><a href="/google-penalty-recovery" className="hover:text-white transition-colors">Traffic Recovery</a></li>
              <li><a href="/services/seo" className="hover:text-white transition-colors">Technical SEO</a></li>
              <li><a href="/on-page-seo-los-angeles" className="hover:text-white transition-colors">On-Page SEO LA</a></li>
              <li><a href="/services/seo" className="hover:text-white transition-colors">Algorithmic Audits</a></li>
              <li><a href="/services/lead-generation" className="hover:text-white transition-colors">Programmatic SEO</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-6">Company</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-gray-400">
              <li><a href="/company/about" className="hover:text-white transition-colors">About the Agency</a></li>
              <li><a href="/company/success-stories" className="hover:text-white transition-colors">Success Stories</a></li>
              <li><a href="/company/approach" className="hover:text-white transition-colors">Our Approach</a></li>
              <li><a href="/insights" className="hover:text-white transition-colors">Industry Insights</a></li>
              <li><a href="/company/careers" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col">
            <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-6">Connect</h4>
            <ul className="flex flex-col gap-4 text-[14px] text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1440px] w-full mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-white/10 pt-8 pb-8 relative z-[60]">
          <p className="text-[13px] text-gray-500">© 2026 Gobiya. Engineering search dominance.</p>
          <div className="flex items-center gap-6 text-[13px] text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

        {/* Huge Text */}
        <div className="w-full flex justify-center items-center mt-4 sm:mt-10 overflow-hidden relative">
          <BlurText 
            text="GOBIYA" 
            animateBy="letters" 
            delay={150}
            className="text-[17vw] sm:text-[23vw] leading-[0.75] font-bold tracking-tighter text-white select-none text-center justify-center flex-nowrap whitespace-nowrap" 
          />
        </div>
      </footer>
      <GradualBlur
        target="page"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
        zIndex={50}
      />
    </>
  );
};

export default Footer;
