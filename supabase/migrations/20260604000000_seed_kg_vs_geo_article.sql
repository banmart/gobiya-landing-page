-- Seed: What Data Sources Do LLMs Crawl to Verify B2B Company Information article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'What Data Sources Do LLMs Crawl to Verify B2B Company Information?',
  'GEO',
  'what-data-sources-do-llms-crawl-to-verify-b2b-company-information',
  '/images/article-what-data-sources-do-llms-crawl-to-verify-b2b-company-information.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;

-- Seed: What Is the Difference Between Google Knowledge Graph Optimization and GEO article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'What Is the Difference Between Google Knowledge Graph Optimization and GEO?',
  'GEO',
  'what-is-the-difference-between-google-knowledge-graph-optimization-and-geo',
  '/images/article-what-is-the-difference-between-google-knowledge-graph-optimization-and-geo.webp',
  NULL,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
