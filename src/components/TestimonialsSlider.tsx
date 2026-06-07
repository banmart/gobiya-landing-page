import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  company: string;
  author: string;
  image_url: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Traffic up and more calls from the website.",
    company: "SafetyCentric",
    author: "Pete Urueta",
    image_url: "/images/pete-AI.jpeg"
  },
  {
    id: 2,
    text: "Built and launched our contractor marketplace without any inturruptions and for what we agreed.",
    company: "RemodelMe Pros",
    author: "Mike Pinkston",
    image_url: "/images/testimonial-mike.png"
  },
  {
    id: 3,
    text: "Our enterprise sales pipeline doubled in 3 months after implementing their AI-driven approach.",
    company: "Doc Prep",
    author: "Carla Vasquez",
    image_url: "/images/doc-prep.jpeg"
  },
  {
    id: 4,
    text: "The best technical SEO partnership we've ever had. Highly recommend their growth engineering team.",
    company: "Total Capital Inc",
    author: "Eli Zilberstein",
    image_url: "/images/eli-portrait.webp"
  }
];

const TestimonialsSlider: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

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
    
    // Give DOM a tick to render before calculating
    setTimeout(calcMax, 50);
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
    <section className="bg-[#111] py-20 lg:py-28 overflow-hidden w-full border-t border-white/10">
      <div className="w-full relative z-10">
        <div className="px-5 sm:px-8 lg:px-12 mb-10 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between max-w-[1440px] mx-auto gap-6">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#F26522] text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">4</div>
                <div className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase border border-white/20 text-white px-4 py-2 rounded-full shadow-md">
                  What Our Clients Say
                </div>
              </div>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white">
                Client Testimonials
              </h2>
            </div>
            <div className="flex items-center gap-3">
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
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="insight-card relative w-[85vw] sm:w-[45vw] lg:w-[350px] xl:w-[400px] aspect-[4/5] overflow-hidden group select-none"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${testimonial.image_url})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                  <div className="mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-[#F26522] text-white text-[10px] uppercase tracking-wider font-semibold">
                      {testimonial.company}
                    </span>
                  </div>
                  <h3 className="text-white text-xl sm:text-2xl font-medium leading-tight mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    "{testimonial.text}"
                  </h3>
                  <div className="flex items-center text-gray-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                    <span className="text-[14px] font-medium mr-2">{testimonial.author}</span>
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

export default TestimonialsSlider;
