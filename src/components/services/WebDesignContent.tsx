import React from 'react';
import ScrollRevealText from '../ScrollRevealText';
import Scrollytelling from '../Scrollytelling';

const WebDesignContent: React.FC = () => {
  return (
    <div className="bg-white">
      <ScrollRevealText 
        labelNumber="01"
        labelTitle="Performance Architecture"
        text="Slow websites kill conversions. We engineer custom React applications on the edge, delivering sub-second load times that drastically improve bounce rates and user engagement." 
      />

      <Scrollytelling 
        title="CONVERSION"
        subtitle="High-Speed User Interfaces"
        description="Every millisecond matters. Our component-driven frontend architecture is obsessively optimized for Core Web Vitals, ensuring your landing pages convert traffic into revenue."
      />
    </div>
  );
};

export default WebDesignContent;
