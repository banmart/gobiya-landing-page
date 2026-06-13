-- Seed: How to Apply Behavioral Psychology Principles to High Ticket B2B Landing Page Wireframes to Decrease Friction article
INSERT INTO public.insights (title, category, slug, image_url, image_path, featured)
VALUES (
  'How to Apply Behavioral Psychology Principles to High Ticket B2B Landing Page Wireframes to Decrease Friction',
  'Strategy',
  'how-to-apply-behavioral-psychology-principles-to-high-ticket-b2b-landing-page-wireframes-to-decrease-friction',
  '/images/article-behavioral-psychology-b2b-landing-page-wireframes-thumbnail.webp',
  NULL,
  false
)
ON CONFLICT (slug) DO UPDATE SET
  title     = EXCLUDED.title,
  category  = EXCLUDED.category,
  image_url = EXCLUDED.image_url,
  featured  = EXCLUDED.featured;
