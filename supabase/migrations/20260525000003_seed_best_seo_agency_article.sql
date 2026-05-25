-- Seed: Best SEO Agency for B2B Brands article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'How to Choose the Best SEO Agency for B2B Brands in 2026',
  'Strategy',
  'best-seo-agency-for-b2b-brands',
  '/images/article-best-seo-agency.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title    = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
