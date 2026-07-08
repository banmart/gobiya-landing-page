import React, { useState, useEffect, Suspense } from 'react';
import {
  GobiyaLanding,
  GobiyaAboutPage,
  
  
  AuthorPage,
  ThankYouPage,
  BookingPage,
  SuccessStories,
  
  
  AdminLogin,
  AdminDashboard,
  ContactPage,
  
  
  
  
  
  SEO,
  NotFound,
  
  
  
  
  OutcomesIndex,
  OutcomeTrafficPage,
  OutcomeRankingsPage,
  OutcomeSalesPage
} from './components/PageComponents';
import BookingMessageBar from './components/BookingMessageBar';

// Safe storage helper to prevent crashes in sandboxed environments/iframes or strict privacy modes
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
      }
    } catch (e) {
      console.warn('Storage read blocked, using memory fallback:', e);
    }
    if (typeof window !== 'undefined') {
      return (window as any).__memStorage?.[key] || null;
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn('Storage write blocked, using memory fallback:', e);
    }
    if (typeof window !== 'undefined') {
      if (!(window as any).__memStorage) {
        (window as any).__memStorage = {};
      }
      (window as any).__memStorage[key] = value;
    }
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
        return;
      }
    } catch (e) {
      console.warn('Storage remove blocked, using memory fallback:', e);
    }
    if (typeof window !== 'undefined' && (window as any).__memStorage) {
      delete (window as any).__memStorage[key];
    }
  }
};

interface AppProps {
  url?: string;
}

