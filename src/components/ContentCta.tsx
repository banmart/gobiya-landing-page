import React from 'react';

let ctaStylesInjected = false;

interface ContentCtaProps {
  headline?: string;
  sub?: string;
  ctaText?: string;
  ctaHref?: string;
  phone?: string;
  phoneDisplay?: string;
  /** Accent used for the book button bg and call button border+text */
  accent?: string;
  background?: string;
  style?: React.CSSProperties;
}

export default function ContentCta({
  headline = 'Ready to build a pipeline that scales?',
  sub = 'Our team responds within one business day.',
  ctaText = 'Book a Strategy Call',
  ctaHref = '/book',
  phone = 'tel:+13237441338',
  phoneDisplay = '(323) 744-1338',
  accent = '#111827',
  background = '#f9fafb',
  style,
}: ContentCtaProps) {
  if (typeof document !== 'undefined' && !ctaStylesInjected) {
    ctaStylesInjected = true;
    const el = document.createElement('style');
    el.setAttribute('data-content-cta', '');
    el.textContent = `
      .ccta-call { display: none !important; }
      @media (max-width: 768px) {
        .ccta-inner { flex-direction: column !important; align-items: flex-start !important; gap: 1rem !important; }
        .ccta-call { display: inline-flex !important; }
        .ccta-actions { width: 100%; display: flex; flex-direction: column; gap: 0.6rem; }
        .ccta-book { width: 100% !important; justify-content: center !important; }
      }
    `;
    document.head.appendChild(el);
  }

  return (
    <div style={{ background, borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', ...style }}>
      <div
        className="ccta-inner"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2.25rem 5vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        <div>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', margin: '0 0 0.2rem', letterSpacing: '-0.01em' }}>
            {headline}
          </p>
          <p style={{ fontSize: '0.83rem', color: '#6b7280', margin: 0 }}>{sub}</p>
        </div>

        <div className="ccta-actions" style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexShrink: 0 }}>
          {/* Call button — hidden on desktop, visible on mobile */}
          <a
            href={phone}
            className="ccta-call"
            aria-label={`Call us at ${phoneDisplay}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.65rem 1.1rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              color: accent,
              background: 'transparent',
              border: `2px solid ${accent}`,
              borderRadius: '6px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 21.73 17z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {phoneDisplay}
          </a>

          {/* Book button — always visible */}
          <a
            href={ctaHref}
            className="ccta-book"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.65rem 1.35rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              color: '#ffffff',
              background: accent,
              border: `2px solid ${accent}`,
              borderRadius: '6px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {ctaText}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
