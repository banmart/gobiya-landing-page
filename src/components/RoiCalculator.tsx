import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const RoiCalculator = () => {
  const [trafficLoss, setTrafficLoss] = useState(15000);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const formatted = useTransform(rounded, (latest) => `$${latest.toLocaleString()}`);

  useEffect(() => {
    // Math: Traffic * 2.5% conversion * $500 LTV
    const conversionRate = 0.025;
    const ltv = 500;
    const target = trafficLoss * conversionRate * ltv;
    
    const controls = animate(count, target, { duration: 0.6, ease: "easeOut" });
    return () => controls.stop();
  }, [trafficLoss, count]);

  return (
    <section className="w-full bg-[#0a0a0a] py-24 sm:py-32 px-5 sm:px-8 lg:px-12 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-display font-medium text-white leading-[1.1] mb-4">
          Calculate Your Revenue Leak
        </h2>
        <p className="text-gray-400 text-lg font-body mb-16 max-w-2xl mx-auto">
          Use the slider to input the monthly traffic your site lost during the latest Google algorithm update. See the pipeline revenue we can help you recover.
        </p>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative text-left">
          
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <label className="text-white font-medium text-lg">Monthly Traffic Lost</label>
              <span className="text-[#F26522] font-display font-bold text-2xl">{trafficLoss.toLocaleString()}</span>
            </div>
            
            <input 
              type="range" 
              min="1000" 
              max="100000" 
              step="1000"
              value={trafficLoss}
              onChange={(e) => setTrafficLoss(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#F26522]"
              style={{
                background: `linear-gradient(to right, #F26522 0%, #F26522 ${(trafficLoss - 1000) / (100000 - 1000) * 100}%, #1f2937 ${(trafficLoss - 1000) / (100000 - 1000) * 100}%, #1f2937 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-3 font-body">
              <span>1k</span>
              <span>100k+</span>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold mb-4">Potential Recovered Value</p>
            <motion.div className="text-[clamp(3.5rem,8vw,6rem)] font-display font-bold text-white leading-none tracking-tighter">
              {formatted}
            </motion.div>
            <p className="text-gray-500 text-sm mt-6 font-body">*Based on an average 2.5% conversion rate and $500 Lifetime Value.</p>
          </div>

          {/* Button */}
          <div className="mt-10 text-center">
            <button className="bg-[#F26522] hover:bg-[#e05a1a] text-white px-8 py-4 rounded-none font-medium transition-colors w-full sm:w-auto font-body uppercase tracking-wider text-sm">
              Start Your Recovery Audit
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RoiCalculator;