function App({ url }: AppProps) {
  // Use server-provided url if available, otherwise read window location pathname + search params
  const [currentPath, setCurrentPath] = useState(
    url || (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/')
  );

  const [token, setToken] = useState<string | null>(() => {
    const t = safeStorage.getItem('gobiya_admin_token');
    console.log('[App] Initialized token from storage:', t);
    return t;
  });

  const handleLoginSuccess = (newToken: string) => {
    console.log('[App] handleLoginSuccess triggered with token:', newToken);
    safeStorage.setItem('gobiya_admin_token', newToken);
    setToken(newToken);
    window.history.pushState({}, '', '/admin');
    setCurrentPath('/admin');
  };

  const handleLogout = () => {
    safeStorage.removeItem('gobiya_admin_token');
    setToken(null);
    window.history.pushState({}, '', '/admin');
    setCurrentPath('/admin');
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname + window.location.search);
    };

    // Bind browser navigation popstate
    window.addEventListener('popstate', handleLocationChange);
    
    // Bind click handlers on anchors to support smooth client-side transitions
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href) {
        const urlObj = new URL(anchor.href);
        // Only intercept local links
        if (urlObj.origin === window.location.origin) {
          // If it's a hash link on the current path, smooth scroll to the target
          if (urlObj.hash && urlObj.pathname === window.location.pathname) {
            e.preventDefault();
            const element = document.querySelector(urlObj.hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              window.history.pushState({}, '', urlObj.pathname + urlObj.hash);
            }
            return;
          }
          
          e.preventDefault();
          window.history.pushState({}, '', urlObj.pathname + urlObj.search + urlObj.hash);
          setCurrentPath(urlObj.pathname + urlObj.search);
          // Scroll to top if no hash, else scroll to hash
          if (urlObj.hash) {
            setTimeout(() => {
              const element = document.querySelector(urlObj.hash);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 100);
          } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Register WebMCP tools for AI-enabled browser engines (origin trials)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if the experimental navigator.modelContext API is available
    if ('modelContext' in navigator) {
      try {
        const modelContext = (navigator as any).modelContext;
        
        // Register Gobiya's growth audit tool
        modelContext.registerTool({
          name: 'request_gobiya_growth_audit',
          description: 'Allows an AI agent to submit a client site and email to request a custom B2B SEO/pipeline growth audit from Steve Martin at Gobiya.',
          inputSchema: {
            type: 'object',
            properties: {
              website: { type: 'string', description: 'The domain URL to be audited (e.g. https://example.com)' },
              email: { type: 'string', description: 'The business email for delivery of findings' },
              notes: { type: 'string', description: 'Optional context on current traffic drops or pipeline needs' }
            },
            required: ['website', 'email']
          },
          handler: async (args: { website: string; email: string; notes?: string }) => {
            // Forward audit request to the onboarding flow
            window.location.href = `/thank-you?agent=true&website=${encodeURIComponent(args.website)}&email=${encodeURIComponent(args.email)}`;
            return {
              success: true,
              message: 'Audit request received. Redirecting to the Gobiya confirmation page. Steve Martin will deliver findings to the provided email.'
            };
          }
        });
        
        console.log('WebMCP browser tools registered successfully.');
      } catch (e) {
        console.warn('Error registering WebMCP tools:', e);
      }
    }
  }, []);

  // Handle legacy redirects on mount and path change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const normalized = currentPath.toLowerCase().replace(/\/$/, '') || '/';
    
    if (
      normalized === '/locations' || normalized.startsWith('/locations/') ||
      normalized === '/markets' || normalized.startsWith('/markets/')
    ) {
      window.history.replaceState({}, '', '/');
      setCurrentPath('/');
      return;
    }
    
    const legacyRedirects: Record<string, string> = {
      '/company/insights': '/insights',
      '/insights/b2b-seo-agency-los-angeles': '/insights/b2b-seo-agency',
      '/insights/local-seo-los-angeles': '/insights/local-seo',
      '/insights/los-angeles-local-seo-explained': '/insights/local-seo-explained',
      '/insights/google-my-business-optimization': '/insights/google-business-profile-optimization',
      '/company/success-stories': '/work',
      '/success-stories': '/work',
      '/success-stories/smile-center-dentistry': '/work',
      '/success-stories/american-livescan': '/work',
      // Retired case-study subpages — consolidated into the /work index
      '/case-studies/smile-center-dentistry': '/work',
      '/case-studies/american-livescan': '/work',
      '/case-studies': '/work',
      '/services': '/capabilities',
      '/services/seo': '/performance/seo-discoverability-agency/',
      '/services/lead-generation': '/performance/native-crm-agency/',
      '/services/web-development': '/performance/web-development-agency/',
      '/services/web-design': '/performance/web-development-agency/',
      '/services/ppc-advertising': '/performance/native-crm-agency/',
      '/services/advertising': '/performance/native-crm-agency/',
      '/recovery': '/google-penalty-recovery',
      '/what-we-do.html': '/performance/seo-discoverability-agency/',
      '/capabilities/generative-engine-optimization': '/performance/seo-discoverability-agency/',
      '/capabilities/forensic-seo-penalty-recovery': '/performance/seo-discoverability-agency/',
      '/capabilities/conversion-architecture': '/performance/native-crm-agency/',
      '/capabilities/semantic-search-intelligence': '/performance/seo-discoverability-agency/',
      '/capabilities/custom-digital-infrastructure': '/performance/web-development-agency/',
      '/company/careers': '/',
      '/capabilities/web-development': '/performance/web-development-agency/',
      '/capabilities/native-crm': '/performance/native-crm-agency/',
      '/capabilities/seo-discoverability': '/performance/seo-discoverability-agency/',
      '/capabilities/blockchain-web3-development': '/performance/blockchain-web3-development-agency/',
      '/capabilities/ai-prospect-scraper': '/performance/ai-prospect-scraper-agency/',
      '/capabilities/ai-llms-business': '/performance/ai-llms-business-agency/',
      '/capabilities/authority-building': '/relations/authority-building-agency/',
      // Suffix -agency redirects
      '/capabilities/web-development-agency': '/performance/web-development-agency/',
      '/capabilities/native-crm-agency': '/performance/native-crm-agency/',
      '/capabilities/seo-discoverability-agency': '/performance/seo-discoverability-agency/',
      '/capabilities/blockchain-web3-development-agency': '/performance/blockchain-web3-development-agency/',
      '/capabilities/ai-prospect-scraper-agency': '/performance/ai-prospect-scraper-agency/',
      '/capabilities/ai-llms-business-agency': '/performance/ai-llms-business-agency/',
      '/capabilities/authority-building-agency': '/relations/authority-building-agency/',
      '/company/about': '/about',

      // Legacy /resources/ URLs from prior CMS — 404ing in search results
      '/resources/zero-click-is-the-new-billboard-monetize-it-mk82t8ki': '/insights/automated-b2b-sales-pipeline-seo',
      '/resources/how-to-recover-from-a-google-algorithm-update-2026-guide-ml3c2pbz': '/insights/can-a-site-fully-recover-from-a-google-core-update',
      '/resources': '/insights',
      // Removed service pages — redirect to nearest real service
      '/creativity/brand-identity-strategy-agency': '/creativity/seo-web-copywriting-agency',
      '/creativity/communication-concepts-agency': '/creativity/seo-web-copywriting-agency',
      '/creativity/creative-art-direction-agency': '/performance/web-development-agency',
      '/creativity/social-media-management-agency': '/internet-marketing-services-los-angeles',
      '/performance/mobile-app-development-agency': '/performance/web-development-agency',
      '/performance/it-consulting-services-agency': '/performance/web-development-agency',
      '/relations/influencer-marketing-agency': '/relations/authority-building-agency',
      '/relations/local-community-relations-agency': '/performance/local-seo-services-agency',
      '/relations/content-marketing-syndication-agency': '/outcomes',
      '/performance/google-ads-ppc-strategy-agency': '/outcomes'
    };
    
    const target = legacyRedirects[normalized];
    if (target) {
      window.history.replaceState({}, '', target);
      const targetPath = target.split('#')[0];
      setCurrentPath(targetPath);
      return;
    }

    if (normalized === '/resources' || normalized.startsWith('/resources/') || normalized === '/insights' || normalized.startsWith('/insights/')) {
      window.history.replaceState({}, '', '/outcomes');
      setCurrentPath('/outcomes');
      return;
    }

    // Catch-all: any /case-studies/ subpath collapses to the index
    if (normalized.startsWith('/case-studies/')) {
      window.history.replaceState({}, '', '/work');
      setCurrentPath('/work');
    }
  }, [currentPath]);

  // Normalize path by splitting out search parameters
  const normalizedPath = currentPath.split('?')[0].toLowerCase().replace(/\/$/, '') || '/';

  // Detect article routes: /insights/[slug]
  const articleMatch = normalizedPath.match(/^\/insights\/([a-z0-9-]+)$/);
  const articleSlug = articleMatch ? articleMatch[1] : null;

  const isValid= [
    '/company/careers',
    '/outcomes',
    '/outcomes/traffic',
    '/outcomes/rankings',
    '/outcomes/sales'
  ].includes(normalizedPath);

  const isValidRoute = [
    '/',
    '/admin',
    '/on-page-seo-los-angeles',
    '/ai-seo-beverly-hills',
    '/local-seo-company-burbank',
    '/seo-company-encino',
    '/los-angeles-seo-professional',
    '/book',
    '/about/steve-martin',
    '/author/steve-martin',
    '/about',
    '/thank-you',
    '/work',

    '/insights',
    '/contact',

    '/glendale-seo',
    '/plastic-surgery-internet-marketing',
    '/internet-marketing-services-los-angeles',
    '/ai-search-marketing-santa-clarita',
    '/outcomes',
    '/outcomes/traffic',
    '/outcomes/rankings',
    '/outcomes/sales'
  ].includes(normalizedPath) || normalizedPath === '/google-penalty-recovery' || isValid|| !!articleSlug;

  return (
    <Suspense fallback={null}>
      <SEO path={normalizedPath} />
      {/* Global Noise Overlay */}
      <div className="noise-overlay" />
      
      {!isValidRoute ? (
        <NotFound />
      ) : normalizedPath === '/admin' ? (
        token ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        )
      ) : normalizedPath === '/' ? (
        <GobiyaLanding />
      ) : normalizedPath === '/on-page-seo-los-angeles' ? (
        < />
      ) : normalizedPath === '/ai-seo-beverly-hills' ? (
        < />
      ) : normalizedPath === '/local-seo-company-burbank' ? (
        < />
      ) : normalizedPath === '/seo-company-encino' ? (
        < />
      ) : normalizedPath === '/los-angeles-seo-professional' ? (
        < />
      ) : normalizedPath === '/book' ? (
        <BookingPage />
      ) : normalizedPath === '/about/steve-martin' || normalizedPath === '/author/steve-martin' ? (
        <AuthorPage key={normalizedPath} path={normalizedPath} />
      ) : normalizedPath === '/about' ? (
        <GobiyaAboutPage />
      ) : articleSlug ? (
        < key={articleSlug} slug={articleSlug} />
      ) : normalizedPath === '/thank-you' ? (
        <ThankYouPage />
      ) : normalizedPath === '/outcomes' ? (
        <OutcomesIndex />
      ) : normalizedPath === '/outcomes/traffic' ? (
        <OutcomeTrafficPage />
      ) : normalizedPath === '/outcomes/rankings' ? (
        <OutcomeRankingsPage />
      ) : normalizedPath === '/outcomes/sales' ? (
        <OutcomeSalesPage />
      ) : normalizedPath === '/work' ? (
        <SuccessStories />

      ) : normalizedPath === '/insights' ? (
        < currentPath={currentPath} />
      ) : normalizedPath === '/contact' ? (
        <ContactPage />
      ) : normalizedPath === '/google-penalty-recovery' ? (
        < key={normalizedPath} path={normalizedPath} isFanOut={true} category="recovery" slug="google-penalty-recovery" />
      ) : normalizedPath === '/glendale-seo' ? (
        < />
      ) : normalizedPath === '/plastic-surgery-internet-marketing' ? (
        < />
      ) : normalizedPath === '/internet-marketing-services-los-angeles' ? (
        < />
      ) : normalizedPath === '/ai-search-marketing-santa-clarita' ? (
        < />
      ) : (
        < key={normalizedPath} path={normalizedPath} />
      )}

      {/* Floating strategy session booking message bar */}
      <BookingMessageBar currentPath={normalizedPath} />
    </Suspense>
  );
}

export default App;
