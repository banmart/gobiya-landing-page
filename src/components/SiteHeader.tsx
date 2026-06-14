import React, { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/about', label: 'About' },
  { href: '/case-studies', label: 'Case studies' },
  { href: '/approach', label: 'Approach' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
];

const SiteHeader: React.FC = () => {
  const [path, setPath] = useState('/');

  useEffect(() => {
    setPath(window.location.pathname.toLowerCase().replace(/\/$/, '') || '/');
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return path === '/';
    return path === href || path.startsWith(href + '/');
  };

  return (
    <header className="site-nav">
      <div className="nav-inner" id="nav-inner">
        <a href="/" className="nav-brand" aria-label="GOBIYA home">
          <span className="brand-mark" aria-hidden="true">
            <img src="/images/gobiya---logo.webp" alt="GOBIYA logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </span>
          <span className="brand-name">
            <span className="mono-tag">AI Internet Marketing — LA</span>
            <strong>GOBIYA</strong>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} className={isActive(href) ? 'nav-active' : ''}>{label}</a>
          ))}
        </nav>

        <div className="nav-right">
          <span className="nav-status">BBB A+ · since 2012</span>
          <a href="tel:3237441338" className="hidden lg:inline-block text-[13px] font-mono tracking-wider text-[#2F5D50] hover:text-[#F26522] mr-2 transition-colors font-bold">
            323-744-1338
          </a>
          <a href="tel:3237441338" className="btn btn-primary flex items-center justify-center p-2 rounded-full lg:hidden w-8 h-8 shrink-0 text-white" aria-label="Call GOBIYA">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
          <a href="/book" className="btn btn-primary btn-nav">Start your audit</a>
          <button className="nav-burger" id="burger" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <div className="mobile-menu" id="mobile-menu">
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href} className={isActive(href) ? 'nav-active' : ''}>{label}</a>
        ))}
        <a href="tel:3237441338" className="btn btn-secondary w-full text-center mt-4 mb-2">Call 323-744-1338</a>
        <a href="/book" className="btn btn-primary">Start your audit</a>
      </div>
    </header>
  );
};

export default SiteHeader;
