const fs = require('fs');
let content = fs.readFileSync('src/components/SiteHeader.tsx', 'utf8');

// Replace the mobile menu accordion headers to remove the +/- buttons and make them just labels
content = content.replace(
  /<button \n\s*className="w-full flex items-center justify-between text-gray-900"\n\s*style={{ fontSize: '2\.5rem', fontWeight: 800, letterSpacing: '-0\.02em', fontFamily: 'inherit' }}\n\s*onClick={\(\) => toggleCategory\('creativity'\)}\n\s*>\n\s*Creativity\n\s*<span style={{ fontSize: '2rem', fontWeight: 300, color: '#9CA3AF' }}>{openCategory === 'creativity' \? '−' : '\+'}<\/span>\n\s*<\/button>/,
  `<div className="w-full text-gray-900" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
    Creativity
  </div>`
);

content = content.replace(
  /<button \n\s*className="w-full flex items-center justify-between text-gray-900"\n\s*style={{ fontSize: '2\.5rem', fontWeight: 800, letterSpacing: '-0\.02em', fontFamily: 'inherit' }}\n\s*onClick={\(\) => toggleCategory\('performance'\)}\n\s*>\n\s*Performance\n\s*<span style={{ fontSize: '2rem', fontWeight: 300, color: '#9CA3AF' }}>{openCategory === 'performance' \? '−' : '\+'}<\/span>\n\s*<\/button>/,
  `<div className="w-full text-gray-900" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
    Performance
  </div>`
);

content = content.replace(
  /<button \n\s*className="w-full flex items-center justify-between text-gray-900"\n\s*style={{ fontSize: '2\.5rem', fontWeight: 800, letterSpacing: '-0\.02em', fontFamily: 'inherit' }}\n\s*onClick={\(\) => toggleCategory\('relations'\)}\n\s*>\n\s*Relations\n\s*<span style={{ fontSize: '2rem', fontWeight: 300, color: '#9CA3AF' }}>{openCategory === 'relations' \? '−' : '\+'}<\/span>\n\s*<\/button>/,
  `<div className="w-full text-gray-900" style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.02em', fontFamily: 'inherit' }}>
    Relations
  </div>`
);

// Force the dropdown content to always be visible
content = content.replace(
  /<div style={{ overflow: 'hidden', transition: 'all 0\.5s ease', maxHeight: openCategory === 'creativity' \? '500px' : '0', marginTop: openCategory === 'creativity' \? '1\.5rem' : '0' }}>/g,
  `<div style={{ overflow: 'hidden', marginTop: '1.5rem' }}>`
);
content = content.replace(
  /<div style={{ overflow: 'hidden', transition: 'all 0\.5s ease', maxHeight: openCategory === 'performance' \? '500px' : '0', marginTop: openCategory === 'performance' \? '1\.5rem' : '0' }}>/g,
  `<div style={{ overflow: 'hidden', marginTop: '1.5rem' }}>`
);
content = content.replace(
  /<div style={{ overflow: 'hidden', transition: 'all 0\.5s ease', maxHeight: openCategory === 'relations' \? '500px' : '0', marginTop: openCategory === 'relations' \? '1\.5rem' : '0' }}>/g,
  `<div style={{ overflow: 'hidden', marginTop: '1.5rem' }}>`
);

fs.writeFileSync('src/components/SiteHeader.tsx', content);
console.log("Mobile menu expanded successfully!");
