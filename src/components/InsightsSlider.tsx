import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const insights = [
  {
    id: 1,
    title: 'The Future of AI in SEO for 2024',
    category: 'SEO',
    image: '/images/article-ai-seo-2024.webp',
  },
  {
    id: 2,
    title: 'Content Automation: Scaling Quality',
    category: 'Content',
    image: '/images/article-content-automation.webp',
  },
  {
    id: 3,
    title: 'Mastering Core Web Vitals',
    category: 'Technical',
    image: '/images/article-core-web-vitals.webp',
  },
  {
    id: 4,
    title: 'Predictive Analytics for Marketing',
    category: 'Analytics',
    image: '/images/article-predictive-analytics.webp',
  },
  {
    id: 5,
    title: 'AI Ethics in Digital Marketing',
    category: 'Strategy',
    image: '/images/article-ai-ethics.webp',
  }
];

interface InsightsSliderProps {
  filterCategory?: string;
}

const InsightsSlider: React.FC<InsightsSliderProps> = ({ filterCategory }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  const filteredInsights = filterCategory 
    ? insights.filter(i => i.category === filterCategory) 
    : insights;

  // If filteredInsights is empty, fallback to all insights
  const displayInsights = filteredInsights.length > 0 ? filteredInsights : insights;

  useEffect(() => {
    const calcMax = () => {
      if (!trackRef.current) return;
      const track = trackRef.current;
      const cards = track.children;
      if (cards.length === 0) return;
      const card = cards[0] as HTMLElement;
      const gap = parseFloat(getComputedStyle(track).gap) || 24;
      const cardWidth = card.offsetWidth + gap;
      const visibleCards = Math.floor(track.parentElement!.offsetWidth / cardWidth);
      setMaxIndex(Math.max(0, cards.length - visibleCards));
    };
    calcMax();
    window.addEventListener('resize', calcMax);
    return () => window.removeEventListener('resize', calcMax);
  }, []);

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
                disabled={currentIndex === 0}
                className="w-11 h-11 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors duration-300 disabled:opacity-20 disabled:pointer-events-none"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
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
            {displayInsights.map((insight) => (
              <div 
                key={insight.id} 
                className="insight-card relative w-[85vw] sm:w-[45vw] lg:w-[350px] xl:w-[400px] aspect-[4/5] overflow-hidden group cursor-pointer select-none"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${insight.image})` }}
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
      </div>
    </section>
  );
};

export default InsightsSlider;
