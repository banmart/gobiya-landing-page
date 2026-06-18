import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ygxwuxqabejlaxahtepd.supabase.co';
const supabaseKey = 'sb_publishable_ozbQqM9iq68CHLBRl0H7SQ_R44gFTaC';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('insights').select('*');
  if (error) {
    console.error('Error fetching from insights:', error.message);
  } else {
    console.log('Success! Insights:', data);
  }
}

main();
