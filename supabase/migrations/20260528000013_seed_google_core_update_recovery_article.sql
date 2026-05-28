-- Seed: Can a Site Fully Recover From a Google Core Update? article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'Can a Site Fully Recover From a Google Core Update?',
  'SEO',
  'can-a-site-fully-recover-from-a-google-core-update',
  '/images/article-can-a-site-fully-recover-from-a-google-core-update.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
