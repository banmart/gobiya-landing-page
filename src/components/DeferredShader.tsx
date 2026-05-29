import React, { useState, useEffect, Suspense } from 'react';

// Lazy-load the Shader modules to remove them from the main initial JavaScript bundle.
const Shader = React.lazy(() => import('shaders/react').then(mod => ({ default: mod.Shader })));
const Swirl = React.lazy(() => import('shaders/react').then(mod => ({ default: mod.Swirl })));
const ChromaFlow = React.lazy(() => import('shaders/react').then(mod => ({ default: mod.ChromaFlow })));
const FlutedGlass = React.lazy(() => import('shaders/react').then(mod => ({ default: mod.FlutedGlass })));
const FilmGrain = React.lazy(() => import('shaders/react').then(mod => ({ default: mod.FilmGrain })));

interface DeferredShaderProps {
  children?: React.ReactNode;
}

const DeferredShader: React.FC<DeferredShaderProps> = ({ children }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Delay WebGL compilation to prevent main thread blocking during page load
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => setShouldRender(true));
      } else {
        setShouldRender(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) {
    // Solid background placeholder with no visual layout shifts
    return <div className="absolute inset-0 bg-[#050505] -z-10" />;
  }

  return (
    <Suspense fallback={<div className="absolute inset-0 bg-[#050505] -z-10" />}>
      <Shader>
        {children}
      </Shader>
    </Suspense>
  );
};

export { Swirl, ChromaFlow, FlutedGlass, FilmGrain };
export default DeferredShader;
