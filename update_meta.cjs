const fs = require('fs');
const path = require('path');

const updates = [
  {
    file: 'src/components/CapabilitiesIndex.tsx',
    title: "Capabilities — Custom Web Development, Native CRM, SEO & Web3 | GOBIYA",
    desc: "GOBIYA builds fast, modern web applications with native CRM pipelines, built-in SEO discoverability, AI prospect automation, and custom Web3 integrations — one codebase, complete data ownership.",
    findTitle: 'document.title ='
  },
  {
    file: 'src/components/SuccessStories.tsx',
    title: "Success Stories — Search Recovery & Revenue Case Studies | GOBIYA",
    desc: "Real clients, real numbers. SmileCenter Dentistry: 5x patient inquiries and 213K impressions. American Livescan: 3x bookings after a legacy migration. Data-backed search recovery and pipeline case studies from GOBIYA.",
    findTitle: 'document.title ='
  },
  {
    file: 'src/components/ApproachPage.tsx',
    title: "Our Approach — Search Engine Forensic Methodology | GOBIYA",
    desc: "GOBIYA's operating model for algorithmic dominance: entity-based indexing, topical authority and schema engineering, Generative Engine Optimization (GEO) for LLM visibility, and pipeline-first conversion architecture.",
    findTitle: 'document.title ='
  },
  {
    file: 'src/components/InsightsPage.tsx',
    title: "Industry Insights — Algorithmic Intelligence & Tactical Search Updates | GOBIYA",
    desc: "Advanced tactical intelligence on Google and AI search: algorithm update analysis, GEO and LLM citation tactics, entity SEO, technical recovery briefs, and pipeline engineering field notes from GOBIYA.",
    findTitle: 'document.title ='
  },
  {
    file: 'src/components/GobiyaAboutPage.tsx',
    title: "About the Agency — GOBIYA | AI Internet Marketing, Los Angeles",
    desc: "GOBIYA is a precision-engineered search visibility and digital solutions firm, founded 2012 in Los Angeles and led by Steve Martin — 25+ years bridging full-stack engineering and organic search.",
    findTitle: 'document.title ='
  }
];

updates.forEach(update => {
  if (!fs.existsSync(update.file)) return;
  let content = fs.readFileSync(update.file, 'utf8');
  
  // Create replacement block
  const block = \`document.title = "\${update.title}";
    
    const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(\\\`meta[\\\${attr}="\\\${nameOrProperty}"]\\\`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, nameOrProperty);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const desc = "\${update.desc.replace(/"/g, '\\\\"')}";
    setMeta('description', desc);
    setMeta('og:title', document.title, true);
    setMeta('og:description', desc, true);
    setMeta('twitter:title', document.title);
    setMeta('twitter:description', desc);\`;

  if (update.file.includes('GobiyaAboutPage')) {
     const titleRegex = /document\\.title\\s*=\\s*"[^"]*";/;
     const descRegex = /const desc\\s*=\\s*"[^"]*";/;
     content = content.replace(titleRegex, \`document.title = "\${update.title}";\`);
     content = content.replace(descRegex, \`const desc = "\${update.desc.replace(/"/g, '\\\\"')}";\`);
  } else {
     // Ensure we don't accidentally replace something else
     const regex = new RegExp(/document\\.title\\s*=\\s*['"\`][^'"\`]*['"\`];/);
     if (regex.test(content)) {
       content = content.replace(regex, block);
     }
  }
  
  fs.writeFileSync(update.file, content);
  console.log('Updated', update.file);
});

// Update SolutionPage for the web development route specifically
const solFile = 'src/components/SolutionPage.tsx';
if (fs.existsSync(solFile)) {
  let content = fs.readFileSync(solFile, 'utf8');
  const solBlock = \`if (path === '/capabilities/web-development') {
      document.title = "React Web Development — Custom High-Performance Websites Built to Rank | GOBIYA";
    } else {
      document.title = \\\`\\\${data.breadcrumbLabel} — Custom Integration | GOBIYA\\\`;
    }
    
    const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(\\\`meta[\\\${attr}="\\\${nameOrProperty}"]\\\`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, nameOrProperty);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const desc = path === '/capabilities/web-development' 
      ? "GOBIYA replaces slow page-builders with custom, hand-coded React and Next.js websites — 100/100 Core Web Vitals, sub-second loads, zero templates, engineered to convert and rank natively."
      : "Custom integration and digital solutions from GOBIYA.";
      
    setMeta('description', desc);
    setMeta('og:title', document.title, true);
    setMeta('og:description', desc, true);
    setMeta('twitter:title', document.title);
    setMeta('twitter:description', desc);\`;
    
  const solRegex = new RegExp(/document\\.title\\s*=\\s*\\\`\\\\\\${data\\.breadcrumbLabel} — Custom Integration \\| GOBIYA\\\`;/);
  content = content.replace(solRegex, solBlock);
  fs.writeFileSync(solFile, content);
  console.log('Updated', solFile);
}
