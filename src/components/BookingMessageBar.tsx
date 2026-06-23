import React, { useState, useEffect } from 'react';
import './BookingMessageBar.css';

interface BookingMessageBarProps {
  currentPath: string;
}

const BookingMessageBar: React.FC<BookingMessageBarProps> = ({ currentPath }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dismissed = localStorage.getItem('gobiya_booking_banner_dismissed');
    const path = currentPath.toLowerCase().replace(/\/$/, '') || '/';
    // Don't display on booking flow, success page, or admin dashboard
    const hideOnRoutes = ['/book', '/book-call', '/thank-you', '/admin'];
    const shouldHide = hideOnRoutes.includes(path);

    if (!dismissed && !shouldHide) {
      // Premium delayed enter animation
      const timer = setTimeout(() => {
        setShow(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [currentPath]);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      localStorage.setItem('gobiya_booking_banner_dismissed', 'true');
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="booking-message-bar">
      <div className="booking-message-inner">
        <div className="booking-message-content">
          <div className="booking-message-content-inner">
            <div className="booking-message-avatar-wrapper">
              <img 
                src="/images/steve-portrait.webp" 
                alt="Steve Martin" 
                className="booking-message-avatar" 
              />
              <span className="booking-message-avatar-pulse" />
            </div>
            <div className="booking-message-text-group">
              <p className="booking-message-text">
                First time here? Book a private B2B SEO &amp; pipeline forecasting strategy session with Steve Martin.
              </p>
            </div>
          </div>
        </div>
        <div className="booking-message-actions">
          <a href="/book" className="booking-message-cta">
            Book Strategy Call
            <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <button 
            type="button" 
            className="booking-message-close" 
            onClick={handleClose}
            aria-label="Close message bar"
          >
            <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingMessageBar;
