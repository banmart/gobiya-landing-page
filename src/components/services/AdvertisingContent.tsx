import React from 'react';
import ScrollRevealText from '../ScrollRevealText';
import Scrollytelling from '../Scrollytelling';

const AdvertisingContent: React.FC = () => {
  return (
    <div className="bg-white">
      <ScrollRevealText 
        labelNumber="01"
        labelTitle="Algorithmic Bidding"
        text="Stop wasting ad spend on vanity metrics. We deploy machine-learning bidding models that aggressively target high-LTV users, maximizing your Return on Ad Spend (ROAS)." 
      />

      <Scrollytelling 
        title="MULTIPLIER"
        subtitle="Data-Driven Ad Pipelines"
        description="We bypass broad match inefficiencies. By utilizing first-party data and precise custom audiences, we scale your paid media pipelines with absolute mathematical precision."
      />
    </div>
  );
};

export default AdvertisingContent;
