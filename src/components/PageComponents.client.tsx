import { lazy } from 'react';

// SEO is statically imported: it does only lightweight DOM/meta writes and must
// run synchronously during hydration to avoid title/description flashes.
export { default as SEO } from './SEO';

// GobiyaLanding is now lazy: GSAP, shaders, and WebGL are NOT loaded on routes
// other than '/'. This is the single biggest TBT win.
export const GobiyaLanding = lazy(() => import('./GobiyaLanding'));

// Dynamic/lazy exports for other pages
export const GobiyaAboutPage = lazy(() => import('./GobiyaAboutPage'));
export const ServiceSubpage = lazy(() => import('./ServiceSubpage'));
export const ArticlePage = lazy(() => import('./ArticlePage'));
export const AuthorPage = lazy(() => import('./AuthorPage'));
export const ThankYouPage = lazy(() => import('./ThankYouPage'));
export const BookingPage = lazy(() => import('./BookingPage'));
export const SolutionPage = lazy(() => import('./SolutionPage'));
export const SuccessStories = lazy(() => import('./SuccessStories'));
export const InsightsPage = lazy(() => import('./InsightsPage'));
export const RegionalHubPage = lazy(() => import('./RegionalHubPage'));
export const AdminLogin = lazy(() => import('./AdminLogin'));
export const AdminDashboard = lazy(() => import('./AdminDashboard'));
export const ContactPage = lazy(() => import('./ContactPage'));
export const OnPageSeoLosAngelesPage = lazy(() => import('./OnPageSeoLosAngelesPage'));
export const AiSeoBeverlyHillsPage = lazy(() => import('./AiSeoBeverlyHillsPage'));

export const LocalSeoBurbankPage = lazy(() => import('./LocalSeoBurbankPage'));
export const SeoCompanyEncinoPage = lazy(() => import('./SeoCompanyEncinoPage'));
export const LosAngelesSeoProf = lazy(() => import('./LosAngelesSeoProf'));
export const NotFound = lazy(() => import('./NotFound'));

export const GlendaleSeoPage = lazy(() => import('./GlendaleSeoPage'));
export const PlasticSurgeryMarketingPage = lazy(() => import('./PlasticSurgeryMarketingPage'));
export const InternetMarketingServicesLosAngelesPage = lazy(() => import('./InternetMarketingServicesLosAngelesPage'));
export const AiSearchMarketingSantaClaritaPage = lazy(() => import('./AiSearchMarketingSantaClaritaPage'));

export const OutcomesIndex = lazy(() => import('./OutcomesIndex'));
export const OutcomeTrafficPage = lazy(() => import('./OutcomeTrafficPage'));
export const OutcomeRankingsPage = lazy(() => import('./OutcomeRankingsPage'));
export const OutcomeSalesPage = lazy(() => import('./OutcomeSalesPage'));
