import React, { useState, useEffect } from 'react';

// Spoke definitions for flyout sub-menus
const CREATIVITY_SPOKES: Record<string, { title: string; href: string; query: string }[]> = {
  'seo-copywriting': [
    { title: 'Landing Page Copywriting', href: '/creativity/landing-page-copywriting-agency', query: 'landing page copy' },
    { title: 'Website Copywriting', href: '/creativity/website-copywriting-services-agency', query: 'website copy services' },
    { title: 'SEO Content Strategy', href: '/creativity/seo-content-strategy-agency', query: 'seo content strategy' },
    { title: 'GEO & AI Content', href: '/creativity/geo-ai-content-writing-agency', query: 'geo ai content writing' },
  ],
};

const PERFORMANCE_SPOKES: Record<string, { title: string; href: string; query: string }[]> = {
  'seo-discoverability': [
    { title: 'Technical SEO Audit', href: '/performance/technical-seo-audit-agency', query: 'technical seo audit' },
    { title: 'Local SEO Services', href: '/performance/local-seo-services-agency', query: 'local seo services' },
    { title: 'B2B SEO', href: '/performance/b2b-seo-agency', query: 'b2b seo agency' },
    { title: 'E-commerce SEO', href: '/performance/ecommerce-seo-agency', query: 'ecommerce seo' },
  ],
  'web-development': [
    { title: 'Custom Web App Development', href: '/performance/custom-web-app-development-agency', query: 'custom web app dev' },
    { title: 'Mobile App Development', href: '/performance/mobile-app-development-agency', query: 'mobile app dev' },
    { title: 'IT Consulting & Strategy', href: '/performance/it-consulting-services-agency', query: 'it consulting' },
    { title: 'E-commerce Development', href: '/performance/ecommerce-web-development-agency', query: 'ecommerce dev' },
  ],
};

