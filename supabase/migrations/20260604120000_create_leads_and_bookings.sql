-- Create leads table to capture info from lead magnets
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  company TEXT,
  website TEXT,
  lead_magnet TEXT, -- e.g., 'b2b_roi_calculator', 'geo_playbook', 'penalty_recovery_checklist'
  source_page TEXT, -- the URL or article slug
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security for leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow public insert (anyone can submit a lead magnet)
CREATE POLICY "Allow public insert to leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read of own leads" ON public.leads FOR SELECT USING (true); -- Useful for client correlation if needed

-- Create bookings table to capture details of scheduled calls
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  date_time TIMESTAMPTZ NOT NULL,
  budget TEXT,
  timeline TEXT,
  challenges TEXT,
  status TEXT DEFAULT 'Call booked', -- CRM pipeline stages
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security for bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public insert (anyone can book a call)
CREATE POLICY "Allow public insert to bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read of bookings" ON public.bookings FOR SELECT USING (true);
