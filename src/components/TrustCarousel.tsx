import React from 'react';
import './TrustCarousel.css';

// Using a mix of icons and text to simulate logos
import { 
  Building2, 
  Briefcase, 
  Compass, 
  Globe2, 
  Landmark, 
  Layers, 
  Target 
} from 'lucide-react';

const LOGOS = [
  { icon: Building2, name: 'FORBES' },
  { icon: Globe2, name: 'WIRED' },
  { icon: Landmark, name: 'BLOOMBERG' },
  { icon: Briefcase, name: 'TECHCRUNCH' },
  { icon: Target, name: 'INC. 5000' },
  { icon: Compass, name: 'FASTCOMPANY' },
  { icon: Layers, name: 'WALL STREET JOURNAL' },
];

const TrustCarousel = () => {
  // Repeat logos to ensure the track is long enough to span wide screens
  let repeatedLogos = [...LOGOS];
  while (repeatedLogos.length < 15) {
    repeatedLogos = [...repeatedLogos, ...LOGOS];
  }

  const content = (
    <div className="trust-carousel-content flex items-center py-6 gap-16 md:gap-24 px-8 md:px-12">
      {repeatedLogos.map((Logo, idx) => (
        <div key={idx} className="flex items-center gap-3 text-gray-400 opacity-60 hover:opacity-100 hover:text-white transition-all duration-300 cursor-default grayscale hover:grayscale-0">
          <Logo.icon size={28} strokeWidth={1.5} />
          <span className="font-display font-bold text-xl md:text-2xl tracking-widest">{Logo.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full bg-[#0a0a0a] border-y border-white/5 py-4">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-2">Recognized & Trusted By</p>
        <div className="trust-carousel-container">
          {content}
          {content}
          {content}
        </div>
      </div>
    </div>
  );
};

export default TrustCarousel;
