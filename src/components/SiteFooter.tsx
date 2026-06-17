import React from 'react';
import HeroWebGLBackground from './HeroWebGLBackground';

interface SiteFooterProps {
  showWebGL?: boolean;
}

const SiteFooter: React.FC<SiteFooterProps> = ({ showWebGL = true }) => {
  return (
    <footer className="footer relative overflow-hidden">
      {showWebGL && <HeroWebGLBackground />}
      <div className="footer-inner relative z-10">
        <div className="footer-grid">
          <div>
            <a href="/" className="nav-brand" aria-label="GOBIYA home">
              <span className="brand-mark" aria-hidden="true">
                <img src="/images/gobiya---logo.webp" alt="GOBIYA logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </span>
              <span className="brand-name">
                <span className="mono-tag">AI Internet Marketing — LA</span>
                <strong>GOBIYA</strong>
              </span>
            </a>
            <p className="footer-about">
              We build fast, modern websites engineered to rank and convert — with
              native CRM and blockchain built in. Engineering search dominance
              since 2012.
            </p>
          </div>
          <div>
            <h5>Capabilities</h5>
            <ul>
              <li><a href="/capabilities/web-development">Web Development</a></li>
              <li><a href="/capabilities/native-crm">Native CRM</a></li>
              <li><a href="/capabilities/seo-discoverability">SEO &amp; Discoverability</a></li>
              <li><a href="/capabilities/blockchain-web3-development">Blockchain &amp; Web3</a></li>
              <li><a href="/capabilities/ai-llms-business">AI &amp; LLMs</a></li>
              <li><a href="/capabilities/authority-building">Authority Building</a></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="/about">About the Agency</a></li>
              <li><a href="/case-studies">Case Studies</a></li>
              <li><a href="/approach">Our Approach</a></li>
              <li><a href="/insights">Industry Insights</a></li>
            </ul>
          </div>
          <div>
            <h5>Connect</h5>
            <ul>
              <li><a href="tel:3237441338">Call: 323-744-1338</a></li>
              <li><a href="https://www.linkedin.com/in/stevemartingobiya/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://x.com/SteveMarti66556" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
              <li><a href="https://www.facebook.com/people/Gobiya/100064043744190/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://m.yelp.com/biz/gobiya-los-angeles-5" target="_blank" rel="noopener noreferrer">Yelp</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Gobiya · Operating since 2012 · BBB A+ rated · Engineering search dominance</p>
          <div className="legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          <span>GOBIYA</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
