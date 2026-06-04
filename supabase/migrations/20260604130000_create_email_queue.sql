-- Create email queue table to process scheduled automated emails
CREATE TABLE IF NOT EXISTS public.email_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL, -- 'nurture_2', 'nurture_3', 'nurture_4', 'nurture_5'
  scheduled_for TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.email_queue ENABLE ROW LEVEL SECURITY;

-- Allow public insert (anyone can queue or trigger if front-end invokes)
CREATE POLICY "Allow public insert to email_queue" ON public.email_queue FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read of email_queue" ON public.email_queue FOR SELECT USING (true);

-- Database function to queue nurture emails upon lead insert
CREATE OR REPLACE FUNCTION public.queue_nurture_emails()
RETURNS TRIGGER AS $$
BEGIN
  -- Email 2: Steve's story & B2B growth philosophy (Scheduled for 24 hours later)
  INSERT INTO public.email_queue (lead_id, email_type, scheduled_for)
  VALUES (NEW.id, 'nurture_2', NOW() + INTERVAL '1 day');

  -- Email 3: Case Study Showcase (Scheduled for 3 days later)
  INSERT INTO public.email_queue (lead_id, email_type, scheduled_for)
  VALUES (NEW.id, 'nurture_3', NOW() + INTERVAL '3 days');

  -- Email 4: Objection Killer ("Why cheap SEO is expensive") (Scheduled for 5 days later)
  INSERT INTO public.email_queue (lead_id, email_type, scheduled_for)
  VALUES (NEW.id, 'nurture_4', NOW() + INTERVAL '5 days');

  -- Email 5: Soft Invitation to book a Call (Scheduled for 7 days later)
  INSERT INTO public.email_queue (lead_id, email_type, scheduled_for)
  VALUES (NEW.id, 'nurture_5', NOW() + INTERVAL '7 days');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to execute the queueing logic
CREATE OR REPLACE TRIGGER trigger_queue_nurture_emails
AFTER INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.queue_nurture_emails();
