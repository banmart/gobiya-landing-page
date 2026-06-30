import React, { useState } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface HeroQuickFormProps {
  /** Identifies which page/hero the lead came from. Sent to the email as the form source. */
  source: string;
  /** Accent color for the submit button + focus rings. Defaults to Gobiya orange. */
  accent?: string;
  /** Visual variant. 'light' = dark text on a white card (for white heroes),
   *  'dark' = light text on a translucent card (for dark/image/WebGL heroes). */
  variant?: 'light' | 'dark';
  /** Optional heading shown above the fields. */
  heading?: string;
  /** Optional subheading / one-liner under the heading. */
  subheading?: string;
  /** Privacy policy link target. */
  privacyHref?: string;
  /** Terms link target. */
  termsHref?: string;
  /** Show the rotating client-logo strip at the bottom of the card. */
  showLogos?: boolean;
  /** Optional style overrides for the outer card. */
  style?: React.CSSProperties;
  /** Optional className for the outer card. */
  className?: string;
}

const CLIENT_LOGOS = [
  '/images/smilecenter.webp',
  '/images/americanlivescan.webp',
  '/images/remodelmepros-opt.webp',
  '/images/safetycentric-logo.png',
  '/images/totalcapital-opt.webp',
  '/images/quickpass-logo-opt.webp',
  '/images/logo-DeEgMiH0-opt.png',
  '/images/ark-logo---01-dark.webp',
  '/images/client-5.webp',
  '/images/medicine-metta-logo-1.webp',
  '/images/trusted-logo-home.webp',
];

let stylesInjected = false;

