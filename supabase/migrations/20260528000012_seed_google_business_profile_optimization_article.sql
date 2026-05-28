-- Seed: Google Business Profile Optimization for Traffic Recovery Explained article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'Google Business Profile Optimization for Traffic Recovery Explained',
  'Local SEO',
  'google-business-profile-optimization',
  '/images/article-google-business-profile-optimization.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
