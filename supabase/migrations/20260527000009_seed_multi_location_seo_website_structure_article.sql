-- Seed: Multi-Location SEO Website Structure article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'Multi-Location SEO Website Structure Explained: Architecting for Search Dominance',
  'Local SEO',
  'multi-location-seo-website-structure',
  '/images/article-multi-location-seo-website-structure.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
