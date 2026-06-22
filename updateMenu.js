const fs = require('fs');
const file = 'c:/Users/banma/projects/v-hero/src/components/SiteHeader.tsx';
let content = fs.readFileSync(file, 'utf8');

const newMenu = \
      <div className="page-header__inner w-full mx-auto flex items-center justify-between static" style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>
        <div className="logos-wrapper flex items-center shrink-0 relative z-50">
          <a className="flex items-center gap-3" href="/" title="GOBIYA - Back to home">
            <span className="flex items-center w-[120px] md:w-[160px] lg:w-[180px]">
              <img src="/images/gobiya-wordmark.webp" alt="GOBIYA logo" className="w-full h-auto object-contain" />
            </span>
          </a>
        </div>

        <div className="main-menu-wrapper flex-1 flex justify-end lg:pr-8 static">
          <div className="menu-main-en-container w-full flex justify-end static">
            <ul id="menu-main-en" className="menu flex items-center gap-10 h-full static">
              {/* Creativity Dropdown */}
              <li className="menu-item group cursor-pointer relative lg:static h-full flex items-center">
                <a href="/creativity" className="flex items-center gap-1 py-8 text-gray-900 font-medium hover:text-gray-600 transition-colors">
                  Creativity
                  <svg width="12" height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-180 transition-transform duration-300">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58564 3.52858C5.84599 3.26823 6.2681 3.26823 6.52845 3.52858L10.5285 7.52858C10.7888 7.78892 10.7888 8.21103 10.5285 8.47138L6.52845 12.4714C6.2681 12.7317 5.84599 12.7317 5.58564 12.4714C5.32529 12.211 5.32529 11.7889 5.58564 11.5286L9.11424 7.99998L5.58564 4.47138C5.32529 4.21103 5.32529 3.78892 5.58564 3.52858Z" fill="currentColor"/>
                  </svg>
                </a>
                <div className="absolute top-full left-0 w-full bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl border-t border-line">
                  <div className="w-full mx-auto flex" style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>
                    <div className="w-full lg:w-1/3 py-12 pr-8 border-r border-line">
                      <ul className="flex flex-col gap-5">
                        <li><a href="/creativity" className="text-gray-900 font-bold text-lg hover:text-gray-500 transition-colors block border-b border-line pb-4 mb-2">Overview &rarr;</a></li>
                        <li><a href="/creativity/brand-identity-strategy-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">Brand Identity Strategy</a></li>
                        <li><a href="/creativity/communication-concepts-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">Communication Concepts</a></li>
                        <li><a href="/creativity/seo-web-copywriting-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">SEO &amp; Web Copywriting</a></li>
                        <li><a href="/creativity/creative-art-direction-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">Creative Art Direction</a></li>
                        <li><a href="/creativity/social-media-management-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">Social Media Management</a></li>
                      </ul>
                    </div>
                    <div className="hidden lg:block lg:w-2/3 bg-gray-50/50"></div>
                  </div>
                </div>
              </li>
              
              {/* Performance Dropdown */}
              <li className="menu-item group cursor-pointer relative lg:static h-full flex items-center">
                <a href="/performance" className="flex items-center gap-1 py-8 text-gray-900 font-medium hover:text-gray-600 transition-colors">
                  Performance
                  <svg width="12" height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-180 transition-transform duration-300">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58564 3.52858C5.84599 3.26823 6.2681 3.26823 6.52845 3.52858L10.5285 7.52858C10.7888 7.78892 10.7888 8.21103 10.5285 8.47138L6.52845 12.4714C6.2681 12.7317 5.84599 12.7317 5.58564 12.4714C5.32529 12.211 5.32529 11.7889 5.58564 11.5286L9.11424 7.99998L5.58564 4.47138C5.32529 4.21103 5.32529 3.78892 5.58564 3.52858Z" fill="currentColor"/>
                  </svg>
                </a>
                <div className="absolute top-full left-0 w-full bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl border-t border-line">
                  <div className="w-full mx-auto flex" style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>
                    <div className="w-full lg:w-1/3 py-12 pr-8 border-r border-line">
                      <ul className="flex flex-col gap-5">
                        <li><a href="/performance" className="text-gray-900 font-bold text-lg hover:text-gray-500 transition-colors block border-b border-line pb-4 mb-2">Overview &rarr;</a></li>
                        <li><a href="/performance/seo-discoverability-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">SEO &amp; Discoverability</a></li>
                        <li><a href="/performance/web-development-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">Web &amp; IT App Development</a></li>
                        <li><a href="/performance/google-ads-ppc-strategy-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">Google Ads &amp; PPC Strategy</a></li>
                        <li><a href="/performance/cro-ux-analysis-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">CRO &amp; UX Analysis</a></li>
                        <li><a href="/performance/ai-llms-business-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">AI &amp; LLM Systems Consulting</a></li>
                      </ul>
                    </div>
                    <div className="hidden lg:block lg:w-2/3 bg-gray-50/50"></div>
                  </div>
                </div>
              </li>
              
              {/* Relations Dropdown */}
              <li className="menu-item group cursor-pointer relative lg:static h-full flex items-center">
                <a href="/relations" className="flex items-center gap-1 py-8 text-gray-900 font-medium hover:text-gray-600 transition-colors">
                  Relations
                  <svg width="12" height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:rotate-180 transition-transform duration-300">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.58564 3.52858C5.84599 3.26823 6.2681 3.26823 6.52845 3.52858L10.5285 7.52858C10.7888 7.78892 10.7888 8.21103 10.5285 8.47138L6.52845 12.4714C6.2681 12.7317 5.84599 12.7317 5.58564 12.4714C5.32529 12.211 5.32529 11.7889 5.58564 11.5286L9.11424 7.99998L5.58564 4.47138C5.32529 4.21103 5.32529 3.78892 5.58564 3.52858Z" fill="currentColor"/>
                  </svg>
                </a>
                <div className="absolute top-full left-0 w-full bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl border-t border-line">
                  <div className="w-full mx-auto flex" style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>
                    <div className="w-full lg:w-1/3 py-12 pr-8 border-r border-line">
                      <ul className="flex flex-col gap-5">
                        <li><a href="/relations" className="text-gray-900 font-bold text-lg hover:text-gray-500 transition-colors block border-b border-line pb-4 mb-2">Overview &rarr;</a></li>
                        <li><a href="/relations/authority-building-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">Authority &amp; Link Building</a></li>
                        <li><a href="/relations/digital-pr-media-outreach-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">Digital PR &amp; Media Outreach</a></li>
                        <li><a href="/relations/google-ads-ppc-strategy-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">Google Ads &amp; PPC Strategy</a></li>
                        <li><a href="/relations/content-marketing-syndication-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">Content Marketing Syndication</a></li>
                        <li><a href="/relations/influencer-marketing-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">Influencer Marketing</a></li>
                        <li><a href="/relations/local-community-relations-agency" className="text-gray-500 text-base hover:text-gray-900 transition-colors block">Local Community Relations</a></li>
                      </ul>
                    </div>
                    <div className="hidden lg:block lg:w-2/3 bg-gray-50/50"></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
\;

const startTag = '<div className="page-header__inner w-full mx-auto flex items-center justify-between" style={{ paddingLeft: "5vw", paddingRight: "5vw" }}>';
const endTag = '        {/* Contact info on the right */}';

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newMenu + '\\n' + content.substring(endIndex);
  fs.writeFileSync(file, content);
  console.log('Menu updated successfully!');
} else {
  console.log('Could not find start or end tags.');
}
