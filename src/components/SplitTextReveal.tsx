import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SplitTextRevealProps {
  text?: string;
  textClassName?: string;
  containerClassName?: string;
}

const SplitTextReveal: React.FC<SplitTextRevealProps> = ({ 
  text = "", 
  textClassName = "", 
  containerClassName = "" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    gsap.set(textRef.current, { opacity: 1 });

    const ctx = gsap.context(() => {
      const splitInstance = new SplitText(textRef.current, {
        type: "words,lines",
        linesClass: "line",
      });

      splitInstance.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "inline-block";
        wrapper.style.verticalAlign = "top";
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      gsap.from(splitInstance.lines, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
        duration: 0.6,
        yPercent: 100,
        opacity: 0,
        stagger: 0.05,
        ease: "expo.out",
      });

    }, containerRef);

    return () => {
      ctx.revert();
      if (textRef.current) {
        textRef.current.innerHTML = text;
      }
    };
  }, [text]);

  const defaultContainerClass = "w-full py-24 sm:py-32 flex items-center justify-center px-5 sm:px-8 lg:px-12 bg-[#0e100f]";
  const defaultTextClass = "split text-center font-display font-medium text-[clamp(2rem,5vw,5rem)] tracking-[-0.02em] leading-[1.1] opacity-0 text-white";

  return (
    <div ref={containerRef} className={containerClassName || defaultContainerClass}>
      <div className={containerClassName ? "w-full" : "max-w-[80vw]"}>
        <p 
          ref={textRef} 
          className={textClassName || defaultTextClass}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default SplitTextReveal;
