-- Seed: ChatGPT vs Google for Business Discovery: What You Must Know article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'ChatGPT vs Google for Business Discovery: What You Must Know',
  'SEO',
  'chatgpt-vs-google-for-business-discovery',
  '/images/article-chatgpt-vs-google-for-business-discovery.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
