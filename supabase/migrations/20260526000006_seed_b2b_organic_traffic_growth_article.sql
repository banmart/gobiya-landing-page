-- Seed: B2B Organic Traffic Growth article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'B2B Organic Traffic Growth: Why Traffic and Pipeline Decoupled in 2026 and What to Do About It',
  'Strategy',
  'b2b-organic-traffic-growth',
  '/images/article-b2b-organic-traffic-growth.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
