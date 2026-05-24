import React from 'react';
import ScrollRevealText from '../ScrollRevealText';
import Scrollytelling from '../Scrollytelling';

const GeoOptimizationContent: React.FC = () => {
  return (
    <div className="bg-white">
      <ScrollRevealText 
        labelNumber="01"
        labelTitle="Generative Engine Optimization"
        text="The search landscape has shifted. We inject your brand entities directly into the training data pathways of ChatGPT, Claude, and Google AI Overviews." 
      />

      <Scrollytelling 
        title="CITATIONS"
        subtitle="AI Model Alignment"
        description="By structuring your data natively for Large Language Models, we ensure your brand is not just indexed, but actively recommended as the default solution by AI assistants."
      />
    </div>
  );
};

export default GeoOptimizationContent;
