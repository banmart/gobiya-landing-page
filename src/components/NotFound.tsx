import React, { useEffect, useState } from 'react';
import { ArrowLeft, Terminal, ShieldAlert, RefreshCw } from 'lucide-react';
import { gsap } from 'gsap';
import SEO from './SEO';

const NotFound: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('');
  const [simulatedLog, setSimulatedLog] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
    
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    
    const ease = 'power3.out';
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease, duration: 1.1 } });
      tl.from('.icon-container', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }, 0)
        .from('.font-display', { y: 20, opacity: 0 }, 0.1)
        .from('.text-gray-400', { y: 16, opacity: 0 }, 0.25)
        .from('.terminal-container', { y: 24, opacity: 0, duration: 1.3 }, 0.35)
        .from('.btn-container > a', { y: 14, opacity: 0, stagger: 0.1 }, 0.5);
    });

    // Simulated terminal output sequence
    const logs = [
      `Initializing search diagnostic...`,
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
    <>
      <SEO path="/404" />
      <div className="min-h-screen bg-[#050505] flex flex-col justify-center items-center px-5 sm:px-8 relative overflow-hidden">
        {/* Global Noise Overlay */}
        <div className="noise-overlay" />
        
        {/* Background elements to match brand aesthetic */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#F26522]/5 to-transparent pointer-events-none" />
        
        <div className="max-w-2xl w-full bg-black/40 border border-white/10 p-8 sm:p-14 rounded-2xl shadow-2xl backdrop-blur-md text-center relative z-10">
          <div className="icon-container w-20 h-20 bg-[#F26522]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#F26522]/20">
            <ShieldAlert className="w-10 h-10 text-[#F26522]" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-white mb-4 font-display">
            Entity Drift Detected
          </h1>
          
          <p className="text-[15px] sm:text-[16px] leading-relaxed text-gray-400 mb-8 max-w-lg mx-auto">
            The page you are looking for does not exist or has been relocated within our search ecosystem. Let's get you back on track.
          </p>

          {/* Simulated Terminal Diagnostic Console */}
          <div className="terminal-container w-full bg-[#0a0a0a] border border-white/5 rounded-lg p-5 text-left mb-10 font-mono text-[12px] text-gray-500 min-h-[160px] relative overflow-hidden">
            <div className="absolute top-3 right-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/60" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <span className="w-2 h-2 rounded-full bg-green-500/60" />
            </div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5 text-gray-400">
              <Terminal className="w-3.5 h-3.5 text-[#F26522]" />
              <span>Gobiya Diagnostic Console v1.0.4</span>
            </div>
            <div className="space-y-1">
              {simulatedLog.map((log, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-[#F26522]/60 select-none">&gt;</span>
                  <span className={log.includes('404') ? 'text-red-400 font-semibold' : log.includes('Success') ? 'text-green-400' : 'text-gray-400'}>
                    {log}
                  </span>
                </div>
              ))}
              {simulatedLog.length < 6 && (
                <div className="flex items-center gap-1.5 text-gray-500">
                  <span className="text-[#F26522]/60 select-none">&gt;</span>
                  <RefreshCw className="w-3 h-3 animate-spin text-[#F26522]/50" />
                  <span>Processing...</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="btn-container flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/" 
              className="flex items-center gap-2 bg-[#F26522] hover:bg-[#e05a1a] text-white px-6 py-3.5 rounded font-medium text-[14px] transition-all duration-300 w-full sm:w-auto justify-center shadow-lg shadow-[#F26522]/15 hover:shadow-[#F26522]/25"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Safety
            </a>
            
            <a 
              href="/capabilities" 
              className="flex items-center gap-2 bg-transparent border border-white/10 hover:border-[#F26522] hover:text-[#F26522] text-white px-6 py-3.5 rounded font-medium text-[14px] transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              View Capabilities
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
