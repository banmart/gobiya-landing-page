import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Check, ArrowLeft, ArrowRight, Video, Sparkles, AlertCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import SEO from './SEO';
import { supabase } from '../lib/supabase';
import { trackFormSubmit, trackCTA } from '../lib/analytics';

const BUDGET_OPTIONS = [
  { id: '3k-5k', label: '$3,000 – $5,000 / month' },
  { id: '5k-10k', label: '$5,000 – $10,000 / month' },
  { id: '10k-25k', label: '$10,000 – $25,000 / month' },
  { id: '25k+', label: '$25,000+ / month' }
];

const TIMELINE_OPTIONS = [
  { id: 'immediate', label: 'Immediate (within 30 days)' },
  { id: '1-3m', label: '1 to 3 months' },
  { id: '3-6m', label: '3 to 6 months' },
  { id: 'exploratory', label: 'Exploratory research' }
];

const SCOPE_OPTIONS = [
  { id: 'geo', label: 'GEO & AI Overview Optimization' },
  { id: 'seo_recovery', label: 'Google Core Update Recovery' },
  { id: 'outbound_pipeline', label: 'Sales & Outbound Automation' },
  { id: 'react_dev', label: 'Bespoke Custom Frontend / React Dev' }
];

const TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM'
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const BookingPage: React.FC = () => {
  // Check URL parameters for pre-filling
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  
  // Funnel Flow state
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Date/Time, 2: Qualification, 3: Success
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Custom Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  // Qualification states
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
  const [challenges, setChallenges] = useState('');

  // Extract query parameters
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email') || '';
    const firstParam = params.get('firstName') || '';
    const lastParam = params.get('lastName') || '';
    const compParam = params.get('company') || '';
    const webParam = params.get('website') || '';
    
    if (emailParam) setEmail(emailParam);
    if (firstParam) setFirstName(firstParam);
    if (lastParam) setLastName(lastParam);
    if (compParam) setCompany(compParam);
    if (webParam) setWebsite(webParam);
  }, []);

  const handleScopeToggle = (id: string) => {
    setSelectedScopes(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonthDays = new Date(year, month, 0).getDate();

  const handlePrevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    // Don't allow navigating before current month
    const today = new Date();
    if (prev.getFullYear() < today.getFullYear() || (prev.getFullYear() === today.getFullYear() && prev.getMonth() < today.getMonth())) {
      return;
    }
    setCurrentDate(prev);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateSelect = (dayNum: number) => {
    const dateObj = new Date(year, month, dayNum);
    setSelectedDate(dateObj);
    setSelectedTimeSlot(null); // Reset time when date changes
  };

  const isDaySelectable = (dayNum: number) => {
    const dateObj = new Date(year, month, dayNum);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    // Weekend check (B2B calls strictly Mon-Fri)
    const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
    
    return dateObj >= today && !isWeekend;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTimeSlot || !email || !firstName || !lastName) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Insert or update lead details
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

      // 2. Parse scheduled date-time
      const [time, period] = selectedTimeSlot.split(' ');
      const [hoursStr, minutesStr] = time.split(':');
      let hours = parseInt(hoursStr);
      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      const bookingDateTime = new Date(selectedDate);
      bookingDateTime.setHours(hours, parseInt(minutesStr), 0, 0);

      const scopesParam = selectedScopes
        .map(s => SCOPE_OPTIONS.find(o => o.id === s)?.label || s)
        .join(', ');

      // 3. Create booking entry in Supabase
      const { error: bookingError } = await supabase.from('bookings').insert({
        lead_id: leadId,
        email,
        date_time: bookingDateTime.toISOString(),
        budget: BUDGET_OPTIONS.find(o => o.id === budget)?.label || budget || 'Not specified',
        timeline: TIMELINE_OPTIONS.find(o => o.id === timeline)?.label || timeline || 'Not specified',
        challenges: `[Capabilities: ${scopesParam || 'None'}] -- ${challenges || 'None'}`,
        status: 'Call booked'
      });

      if (bookingError) throw bookingError;

      // 4. Send email notification via edge function
      const dateString = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const htmlText = `
        <h2>New Discovery Call Scheduled</h2>
        <p><strong>Lead Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Website:</strong> ${website || 'N/A'}</p>
        <p><strong>Scheduled Time:</strong> ${dateString} at ${selectedTimeSlot} Pacific Time</p>
        <p><strong>Marketing Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
        <p><strong>Project Scopes:</strong> ${scopesParam || 'None'}</p>
        <p><strong>Challenges / Goals:</strong></p>
        <p>${challenges ? challenges.replace(/\n/g, '<br>') : 'None'}</p>
      `;

      try {
        await supabase.functions.invoke('contact-form', {
          body: {
            firstName,
            lastName,
            email,
            company,
            message: `[Call Scheduled: ${dateString} @ ${selectedTimeSlot} PT] Budget: ${budget}, Timeline: ${timeline}, Scopes: ${scopesParam}. Challenges: ${challenges}`
          }
        });
      } catch (err) {
        console.warn('Edge function email invoke skipped:', err);
      }

      // 5. Track in GA4
      trackFormSubmit({
        form_name: 'discovery_call_booking',
        has_domain: !!website,
        booking_date: bookingDateTime.toISOString(),
        budget,
        timeline,
        scopes: scopesParam
      });

      setStep(3);
    } catch (err: any) {
      console.error('Booking submission failed:', err);
      setErrorMsg(err.message || 'There was an issue saving your booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const getDayElements = () => {
    const days = [];
    
    // Add offset days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      days.push(
        <div key={`prev-${d}`} className="w-10 h-10 flex items-center justify-center text-gray-700 text-[13px] font-medium pointer-events-none select-none">
          {d}
        </div>
      );
    }
    
    // Add days of current month
    for (let d = 1; d <= daysInMonth; d++) {
      const selectable = isDaySelectable(d);
      const isSelected = selectedDate && 
                         selectedDate.getDate() === d && 
                         selectedDate.getMonth() === month && 
                         selectedDate.getFullYear() === year;
      
      days.push(
        <button
          key={`curr-${d}`}
          type="button"
          disabled={!selectable}
          onClick={() => handleDateSelect(d)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
            isSelected 
              ? 'bg-[#F26522] text-white border border-[#F26522] shadow-lg shadow-[#F26522]/30 scale-105' 
              : selectable 
                ? 'bg-white/5 border border-white/10 text-white hover:bg-[#F26522]/10 hover:border-[#F26522]' 
                : 'text-gray-600 opacity-20 pointer-events-none'
          }`}
        >
          {d}
        </button>
      );
    }
    
    return days;
  };

  return (
    <>
      <SEO path="/book" />
      <div className="min-h-screen bg-[#050505] text-white relative font-sans selection:bg-[#F26522] selection:text-white page-wrapper flex flex-col">
        <CustomCursor />

        {/* Global noise layout */}
        <div className="noise-overlay" />

        <Header theme="dark" />

        <main className="flex-1 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 py-20 lg:py-28 flex flex-col justify-center">
          
          {step !== 3 ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-12 lg:gap-16 items-start">
              {/* Left Column: Heading and Context */}
              <div className="space-y-6 lg:max-w-xl">
                <span className="inline-block px-3 py-1 bg-[#F26522]/10 border border-[#F26522]/20 text-[#F26522] text-[10px] uppercase tracking-wider font-semibold">
                  Discovery Call
                </span>
                
                <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.03em] font-display text-white">
                  Schedule your forensic <span className="text-[#F26522]">pipeline audit</span>.
                </h1>
                
                <p className="text-gray-400 text-[15px] sm:text-[16px] leading-relaxed">
                  Book a live 1-on-1 strategy call with Steve Martin, CEO & Lead Engineer at Gobiya. We'll examine your domain's entity mapping, diagnose search drop triggers, and layout a concrete technical roadmap.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-xl">
                  <img 
                    src="/images/steve-portrait.webp" 
                    alt="Steve Martin" 
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#F26522] shrink-0 shadow-lg shadow-orange-500/10" 
                  />
                  <div>
                    <h3 className="text-[16px] font-bold text-white leading-tight">Steve Martin</h3>
                    <p className="text-[12px] text-[#F26522] font-semibold mt-0.5">CEO & Lead Growth Engineer</p>
                    <p className="text-[12px] text-gray-400 mt-1.5 leading-relaxed">
                      25+ Years bridging full-stack software development and high-stakes organic search recovery.
                    </p>
                  </div>
                </div>

                <div className="border border-white/10 rounded-xl p-5 bg-white/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F26522]/10 border border-[#F26522]/30 flex items-center justify-center">
                      <Video className="w-4 h-4 text-[#F26522]" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-white leading-none">Screen-share Video Meeting</p>
                      <p className="text-[11px] text-gray-400 mt-1">Direct access via Google Meet. Link sent in invite.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F26522]/10 border border-[#F26522]/30 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-[#F26522]" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-white leading-none">15-30 Minute Strategy Session</p>
                      <p className="text-[11px] text-gray-400 mt-1">Actionable takeaways. No sales deck, just engineering insights.</p>
                    </div>
                  </div>
                </div>

                <div className="border border-white/10 rounded-xl p-5 bg-white/5 space-y-3">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Featured Podcast Episode</p>
                  <h4 className="text-[14px] font-semibold text-white leading-snug">Winning with Generative Engine Optimization (GEO)</h4>
                  <p className="text-[12px] text-gray-400 leading-relaxed">
                    Listen to Steve Martin outline how LLMs build client shortlists and what criteria they use to pull citations.
                  </p>
                  <div className="pt-2">
                    <audio controls className="w-full" style={{ filter: 'invert(1) hue-rotate(180deg)' }}>
                      <source src="/audio/Winning_with_generative_engine_optimization.m4a" type="audio/mp4" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-xs text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Steve is currently accepting qualified pipeline opportunities in CA/US regions.</span>
                </div>
              </div>

              {/* Right Column: Interactive Booking Widget */}
              <div className="liquid-glass border border-white/10 rounded-2xl p-6 sm:p-8 bg-black/40 backdrop-blur-md shadow-2xl">
                
                {/* Step Indicator Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <h3 className="text-md font-bold text-white font-display">
                    {step === 1 ? 'Select Date & Time' : 'Pipeline Qualification'}
                  </h3>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Step {step} of 2
                  </span>
                </div>

                {errorMsg && (
                  <div className="mb-6 p-4 bg-red-950/40 border border-red-500/20 text-red-300 text-xs rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {step === 1 ? (
                  // STEP 1: Date & Time Picker
                  <div className="space-y-6">
                    {/* Month selector */}
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-semibold text-white">
                        {MONTHS[month]} {year}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          className="w-8 h-8 border border-white/10 hover:border-[#F26522] flex items-center justify-center text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          className="w-8 h-8 border border-white/10 hover:border-[#F26522] flex items-center justify-center text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Calendar grid */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-7 gap-1 text-center">
                        {WEEKDAYS.map((w, idx) => (
                          <div key={idx} className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-1">
                            {w}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1.5 justify-items-center">
                        {getDayElements()}
                      </div>
                    </div>

                    {/* Select Time slots */}
                    {selectedDate && (
                      <div className="space-y-3 pt-3 border-t border-white/5 animate-fade-rise">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Available slots for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_SLOTS.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setSelectedTimeSlot(t)}
                              className={`py-2.5 px-3 rounded-lg border text-[11px] font-semibold tracking-wide transition-all cursor-pointer text-center ${
                                selectedTimeSlot === t
                                  ? 'bg-[#F26522] border-[#F26522] text-white shadow-md shadow-[#F26522]/20'
                                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Proceed Button */}
                    <button
                      type="button"
                      disabled={!selectedDate || !selectedTimeSlot}
                      onClick={() => setStep(2)}
                      className="w-full flex items-center justify-center gap-2 bg-[#F26522] hover:bg-[#e05a1a] text-white py-3.5 px-6 font-semibold tracking-wide uppercase transition-colors duration-300 cursor-pointer rounded-lg text-xs disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Continue to Qualification <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  // STEP 2: Qualification & Contact Details Form
                  <form onSubmit={handleBookingSubmit} className="space-y-5 animate-fade-rise">
                    
                    {/* Display selected date/time slot summary */}
                    <div className="bg-[#F26522]/10 border border-[#F26522]/30 p-3 rounded-lg flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-white">
                        <CalendarIcon className="w-4 h-4 text-[#F26522]" />
                        <span>
                          {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {selectedTimeSlot} PT
                        </span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => { setStep(1); setSelectedTimeSlot(null); }}
                        className="text-[#F26522] hover:text-[#e05a1a] font-semibold underline underline-offset-2 cursor-pointer"
                      >
                        Change
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="book-firstName" className="block text-[11px] font-medium text-gray-400">First Name</label>
                        <input
                          type="text"
                          required
                          id="book-firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Steve"
                          className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-3 text-[13px] outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="book-lastName" className="block text-[11px] font-medium text-gray-400">Last Name</label>
                        <input
                          type="text"
                          required
                          id="book-lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Martin"
                          className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-3 text-[13px] outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="book-email" className="block text-[11px] font-medium text-gray-400">Work Email</label>
                      <input
                        type="email"
                        required
                        id="book-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="steve@company.com"
                        className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-3 text-[13px] outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="book-company" className="block text-[11px] font-medium text-gray-400">Company Name</label>
                        <input
                          type="text"
                          required
                          id="book-company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Gobiya Inc"
                          className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-3 text-[13px] outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="book-website" className="block text-[11px] font-medium text-gray-400">Website Domain</label>
                        <input
                          type="text"
                          required
                          id="book-website"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="gobiya.com"
                          className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-3 text-[13px] outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Monthly budget selector */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-medium text-gray-400">Estimated Monthly Marketing Budget</label>
                      <div className="grid grid-cols-2 gap-2">
                        {BUDGET_OPTIONS.map((opt) => (
                          <div
                            key={opt.id}
                            onClick={() => setBudget(opt.id)}
                            className={`p-2.5 rounded border text-[11px] font-medium transition-all duration-300 cursor-pointer text-center ${
                              budget === opt.id
                                ? 'bg-[#F26522]/10 border-[#F26522] text-white font-semibold'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            {opt.label.split(' /')[0]}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline selector */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-medium text-gray-400">Desired Engagement Timeline</label>
                      <div className="grid grid-cols-2 gap-2">
                        {TIMELINE_OPTIONS.map((opt) => (
                          <div
                            key={opt.id}
                            onClick={() => setTimeline(opt.id)}
                            className={`p-2.5 rounded border text-[11px] font-medium transition-all duration-300 cursor-pointer text-center ${
                              timeline === opt.id
                                ? 'bg-[#F26522]/10 border-[#F26522] text-white font-semibold'
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            {opt.label.split(' (')[0]}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Targets checkboxes */}
                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-medium text-gray-400">Project Focus Areas (Select all that apply)</label>
                      <div className="grid grid-cols-1 gap-2">
                        {SCOPE_OPTIONS.map((opt) => {
                          const isChecked = selectedScopes.includes(opt.id);
                          return (
                            <div
                              key={opt.id}
                              onClick={() => handleScopeToggle(opt.id)}
                              className={`flex items-center justify-between p-2.5 rounded border transition-all duration-300 cursor-pointer ${
                                isChecked
                                  ? 'bg-[#F26522]/10 border-[#F26522] text-white'
                                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                              }`}
                            >
                              <span className="text-[11px] font-medium">{opt.label}</span>
                              <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all duration-300 ${
                                isChecked
                                  ? 'bg-[#F26522] border-[#F26522] text-white'
                                  : 'border-white/30 text-transparent'
                              }`}>
                                <Check className="w-2.5 h-2.5" strokeWidth={3} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="book-challenges" className="block text-[11px] font-medium text-gray-400">Core bottlenecks / objectives</label>
                      <textarea
                        id="book-challenges"
                        rows={3}
                        value={challenges}
                        onChange={(e) => setChallenges(e.target.value)}
                        placeholder="E.g., Hit by Google March update, lost 40% organic reach, need forensic recovery audit."
                        className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-3 text-[13px] outline-none transition-all resize-none"
                      />
                    </div>

                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white py-3 px-6 font-semibold tracking-wide uppercase transition-colors duration-300 cursor-pointer rounded-lg text-xs"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                      </button>
                      
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-[2] flex items-center justify-center bg-[#F26522] hover:bg-[#e05a1a] text-white py-3 px-6 font-semibold tracking-wide uppercase transition-colors duration-300 cursor-pointer rounded-lg text-xs disabled:opacity-75"
                      >
                        {submitting ? (
                          <div className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Scheduling...</span>
                          </div>
                        ) : (
                          <span>Book Strategy Call</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </div>
          ) : (
            // STEP 3: Booking Success Screen
            <div className="max-w-2xl w-full bg-black/40 border border-white/10 p-8 sm:p-14 rounded-2xl shadow-2xl backdrop-blur-md text-center mx-auto relative z-10 animate-fade-rise">
              <div className="w-20 h-20 bg-[#F26522]/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-10 h-10 text-[#F26522]" strokeWidth={2.5} />
              </div>
              
              <span className="inline-block px-3 py-1 bg-[#F26522]/10 border border-[#F26522]/30 text-[#F26522] text-[10px] uppercase tracking-wider font-semibold mb-4">
                Booking Confirmed
              </span>

              <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-6 font-display">
                Your session is locked in.
              </h1>
              
              <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-xl p-5 mb-8 space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-4 h-4 text-[#F26522]" />
                  <span className="text-[13px] text-gray-200 font-medium">
                    {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#F26522]" />
                  <span className="text-[13px] text-gray-200 font-medium">
                    {selectedTimeSlot} Pacific Time (US/Canada)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Video className="w-4 h-4 text-[#F26522]" />
                  <span className="text-[13px] text-gray-200 font-medium">
                    Google Meet video meeting (link in invite)
                  </span>
                </div>
              </div>

              <p className="text-[15px] leading-relaxed text-gray-400 mb-10 max-w-lg mx-auto">
                We have emailed a Google Calendar invitation containing the video screen-share details to <strong className="text-white">{email}</strong>. Steve Martin will join you to review your audit scope.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="/" 
                  className="flex items-center gap-2 bg-[#F26522] hover:bg-[#e05a1a] text-white px-6 py-3.5 rounded font-medium text-[13px] transition-colors duration-300 w-full sm:w-auto justify-center"
                >
                  Return to Homepage
                </a>
                
                <a 
                  href="/insights" 
                  className="flex items-center gap-2 bg-transparent border border-white/10 hover:border-[#F26522] hover:text-[#F26522] text-white px-6 py-3.5 rounded font-medium text-[13px] transition-colors duration-300 w-full sm:w-auto justify-center"
                >
                  Read Latest Insights
                </a>
              </div>
            </div>
          )}

        </main>

        <Footer />
      </div>
    </>
  );
};

export default BookingPage;
