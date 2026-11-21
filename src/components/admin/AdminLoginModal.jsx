import React, { useState } from 'react';
import { Lock, Building2, Eye, EyeOff, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  const { loginAdmin } = useData();
  const [password, setPassword] = useState('admin'); // pre-filled for instant beginner friendly access
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = loginAdmin(password);
    if (res.success) {
      setError('');
      onSuccess();
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-[#101D35] text-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#D4A853]/40">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4A853] to-[#B88D3B] flex items-center justify-center mx-auto shadow-lg shadow-[#D4A853]/20">
            <Lock className="w-7 h-7 text-[#101D35]" />
          </div>
          <h3 className="text-2xl font-bold font-['Outfit'] text-white">
            Pradhan Properties CRM
          </h3>
          <p className="text-xs text-slate-300">
            Authorized Business Management System
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Enter Admin Passcode
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-[#0B1324] border border-slate-700 text-sm text-white focus:outline-none focus:border-[#D4A853]"
                placeholder="Enter password..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-[#D4A853] mt-1.5 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Demo passcode: <strong>admin</strong> (or <strong>pradhan2025</strong>)</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B88D3B] text-[#101D35] font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:brightness-105"
          >
            <span>Unlock Admin CRM</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-[11px] text-slate-400">
          Client phone numbers, internal addresses and broker commissions are strictly hidden from the public.
        </div>

      </div>
    </div>
  );
}
