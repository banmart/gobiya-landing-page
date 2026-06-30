import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Terminal, Database, Send, Settings, LogOut, 
  Trash2, Play, ExternalLink, ShieldCheck, Mail, CheckCircle2,
  Clock, AlertTriangle, ArrowRight, Upload
} from 'lucide-react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

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
  const [activeTab, setActiveTab] = useState<'prospector' | 'leads' | 'campaigns' | 'settings'>('leads');
  
  // CSV Import States
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvRows, setCsvRows] = useState<any[][]>([]);
  const [assignToDrip, setAssignToDrip] = useState(false);
  const [mapping, setMapping] = useState<Record<string, number>>({
    company_name: -1,
    contact_name: -1,
    email: -1,
    phone: -1,
    website: -1,
    category: -1,
    location: -1
  });
  
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
      { title: 'Email 3: Case Showcase', desc: 'American Livescan & SmileCenter data.', status: isBooked ? 'sent' : isClicked ? 'scheduled' : 'pending', delay: '3 Days Later', icon: isBooked ? <CheckCircle2 className="w-5 h-5 text-[#2F5D50]" /> : isClicked ? <Clock className="w-5 h-5 text-gray-600" /> : <Clock className="w-5 h-5 text-gray-600" /> },
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

  // Simple CSV text parser
  const parseCSV = (text: string): string[][] => {
    const lines: string[][] = [];
    let row: string[] = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i+1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentValue += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(currentValue.trim());
        currentValue = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        row.push(currentValue.trim());
        if (row.length > 1 || row[0] !== '') {
          lines.push(row);
        }
        row = [];
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    if (row.length > 0 || currentValue !== '') {
      row.push(currentValue.trim());
      lines.push(row);
    }
    return lines;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;
      
      try {
        const rows = parseCSV(text);
        if (rows.length < 2) {
          setError('CSV file must contain a header row and at least one data row.');
          return;
        }
        
        const headers = rows[0];
        setCsvHeaders(headers);
        setCsvRows(rows.slice(1));
        
        // Auto-mapping logic
        const newMapping: Record<string, number> = {
          company_name: -1,
          contact_name: -1,
          email: -1,
          phone: -1,
          website: -1,
          category: -1,
          location: -1
        };
        
        headers.forEach((header, index) => {
          const h = header.toLowerCase().trim();
          if (h.includes('company') || h.includes('firm') || h.includes('business') || h.includes('organization') || (h === 'name' && newMapping.company_name === -1)) {
            newMapping.company_name = index;
          } else if (h.includes('contact') || h.includes('owner') || h.includes('person') || h.includes('first name') || h.includes('last name') || h === 'name') {
            newMapping.contact_name = index;
          } else if (h.includes('email') || h.includes('e-mail') || h.includes('mail')) {
            newMapping.email = index;
          } else if (h.includes('phone') || h.includes('tel') || h.includes('mobile') || h.includes('cell')) {
            newMapping.phone = index;
          } else if (h.includes('website') || h.includes('site') || h.includes('url') || h.includes('domain')) {
            newMapping.website = index;
          } else if (h.includes('category') || h.includes('industry') || h.includes('silo') || h.includes('type')) {
            newMapping.category = index;
          } else if (h.includes('location') || h.includes('address') || h.includes('city') || h.includes('state') || h.includes('zip')) {
            newMapping.location = index;
          }
        });
        
        setMapping(newMapping);
        addLog(`[INFO] CSV file parsed successfully: ${rows.length - 1} rows detected.`);
      } catch (err: any) {
        setError('Error parsing CSV file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleImportLeads = async (e: React.FormEvent) => {
    e.preventDefault();
    if (csvRows.length === 0) return;
    if (mapping.company_name === -1 || mapping.email === -1) {
      setError('Company Name and Email mapping are required fields.');
      return;
    }
    
    setScraping(true); // Re-use scraping state for loading spinner
    setError('');
    setLogs([]);
    addLog(`[INFO] Mapping CSV columns against Gobiya Prospects schema...`);
    
    const mappedLeads = csvRows.map(row => {
      return {
        company_name: mapping.company_name !== -1 ? row[mapping.company_name] || '' : '',
        contact_name: mapping.contact_name !== -1 ? row[mapping.contact_name] || '' : '',
        email: mapping.email !== -1 ? row[mapping.email] || '' : '',
        phone: mapping.phone !== -1 ? row[mapping.phone] || '' : '',
        website: mapping.website !== -1 ? row[mapping.website] || '' : '',
        category: mapping.category !== -1 ? row[mapping.category] || '' : '',
        location: mapping.location !== -1 ? row[mapping.location] || '' : ''
      };
    }).filter(lead => lead.company_name && lead.email);
    
    if (mappedLeads.length === 0) {
      setError('No valid leads found (leads must have both a Company Name and an Email Address).');
      setScraping(false);
      return;
    }
    
    addLog(`[INFO] Starting ingestion of ${mappedLeads.length} valid prospects...`);
    
    try {
      const res = await fetch('/api/prospector/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leads: mappedLeads,
          assignToDrip,
          resendKey,
          systemPrompt: personaPrompt,
          customPrompt
        })
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.logs) {
          data.logs.forEach((logMsg: string) => addLog(logMsg));
        }
        addLog(`[SUCCESS] Lead import ingestion pipeline completed. Ingested ${data.leads.length} prospects.`);
        // Reset file state
        setCsvHeaders([]);
        setCsvRows([]);
        fetchLeads();
      } else {
        setError(data.error || 'Failed to complete leads import.');
        addLog(`[ERROR] Ingestion crashed: ${data.error || 'Failed to parse server response.'}`);
      }
    } catch (err) {
      setError('A connection error occurred during lead ingestion.');
      addLog('[ERROR] FATAL: Lost connection to bulk import API endpoint.');
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
    <div className="min-h-screen bg-[#EFEDE5] text-[#15130E] relative font-sans selection:bg-[#2F5D50] selection:text-[#EFEDE5] flex flex-col justify-between">
      <SiteHeader />

      <main className="flex-grow max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 py-24 relative z-20">
        
        {/* Dashboard Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-8 border-b border-[#D3CEC0]">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#15130E] font-display">
              B2B Lead Prospector <span className="text-[#2F5D50]">Engine</span>
            </h1>
            <p className="text-sm text-[#5B564C] mt-2">
              Automated cold outreach pipeline &amp; Perplexity AI search dashboard.
            </p>
          </div>
          
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 border border-[#D3CEC0] bg-white/40 hover:bg-red-50 hover:border-red-200 hover:text-red-800 text-[#15130E] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Terminate Session
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2 border-b border-[#D3CEC0]/50">
          {[
            { id: 'leads', label: 'Active Leads Database', icon: <Database className="w-4 h-4" /> },
            { id: 'prospector', label: 'CSV Importer', icon: <Upload className="w-4 h-4" /> },
            { id: 'campaigns', label: 'Campaign Drip Logs', icon: <Send className="w-4 h-4" /> },
            { id: 'settings', label: 'API Integrations', icon: <Settings className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 border-b-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap
                ${activeTab === tab.id 
                  ? 'border-[#2F5D50] text-[#2F5D50] bg-white/40 font-bold' 
                  : 'border-transparent text-[#5B564C] hover:text-[#15130E]'
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
              <div className="bg-white/60 border border-[#D3CEC0] p-8 rounded-2xl relative overflow-hidden backdrop-blur-md">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-[#15130E]">
                  <Upload className="w-5 h-5 text-[#2F5D50]" /> CSV Lead Ingestion
                </h2>
                
                {csvHeaders.length === 0 ? (
                  <div className="space-y-6">
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#D3CEC0] hover:border-[#2F5D50]/50 p-12 bg-white/40 hover:bg-[#2F5D50]/5 transition-all cursor-pointer group text-center">
                      <Upload className="w-10 h-10 text-[#8B857A] group-hover:text-[#2F5D50] mb-4 transition-colors" />
                      <span className="text-xs uppercase tracking-wider text-[#15130E] font-semibold mb-1 font-mono">Drag &amp; Drop CSV File</span>
                      <span className="text-[10px] text-[#5B564C] font-mono">or click to browse local folders</span>
                      <input 
                        type="file" 
                        accept=".csv" 
                        onChange={handleFileChange}
                        className="hidden" 
                      />
                    </label>
                    
                    <div className="text-[#5B564C] text-[11px] font-mono leading-relaxed bg-white/20 border border-[#D3CEC0]/60 rounded-lg p-4">
                      <p className="font-semibold text-[#15130E] mb-1">&gt; SYSTEM COMPATIBILITY NOTE:</p>
                      <p>CSV files must contain headers and at least two required fields:</p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li><span className="text-[#15130E] font-bold">Company Name</span> (used to define entity brand)</li>
                        <li><span className="text-[#15130E] font-bold">Email Address</span> (used as unique index key)</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleImportLeads} className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#5B564C]">
                          Configure Column Mapping
                        </span>
                        <button 
                          type="button" 
                          onClick={() => { setCsvHeaders([]); setCsvRows([]); }}
                          className="text-[10px] uppercase font-semibold text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                        >
                          Clear File
                        </button>
                      </div>
                      
                      <div className="space-y-1 border border-[#D3CEC0] rounded-lg bg-white/40 p-4">
                        {[
                          { key: 'company_name', label: 'Company Name *', required: true },
                          { key: 'contact_name', label: 'Contact Name', required: false },
                          { key: 'email', label: 'Email Address *', required: true },
                          { key: 'phone', label: 'Phone Number', required: false },
                          { key: 'website', label: 'Website / Domain', required: false },
                          { key: 'category', label: 'B2B Category / Silo', required: false },
                          { key: 'location', label: 'Location', required: false },
                        ].map((field) => (
                          <div key={field.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2.5 border-b border-[#D3CEC0]/40 last:border-b-0">
                            <span className="text-[11px] font-mono font-semibold text-[#15130E]">
                              {field.label}
                            </span>
                            <select
                              value={mapping[field.key]}
                              onChange={(e) => setMapping(prev => ({ ...prev, [field.key]: Number(e.target.value) }))}
                              className="bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-1.5 text-xs text-[#15130E] focus:outline-none w-full sm:w-60 cursor-pointer font-mono"
                            >
                              <option value={-1} className="bg-white text-[#8B857A]">[ Skip / Unmapped ]</option>
                              {csvHeaders.map((header, idx) => (
                                <option key={idx} value={idx} className="bg-white text-[#15130E]">
                                  {header}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white/40 border border-[#D3CEC0] rounded-lg">
                      <input 
                        type="checkbox" 
                        id="assign-to-drip"
                        checked={assignToDrip}
                        onChange={(e) => setAssignToDrip(e.target.checked)}
                        className="rounded border-[#D3CEC0] text-[#2F5D50] focus:ring-[#2F5D50] bg-white cursor-pointer w-4 h-4"
                      />
                      <label htmlFor="assign-to-drip" className="text-xs text-[#15130E] select-none cursor-pointer">
                        Assign to outreach drip campaign (trigger Resend welcome email)
                      </label>
                    </div>

                    {assignToDrip && (
                      <div className="border border-[#D3CEC0] bg-white/30 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setShowAdvancedPrompts(!showAdvancedPrompts)}
                          className="w-full flex items-center justify-between px-4 py-3 text-xs uppercase tracking-wider text-[#5B564C] font-semibold hover:bg-white/40 transition-colors cursor-pointer"
                        >
                          <span>Outreach Email Templates</span>
                          <span>{showAdvancedPrompts ? '▲' : '▼'}</span>
                        </button>
                        {showAdvancedPrompts && (
                          <div className="p-4 border-t border-[#D3CEC0] space-y-4">
                            <div>
                              <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1.5 font-mono">Outreach Email Persona / Context</label>
                              <textarea
                                value={personaPrompt}
                                onChange={(e) => setPersonaPrompt(e.target.value)}
                                className="w-full h-20 bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-colors font-mono"
                                placeholder="Persona for the cold outreach script."
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1.5 font-mono">Outreach Email Pitch Template</label>
                              <textarea
                                value={customPrompt}
                                onChange={(e) => setCustomPrompt(e.target.value)}
                                className="w-full h-28 bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-colors font-mono"
                                placeholder="Supports {contact_name}, {company_name}, {location}, {website}, and {category} templates."
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={scraping}
                      className="w-full group bg-[#2F5D50] hover:bg-[#234A40] disabled:bg-gray-800 disabled:text-gray-500 text-white font-semibold py-3.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
                    >
                      {scraping ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Ingesting CSV Leads...
                        </>
                      ) : (
                        <>
                          Start Import &amp; Ingest Pipeline
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Console logs output */}
              <div className="flex flex-col h-full min-h-[380px] bg-[#0c0c0c] border border-[#D3CEC0] overflow-hidden font-mono shadow-2xl relative">
                <div className="bg-black/80 border-b border-[#D3CEC0] px-5 py-3 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-2 font-semibold">terminal@gobiya-importer</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#2F5D50] font-semibold animate-pulse">Live Output</span>
                </div>
                
                <div className="flex-grow p-5 overflow-y-auto text-xs space-y-2 select-text selection:bg-[#2F5D50]/30 max-h-[350px]">
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
                        <span className="text-[#2F5D50] mr-2">&gt;</span>
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
            <div className="bg-white border border-[#D3CEC0] p-6 sm:p-8 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="relative w-full max-w-[350px]">
                  <span className="absolute inset-y-0 left-3 flex items-center text-[#8B857A]">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search company, category, contact..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/50 border border-[#D3CEC0] focus:border-[#2F5D50] rounded-lg pl-10 pr-4 py-2 text-xs text-[#15130E] focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end flex-wrap">
                  <button 
                    onClick={() => { resetForm(); setShowAddModal(true); }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#2F5D50] hover:bg-[#234A40] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    + Add Lead
                  </button>
                  <button 
                    onClick={fetchLeads}
                    className="px-4 py-2 border border-[#D3CEC0] hover:border-[#15130E] bg-white/40 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-[#15130E]"
                  >
                    Refresh List
                  </button>
                  <button 
                    onClick={clearLeads}
                    className="flex items-center gap-1.5 px-4 py-2 border border-red-200 hover:border-red-400 bg-red-50 hover:bg-red-100 text-red-800 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Purge Table
                  </button>
                </div>
              </div>

              {loadingLeads ? (
                <div className="text-center py-20 text-[#5B564C] font-mono text-xs">
                  <span className="w-5 h-5 border-2 border-[#D3CEC0] border-t-[#2F5D50] rounded-full animate-spin inline-block mr-2" />
                  Querying database tables...
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="text-center py-20 text-[#5B564C] font-mono text-xs">
                  <AlertTriangle className="w-8 h-8 text-[#8B857A] mx-auto mb-3" />
                  No prospects found in database. Ingest leads via the CSV Importer tab.
                </div>
              ) : (
                <div className="overflow-x-auto -mx-6 sm:-mx-8">
                  <table className="w-full border-collapse min-w-[800px] text-left text-xs">
                    <thead>
                      <tr className="bg-[#E7E4D9]/85 border-y border-[#D3CEC0] text-[#5B564C] font-semibold uppercase tracking-widest text-[10px]">
                        <th className="py-4 px-6">Company &amp; Owner</th>
                        <th className="py-4 px-6">Email Address</th>
                        <th className="py-4 px-6">Phone Number</th>
                        <th className="py-4 px-6">Website / Domain</th>
                        <th className="py-4 px-6">Silo &amp; Location</th>
                        <th className="py-4 px-6 text-center">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D3CEC0]/60">
                      {filteredLeads.map((lead, idx) => (
                        <tr key={idx} className="hover:bg-[#E7E4D9]/20 transition-colors">
                          <td className="py-4 px-6">
                            <div className="font-semibold text-[#15130E]">{lead.company_name}</div>
                            <div className="text-[#5B564C] mt-1">{lead.contact_name}</div>
                          </td>
                          <td className="py-4 px-6 font-mono text-[#15130E]">{lead.email}</td>
                          <td className="py-4 px-6 font-mono text-[#5B564C]">{lead.phone || 'N/A'}</td>
                          <td className="py-4 px-6">
                            {lead.website ? (
                              <a 
                                href={lead.website} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[#2F5D50] hover:underline"
                              >
                                {lead.website.replace(/^https?:\/\/(www\.)?/, '')}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-[#15130E] capitalize">{lead.category}</div>
                            <div className="text-[#5B564C] mt-0.5">{lead.location}</div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold
                              ${lead.status === 'welcome_sent'
                                ? 'bg-green-50 text-green-800 border border-green-200'
                                : lead.status === 'clicked'
                                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                  : lead.status === 'booked'
                                    ? 'bg-[#2F5D50]/10 text-[#2F5D50] border border-[#2F5D50]/20'
                                    : lead.status === 'New Lead'
                                      ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                                      : lead.status === 'Imported'
                                        ? 'bg-purple-50 text-purple-800 border border-purple-200'
                                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                              }
                            `}>
                              <span className={`w-1.5 h-1.5 rounded-full 
                                ${lead.status === 'welcome_sent' ? 'bg-green-600' 
                                  : lead.status === 'clicked' ? 'bg-blue-600'
                                    : lead.status === 'booked' ? 'bg-[#2F5D50]'
                                      : lead.status === 'New Lead' ? 'bg-yellow-600'
                                        : lead.status === 'Imported' ? 'bg-purple-600'
                                          : 'bg-gray-500'
                                }`} 
                              />
                              {lead.status === 'welcome_sent' ? 'Welcome Sent' 
                                : lead.status === 'clicked' ? 'Clicked Email'
                                  : lead.status === 'booked' ? 'Call Booked'
                                    : lead.status === 'New Lead' ? 'New Lead'
                                      : lead.status === 'Imported' ? 'Imported'
                                        : lead.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => handleSendSingleEmail(lead)}
                              disabled={sendingEmailId === (lead.id || lead.email)}
                              className="p-1.5 rounded bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 transition-colors inline-flex items-center justify-center cursor-pointer"
                              title="Send personalized AI email outreach"
                            >
                              {sendingEmailId === (lead.id || lead.email) ? (
                                <span className="w-3.5 h-3.5 border-2 border-green-800/30 border-t-green-800 rounded-full animate-spin" />
                              ) : (
                                <Mail className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => openEditModal(lead)}
                              className="p-1.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 transition-colors inline-flex items-center justify-center cursor-pointer"
                              title="Edit Lead Details"
                            >
                              <Settings className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteLead(lead.id, lead.email)}
                              className="p-1.5 rounded bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 transition-colors inline-flex items-center justify-center cursor-pointer"
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
            <div className="bg-white border border-[#D3CEC0] p-6 sm:p-8 relative overflow-hidden">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-[#15130E]">
                <Mail className="w-5 h-5 text-[#2F5D50]" /> Active Nurture Pipeline Logs
              </h2>
              
              {leads.filter(l => l.status !== 'new').length === 0 ? (
                <div className="text-center py-20 text-[#5B564C] font-mono text-xs">
                  No active drip campaigns. Ingest leads via the CSV Importer tab, or click the "Send Email" action on any lead to trigger outreach drip campaigns.
                </div>
              ) : (
                <div className="space-y-10">
                  {leads.filter(l => l.status !== 'new').map((lead, idx) => {
                    const dripSteps = getDripSteps(lead);
                    return (
                      <div key={idx} className="border border-[#D3CEC0]/80 bg-white/40 p-6 relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-[#D3CEC0]/40">
                          <div>
                            <span className="text-xs text-[#8B857A] uppercase tracking-widest font-mono">Drip Target Pipeline</span>
                            <h3 className="text-lg font-bold text-[#15130E] mt-1">{lead.company_name}</h3>
                            <p className="text-xs text-[#5B564C] mt-0.5">Contact: {lead.contact_name} ({lead.email})</p>
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
                              className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1.5 border border-[#D3CEC0] hover:border-[#15130E] bg-white/40 hover:bg-white/80 transition-colors cursor-pointer text-[#5B564C] hover:text-[#15130E]"
                            >
                              Advance Stage
                            </button>
                            <span className="bg-green-100 text-green-800 border border-green-200 px-3 py-1 rounded-full text-[10px] uppercase font-semibold">
                              Active Campaigns
                            </span>
                          </div>
                        </div>

                        {/* Timeline flow */}
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                          {/* Timeline background bar */}
                          <div className="absolute top-[28px] left-[15px] right-[15px] h-[2px] bg-[#D3CEC0]/60 hidden md:block" />

                          {dripSteps.map((step, sIdx) => (
                            <div key={sIdx} className="relative z-10 flex md:flex-col items-start gap-4 md:gap-0">
                              <div className={`w-8 h-8 rounded-full border flex items-center justify-center mb-3
                                ${step.status === 'sent' 
                                  ? 'bg-green-100 border-green-200' 
                                  : step.status === 'scheduled'
                                    ? 'bg-yellow-100 border-yellow-200 animate-pulse'
                                    : 'bg-white border-[#D3CEC0]'
                                }
                              `}>
                                {step.icon}
                              </div>
                              <div>
                                <h4 className="text-[13px] font-semibold text-[#15130E]">{step.title}</h4>
                                <p className="text-[11px] text-[#2F5D50] font-mono mt-1">{step.delay}</p>
                                <p className="text-xs text-[#5B564C] mt-2 leading-relaxed">{step.desc}</p>
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
            <div className="bg-white border border-[#D3CEC0] p-8 max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-[#15130E]">
                <Settings className="w-5 h-5 text-[#2F5D50]" /> API Credentials &amp; Testing
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5B564C] font-semibold mb-2 font-mono flex justify-between items-center">
                    <span>Perplexity AI API Key</span>
                    {hasServerPerplexityKey && (
                      <span className="text-green-800 text-[9px] uppercase tracking-widest bg-green-100 px-2 py-0.5 border border-green-200 rounded">Active in Environment</span>
                    )}
                  </label>
                  <input
                    type="password"
                    placeholder={hasServerPerplexityKey ? "•••••••• (Using Environment Key)" : "pplx-..."}
                    value={perplexityKey}
                    onChange={(e) => setPerplexityKey(e.target.value)}
                    className="w-full bg-white/50 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-4 py-2.5 text-sm text-[#15130E] focus:outline-none transition-colors font-mono"
                  />
                  <p className="text-[10px] text-[#5B564C] mt-2 font-mono">Used to fetch real B2B leads dynamically using the Sonar models.</p>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#5B564C] font-semibold mb-2 font-mono flex justify-between items-center">
                    <span>Resend API Key</span>
                    {hasServerResendKey && (
                      <span className="text-green-800 text-[9px] uppercase tracking-widest bg-green-100 px-2 py-0.5 border border-green-200 rounded">Active in Environment</span>
                    )}
                  </label>
                  <input
                    type="password"
                    placeholder={hasServerResendKey ? "•••••••• (Using Environment Key)" : "re_..."}
                    value={resendKey}
                    onChange={(e) => setResendKey(e.target.value)}
                    className="w-full bg-white/50 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-4 py-2.5 text-sm text-[#15130E] focus:outline-none transition-colors font-mono"
                  />
                  <p className="text-[10px] text-[#5B564C] mt-2 font-mono">Used to coordinate automated outreach welcome emails via Resend's API.</p>
                </div>

                <button
                  onClick={saveConfig}
                  className="w-full bg-[#2F5D50] hover:bg-[#234A40] text-white font-semibold py-3 px-4 transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Save Settings &amp; AI Templates
                </button>

                <hr className="border-[#D3CEC0]/40" />

                <div>
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-[#2F5D50]">
                    <Mail className="w-4 h-4" /> Send Test Outreach Email
                  </h3>
                  <form onSubmit={handleSendTestEmail} className="space-y-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#5B564C] font-semibold mb-2 font-mono">Recipient Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. test@yourdomain.com"
                        value={testEmail}
                        onChange={(e) => setTestEmail(e.target.value)}
                        className="w-full bg-white/50 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-4 py-2.5 text-sm text-[#15130E] focus:outline-none transition-colors font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={testingEmail || (!resendKey && !hasServerResendKey)}
                      className="w-full bg-white/40 border border-[#D3CEC0] hover:bg-white/80 hover:border-[#15130E] disabled:bg-gray-200 disabled:text-gray-400 text-[#15130E] font-semibold py-2.5 px-4 transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs uppercase tracking-wider font-mono"
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#EFEDE5] border border-[#D3CEC0] overflow-hidden shadow-xl text-[#15130E]">
            <div className="bg-[#E7E4D9]/60 border-b border-[#D3CEC0] px-6 py-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#15130E] font-display">Create New Lead Profile</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#8B857A] hover:text-[#15130E] transition-colors cursor-pointer text-xs">✕</button>
            </div>
            <form onSubmit={handleAddLeadSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Company Name</label>
                  <input type="text" required value={formCompany} onChange={(e) => setFormCompany(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Contact Name</label>
                  <input type="text" required value={formContact} onChange={(e) => setFormContact(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Email Address</label>
                  <input type="email" required value={formEmail} onChange={(e) => setFormEmail(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Phone Number</label>
                  <input type="text" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Website / Domain</label>
                <input type="text" value={formWebsite} onChange={(e) => setFormWebsite(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Category / Silo</label>
                  <input type="text" value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Location</label>
                  <input type="text" value={formLocation} onChange={(e) => setFormLocation(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Prospect Pipeline Status</label>
                <select value={formStatus} onChange={(e) => setFormStatus(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none cursor-pointer">
                  <option value="New Lead" className="bg-white text-[#15130E]">New Lead (Form Submission)</option>
                  <option value="Imported" className="bg-white text-[#15130E]">Imported (CSV Lead)</option>
                  <option value="welcome_sent" className="bg-white text-[#15130E]">welcome_sent (Welcome Sent)</option>
                  <option value="clicked" className="bg-white text-[#15130E]">clicked (Clicked Email)</option>
                  <option value="booked" className="bg-white text-[#15130E]">booked (Call Booked)</option>
                  <option value="new" className="bg-white text-[#15130E]">new (Queued)</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[#D3CEC0]">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-[#D3CEC0] hover:bg-white/40 text-[#15130E] text-xs font-semibold uppercase tracking-wider cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#2F5D50] hover:bg-[#234A40] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT LEAD MODAL */}
      {showEditModal && selectedLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#EFEDE5] border border-[#D3CEC0] overflow-hidden shadow-xl text-[#15130E]">
            <div className="bg-[#E7E4D9]/60 border-b border-[#D3CEC0] px-6 py-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#15130E] font-display">Edit Lead Profile</h3>
              <button onClick={() => setShowEditModal(false)} className="text-[#8B857A] hover:text-[#15130E] transition-colors cursor-pointer text-xs">✕</button>
            </div>
            <form onSubmit={handleEditLeadSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Company Name</label>
                  <input type="text" required value={formCompany} onChange={(e) => setFormCompany(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Contact Name</label>
                  <input type="text" required value={formContact} onChange={(e) => setFormContact(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Email Address</label>
                  <input type="email" required disabled value={formEmail} className="w-full bg-white/20 border border-[#D3CEC0] rounded px-3 py-2 text-xs text-[#8B857A] focus:outline-none cursor-not-allowed font-mono" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Phone Number</label>
                  <input type="text" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Website / Domain</label>
                <input type="text" value={formWebsite} onChange={(e) => setFormWebsite(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Category / Silo</label>
                  <input type="text" value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Location</label>
                  <input type="text" value={formLocation} onChange={(e) => setFormLocation(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#5B564C] font-semibold mb-1 font-mono">Prospect Pipeline Status</label>
                <select value={formStatus} onChange={(e) => setFormStatus(e.target.value)} className="w-full bg-white/60 border border-[#D3CEC0] focus:border-[#2F5D50] rounded px-3 py-2 text-xs text-[#15130E] focus:outline-none cursor-pointer">
                  <option value="New Lead" className="bg-white text-[#15130E]">New Lead (Form Submission)</option>
                  <option value="Imported" className="bg-white text-[#15130E]">Imported (CSV Lead)</option>
                  <option value="welcome_sent" className="bg-white text-[#15130E]">welcome_sent (Welcome Sent)</option>
                  <option value="clicked" className="bg-white text-[#15130E]">clicked (Clicked Email)</option>
                  <option value="booked" className="bg-white text-[#15130E]">booked (Call Booked)</option>
                  <option value="new" className="bg-white text-[#15130E]">new (Queued)</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[#D3CEC0]">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 border border-[#D3CEC0] hover:bg-white/40 text-[#15130E] text-xs font-semibold uppercase tracking-wider cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#2F5D50] hover:bg-[#234A40] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EMAIL PREVIEW MODAL */}
      {showPreviewModal && previewEmail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-[#EFEDE5] border border-[#D3CEC0] overflow-hidden shadow-xl flex flex-col max-h-[85vh] text-[#15130E]">
            <div className="bg-[#E7E4D9]/60 border-b border-[#D3CEC0] px-6 py-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#15130E] font-mono">Personalized AI Outreach Preview</h3>
              <button onClick={() => setShowPreviewModal(false)} className="text-[#8B857A] hover:text-[#15130E] transition-colors cursor-pointer text-xs">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4 flex-grow">
              <div className="bg-white/60 border border-[#D3CEC0] p-4 rounded-lg space-y-2">
                <p className="text-xs text-[#5B564C] font-mono"><span className="text-[#2F5D50] font-semibold">Subject:</span> {previewEmail.subject}</p>
              </div>
              <div 
                className="bg-white border border-[#D3CEC0] p-6 rounded-lg text-sm text-[#15130E] leading-relaxed space-y-4 font-sans select-text"
                dangerouslySetInnerHTML={{ __html: previewEmail.body }}
              />
            </div>
            
            <div className="flex justify-end gap-3 p-4 border-t border-[#D3CEC0] bg-[#E7E4D9]/20">
              <button type="button" onClick={() => setShowPreviewModal(false)} className="px-5 py-2 bg-[#2F5D50] hover:bg-[#234A40] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer">Close Preview</button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter showWebGL={false} />
    </div>
  );
};

export default AdminDashboard;