export default function HeroQuickForm({
  source,
  accent = '#F26522',
  variant = 'light',
  heading = 'Get a fast response',
  subheading = 'Send a few details and we’ll get back to you shortly.',
  privacyHref = '/privacy-policy',
  termsHref = '/terms',
  showLogos = true,
  style,
  className,
}: HeroQuickFormProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Inject focus/placeholder/marquee styles once (these can't be expressed inline).
  if (typeof document !== 'undefined' && !stylesInjected) {
    stylesInjected = true;
    const el = document.createElement('style');
    el.setAttribute('data-hero-quick-form', '');
    el.textContent = `
      .hqf-input::placeholder { opacity: 0.6; }
      .hqf-input:focus { outline: none; }
      .hqf-light .hqf-input:focus { border-color: var(--hqf-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hqf-accent) 18%, transparent); }
      .hqf-dark .hqf-input:focus { border-color: var(--hqf-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hqf-accent) 28%, transparent); }
      .hqf-submit:hover:not(:disabled) { filter: brightness(0.92); }
      .hqf-submit:disabled { opacity: 0.6; cursor: not-allowed; }
      .hqf-fineprint a { color: inherit; text-decoration: underline; text-underline-offset: 2px; }
      .hqf-fineprint a:hover { opacity: 0.8; }
      @keyframes hqf-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      .hqf-marquee-track { display: flex; width: max-content; align-items: center; animation: hqf-marquee 22s linear infinite; }
      .hqf-marquee-track:hover { animation-play-state: paused; }
      @media (max-width: 480px) {
        .hqf-card { padding: 1.2rem !important; }
      }
    `;
    document.head.appendChild(el);
  }

  const isDark = variant === 'dark';
  const textColor = isDark ? '#f3f4f6' : '#111827';
  const subColor = isDark ? '#9ca3af' : '#6b7280';
  const cardBg = isDark ? 'rgba(12,12,12,0.72)' : '#ffffff';
  const cardBorder = isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid #e5e7eb';
  const inputBg = isDark ? 'rgba(255,255,255,0.06)' : '#ffffff';
  const inputBorder = isDark ? '1px solid rgba(255,255,255,0.18)' : '1px solid #d1d5db';
  const inputColor = isDark ? '#f9fafb' : '#111827';
  const dividerColor = isDark ? 'rgba(255,255,255,0.1)' : '#f3f4f6';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setStatus('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          service: `Hero quick form — ${source}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(data.error || 'Submission failed.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    display: 'block',
    padding: '0.7rem 0.85rem',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    color: inputColor,
    background: inputBg,
    border: inputBorder,
    borderRadius: '8px',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
  };

  const cardStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '560px',
    background: cardBg,
    border: cardBorder,
    borderRadius: '14px',
    padding: '1.6rem',
    backdropFilter: isDark ? 'blur(10px)' : undefined,
    WebkitBackdropFilter: isDark ? 'blur(10px)' : undefined,
    boxShadow: isDark ? '0 20px 50px -20px rgba(0,0,0,0.6)' : '0 20px 50px -25px rgba(0,0,0,0.25)',
    boxSizing: 'border-box',
    ['--hqf-accent' as any]: accent,
    ...style,
  };

  const LogoStrip = () =>
    showLogos ? (
      <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: `1px solid ${dividerColor}`, overflow: 'hidden' }}>
        <p style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: subColor, margin: '0 0 0.75rem', textAlign: 'center' }}>
          Trusted by teams at
        </p>
        <div className="hqf-marquee-track">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              aria-hidden="true"
              style={{ height: '30px', width: 'auto', opacity: isDark ? 0.7 : 0.5, filter: 'grayscale(1)', flexShrink: 0, marginRight: '2.5rem' }}
            />
          ))}
        </div>
      </div>
    ) : null;

  return (
    <div className={`hqf-card ${isDark ? 'hqf-dark' : 'hqf-light'}${className ? ` ${className}` : ''}`} style={cardStyle}>
      {status === 'success' ? (
        <div style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }}>
          <div
            style={{
              width: '44px', height: '44px', borderRadius: '50%', margin: '0 auto 1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: accent, color: '#fff',
            }}
            aria-hidden="true"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: textColor, margin: '0 0 0.4rem' }}>Thanks — message sent</h3>
          <p style={{ fontSize: '0.85rem', color: subColor, lineHeight: 1.6, margin: 0 }}>
            We’ve received your details and will be in touch shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
          {heading && (
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, letterSpacing: '-0.01em', color: textColor, margin: '0 0 0.35rem' }}>
              {heading}
            </h3>
          )}
          {subheading && (
            <p style={{ fontSize: '0.82rem', color: subColor, lineHeight: 1.55, margin: '0 0 1.1rem' }}>
              {subheading}
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', width: '100%' }}>
            <input
              className="hqf-input" style={inputStyle}
              type="text" name="name" placeholder="Your name *"
              value={form.name} onChange={handleChange} required autoComplete="name"
            />
            <input
              className="hqf-input" style={inputStyle}
              type="email" name="email" placeholder="Email address *"
              value={form.email} onChange={handleChange} required autoComplete="email"
            />
            <input
              className="hqf-input" style={inputStyle}
              type="tel" name="phone" placeholder="Phone (optional)"
              value={form.phone} onChange={handleChange} autoComplete="tel"
            />
            <textarea
              className="hqf-input" style={{ ...inputStyle, resize: 'vertical', minHeight: '64px' }}
              name="message" placeholder="How can we help? (optional)" rows={2}
              value={form.message} onChange={handleChange}
            />
          </div>

          {status === 'error' && (
            <p style={{ fontSize: '0.78rem', color: '#ef4444', margin: '0.7rem 0 0' }}>{errorMsg}</p>
          )}

          <button
            type="submit" className="hqf-submit" disabled={status === 'submitting'}
            style={{
              width: '100%', marginTop: '1rem', padding: '0.8rem 1rem',
              fontSize: '0.9rem', fontWeight: 600, fontFamily: 'inherit',
              color: '#ffffff', background: isDark ? 'rgba(255,255,255,0.12)' : '#111827', border: isDark ? '1px solid rgba(255,255,255,0.2)' : 'none', borderRadius: '8px',
              cursor: 'pointer', transition: 'filter 0.15s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            }}
          >
            {status === 'submitting' ? 'Sending…' : 'Send request'}
            {status !== 'submitting' && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </button>

          <p className="hqf-fineprint" style={{ fontSize: '0.68rem', color: subColor, lineHeight: 1.5, textAlign: 'center', margin: '0.75rem 0 0' }}>
            By submitting, you agree to our <a href={privacyHref}>Privacy Policy</a> and{' '}
            <a href={termsHref}>Terms</a>. We’ll never share your details, and you can opt out anytime.
          </p>

          <LogoStrip />
        </form>
      )}
    </div>
  );
}
