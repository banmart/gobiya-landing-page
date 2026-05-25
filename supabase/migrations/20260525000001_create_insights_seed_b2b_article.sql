-- Create insights table for articles/blog posts
CREATE TABLE IF NOT EXISTS public.insights (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title       text NOT NULL,
  category    text,
  slug        text UNIQUE,
  image_url   text,
  image_path  text,
  featured    boolean DEFAULT false,
  created_at  timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published insights (public read)
CREATE POLICY "Allow public read"
  ON public.insights FOR SELECT
  USING (true);

-- Seed: Automated B2B Sales Pipeline SEO article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'Automated B2B Sales Pipeline SEO: How AI Citations Shape Your Shortlist in 2026',
  'Strategy',
  'automated-b2b-sales-pipeline-seo',
  '/images/article-b2b-pipeline-seo.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title    = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
