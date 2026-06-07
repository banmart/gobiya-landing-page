import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollTextProps {
  text: string;
}

const HorizontalScrollText: React.FC<HorizontalScrollTextProps> = ({ text }) => {
  const wrapperRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!wrapperRef.current || !textRef.current || charsRef.current.length === 0) return;

    const validChars = charsRef.current.filter(Boolean);

    let ctx = gsap.context(() => {
      // Reveal container
      gsap.set(textRef.current, { opacity: 1 });

      gsap.from(validChars, {
        duration: 1,
        opacity: 0,
        scale: 0,
        y: 80,
        rotationX: 180,
        transformOrigin: "0% 50% -50",
        ease: "back",
        stagger: 0.05,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%", // Trigger when the text comes into view
          toggleActions: "play none none reverse"
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [text]);

  const words = text.split(' ');
  let charIndex = 0;

  return (
    <section 
      ref={wrapperRef} 
      className="w-full bg-[#111] py-32 flex justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <h3 
          ref={textRef} 
          className="text-center font-display text-[clamp(2rem,6rem,4.5vw)] font-semibold leading-[1.2] text-white opacity-0"
          style={{ 
            willChange: 'transform', 
            transform: 'translateZ(0)', 
            textRendering: 'optimizeSpeed',
            fontKerning: 'none'
          }}
        >
          {words.map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap">
              {word.split('').map((char, cIdx) => {
                const currentIndex = charIndex++;
                return (
                  <span 
                    key={currentIndex} 
                    ref={(el) => { charsRef.current[currentIndex] = el; }} 
                    className="inline-block"
                    style={{ willChange: 'transform' }}
                  >
                    {char}
                  </span>
                );
              })}
              {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </h3>
      </div>
    </section>
  );
};

export default HorizontalScrollText;
