/**
 * Generates src/lib/articlesMeta.ts by scanning for `slug:` fields
 * in the ARTICLES object only (stops at RELATED_ARTICLES_MAP).
 */
const fs = require('fs');

const raw = fs.readFileSync('src/components/ArticlePage.tsx', 'utf8');

// Find ARTICLES object boundaries
const articlesStart = raw.indexOf("const ARTICLES: Record");
// RELATED_ARTICLES_MAP starts right after ARTICLES object ends
const relatedMapStart = raw.indexOf("const RELATED_ARTICLES_MAP:");
// Work only inside ARTICLES
const articlesSection = raw.slice(articlesStart, relatedMapStart);

// Now scan for articles by finding slug: '...' patterns
// Each article block looks like:
//   'slug-key': {
//     slug: 'slug-key',
//     title: "The title",
//     category: 'Category',
//     readTime: '10 min read',
//     date: 'June 1, 2026',
//     image: '/images/...webp',

const articles = [];
// Find all slug: 'value' patterns
const slugRe = /\bslug:\s*'([^']+)'/g;
let sm;
const slugPositions = [];
while ((sm = slugRe.exec(articlesSection)) !== null) {
  slugPositions.push({ pos: sm.index, slug: sm[1] });
}
console.log('Slug positions found:', slugPositions.length);

for (let i = 0; i < slugPositions.length; i++) {
  const start = slugPositions[i].pos;
  const end = slugPositions[i + 1] ? slugPositions[i + 1].pos : start + 5000;
  const block = articlesSection.slice(start, Math.min(end, start + 5000));

  const slug = slugPositions[i].slug;

  // Get title — articles use either single or double quotes
  const titleDQ = block.match(/\btitle:\s*"([^"]+)"/);
  const titleSQ = block.match(/\btitle:\s*'([^']+)'/);
  const title = titleDQ ? titleDQ[1] : (titleSQ ? titleSQ[1] : '');

  // Get metaDescription — can use single or double quotes
  const metaDQ = block.match(/\bmetaDescription:\s*"([^"]+)"/);
  const metaSQ = block.match(/\bmetaDescription:\s*'([^']+)'/);
  const metaDescription = metaDQ ? metaDQ[1] : (metaSQ ? metaSQ[1] : '');

  // Get category
  const catM = block.match(/\bcategory:\s*'([^']+)'/);
  const category = catM ? catM[1] : '';

  // Get readTime
  const rtM = block.match(/\breadTime:\s*'([^']+)'/);
  const readTime = rtM ? rtM[1] : '';

  // Get date
  const dateM = block.match(/\bdate:\s*'([^']+)'/);
  const date = dateM ? dateM[1] : '';

  // Get image
  const imgM = block.match(/\bimage:\s*'([^']+)'/);
  const image = imgM ? imgM[1] : '';

  articles.push({ slug, title, category, readTime, date, image, metaDescription });
}

const missing = articles.filter(a => !a.title || !a.category);
console.log('Total:', articles.length);
if (missing.length) console.log('Missing data:', missing.map(a => a.slug));

// Generate
const lines = [
  '// AUTO-GENERATED — run scratch/gen-articles-meta.cjs to regenerate.',
  '// Lightweight article index: ONLY metadata, NO JSX content.',
  '// Import this instead of ArticlePage.tsx to avoid pulling 953KB into your bundle.',
  '',
  'export interface ArticleMeta {',
  '  slug: string;',
  '  title: string;',
  '  category: string;',
  '  readTime: string;',
  '  date: string;',
  '  image: string;',
  '  metaDescription: string;',
  '}',
  '',
  '/** All articles — newest first. */',
  'export const ARTICLE_META: ArticleMeta[] = [',
];

for (const e of articles) {
  lines.push('  {');
  lines.push(`    slug: ${JSON.stringify(e.slug)},`);
  lines.push(`    title: ${JSON.stringify(e.title)},`);
  lines.push(`    category: ${JSON.stringify(e.category)},`);
  lines.push(`    readTime: ${JSON.stringify(e.readTime)},`);
  lines.push(`    date: ${JSON.stringify(e.date)},`);
  lines.push(`    image: ${JSON.stringify(e.image)},`);
  lines.push(`    metaDescription: ${JSON.stringify(e.metaDescription)},`);
  lines.push('  },');
}
lines.push('];');
lines.push('');
lines.push('/** Keyed by slug for O(1) lookup. */');
lines.push('export const ARTICLE_META_MAP: Record<string, ArticleMeta> = Object.fromEntries(');
lines.push("  ARTICLE_META.map(a => [a.slug, a])");
lines.push(');');
lines.push('');

fs.writeFileSync('src/lib/articlesMeta.ts', lines.join('\n'));
console.log(`Written ${articles.length} articles to src/lib/articlesMeta.ts`);
if (articles.length > 0) console.log('Sample:', JSON.stringify(articles[0]));
if (articles.length > 1) console.log('Second:', JSON.stringify(articles[1]));
