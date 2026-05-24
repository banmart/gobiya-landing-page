import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, TrendingUp, Search, Network } from 'lucide-react';
import BorderGlow from './BorderGlow';

const ServicesBento = () => {
  return (
    <section className="w-full bg-[#111] py-24 sm:py-32 px-5 sm:px-8 lg:px-12 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-display font-medium text-white leading-[1.1] mb-6">
              Forensic analysis meets<br/>pipeline architecture.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-body">
              We do not provide reports. We architect proprietary growth assets that command sector respect and generate predictable B2B revenue.
            </p>
          </div>
          <p className="text-[14px] text-[#F26522] uppercase tracking-widest font-bold font-body">
            [ Core Capabilities ]
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[340px]">
          
          {/* Card 1: Penalty Recovery (Spans 2 columns on desktop) */}
          <a href="/google-penalty-recovery" className="md:col-span-2 block h-full">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full h-full cursor-pointer"
            >
              <BorderGlow
                backgroundColor="#1a1c23"
                glowColor="23 90 54"
                colors={['#F26522', '#ff9a66', '#8c350d']}
                className="w-full h-full rounded-2xl relative overflow-hidden group border-none"
                borderRadius={16}
              >
                <div className="p-8 sm:p-12 w-full h-full relative z-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#F26522] opacity-10 rounded-full blur-[80px] group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
                  <ShieldAlert size={40} className="text-[#F26522] mb-6 sm:mb-10" strokeWidth={1.5} />
                  <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-4">Penalty Recovery</h3>
                  <p className="text-gray-400 font-body text-base max-w-md">
                    Expert removal of manual actions and rapid recovery from Google HCU / Core Updates. We diagnose and repair algorithmic suppression to restore search dominance.
                  </p>
                </div>
              </BorderGlow>
            </motion.div>
          </a>

          {/* Card 2: B2B Pipeline */}
          <a href="/services/lead-generation" className="md:col-span-1 block h-full">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full h-full cursor-pointer"
            >
              <BorderGlow
                backgroundColor="#1a1c23"
                glowColor="23 90 54"
                colors={['#F26522', '#ff9a66', '#8c350d']}
                className="w-full h-full rounded-2xl relative overflow-hidden group border-none"
                borderRadius={16}
              >
                <div className="p-8 sm:p-12 w-full h-full relative z-10">
                  <Network size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />
                  <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-4">Pipeline Architecture</h3>
                  <p className="text-gray-400 font-body text-base">
                    Automated outbound sales systems and high-resolve B2B prospecting built for scale.
                  </p>
                </div>
              </BorderGlow>
            </motion.div>
          </a>

          {/* Card 3: Local SEO */}
          <a href="/services/seo" className="md:col-span-1 block h-full">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full h-full cursor-pointer"
            >
              <BorderGlow
                backgroundColor="#1a1c23"
                glowColor="23 90 54"
                colors={['#F26522', '#ff9a66', '#8c350d']}
                className="w-full h-full rounded-2xl relative overflow-hidden group border-none"
                borderRadius={16}
              >
                <div className="p-8 sm:p-12 w-full h-full relative z-10">
                  <Search size={40} className="text-white mb-6 sm:mb-10" strokeWidth={1.5} />
                  <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-4">Market Vector SEO</h3>
                  <p className="text-gray-400 font-body text-base">
                    Hyper-local authority domination and signal optimization across Greater Los Angeles.
                  </p>
                </div>
              </BorderGlow>
            </motion.div>
          </a>

          {/* Card 4: GEO & LLM Optimization (Spans 2 cols) */}
          <a href="/services/geo-optimization" className="md:col-span-2 block h-full">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="w-full h-full bg-gradient-to-br from-[#F26522] to-[#c74c15] rounded-2xl p-8 sm:p-12 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 bg-[url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85')] bg-cover bg-center mix-blend-overlay opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-700"></div>
              <TrendingUp size={40} className="text-white mb-6 sm:mb-10 relative z-10" strokeWidth={1.5} />
              <h3 className="text-2xl sm:text-3xl font-display font-medium text-white mb-4 relative z-10">Generative Engine Optimization</h3>
              <p className="text-white/90 font-body text-base max-w-lg relative z-10">
                Engineering brand signals and entity authority so your business is natively recommended by AI models like ChatGPT, Gemini, and Perplexity.
              </p>
            </motion.div>
          </a>

        </div>
      </div>
    </section>
  );
};

export default ServicesBento;
