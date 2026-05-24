import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
  text: string;
  labelNumber?: string;
  labelTitle?: string;
}

const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({ text, labelNumber, labelTitle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const words = textRef.current.querySelectorAll('.word');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 1, 
      }
    });

    tl.fromTo(
      words,
      { color: '#e5e7eb' },
      {
        color: '#111111',
        duration: 1,
        stagger: 0.1,
        ease: 'none',
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={containerRef} className="py-24 sm:py-32 lg:py-48 bg-white flex flex-col items-center justify-center min-h-[60vh] overflow-hidden">
      <div className="max-w-[1440px] w-full px-5 sm:px-8 lg:px-12 mx-auto">
        {(labelNumber || labelTitle) && (
          <div className="flex items-center gap-3 mb-10 sm:mb-16">
            {labelNumber && (
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-900 text-white text-[11px] sm:text-[12px] font-semibold flex items-center justify-center">
                {labelNumber}
              </div>
            )}
            {labelTitle && (
              <div className="text-[12px] sm:text-[13px] font-medium border border-gray-200 px-3 sm:px-4 py-1 sm:py-1.5">
                {labelTitle}
              </div>
            )}
          </div>
        )}
        <h2 
          ref={textRef} 
          className="text-[clamp(1.75rem,5vw,4.5rem)] leading-[1.15] font-medium tracking-tight text-[#111] max-w-6xl"
        >
          {text.split(' ').map((word, idx) => (
            <React.Fragment key={idx}>
              <span className="word inline-block">{word}</span>
              {' '}
            </React.Fragment>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default ScrollRevealText;
