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
      const scrollTween = gsap.to(textRef.current, {
        xPercent: -100,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          end: "+=5000px",
          scrub: true
        }
      });

      validChars.forEach((char) => {
        gsap.from(char, {
          yPercent: "random(-200, 200)",
          rotation: "random(-20, 20)",
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: "left 100%",
            end: "left 30%",
            scrub: 1
          }
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const words = text.split(' ');
  let charIndex = 0;

  return (
    <section 
      ref={wrapperRef} 
      className="overflow-hidden h-screen flex items-center w-full bg-[#111]"
    >
      <div className="w-full h-full flex items-center">
        <h3 
          ref={textRef} 
          className="flex w-max whitespace-nowrap gap-[4vw] pl-[100vw] text-[clamp(2rem,10vw,12rem)] font-semibold leading-[1.1] text-white uppercase"
        >
          {words.map((word, wordIdx) => (
            <React.Fragment key={wordIdx}>
              <div className="inline-flex">
                {word.split('').map((char, cIdx) => {
                  const currentIndex = charIndex++;
                  return (
                    <span 
                      key={currentIndex} 
                      ref={(el) => { charsRef.current[currentIndex] = el; }} 
                      className="inline-block"
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
              {wordIdx < words.length - 1 && " "}
            </React.Fragment>
          ))}
        </h3>
      </div>
    </section>
  );
};

export default HorizontalScrollText;
