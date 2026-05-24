import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxMediaProps {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

const ParallaxMedia: React.FC<ParallaxMediaProps> = ({ 
  type, 
  src, 
  alt, 
  className = '',
  ...rest 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>('');

  useEffect(() => {
    if (!containerRef.current || !mediaRef.current) return;

    // The image starts slightly higher and moves down as you scroll
    const tl = gsap.fromTo(mediaRef.current, 
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    // Lazy load and play/pause controls for videos using ScrollTrigger
    let lazyTrigger: ScrollTrigger | null = null;
    let playTrigger: ScrollTrigger | null = null;

    if (type === 'video' && src) {
      // 1. Lazy load: Set the video src when the video is 400px below the viewport
      lazyTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom+=400px',
        once: true,
        onEnter: () => {
          setVideoSrc(src);
        }
      });

      // 2. Play/Pause: Start video playback when in viewport, pause when offscreen
      playTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          const video = mediaRef.current as HTMLVideoElement;
          if (video && video.src && video.paused) {
            video.play().catch(() => {});
          }
        },
        onLeave: () => {
          const video = mediaRef.current as HTMLVideoElement;
          if (video && !video.paused) {
            video.pause();
          }
        },
        onEnterBack: () => {
          const video = mediaRef.current as HTMLVideoElement;
          if (video && video.src && video.paused) {
            video.play().catch(() => {});
          }
        },
        onLeaveBack: () => {
          const video = mediaRef.current as HTMLVideoElement;
          if (video && !video.paused) {
            video.pause();
          }
        }
      });
    }

    return () => {
      tl.kill();
      if (lazyTrigger) lazyTrigger.kill();
      if (playTrigger) playTrigger.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [type, src]);

  // We set the media to be 120% height so it has room to parallax up and down without showing edges
  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {type === 'image' ? (
        <img 
          ref={mediaRef as any}
          src={src} 
          alt={alt} 
          className="absolute top-0 left-0 w-full h-[120%] object-cover will-change-transform"
        />
      ) : (
        <video 
          ref={mediaRef as any}
          src={videoSrc || undefined} 
          className="absolute top-0 left-0 w-full h-[120%] object-cover will-change-transform"
          {...rest}
        />
      )}
    </div>
  );
};

export default ParallaxMedia;
