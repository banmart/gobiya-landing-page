-- Seed: Best Website Structure for Multiple Locations in Different Cities article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'What Is the Best Website Structure for a Business With Multiple Locations in Different Cities?',
  'Local SEO',
  'best-website-structure-multiple-locations-different-cities',
  '/images/article-multi-city-website-structure.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
