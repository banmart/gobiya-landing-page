/**
 * Supabase seed script: inserts/upserts the can-a-site-fully-recover-from-a-google-core-update article.
 *
 * Run from the project root:
 *   node scripts/seed-google-core-update-recovery-article.mjs
 *
 * Requires VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to be set (reads from .env.local).
 */
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

const article = {
  title: 'Can a Site Fully Recover From a Google Core Update?',
  category: 'SEO',
  slug: 'can-a-site-fully-recover-from-a-google-core-update',
  image_url: '/images/article-can-a-site-fully-recover-from-a-google-core-update.webp',
  image_path: null,
  featured: true,
};

async function seed() {
  console.log('📡  Connecting to Supabase...');

  // Check if it already exists by slug
  const { data: existing, error: fetchErr } = await supabase
    .from('insights')
    .select('id')
    .eq('slug', article.slug)
    .maybeSingle();

  if (fetchErr) {
    console.error('❌  Error checking for existing record:', fetchErr.message);
    process.exit(1);
  }

  if (existing) {
    // Update existing
    const { error } = await supabase
      .from('insights')
      .update(article)
      .eq('id', existing.id);

    if (error) {
      console.error('❌  Update failed:', error.message);
      process.exit(1);
    }
    console.log(`✅  Updated existing insight (id: ${existing.id})`);
  } else {
    // Insert new
    const { data, error } = await supabase
      .from('insights')
      .insert([article])
      .select()
      .single();

    if (error) {
      console.error('❌  Insert failed:', error.message);
      process.exit(1);
    }
    console.log(`✅  Inserted new insight (id: ${data.id})`);
  }

  console.log('🎉  Done. The article is now in Supabase.');
  console.log('   URL: https://www.gobiya.com/insights/can-a-site-fully-recover-from-a-google-core-update');
}

seed();
