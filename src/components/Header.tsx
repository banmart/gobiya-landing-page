import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import StaggeredMenu from './StaggeredMenu';

interface HeaderProps {
  // Option to use the dark theme for the nav (transparent with white menu icon and inverted logo)
  theme?: 'light' | 'dark';
  hideLogo?: boolean;
}

const Header: React.FC<HeaderProps> = ({ theme = 'light', hideLogo = false }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        timeZone: 'America/Los_Angeles', 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className="fixed top-0 left-0 z-50 w-full">
      <nav className={`flex items-center justify-between backdrop-blur-md border-b p-[5px] sm:px-4 ${
        isDark ? 'bg-white/5 border-white/10' : 'bg-white/30 border-white/40'
      }`}>
        <div className={`flex items-center gap-6 relative z-50 transition-opacity duration-300 ${hideLogo ? 'opacity-0 pointer-events-none' : ''}`}>
          <a href="/">
            <img 
              src="/images/gobiya---logo.webp" 
              alt="Gobiya Logo" 
              className={`h-8 sm:h-9 w-auto object-contain ${isDark ? 'filter brightness-0 invert' : ''}`}
            />
          </a>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 ml-auto">
          {/* Time indicator - hide on mobile, only show in light theme, or if dark theme is allowed we can adjust text color */}
          <div className="hidden md:flex items-center gap-2">
            <Clock className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-gray-900'}`} />
            <span className={`text-[13px] font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {time} in Los Angeles
            </span>
          </div>
          
          {/* CTA Button */}
          <a 
            href="/contact" 
            className={`hidden sm:flex group items-center text-white pl-5 pr-2 py-2 ${
              isDark ? 'bg-[#F26522]' : 'bg-gray-900'
            }`}
          >
            <div className="flex flex-col overflow-hidden h-[20px] justify-start items-start relative mr-3">
              <span className="text-[13px] font-medium leading-[20px] transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Book a strategy call</span>
              <span className="text-[13px] font-medium leading-[20px] absolute top-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-full">Book a strategy call</span>
            </div>
            <div className="w-6 h-6 bg-white flex items-center justify-center">
              <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 ${
                isDark ? 'text-[#F26522]' : 'text-gray-900'
              }`} />
            </div>
          </a>
          
          {/* Menu */}
          <div className="flex items-center justify-center px-2">
            <StaggeredMenu 
              isFixed={true}
              colors={['#111111', '#F26522']}
              menuButtonColor={isDark ? '#fff' : '#111'}
              openMenuButtonColor="#111"
              accentColor="#F26522"
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
