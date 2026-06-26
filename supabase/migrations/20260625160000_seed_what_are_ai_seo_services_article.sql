-- Seed: What Are AI SEO Services article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'What Are AI SEO Services? The 2026 Guide to Getting Cited by AI',
  'AI SEO',
  'what-are-ai-seo-services',
  '/images/article-what-are-ai-seo-services.webp',
  NULL,
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
