-- Seed: How B2B Companies Use SEO to Generate Predictable Revenue article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'How B2B Companies Use SEO to Generate Predictable Revenue',
  'Strategy',
  'how-do-b2b-companies-use-seo-to-generate-predictable-revenue',
  '/images/article-how-do-b2b-companies-use-seo-to-generate-predictable-revenue.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
