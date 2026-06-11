import React from 'react';
import { FileText, Target, MessageSquare, TrendingUp } from 'lucide-react';

const WhatYouGet = () => {
  const features = [
    {
      icon: <FileText className="w-6 h-6 text-[#F26522]" />,
      title: "Custom Local SEO Blueprint",
      description: "A tailored plan built around your local business, market, and growth goals."
    },
    {
      icon: <Target className="w-6 h-6 text-[#F26522]" />,
      title: "Competitor Analysis",
      description: "Find out exactly why your competitors are outranking you — and how to fix it fast."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#F26522]" />,
      title: "Q&A With An Expert",
      description: "Real answers to your toughest marketing questions. Zero agency fluff or jargon."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#F26522]" />,
      title: "Action Plan To 10X Leads",
      description: "Concrete steps you can start using today to grow your organic traffic and lead flow."
    }
  ];

  return (
    <section className="relative w-full border-t border-white/5 bg-[#0a0c10] py-16 sm:py-24">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <h3 className="text-[12px] sm:text-[14px] text-gray-500 uppercase tracking-[0.15em] font-bold text-center mb-12 sm:mb-16">
          What You'll Get On The Free Call
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center sm:items-start text-center sm:text-left group">
              <div className="w-14 h-14 bg-[#F26522]/10 border border-[#F26522]/20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-2 group-hover:bg-[#F26522]/20">
                {feature.icon}
              </div>
              <h4 className="text-[18px] sm:text-[20px] font-bold text-white mb-3 tracking-tight">
                {feature.title}
              </h4>
              <p className="text-[14px] sm:text-[16px] text-gray-400 leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
