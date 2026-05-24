import React, { useState, useEffect } from 'react';
import AxionLanding from './components/AxionLanding';
import ServiceSubpage from './components/ServiceSubpage';
import SeoContent from './components/services/SeoContent';
import LeadGenContent from './components/services/LeadGenContent';
import GeoOptimizationContent from './components/services/GeoOptimizationContent';
import WebDesignContent from './components/services/WebDesignContent';
import AdvertisingContent from './components/services/AdvertisingContent';
import PenaltyRecoveryContent from './components/services/PenaltyRecoveryContent';

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

  return (
    <>
      {/* Global Noise Overlay */}
      <div className="noise-overlay" />
      
      {normalizedPath === '/' ? (
        <AxionLanding />
      ) : (
        <ServiceSubpage path={normalizedPath}>
          {normalizedPath === '/services/seo' && <SeoContent />}
          {normalizedPath === '/services/lead-generation' && <LeadGenContent />}
          {normalizedPath === '/services/geo-optimization' && <GeoOptimizationContent />}
          {normalizedPath === '/services/web-design' && <WebDesignContent />}
          {normalizedPath === '/services/advertising' && <AdvertisingContent />}
          {normalizedPath === '/google-penalty-recovery' && <PenaltyRecoveryContent />}
        </ServiceSubpage>
      )}
    </>
  );
}

export default App;
