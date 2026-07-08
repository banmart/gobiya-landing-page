import React, { useState, useEffect } from 'react';

// Spoke definitions for flyout sub-menus
const PERFORMANCE_SPOKES: Record<string, { title: string; href: string; query: string }[]> = {
  'seo-discoverability': [
    { title: 'Technical SEO Audit', href: '/performance/technical-seo-audit-agency', query: 'technical seo audit' },
    { title: 'Local SEO Services', href: '/performance/local-seo-services-agency', query: 'local seo services' },
    { title: 'B2B SEO', href: '/performance/b2b-seo-agency', query: 'b2b seo agency' },
    { title: 'E-commerce SEO', href: '/performance/ecommerce-seo-agency', query: 'ecommerce seo' },
  ],
  'web-development': [
    { title: 'Custom Web App Development', href: '/performance/custom-web-app-development-agency', query: 'custom web app dev' },
    { title: 'E-commerce Development', href: '/performance/ecommerce-web-development-agency', query: 'ecommerce dev' },
  ],
};

const SiteHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isHomepage, setIsHomepage] = useState(true);
  const [flyoutItem, setFlyoutItem] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  
  const [showAnnounce, setShowAnnounce] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('gobiya_announcement_dismissed');
      if (!dismissed) {
        setShowAnnounce(true);
      }
    }
  }, []);

  const transparentHeroPages = ['/', '', '/creativity', '/performance', '/relations'];
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      setIsHomepage(transparentHeroPages.includes(p) || transparentHeroPages.includes(p.replace(/\/$/, '')));
    }
  }, []);

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Scroll direction tracking:
      // Hide header if scrolling down and scrolled past 120px
      // Show header if scrolling up
      setLastScrollY(prev => {
        if (currentScrollY > prev && currentScrollY > 120) {
          setShowHeader(false);
        } else {
          setShowHeader(true);
        }
        return currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const isHeaderActive = isScrolled || isMobileMenuOpen || isMenuHovered || !isHomepage;
  const shouldShowHeader = showHeader || isMobileMenuOpen || isMenuHovered;

  return (
    <>
    <header 
      id="page-header" 
      className="page-header w-full z-[100] transition-transform duration-300 ease-in-out" 
      style={{ 
        position: "fixed", 
        top: 0, 
        left: 0,
        transform: shouldShowHeader ? "translateY(0)" : "translateY(-100%)",
        backgroundColor: (isHomepage && !isHeaderActive) ? "transparent" : "#ffffff"
      }}
      onMouseEnter={() => setIsMenuHovered(true)}
      onMouseLeave={() => setIsMenuHovered(false)}
    >
      {showAnnounce && (
        <div className="top-announcement-bar" onClick={() => window.location.href = '/book'}>
          <div className="top-announcement-link">
            <strong>15% off your first service</strong>&nbsp;— book a strategy call this week
          </div>
          <button 
            type="button" 
            className="top-announcement-close" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              localStorage.setItem('gobiya_announcement_dismissed', 'true');
              setShowAnnounce(false);
            }}
            aria-label="Close announcement"
          >
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}

      {/* Main Menu Layer */}
      <div className={`page-header__inner w-full mx-auto flex items-center justify-between static transition-all duration-300 ${isHeaderActive ? "bg-white shadow-md border-b border-line" : "bg-transparent"}`} style={{ paddingLeft: '5vw', paddingRight: '5vw', position: 'static' }}>
        <div className="logos-wrapper flex items-center shrink-0 relative z-50">
          <a className="flex items-center gap-3 py-3" href="/" title="GOBIYA - Back to home">
            <span className="flex items-center w-[140px] md:w-[185px] lg:w-[210px]">
              <img src="/images/logo-gobiya-07082026.webp" alt="GOBIYA logo" className="w-full h-auto object-contain transition-all duration-300" style={{ filter: isHeaderActive ? "none" : "invert(1) brightness(2)" }} />
            </span>
          </a>
        </div>

        <div className="main-menu-wrapper flex-1 flex justify-end lg:pr-8 static" style={{ position: 'static' }}>
          <div className="menu-main-en-container flex w-full justify-end static" style={{ position: 'static' }}>
            <ul id="menu-main-en" className="menu flex items-center gap-10 h-full static" style={{ position: 'static' }}>
              {/* Outcomes Dropdown */}
              <li className="menu-item group cursor-pointer relative lg:static h-full flex items-center" style={{ position: 'static' }} onMouseLeave={() => setFlyoutItem(null)}>
                <a href="/outcomes" className="flex items-center gap-1 py-4 font-medium hover:text-gray-400 transition-colors" style={{ color: isHeaderActive ? "#111827" : "#ffffff" }}>
                  Outcomes
                  <svg width="12" height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-180 transition-transform duration-300">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58564 3.52858C5.84599 3.26823 6.2681 3.26823 6.52845 3.52858L10.5285 7.52858C10.7888 7.78892 10.7888 8.21103 10.5285 8.47138L6.52845 12.4714C6.2681 12.7317 5.84599 12.7317 5.58564 12.4714C5.32529 12.211 5.32529 11.7889 5.58564 11.5286L9.11424 7.99998L5.58564 4.47138C5.32529 4.21103 5.32529 3.78892 5.58564 3.52858Z" fill="currentColor"/>
                  </svg>
                </a>
                <div className="absolute top-full left-0 w-full bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl border-t border-line">
                  <div className="w-full mx-auto" style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
                    <div className="w-full py-12">
                      <ul className="flex flex-col gap-3 text-left" style={{ maxWidth: '380px' }}>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/outcomes/traffic" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Traffic</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/outcomes/rankings" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Rankings</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/outcomes/sales" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Sales</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/google-penalty-recovery" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Recovery</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              {/* Case Studies */}
              <li className="menu-item relative lg:static h-full flex items-center" style={{ position: 'static' }}>
                <a href="/work" className="flex items-center gap-1 py-4 font-medium hover:text-gray-400 transition-colors" style={{ color: isHeaderActive ? "#111827" : "#ffffff" }}>
                  Work
                </a>
              </li>

              {/* About Dropdown */}
              <li className="menu-item group cursor-pointer relative lg:static h-full flex items-center" style={{ position: 'static' }} onMouseLeave={() => setFlyoutItem(null)}>
                <a href="/about" className="flex items-center gap-1 py-4 font-medium hover:text-gray-400 transition-colors" style={{ color: isHeaderActive ? "#111827" : "#ffffff" }}>
                  About
                  <svg width="12" height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-180 transition-transform duration-300">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58564 3.52858C5.84599 3.26823 6.2681 3.26823 6.52845 3.52858L10.5285 7.52858C10.7888 7.78892 10.7888 8.21103 10.5285 8.47138L6.52845 12.4714C6.2681 12.7317 5.84599 12.7317 5.58564 12.4714C5.32529 12.211 5.32529 11.7889 5.58564 11.5286L9.11424 7.99998L5.58564 4.47138C5.32529 4.21103 5.32529 3.78892 5.58564 3.52858Z" fill="currentColor"/>
                  </svg>
                </a>
                <div className="absolute top-full left-0 w-full bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl border-t border-line">
                  <div className="w-full mx-auto" style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
                    <div className="w-full py-12">
                      <ul className="flex flex-col gap-3 text-left" style={{ maxWidth: '380px' }}>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/about/steve-martin" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Steve Martin</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              {/* Contact */}
              <li className="menu-item relative lg:static h-full flex items-center" style={{ position: 'static' }}>
                <a href="/contact" className="flex items-center gap-1 py-4 font-medium hover:text-gray-400 transition-colors" style={{ color: isHeaderActive ? "#111827" : "#ffffff" }}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="nav-right flex items-center gap-4 relative z-50">
          <button 
            className="nav-burger lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open menu" 
            aria-expanded={isMobileMenuOpen}
          >
            <span className="w-8 transition-all duration-300" style={{ height: '2px', transform: isMobileMenuOpen ? 'translateY(8px) rotate(45deg)' : 'none', backgroundColor: isHeaderActive ? '#111827' : '#ffffff' }}></span>
            <span className="w-8 transition-all duration-300" style={{ height: '2px', opacity: isMobileMenuOpen ? 0 : 1, backgroundColor: isHeaderActive ? '#111827' : '#ffffff' }}></span>
            <span className="w-8 transition-all duration-300" style={{ height: '2px', transform: isMobileMenuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none', backgroundColor: isHeaderActive ? '#111827' : '#ffffff' }}></span>
          </button>
        </div>
      </div>
    </header>

      {/* Premium Mobile Menu Fullscreen Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-[90] lg:hidden transition-all duration-500`}
        style={{ 
          paddingTop: '100px',
          opacity: isMobileMenuOpen ? 1 : 0,
          transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
        }}
      >
        <div className="h-full w-full overflow-y-auto pb-24" style={{ paddingLeft: '6vw', paddingRight: '6vw' }}>
          <div className="flex flex-col gap-6 mt-8">
            
            {/* Outcomes Accordion */}
            <div className="border-b border-gray-200 pb-8">
              <div className="w-full text-gray-900" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
                Outcomes
              </div>
              <div style={{ overflow: 'hidden', marginTop: '1.5rem' }}>
                <div className="flex flex-col gap-5 pl-4" style={{ borderLeft: '2px solid #F3F4F6' }}>
                  <a href="/outcomes/traffic" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Traffic</a>
                  <a href="/outcomes/rankings" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Rankings</a>
                  <a href="/outcomes/sales" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Sales</a>
                  <a href="/google-penalty-recovery" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Recovery</a>
                </div>
              </div>
            </div>

            {/* Case Studies */}
            <div className="border-b border-gray-200 pb-8">
              <a href="/work" className="w-full text-gray-900 block" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
                Work
              </a>
            </div>

            {/* About Accordion */}
            <div className="border-b border-gray-200 pb-8">
              <div className="w-full text-gray-900" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
                About
              </div>
              <div style={{ overflow: 'hidden', marginTop: '1.5rem' }}>
                <div className="flex flex-col gap-5 pl-4" style={{ borderLeft: '2px solid #F3F4F6' }}>
                  <a href="/about/steve-martin" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Steve Martin</a>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="pb-8">
              <a href="/contact" className="w-full text-gray-900 block" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
                Contact
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default SiteHeader;
