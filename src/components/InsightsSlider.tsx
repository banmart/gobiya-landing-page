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
}

const InsightsSlider: React.FC<InsightsSliderProps> = ({ filterCategory, limit, currentPath }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchInsights = async () => {
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

        let processed: Insight[] = [];
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

        // Merge static articles from ARTICLES registry
        const merged = [...processed];
        Object.values(ARTICLES).forEach((art) => {
          const exists = processed.some(
            (item: any) => item.slug && item.slug.toLowerCase() === art.slug.toLowerCase()
          );
          if (!exists) {
            merged.push({
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
      } catch (err) {
        console.error("Failed to fetch insights:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  const displayInsights = React.useMemo(() => {
    let list = [...insights];

    const getRelevanceScore = (insight: Insight, path: string): number => {
      const normPath = path.toLowerCase().replace(/\/$/, '');
      const textToSearch = `${insight.title} ${insight.slug || ''} ${insight.category || ''}`.toLowerCase();
      
      let keywords: string[] = [];
      if (normPath.includes('geo-optimization') || normPath.includes('/geo')) {
        keywords = ['geo', 'generative', 'ai', 'chatgpt', 'perplexity', 'claude', 'gemini', 'engine optimization'];
      } else if (normPath.includes('penalty-recovery') || normPath.includes('penalty')) {
        keywords = ['penalty', 'manual action', 'algorithmic', 'core update', 'helpful content', 'recovery', 'spam'];
      } else if (normPath.includes('seo')) {
        keywords = ['seo', 'search engine', 'ranking', 'organic', 'topical', 'local seo', 'penalty', 'manual action', 'core update'];
      } else if (normPath.includes('lead-generation') || normPath.includes('lead-gen')) {
        keywords = ['lead', 'pipeline', 'outbound', 'prospecting', 'sales', 'b2b'];
      } else if (normPath.includes('web-development') || normPath.includes('web-design')) {
        keywords = ['web', 'react', 'vite', 'performance', 'speed', 'design', 'coding'];
      } else if (normPath.includes('ppc-advertising') || normPath.includes('advertising')) {
        keywords = ['ppc', 'advertising', 'ads', 'google ads', 'meta ads', 'paid', 'roas'];
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

    if (limit) {
      return list.slice(0, limit);
    }
    return list;
  }, [insights, filterCategory, limit, currentPath]);

  useEffect(() => {
    const calcMax = () => {
      if (!trackRef.current || loading || displayInsights.length === 0) return;
      const track = trackRef.current;
      const cards = track.children;
      if (cards.length === 0) return;
      const card = cards[0] as HTMLElement;
      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      const cardWidth = card.offsetWidth + gap;
      const visibleCards = Math.floor(track.parentElement!.offsetWidth / cardWidth);
      setMaxIndex(Math.max(0, cards.length - visibleCards));
    };
    
    // Give DOM a tick to render before calculating
    setTimeout(calcMax, 50);
    window.addEventListener('resize', calcMax);
    return () => window.removeEventListener('resize', calcMax);
  }, [loading, displayInsights.length]);

  const slideTo = (index: number) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const cards = track.children;
    if (cards.length === 0) return;
    const card = cards[0] as HTMLElement;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const cardWidth = card.offsetWidth + gap;
    const clamped = Math.max(0, Math.min(index, maxIndex));
    setCurrentIndex(clamped);
    gsap.to(track, { x: -(clamped * cardWidth), duration: 0.6, ease: 'power3.out' });
  };

  const handlePrev = () => slideTo(currentIndex - 1);
  const handleNext = () => slideTo(currentIndex + 1);

  // Touch / drag support
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    currentX.current = e.clientX;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    currentX.current = e.clientX;
  };
  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = startX.current - currentX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  // Render Skeletons during loading
  const renderSkeletons = () => {
    return Array(4).fill(0).map((_, idx) => (
      <div 
        key={`skeleton-${idx}`}
        className="insight-card relative w-[85vw] sm:w-[45vw] lg:w-[350px] xl:w-[400px] aspect-[4/5] overflow-hidden bg-gray-800/50 animate-pulse rounded-sm"
      >
        <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
          <div className="w-16 h-4 bg-gray-700 mb-4 rounded-sm" />
          <div className="w-full h-6 bg-gray-700 mb-2 rounded-sm" />
          <div className="w-2/3 h-6 bg-gray-700 mb-4 rounded-sm" />
          <div className="w-24 h-4 bg-gray-700 rounded-sm" />
        </div>
      </div>
    ));
  };

  return (
    <section className="bg-[#111] py-20 lg:py-28 overflow-hidden w-full">
      <div className="w-full relative z-10">
        <div className="px-5 sm:px-8 lg:px-12 mb-10 sm:mb-14">
          <div className="flex items-center justify-between max-w-[1440px] mx-auto">
            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white">
              Latest Insights
            </h2>
            <div className="flex items-center gap-3">
              {/* Arrow buttons */}
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0 || loading || displayInsights.length === 0}
                className="w-11 h-11 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-20 disabled:pointer-events-none"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex || loading || displayInsights.length === 0}
                className="w-11 h-11 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-20 disabled:pointer-events-none"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          className="pl-5 sm:pl-8 lg:pl-12 w-full overflow-hidden cursor-grab active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div ref={trackRef} className="flex gap-6 sm:gap-8 w-max pr-5 sm:pr-8 lg:pr-12">
            {loading ? (
              renderSkeletons()
            ) : displayInsights.length === 0 ? (
              <div className="text-gray-400 text-lg w-full py-10">No insights available at the moment.</div>
            ) : (
              displayInsights.map((insight) => {
                const href = insight.slug
                  ? `/insights/${insight.slug}`
                  : undefined;
                const CardTag = href ? 'a' : 'div';
                const cardProps: any = {
                  key: insight.id,
                  className: 'insight-card relative w-[85vw] sm:w-[45vw] lg:w-[350px] xl:w-[400px] aspect-[4/5] overflow-hidden group select-none ' + (href ? 'cursor-pointer' : ''),
                  ...(href ? { href } : {}),
                };
                return (
                  <CardTag {...cardProps}>
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${insight.image_url})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                    <div className="mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-3 py-1 bg-[#F26522] text-white text-[10px] uppercase tracking-wider font-semibold">
                        {insight.category}
                      </span>
                    </div>
                    <h3 className="text-white text-xl sm:text-2xl font-medium leading-tight mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {insight.title}
                    </h3>
                    <div className="flex items-center text-[#F26522] translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                      <span className="text-[13px] font-semibold mr-2 uppercase tracking-wide">Read Article</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                  </CardTag>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSlider;
