-- Seed: B2B SEO Agency Los Angeles article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'B2B SEO Agency in Los Angeles: Why Local Partnership Outperforms Remote Vendor Relationships in 2026',
  'Strategy',
  'b2b-seo-agency-los-angeles',
  '/images/article-b2b-seo-agency-los-angeles.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title    = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
