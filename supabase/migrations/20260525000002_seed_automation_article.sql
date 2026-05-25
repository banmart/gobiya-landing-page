-- Seed: B2B Sales Pipeline Automation article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'B2B Sales Pipeline Automation: The Orchestration Layer for AI-Driven Revenue',
  'Strategy',
  'b2b-sales-pipeline-automation',
  '/images/article-b2b-sales-pipeline-automation.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title    = EXCLUDED.title,
  category = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
