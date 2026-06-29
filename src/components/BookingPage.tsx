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
  const [phone, setPhone]         = useState('');

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
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.classList.add('js');
    gsap.to(document.body, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    
    const ease = 'power3.out';
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.15, defaults: { ease, duration: 1.15 } });
      heroTl
        .from('[data-hero="1"]', { opacity: 0, y: 14 }, 0)
        .from('[data-hero="2"]', { opacity: 0, y: 16 }, 0.3)
        .from('[data-hero="3"]', { opacity: 0, y: 14 }, 0.5)
        .from('[data-hero="4"]', { opacity: 0, y: 20 }, 0.4);
    });

    if (typeof window === 'undefined') return () => ctx.revert();
    const params = new URLSearchParams(window.location.search);
    if (params.get('email'))     setEmail(params.get('email')!);
    if (params.get('firstName')) setFirstName(params.get('firstName')!);
    if (params.get('lastName'))  setLastName(params.get('lastName')!);
    if (params.get('company'))   setCompany(params.get('company')!);
    if (params.get('website'))   setWebsite(params.get('website')!);
    if (params.get('email') && (params.get('utm_source') === 'prospector' || params.get('source') === 'email')) {
      fetch('/api/prospector/track-click', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: params.get('email') }) }).catch(() => {});
    }

    return () => ctx.revert();
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

  const handleDateSelect = (d: number) => { 
    setSelectedDate(new Date(year, month, d)); 
    setSelectedTimeSlot(null); 
  };

  const handleScopeToggle = (id: string) => setSelectedScopes(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const handleBookingSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedDate || !selectedTimeSlot || !email || !firstName || !lastName || !website || !budget) {
      setErrorMsg('Please complete all required fields.'); 
      return;
    }
    setSubmitting(true); 
    setErrorMsg('');
    try {
      const { data: leadData, error: leadError } = await supabase.from('leads').insert({ 
        first_name: firstName, 
        last_name: lastName, 
        email, 
        company, 
        website, 
        source_page: 'booking_flow' 
      }).select();
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
        challenges: `[Phone: ${phone}] [Capabilities: ${scopesParam || 'None'}] -- ${challenges || 'None'}`,
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
            phone: phone,
            website,
            service: 'Booking Request',
            message: `[Call Scheduled: ${selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} @ ${selectedTimeSlot} PT] Budget: ${BUDGET_OPTIONS.find(o => o.id === budget)?.label || budget}, Phone: ${phone}, Timeline: ${TIMELINE_OPTIONS.find(o => o.id === timeline)?.label || timeline}, Scopes: ${scopesParam}. Challenges: ${challenges || 'None'}`
          })
        });
      } catch (err) {
        console.error('Failed to notify backend of booking:', err);
      }

      trackFormSubmit({ 
        form_name: 'discovery_call_booking', 
        has_domain: !!website, 
        booking_date: bookingDateTime.toISOString(), 
        budget, 
        timeline, 
        scopes: scopesParam 
      });
      window.location.href = '/thank-you';
    } catch (err: any) {
      setErrorMsg(err.message || 'There was an issue saving your booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
    <div className="booking-page bg-[#0d0f12]">
      <SiteHeader />

      {step !== 3 ? (
        <>
          {/* HERO SECTION WITH CAPTURE FORM */}
          <section
            style={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              background: '#0d0f12',
              backgroundImage: "url('/images/hero-racecar.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: 'clamp(7rem,15vw,13rem) 5vw 5rem',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {/* Glowing accents and cinematic vignette overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,15,18,0.5)_0%,rgba(13,15,18,0.95)_100%)] z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_60%)] z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.03),transparent_55%)] z-0" />
            <div className="absolute inset-0 opacity-10 z-0" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '96px 96px'
            }} />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* LEFT COLUMN: Strategic Value Propositions */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                <div data-hero="1" className="inline-flex items-center gap-2 mb-6 text-[11px] font-mono uppercase tracking-[0.2em] text-[#6ee7b7] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#6ee7b7] animate-pulse" />
                  LIVE ON-DEMAND | STRATEGY SESSIONS
                </div>
                <h1 data-hero="1" className="text-[clamp(2.4rem,5.2vw,4.2rem)] font-medium tracking-tight text-white leading-[1.08] mb-6 font-display">
                  Forecasting B2B Growth
                </h1>
                <p data-hero="2" className="text-lg font-semibold mb-6 leading-snug" style={{ color: '#ffffff' }}>
                  Marketing forecasting has become significantly more complex.
                </p>
                <div data-hero="3" className="text-[15px] sm:text-[17px] leading-relaxed space-y-6 max-w-[700px] font-medium">
                  <p style={{ color: '#ffffff' }}>
                    AI Overviews are changing click behavior, paid media auctions are becoming less predictable, attribution gaps continue to widen, and B2B conversion patterns no longer behave the way they did just a few years ago. Yet most organizations still rely on outdated forecasting models built around static traffic assumptions, stable CPCs, and linear growth expectations.
                  </p>
                  <p style={{ color: '#ffffff' }}>
                    In this private strategy session, Steve Martin and the Gobiya engineering team will break down how modern B2B teams should forecast SEO, conversion architecture, and paid growth in today's environment. You'll learn how to move beyond generic traffic projections and build forecasting systems that account for visibility shifts, AI-driven search behavior, conversion volatility, pipeline quality, and revenue efficiency.
                  </p>
                  <p className="font-semibold pt-2" style={{ color: '#ffffff' }}>
                    You'll walk away with practical B2B forecasting frameworks, pipeline contribution maps, and a step-by-step action plan to operationalize organic growth projections across your organization.
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN: The Form / Booking Widget */}
              <div className="lg:col-span-5 flex justify-center w-full" data-hero="4">
                <div 
                  className="w-full max-w-[600px] bg-white text-gray-900 rounded shadow-[0_24px_60px_rgba(0,0,0,0.3)] border border-gray-200 relative overflow-hidden"
                  style={{ padding: '3.5rem' }}
                >
                  
                  {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded p-3 mb-4 flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" width="14" height="14" className="shrink-0"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      {errorMsg}
                    </div>
                  )}

                  {step === 1 ? (
                    /* STEP 1: Qualification Form */
                    <div className="flex flex-col gap-6 text-left">
                      <div className="mb-2 text-center">
                        <h3 className="font-bold text-xl text-gray-900">Request your growth session</h3>
                        <p className="text-sm text-gray-500 mt-2">Fill out the form below to register &amp; lock your date:</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1 book-field">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold" htmlFor="f-name">First Name *</label>
                          <input 
                            id="f-name" 
                            type="text" 
                            required 
                            value={firstName} 
                            onChange={e => setFirstName(e.target.value)} 
                            placeholder="First Name" 
                            className="bg-gray-50 border border-gray-200 py-2.5 px-3 rounded text-sm text-gray-900 focus:border-[#2F5D50] focus:bg-white outline-none transition-all w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-1 book-field">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold" htmlFor="l-name">Last Name *</label>
                          <input 
                            id="l-name" 
                            type="text" 
                            required 
                            value={lastName} 
                            onChange={e => setLastName(e.target.value)} 
                            placeholder="Last Name" 
                            className="bg-gray-50 border border-gray-200 py-2.5 px-3 rounded text-sm text-gray-900 focus:border-[#2F5D50] focus:bg-white outline-none transition-all w-full"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 book-field">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold" htmlFor="work-email">Work Email *</label>
                        <input 
                          id="work-email" 
                          type="email" 
                          required 
                          value={email} 
                          onChange={e => setEmail(e.target.value)} 
                          placeholder="Email address" 
                          className="bg-gray-50 border border-gray-200 py-2.5 px-3 rounded text-sm text-gray-900 focus:border-[#2F5D50] focus:bg-white outline-none transition-all w-full"
                        />
                      </div>

                      <div className="flex flex-col gap-1 book-field">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold" htmlFor="web-domain">Website URL *</label>
                        <input 
                          id="web-domain" 
                          type="text" 
                          required 
                          value={website} 
                          onChange={e => setWebsite(e.target.value)} 
                          placeholder="e.g. company.com" 
                          className="bg-gray-50 border border-gray-200 py-2.5 px-3 rounded text-sm text-gray-900 focus:border-[#2F5D50] focus:bg-white outline-none transition-all w-full"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1 book-field">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold" htmlFor="sel-budget">Monthly Budget *</label>
                          <select 
                            id="sel-budget" 
                            required 
                            value={budget} 
                            onChange={e => setBudget(e.target.value)}
                            className="bg-gray-50 border border-gray-200 py-2.5 px-2 rounded text-sm text-gray-900 focus:border-[#2F5D50] focus:bg-white outline-none transition-all w-full select-field"
                          >
                            <option value="">Select budget...</option>
                            {BUDGET_OPTIONS.map(o => (
                              <option key={o.id} value={o.id}>{o.label}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col gap-1 book-field">
                          <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold" htmlFor="tel-phone">Phone Number *</label>
                          <input 
                            id="tel-phone" 
                            type="tel" 
                            required 
                            value={phone} 
                            onChange={e => setPhone(e.target.value)} 
                            placeholder="+1 (555) 000-0000" 
                            className="bg-gray-50 border border-gray-200 py-2.5 px-3 rounded text-sm text-gray-900 focus:border-[#2F5D50] focus:bg-white outline-none transition-all w-full"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 book-field">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold" htmlFor="ta-challenges">Core bottleneck or objective</label>
                        <textarea 
                          id="ta-challenges" 
                          rows={2} 
                          value={challenges} 
                          onChange={e => setChallenges(e.target.value)} 
                          placeholder="E.g., Hit by Google updates, lost 40% pipeline, need audit." 
                          className="bg-gray-50 border border-gray-200 py-2 px-3 rounded text-sm text-gray-900 focus:border-[#2F5D50] focus:bg-white outline-none transition-all w-full resize-none"
                        />
                      </div>

                      <button 
                        type="button" 
                        className="w-full mt-4 bg-[#F26522] hover:bg-[#e05a1a] text-white border border-[#F26522] hover:border-[#e05a1a] py-3 rounded font-medium uppercase tracking-[0.06em] transition-all duration-200 outline-none cursor-pointer"
                        style={{ fontSize: '13px' }}
                        onClick={() => {
                          if (!firstName || !lastName || !email || !website || !budget || !phone) {
                            setErrorMsg('Please fill out all required fields marked with *');
                          } else {
                            setErrorMsg('');
                            setStep(2);
                          }
                        }}
                      >
                        SUBMIT REQUEST
                      </button>

                      {/* Case study logo marquee */}
                      <div className="mt-8 pt-6 border-t border-gray-100 overflow-hidden">
                        <style>{`
                          @keyframes bk-marquee {
                            0%   { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                          }
                          .bk-marquee-track {
                            display: flex;
                            width: max-content;
                            animation: bk-marquee 18s linear infinite;
                          }
                          .bk-marquee-track:hover { animation-play-state: paused; }
                        `}</style>
                        <div className="bk-marquee-track items-center gap-8" style={{ alignItems: 'center' }}>
                          {[
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
                          ].map((src, i) => (
                            <img
                              key={i}
                              src={src}
                              alt=""
                              style={{ height: '48px', width: 'auto', opacity: 0.5, filter: 'grayscale(1)', flexShrink: 0, marginRight: '3.5rem' }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* STEP 2: Calendar scheduling */
                    <div className="flex flex-col text-left">
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#D3CEC0]">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 font-bold">Step 2: Choose session slot</span>
                        <button type="button" onClick={() => setStep(1)} className="text-[11px] text-[#2F5D50] hover:underline font-medium uppercase tracking-wider font-mono">Go Back</button>
                      </div>

                      <div className="cal-nav">
                        <span className="cal-month text-gray-900">{MONTHS[month]} {year}</span>
                        <div className="cal-nav-btns">
                          <button type="button" className="cal-btn border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-900" onClick={handlePrevMonth} aria-label="Previous month">
                            <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </button>
                          <button type="button" className="cal-btn border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-900" onClick={handleNextMonth} aria-label="Next month">
                            <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </button>
                        </div>
                      </div>

                      <div className="cal-weekdays">
                        {WEEKDAYS.map(w => <span key={w} className="text-gray-400 font-bold">{w}</span>)}
                      </div>
                      <div className="cal-grid cal-grid-light">{getDayElements()}</div>

                      {selectedDate && (
                        <div className="time-section border-gray-100 mt-5 pt-4">
                          <p className="time-label text-gray-400 font-bold">Available slots — {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                          <div className="time-grid mt-2">
                            {TIME_SLOTS.map(t => (
                              <button key={t} type="button" className={`time-slot border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 rounded ${selectedTimeSlot === t ? 'time-slot-selected' : ''}`} onClick={() => setSelectedTimeSlot(t)}>{t}</button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3 mt-6 pt-4 border-t border-[#D3CEC0]">
                        <button type="button" className="py-2.5 px-4 border border-gray-200 rounded text-[11px] font-mono uppercase tracking-wider text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors" onClick={() => setStep(1)}>
                          Back
                        </button>
                        <button 
                          type="button" 
                          className="flex-1 bg-[#F26522] hover:bg-[#e05a1a] text-white border border-[#F26522] hover:border-[#e05a1a] py-2.5 rounded font-medium uppercase tracking-[0.06em] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed outline-none cursor-pointer"
                          style={{ fontSize: '13px' }}
                          disabled={!selectedDate || !selectedTimeSlot || submitting}
                          onClick={() => handleBookingSubmit()}
                        >
                          {submitting ? 'Confirming...' : 'Confirm Session →'}
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </section>

          {/* WHAT YOU'LL LEARN & STRATEGIST SECTION */}
          <section style={{ background: '#ffffff', padding: '5rem 5vw', borderTop: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#111827', marginBottom: '3rem' }}>
                What You'll Learn
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                {/* LEFT SIDE: The 10 Points Grid */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 text-left">
                  {[
                    { title: "Why traditional marketing forecasts fail", desc: "Understand why standard static models fail in AI-driven search environments and highly volatile B2B scenarios." },
                    { title: "AI Overviews & zero-click search modeling", desc: "Learn how ChatGPT, Claude, and Gemini citations are changing forecasting assumptions and click CTR models." },
                    { title: "The modern B2B growth framework", desc: "Deploy frameworks that forecast visibility, pipeline conversion, SQL volumes, and revenue outcomes." },
                    { title: "Building multi-scenario projections", desc: "Formulate conservative, expected, and aggressive growth models ready for B2B board and CFO review." },
                    { title: "The core metrics to track", desc: "Isolate the highest-value inputs needed to project B2B SEO and paid acquisition ROI with audit-level accuracy." },
                    { title: "Measuring true business impact", desc: "Move beyond impressions and traffic rankings to forecast pipeline value and pipeline contribution." },
                    { title: "AI-impacted industry projections", desc: "Project organic search growth and citation share in verticals heavily disrupted by generative answers." },
                    { title: "Paid search inflation modeling", desc: "Model CPC inflation, ad auction volatility, and audience saturation patterns across channels." },
                    { title: "Executive-ready reporting templates", desc: "Design forecasting dashboards and templates that B2B executive leadership teams actually trust." },
                    { title: "90-day execution roadmap", desc: "Map out a step-by-step action plan to align search attribution with pipeline CRM performance from day one." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start border-b border-[#D3CEC0] pb-8 pt-4">
                      <div className="w-8 h-8 rounded-full bg-[#2F5D50]/10 flex items-center justify-center shrink-0 text-[#2F5D50] mt-0.5">
                        <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* RIGHT SIDE: The Instructor Profile */}
                <div className="lg:col-span-4 text-left" style={{ background: '#f9fafb', border: '1px solid #e5e7eb', padding: '2.5rem' }}>
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400 font-semibold mb-4">Your Strategist</p>
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src="/images/steve-portrait.webp" 
                      alt="Steve Martin" 
                      className="w-16 h-16 rounded-full object-cover border border-[#D3CEC0] shadow-sm" 
                    />
                    <div>
                      <h3 className="font-bold text-lg text-[#15130E] leading-tight">Steve Martin</h3>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-[#2F5D50] mt-1 font-semibold">CEO &amp; Lead Growth Engineer</p>
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm leading-relaxed space-y-4 font-light">
                    <p>
                      After building full-stack digital architectures and engineering B2B search pipelines for 25+ years, Steve works with B2B operators to grow organic pipeline and recover from search updates.
                    </p>
                    <p>
                      Steve combines deep full-stack technical engineering with high-stakes SEO forensics to audit visibility and build pipeline engines that survive CFO scrutiny.
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <img 
                      src="/images/logo-favicon-gobiya-blastoff-large.webp" 
                      alt="Gobiya Logo" 
                      className="opacity-30 object-contain"
                      style={{ height: '24px', width: 'auto' }}
                    />
                  </div>
                </div>

              </div>
          </section>
        </>
      ) : (
        /* STEP 3: Success Screen (though booking handles redirect, fallback success layout) */
        <section className="bg-white text-gray-900 border-b border-gray-100" style={{ padding: '5rem 5vw' }}>
          <div className="success-screen grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="success-copy flex flex-col gap-6 text-left">
              <div className="w-16 h-16 rounded-full border border-[#2F5D50] flex items-center justify-center text-[#2F5D50]">
                <svg viewBox="0 0 24 24" fill="none" width="28" height="28" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[#2F5D50] font-semibold mb-2">Booking Confirmed</p>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-tight">Your session is locked in.</h1>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                A Google Calendar invitation with video meeting details has been sent to <strong>{email}</strong>. Steve will join you to review your audit scope.
              </p>
              <div className="flex gap-4">
                <a href="/" className="bg-gray-900 hover:bg-black text-white text-xs font-mono uppercase tracking-wider py-3.5 px-6 rounded transition-colors duration-200">Return to homepage</a>
                <a href="/insights" className="border border-gray-200 hover:border-gray-400 text-gray-700 text-xs font-mono uppercase tracking-wider py-3.5 px-6 rounded transition-colors duration-200">Read latest insights</a>
              </div>
            </div>

            <div className="success-detail bg-gray-50 border border-gray-100 rounded-xl p-6 sm:p-8 text-left">
              <div className="success-detail-head text-xs font-mono uppercase tracking-wider text-gray-400 pb-3 border-b border-gray-200">booking-confirmation.log</div>
              <div className="success-detail-body mt-4 space-y-4">
                <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-400">Date</span>
                  <span className="text-gray-900 font-medium">{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-400">Time</span>
                  <span className="text-gray-900 font-medium">{selectedTimeSlot} Pacific Time</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-400">Format</span>
                  <span className="text-gray-900 font-medium">Google Meet — screen-share</span>
                </div>
                <div className="flex justify-between text-sm py-1 border-b border-gray-100">
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-400">Duration</span>
                  <span className="text-gray-900 font-medium">15 – 30 minutes</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-400">Invite Sent</span>
                  <span className="text-gray-900 font-medium">{email}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <SiteFooter hideCTA={true} />
    </div>
  );
};

export default BookingPage;
