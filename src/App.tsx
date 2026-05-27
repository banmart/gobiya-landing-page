import React, { useState, useEffect } from 'react';
import AxionLanding from './components/AxionLanding';
import ServiceSubpage from './components/ServiceSubpage';
import ArticlePage from './components/ArticlePage';
import AuthorPage from './components/AuthorPage';
import ThankYouPage from './components/ThankYouPage';
import SEO from './components/SEO';

interface AppProps {
  url?: string;
}

function App({ url }: AppProps) {
  // Use server-provided url pathname if available, otherwise read window location pathname
  const [currentPath, setCurrentPath] = useState(
    url || (typeof window !== 'undefined' ? window.location.pathname : '/')
  );

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

  // Handle legacy redirects on mount and path change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const legacyRedirects: Record<string, string> = {
      '/services/seo': '/services#seo',
      '/services/lead-generation': '/services#lead-generation',
      '/services/geo-optimization': '/services#geo-optimization',
      '/services/web-design': '/services#web-design',
      '/services/advertising': '/services#advertising',
      '/google-penalty-recovery': '/services#penalty-recovery',
      '/company/insights': '/insights',
    };
    
    const normalized = currentPath.toLowerCase().replace(/\/$/, '') || '/';
    if (normalized.startsWith('/locations')) {
      window.history.replaceState({}, '', '/services');
      setCurrentPath('/services');
      return;
    }
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

  return (
    <>
      <SEO path={normalizedPath} />
      {/* Global Noise Overlay */}
      <div className="noise-overlay" />
      
      {normalizedPath === '/' ? (
        <AxionLanding />
      ) : normalizedPath === '/about/steve-martin' || normalizedPath === '/author/steve-martin' ? (
        <AuthorPage path={normalizedPath} />
      ) : articleSlug ? (
        <ArticlePage slug={articleSlug} />
      ) : normalizedPath === '/thank-you' ? (
        <ThankYouPage />
      ) : (
        <ServiceSubpage path={normalizedPath} />
      )}
    </>
  );
}

export default App;
