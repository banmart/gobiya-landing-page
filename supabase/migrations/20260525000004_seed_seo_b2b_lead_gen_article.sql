-- Seed: SEO for B2B Lead Generation article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'SEO for B2B Lead Generation: How Committee-Architecture Content Outperforms Single-Persona Funnels in 2026',
  'Strategy',
  'seo-for-b2b-lead-generation',
  '/images/article-seo-b2b-lead-generation.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title    = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
