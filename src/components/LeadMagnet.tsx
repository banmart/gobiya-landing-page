import React, { useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Target } from 'lucide-react';
import { trackFormSubmit } from '../lib/analytics';

const LeadMagnet = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    trackFormSubmit({ form_name: 'lead_magnet_download', has_domain: false, lead_magnet: 'local_seo_guide' });

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <section className="relative w-full border-t border-white/5 bg-[#050505] py-20 sm:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F26522] rounded-full mix-blend-screen opacity-[0.03] blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F26522] to-transparent opacity-50"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column (Copy & Form) */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F26522]/10 text-[#F26522] px-3 py-1.5 rounded-full mb-6 font-bold text-[11px] uppercase tracking-wider border border-[#F26522]/20">
                <BookOpen className="w-3.5 h-3.5" /> Free Local SEO Guide
              </div>
              
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-display text-white font-medium leading-[1.1] tracking-tight mb-6">
                The Local Business Guide to Ranking #1 on Google.
              </h2>
              
              <p className="text-gray-400 text-[16px] sm:text-[18px] leading-relaxed mb-8 max-w-[500px]">
                Over 50 pages of actionable strategies to dominate your local market, get more 5-star reviews, and turn Google Maps into a lead-generation machine.
              </p>

              {status === 'success' ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 flex items-center gap-4 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="text-green-500 font-bold mb-1">Guide Sent!</h4>
                    <p className="text-sm text-green-400/80">Check your inbox for your free copy.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your best email..."
                    required
                    className="flex-1 bg-black/40 border border-white/10 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[#F26522]/50 transition-colors placeholder:text-gray-600"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="bg-[#F26522] hover:bg-[#e05a1a] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(242,101,34,0.3)] hover:shadow-[0_0_30px_rgba(242,101,34,0.5)] flex items-center justify-center min-w-[160px] disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {status === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Get Free Guide
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column (Visual) */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="absolute inset-0 bg-[#F26522]/20 blur-[80px] rounded-full w-3/4 h-3/4 mx-auto my-auto pointer-events-none"></div>
              
              {/* Abstract Book Representation */}
              <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-r-2xl rounded-l-md bg-gradient-to-br from-gray-900 to-black border border-white/10 shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-500">
                {/* Book Spine */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F26522]/80 to-[#F26522] border-r border-white/20"></div>
                
                {/* Book Cover Content */}
                <div className="absolute inset-0 ml-8 p-8 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-8">
                    <Target className="w-6 h-6 text-[#F26522]" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-white leading-tight mb-4">
                    Local SEO<br />Mastery
                  </h3>
                  <div className="w-12 h-1 bg-[#F26522] mb-6"></div>
                  <p className="text-gray-400 text-sm font-medium">The Step-By-Step Playbook for SMBs</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
