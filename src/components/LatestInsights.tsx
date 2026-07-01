import React, { useRef, useState, MouseEvent as ReactMouseEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { ARTICLE_META } from '../lib/articlesMeta';

interface LatestInsightsProps {
  relevantSlugs?: string[];
}

const LatestInsights: React.FC<LatestInsightsProps> = ({ relevantSlugs }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const dragDistance = useRef(0);

  let displayArticles = [...ARTICLE_META];
  if (relevantSlugs && relevantSlugs.length > 0) {
    const relevant = ARTICLE_META.filter(a => relevantSlugs.includes(a.slug));
    relevant.sort((a, b) => relevantSlugs.indexOf(a.slug) - relevantSlugs.indexOf(b.slug));
    const remaining = ARTICLE_META.filter(a => !relevantSlugs.includes(a.slug));
    displayArticles = [...relevant, ...remaining];
  }

  const latestArticles = displayArticles.slice(0, 8);

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    dragDistance.current = 0;
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
    dragDistance.current += Math.abs(walk);
  };

  const scrollBy = (dir: 'prev' | 'next') => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.querySelector('a')?.offsetWidth ?? 400;
    sliderRef.current.scrollBy({ left: dir === 'next' ? cardWidth + 24 : -(cardWidth + 24), behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-24 bg-white overflow-hidden" id="latest-insights">
      <div className="px-6 lg:px-14">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Explore the latest articles
          </h2>
          <a
            href="/insights"
            className="group flex items-center gap-2 text-lg font-medium text-gray-900 border-b border-gray-900 pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors shrink-0"
          >
            Read all articles
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className={`flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} [&::-webkit-scrollbar]:hidden`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {latestArticles.map((article, idx) => (
            <a
              href={`/insights/${article.slug}`}
              key={idx}
              className="snap-start shrink-0 w-[80vw] sm:w-[360px] lg:w-[400px] flex flex-col group select-none"
              style={{ userSelect: 'none', WebkitUserDrag: 'none' }}
              onClick={(e) => { if (dragDistance.current > 15) e.preventDefault(); }}
              draggable={false}
            >
              <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                  draggable={false}
                />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 pointer-events-none">
                  {article.category || 'NEWS'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-[1.2] mb-5 pointer-events-none group-hover:text-gray-600 transition-colors">
                  {article.title}
                </h3>
                <span className="text-base font-medium text-gray-500 mt-auto pointer-events-none">
                  {article.date}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-end gap-3 mt-10">
          <button
            onClick={() => scrollBy('prev')}
            aria-label="Previous articles"
            className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            onClick={() => scrollBy('next')}
            aria-label="Next articles"
            className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestInsights;
