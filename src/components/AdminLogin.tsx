import React, { useState } from 'react';
import { ArrowRight, Lock, User, Terminal } from 'lucide-react';
import CustomCursor from './CustomCursor';
import Header from './Header';
import Footer from './Footer';

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
      if (res.ok && data.success) {
        onLoginSuccess(data.token);
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative font-sans selection:bg-[#F26522] selection:text-white flex flex-col justify-between">
      <CustomCursor />
      <Header theme="dark" />

      <div className="flex-grow flex items-center justify-center px-5 py-20 relative z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,101,34,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="w-full max-w-[450px] bg-black/60 border border-white/10 backdrop-blur-xl p-8 rounded-2xl relative overflow-hidden shadow-2xl">
          {/* Decorative neon top bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F26522] to-transparent" />
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#F26522]/10 border border-[#F26522]/20 flex items-center justify-center mx-auto mb-4">
              <Terminal className="w-6 h-6 text-[#F26522]" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white font-display">Gobiya Administrator</h1>
            <p className="text-xs text-gray-500 mt-2 font-mono">B2B Lead Prospector &amp; CRM Console</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-950/40 border border-red-500/30 text-red-200 text-xs px-4 py-3 rounded-lg flex items-center gap-2 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 font-mono">Username</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F26522] transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 font-mono">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F26522] transition-colors font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group bg-[#F26522] hover:bg-[#e05a1a] disabled:bg-gray-800 disabled:text-gray-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm font-sans mt-8"
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

      <Footer />
    </div>
  );
};

export default AdminLogin;
