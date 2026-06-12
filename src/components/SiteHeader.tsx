import React, { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/company/about', label: 'About' },
  { href: '/company/success-stories', label: 'Success stories' },
  { href: '/company/approach', label: 'Approach' },
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
        <a href="/book" className="btn btn-primary">Start your audit</a>
      </div>
    </header>
  );
};

export default SiteHeader;
