import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Terminal, Database, Send, Settings, LogOut, 
  Trash2, Play, ExternalLink, ShieldCheck, Mail, CheckCircle2,
  Clock, AlertTriangle, ArrowRight
} from 'lucide-react';
import CustomCursor from './CustomCursor';
import Header from './Header';
import Footer from './Footer';

interface Lead {
  id?: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  website: string;
  category: string;
  location: string;
  status: string;
  created_at?: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

// Safe storage helper to prevent crashes in sandboxed environments/iframes or strict privacy modes
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
      }
    } catch (e) {
      console.warn('Storage read blocked, using memory fallback:', e);
    }
    if (typeof window !== 'undefined') {
      return (window as any).__memStorage?.[key] || null;
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      console.warn('Storage write blocked, using memory fallback:', e);
    }
    if (typeof window !== 'undefined') {
      if (!(window as any).__memStorage) {
        (window as any).__memStorage = {};
      }
      (window as any).__memStorage[key] = value;
    }
  }
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'prospector' | 'leads' | 'campaigns' | 'settings'>('prospector');
  
  // Search parameters
  const [category, setCategory] = useState('security systems');
  const [location, setLocation] = useState('Los Angeles, CA');
  const [numResults, setNumResults] = useState(5);
  
  // Config keys
  const [perplexityKey, setPerplexityKey] = useState('');
  const [resendKey, setResendKey] = useState('');
  
  // App states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [logs, setLogs] = useState<string[]>(['Dashboard initialized. Ready for operations.']);
  const [scraping, setScraping] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
 
  // Load saved credentials & leads
  useEffect(() => {
    const savedPKey = safeStorage.getItem('gobiya_perplexity_key') || '';
    const savedRKey = safeStorage.getItem('gobiya_resend_key') || '';
    setPerplexityKey(savedPKey);
    setResendKey(savedRKey);
    
    fetchLeads();
  }, []);
 
  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);
 
  const saveConfig = () => {
    safeStorage.setItem('gobiya_perplexity_key', perplexityKey);
    safeStorage.setItem('gobiya_resend_key', resendKey);
    addLog('System Configuration updated successfully.');
    alert('API Keys saved locally to your browser session.');
  };

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${time}] ${message}`]);
  };

  const fetchLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch('/api/prospector/leads');
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads(data.leads || []);
      }
    } catch (err) {
      addLog('Failed to fetch leads from server database.');
    } finally {
      setLoadingLeads(false);
    }
  };

  const clearLeads = async () => {
    if (!confirm('Are you sure you want to purge all prospects from the database? This action is irreversible.')) return;
    try {
      const res = await fetch('/api/prospector/leads', { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads([]);
        addLog('Prospects database cleared successfully.');
      }
    } catch (err) {
      addLog('Error clearing database records.');
    }
  };

  const handleRunProspector = async (e: React.FormEvent) => {
    e.preventDefault();
    setScraping(true);
    setError('');
    setLogs([]);
    addLog(`Establishing scraping task targeting category: "${category}" in location: "${location}"...`);

    try {
      const res = await fetch('/api/prospector/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          location,
          numResults,
          perplexityKey,
          resendKey
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.logs) {
          data.logs.forEach((logMsg: string) => addLog(logMsg));
        }
        addLog(`Leads acquisition finished. Ingested ${data.leads.length} rows.`);
        fetchLeads();
      } else {
        setError(data.error || 'Failed to complete leads acquisition.');
        addLog(`ERROR: ${data.error || 'Scraping process crashed.'}`);
      }
    } catch (err) {
      setError('A connection error occurred during scraping.');
      addLog('FATAL: Lost contact with serverless scraping engine.');
    } finally {
      setScraping(false);
    }
  };

  const filteredLeads = leads.filter(l => 
    l.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white relative font-sans selection:bg-[#F26522] selection:text-white flex flex-col justify-between">
      <CustomCursor />
      
      {/* Global Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-40" />

      <Header theme="dark" />

      <main className="flex-grow max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 py-24 relative z-20">
        
        {/* Dashboard Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-8 border-b border-white/10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white font-display">
              B2B Lead Prospector <span className="text-[#F26522]">Engine</span>
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Automated cold outreach pipeline &amp; Perplexity AI search dashboard.
            </p>
          </div>
          
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/[0.02] hover:bg-red-950/20 hover:border-red-900/50 hover:text-red-200 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Terminate Session
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2 border-b border-white/5">
          {[
            { id: 'prospector', label: 'AI Prospector', icon: <Terminal className="w-4 h-4" /> },
            { id: 'leads', label: 'Active Leads Database', icon: <Database className="w-4 h-4" /> },
            { id: 'campaigns', label: 'Campaign Drip Logs', icon: <Send className="w-4 h-4" /> },
            { id: 'settings', label: 'API Integrations', icon: <Settings className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'border-[#F26522] text-white bg-white/[0.02]' 
                  : 'border-transparent text-gray-500 hover:text-gray-300'
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="min-h-[450px]">
          
          {/* TAB 1: PROSPECTOR */}
          {activeTab === 'prospector' && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-8 items-start">
              {/* Form panel */}
              <div className="bg-black/40 border border-white/10 p-8 rounded-2xl relative overflow-hidden backdrop-blur-md">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Play className="w-5 h-5 text-[#F26522]" /> Search Parameters
                </h2>
                
                <form onSubmit={handleRunProspector} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 font-mono">B2B Category</label>
                      <input 
                        type="text" 
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. security systems, access control"
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 font-mono">Target Location</label>
                      <input 
                        type="text" 
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Los Angeles, CA"
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 font-mono">Leads Search Limit</label>
                    <select
                      value={numResults}
                      onChange={(e) => setNumResults(Number(e.target.value))}
                      className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors"
                    >
                      <option value={3} className="bg-[#050505]">3 Results (Fast Audit)</option>
                      <option value={5} className="bg-[#050505]">5 Results (Standard Scan)</option>
                      <option value={10} className="bg-[#050505]">10 Results (Deep Dive)</option>
                      <option value={20} className="bg-[#050505]">20 Results (Mass Scrape)</option>
                    </select>
                  </div>

                  {/* Warning if no key configured */}
                  {!perplexityKey && (
                    <div className="bg-amber-950/20 border border-amber-500/20 px-4 py-3 text-xs text-amber-200 rounded-lg flex items-start gap-2 font-mono">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                      <div>
                        No Perplexity API Key provided. System will simulate leads capture using local pre-verified B2B records. Add keys in the Integrations tab to connect to live Perplexity AI.
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={scraping}
                    className="w-full group bg-[#F26522] hover:bg-[#e05a1a] disabled:bg-gray-800 disabled:text-gray-500 text-white font-semibold py-3.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    {scraping ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Scraping Live Search Pack...
                      </>
                    ) : (
                      <>
                        Run AI Scraper &amp; Ingest Pipeline
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Console logs output */}
              <div className="flex flex-col h-full min-h-[380px] bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden font-mono shadow-2xl relative">
                <div className="bg-white/[0.03] border-b border-white/10 px-5 py-3 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                    <span className="ml-2 font-semibold">terminal@gobiya-prospector</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#F26522] font-semibold animate-pulse">Live Output</span>
                </div>
                
                <div className="flex-grow p-5 overflow-y-auto text-xs space-y-2 select-text selection:bg-[#F26522]/40 max-h-[350px]">
                  {logs.map((log, index) => (
                    <div key={index} className="text-gray-300 leading-relaxed break-all">
                      <span className="text-[#F26522] mr-2">&gt;</span>
                      {log}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVE LEADS DATABASE */}
          {activeTab === 'leads' && (
            <div className="bg-black/40 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-md relative overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="relative w-full max-w-[350px]">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search company, category, contact..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button 
                    onClick={fetchLeads}
                    className="px-4 py-2 border border-white/10 hover:border-white/20 bg-white/[0.02] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Refresh List
                  </button>
                  <button 
                    onClick={clearLeads}
                    className="flex items-center gap-1.5 px-4 py-2 border border-red-500/20 hover:border-red-500/50 bg-red-950/10 hover:bg-red-950/20 text-red-300 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Purge Table
                  </button>
                </div>
              </div>

              {loadingLeads ? (
                <div className="text-center py-20 text-gray-500 font-mono text-xs">
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin inline-block mr-2" />
                  Querying database tables...
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-20 text-gray-500 font-mono text-xs">
                  <AlertTriangle className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                  No prospects found in database. Ingest leads via the AI Prospector terminal tab.
                </div>
              ) : (
                <div className="overflow-x-auto -mx-6 sm:-mx-8">
                  <table className="w-full border-collapse min-w-[800px] text-left text-xs">
                    <thead>
                      <tr className="bg-white/[0.03] border-y border-white/10 text-gray-400 font-semibold uppercase tracking-widest text-[10px]">
                        <th className="py-4 px-6">Company &amp; Owner</th>
                        <th className="py-4 px-6">Email Address</th>
                        <th className="py-4 px-6">Phone Number</th>
                        <th className="py-4 px-6">Website / Domain</th>
                        <th className="py-4 px-6">Silo &amp; Location</th>
                        <th className="py-4 px-6 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredLeads.map((lead, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-semibold text-white">{lead.company_name}</div>
                            <div className="text-gray-500 mt-1">{lead.contact_name}</div>
                          </td>
                          <td className="py-4 px-6 font-mono text-gray-300">{lead.email}</td>
                          <td className="py-4 px-6 font-mono text-gray-400">{lead.phone || 'N/A'}</td>
                          <td className="py-4 px-6">
                            {lead.website ? (
                              <a 
                                href={lead.website} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[#F26522] hover:underline"
                              >
                                {lead.website.replace(/^https?:\/\/(www\.)?/, '')}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-gray-600">N/A</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-gray-300 capitalize">{lead.category}</div>
                            <div className="text-gray-500 mt-0.5">{lead.location}</div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-semibold
                              ${lead.status === 'welcome_sent'
                                ? 'bg-green-500/10 text-green-300 border border-green-500/30'
                                : lead.status === 'clicked'
                                  ? 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                                  : lead.status === 'booked'
                                    ? 'bg-[#F26522]/15 text-[#F26522] border border-[#F26522]/30 font-bold'
                                    : 'bg-gray-800/50 text-gray-400 border border-gray-700/50'
                              }
                            `}>
                              <span className={`w-1.5 h-1.5 rounded-full 
                                ${lead.status === 'welcome_sent' ? 'bg-green-500' 
                                  : lead.status === 'clicked' ? 'bg-blue-500'
                                    : lead.status === 'booked' ? 'bg-[#F26522]'
                                      : 'bg-gray-400'
                                }`} 
                              />
                              {lead.status === 'welcome_sent' ? 'Welcome Sent' 
                                : lead.status === 'clicked' ? 'Clicked Email'
                                  : lead.status === 'booked' ? 'Call Booked'
                                    : 'Queued'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CAMPAIGNS */}
          {activeTab === 'campaigns' && (
            <div className="bg-black/40 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-md relative overflow-hidden">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#F26522]" /> Active Nurture Pipeline Logs
              </h2>
              
              {leads.length === 0 ? (
                <div className="text-center py-20 text-gray-500 font-mono text-xs">
                  No campaigns running. Ingest leads via AI Prospector to trigger drip workflows.
                </div>
              ) : (
                <div className="space-y-10">
                  {leads.slice(0, 3).map((lead, idx) => (
                    <div key={idx} className="border border-white/5 bg-white/[0.01] p-6 rounded-xl relative overflow-hidden">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-white/5">
                        <div>
                          <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">Drip Target Pipeline</span>
                          <h3 className="text-lg font-bold text-white mt-1">{lead.company_name}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">Contact: {lead.contact_name} ({lead.email})</p>
                        </div>
                        <span className="bg-green-500/10 text-green-300 border border-green-500/20 px-3 py-1 rounded-full text-[10px] uppercase font-semibold">
                          Active Campaigns
                        </span>
                      </div>

                      {/* Timeline flow */}
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                        {/* Timeline background bar */}
                        <div className="absolute top-[28px] left-[15px] right-[15px] h-[2px] bg-white/5 hidden md:block" />

                        {[
                          { title: 'Email 1: Welcome Audit', desc: 'Custom SEO / secure audit presentation.', status: 'sent', delay: 'Instant', icon: <CheckCircle2 className="w-5 h-5 text-green-500" /> },
                          { title: 'Email 2: steve\'s philosophy', desc: 'B2B SEO vs vanity traffic frameworks.', status: 'scheduled', delay: '24 Hours Later', icon: <Clock className="w-5 h-5 text-gray-600" /> },
                          { title: 'Email 3: Case Showcase', desc: 'American Livescan & SmileCenter data.', status: 'scheduled', delay: '3 Days Later', icon: <Clock className="w-5 h-5 text-gray-600" /> },
                          { title: 'Email 4: Objection Killer', desc: '"Why cheap SEO is expensive" breakdown.', status: 'scheduled', delay: '5 Days Later', icon: <Clock className="w-5 h-5 text-gray-600" /> },
                          { title: 'Email 5: Booking Invite', desc: 'Direct strategy call booking trigger.', status: 'scheduled', delay: '7 Days Later', icon: <Clock className="w-5 h-5 text-gray-600" /> },
                        ].map((step, sIdx) => (
                          <div key={sIdx} className="relative z-10 flex md:flex-col items-start gap-4 md:gap-0">
                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center mb-3
                              ${step.status === 'sent' 
                                ? 'bg-green-500/10 border-green-500/30' 
                                : 'bg-black border-white/10'
                              }
                            `}>
                              {step.icon}
                            </div>
                            <div>
                              <h4 className="text-[13px] font-semibold text-white">{step.title}</h4>
                              <p className="text-[11px] text-[#F26522] font-mono mt-1">{step.delay}</p>
                              <p className="text-xs text-gray-500 mt-2 leading-relaxed">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-black/40 border border-white/10 p-8 rounded-2xl backdrop-blur-md max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#F26522]" /> API Credentials
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 font-mono">Perplexity AI API Key</label>
                  <input
                    type="password"
                    placeholder="pplx-..."
                    value={perplexityKey}
                    onChange={(e) => setPerplexityKey(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors font-mono"
                  />
                  <p className="text-[10px] text-gray-600 mt-2 font-mono">Used to fetch real B2B leads dynamically using the Sonar models.</p>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 font-mono">Resend API Key</label>
                  <input
                    type="password"
                    placeholder="re_..."
                    value={resendKey}
                    onChange={(e) => setResendKey(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors font-mono"
                  />
                  <p className="text-[10px] text-gray-600 mt-2 font-mono">Used to coordinate automated outreach welcome emails via Resend's API.</p>
                </div>

                <button
                  onClick={saveConfig}
                  className="w-full bg-[#F26522] hover:bg-[#e05a1a] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Save Keys Securely to Browser
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
