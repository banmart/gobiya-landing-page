const fs = require('fs');
const landingPath = 'src/components/GobiyaLanding.tsx';
const successPath = 'src/components/SuccessStories.tsx';

let landing = fs.readFileSync(landingPath, 'utf8');

const startTag = '{/* 04. Our Projects Section */}';
const endTag = '{/* 05. Three Universes Section */}';

const startIndex = landing.indexOf(startTag);
const endIndex = landing.indexOf(endTag);

if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find section boundaries.');
  process.exit(1);
}

const sectionContent = landing.substring(startIndex, endIndex).trim();
landing = landing.substring(0, startIndex) + landing.substring(endIndex);

fs.writeFileSync(landingPath, landing);

// We need to modify sectionContent slightly to fit SuccessStories structure, removing the background and changing heading maybe.
// The user wants "featured work (case studies) bento grid with logos complete. dark mode gallery."
// I will just drop the section content inside the SuccessStories file.

const newSuccess = `import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

gsap.registerPlugin(ScrollTrigger);

const SuccessStories: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });

    const ctx = gsap.context(() => {
      const sc = (el: Element) => ({ trigger: el, start: 'top 87%' });
      gsap.utils.toArray('[data-anim="up"]').forEach(el => {
        gsap.from(el as Element, { scrollTrigger: sc(el as Element), y: 30, opacity: 0, duration: 1.2, ease: 'power3.out' });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div id="page" ref={containerRef} className="bg-[#111827] text-white antialiased font-sans min-h-screen flex flex-col">
      <SiteHeader />
      <div id="content" className="site-content flex-grow" style={{ paddingTop: '100px' }}>
        <main id="primary" className="site-main">
          ${sectionContent.replace(/href="\/case-studies"/g, 'href="#"').replace(/<a href="\/case-studies"[^>]*>.*?<\/a>/s, '')}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}

export default SuccessStories;
`;

fs.writeFileSync(successPath, newSuccess);
console.log('Successfully refactored.');
