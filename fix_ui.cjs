const fs = require('fs');

// Fix SiteHeader.tsx
let content = fs.readFileSync('c:/Users/banma/projects/v-hero/src/components/SiteHeader.tsx', 'utf8');

const navRight = `
        <div className="nav-right">
          <span className="nav-status">BBB A+ · since 2012</span>
          <a href="tel:3237441338" className="hidden lg:inline-block text-[13px] font-mono tracking-wider text-[#2F5D50] hover:text-[#F26522] mr-2 transition-colors font-bold">
            323-744-1338
          </a>
          <a href="tel:3237441338" className="btn btn-primary flex items-center justify-center p-2 rounded-full lg:hidden w-8 h-8 shrink-0 text-white" aria-label="Call GOBIYA">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </a>
          <a href="/book" className="btn btn-primary btn-nav">Book a call</a>
          <button className="nav-burger" id="burger" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <div className="mobile-menu" id="mobile-menu">
        <a href="/creativity" className="text-xl font-bold block mb-4 border-b pb-2">Creativity</a>
        <a href="/performance" className="text-xl font-bold block mb-4 border-b pb-2">Performance</a>
        <a href="/relations" className="text-xl font-bold block mb-4 border-b pb-2">Relations</a>
        <a href="tel:3237441338" className="btn btn-secondary w-full text-center mt-4 mb-2">Call 323-744-1338</a>
        <a href="/book" className="btn btn-primary">Book a call</a>
      </div>
`;

content = content.replace(
  /<div className="header-right-menu[\s\S]*?<\/div>/g, 
  navRight
);

content = content.replace(
  /className="menu-main-en-container w-full flex justify-end static"/g, 
  'className="menu-main-en-container hidden lg:flex w-full justify-end static"'
);

fs.writeFileSync('c:/Users/banma/projects/v-hero/src/components/SiteHeader.tsx', content);

// Fix ServiceSubpage.tsx dark mode
let serviceContent = fs.readFileSync('c:/Users/banma/projects/v-hero/src/components/ServiceSubpage.tsx', 'utf8');

serviceContent = serviceContent.replace(/bg-black/g, 'bg-white');
serviceContent = serviceContent.replace(/text-white/g, 'text-gray-900');
serviceContent = serviceContent.replace(/bg-\[\#050505\]/g, 'bg-gray-50');
serviceContent = serviceContent.replace(/bg-white\/5/g, 'bg-black/5');
serviceContent = serviceContent.replace(/bg-white\/10/g, 'bg-black/10');
serviceContent = serviceContent.replace(/border-white\/10/g, 'border-black/10');
serviceContent = serviceContent.replace(/border-white\/20/g, 'border-black/20');
serviceContent = serviceContent.replace(/selection:text-black/g, 'selection:text-white');
serviceContent = serviceContent.replace(/selection:bg-green/g, 'selection:bg-black');

fs.writeFileSync('c:/Users/banma/projects/v-hero/src/components/ServiceSubpage.tsx', serviceContent);
console.log('Fixed mobile menu and dark mode.');
