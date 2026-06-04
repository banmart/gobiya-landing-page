import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
const envPath = join(__dirname, '..', '.env.local');
let envVars = {};
try {
  const envContent = readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...val] = line.trim().split('=');
    if (key && val.length) envVars[key.trim()] = val.join('=').trim();
  });
} catch (e) {
  console.log('No .env.local found, using environment variables.');
}

const supabaseUrl = envVars.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = envVars.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌  Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const articles = [
  {
    title: 'What Data Sources Do LLMs Crawl to Verify B2B Company Information?',
    category: 'GEO',
    slug: 'what-data-sources-do-llms-crawl-to-verify-b2b-company-information',
    image_url: '/images/article-what-data-sources-do-llms-crawl-to-verify-b2b-company-information.webp',
    image_path: null,
    featured: true,
  },
  {
    title: 'What Is the Difference Between Google Knowledge Graph Optimization and GEO?',
    category: 'GEO',
    slug: 'what-is-the-difference-between-google-knowledge-graph-optimization-and-geo',
    image_url: '/images/article-what-is-the-difference-between-google-knowledge-graph-optimization-and-geo.webp',
    image_path: null,
    featured: true,
  }
];

async function seed() {
  console.log('📡  Connecting to Supabase...');

  for (const article of articles) {
    // Check if it already exists by slug
    const { data: existing, error: fetchErr } = await supabase
      .from('insights')
      .select('id')
      .eq('slug', article.slug)
      .maybeSingle();

    if (fetchErr) {
      console.error(`❌  Error checking for existing record for ${article.slug}:`, fetchErr.message);
      continue;
    }

    if (existing) {
      // Update existing
      const { error } = await supabase
        .from('insights')
        .update(article)
        .eq('id', existing.id);

      if (error) {
        console.error(`❌  Update failed for ${article.slug}:`, error.message);
      } else {
        console.log(`✅  Updated existing insight (slug: ${article.slug}, id: ${existing.id})`);
      }
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('insights')
        .insert([article])
        .select()
        .single();

      if (error) {
        console.error(`❌  Insert failed for ${article.slug}:`, error.message);
      } else {
        console.log(`✅  Inserted new insight (slug: ${article.slug}, id: ${data.id})`);
      }
    }
  }

  console.log('🎉  Done. The articles are now in Supabase.');
}

seed();
