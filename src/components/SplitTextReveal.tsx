import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SplitTextRevealProps {
  text?: string;
  className?: string;
}

const SplitTextReveal: React.FC<SplitTextRevealProps> = ({ text = "", className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    gsap.set(textRef.current, { opacity: 1 });

    const ctx = gsap.context(() => {
      let split;
      
      // Creating the split text instance using the user's requested configuration
      // Assuming 'SplitText.create' is a static method or we just use 'new SplitText'
      // We will use 'new SplitText' to be safe with standard GSAP 3 syntax but pass their options.
      const splitInstance = new SplitText(textRef.current, {
        type: "words,lines",
        linesClass: "line",
      });

      // The user code used `mask: "lines"` which might be a custom codepen thing, 
      // but to achieve the "mask" effect of lines coming up from hidden overflow,
      // we must wrap the lines in an overflow hidden div.
      splitInstance.lines.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "inline-block";
        wrapper.style.verticalAlign = "top";
        // Need to ensure the wrapper has the same line-height or it might clip
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });

      split = gsap.from(splitInstance.lines, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        duration: 0.6,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      });

    }, containerRef);

    return () => ctx.revert();
  }, [text]);

  return (
    <div ref={containerRef} className={`w-full py-24 sm:py-32 flex items-center justify-center px-5 sm:px-8 lg:px-12 bg-[#0e100f] ${className}`}>
      <div className="max-w-[80vw]">
        <h1 
          ref={textRef} 
          className="split text-center font-display font-medium text-[clamp(2rem,5vw,5rem)] tracking-[-0.02em] leading-[1.1] opacity-0 text-white"
        >
          {text}
        </h1>
      </div>
    </div>
  );
};

export default SplitTextReveal;
