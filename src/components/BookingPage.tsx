import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './BookingPage.css';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { supabase } from '../lib/supabase';
import { trackFormSubmit } from '../lib/analytics';

const BUDGET_OPTIONS = [
  { id: '3k-5k', label: '$3k – $5k / mo' },
  { id: '5k-10k', label: '$5k – $10k / mo' },
  { id: '10k-25k', label: '$10k – $25k / mo' },
  { id: '25k+', label: '$25k+ / mo' }
];

const TIMELINE_OPTIONS = [
  { id: 'immediate', label: 'Immediate (30 days)' },
  { id: '1-3m', label: '1 – 3 months' },
  { id: '3-6m', label: '3 – 6 months' },
  { id: 'exploratory', label: 'Exploratory' }
];

const SCOPE_OPTIONS = [
  { id: 'geo', label: 'GEO & AI Overview Optimization' },
  { id: 'seo_recovery', label: 'Google Core Update Recovery' },
  { id: 'outbound_pipeline', label: 'Sales & Outbound Automation' },
  { id: 'react_dev', label: 'Bespoke React / Next.js Development' }
];

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WEEKDAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const BookingPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [company, setCompany]     = useState('');
  const [website, setWebsite]     = useState('');

  const [step, setStep]         = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [currentDate, setCurrentDate]     = useState(new Date());
  const [selectedDate, setSelectedDate]   = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const [budget, setBudget]             = useState('');
  const [timeline, setTimeline]         = useState('');
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [challenges, setChallenges]     = useState('');

  useEffect(() => {
    document.title = 'Book a Forensic Audit Call — GOBIYA | Los Angeles';
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('email'))     setEmail(params.get('email')!);
    if (params.get('firstName')) setFirstName(params.get('firstName')!);
    if (params.get('lastName'))  setLastName(params.get('lastName')!);
    if (params.get('company'))   setCompany(params.get('company')!);
    if (params.get('website'))   setWebsite(params.get('website')!);
    if (params.get('email') && (params.get('utm_source') === 'prospector' || params.get('source') === 'email')) {
      fetch('/api/prospector/track-click', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: params.get('email') }) }).catch(() => {});
    }
  }, []);

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    const prev  = new Date(year, month - 1, 1);
    const today = new Date();
    if (prev.getFullYear() < today.getFullYear() || (prev.getFullYear() === today.getFullYear() && prev.getMonth() < today.getMonth())) return;
    setCurrentDate(prev);
  };
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const isDaySelectable = (d: number) => {
    const dateObj = new Date(year, month, d);
    const today   = new Date(); today.setHours(0,0,0,0);
    return dateObj >= today && dateObj.getDay() !== 0 && dateObj.getDay() !== 6;
  };

  const handleDateSelect = (d: number) => { setSelectedDate(new Date(year, month, d)); setSelectedTimeSlot(null); };

  const handleScopeToggle = (id: string) => setSelectedScopes(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTimeSlot || !email || !firstName || !lastName) {
      setErrorMsg('Please complete all required fields.'); return;
    }
    setSubmitting(true); setErrorMsg('');
    try {
      const { data: leadData, error: leadError } = await supabase.from('leads').insert({ first_name: firstName, last_name: lastName, email, company, website, source_page: 'booking_flow' }).select();
      if (leadError) throw leadError;
      const leadId = leadData?.[0]?.id || null;

      const [time, period] = selectedTimeSlot.split(' ');
      const [hoursStr, minutesStr] = time.split(':');
      let hours = parseInt(hoursStr);
      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      const bookingDateTime = new Date(selectedDate);
      bookingDateTime.setHours(hours, parseInt(minutesStr), 0, 0);

      const scopesParam = selectedScopes.map(s => SCOPE_OPTIONS.find(o => o.id === s)?.label || s).join(', ');

      const { error: bookingError } = await supabase.from('bookings').insert({
        lead_id: leadId, email,
        date_time: bookingDateTime.toISOString(),
        budget: BUDGET_OPTIONS.find(o => o.id === budget)?.label || budget || 'Not specified',
        timeline: TIMELINE_OPTIONS.find(o => o.id === timeline)?.label || timeline || 'Not specified',
        challenges: `[Capabilities: ${scopesParam || 'None'}] -- ${challenges || 'None'}`,
        status: 'Call booked'
      });
      if (bookingError) throw bookingError;

      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `${firstName} ${lastName}`,
            email,
            company,
            phone: '',
            website,
            service: 'Booking Request',
            message: `[Call Scheduled: ${selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} @ ${selectedTimeSlot} PT] Budget: ${BUDGET_OPTIONS.find(o => o.id === budget)?.label || budget}, Timeline: ${TIMELINE_OPTIONS.find(o => o.id === timeline)?.label || timeline}, Scopes: ${scopesParam}. Challenges: ${challenges || 'None'}`
          })
        });
      } catch (err) {
        console.error('Failed to notify backend of booking:', err);
      }

      trackFormSubmit({ form_name: 'discovery_call_booking', has_domain: !!website, booking_date: bookingDateTime.toISOString(), budget, timeline, scopes: scopesParam });
      window.location.href = '/thank-you';
    } catch (err: any) {
      setErrorMsg(err.message || 'There was an issue saving your booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Build calendar day elements
  const getDayElements = () => {
    const days = [];
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push(<div key={`prev-${i}`} className="cal-day prev-month">{prevMonthDays - i}</div>);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const sel = selectedDate && selectedDate.getDate() === d && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
      const selectable = isDaySelectable(d);
      days.push(
        <button key={`d-${d}`} type="button" disabled={!selectable}
          onClick={() => handleDateSelect(d)}
          className={`cal-day ${selectable ? 'selectable' : 'disabled'} ${sel ? 'selected' : ''}`}>
          {d}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="booking-page">
      <SiteHeader />

      {step !== 3 ? (
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-inner">

            {/* LEFT: copy */}
            <div className="hero-copy">
              <nav className="breadcrumb">
                <a href="/">GOBIYA</a>
                <i>›</i>
                <span>Book a call</span>
              </nav>

              <h1>
                <span className="line"><span>Schedule your</span></span>
                <span className="line"><span>forensic</span></span>
                <span className="line"><span className="accent">pipeline audit.</span></span>
              </h1>

              <p className="hero-sub">
                A live 1-on-1 strategy call with Steve Martin — CEO & Lead Engineer. We examine your entity mapping, diagnose search drop triggers, and lay out a concrete technical roadmap.
              </p>

              <div className="steve-card">
                <img src="/images/steve-portrait.webp" alt="Steve Martin — CEO, GOBIYA" />
                <div>
                  <h3>Steve Martin</h3>
                  <p className="role">CEO & Lead Growth Engineer</p>
                  <p>25+ years bridging full-stack development and high-stakes organic search recovery.</p>
                </div>
              </div>

              <div className="session-specs">
                <div className="spec-row">
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <div>
                    <strong>Screen-share video meeting</strong>
                    Google Meet — link sent in calendar invite
                  </div>
                </div>
                <div className="spec-row">
                  <svg viewBox="0 0 24 24" fill="none" width="16" height="16"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  <div>
                    <strong>15–30 minute strategy session</strong>
                    Actionable takeaways — no sales deck, just engineering insights
                  </div>
                </div>
              </div>

              <div className="availability">
                <span className="dot" aria-hidden="true" />
                Accepting qualified pipeline opportunities · CA / US
              </div>
            </div>

            {/* RIGHT: booking widget */}
            <div className="hero-widget">
              <div className="widget">
                <div className="widget-head">
                  <span>audit-booking.log</span>
                  <span className="step-tag">Step {step} of 2</span>
                </div>

                <div className="widget-body">
                  {errorMsg && (
                    <div className="error-banner">
                      <svg viewBox="0 0 24 24" fill="none" width="14" height="14"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      {errorMsg}
                    </div>
                  )}

                  {step === 1 ? (
                    /* ── STEP 1: Calendar ── */
                    <div>
                      <div className="cal-nav">
                        <span className="cal-month">{MONTHS[month]} {year}</span>
                        <div className="cal-nav-btns">
                          <button type="button" className="cal-btn" onClick={handlePrevMonth} aria-label="Previous month">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </button>
                          <button type="button" className="cal-btn" onClick={handleNextMonth} aria-label="Next month">
                            <svg viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </button>
                        </div>
                      </div>

                      <div className="cal-weekdays">
                        {WEEKDAYS.map(w => <span key={w}>{w}</span>)}
                      </div>
                      <div className="cal-grid">{getDayElements()}</div>

                      {selectedDate && (
                        <div className="time-section">
                          <p className="time-label">Available slots — {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                          <div className="time-grid">
                            {TIME_SLOTS.map(t => (
                              <button key={t} type="button" className={`time-slot ${selectedTimeSlot === t ? 'selected' : ''}`} onClick={() => setSelectedTimeSlot(t)}>{t}</button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="book-actions" style={{ marginTop: '1.4rem' }}>
                        <button type="button" className="btn-continue" disabled={!selectedDate || !selectedTimeSlot} onClick={() => setStep(2)} style={{ flex: 1 }}>
                          Continue
                          <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ── STEP 2: Qualification form ── */
                    <form onSubmit={handleBookingSubmit} className="book-form">
                      <div className="slot-summary">
                        <span className="slot-val">
                          {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · {selectedTimeSlot} PT
                        </span>
                        <button type="button" onClick={() => { setStep(1); setSelectedTimeSlot(null); }}>Change</button>
                      </div>

                      <div className="book-row">
                        <div className="book-field">
                          <label htmlFor="bk-first">First name *</label>
                          <input id="bk-first" type="text" required value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Jane" />
                        </div>
                        <div className="book-field">
                          <label htmlFor="bk-last">Last name *</label>
                          <input id="bk-last" type="text" required value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Smith" />
                        </div>
                      </div>

                      <div className="book-field">
                        <label htmlFor="bk-email">Work email *</label>
                        <input id="bk-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@company.com" />
                      </div>

                      <div className="book-row">
                        <div className="book-field">
                          <label htmlFor="bk-company">Company</label>
                          <input id="bk-company" type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="Acme Corp" />
                        </div>
                        <div className="book-field">
                          <label htmlFor="bk-website">Website domain</label>
                          <input id="bk-website" type="text" value={website} onChange={e => setWebsite(e.target.value)} placeholder="acme.com" />
                        </div>
                      </div>

                      <div>
                        <p className="opt-label">Monthly marketing budget</p>
                        <div className="opt-grid-2">
                          {BUDGET_OPTIONS.map(o => (
                            <button key={o.id} type="button" className={`opt-chip ${budget === o.id ? 'active' : ''}`} onClick={() => setBudget(o.id)}>{o.label}</button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="opt-label">Engagement timeline</p>
                        <div className="opt-grid-2">
                          {TIMELINE_OPTIONS.map(o => (
                            <button key={o.id} type="button" className={`opt-chip ${timeline === o.id ? 'active' : ''}`} onClick={() => setTimeline(o.id)}>{o.label}</button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="opt-label">Focus areas</p>
                        <div className="opt-grid-1">
                          {SCOPE_OPTIONS.map(o => (
                            <button key={o.id} type="button" className={`scope-chip ${selectedScopes.includes(o.id) ? 'active' : ''}`} onClick={() => handleScopeToggle(o.id)}>
                              <span>{o.label}</span>
                              <span className="scope-check">
                                {selectedScopes.includes(o.id) && <svg viewBox="0 0 24 24" fill="none" width="9" height="9"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="book-field">
                        <label htmlFor="bk-challenges">Core bottlenecks / objectives</label>
                        <textarea id="bk-challenges" rows={3} value={challenges} onChange={e => setChallenges(e.target.value)} placeholder="E.g., Hit by Google March update, lost 40% organic reach, need forensic recovery audit." />
                      </div>

                      <div className="book-actions">
                        <button type="button" className="btn-back" onClick={() => setStep(1)}>
                          <svg viewBox="0 0 24 24" fill="none" width="13" height="13"><path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          Back
                        </button>
                        <button type="submit" className="btn-submit" disabled={submitting}>
                          {submitting ? <><span className="bk-spinner" />Scheduling…</> : <>Book strategy call<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></>}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <div className="widget-foot">
                  <span>gobiya.com · Los Angeles</span>
                  <span>Pacific Time · Mon–Fri</span>
                </div>
              </div>
            </div>

          </div>
        </section>
      ) : (
        /* ── STEP 3: Success ── */
        <section style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
          <div className="success-screen">
            <div className="success-copy">
              <div className="success-icon">
                <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '.8rem' }}>Booking confirmed</p>
                <h1>Your session is locked in.</h1>
              </div>
              <p>
                A Google Calendar invitation with video meeting details has been sent to <strong>{email}</strong>. Steve will join you to review your audit scope.
              </p>
              <div className="success-actions">
                <a href="/" className="btn btn-primary">Return to homepage</a>
                <a href="/insights" className="btn btn-ghost">Read latest insights</a>
              </div>
            </div>

            <div className="success-detail">
              <div className="success-detail-head">booking-confirmation.log</div>
              <div className="success-detail-body">
                <div className="detail-row">
                  <span className="detail-key">Date</span>
                  <span className="detail-val">{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Time</span>
                  <span className="detail-val">{selectedTimeSlot} Pacific Time</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Format</span>
                  <span className="detail-val">Google Meet — screen-share video</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Duration</span>
                  <span className="detail-val">15 – 30 minutes</span>
                </div>
                <div className="detail-row">
                  <span className="detail-key">Invite sent</span>
                  <span className="detail-val">{email}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
};

export default BookingPage;
