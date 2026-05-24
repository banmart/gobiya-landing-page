import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Insight {
  id: number;
  title: string;
  category: string;
  image_path: string;
  image_url?: string;
}

const InsightsGrid: React.FC = () => {
  const [insightsByCategory, setInsightsByCategory] = useState<Record<string, Insight[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('insights')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          console.error("Error fetching insights:", error);
          setInsightsByCategory({});
          return;
        }

        if (data) {
          const processed = data.map((item: any) => {
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

          // Group by category
          const grouped: Record<string, Insight[]> = {};
          processed.forEach(insight => {
            const cat = insight.category || 'Uncategorized';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(insight);
          });
          setInsightsByCategory(grouped);
        }
      } catch (err) {
        console.error("Failed to fetch insights:", err);
      } finally {
        setLoading(false);
      }
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
                  {items.map((insight) => (
                    <div 
                      key={insight.id} 
                      className="insight-card relative w-full aspect-[4/5] overflow-hidden group cursor-pointer select-none"
                    >
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
                    </div>
                  ))}
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
