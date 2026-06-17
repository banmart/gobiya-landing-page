-- Seed: Open Knowledge Format article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'Introducing the Open Knowledge Format: Why It Matters for AI-Ready Businesses',
  'Strategy',
  'introducing-open-knowledge-format-why-it-matters-for-ai-ready-businesses',
  '/images/article-introducing-open-knowledge-format-thumbnail.webp',
  NULL,
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
