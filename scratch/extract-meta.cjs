const fs = require('fs');
const content = fs.readFileSync('src/components/ArticlePage.tsx', 'utf8');

// Extract article keys (slugs) from ARTICLES object
// Format in file: 'slug-here': {
const slugMatches = [...content.matchAll(/'([a-z0-9-]+)':\s*\{[\s\r\n]+slug:/g)];
console.log('Article count:', slugMatches.length);

// Extract per-article metadata lines - title, category, readTime, date, image
const articles = [];
const regex = /slug:\s*'([^']+)'[\s\S]{0,500}?title:\s*"([^"]+)"[\s\S]{0,500}?category:\s*'([^']+)'[\s\S]{0,500}?readTime:\s*'([^']+)'[\s\S]{0,500}?date:\s*'([^']+)'[\s\S]{0,500}?image:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(content)) !== null) {
  articles.push({
    slug: match[1],
    title: match[2],
    category: match[3],
    readTime: match[4],
    date: match[5],
    image: match[6]
  });
}
console.log('Parsed articles:', articles.length);
if (articles.length > 0) {
  console.log('First:', JSON.stringify(articles[0]));
  console.log('Last:', JSON.stringify(articles[articles.length - 1]));
}
