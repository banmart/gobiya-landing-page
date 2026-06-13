import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ARTICLES } from './ArticlePage';

// Define the interface for an Insight item
interface Insight {
  id: number;
  title: string;
  category: string;
  image_path: string;
  image_url?: string; // We'll populate this from the bucket
  slug?: string;
}

interface InsightsSliderProps {
  filterCategory?: string;
  limit?: number;
  currentPath?: string;
  title?: string;
}

const InsightsSlider: React.FC<InsightsSliderProps> = ({ filterCategory, limit, currentPath, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchInsights = async () => {
      let processed: Insight[] = [];
      try {
        setLoading(true);
        // Default to a fallback empty array if supabase throws or returns null
        const { data, error } = await supabase
          .from('insights')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          console.error("Error fetching insights from database:", error);
        }

        if (data) {
          // Process the image URLs from the bucket
          processed = data.map((item: any) => {
            let finalUrl = '';
            if (item.image_path) {
              const { data: urlData } = supabase.storage
                .from('insights-images')
                .getPublicUrl(item.image_path);
              finalUrl = urlData.publicUrl;
            } else if (item.image_url) {
              finalUrl = item.image_url;
            }
            
            return {
              ...item,
              image_url: finalUrl
            };
          });
        }
      } catch (err) {
        console.error("Failed to fetch insights from database:", err);
      }

      // Merge static articles from ARTICLES registry (always run even if database call fails)
      const merged = [...processed];
      Object.values(ARTICLES).forEach((art) => {
        const existingIndex = processed.findIndex(
          (item: any) => item.slug && item.slug.toLowerCase() === art.slug.toLowerCase()
        );
        if (existingIndex !== -1) {
          // If the article is locally defined, override its image with the local one
          merged[existingIndex].image_url = art.image;
        } else {
          merged.unshift({
            id: -Math.floor(Math.random() * 1000000) - 1,
            title: art.title,
            category: art.category,
            image_path: '',
            image_url: art.image,
            slug: art.slug,
          });
        }
      });

      setInsights(merged);
      setLoading(false);
    };

    fetchInsights();
  }, []);

  const displayInsights = React.useMemo(() => {
    let list = [...insights];

    const getRelevanceScore = (insight: Insight, path: string): number => {
      const normPath = path.toLowerCase().replace(/\/$/, '');
      const textToSearch = `${insight.title} ${insight.slug || ''} ${insight.category || ''}`.toLowerCase();
      
      let keywords: string[] = [];
      if (normPath.startsWith('/insights/')) {
        const slug = normPath.substring('/insights/'.length);
        keywords = slug.split('-').filter(w => w.length > 2);
      } else if (normPath.includes('geo-optimization') || normPath.includes('/geo') || normPath.includes('ai-llms')) {
        keywords = ['geo', 'generative', 'ai', 'chatgpt', 'perplexity', 'claude', 'gemini', 'engine optimization', 'llm', 'automation', 'agent', 'workflow'];
      } else if (normPath.includes('penalty-recovery') || normPath.includes('penalty')) {
        keywords = ['penalty', 'manual action', 'algorithmic', 'core update', 'helpful content', 'recovery', 'spam'];
      } else if (normPath.includes('seo') || normPath.includes('smile-center') || normPath.includes('livescan')) {
        keywords = ['seo', 'search engine', 'ranking', 'organic', 'topical', 'local seo', 'penalty', 'manual action', 'core update', 'dentist', 'fingerprint', 'livescan'];
      } else if (normPath.includes('lead-generation') || normPath.includes('lead-gen') || normPath.includes('crm') || normPath.includes('scraper')) {
        keywords = ['lead', 'pipeline', 'outbound', 'prospecting', 'sales', 'b2b', 'crm', 'scraper', 'prospect'];
      } else if (normPath.includes('web-development') || normPath.includes('web-design')) {
        keywords = ['web', 'react', 'vite', 'performance', 'speed', 'design', 'coding'];
      } else if (normPath.includes('ppc-advertising') || normPath.includes('advertising')) {
        keywords = ['ppc', 'advertising', 'ads', 'google ads', 'meta ads', 'paid', 'roas'];
      } else if (normPath.includes('blockchain') || normPath.includes('web3')) {
        keywords = ['blockchain', 'web3', 'crypto', 'smart contract', 'solidity', 'ethereum', 'on-chain'];
      }

      if (keywords.length === 0) return 0;

      let score = 0;
      keywords.forEach(kw => {
        if (textToSearch.includes(kw)) {
          score += 1;
        }
      });
      return score;
    };

    if (currentPath) {
      const normPath = currentPath.toLowerCase().replace(/\/$/, '');
      const currentSlug = normPath.startsWith('/insights/') ? normPath.substring('/insights/'.length) : '';
      
      if (currentSlug) {
        list = list.filter(insight => insight.slug && insight.slug.toLowerCase() !== currentSlug);
      }

      list.sort((a, b) => {
        const scoreA = getRelevanceScore(a, currentPath);
        const scoreB = getRelevanceScore(b, currentPath);
        if (scoreA !== scoreB) {
          return scoreB - scoreA; // descending order of relevance score
        }
        
        // Secondary fallback to category matching
        if (filterCategory) {
          const aMatches = a.category === filterCategory;
          const bMatches = b.category === filterCategory;
          if (aMatches && !bMatches) return -1;
          if (!aMatches && bMatches) return 1;
        }
        return 0;
      });
    } else if (filterCategory) {
      list.sort((a, b) => {
        const aMatches = a.category === filterCategory;
        const bMatches = b.category === filterCategory;
        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return 0;
      });
    }

    // Limit the items for the accordion view, as it doesn't scale well past 5-6 items.
    return list.slice(0, limit || 5);
  }, [insights, filterCategory, limit, currentPath]);

  // Autoplay functionality
  useEffect(() => {
    if (displayInsights.length <= 1 || isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === displayInsights.length - 1 ? 0 : prev + 1));
    }, 5000); // 5 seconds per slide
    
    return () => clearInterval(interval);
  }, [displayInsights.length, isHovered]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? displayInsights.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === displayInsights.length - 1 ? 0 : prev + 1));
  };

  // Render Skeletons during loading
  const renderSkeletons = () => {
    return Array(5).fill(0).map((_, idx) => (
      <div 
        key={`skeleton-${idx}`}
        className={`relative overflow-hidden rounded-2xl bg-gray-800/50 animate-pulse transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${idx === 0 ? 'flex-[8]' : 'flex-[1]'}`}
      />
    ));
  };

  return (
    <section className="bg-[#111] py-20 lg:py-28 overflow-hidden w-full border-t border-white/10">
      <div className="w-full relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mb-10 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              {/* Green theme detection */}
              {(() => {
                const norm = currentPath ? currentPath.toLowerCase().replace(/\/$/, '') : '';
                const isGreenTheme = norm && (
                  norm.startsWith('/services/') ||
                  norm.startsWith('/case-studies/') ||
                  norm.startsWith('/capabilities/') ||
                  norm.startsWith('/insights/') ||
                  norm === '/google-penalty-recovery'
                );
                const themeBgAccent = isGreenTheme ? 'bg-[#2F5D50]' : 'bg-[#F26522]';
                
                return (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-6 h-6 sm:w-7 sm:h-7 ${themeBgAccent} text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center`}>5</div>
                      <div className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase border border-white/20 text-white px-4 py-2 rounded-full shadow-md">
                        What's happening
                      </div>
                    </div>
                    <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white">
                      {title || "See the latest from Gobiya."}
                    </h2>
                  </>
                );
              })()}
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                disabled={loading || displayInsights.length === 0}
                className="w-11 h-11 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-20 disabled:pointer-events-none rounded-full"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={loading || displayInsights.length === 0}
                className="w-11 h-11 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-20 disabled:pointer-events-none rounded-full"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div 
          className="w-full h-[500px] sm:h-[600px] flex flex-col sm:flex-row gap-2 sm:gap-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {loading ? (
            renderSkeletons()
          ) : displayInsights.length === 0 ? (
            <div className="text-gray-400 text-lg w-full py-10">No insights available at the moment.</div>
          ) : (
            displayInsights.map((insight, index) => {
              const isActive = index === activeIndex;
              
              return (
                <div
                  key={insight.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group
                    ${isActive ? 'flex-[8] sm:flex-[8]' : 'flex-[1] sm:flex-[1]'}
                  `}
                >
                  <img 
                    src={insight.image_url} 
                    alt={insight.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 
                      ${isActive ? 'scale-100' : 'scale-[1.15]'}
                    `} 
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-opacity duration-700 
                    ${isActive ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100' : 'bg-black/60 group-hover:bg-black/40'}
                  `} />
                  
                  {/* Active Content */}
                  <div className={`absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col justify-end transition-opacity duration-500
                    ${isActive ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}
                  `}>
                    {(() => {
                      const norm = currentPath ? currentPath.toLowerCase().replace(/\/$/, '') : '';
                      const isGreenTheme = norm && (
                        norm.startsWith('/services/') ||
                        norm.startsWith('/case-studies/') ||
                        norm.startsWith('/capabilities/') ||
                        norm.startsWith('/insights/') ||
                        norm === '/google-penalty-recovery'
                      );
                      const themeBgAccent = isGreenTheme ? 'bg-[#2F5D50]' : 'bg-[#F26522]';
                      return (
                        <span className={`inline-block px-3 py-1 ${themeBgAccent} text-white text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold w-max mb-4`}>
                          {insight.category}
                        </span>
                      );
                    })()}
                    <h3 className="text-white text-2xl sm:text-4xl font-medium leading-[1.15] mb-6 max-w-2xl font-display">
                      {insight.title}
                    </h3>
                    {insight.slug && (
                      <a 
                        href={`/insights/${insight.slug}`} 
                        className="inline-flex items-center justify-center text-white bg-white/10 hover:bg-white hover:text-black backdrop-blur-md px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 w-max"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent accordion click when clicking the link
                        }}
                      >
                        Read Article <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default InsightsSlider;
