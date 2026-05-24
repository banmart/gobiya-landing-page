import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverState, setHoverState] = useState<'default' | 'link' | 'video'>('default');

  useEffect(() => {
    // Only apply on desktop
    if (window.innerWidth > 768) {
      document.body.style.cursor = 'none';
      // Also apply to all links and buttons to hide their default pointer
      const style = document.createElement('style');
      style.id = 'hide-default-cursor';
      style.innerHTML = `
        * { cursor: none !important; }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      document.body.style.cursor = 'auto';
      const style = document.getElementById('hide-default-cursor');
      if (style) style.remove();
    }
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const clickable = target.closest('button, a, [class*="cursor-pointer"]');
      const isVideo = target.tagName.toLowerCase() === 'video' || target.closest('video');
      
      if (isVideo) {
        setHoverState('video');
      } else if (clickable) {
        setHoverState('link');
      } else {
        setHoverState('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  let sizeClass = 'w-5 h-5';
  let bgClass = 'bg-white';
  let mixBlend = 'mix-blend-difference';
  let text = '';

  if (hoverState === 'link') {
    sizeClass = 'w-14 h-14';
    bgClass = 'bg-white opacity-20 backdrop-blur-sm';
    mixBlend = 'mix-blend-normal';
  } else if (hoverState === 'video') {
    sizeClass = 'w-24 h-24';
    bgClass = 'bg-[#F26522]';
    mixBlend = 'mix-blend-normal';
    text = 'PLAY';
  }

  return (
    <div 
      ref={cursorRef} 
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99999] flex items-center justify-center transition-all duration-300 ease-out hidden md:flex ${sizeClass} ${bgClass} ${mixBlend}`}
    >
      {text && (
        <span className="text-white font-display font-bold text-sm tracking-widest scale-up-center">
          {text}
        </span>
      )}
    </div>
  );
};

export default CustomCursor;
