import React, { useState } from 'react';
import { Check, Download, ArrowRight, Lock, FileText, Sparkles, AlertTriangle, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { trackFormSubmit } from '../lib/analytics';

export interface LeadMagnetInfo {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefitList: string[];
  ctaLabel: string;
  fileName: string;
  icon: React.ReactNode;
}

export const MAGNETS: Record<string, LeadMagnetInfo> = {
  b2b_roi_calculator: {
    id: 'b2b_roi_calculator',
    title: 'B2B Organic Pipeline ROI Calculator',
    subtitle: 'Free Strategy Sheet & Model',
    description: 'Model your organic search traffic, MQL conversion rates, sales cycle velocity, and projected pipeline revenue with our interactive spreadsheet template.',
    benefitList: [
      'Interactive ROI formula based on real B2B benchmarks',
      'Multi-stakeholder conversion velocity mapping',
      'Fully customizable attribution modeling variables'
    ],
    ctaLabel: 'Download ROI Calculator',
    fileName: 'B2B_Organic_Pipeline_ROI_Calculator.xlsx',
    icon: <TrendingUp className="w-8 h-8 text-[#F26522]" />
  },
  geo_playbook: {
    id: 'geo_playbook',
    title: 'The AI Engine (GEO) Citation Playbook',
    subtitle: 'Free Implementation Framework',
    description: 'Get the exact schema templates, entity-linking scripts, and structured content formatting we use to secure citations across ChatGPT, Claude, Perplexity, and Gemini.',
    benefitList: [
      'JSON-LD Organization schema template for RAG retrieval',
      'Triangulation mapping checklist for Wikidata & LinkedIn',
      'Formatting rules for passage-level extraction by LLMs'
    ],
    ctaLabel: 'Download Citation Playbook',
    fileName: 'AI_Engine_GEO_Citation_Playbook.pdf',
    icon: <Sparkles className="w-8 h-8 text-[#F26522]" />
  },
  penalty_recovery_checklist: {
    id: 'penalty_recovery_checklist',
    title: 'Google Core Update & Penalty Recovery Checklist',
    subtitle: 'Forensic Engineering Protocol',
    description: 'A step-by-step technical guide to isolating algorithmic drops, diagnosing entity devaluation, and preparing reconsideration submissions.',
    benefitList: [
      'Isolate query drops from broad Core Update filters',
      'Link-profile triage checklist to address manual actions',
      'Reconsideration letter copy-paste template'
    ],
    ctaLabel: 'Download Recovery Checklist',
    fileName: 'Google_Core_Update_Recovery_Checklist.pdf',
    icon: <AlertTriangle className="w-8 h-8 text-[#F26522]" />
  }
};

export const getLeadMagnetForArticle = (category: string, slug: string): LeadMagnetInfo => {
  const cat = category?.toLowerCase() || '';
  const s = slug?.toLowerCase() || '';
  
  if (
    s.includes('geo') || 
    s.includes('llm') || 
    s.includes('chatgpt') || 
    s.includes('knowledge-graph') ||
    cat === 'geo' ||
    cat === 'ai search'
  ) {
    return MAGNETS.geo_playbook;
  }
  
  if (
    s.includes('penalty') || 
    s.includes('recover') || 
    s.includes('core-update') || 
    s.includes('manual-action') || 
    s.includes('local-seo') || 
    cat === 'penalty recovery' || 
    cat === 'local seo'
  ) {
    return MAGNETS.penalty_recovery_checklist;
  }
  
  return MAGNETS.b2b_roi_calculator;
};

interface LeadMagnetCTAProps {
  category: string;
  slug: string;
}

const LeadMagnetCTA: React.FC<LeadMagnetCTAProps> = ({ category, slug }) => {
  const magnet = getLeadMagnetForArticle(category, slug);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName) return;

    setStatus('submitting');
    try {
      // 1. Insert lead into Supabase
      const { data, error } = await supabase.from('leads').insert({
        first_name: firstName,
        last_name: lastName,
        email,
        company,
        website,
        lead_magnet: magnet.id,
        source_page: slug
      }).select();

      if (error) throw error;

      // 2. Track form submission
      trackFormSubmit({
        form_name: `lead_magnet_${magnet.id}`,
        lead_magnet: magnet.id,
        source_page: slug,
        has_domain: !!website
      });

      // 3. Fallback to contact form edge function to trigger an email notification
      try {
        await supabase.functions.invoke('contact-form', {
          body: {
            firstName,
            lastName,
            email,
            company,
            message: `Lead Magnet Download: [Magnet: ${magnet.title}] [Website: ${website || 'None'}] [Slug: ${slug}]`
          }
        });
      } catch (err) {
        console.warn('Email notification skipped, but lead recorded:', err);
      }

      setStatus('success');
    } catch (err) {
      console.error('Failed to capture lead:', err);
      setStatus('error');
    }
  };

  const handleBookRedirect = () => {
    const params = new URLSearchParams({
      email,
      firstName,
      lastName,
      company,
      website,
      source: `magnet_success_${magnet.id}`
    });
    
    window.history.pushState({}, '', `/book-call?${params.toString()}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full relative z-10 my-10 sm:my-14 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl p-6 sm:p-10 text-left liquid-glass">
      {status !== 'success' ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Left Column: Offer Details */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                {magnet.icon}
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-semibold text-[#F26522]">{magnet.subtitle}</p>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight font-display">{magnet.title}</h3>
              </div>
            </div>
            
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-gray-400">
              {magnet.description}
            </p>
            
            <ul className="space-y-2.5">
              {magnet.benefitList.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2.5 text-[13px] text-gray-300">
                  <Check className="w-4 h-4 text-[#F26522] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
              <Lock className="w-3 h-3" />
              <span>We respect your inbox. Free download instantly after submit.</span>
            </div>
          </div>

          {/* Right Column: Inline Capture Form */}
          <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-xl relative">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="mag-firstName" className="block text-[11px] font-medium text-gray-400">First Name</label>
                  <input
                    type="text"
                    required
                    id="mag-firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-3 text-[13px] outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="mag-lastName" className="block text-[11px] font-medium text-gray-400">Last Name</label>
                  <input
                    type="text"
                    required
                    id="mag-lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-3 text-[13px] outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label htmlFor="mag-email" className="block text-[11px] font-medium text-gray-400">Work Email</label>
                <input
                  type="email"
                  required
                  id="mag-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-3 text-[13px] outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="mag-company" className="block text-[11px] font-medium text-gray-400">Company Name</label>
                <input
                  type="text"
                  id="mag-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Corp"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-3 text-[13px] outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="mag-website" className="block text-[11px] font-medium text-gray-400">Website Domain</label>
                <input
                  type="text"
                  required
                  id="mag-website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="yourcompany.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#F26522] focus:bg-white/10 text-white rounded p-3 text-[13px] outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center bg-[#F26522] hover:bg-[#e05a1a] text-white py-3.5 px-6 font-semibold tracking-wide uppercase transition-colors duration-300 cursor-pointer rounded-lg text-xs disabled:opacity-75"
              >
                {status === 'submitting' ? (
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Securing Asset...</span>
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    {magnet.ctaLabel} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
              
              {status === 'error' && (
                <p className="text-center text-xs text-red-400 mt-2 font-medium">Failed to submit. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      ) : (
        // Success Transition Screen / Booking Call Upsell
        <div className="max-w-xl mx-auto text-center space-y-6 py-6 sm:py-8 animate-fade-rise">
          <div className="w-16 h-16 bg-[#F26522]/10 border border-[#F26522] rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-[#F26522]" strokeWidth={2.5} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white font-display">Check your inbox.</h3>
            <p className="text-gray-300 text-[14px] leading-relaxed">
              We have successfully locked in your access and sent <strong className="text-white">{magnet.fileName}</strong> to <strong className="text-white">{email}</strong>.
            </p>
          </div>

          <div className="border border-white/10 bg-white/5 p-6 rounded-xl space-y-4">
            <div className="inline-block px-3 py-1 bg-[#F26522]/10 border border-[#F26522]/30 text-[#F26522] text-[10px] uppercase tracking-wider font-semibold">
              Exclusive Pipeline Strategy Session
            </div>
            <h4 className="text-lg font-bold text-white font-display">Apply this directly to {website || 'your domain'}</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Book a live 15-minute engineering review with Steve Martin. We'll run a forensic audit live and map this template directly to your target organic pipeline.
            </p>
            <button
              onClick={handleBookRedirect}
              className="w-full flex items-center justify-center gap-2 bg-[#F26522] hover:bg-[#e05a1a] text-white py-3 px-6 rounded-lg font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#F26522]/10"
            >
              Book 1-on-1 Review Session <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadMagnetCTA;
