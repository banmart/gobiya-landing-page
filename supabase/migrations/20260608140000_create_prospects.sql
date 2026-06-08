-- Create prospects table to store B2B leads from Perplexity AI
CREATE TABLE IF NOT EXISTS public.prospects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  website TEXT,
  category TEXT,
  location TEXT,
  status TEXT DEFAULT 'new', -- e.g., 'new', 'welcome_sent', 'drip_1', 'drip_2', 'completed'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for demo/API integration
CREATE POLICY "Allow public read of prospects" ON public.prospects FOR SELECT USING (true);
CREATE POLICY "Allow public insert of prospects" ON public.prospects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update of prospects" ON public.prospects FOR UPDATE USING (true);
CREATE POLICY "Allow public delete of prospects" ON public.prospects FOR DELETE USING (true);
