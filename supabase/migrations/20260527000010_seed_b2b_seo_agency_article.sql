-- Seed: B2B SEO Agency article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'B2B SEO Agency Explained: Choosing the Right Revenue Partner',
  'Strategy',
  'b2b-seo-agency',
  '/images/article-b2b-seo-agency.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
