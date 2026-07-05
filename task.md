# Remove Insights, Hubs, and Category Pages

This task involves purging the site of its blog/insights content and all mass-generated or category-based landing pages to simplify the architecture.

- `[ ]` Remove all `/insights/*` routes, components, and assets (Insights, Articles, Authors).
- `[ ]` Remove hub and fanout components (`ServiceSubpage`, `RegionalHubPage`, `LocalServicePageTemplate`).
- `[ ]` Confirm whether standalone geo-targeted pages should be deleted.
- `[ ]` Remove all corresponding metadata from `SEO.tsx` and `api/index.ts`.
- `[ ]` Rebuild the site to automatically update `sitemap.xml` and other bot files.
- `[ ]` Commit and push changes.
