import React from 'react';
import ScrollRevealText from '../ScrollRevealText';
import Scrollytelling from '../Scrollytelling';

const SeoContent: React.FC = () => {
  return (
    <div className="bg-white">
      {/* 1. Core Philosophy */}
      <ScrollRevealText 
        labelNumber="01"
        labelTitle="Core Philosophy"
        text="Search algorithms run on pure math, not magic. We reverse engineer Google's core updates to rebuild your site's entity signals and topical authority from the ground up." 
      />

      {/* 2. Visual Methodology via Scrollytelling */}
      {/* We reuse the generic Scrollytelling, but override the text with SEO-specific copy */}
      <Scrollytelling 
        title="DOMINANCE"
        subtitle="Algorithmic Search Mastery"
        description="We don't chase rankings; we engineer them. By feeding AI search bots the exact semantic relationships they require, we cement your brand as the undeniable authority in your niche."
      />
      
    </div>
  );
};

export default SeoContent;
