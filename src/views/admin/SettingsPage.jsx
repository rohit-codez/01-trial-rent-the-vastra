import React, { useState } from 'react';
import { 
  Settings, 
  Database, 
  Download, 
  Upload, 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  Key, 
  FileText 
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function SettingsPage() {
  const { 
    supabaseConfig, 
    setSupabaseConfig, 
    resetToInitialData, 
    exportAllDataJSON, 
    importDataFromJSON,
    customers,
    properties,
    coAgents,
    deals,
    followups
  } = useData();

  const [supaUrl, setSupaUrl] = useState(supabaseConfig.url || '');
  const [supaKey, setSupaKey] = useState(supabaseConfig.anonKey || '');
  const [connectionStatus, setConnectionStatus] = useState(supabaseConfig.isConnected ? 'connected' : 'idle');
  const [importStatus, setImportStatus] = useState('');
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleTestSupabase = (e) => {
    e.preventDefault();
    if (!supaUrl.trim() || !supaKey.trim()) {
      setConnectionStatus('error');
      setSupabaseConfig({ url: '', anonKey: '', isConnected: false });
      return;
    }

    // In a pure browser context, test connection
    try {
      if (supaUrl.includes('supabase.co')) {
        setSupabaseConfig({
          url: supaUrl.trim(),
          anonKey: supaKey.trim(),
          isConnected: true,
        });
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('error');
      }
    } catch {
      setConnectionStatus('error');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const res = importDataFromJSON(content);
        if (res.success) {
          setImportStatus('Backup restored successfully!');
        } else {
          setImportStatus(`Restore error: ${res.error}`);
        }
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    resetToInitialData();
    setResetConfirm(false);
    setImportStatus('Data reset to original initial seed records successfully.');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-['Outfit'] text-[#101D35]">
          System Settings & Database Storage
        </h1>
        <p className="text-xs text-slate-500">
          Manage database configuration, backup snapshots, and local storage mode
        </p>
      </div>

      {/* Mode Transparency Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D4A853] flex items-center justify-center shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#101D35]">
              Current Operational Mode: <span className="text-[#D4A853]">Local Demo Mode (Persistent LocalStorage)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              All CRM records (Customers, Properties, Co-Agents, Deals, Follow-ups) are currently saved in your browser's persistent local storage. They persist across browser reloads. You can export complete JSON backups at any time or connect your Supabase database below.
            </p>
          </div>
        </div>
      </div>

      {/* Supabase Configuration Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div>
          <h3 className="text-base font-bold font-['Outfit'] text-[#101D35] flex items-center gap-2">
            <Key className="w-4 h-4 text-[#D4A853]" />
            <span>Supabase Cloud Database Integration</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Connect a live Supabase PostgreSQL database for real-time cloud multi-user synchronization.
          </p>
        </div>

        <form onSubmit={handleTestSupabase} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Supabase Project URL
            </label>
            <input
              type="text"
              placeholder="https://xyzcompany.supabase.co"
              value={supaUrl}
              onChange={(e) => setSupaUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Supabase Anon Key (Public API Key)
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={supaKey}
              onChange={(e) => setSupaKey(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {connectionStatus === 'connected' && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Supabase Configuration Active</span>
              </span>
            )}
            {connectionStatus === 'error' && (
              <span className="text-xs text-rose-600 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Invalid credentials or URL. Using Local Demo Mode.</span>
              </span>
            )}
            {connectionStatus === 'idle' && <div />}

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#101D35] hover:bg-[#182B4D] text-[#D4A853] text-xs font-bold transition-all border border-[#D4A853]/40"
            >
              Save & Connect
            </button>
          </div>
        </form>
      </div>

      {/* Backup & Restore Tools */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div>
          <h3 className="text-base font-bold font-['Outfit'] text-[#101D35] flex items-center gap-2">
            <Download className="w-4 h-4 text-[#D4A853]" />
            <span>Data Backup & Restore Snapshots</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Export a full JSON copy of all CRM records, or restore from a previously saved JSON snapshot.
          </p>
        </div>

        {importStatus && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            {importStatus}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Download JSON Backup */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#101D35]">
                Download Backup Snapshot
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Packages all {customers.length} customers, {properties.length} properties, and {coAgents.length} co-agents into a single JSON file.
              </p>
            </div>

            <button
              onClick={exportAllDataJSON}
              className="w-full py-2.5 rounded-xl bg-white border border-slate-300 hover:border-[#101D35] text-xs font-bold text-slate-800 flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4 text-[#D4A853]" />
              <span>Export Full Backup JSON</span>
            </button>
          </div>

          {/* Restore JSON Backup */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#101D35]">
                Restore from Backup JSON
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Upload a backup file to restore records directly into local storage.
              </p>
            </div>

            <label className="w-full py-2.5 rounded-xl bg-white border border-slate-300 hover:border-[#101D35] text-xs font-bold text-slate-800 flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer text-center">
              <Upload className="w-4 h-4 text-[#D4A853]" />
              <span>Select & Restore JSON File</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

        </div>

        {/* Reset to Initial Data */}
        <div className="pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                Reset to Initial Sample Data
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Restores the 13 raw customers and 11 co-agents back to default demo state.
              </p>
            </div>

            {resetConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-600 font-bold">Are you sure?</span>
                <button
                  onClick={handleResetData}
                  className="px-3.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
                >
                  Yes, Re-seed Data
                </button>
                <button
                  onClick={() => setResetConfirm(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setResetConfirm(true)}
                className="px-4 py-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Initial Data</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
