/**
 * Gobiya — GA4 Analytics Utility
 *
 * Google-compliant CTA tracking using GA4 custom events.
 *
 * WHY NOT UTM PARAMS ON INTERNAL LINKS?
 * Adding utm_* query strings to same-domain /contact links overwrites the
 * original traffic source (e.g. "google / organic") with "gobiya_site",
 * corrupting attribution. Google's own documentation recommends custom
 * GA4 events for internal interaction tracking.
 *
 * HOW TO VIEW IN GA4:
 *   Reports → Engagement → Events → cta_click
 *   Then use "cta_location" and "cta_text" as event parameter dimensions.
 *   (You may need to register these as custom dimensions in GA4 Admin first.)
 *
 * GA4 MEASUREMENT ID: G-3R3D5Q9YV6
 */

export const GA_MEASUREMENT_ID = 'G-3R3D5Q9YV6';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export interface CTAEventParams {
  /** Where on the page/site the CTA lives. e.g. 'homepage_hero', 'article_sidebar_b2b_pipeline' */
  cta_location: string;
  /** The visible CTA label text. e.g. 'Book a strategy call', 'Get growth audit' */
  cta_text: string;
  /** Destination URL, defaults to '/contact' */
  destination?: string;
}

/**
 * Fires a GA4 `cta_click` event with location + text + page context.
 * Safe to call server-side (no-ops if window is undefined).
 */
export function trackCTA(params: CTAEventParams): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'cta_click', {
    cta_location: params.cta_location,
    cta_text: params.cta_text,
    destination: params.destination ?? '/contact',
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

/**
 * Fires a GA4 `form_submit` event for the hero audit form.
 */
export function trackFormSubmit(params: {
  form_name: string;
  services?: string;
  has_domain: boolean;
}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'form_submit', {
    form_name: params.form_name,
    services_selected: params.services ?? 'none',
    has_domain: params.has_domain,
    page_path: window.location.pathname,
  });
}
