import React, { useState, useEffect } from 'react';
import AxionLanding from './components/AxionLanding';
import ServiceSubpage from './components/ServiceSubpage';
import ArticlePage from './components/ArticlePage';
import AuthorPage from './components/AuthorPage';
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
          e.preventDefault();
          window.history.pushState({}, '', urlObj.pathname);
          setCurrentPath(urlObj.pathname);
          // Scroll to top
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

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
      ) : (
        <ServiceSubpage path={normalizedPath} />
      )}
    </>
  );
}

export default App;
