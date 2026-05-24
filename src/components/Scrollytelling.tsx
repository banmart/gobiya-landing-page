import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export const PerspectiveCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ""
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    // Tilt calculations (-15 to 15 degrees)
    const tiltX = (y - 0.5) * -20;
    const tiltY = (x - 0.5) * 20;

    gsap.to(cardRef.current, {
      rotateX: tiltX,
      rotateY: tiltY,
      scale: 1.02,
      duration: 0.5,
      ease: 'power3.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)] ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
    </div>
  );
};

interface ScrollytellingProps {
  frameCount?: number;
  framePrefix?: string;
  frameBaseUrl?: string;
  zoomFactor?: number;
  title?: string;
  subtitle?: string;
  description?: string;
}

const Scrollytelling: React.FC<ScrollytellingProps> = ({
  frameCount = 180,
  framePrefix = 'ezgif-frame-',
  frameBaseUrl = '/frames/',
  zoomFactor = 1.35,
  title = 'VELOCITY',
  subtitle = 'Lightning-Fast SEO Rankings',
  description = "Experience the exhilarating rush of immediate traffic. Just like a high-speed Indy car, we accelerate your brand's digital presence to the finish line—leaving your competitors in the rearview mirror."
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameIndexRef = useRef(0);
  const animationFrameIdRef = useRef<number>(0);

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const preloadedImages: HTMLImageElement[] = [];

    const loadImage = (index: number) => {
      const img = new Image();
      const frameNumber = (index + 1).toString().padStart(3, '0');
      img.src = `${frameBaseUrl}${framePrefix}${frameNumber}.jpg`;
      img.onload = () => {
        loadedCount++;
        const progress = Math.floor((loadedCount / frameCount) * 100);
        setLoadingProgress(progress);

        if (loadedCount === frameCount) {
          setImages(preloadedImages);
          setIsLoaded(true);
        }
      };
      preloadedImages[index] = img;
    };

    for (let i = 0; i < frameCount; i++) {
      loadImage(i);
    }

    return () => {
      // Cleanup if needed
    };
  }, [frameCount, framePrefix, frameBaseUrl]);

  // Draw Frame to Canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[index] || images[0];
    if (!img) return;

    // Object-fit cover logic with zoom factor
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    // Update canvas size
    if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }

    const imgWidth = img.width;
    const imgHeight = img.height;

    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth * zoomFactor;
      drawHeight = (canvasWidth / imgRatio) * zoomFactor;
    } else {
      drawWidth = (canvasHeight * imgRatio) * zoomFactor;
      drawHeight = canvasHeight * zoomFactor;
    }

    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = (canvasHeight - drawHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Handle Scroll
  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));

      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
      );

      if (frameIndex !== frameIndexRef.current) {
        frameIndexRef.current = frameIndex;
        cancelAnimationFrame(animationFrameIdRef.current);
        animationFrameIdRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial draw
    drawFrame(0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [isLoaded, images]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(frameIndexRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      drawFrame(frameIndexRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  return (
    <div ref={containerRef} className="relative bg-black" style={{ height: '200vh' }}>
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700">
          <div className="relative w-64 h-1 bg-neutral-800 rounded-full overflow-hidden mb-4">
            <div
              className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-white text-sm font-light tracking-widest uppercase">
            Loading {loadingProgress}%
          </p>
        </div>
      )}

      {/* Canvas Wrapper */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full scale-[1.05] will-change-transform"
          style={{ objectFit: 'cover' }}
        />
        {/* Bottom-to-Top Gradient Overlay for Hero Section */}
        <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Content overlays */}
      <div className="relative z-10 w-full">
        {/* Section 1: Introduction (Hero - Bottom Aligned) */}
        <section className="h-screen flex items-end justify-start px-12 md:px-24 pb-24 md:pb-32">
          <div className="text-left w-full">
            <h1 className="text-5xl md:text-[8rem] font-black text-white uppercase tracking-tighter mix-blend-normal leading-[0.85] mb-6 drop-shadow-[0_10px_50px_rgba(0,0,0,0.8)]">
              {title}
            </h1>
            <p className="text-xl md:text-3xl text-white/90 font-light mix-blend-normal tracking-[0.1em] max-w-2xl uppercase border-l-4 border-white pl-8">
              {subtitle} <br />
              <span className="text-white/60 text-sm tracking-widest block mt-4 leading-relaxed normal-case">
                {description}
              </span>
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Scrollytelling;
