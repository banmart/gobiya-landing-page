import React, { useEffect, useState } from 'react';
import CTASection from './CTASection';

interface SiteFooterProps {
  showWebGL?: boolean;
  hideCTA?: boolean;
  ctaTopic?: string;
}

const SiteFooter: React.FC<SiteFooterProps> = ({ showWebGL = false, hideCTA = false, ctaTopic }) => {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanPath = currentPath.toLowerCase().replace(/\/$/, '') || '/';
  const shouldHideCTA = hideCTA || 
    cleanPath.startsWith('/admin') || 
    cleanPath === '/thank-you' || 
    cleanPath === '/book' || 
    cleanPath === '/book-call' || 
    cleanPath === '/contact';

  return (
    <>
      {!shouldHideCTA && <CTASection topic={ctaTopic} path={currentPath} />}
      <footer className="footer bg-[#1C201D] text-[#FFFFFF] relative overflow-hidden pt-24 pb-16" style={{ borderTop: '1px solid #2d332f' }}>
      <div className="w-full mx-auto relative z-10" style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Brand & Left Links Column */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <a href="/" className="nav-brand flex items-center mb-10" aria-label="GOBIYA home">
                <span className="flex items-center w-[120px] md:w-[150px]">
                  <img 
                    src="/images/logo-gobiya-07082026.webp" 
                    alt="GOBIYA logo" 
                    className="w-full h-auto object-contain" 
                    style={{ filter: 'invert(1) brightness(2)' }} 
                  />
                </span>
              </a>
              <div className="flex flex-col gap-4 text-base font-medium">
                <a href="/about" className="text-[#E5E7EB] hover:text-white transition-colors" style={{ textDecoration: 'none' }}>Company profile</a>
              </div>
            </div>
          </div>

          {/* Offices Column */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-[#ffffff] font-bold mb-4">LOS ANGELES</h4>
              <div className="text-sm leading-relaxed flex flex-col gap-1.5" style={{ color: 'rgba(255,255,255,0.85)' }}>
                <p style={{ color: 'rgba(255,255,255,0.85)' }}>3580 Wilshire Blvd, Ste 132</p>
                <p style={{ color: 'rgba(255,255,255,0.85)' }}>Los Angeles, CA 90010</p>
                <p className="mt-2" style={{ color: 'rgba(255,255,255,0.85)' }}>T 323-744-1338</p>
                <p style={{ color: 'rgba(255,255,255,0.85)' }}>E hello@gobiya.com</p>
              </div>
            </div>
          </div>

          {/* Subscription Column with Vertical Divider */}
          <div className="lg:col-span-5 flex flex-col justify-start pl-0 lg:pl-16 border-t lg:border-t-0 lg:border-l border-[#2d332f] pt-8 lg:pt-0">
            <h3 className="text-2xl md:text-3.5xl font-bold tracking-tight text-white leading-tight mb-4">
              Looking for updates and inspiration?
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Subscribe to our newsletter to receive insight and useful ideas for your communication and marketing projects.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md w-full gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-[#2D332F] text-white border-none outline-none px-4 py-3 rounded-md w-full text-sm placeholder-[#6b7570]" 
                required
              />
              <button 
                type="submit" 
                className="bg-white px-6 py-3 rounded-md font-semibold text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors whitespace-nowrap"
                style={{ color: '#1C201D' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom mt-20 pt-8 border-t border-[#2d332f] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-[#E5E7EB] font-light">
          <div className="flex flex-col gap-3">
            <a 
              href="#top" 
              onClick={scrollToTop} 
              className="hover:text-white transition-colors font-medium flex items-center gap-1 text-sm mb-2"
              style={{ textDecoration: 'none', color: '#FFFFFF' }}
            >
              Back to top ↑
            </a>
            <p style={{ color: 'rgba(255,255,255,0.65)' }}>© 2026 Gobiya LLC. Operating since 2012. BBB A+ Rated. Omnichannel Solutions.</p>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)' }}>Privacy policy</a>
            <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)' }}>Cookie policy</a>
            <a href="#" className="hover:text-white transition-colors" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)' }}>Cookie preferences</a>
            <a href="/contact" className="hover:text-white transition-colors" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)' }}>Contact us</a>
          </div>
        </div>
      </div>
    </footer>
  </>
  );
};

export default SiteFooter;
