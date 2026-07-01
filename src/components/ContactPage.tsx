import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ContactPage.css';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

gsap.registerPlugin(ScrollTrigger);

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const SERVICES = [
  'Algorithm Recovery & SEO Audit',
  'React Web Development',
  'Native CRM Integration',
  'SEO & Discoverability',
  'GEO / AI Search Optimization',
  'Blockchain & Web3',
  'General Inquiry',
];

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {


    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.classList.add('js');

    const ctx = gsap.context(() => {
      gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });

      const ease = 'power3.out';

      gsap.from('.contact-page .form-info', { opacity: 0, y: 30, duration: 0.8, ease, scrollTrigger: { trigger: '.contact-page .form-section', start: 'top 80%' } });
      gsap.from('.contact-page .form-wrap', { opacity: 0, y: 30, duration: 0.8, delay: 0.15, ease, scrollTrigger: { trigger: '.contact-page .form-section', start: 'top 80%' } });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' });
        window.location.href = '/thank-you';
      } else {
        throw new Error(data.error || 'Submission failed.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div id="page" ref={containerRef} className="contact-page min-h-screen flex flex-col">
      <SiteHeader />
      <div id="content" className="site-content" style={{ flexGrow: 0 }}>
        <main id="primary" className="site-main">

      {/* ── HERO ── */}
      <section id="top" style={{ background: '#ffffff', padding: 'clamp(7rem,15vw,13rem) 5vw 5rem', borderBottom: '1px solid #e5e7eb', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'end' }}>
          <div>
            <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', display: 'block', marginBottom: '1.5rem' }}>
              Gobiya / Contact
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, color: '#111827', maxWidth: '600px', marginBottom: '1.75rem' }}>
              Your Growth Plan, One Conversation Away
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: 1.75, marginBottom: '2.5rem' }}>
              We respond within one business day. For urgent matters, call us directly — a real person picks up.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="tel:3237441338" className="btn btn-primary">Call 323-744-1338</a>
              <a href="mailto:hello@gobiya.com" className="btn btn-ghost">hello@gobiya.com</a>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '1px solid #e5e7eb', paddingLeft: '5rem' }}>
            {[
              { label: 'Address', val: '3580 Wilshire Blvd, Ste 132\nLos Angeles, CA 90010' },
              { label: 'Phone', val: '323-744-1338' },
              { label: 'Email', val: 'hello@gobiya.com' },
              { label: 'Hours', val: 'Mon – Fri  9:00 AM – 5:00 PM\nSaturday  9:00 AM – 3:00 PM\nSunday  Closed' },
              { label: 'Response', val: '< 1 business day' },
            ].map(item => (
              <div key={item.label}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#9ca3af', display: 'block', marginBottom: '0.25rem' }}>{item.label}</span>
                <p style={{ fontSize: '0.95rem', color: '#374151', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{item.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM SECTION ── */}
      <section className="form-section">
        <div className="form-section-inner">

          {/* LEFT: info */}
          <div className="form-info">
            <div className="form-info-head">
              <span className="eyebrow">Send a message</span>
              <h2>Start the conversation</h2>
              <p>
                No pitch decks, no commitments — just a straight conversation about what's broken
                and what can be fixed. Every submission goes directly to Steve.
              </p>
            </div>

            <div className="form-info-links">
              <a href="tel:3237441338" className="form-info-link">
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/></svg>
                <div>
                  <strong>Call us directly</strong>
                  323-744-1338
                </div>
              </a>
              <a href="mailto:hello@gobiya.com" className="form-info-link">
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/></svg>
                <div>
                  <strong>Email us</strong>
                  hello@gobiya.com
                </div>
              </a>
              <a href="https://www.google.com/maps/search/3580+Wilshire+Blvd+Ste+132+Los+Angeles+CA+90010" target="_blank" rel="noopener noreferrer" className="form-info-link">
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/></svg>
                <div>
                  <strong>Visit us</strong>
                  3580 Wilshire Blvd, Ste 132, LA 90010
                </div>
              </a>
              <a href="/book" className="form-info-link">
                <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" fill="currentColor"/></svg>
                <div>
                  <strong>Book an audit call</strong>
                  15-minute forensic pipeline review
                </div>
              </a>
            </div>
          </div>

          {/* RIGHT: form */}
          <div className="form-wrap">
            {status === 'success' ? (
              <div className="form-success">
                <div className="success-icon">
                  <svg viewBox="0 0 24 24" fill="none" width="24" height="24"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h2>Message received.</h2>
                <p>
                  We'll be in touch within one business day. You can also reach us directly at{' '}
                  <a href="tel:3237441338">323-744-1338</a>.
                </p>
                <button className="btn-reset" onClick={() => setStatus('idle')}>Send another message</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>

                <div className="form-row">
                  <div className="field">
                    <label htmlFor="cf-name">Full name <span className="req">*</span></label>
                    <input id="cf-name" name="name" type="text" placeholder="Jane Smith" value={form.name} onChange={handleChange} required autoComplete="name" />
                  </div>
                  <div className="field">
                    <label htmlFor="cf-email">Email address <span className="req">*</span></label>
                    <input id="cf-email" name="email" type="email" placeholder="jane@company.com" value={form.email} onChange={handleChange} required autoComplete="email" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="field">
                    <label htmlFor="cf-phone">Phone number</label>
                    <input id="cf-phone" name="phone" type="tel" placeholder="323-000-0000" value={form.phone} onChange={handleChange} autoComplete="tel" />
                  </div>
                  <div className="field">
                    <label htmlFor="cf-company">Company / Website</label>
                    <input id="cf-company" name="company" type="text" placeholder="Acme Corp or acme.com" value={form.company} onChange={handleChange} autoComplete="organization" />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="cf-service">Service of interest</label>
                  <select id="cf-service" name="service" value={form.service} onChange={handleChange}>
                    <option value="">Select a service…</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="cf-message">Message</label>
                  <textarea id="cf-message" name="message" rows={5} placeholder="Describe your challenge, goal, or question…" value={form.message} onChange={handleChange} />
                </div>

                {status === 'error' && (
                  <div className="form-error">{errorMsg || 'Something went wrong. Please try again.'}</div>
                )}

                <div className="form-submit">
                  <button type="submit" className="form-submit-btn" disabled={status === 'submitting'} id="contact-submit-btn">
                    {status === 'submitting' ? <><span className="spinner" />Sending…</> : <>Send message <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></>}
                  </button>
                </div>

                <p className="form-note">We respond within 1 business day · Your information is never shared</p>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="cta-section">
        <div className="cta-inner">
          <div>
            <h3>Prefer a 15-minute call?</h3>
            <p>Book directly on our calendar — no back-and-forth.</p>
          </div>
          <a href="/book" className="btn btn-primary">Book an audit call</a>
        </div>
      </section>

      {/* ── MAP ── */}
      <section style={{ borderTop: '1px solid #e5e7eb' }}>
        <div style={{ padding: '3rem 5vw 1.5rem' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#9ca3af' }}>
            Find us — 3580 Wilshire Blvd, Ste 132, Los Angeles CA 90010
          </span>
        </div>
        <iframe
          src="https://maps.google.com/maps?q=3580+Wilshire+Blvd+Ste+132+Los+Angeles+CA+90010&output=embed&z=15"
          width="100%"
          height="520"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Gobiya office — 3580 Wilshire Blvd, Ste 132, Los Angeles CA 90010"
        />
      </section>
        </main>
      </div>

      <SiteFooter hideCTA={true} />
    </div>
  );
}
