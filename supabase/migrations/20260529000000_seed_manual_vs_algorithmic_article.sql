-- Seed: What Is the Difference Between a Manual Action and an Algorithmic Penalty article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'What Is the Difference Between a Manual Action and an Algorithmic Penalty?',
  'SEO',
  'what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty',
  '/images/article-what-is-the-difference-between-a-manual-action-and-an-algorithmic-penalty.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
