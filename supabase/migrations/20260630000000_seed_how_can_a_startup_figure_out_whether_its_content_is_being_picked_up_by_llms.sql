-- Seed: How Can a Startup Figure Out Whether Its Content Is Being Picked Up by LLMs?
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'How Can a Startup Figure Out Whether Its Content Is Being Picked Up by LLMs?',
  'Strategy',
  'how-can-a-startup-figure-out-whether-its-content-is-being-picked-up-by-llms',
  '/images/llm-content-pickup-thumbnail.webp',
  NULL,
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
