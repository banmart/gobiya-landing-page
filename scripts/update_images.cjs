const fs = require('fs');

const file = 'c:\\\\Users\\\\banma\\\\projects\\\\v-hero\\\\src\\\\components\\\\SolutionPage.tsx';
let content = fs.readFileSync(file, 'utf-8');

// Add heroImage to interface
content = content.replace('subHeadline: string;', 'subHeadline: string;\n  heroImage?: string;');

// Add backgroundImage to caseStudy interface
content = content.replace(
  /caseStudy: {\n\s+headline: string;\n\s+description: string;\n\s+tag: string;\n\s+ctaText: string;\n\s+};/,
  'caseStudy: {\n    headline: string;\n    description: string;\n    tag: string;\n    ctaText: string;\n    backgroundImage?: string;\n  };'
);

// Replace Unsplash in component
content = content.replace(
  /<img src="https:\/\/images.unsplash.com\/photo-1620712943543-bcc4688e7485[^"]*" alt="AI Technology Background"/,
  '<img src={data.heroImage || "/images/geo_hero.webp"} alt="AI Technology Background"'
);
content = content.replace(
  /<img src="https:\/\/images.unsplash.com\/photo-1620712943543-bcc4688e7485[^"]*" alt="Tech BG"/,
  '<img src={data.caseStudy.backgroundImage || "/images/case_study_bg.webp"} alt="Tech BG"'
);

// Update /services/seo
content = content.replace(
  "executionImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',",
  "heroImage: '/images/seo_hero.webp',\n    executionImage: '/images/seo_exec.webp',"
);

// Update /services/geo-optimization
content = content.replace(
  "executionImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',",
  "heroImage: '/images/geo_hero.webp',\n    executionImage: '/images/seo_exec.webp',"
);

// Update /google-penalty-recovery
content = content.replace(
  "executionImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',",
  "heroImage: '/images/penalty_hero.webp',\n    executionImage: '/images/seo_exec.webp',"
);

// Update /services/lead-generation
content = content.replace(
  "executionImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',",
  "heroImage: '/images/lead_hero.webp',\n    executionImage: '/images/seo_exec.webp',"
);

// Update /services/web-development
content = content.replace(
  "executionImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',",
  "heroImage: '/images/web_hero.webp',\n    executionImage: '/images/web_exec.webp',"
);

// Update /services/ppc-advertising
content = content.replace(
  "executionImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',",
  "heroImage: '/images/ppc_hero.webp',\n    executionImage: '/images/seo_exec.webp',"
);

fs.writeFileSync(file, content);
console.log('Update complete.');
