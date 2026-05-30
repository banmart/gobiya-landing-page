-- Seed: What Is Generative Engine Optimization and How Does It Work? article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'What Is Generative Engine Optimization and How Does It Work?',
  'SEO',
  'what-is-generative-engine-optimization-and-how-does-it-work',
  '/images/article-what-is-generative-engine-optimization-and-how-does-it-work.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
