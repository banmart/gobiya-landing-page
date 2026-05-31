-- Seed: SEO Case Study Traffic Recovery article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'SEO Case Study Traffic Recovery: How We Recovered 320% Organic Traffic After Google',
  'SEO',
  'seo-case-study-traffic-recovery',
  '/images/how-we-recovered-320-organic-traffic-after-google-1780266793291.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
