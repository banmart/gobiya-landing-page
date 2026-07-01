import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'gobiya-offer-nudge-dismissed';

export default function OfferNudge() {
  const [visible, setVisible] = useState(false);
  const shownRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const target = document.getElementById('services');
    if (!target) return;

    let ticking = false;
    const checkScroll = () => {
      ticking = false;
      if (shownRef.current) return;
      // Fires once the visitor has scrolled past the services/pricing section.
      if (target.getBoundingClientRect().bottom < 0) {
        shownRef.current = true;
        setVisible(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      setTimeout(checkScroll, 100);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    checkScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="offer-nudge"
      data-visible={visible}
      style={{
        position: 'fixed',
        right: '1.25rem',
        bottom: '1.25rem',
        zIndex: 60,
        maxWidth: '320px',
        background: '#111827',
        color: '#ffffff',
        borderRadius: '0.75rem',
        padding: '1rem 1.25rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'transform 0.35s ease, opacity 0.35s ease',
      }}
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss offer"
        style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          background: 'transparent',
          border: 'none',
          color: '#9ca3af',
          fontSize: '1rem',
          lineHeight: 1,
          cursor: 'pointer',
          padding: '0.25rem',
        }}
      >
        &#10005;
      </button>
      <p style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.35rem', paddingRight: '1.25rem' }}>
        Still deciding?
      </p>
      <p style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '0.75rem' }}>
        Take 15% off your first service when you book this week.
      </p>
      <a
        href="/contact"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#111827',
          background: '#d1f851',
          borderRadius: '9999px',
          padding: '0.5rem 1rem',
        }}
      >
        Claim 15% off
      </a>
    </div>
  );
}
