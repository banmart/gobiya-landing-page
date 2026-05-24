import React from 'react';
import './Marquee.css';

interface MarqueeProps {
  items: string[];
  backgroundColor?: string;
  textColor?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ 
  items, 
  backgroundColor = '#111111', 
  textColor = '#ffffff' 
}) => {
  // We duplicate the items to ensure seamless scrolling
  const content = (
    <div className="marquee-content flex items-center py-4">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold uppercase tracking-wider mx-8 whitespace-nowrap" style={{ color: textColor }}>
            {item}
          </span>
          {/* Delimiter */}
          <span className="text-[#F26522] mx-8 text-2xl font-black">✦</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="marquee-container border-y border-gray-200/20" style={{ backgroundColor }}>
      {content}
      {content}
    </div>
  );
};

export default Marquee;