const RELATIONS_SPOKES: Record<string, { title: string; href: string; query: string }[]> = {
  'google-ads-ppc': [
    { title: 'Google Search Ads', href: '/relations/google-search-ads-agency', query: 'google search ads' },
    { title: 'Google Shopping Ads', href: '/relations/google-shopping-ads-agency', query: 'google shopping ads' },
    { title: 'Remarketing & Display', href: '/relations/remarketing-display-ads-agency', query: 'remarketing display ads' },
    { title: 'YouTube Advertising', href: '/relations/youtube-advertising-agency', query: 'youtube advertising' },
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
      {/* Top Menu Layer */}
      <div 
        className="top-menu transition-all duration-300" 
        style={{ 
          backgroundColor: isHeaderActive 
            ? "#1C201D" 
            : "transparent",
          borderBottom: isHeaderActive 
            ? "1px solid #2d332f" 
            : "1px solid rgba(255,255,255,0.1)" 
        }}
      >
        <div className="container top-menu__inner">
          <div className="menu-top-en-container">
            <ul 
              id="menu-top-en" 
              className="menu transition-colors duration-300" 
              style={{ 
                color: isHeaderActive 
                  ? "#A1A8A3" 
                  : "#ffffff" 
              }}
            >
              <li className="menu-item menu-item-has-children">
                <a href="/about">
                  About us{" "}
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58564 3.52858C5.84599 3.26823 6.2681 3.26823 6.52845 3.52858L10.5285 7.52858C10.7888 7.78892 10.7888 8.21103 10.5285 8.47138L6.52845 12.4714C6.2681 12.7317 5.84599 12.7317 5.58564 12.4714C5.32529 12.211 5.32529 11.7889 5.58564 11.5286L9.11424 7.99998L5.58564 4.47138C5.32529 4.21103 5.32529 3.78892 5.58564 3.52858Z" fill="currentColor"/>
                  </svg>
                </a>
                <ul className="sub-menu">
                  <li className="menu-item"><a href="/about">About Agency</a></li>
                  <li className="menu-item"><a href="/about/steve-martin">Steve Martin</a></li>
                  <li className="menu-item"><a href="/approach">Our Approach</a></li>
                </ul>
              </li>
              <li className="menu-item menu-item-has-children">
                <a href="/contact">
                  Offices{" "}
                  <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58564 3.52858C5.84599 3.26823 6.2681 3.26823 6.52845 3.52858L10.5285 7.52858C10.7888 7.78892 10.7888 8.21103 10.5285 8.47138L6.52845 12.4714C6.2681 12.7317 5.84599 12.7317 5.58564 12.4714C5.32529 12.211 5.32529 11.7889 5.58564 11.5286L9.11424 7.99998L5.58564 4.47138C5.32529 4.21103 5.32529 3.78892 5.58564 3.52858Z" fill="currentColor"/>
                  </svg>
                </a>
                <ul className="sub-menu">
                  <li className="menu-item"><a href="/contact">Los Angeles</a></li>
                </ul>
              </li>
              <li className="menu-item"><a href="/insights">News &amp; Insights</a></li>
              <li className="menu-item"><a href="/contact">Careers</a></li>
              <li className="menu-item"><a href="/contact">Contact us</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Menu Layer */}
      <div className={`page-header__inner w-full mx-auto flex items-center justify-between static transition-all duration-300 ${isHeaderActive ? "bg-white shadow-md border-b border-line" : "bg-transparent"}`} style={{ paddingLeft: '5vw', paddingRight: '5vw', position: 'static' }}>
        <div className="logos-wrapper flex items-center shrink-0 relative z-50">
          <a className="flex items-center gap-3 py-3" href="/" title="GOBIYA - Back to home">
            <span className="flex items-center w-[140px] md:w-[185px] lg:w-[210px]">
              <img src="/images/logo-gobiya-blastoff-small.webp" alt="GOBIYA logo" className="w-full h-auto object-contain transition-all duration-300" style={{ filter: isHeaderActive ? "none" : "invert(1) brightness(2)" }} />
            </span>
          </a>
        </div>

        <div className="main-menu-wrapper flex-1 flex justify-end lg:pr-8 static" style={{ position: 'static' }}>
          <div className="menu-main-en-container flex w-full justify-end static" style={{ position: 'static' }}>
            <ul id="menu-main-en" className="menu flex items-center gap-10 h-full static" style={{ position: 'static' }}>
              {/* Creativity Dropdown */}
              <li className="menu-item group cursor-pointer relative lg:static h-full flex items-center" style={{ position: 'static' }} onMouseLeave={() => setFlyoutItem(null)}>
                <a href="/creativity" className="flex items-center gap-1 py-4 font-medium hover:text-gray-400 transition-colors" style={{ color: isHeaderActive ? "#111827" : "#ffffff" }}>
                  Creativity
                  <svg width="12" height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-180 transition-transform duration-300">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58564 3.52858C5.84599 3.26823 6.2681 3.26823 6.52845 3.52858L10.5285 7.52858C10.7888 7.78892 10.7888 8.21103 10.5285 8.47138L6.52845 12.4714C6.2681 12.7317 5.84599 12.7317 5.58564 12.4714C5.32529 12.211 5.32529 11.7889 5.58564 11.5286L9.11424 7.99998L5.58564 4.47138C5.32529 4.21103 5.32529 3.78892 5.58564 3.52858Z" fill="currentColor"/>
                  </svg>
                </a>
                <div className="absolute top-full left-0 w-full bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl border-t border-line">
                  <div className="w-full mx-auto" style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
                    <div className="w-full py-12">
                      <ul className="flex flex-col gap-3 text-left" style={{ maxWidth: '380px' }}>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/creativity" className="text-gray-900 font-bold text-lg hover:text-gray-500 transition-colors block border-b border-line pb-4 mb-2">Overview &rarr;</a>
                        </li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/creativity/brand-identity-strategy-agency" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Brand Identity Strategy</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/creativity/communication-concepts-agency" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Communication Concepts</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                        {/* Hub item — inline spoke sub-nav */}
                        <li onMouseEnter={() => setFlyoutItem('seo-copywriting')}>
                          <a href="/creativity/seo-web-copywriting-agency" className="group/link transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30" style={{ color: flyoutItem === 'seo-copywriting' ? '#111827' : '#6b7280' }}>
                            <span style={{ fontWeight: flyoutItem === 'seo-copywriting' ? 600 : 400 }}>SEO &amp; Web Copywriting</span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: flyoutItem === 'seo-copywriting' ? '#111827' : '#9ca3af', transition: 'color 0.2s, transform 0.2s', transform: flyoutItem === 'seo-copywriting' ? 'rotate(90deg)' : 'none' }}>
                              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                          {/* Inline spoke sub-list */}
                          <ul style={{
                            overflow: 'hidden',
                            maxHeight: flyoutItem === 'seo-copywriting' ? '200px' : '0',
                            opacity: flyoutItem === 'seo-copywriting' ? 1 : 0,
                            transition: 'max-height 0.25s ease, opacity 0.2s ease',
                            paddingLeft: '0.75rem',
                            borderLeft: '2px solid #e5e7eb',
                            marginTop: flyoutItem === 'seo-copywriting' ? '4px' : '0',
                            marginBottom: flyoutItem === 'seo-copywriting' ? '4px' : '0',
                          }}>
                            {CREATIVITY_SPOKES['seo-copywriting'].map((spoke, i) => (
                              <li key={i}>
                                <a href={spoke.href} className="group/spoke flex items-center justify-between transition-colors duration-150" style={{ color: '#6b7280', textDecoration: 'none', padding: '5px 0', fontSize: '0.875rem' }}
                                  onMouseEnter={e => (e.currentTarget.style.color = '#111827')}
                                  onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
                                >
                                  {spoke.title}
                                  <span className="opacity-0 group-hover/spoke:opacity-100 transition-opacity" style={{ fontWeight: 700 }}>&rarr;</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/creativity/creative-art-direction-agency" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Creative Art Direction</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/creativity/social-media-management-agency" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Social Media Management</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              
              {/* Performance Dropdown */}
              <li className="menu-item group cursor-pointer relative lg:static h-full flex items-center" style={{ position: 'static' }} onMouseLeave={() => setFlyoutItem(null)}>
                <a href="/performance" className="flex items-center gap-1 py-4 font-medium hover:text-gray-400 transition-colors" style={{ color: isHeaderActive ? "#111827" : "#ffffff" }}>
                  Performance
                  <svg width="12" height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-180 transition-transform duration-300">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58564 3.52858C5.84599 3.26823 6.2681 3.26823 6.52845 3.52858L10.5285 7.52858C10.7888 7.78892 10.7888 8.21103 10.5285 8.47138L6.52845 12.4714C6.2681 12.7317 5.84599 12.7317 5.58564 12.4714C5.32529 12.211 5.32529 11.7889 5.58564 11.5286L9.11424 7.99998L5.58564 4.47138C5.32529 4.21103 5.32529 3.78892 5.58564 3.52858Z" fill="currentColor"/>
                  </svg>
                </a>
                <div className="absolute top-full left-0 w-full bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl border-t border-line">
                  <div className="w-full mx-auto" style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
                    <div className="w-full py-12">
                      <ul className="flex flex-col gap-3 text-left" style={{ maxWidth: '380px' }}>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/performance" className="text-gray-900 font-bold text-lg hover:text-gray-500 transition-colors block border-b border-line pb-4 mb-2">Overview &rarr;</a>
                        </li>
                        {/* Hub item — inline spoke sub-nav */}
                        <li onMouseEnter={() => setFlyoutItem('seo-discoverability')}>
                          <a href="/performance/seo-discoverability-agency" className="group/link transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30" style={{ color: flyoutItem === 'seo-discoverability' ? '#111827' : '#6b7280' }}>
                            <span style={{ fontWeight: flyoutItem === 'seo-discoverability' ? 600 : 400 }}>SEO &amp; Discoverability</span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: flyoutItem === 'seo-discoverability' ? '#111827' : '#9ca3af', transition: 'color 0.2s, transform 0.2s', transform: flyoutItem === 'seo-discoverability' ? 'rotate(90deg)' : 'none' }}>
                              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                          {/* Inline spoke sub-list */}
                          <ul style={{
                            overflow: 'hidden',
                            maxHeight: flyoutItem === 'seo-discoverability' ? '200px' : '0',
                            opacity: flyoutItem === 'seo-discoverability' ? 1 : 0,
                            transition: 'max-height 0.25s ease, opacity 0.2s ease',
                            paddingLeft: '0.75rem',
                            borderLeft: '2px solid #e5e7eb',
                            marginTop: flyoutItem === 'seo-discoverability' ? '4px' : '0',
                            marginBottom: flyoutItem === 'seo-discoverability' ? '4px' : '0',
                          }}>
                            {PERFORMANCE_SPOKES['seo-discoverability'].map((spoke, i) => (
                              <li key={i}>
                                <a href={spoke.href} className="group/spoke flex items-center justify-between transition-colors duration-150" style={{ color: '#6b7280', textDecoration: 'none', padding: '5px 0', fontSize: '0.875rem' }}
                                  onMouseEnter={e => (e.currentTarget.style.color = '#111827')}
                                  onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
                                >
                                  {spoke.title}
                                  <span className="opacity-0 group-hover/spoke:opacity-100 transition-opacity" style={{ fontWeight: 700 }}>&rarr;</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        {/* Hub item — inline spoke sub-nav */}
                        <li onMouseEnter={() => setFlyoutItem('web-development')}>
                          <a href="/performance/web-development-agency" className="group/link transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30" style={{ color: flyoutItem === 'web-development' ? '#111827' : '#6b7280' }}>
                            <span style={{ fontWeight: flyoutItem === 'web-development' ? 600 : 400 }}>Web &amp; IT App Development</span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: flyoutItem === 'web-development' ? '#111827' : '#9ca3af', transition: 'color 0.2s, transform 0.2s', transform: flyoutItem === 'web-development' ? 'rotate(90deg)' : 'none' }}>
                              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                          {/* Inline spoke sub-list */}
                          <ul style={{
                            overflow: 'hidden',
                            maxHeight: flyoutItem === 'web-development' ? '200px' : '0',
                            opacity: flyoutItem === 'web-development' ? 1 : 0,
                            transition: 'max-height 0.25s ease, opacity 0.2s ease',
                            paddingLeft: '0.75rem',
                            borderLeft: '2px solid #e5e7eb',
                            marginTop: flyoutItem === 'web-development' ? '4px' : '0',
                            marginBottom: flyoutItem === 'web-development' ? '4px' : '0',
                          }}>
                            {PERFORMANCE_SPOKES['web-development'].map((spoke, i) => (
                              <li key={i}>
                                <a href={spoke.href} className="group/spoke flex items-center justify-between transition-colors duration-150" style={{ color: '#6b7280', textDecoration: 'none', padding: '5px 0', fontSize: '0.875rem' }}
                                  onMouseEnter={e => (e.currentTarget.style.color = '#111827')}
                                  onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
                                >
                                  {spoke.title}
                                  <span className="opacity-0 group-hover/spoke:opacity-100 transition-opacity" style={{ fontWeight: 700 }}>&rarr;</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/performance/google-ads-ppc-strategy-agency" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Google Ads &amp; PPC Strategy</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/performance/cro-ux-analysis-agency" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>CRO &amp; UX Analysis</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/performance/ai-llms-business-agency" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>AI &amp; LLM Systems Consulting</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              {/* Relations Dropdown */}
              <li className="menu-item group cursor-pointer relative lg:static h-full flex items-center" style={{ position: 'static' }} onMouseLeave={() => setFlyoutItem(null)}>
                <a href="/relations" className="flex items-center gap-1 py-4 font-medium hover:text-gray-400 transition-colors" style={{ color: isHeaderActive ? "#111827" : "#ffffff" }}>
                  Relations
                  <svg width="12" height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-180 transition-transform duration-300">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58564 3.52858C5.84599 3.26823 6.2681 3.26823 6.52845 3.52858L10.5285 7.52858C10.7888 7.78892 10.7888 8.21103 10.5285 8.47138L6.52845 12.4714C6.2681 12.7317 5.84599 12.7317 5.58564 12.4714C5.32529 12.211 5.32529 11.7889 5.58564 11.5286L9.11424 7.99998L5.58564 4.47138C5.32529 4.21103 5.32529 3.78892 5.58564 3.52858Z" fill="currentColor"/>
                  </svg>
                </a>
                <div className="absolute top-full left-0 w-full bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl border-t border-line">
                  <div className="w-full mx-auto flex" style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
                    <div className="w-full lg:w-1/3 py-12 pr-8 border-r border-line">
                      <ul className="flex flex-col gap-3 text-left">
                        <li onMouseEnter={() => setFlyoutItem(null)}><a href="/relations" className="text-gray-900 font-bold text-lg hover:text-gray-500 transition-colors block border-b border-line pb-4 mb-2">Overview &rarr;</a></li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/relations/authority-building-agency" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Authority &amp; Link Building</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/relations/digital-pr-media-outreach-agency" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Digital PR &amp; Media Outreach</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                        {/* Hub item — inline spoke sub-nav */}
                        <li onMouseEnter={() => setFlyoutItem('google-ads-ppc')}>
                          <a href="/relations/google-ads-ppc-strategy-agency" className="group/link transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30" style={{ color: flyoutItem === 'google-ads-ppc' ? '#111827' : '#6b7280' }}>
                            <span style={{ fontWeight: flyoutItem === 'google-ads-ppc' ? 600 : 400 }}>Google Ads &amp; PPC Strategy</span>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: flyoutItem === 'google-ads-ppc' ? '#111827' : '#9ca3af', transition: 'color 0.2s, transform 0.2s', transform: flyoutItem === 'google-ads-ppc' ? 'rotate(90deg)' : 'none' }}>
                              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </a>
                          {/* Inline spoke sub-list */}
                          <ul style={{
                            overflow: 'hidden',
                            maxHeight: flyoutItem === 'google-ads-ppc' ? '200px' : '0',
                            opacity: flyoutItem === 'google-ads-ppc' ? 1 : 0,
                            transition: 'max-height 0.25s ease, opacity 0.2s ease',
                            paddingLeft: '0.75rem',
                            borderLeft: '2px solid #e5e7eb',
                            marginTop: flyoutItem === 'google-ads-ppc' ? '4px' : '0',
                            marginBottom: flyoutItem === 'google-ads-ppc' ? '4px' : '0',
                          }}>
                            {RELATIONS_SPOKES['google-ads-ppc'].map((spoke, i) => (
                              <li key={i}>
                                <a href={spoke.href} className="group/spoke flex items-center justify-between transition-colors duration-150" style={{ color: '#6b7280', textDecoration: 'none', padding: '5px 0', fontSize: '0.875rem' }}
                                  onMouseEnter={e => (e.currentTarget.style.color = '#111827')}
                                  onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
                                >
                                  {spoke.title}
                                  <span className="opacity-0 group-hover/spoke:opacity-100 transition-opacity" style={{ fontWeight: 700 }}>&rarr;</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/relations/content-marketing-syndication-agency" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Content Marketing Syndication</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/relations/influencer-marketing-agency" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Influencer Marketing</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                        <li onMouseEnter={() => setFlyoutItem(null)}>
                          <a href="/relations/local-community-relations-agency" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Local Community Relations</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="hidden lg:block lg:w-2/3 bg-gray-50/50"></div>
                  </div>
                </div>
              </li>

              {/* Recovery Link */}
              <li className="menu-item group cursor-pointer relative h-full flex items-center">
                <a href="/google-penalty-recovery" className="flex items-center gap-1 py-4 font-medium hover:text-gray-400 transition-colors" style={{ color: isHeaderActive ? "#111827" : "#ffffff" }}>
                  Recovery
                </a>
              </li>

              {/* Case Studies Dropdown */}
              <li className="menu-item group cursor-pointer relative lg:static h-full flex items-center" style={{ position: 'static' }}>
                <a href="/case-studies" className="flex items-center gap-1 py-4 font-medium hover:text-gray-400 transition-colors" style={{ color: isHeaderActive ? "#111827" : "#ffffff" }}>
                  Case Studies
                  <svg width="12" height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-180 transition-transform duration-300">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58564 3.52858C5.84599 3.26823 6.2681 3.26823 6.52845 3.52858L10.5285 7.52858C10.7888 7.78892 10.7888 8.21103 10.5285 8.47138L6.52845 12.4714C6.2681 12.7317 5.84599 12.7317 5.58564 12.4714C5.32529 12.211 5.32529 11.7889 5.58564 11.5286L9.11424 7.99998L5.58564 4.47138C5.32529 4.21103 5.32529 3.78892 5.58564 3.52858Z" fill="currentColor"/>
                  </svg>
                </a>
                <div className="absolute top-full left-0 w-full bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl border-t border-line">
                  <div className="w-full mx-auto flex" style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
                    <div className="w-full lg:w-1/3 py-12 pr-8 border-r border-line">
                      <ul className="flex flex-col gap-3 text-left">
                        <li><a href="/case-studies" className="text-gray-900 font-bold text-lg hover:text-gray-500 transition-colors block border-b border-line pb-4 mb-2">Overview &rarr;</a></li>
                        <li>
                          <a href="/case-studies/smile-center-dentistry" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>Smile Center Dentistry</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                        <li>
                          <a href="/case-studies/american-livescan" className="group/link text-gray-500 hover:text-gray-900 transition-all duration-200 flex items-center justify-between text-base py-2 border-b border-gray-100/30">
                            <span>American Livescan</span>
                            <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-200 text-gray-900 font-bold">&rarr;</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="hidden lg:block lg:w-2/3 bg-gray-50/50"></div>
                  </div>
                </div>
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
            
            {/* Creativity Accordion */}
            <div className="border-b border-gray-200 pb-8">
              <div className="w-full text-gray-900" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
    Creativity
  </div>
              <div style={{ overflow: 'hidden', marginTop: '1.5rem' }}>
                <div className="flex flex-col gap-5 pl-4" style={{ borderLeft: '2px solid #F3F4F6' }}>
                  <a href="/creativity" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>Overview &rarr;</a>
                  <a href="/creativity/brand-identity-strategy-agency" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Brand Identity Strategy</a>
                  <a href="/creativity/communication-concepts-agency" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Communication Concepts</a>
                  {/* Hub item with tap-to-expand spokes */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <a href="/creativity/seo-web-copywriting-agency" style={{ fontSize: '1.125rem', color: '#111827', fontWeight: 600 }}>SEO &amp; Web Copywriting</a>
                      <button onClick={() => setMobileExpanded(mobileExpanded === 'seo-copywriting' ? null : 'seo-copywriting')} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} aria-label="Expand spoke pages">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: '#6B7280', transition: 'transform 0.2s', transform: mobileExpanded === 'seo-copywriting' ? 'rotate(90deg)' : 'none' }}>
                          <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    {mobileExpanded === 'seo-copywriting' && (
                      <div style={{ marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {CREATIVITY_SPOKES['seo-copywriting'].map((spoke, i) => (
                          <a key={i} href={spoke.href} style={{ fontSize: '1rem', color: '#6B7280' }}>{spoke.title}</a>
                        ))}
                      </div>
                    )}
                  </div>
                  <a href="/creativity/creative-art-direction-agency" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Creative Art Direction</a>
                  <a href="/creativity/social-media-management-agency" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Social Media Management</a>
                </div>
              </div>
            </div>

            {/* Performance Accordion */}
            <div className="border-b border-gray-200 pb-8">
              <div className="w-full text-gray-900" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
    Performance
  </div>
              <div style={{ overflow: 'hidden', marginTop: '1.5rem' }}>
                <div className="flex flex-col gap-5 pl-4" style={{ borderLeft: '2px solid #F3F4F6' }}>
                  <a href="/performance" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>Overview &rarr;</a>
                  {/* Hub item with tap-to-expand spokes */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <a href="/performance/seo-discoverability-agency" style={{ fontSize: '1.125rem', color: '#111827', fontWeight: 600 }}>SEO &amp; Discoverability</a>
                      <button onClick={() => setMobileExpanded(mobileExpanded === 'seo-discoverability' ? null : 'seo-discoverability')} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} aria-label="Expand spoke pages">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: '#6B7280', transition: 'transform 0.2s', transform: mobileExpanded === 'seo-discoverability' ? 'rotate(90deg)' : 'none' }}>
                          <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    {mobileExpanded === 'seo-discoverability' && (
                      <div style={{ marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {PERFORMANCE_SPOKES['seo-discoverability'].map((spoke, i) => (
                          <a key={i} href={spoke.href} style={{ fontSize: '1rem', color: '#6B7280' }}>{spoke.title}</a>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Hub item with tap-to-expand spokes */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <a href="/performance/web-development-agency" style={{ fontSize: '1.125rem', color: '#111827', fontWeight: 600 }}>Web &amp; IT App Development</a>
                      <button onClick={() => setMobileExpanded(mobileExpanded === 'web-development' ? null : 'web-development')} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} aria-label="Expand spoke pages">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: '#6B7280', transition: 'transform 0.2s', transform: mobileExpanded === 'web-development' ? 'rotate(90deg)' : 'none' }}>
                          <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    {mobileExpanded === 'web-development' && (
                      <div style={{ marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {PERFORMANCE_SPOKES['web-development'].map((spoke, i) => (
                          <a key={i} href={spoke.href} style={{ fontSize: '1rem', color: '#6B7280' }}>{spoke.title}</a>
                        ))}
                      </div>
                    )}
                  </div>
                  <a href="/performance/google-ads-ppc-strategy-agency" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Google Ads &amp; PPC Strategy</a>
                  <a href="/performance/cro-ux-analysis-agency" style={{ fontSize: '1.125rem', color: '#6B7280' }}>CRO &amp; UX Analysis</a>
                  <a href="/performance/ai-llms-business-agency" style={{ fontSize: '1.125rem', color: '#6B7280' }}>AI &amp; LLM Systems Consulting</a>
                </div>
              </div>
            </div>

            {/* Relations Accordion */}
            <div className="border-b border-gray-200 pb-8">
              <div className="w-full text-gray-900" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
    Relations
  </div>
              <div style={{ overflow: 'hidden', marginTop: '1.5rem' }}>
                <div className="flex flex-col gap-5 pl-4" style={{ borderLeft: '2px solid #F3F4F6' }}>
                  <a href="/relations" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>Overview &rarr;</a>
                  <a href="/relations/authority-building-agency" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Authority &amp; Link Building</a>
                  <a href="/relations/digital-pr-media-outreach-agency" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Digital PR &amp; Media Outreach</a>
                  {/* Hub item with tap-to-expand spokes */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <a href="/relations/google-ads-ppc-strategy-agency" style={{ fontSize: '1.125rem', color: '#111827', fontWeight: 600 }}>Google Ads &amp; PPC Strategy</a>
                      <button onClick={() => setMobileExpanded(mobileExpanded === 'google-ads-ppc' ? null : 'google-ads-ppc')} style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} aria-label="Expand spoke pages">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: '#6B7280', transition: 'transform 0.2s', transform: mobileExpanded === 'google-ads-ppc' ? 'rotate(90deg)' : 'none' }}>
                          <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                    {mobileExpanded === 'google-ads-ppc' && (
                      <div style={{ marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {RELATIONS_SPOKES['google-ads-ppc'].map((spoke, i) => (
                          <a key={i} href={spoke.href} style={{ fontSize: '1rem', color: '#6B7280' }}>{spoke.title}</a>
                        ))}
                      </div>
                    )}
                  </div>
                  <a href="/relations/content-marketing-syndication-agency" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Content Marketing Syndication</a>
                  <a href="/relations/influencer-marketing-agency" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Influencer Marketing</a>
                  <a href="/relations/local-community-relations-agency" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Local Community Relations</a>
                </div>
              </div>
            </div>

            {/* Recovery Link */}
            <div className="border-b border-gray-200 pb-8">
              <a href="/google-penalty-recovery" className="w-full text-gray-900 block" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
                Recovery
              </a>
            </div>

            {/* Case Studies Accordion */}
            <div className="border-b border-gray-200 pb-8">
              <div className="w-full text-gray-900" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
                Case Studies
              </div>
              <div style={{ overflow: 'hidden', marginTop: '1.5rem' }}>
                <div className="flex flex-col gap-5 pl-4" style={{ borderLeft: '2px solid #F3F4F6' }}>
                  <a href="/case-studies" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>Overview &rarr;</a>
                  <a href="/case-studies/smile-center-dentistry" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Smile Center Dentistry</a>
                  <a href="/case-studies/american-livescan" style={{ fontSize: '1.125rem', color: '#6B7280' }}>American Livescan</a>
                </div>
              </div>
            </div>

            {/* About Us Accordion */}
            <div className="border-b border-gray-200 pb-8">
              <div className="w-full text-gray-900" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
                About Us
              </div>
              <div style={{ overflow: 'hidden', marginTop: '1.5rem' }}>
                <div className="flex flex-col gap-5 pl-4" style={{ borderLeft: '2px solid #F3F4F6' }}>
                  <a href="/about" style={{ fontSize: '1.125rem', color: '#6B7280' }}>About Agency</a>
                  <a href="/about/steve-martin" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Steve Martin</a>
                  <a href="/approach" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Our Approach</a>
                </div>
              </div>
            </div>

            {/* Offices Accordion */}
            <div className="border-b border-gray-200 pb-8">
              <div className="w-full text-gray-900" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
                Offices
              </div>
              <div style={{ overflow: 'hidden', marginTop: '1.5rem' }}>
                <div className="flex flex-col gap-5 pl-4" style={{ borderLeft: '2px solid #F3F4F6' }}>
                  <a href="/contact" style={{ fontSize: '1.125rem', color: '#6B7280' }}>Los Angeles</a>
                </div>
              </div>
            </div>

            {/* Other Links */}
            <div className="border-b border-gray-200 pb-8">
              <a href="/insights" className="w-full text-gray-900 block" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
                News &amp; Insights
              </a>
            </div>
            <div className="border-b border-gray-200 pb-8">
              <a href="/contact" className="w-full text-gray-900 block" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
                Careers
              </a>
            </div>
            <div className="pb-8">
              <a href="/contact" className="w-full text-gray-900 block" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
                Contact us
              </a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default SiteHeader;
