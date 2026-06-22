const fs = require('fs');
let content = fs.readFileSync('c:/Users/banma/projects/v-hero/src/components/SiteHeader.tsx', 'utf8');

const navRight = `        <div className="nav-right flex items-center gap-4">
          <button className="nav-burger lg:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5" id="burger" aria-label="Open menu" aria-expanded="false">
            <span className="w-6 h-0.5 bg-gray-900 transition-all duration-300"></span>
            <span className="w-6 h-0.5 bg-gray-900 transition-all duration-300"></span>
            <span className="w-6 h-0.5 bg-gray-900 transition-all duration-300"></span>
          </button>
        </div>
      </div>

      <div className="mobile-menu" id="mobile-menu">
        <div className="flex flex-col gap-6 p-8">
          <a href="/creativity" className="text-2xl font-bold border-b border-gray-200 pb-4">Creativity</a>
          <a href="/performance" className="text-2xl font-bold border-b border-gray-200 pb-4">Performance</a>
          <a href="/relations" className="text-2xl font-bold border-b border-gray-200 pb-4">Relations</a>
        </div>
      </div>`;

content = content.replace(
  /<div className="nav-right">[\s\S]*?<\/div>\s*<\/div>\s*<div className="mobile-menu" id="mobile-menu">[\s\S]*?<\/div>/g, 
  navRight
);

fs.writeFileSync('c:/Users/banma/projects/v-hero/src/components/SiteHeader.tsx', content);
console.log('Removed CTAs and cleaned up mobile menu');
