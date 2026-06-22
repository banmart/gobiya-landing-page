import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Activity, BarChart2, ShieldCheck, Terminal, Cpu, Code, Database, Search } from 'lucide-react';
import BorderGlow from './BorderGlow';

gsap.registerPlugin(ScrollTrigger);

interface BentoCard {
  href: string;
  colSpan: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: boolean;
}

interface StackedBentoProps {
  headline?: React.ReactNode;
  description?: string;
  cards?: BentoCard[];
}

const SystemVisual: React.FC<{ index: number }> = ({ index }) => {
  if (index === 0) {
    return (
      <div className="w-full h-full bg-[#0a0a0c] rounded-xl border border-white/10 p-4 font-mono text-[10px] text-green-400/70 overflow-hidden relative">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
          <Terminal size={14} className="text-white/50" />
          <span className="text-white/50">audit_logs.sh</span>
        </div>
        <div className="space-y-1">
          <p className="opacity-50">&gt; Initiating forensic scan...</p>
          <p className="opacity-70">&gt; Analyzing 1.4M URI paths</p>
          <p className="text-[#F26522]">&gt; WARNING: 403 errors detected in /api/v1/auth</p>
          <p className="opacity-70">&gt; Rebuilding index schema</p>
          <p className="opacity-100">&gt; Recovery sequence complete [200 OK]</p>
        </div>
        <div className="absolute bottom-4 right-4 text-white/20">
          <Cpu size={24} />
        </div>
      </div>
    );
  }
  
  if (index === 1) {
    return (
      <div className="w-full h-full bg-[#0a0a0c] rounded-xl border border-white/10 p-4 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
          <Activity size={14} className="text-white/50" />
          <span className="text-white/50 font-mono text-[10px]">TRAFFIC_RECOVERY.SYS</span>
        </div>
        <div className="flex items-end gap-2 h-24 mt-8">
          {[40, 25, 10, 15, 30, 60, 85, 100].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-[#F26522] to-transparent rounded-t-sm" style={{ height: `${h}%`, opacity: i > 3 ? 1 : 0.3 }} />
          ))}
        </div>
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="w-full h-full bg-[#0a0a0c] rounded-xl border border-white/10 p-4 relative overflow-hidden flex flex-col justify-center items-center">
        <ShieldCheck size={48} className="text-[#F26522] mb-4" />
        <div className="font-mono text-[12px] text-white/80">TRUST_SCORE: 98.4%</div>
        <div className="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
          <div className="bg-[#F26522] h-full w-[98%]" />
        </div>
      </div>
    );
  }

  if (index === 3) {
    return (
      <div className="w-full h-full bg-[#0a0a0c] rounded-xl border border-white/10 p-4 relative overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
          <Cpu size={14} className="text-[#F26522]" />
          <span className="text-white/50 font-mono text-[10px]">WEB3_CONTRACT.SYS</span>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-2 font-mono text-[10px] text-white/70">
          <div className="flex justify-between items-center bg-white/5 p-2 border border-white/5 rounded">
            <span className="text-[#F26522]">verifySignature()</span>
            <span className="text-green-400 font-bold">SUCCESS</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 p-2 border border-white/5 rounded">
            <span className="text-blue-400">gasUsed:</span>
            <span>21,000 gwei</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 p-2 border border-white/5 rounded">
            <span className="text-white/50">txHash:</span>
            <span>0x71c...3a9f</span>
          </div>
        </div>
      </div>
    );
  }

  if (index === 4) {
    return (
      <div className="w-full h-full bg-[#0a0a0c] rounded-xl border border-white/10 p-4 relative overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
          <Search size={14} className="text-[#F26522]" />
          <span className="text-white/50 font-mono text-[10px]">AI_LEAD_HUNTER.SYS</span>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-2">
          <div className="flex items-center gap-2 text-[10px] font-mono text-white/50">
            <span className="animate-pulse text-[#F26522]">●</span>
            <span>Target: B2B Logistics Companies</span>
          </div>
          <div className="bg-white/5 p-2 rounded border border-white/5 font-mono text-[10px] space-y-1">
            <div className="flex justify-between">
              <span className="text-[#F26522]">NAME:</span>
              <span className="text-white">Apex Logistics Inc.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F26522]">NAP:</span>
              <span className="text-white/70">321 Cargo Rd, LA | (213) 555-0199</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#F26522]">DRIP:</span>
              <span className="text-green-400">Campaign Auto-Generated</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1a1c23] to-[#0a0a0c] rounded-xl border border-white/10 p-4 relative overflow-hidden flex flex-col">
       <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
          <BarChart2 size={14} className="text-white/50" />
          <span className="text-white/50 font-mono text-[10px]">SYSTEM_STATUS</span>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-3">
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span className="text-white/50">METRICS</span>
            <span className="text-white">ONLINE</span>
          </div>
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden"><div className="bg-white h-full w-[100%]" /></div>
        </div>
    </div>
  );
};

