import React, { useEffect, useState } from 'react';
import Grainient from './Grainient';

interface CTASectionProps {
  topic?: string;
  path?: string;
}

interface CTAConfig {
  tagline: string;
  headline: string;
  buttonText: string;
  buttonLink: string;
}

const defaultCTA: CTAConfig = {
  tagline: "Let's work together",
  headline: "Let's achieve concrete and measurable results together.",
  buttonText: "Let's connect",
  buttonLink: "mailto:hello@gobiya.com?subject=Inquiry%20from%20Gobiya%20Homepage"
};

const getCTAConfig = (path: string, topic?: string): CTAConfig => {
  const cleanPath = path.toLowerCase().replace(/\/$/, '') || '/';

  if (topic) {
    const t = topic.toLowerCase();
    if (t.includes('creativ')) {
      return {
        tagline: "Creative Engineering",
        headline: "Let's build brand systems that command attention and drive conversion.",
        buttonText: "Start your design project",
        buttonLink: "/book"
      };
    }
    if (t.includes('perform')) {
      return {
        tagline: "Performance Marketing",
        headline: "Let's architect high-resolve growth engines to scale your revenue.",
        buttonText: "Get your performance audit",
        buttonLink: "/book"
      };
    }
    if (t.includes('relat') || t.includes('author')) {
      return {
        tagline: "Authority & PR",
        headline: "Let's construct sector-defining authority and earn absolute trust.",
        buttonText: "Build your authority",
        buttonLink: "/book"
      };
    }
  }

  // Route-based mapping
  if (cleanPath.startsWith('/creativity')) {
    return {
      tagline: "Creative Engineering",
      headline: "Let's build brand systems that command attention and drive conversion.",
      buttonText: "Start your design project",
      buttonLink: "/book"
    };
  }

  if (cleanPath.startsWith('/performance') || cleanPath.includes('seo') || cleanPath.includes('lead-generation') || cleanPath.includes('penalty-recovery')) {
    return {
      tagline: "Performance Marketing",
      headline: "Let's architect high-resolve growth engines to scale your revenue.",
      buttonText: "Get your performance audit",
      buttonLink: "/book"
    };
  }

  if (cleanPath.startsWith('/relations') || cleanPath.includes('authority')) {
    return {
      tagline: "Authority & PR",
      headline: "Let's construct sector-defining authority and earn absolute trust.",
      buttonText: "Build your authority",
      buttonLink: "/book"
    };
  }

  if (cleanPath.startsWith('/about')) {
    return {
      tagline: "Our Mission",
      headline: "Let's work together to redefine what's possible for your pipeline.",
      buttonText: "Meet our team",
      buttonLink: "/book"
    };
  }

  if (cleanPath.startsWith('/approach')) {
    return {
      tagline: "Bespoke Methodology",
      headline: "Let's deploy our zero-bloat pipeline engineering to scale your growth.",
      buttonText: "Start your audit",
      buttonLink: "/book"
    };
  }

  if (cleanPath.startsWith('/insights') || cleanPath.startsWith('/author')) {
    return {
      tagline: "Growth Intelligence",
      headline: "Let's build your custom growth playbook and outpace the competition.",
      buttonText: "Read our case studies",
      buttonLink: "/work"
    };
  }

  if (cleanPath.startsWith('/work')) {
    return {
      tagline: "Success Stories",
      headline: "Let's build your case study and achieve measurable results.",
      buttonText: "Start your audit",
      buttonLink: "/book"
    };
  }

  if (cleanPath === '/contact' || cleanPath === '/book' || cleanPath === '/book-call') {
    return {
      tagline: "Ready to start?",
      headline: "Let's start the conversation and map out your growth trajectory.",
      buttonText: "Send a message",
      buttonLink: "/contact"
    };
  }

  return defaultCTA;
};

const CTASection: React.FC<CTASectionProps> = ({ topic, path }) => {
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const config = getCTAConfig(path || currentPath, topic);

  return (
    <section className="glowing-cta py-32 relative overflow-hidden" id="cta" style={{ backgroundColor: '#111' }}>
      {/* WebGL liquid gradient shader background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-85">
        {/* @ts-ignore */}
        <Grainient
          color1="#635246"
          color2="#1a4738"
          color3="#564763"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>
      
      <div className="glowing-cta-inner relative z-10 max-w-full mx-auto px-6 lg:px-14 flex items-end justify-between gap-12 flex-wrap">
        <div>
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-[#E5E7EB]/60 mb-5 block">
            {config.tagline}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.05] max-w-3xl" style={{ letterSpacing: '-0.03em' }}>
            {config.headline}
          </h2>
        </div>
        <div className="shrink-0 pb-1">
          <a
            href={config.buttonLink}
            className="btn btn-primary !bg-white !text-black border-white hover:!bg-transparent hover:!text-white transition-all text-base inline-flex items-center whitespace-nowrap"
          >
            {config.buttonText}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-1.5 inline">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
