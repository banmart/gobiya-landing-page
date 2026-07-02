import React, { useEffect, useState } from 'react';
import { ArrowLeft, Terminal, ShieldAlert, RefreshCw } from 'lucide-react';
import { gsap } from 'gsap';
import SEO from './SEO';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

const NotFound: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('');
  const [simulatedLog, setSimulatedLog] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }

    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });

    const ease = 'power3.out';
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease, duration: 1.1 } });
      tl.from('.icon-container', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, 0)
        .from('.nf-title', { y: 20, opacity: 0 }, 0.1)
        .from('.nf-copy', { y: 16, opacity: 0 }, 0.25)
        .from('.terminal-container', { y: 16, opacity: 0 }, 0.35)
        .from('.btn-container > a', { y: 14, opacity: 0, stagger: 0.1 }, 0.5);
    });

    const logs = [
      `Request GET ${window.location.pathname}...`,
      `Lookup status: ENTITY_NOT_FOUND (404)`,
      `Checking URL cache for legacy redirects...`,
      `Verification complete. Target is unregistered in the knowledge graph.`,
      `Recommendation: redirect back to secure network.`
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setSimulatedLog(prev => [...prev, logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased font-sans flex flex-col">
      <SEO path="/404" />
      <SiteHeader />

      <main className="flex-grow flex flex-col justify-center items-center px-[5vw] pt-40 pb-24">
        <div className="max-w-2xl w-full text-center">
          <div className="icon-container w-20 h-20 bg-[#d1f851] rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldAlert className="w-10 h-10 text-gray-900" />
          </div>

          <span className="nf-title text-sm font-mono uppercase tracking-widest text-gray-500 block mb-4">
            404 — Page not found
          </span>

          <h1 className="nf-title text-4xl sm:text-6xl font-black tracking-tight text-gray-900 leading-[1.05] mb-6">
            Entity Drift Detected
          </h1>

          <p className="nf-copy text-lg leading-relaxed text-gray-600 mb-10 max-w-lg mx-auto">
            The page you are looking for does not exist or has been relocated within our search ecosystem. Let's get you back on track.
          </p>

          {/* Simulated Terminal Diagnostic Console */}
          <div className="terminal-container w-full bg-[#111827] border border-gray-800 rounded-lg p-5 text-left mb-10 font-mono text-[12px] text-gray-400 min-h-[160px] relative overflow-hidden">
            <div className="absolute top-3 right-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/60" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <span className="w-2 h-2 rounded-full bg-green-500/60" />
            </div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10 text-gray-300">
              <Terminal className="w-3.5 h-3.5 text-[#d1f851]" />
              <span>Gobiya Diagnostic Console v1.0.4</span>
            </div>
            <div className="space-y-1">
              {simulatedLog.map((log, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-[#d1f851]/70 select-none">&gt;</span>
                  <span className={log.includes('404') ? 'text-red-400 font-semibold' : log.includes('Success') ? 'text-green-400' : 'text-gray-400'}>
                    {log}
                  </span>
                </div>
              ))}
              {simulatedLog.length < 6 && (
                <div className="flex items-center gap-1.5 text-gray-500">
                  <span className="text-[#d1f851]/70 select-none">&gt;</span>
                  <RefreshCw className="w-3 h-3 animate-spin text-[#d1f851]/60" />
                  <span>Processing...</span>
                </div>
              )}
            </div>
          </div>

          <div className="btn-container flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-[#111827] hover:bg-gray-700 text-white px-7 py-3.5 rounded-full font-bold text-[15px] transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Safety
            </a>

            <a
              href="/capabilities"
              className="inline-flex items-center gap-2 bg-transparent border border-gray-200 hover:border-gray-900 text-gray-900 px-7 py-3.5 rounded-full font-bold text-[15px] transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              View Capabilities
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default NotFound;
