import React from 'react';
import ScrollRevealText from '../ScrollRevealText';
import Scrollytelling from '../Scrollytelling';

const LeadGenContent: React.FC = () => {
  return (
    <div className="bg-white">
      <ScrollRevealText 
        labelNumber="01"
        labelTitle="The Pipeline Architecture"
        text="Hope is not a sales strategy. We build deterministic, data-driven B2B pipelines that automatically capture high-intent leads and scale your enterprise contract value." 
      />

      <Scrollytelling 
        title="PIPELINE"
        subtitle="Automated Sales Engineering"
        description="We replace manual prospecting with automated outbound protocols. Using AI-driven account targeting, we guarantee predictable revenue velocity."
      />
    </div>
  );
};

export default LeadGenContent;
