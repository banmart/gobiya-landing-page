import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ARTICLES } from './ArticlePage';

interface Insight {
  id: number;
  title: string;
  category: string;
  image_path: string;
  image_url?: string;
  slug?: string;
}

const InsightsGrid: React.FC = () => {
  const [insightsByCategory, setInsightsByCategory] = useState<Record<string, Insight[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      let processed: Insight[] = [];
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('insights')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          console.error("Error fetching insights from database:", error);
        }

        if (data) {
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

      // Group by category
      const grouped: Record<string, Insight[]> = {};
      merged.forEach(insight => {
        const cat = insight.category || 'Uncategorized';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(insight);
      });
      setInsightsByCategory(grouped);
      setLoading(false);
    };

    fetchInsights();
  }, []);

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {Array(3).fill(0).map((_, idx) => (
        <div key={`skeleton-${idx}`} className="insight-card relative w-full aspect-[4/5] overflow-hidden bg-gray-800/50 animate-pulse rounded-sm">
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
            <div className="w-16 h-4 bg-gray-700 mb-4 rounded-sm" />
            <div className="w-full h-6 bg-gray-700 mb-2 rounded-sm" />
            <div className="w-2/3 h-6 bg-gray-700 mb-4 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="bg-[#111] py-20 lg:py-28 overflow-hidden w-full min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {loading ? (
          <div className="space-y-16">
            <div>
              <div className="w-48 h-8 bg-gray-800 mb-8 rounded-sm animate-pulse" />
              {renderSkeletons()}
            </div>
          </div>
        ) : Object.keys(insightsByCategory).length === 0 ? (
          <div className="text-gray-400 text-lg w-full py-10">No insights available at the moment.</div>
        ) : (
          <div className="space-y-24">
            {(Object.entries(insightsByCategory) as [string, Insight[]][]).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white mb-8 border-b border-white/20 pb-4">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {items.map((insight) => {
                    const href = insight.slug
                      ? `/insights/${insight.slug}`
                      : undefined;
                    const CardTag = href ? 'a' : 'div';
                    const cardProps: any = {
                      key: insight.id,
                      className: 'insight-card relative w-full aspect-[4/5] overflow-hidden group select-none ' + (href ? 'cursor-pointer' : ''),
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
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default InsightsGrid;
