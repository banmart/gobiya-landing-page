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
  
  // Custom Prompts & Accordion State
  const [focusPrompt, setFocusPrompt] = useState('Find exactly {limit} active {category} businesses in {location} that have a publicly listed contact email address. You MUST only return businesses for which a valid public email address exists. If a business does not have a public email address, skip it and find another business in that category and location that does. Continue searching until you have exactly {limit} unique businesses with verified emails. Return a JSON array of objects, each containing: company_name, contact_name, email, phone, website, category, location. Ensure all email values are non-null and valid. Do not wrap in markdown other than json.');
  const [personaPrompt, setPersonaPrompt] = useState('You are Steve Martin, Founder of Gobiya, a premier technical SEO and custom React web development agency.');
  const [customPrompt, setCustomPrompt] = useState('Write a highly personalized, direct, engineering-focused cold outreach email to {contact_name} at {company_name} located in {location}. Their website is {website} and their category is {category}.\n\nFocus the pitch on evaluating their search overview citation presence (Generative Engine Optimization) and security architecture. The tone must be engineering-first, strictly professional, concise (under 100 words), and zero sales fluff.\nPropose a quick 15-minute forensic pipeline audit.');
  const [showAdvancedPrompts, setShowAdvancedPrompts] = useState(false);

  // App states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [logs, setLogs] = useState<string[]>(['Dashboard initialized. Ready for operations.']);
  const [scraping, setScraping] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewEmail, setPreviewEmail] = useState<{ subject: string; body: string } | null>(null);
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);
  const [testEmail, setTestEmail] = useState('');
  const [testingEmail, setTestingEmail] = useState(false);

  // Form states for Add/Edit
  const [formCompany, setFormCompany] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formWebsite, setFormWebsite] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formStatus, setFormStatus] = useState('new');

  const [hasServerPerplexityKey, setHasServerPerplexityKey] = useState(false);
  const [hasServerResendKey, setHasServerResendKey] = useState(false);

  const checkServerConfig = async () => {
    try {
      const res = await fetch('/api/prospector/config');
      const data = await res.json();
      if (res.ok && data.success) {
        setHasServerPerplexityKey(data.hasPerplexityKey);
        setHasServerResendKey(data.hasResendKey);
      }
    } catch (e) {
      console.warn('Failed to detect server keys:', e);
    }
  };
 
  // Load saved credentials & leads
  useEffect(() => {
    const savedPKey = safeStorage.getItem('gobiya_perplexity_key') || '';
    const savedRKey = safeStorage.getItem('gobiya_resend_key') || '';
    const savedFocus = safeStorage.getItem('gobiya_focus_prompt') || '';
    const savedPersona = safeStorage.getItem('gobiya_persona_prompt') || '';
    const savedCustom = safeStorage.getItem('gobiya_custom_prompt') || '';

    setPerplexityKey(savedPKey);
    setResendKey(savedRKey);

    const newDefaultFocus = 'Find exactly {limit} active {category} businesses in {location} that have a publicly listed contact email address. You MUST only return businesses for which a valid public email address exists. If a business does not have a public email address, skip it and find another business in that category and location that does. Continue searching until you have exactly {limit} unique businesses with verified emails. Return a JSON array of objects, each containing: company_name, contact_name, email, phone, website, category, location. Ensure all email values are non-null and valid. Do not wrap in markdown other than json.';

    let finalFocus = savedFocus;
    if (!savedFocus || savedFocus.includes('security systems (surveillance, access control)') || savedFocus.includes('verify their emails and web presence') || savedFocus.includes('You MUST find and return a valid contact email address (like info@')) {
      finalFocus = newDefaultFocus;
      safeStorage.setItem('gobiya_focus_prompt', newDefaultFocus);
    }
    setFocusPrompt(finalFocus);
    if (savedPersona) setPersonaPrompt(savedPersona);
    if (savedCustom) setCustomPrompt(savedCustom);
    
    fetchLeads();
    checkServerConfig();
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
    safeStorage.setItem('gobiya_focus_prompt', focusPrompt);
    safeStorage.setItem('gobiya_persona_prompt', personaPrompt);
    safeStorage.setItem('gobiya_custom_prompt', customPrompt);
    addLog('[INFO] System Configuration and AI templates updated.');
    alert('API Keys and Custom Prompts saved locally to your browser.');
    checkServerConfig();
  };

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${time}] ${message}`]);
  };

  const resetForm = () => {
    setFormCompany('');
    setFormContact('');
    setFormEmail('');
    setFormPhone('');
    setFormWebsite('');
    setFormCategory('');
    setFormLocation('');
    setFormStatus('new');
  };

  const handleAddLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/prospector/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: formCompany,
          contact_name: formContact,
          email: formEmail,
          phone: formPhone,
          website: formWebsite,
          category: formCategory,
          location: formLocation,
          status: formStatus
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        addLog(`[SUCCESS] Manually created new lead: ${formCompany} (${formEmail})`);
        setShowAddModal(false);
        resetForm();
        fetchLeads();
      } else {
        alert(data.error || 'Failed to add lead.');
      }
    } catch (err) {
      addLog('[ERROR] Error creating manual lead.');
    }
  };

  const handleEditLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;
    try {
      const res = await fetch('/api/prospector/lead', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedLead.id,
          company_name: formCompany,
          contact_name: formContact,
          email: formEmail,
          phone: formPhone,
          website: formWebsite,
          category: formCategory,
          location: formLocation,
          status: formStatus
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        addLog(`[SUCCESS] Updated lead info: ${formCompany} (${formEmail})`);
        setShowEditModal(false);
        setSelectedLead(null);
        resetForm();
        fetchLeads();
      } else {
        alert(data.error || 'Failed to update lead.');
      }
    } catch (err) {
      addLog('[ERROR] Error updating lead.');
    }
  };

  const handleDeleteLead = async (leadId?: string, leadEmail?: string) => {
    if (!confirm('Are you sure you want to delete this prospect?')) return;
    try {
      const res = await fetch(`/api/prospector/lead?id=${leadId || ''}&email=${leadEmail || ''}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok && data.success) {
        addLog(`[DATABASE] Deleted lead: ${leadEmail}`);
        fetchLeads();
      } else {
        alert(data.error || 'Failed to delete lead.');
      }
    } catch (err) {
      addLog(`[ERROR] Error deleting lead: ${leadEmail}`);
    }
  };

  const handleSendSingleEmail = async (lead: Lead) => {
    setSendingEmailId(lead.id || lead.email);
    addLog(`[INFO] Personalizing and sending email to ${lead.company_name} (${lead.email})...`);
    try {
      const res = await fetch('/api/prospector/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead,
          resendKey,
          systemPrompt: personaPrompt,
          customPrompt
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        addLog(`[SUCCESS] Email sent to ${lead.email}!`);
        setPreviewEmail({ subject: data.subject, body: data.body });
        setShowPreviewModal(true);
        fetchLeads();
      } else {
        addLog(`[ERROR] Failed to send email to ${lead.email}: ${data.error}`);
        alert(data.error || 'Failed to send outreach email.');
      }
    } catch (err) {
      addLog(`[ERROR] Connection failure trying to send email to ${lead.email}`);
    } finally {
      setSendingEmailId(null);
    }
  };

  const handleSendTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail) return;
    setTestingEmail(true);
    addLog(`[INFO] Sending test outreach email to: ${testEmail}...`);
    try {
      const res = await fetch('/api/prospector/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testEmail,
          resendKey,
          systemPrompt: personaPrompt,
          customPrompt
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        addLog(`[SUCCESS] Test email sent to ${testEmail}!`);
        setPreviewEmail({ subject: data.subject, body: data.body });
        setShowPreviewModal(true);
        alert(`Test email sent successfully! Subject: ${data.subject}`);
      } else {
        addLog(`[ERROR] Test email failed: ${data.error}`);
        alert(data.error || 'Failed to send test email.');
      }
    } catch (err) {
      addLog(`[ERROR] Connection error trying to send test email`);
    } finally {
      setTestingEmail(false);
    }
  };

  const openEditModal = (lead: Lead) => {
    setSelectedLead(lead);
    setFormCompany(lead.company_name);
    setFormContact(lead.contact_name);
    setFormEmail(lead.email);
    setFormPhone(lead.phone || '');
    setFormWebsite(lead.website || '');
    setFormCategory(lead.category || '');
    setFormLocation(lead.location || '');
    setFormStatus(lead.status);
    setShowEditModal(true);
  };

  const getDripSteps = (lead: Lead) => {
    const isWelcomeSent = lead.status === 'welcome_sent' || lead.status === 'clicked' || lead.status === 'booked';
    const isClicked = lead.status === 'clicked' || lead.status === 'booked';
    const isBooked = lead.status === 'booked';

    return [
      { title: 'Email 1: Welcome Audit', desc: 'Custom SEO & secure audit presentation.', status: isWelcomeSent ? 'sent' : 'pending', delay: 'Instant', icon: isWelcomeSent ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Clock className="w-5 h-5 text-gray-600" /> },
      { title: 'Email 2: Steve\'s Philosophy', desc: 'B2B SEO vs vanity traffic frameworks.', status: isClicked ? 'sent' : isWelcomeSent ? 'scheduled' : 'pending', delay: '24 Hours Later', icon: isClicked ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : isWelcomeSent ? <Clock className="w-5 h-5 text-yellow-500" /> : <Clock className="w-5 h-5 text-gray-600" /> },
      { title: 'Email 3: Case Showcase', desc: 'American Livescan & SmileCenter data.', status: isBooked ? 'sent' : isClicked ? 'scheduled' : 'pending', delay: '3 Days Later', icon: isBooked ? <CheckCircle2 className="w-5 h-5 text-[#F26522]" /> : isClicked ? <Clock className="w-5 h-5 text-gray-600" /> : <Clock className="w-5 h-5 text-gray-600" /> },
      { title: 'Email 4: Objection Killer', desc: '"Why cheap SEO is expensive" breakdown.', status: isBooked ? 'completed' : 'pending', delay: '5 Days Later', icon: isBooked ? <CheckCircle2 className="w-5 h-5 text-gray-400" /> : <Clock className="w-5 h-5 text-gray-600" /> },
      { title: 'Email 5: Booking Invite', desc: 'Direct strategy call booking trigger.', status: isBooked ? 'completed' : 'pending', delay: '7 Days Later', icon: isBooked ? <CheckCircle2 className="w-5 h-5 text-gray-400" /> : <Clock className="w-5 h-5 text-gray-600" /> },
    ];
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
          resendKey,
          focusPrompt,
          systemPrompt: personaPrompt,
          customPrompt
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

                  {/* Collapsible Advanced prompts section */}
                  <div className="border border-white/5 bg-white/[0.01] rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setShowAdvancedPrompts(!showAdvancedPrompts)}
                      className="w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider text-gray-400 font-semibold hover:bg-white/[0.02] transition-colors"
                    >
                      <span>Advanced AI &amp; Scraper Settings</span>
                      <span>{showAdvancedPrompts ? '▲' : '▼'}</span>
                    </button>
                    {showAdvancedPrompts && (
                      <div className="p-4 border-t border-white/5 space-y-4">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1.5 font-mono">Perplexity Target Prompt Focus</label>
                          <textarea
                            value={focusPrompt}
                            onChange={(e) => setFocusPrompt(e.target.value)}
                            className="w-full h-24 bg-black/40 border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs focus:outline-none transition-colors font-mono"
                            placeholder="Use {limit}, {category}, and {location} variables."
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1.5 font-mono">Outreach Email Persona / Context</label>
                          <textarea
                            value={personaPrompt}
                            onChange={(e) => setPersonaPrompt(e.target.value)}
                            className="w-full h-20 bg-black/40 border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs focus:outline-none transition-colors font-mono"
                            placeholder="Persona for the cold outreach script."
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-1.5 font-mono">Outreach Email Pitch Template</label>
                          <textarea
                            value={customPrompt}
                            onChange={(e) => setCustomPrompt(e.target.value)}
                            className="w-full h-28 bg-black/40 border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs focus:outline-none transition-colors font-mono"
                            placeholder="Supports {contact_name}, {company_name}, {location}, {website}, and {category} templates."
                          />
                        </div>
                      </div>
                    )}
                  </div>

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
                  {logs.map((log, index) => {
                    let colorClass = 'text-gray-300';
                    let label = '';
                    let message = log;

                    // Parse timestamp if present (e.g. "[10:20:30 AM] [INFO] message")
                    const timeMatch = log.match(/^(\[[^\]]+\])\s+(.*)$/);
                    let timePrefix = '';
                    if (timeMatch) {
                      timePrefix = timeMatch[1] + ' ';
                      message = timeMatch[2];
                    }

                    if (message.startsWith('[INFO]')) {
                      colorClass = 'text-blue-300';
                      label = '[INFO]';
                      message = message.substring(6).trim();
                    } else if (message.startsWith('[SUCCESS]')) {
                      colorClass = 'text-green-400 font-semibold';
                      label = '[SUCCESS]';
                      message = message.substring(9).trim();
                    } else if (message.startsWith('[ERROR]')) {
                      colorClass = 'text-red-400 font-semibold';
                      label = '[ERROR]';
                      message = message.substring(7).trim();
                    } else if (message.startsWith('[DATABASE]')) {
                      colorClass = 'text-purple-300';
                      label = '[DATABASE]';
                      message = message.substring(10).trim();
                    } else if (message.startsWith('[GEMINI]')) {
                      colorClass = 'text-cyan-300';
                      label = '[GEMINI]';
                      message = message.substring(8).trim();
                    } else if (message.startsWith('[RESEND]')) {
                      colorClass = 'text-pink-300';
                      label = '[RESEND]';
                      message = message.substring(8).trim();
                    }

                    return (
                      <div key={index} className="leading-relaxed break-all font-mono">
                        <span className="text-[#F26522] mr-2">&gt;</span>
                        <span className={colorClass}>
                          {timePrefix && <span className="text-gray-600 mr-1">{timePrefix}</span>}
                          {label && <span className="opacity-80 mr-1.5 font-bold">{label}</span>}
                          {message}
                        </span>
                      </div>
                    );
                  })}
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

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-wrap">
                  <button 
                    onClick={() => { resetForm(); setShowAddModal(true); }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    + Add Lead
                  </button>
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
                        <th className="py-4 px-6 text-right">Actions</th>
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
                          <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => handleSendSingleEmail(lead)}
                              disabled={sendingEmailId === (lead.id || lead.email)}
                              className="p-1.5 rounded bg-green-500/10 hover:bg-green-500/20 text-green-300 border border-green-500/20 hover:border-green-500/40 transition-colors inline-flex items-center justify-center cursor-pointer"
                              title="Send personalized AI email outreach"
                            >
                              {sendingEmailId === (lead.id || lead.email) ? (
                                <span className="w-3.5 h-3.5 border-2 border-green-300/30 border-t-green-300 rounded-full animate-spin" />
                              ) : (
                                <Mail className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => openEditModal(lead)}
                              className="p-1.5 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 hover:border-blue-500/40 transition-colors inline-flex items-center justify-center cursor-pointer"
                              title="Edit Lead Details"
                            >
                              <Settings className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id, lead.email)}
                              className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 hover:border-red-500/40 transition-colors inline-flex items-center justify-center cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}          {/* TAB 3: CAMPAIGNS */}
          {activeTab === 'campaigns' && (
            <div className="bg-black/40 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-md relative overflow-hidden">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#F26522]" /> Active Nurture Pipeline Logs
              </h2>
              
              {leads.filter(l => l.status !== 'new').length === 0 ? (
                <div className="text-center py-20 text-gray-500 font-mono text-xs">
                  No active drip campaigns. Ingest leads via AI Prospector, or click the "Send Email" action on any lead to trigger outreach drip campaigns.
                </div>
              ) : (
                <div className="space-y-10">
                  {leads.filter(l => l.status !== 'new').map((lead, idx) => {
                    const dripSteps = getDripSteps(lead);
                    return (
                      <div key={idx} className="border border-white/5 bg-white/[0.01] p-6 rounded-xl relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-white/5">
                          <div>
                            <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">Drip Target Pipeline</span>
                            <h3 className="text-lg font-bold text-white mt-1">{lead.company_name}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Contact: {lead.contact_name} ({lead.email})</p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button
                              onClick={async () => {
                                const nextStatus = lead.status === 'welcome_sent' ? 'clicked' : lead.status === 'clicked' ? 'booked' : 'welcome_sent';
                                try {
                                  const res = await fetch('/api/prospector/lead', {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ id: lead.id, email: lead.email, status: nextStatus })
                                  });
                                  if (res.ok) {
                                    addLog(`[DATABASE] Manually advanced campaign drip status of ${lead.company_name} to ${nextStatus}`);
                                    fetchLeads();
                                  }
                                } catch (e) {
                                  console.error(e);
                                }
                              }}
                              className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1.5 border border-white/10 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.03] transition-colors cursor-pointer text-gray-400 hover:text-white"
                            >
                              Advance Stage
                            </button>
                            <span className="bg-green-500/10 text-green-300 border border-green-500/20 px-3 py-1 rounded-full text-[10px] uppercase font-semibold">
                              Active Campaigns
                            </span>
                          </div>
                        </div>

                        {/* Timeline flow */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                          {/* Timeline background bar */}
                          <div className="absolute top-[28px] left-[15px] right-[15px] h-[2px] bg-white/5 hidden md:block" />

                          {dripSteps.map((step, sIdx) => (
                            <div key={sIdx} className="relative z-10 flex md:flex-col items-start gap-4 md:gap-0">
                              <div className={`w-8 h-8 rounded-full border flex items-center justify-center mb-3
                                ${step.status === 'sent' 
                                  ? 'bg-green-500/10 border-green-500/30' 
                                  : step.status === 'scheduled'
                                    ? 'bg-yellow-500/10 border-yellow-500/30 animate-pulse'
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
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-black/40 border border-white/10 p-8 rounded-2xl backdrop-blur-md max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#F26522]" /> API Credentials &amp; Testing
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 font-mono flex justify-between items-center">
                    <span>Perplexity AI API Key</span>
                    {hasServerPerplexityKey && (
                      <span className="text-green-400 text-[9px] uppercase tracking-widest bg-green-500/10 px-2 py-0.5 border border-green-500/30 rounded">Active in Environment</span>
                    )}
                  </label>
                  <input
                    type="password"
                    placeholder={hasServerPerplexityKey ? "•••••••• (Using Environment Key)" : "pplx-..."}
                    value={perplexityKey}
                    onChange={(e) => setPerplexityKey(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors font-mono"
                  />
                  <p className="text-[10px] text-gray-600 mt-2 font-mono">Used to fetch real B2B leads dynamically using the Sonar models.</p>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 font-mono flex justify-between items-center">
                    <span>Resend API Key</span>
                    {hasServerResendKey && (
                      <span className="text-green-400 text-[9px] uppercase tracking-widest bg-green-500/10 px-2 py-0.5 border border-green-500/30 rounded">Active in Environment</span>
                    )}
                  </label>
                  <input
                    type="password"
                    placeholder={hasServerResendKey ? "•••••••• (Using Environment Key)" : "re_..."}
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
                  Save Settings &amp; AI Templates
                </button>

                <hr className="border-white/5" />

                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-[#F26522]">
                    <Mail className="w-4 h-4" /> Send Test Outreach Email
                  </h3>
                  <form onSubmit={handleSendTestEmail} className="space-y-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 font-mono">Recipient Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. test@yourdomain.com"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={testingEmail || (!resendKey && !hasServerResendKey)}
                      className="w-full bg-white/[0.02] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 disabled:bg-gray-800 disabled:text-gray-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-mono"
                    >
                      {testingEmail ? 'Sending Test...' : 'Send Test Email'}
                    </button>
                    {(!resendKey && !hasServerResendKey) && (
                      <p className="text-[10px] text-amber-500 font-mono">Configure and save your Resend API key first to send test emails.</p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ADD LEAD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-white/[0.02] border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Create New Lead Profile</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-white transition-colors cursor-pointer text-xs">✕</button>
            </div>
            <form onSubmit={handleAddLeadSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Company Name</label>
                  <input type="text" required value={formCompany} onChange={(e) => setFormCompany(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Contact Name</label>
                  <input type="text" required value={formContact} onChange={(e) => setFormContact(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Email Address</label>
                  <input type="email" required value={formEmail} onChange={(e) => setFormEmail(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Phone Number</label>
                  <input type="text" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Website / Domain</label>
                <input type="text" value={formWebsite} onChange={(e) => setFormWebsite(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Category / Silo</label>
                  <input type="text" value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Location</label>
                  <input type="text" value={formLocation} onChange={(e) => setFormLocation(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Prospect Pipeline Status</label>
                <select value={formStatus} onChange={(e) => setFormStatus(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none">
                  <option value="new" className="bg-[#0c0c0c]">new (Queued)</option>
                  <option value="welcome_sent" className="bg-[#0c0c0c]">welcome_sent (Welcome Sent)</option>
                  <option value="clicked" className="bg-[#0c0c0c]">clicked (Clicked Email)</option>
                  <option value="booked" className="bg-[#0c0c0c]">booked (Call Booked)</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-white/10 hover:bg-white/[0.02] text-xs font-semibold uppercase tracking-wider cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT LEAD MODAL */}
      {showEditModal && selectedLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-white/[0.02] border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Edit Lead Profile</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-white transition-colors cursor-pointer text-xs">✕</button>
            </div>
            <form onSubmit={handleEditLeadSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Company Name</label>
                  <input type="text" required value={formCompany} onChange={(e) => setFormCompany(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Contact Name</label>
                  <input type="text" required value={formContact} onChange={(e) => setFormContact(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Email Address</label>
                  <input type="email" required disabled value={formEmail} className="w-full bg-white/[0.01] border border-white/5 rounded px-3 py-2 text-xs text-gray-500 focus:outline-none cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Phone Number</label>
                  <input type="text" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Website / Domain</label>
                <input type="text" value={formWebsite} onChange={(e) => setFormWebsite(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Category / Silo</label>
                  <input type="text" value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Location</label>
                  <input type="text" value={formLocation} onChange={(e) => setFormLocation(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1 font-mono">Prospect Pipeline Status</label>
                <select value={formStatus} onChange={(e) => setFormStatus(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 focus:border-[#F26522] rounded px-3 py-2 text-xs text-white focus:outline-none">
                  <option value="new" className="bg-[#0c0c0c]">new (Queued)</option>
                  <option value="welcome_sent" className="bg-[#0c0c0c]">welcome_sent (Welcome Sent)</option>
                  <option value="clicked" className="bg-[#0c0c0c]">clicked (Clicked Email)</option>
                  <option value="booked" className="bg-[#0c0c0c]">booked (Call Booked)</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 border border-white/10 hover:bg-white/[0.02] text-xs font-semibold uppercase tracking-wider cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EMAIL PREVIEW MODAL */}
      {showPreviewModal && previewEmail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="bg-white/[0.02] border-b border-white/10 px-6 py-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white font-mono">Personalized AI Outreach Preview</h3>
              <button onClick={() => setShowPreviewModal(false)} className="text-gray-500 hover:text-white transition-colors cursor-pointer text-xs">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4 flex-grow">
              <div className="bg-black/50 border border-white/5 p-4 rounded-lg space-y-2">
                <p className="text-xs text-gray-500 font-mono"><span className="text-[#F26522] font-semibold">Subject:</span> {previewEmail.subject}</p>
              </div>
              <div 
                className="bg-black/30 border border-white/5 p-6 rounded-lg text-sm text-gray-300 leading-relaxed space-y-4 font-sans select-text"
                dangerouslySetInnerHTML={{ __html: previewEmail.body }}
              />
            </div>
            
            <div className="flex justify-end gap-3 p-4 border-t border-white/5 bg-white/[0.01]">
              <button type="button" onClick={() => setShowPreviewModal(false)} className="px-5 py-2 bg-[#F26522] hover:bg-[#e05a1a] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer">Close Preview</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminDashboard;
