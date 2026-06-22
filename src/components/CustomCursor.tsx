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
      // Use gsap.set instead of gsap.to to completely eliminate sluggish dragging
      gsap.set(cursor, {
        x: e.clientX,
        y: e.clientY
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

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 pointer-events-none z-[99999] flex items-center justify-center transition-none"
      style={{ display: typeof window !== 'undefined' && window.innerWidth > 768 ? 'flex' : 'none' }}
    >
      {hoverState === 'default' && (
        <div className="relative w-6 h-6 flex items-center justify-center transition-all duration-300" style={{ mixBlendMode: 'difference' }}>
          <div className="absolute w-full bg-white" style={{ height: '2px' }}></div>
          <div className="absolute h-full bg-white" style={{ width: '2px' }}></div>
        </div>
      )}
      
      {hoverState === 'link' && (
        <div className="w-14 h-14 rounded-full bg-white opacity-20 backdrop-blur-sm transition-all duration-300" style={{ mixBlendMode: 'normal' }}></div>
      )}

      {hoverState === 'video' && (
        <div className="w-24 h-24 rounded-full bg-[#F26522] flex items-center justify-center transition-all duration-300" style={{ mixBlendMode: 'normal' }}>
          <span className="text-white font-display font-bold text-sm tracking-widest scale-up-center">
            PLAY
          </span>
        </div>
      )}
    </div>
  );
};

export default CustomCursor;

