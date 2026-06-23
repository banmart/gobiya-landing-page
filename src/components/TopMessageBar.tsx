import React, { useState, useEffect } from 'react';
import './TopMessageBar.css';

const AI_PLATFORMS = ['ChatGPT', 'Claude', 'Gemini', 'Perplexity'];

const TopMessageBar: React.FC = () => {
  const [show, setShow] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dismissed = localStorage.getItem('gobiya_top_banner_dismissed');
    if (dismissed) {
      setShow(false);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % AI_PLATFORMS.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      localStorage.setItem('gobiya_top_banner_dismissed', 'true');
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="top-message-bar">
      <a href="/book" className="top-message-link">
        <div className="top-message-content">
          Get found on all of the major AI platforms like{' '}
          <span className="rotating-text-wrapper">
            ({AI_PLATFORMS[currentIndex]})
          </span>
        </div>
      </a>
      <button 
        type="button" 
        className="top-message-close" 
        onClick={handleClose}
        aria-label="Close message bar"
      >
        <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

export default TopMessageBar;
