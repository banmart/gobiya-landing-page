import React, { useState } from 'react';
import { ArrowRight, Lock, User, Terminal } from 'lucide-react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/prospector/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log('[Login API Response]', res.status, data);
      if (res.ok && data.success) {
        console.log('[Login Success] Token obtained:', data.token);
        onLoginSuccess(data.token);
      } else {
        console.warn('[Login Failure] Server returned error:', data.error);
        setError(data.error || 'Invalid username or password');
      }
    } catch (err) {
      console.error('[Login Connection Error]', err);
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEDE5] text-[#15130E] relative font-sans selection:bg-[#2F5D50] selection:text-[#EFEDE5] flex flex-col justify-between">
      <SiteHeader />

      <div className="flex-grow flex items-center justify-center px-5 py-20 relative z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,93,80,0.04)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="w-full max-w-[450px] bg-white/60 border border-[#D3CEC0] backdrop-blur-xl p-8 rounded-2xl relative overflow-hidden shadow-2xl">
          {/* Decorative neon top bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2F5D50] to-transparent" />
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#2F5D50]/5 border border-[#2F5D50]/15 flex items-center justify-center mx-auto mb-4">
              <Terminal className="w-6 h-6 text-[#2F5D50]" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#15130E] font-display">Gobiya Administrator</h1>
            <p className="text-xs text-[#5B564C] mt-2 font-mono">B2B Lead Prospector &amp; CRM Console</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-800 text-xs px-4 py-3 rounded-lg flex items-center gap-2 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5B564C] font-semibold mb-2 font-mono">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-[#8B857A]">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/50 border border-[#D3CEC0] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#15130E] placeholder-gray-400 focus:outline-none focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#5B564C] font-semibold mb-2 font-mono">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-[#8B857A]">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/50 border border-[#D3CEC0] rounded-lg pl-10 pr-4 py-2.5 text-sm text-[#15130E] placeholder-gray-400 focus:outline-none focus:border-[#2F5D50] focus:ring-1 focus:ring-[#2F5D50] transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group bg-[#2F5D50] hover:bg-[#234A40] disabled:bg-gray-200 disabled:text-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm font-sans mt-8"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating Session...
                </>
              ) : (
                <>
                  Establish Terminal Connection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <SiteFooter showWebGL={false} />
    </div>
  );
};

export default AdminLogin;
