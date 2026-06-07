import React, { useState, useEffect } from 'react';

const START_DATE = new Date('2024-01-01T00:00:00Z').getTime();
const BASE_REVENUE = 1345231.45;
const REVENUE_PER_SECOND = 4.12; // Modifiable rate

const LiveRevenueCounter = () => {
  const [revenue, setRevenue] = useState(BASE_REVENUE);

  useEffect(() => {
    let animationFrameId: number;

    const updateCounter = () => {
      const now = Date.now();
      const secondsElapsed = (now - START_DATE) / 1000;
      setRevenue(BASE_REVENUE + secondsElapsed * REVENUE_PER_SECOND);
      animationFrameId = requestAnimationFrame(updateCounter);
    };

    animationFrameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const formattedRevenue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(revenue);

  return (
    <div className="flex items-center gap-3 mb-4 sm:mb-6">
      <div className="relative flex items-center justify-center w-2 h-2">
        <div className="absolute w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
        <div className="relative w-1.5 h-1.5 bg-green-500 rounded-full"></div>
      </div>
      <p className="text-[13px] sm:text-[14px] text-[#F26522] tracking-[0.1em] uppercase font-bold font-mono">
        Total Client Revenue: <span className="text-white ml-1">{formattedRevenue}</span>
      </p>
    </div>
  );
};

export default LiveRevenueCounter;