const StackedBento: React.FC<StackedBentoProps> = ({ headline, description, cards }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<BentoCard | null>(null);

  useEffect(() => {
    if (!containerRef.current || cardRefs.current.length === 0) return;

    let ctx = gsap.context(() => {
      // Pin each card so they stack
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        ScrollTrigger.create({
          trigger: card,
          start: `top top+=150`, 
          endTrigger: containerRef.current,
          end: `bottom bottom-=100`,
          pin: true,
          pinSpacing: false,
        });

        // Add a slight scale and fade animation when the card stacks
        if (index > 0) {
          gsap.fromTo(card,
            { y: 150, opacity: 0.5, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              scrollTrigger: {
                trigger: card,
                start: "top bottom-=10%",
                end: "top top+=150",
                scrub: true,
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [cards]);

  const defaultCards = cards && cards.length > 0 ? cards : [
    {
      href: '/capabilities/web-development-agency/', colSpan: 2, gradient: true, icon: <Code size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />,
      title: 'Eliminate Slow, Invisible Websites', description: 'Stop losing customers to slow load times. We architect blazing-fast platforms that instantly capture user attention and signal absolute authority to AI crawlers.'
    },
    {
      href: '/capabilities/native-crm-agency/', colSpan: 1, icon: <Database size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />,
      title: 'Stop Paying Expensive SaaS Fees', description: 'Ditch bloated monthly subscriptions. We integrate custom pipeline tracking directly into your codebase so you own 100% of your sales data.'
    },
    {
      href: '/capabilities/seo-discoverability-agency/', colSpan: 2, icon: <Search size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />,
      title: 'Recover Lost Organic Traffic', description: 'Stop guessing why your rankings dropped. We deploy forensic technical audits to fix crawl errors, recover lost visibility, and secure your place in AI engine citations.'
    },
    {
      href: '/capabilities/blockchain-web3-development-agency/', colSpan: 1, icon: <Cpu size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />,
      title: 'Automate Your B2B Lead Flow', description: 'Say goodbye to empty pipelines. We build automated outreach systems that map high-intent search behavior directly to your sales team.'
    },
    {
      href: '/capabilities/ai-prospect-scraper-agency/', colSpan: 2, gradient: true, icon: <Search size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />,
      title: 'Never Cold Call Again', description: 'Stop wasting hours hunting for leads. Our AI prospector automatically hunts down verified decision-makers and drops them right into your personalized outreach sequences.'
    }
  ];

  return (
    <section className="w-full bg-[#111] py-24 sm:py-32 px-5 sm:px-8 lg:px-12 relative">
      <div className="max-w-[1000px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display font-medium text-white leading-[1.1] mb-6">
              {headline || (
                <>
                  Forensic analysis meets<br/>pipeline architecture.
                </>
              )}
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-body">
              {description || 'We do not provide reports. We architect proprietary growth assets that command sector respect and generate predictable B2B revenue.'}
            </p>
          </div>
          <p className="text-[14px] text-[#F26522] uppercase tracking-widest font-bold font-body">
            [ Core Capabilities ]
          </p>
        </div>

        <div ref={containerRef} className="relative w-full pb-[50vh]">
          {defaultCards.map((card, index) => {
            const isLast = index === defaultCards.length - 1;
            
            return (
              <div 
                key={index} 
                ref={(el) => (cardRefs.current[index] = el)} 
                className="w-full relative mb-[15vh] will-change-transform"
                style={{ zIndex: index + 10 }}
              >
                <BorderGlow
                  backgroundColor="#0a0a0c"
                  glowColor="19 89 54"
                  colors={['#F26522', '#ff9a66', '#8c350d']}
                  className="w-full rounded-2xl relative overflow-hidden shadow-2xl"
                  borderRadius={16}
                >
                  <div className="flex flex-col md:flex-row w-full h-auto min-h-[350px]">
                    {/* Content Side */}
                    <div className="p-8 sm:p-12 md:w-1/2 flex flex-col justify-center relative z-10 bg-gradient-to-br from-[#F26522]/20 to-transparent">
                      {card.icon}
                      <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-4 mt-6">{card.title}</h3>
                      <p className="text-gray-400 font-body text-base max-w-md">{card.description}</p>
                      
                      {isLast ? (
                        <a href={card.href}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-8 px-6 py-3 bg-[#F26522] text-white font-bold tracking-wider text-sm rounded-full w-max hover:bg-white hover:text-black transition-colors"
                          >
                            Explore Capability
                          </motion.button>
                        </a>
                      ) : (
                        <a 
                          href={card.href}
                          className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold tracking-wider text-[#F26522] hover:text-white transition-colors group/link w-max"
                        >
                          LEARN MORE 
                          <span className="transform transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                        </a>
                      )}
                    </div>
                    
                    {/* Visual Side */}
                    <div className="md:w-1/2 bg-[#111]/50 p-6 sm:p-10 flex items-center justify-center relative border-t md:border-t-0 md:border-l border-white/5">
                       {/* Subtle Background pattern */}
                       <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-black to-black" />
                       <div className="w-full h-full min-h-[200px] relative z-10">
                          <SystemVisual index={index} />
                       </div>
                    </div>
                  </div>
                </BorderGlow>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-[#1a1c23] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-black/50 rounded-full"
              >
                <X size={24} />
              </button>
              
              <div className="p-8 sm:p-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-[#F26522]/20 rounded-xl">
                    {activeCard.icon}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-display font-medium text-white">
                    {activeCard.title}
                  </h3>
                </div>
                
                <div className="prose prose-invert max-w-none font-body">
                  <p className="text-xl text-gray-300 leading-relaxed mb-8">
                    {activeCard.description}
                  </p>
                  
                  <h4 className="text-[#F26522] uppercase tracking-widest text-sm font-bold mb-4">Core Implementation</h4>
                  <ul className="space-y-4 mb-12">
                    <li className="flex items-start gap-3 text-gray-400">
                      <span className="text-[#F26522] mt-1">✓</span>
                      Deep algorithmic analysis and entity relationship mapping
                    </li>
                    <li className="flex items-start gap-3 text-gray-400">
                      <span className="text-[#F26522] mt-1">✓</span>
                      Native CRM integrations tracking organic pipeline generation
                    </li>
                    <li className="flex items-start gap-3 text-gray-400">
                      <span className="text-[#F26522] mt-1">✓</span>
                      Complete architectural overhaul to ensure crawler parity
                    </li>
                  </ul>

                  <div className="bg-black/50 border border-white/10 p-6 rounded-xl">
                    <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                      <Terminal size={16} /> Technical Deliverables
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Our systems are deployed as high-performance custom code. We eschew heavy CMS plugins and instead deliver lightweight, edge-cached React/Vite builds that pass Core Web Vitals and achieve maximum indexing velocity.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default StackedBento;
