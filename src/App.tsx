import React, { useState, useEffect } from 'react';
import GobiyaLanding from './components/GobiyaLanding';
import GobiyaAboutPage from './components/GobiyaAboutPage';
import ServiceSubpage from './components/ServiceSubpage';
import ArticlePage from './components/ArticlePage';
import AuthorPage from './components/AuthorPage';
import ThankYouPage from './components/ThankYouPage';
import BookingPage from './components/BookingPage';
import SolutionPage from './components/SolutionPage';
import CapabilitiesIndex from './components/CapabilitiesIndex';
import SuccessStories from './components/SuccessStories';
import ApproachPage from './components/ApproachPage';
import InsightsPage from './components/InsightsPage';
import RegionalHubPage from './components/RegionalHubPage';
import SmileCenterCaseStudy from './components/SmileCenterCaseStudy';
import AmericanLivescanCaseStudy from './components/AmericanLivescanCaseStudy';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ContactPage from './components/ContactPage';
import OnPageSeoLosAngelesPage from './components/OnPageSeoLosAngelesPage';
import SEO from './components/SEO';
import GlobalWebGLBackground from './components/GlobalWebGLBackground';

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
  // Use server-provided url pathname if available, otherwise read window location pathname
  const [currentPath, setCurrentPath] = useState(
    url || (typeof window !== 'undefined' ? window.location.pathname : '/')
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
      setCurrentPath(window.location.pathname);
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
          window.history.pushState({}, '', urlObj.pathname + urlObj.hash);
          setCurrentPath(urlObj.pathname);
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
      '/success-stories': '/company/success-stories',
      '/services': '/capabilities',
      '/services/seo': '/capabilities/seo-discoverability',
      '/services/geo-optimization': '/capabilities/seo-discoverability',
      '/services/lead-generation': '/capabilities/native-crm',
      '/services/web-development': '/capabilities/web-development',
      '/services/web-design': '/capabilities/web-development',
      '/services/ppc-advertising': '/capabilities/native-crm',
      '/services/advertising': '/capabilities/native-crm',
      '/google-penalty-recovery': '/capabilities/seo-discoverability',
      '/what-we-do.html': '/capabilities/seo-discoverability',
      '/capabilities/generative-engine-optimization': '/capabilities/seo-discoverability',
      '/capabilities/forensic-seo-penalty-recovery': '/capabilities/seo-discoverability',
      '/capabilities/conversion-architecture': '/capabilities/native-crm',
      '/capabilities/semantic-search-intelligence': '/capabilities/seo-discoverability',
      '/capabilities/custom-digital-infrastructure': '/capabilities/web-development',
      '/company/careers': '/',
      '/capabilities/ai-prospect-scraper': '/capabilities'
    };
    
    const target = legacyRedirects[normalized];
    if (target) {
      window.history.replaceState({}, '', target);
      const targetPath = target.split('#')[0];
      setCurrentPath(targetPath);
    }
  }, [currentPath]);

  // Normalize path
  const normalizedPath = currentPath.toLowerCase().replace(/\/$/, '') || '/';

  // Detect article routes: /insights/[slug]
  const articleMatch = normalizedPath.match(/^\/insights\/([a-z0-9-]+)$/);
  const articleSlug = articleMatch ? articleMatch[1] : null;

  const isSolutionRoute = [
    '/capabilities/web-development',
    '/capabilities/native-crm',
    '/capabilities/seo-discoverability',
    '/capabilities/blockchain-web3-development',
    '/capabilities/ai-prospect-scraper',
    '/capabilities/ai-llms-business'
  ].includes(normalizedPath);

  return (
    <>
      <SEO path={normalizedPath} />
      <GlobalWebGLBackground />
      {/* Global Noise Overlay */}
      <div className="noise-overlay" />
      
      {normalizedPath === '/admin' ? (
        token ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        )
      ) : normalizedPath === '/' ? (
        <GobiyaLanding />
      ) : normalizedPath === '/on-page-seo-los-angeles' ? (
        <OnPageSeoLosAngelesPage />
      ) : normalizedPath === '/book' || normalizedPath === '/book-call' ? (
        <BookingPage />
      ) : normalizedPath === '/about/steve-martin' || normalizedPath === '/author/steve-martin' ? (
        <AuthorPage path={normalizedPath} />
      ) : normalizedPath === '/company/about' || normalizedPath === '/about' ? (
        <GobiyaAboutPage />
      ) : articleSlug ? (
        <ArticlePage slug={articleSlug} />
      ) : normalizedPath === '/thank-you' ? (
        <ThankYouPage />
      ) : normalizedPath === '/capabilities' ? (
        <CapabilitiesIndex />
      ) : normalizedPath === '/company/success-stories' ? (
        <SuccessStories />
      ) : normalizedPath === '/company/approach' ? (
        <ApproachPage />
      ) : normalizedPath === '/insights' ? (
        <InsightsPage />
      ) : normalizedPath === '/contact' ? (
        <ContactPage />
      ) : isSolutionRoute ? (
        <SolutionPage path={normalizedPath} />
      ) : normalizedPath === '/case-studies/smile-center-dentistry' ? (
        <SmileCenterCaseStudy />
      ) : normalizedPath === '/case-studies/american-livescan' ? (
        <AmericanLivescanCaseStudy />
      ) : (
        <ServiceSubpage path={normalizedPath} />
      )}
    </>
  );
}

export default App;
