import React, { useState } from 'react';
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  Home, 
  Sparkles, 
  UserCheck, 
  GitPullRequest, 
  CalendarClock, 
  Inbox, 
  BarChart3, 
  Settings, 
  ExternalLink, 
  LogOut, 
  Plus, 
  Search, 
  ShieldCheck, 
  Menu, 
  X, 
  Bell,
  Database,
  Lock
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminLayout({ 
  currentTab, 
  setCurrentTab, 
  onExitAdmin, 
  onOpenNewCustomer, 
  onOpenNewProperty,
  onOpenNewFollowup,
  children 
}) {
  const { customers, properties, coAgents, deals, followups, enquiries, supabaseConfig, logoutAdmin } = useData();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalQuery, setGlobalQuery] = useState('');

  // Count pending followups due today or overdue
  const todayStr = new Date().toISOString().split('T')[0];
  const pendingFollowupsCount = followups.filter(f => f.status === 'Pending' && f.dueDate <= todayStr).length;
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const reviewNeededCount = customers.filter(c => c.needsReview).length;

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers CRM', icon: Users, badge: reviewNeededCount ? `${reviewNeededCount} verify` : null, badgeColor: 'bg-amber-500 text-white' },
    { id: 'inventory', label: 'Property Inventory', icon: Home, count: properties.length },
    { id: 'matching', label: 'Property Matching', icon: Sparkles, highlight: true },
    { id: 'coagents', label: 'Co-Agents', icon: UserCheck, count: coAgents.length },
    { id: 'deals', label: 'Deals Pipeline', icon: GitPullRequest, count: deals.length },
    { id: 'followups', label: 'Follow-ups', icon: CalendarClock, badge: pendingFollowupsCount ? String(pendingFollowupsCount) : null, badgeColor: 'bg-rose-500 text-white' },
    { id: 'enquiries', label: 'Enquiries Inbox', icon: Inbox, badge: newEnquiriesCount ? String(newEnquiriesCount) : null, badgeColor: 'bg-indigo-500 text-white' },
    { id: 'reports', label: 'Reports & Export', icon: BarChart3 },
    { id: 'settings', label: 'Settings & Storage', icon: Settings },
  ];

  const handleSelectTab = (tabId) => {
    setCurrentTab(tabId);
    setMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex flex-col lg:flex-row text-[#101D35] font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* SIDEBAR (Desktop & Mobile Drawer) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#101D35] text-white flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 lg:static lg:w-72 shadow-2xl ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A853] to-[#B88D3B] flex items-center justify-center shadow-md shadow-[#D4A853]/20">
                <Building2 className="w-6 h-6 text-[#101D35]" />
              </div>
              <div>
                <h1 className="text-lg font-bold font-['Outfit'] tracking-tight text-white">
                  PRADHAN <span className="text-[#D4A853]">CRM</span>
                </h1>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Business Management System
                </p>
              </div>
            </div>

            {/* Mobile close */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Connection Indicator */}
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#0B1324] border border-slate-800 flex items-center justify-between text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className={`w-2 h-2 rounded-full ${supabaseConfig.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-[#D4A853]'}`}></span>
              <span>{supabaseConfig.isConnected ? 'Supabase Live' : 'Local Demo Mode'}</span>
            </span>
            <span className="text-slate-500 font-mono text-[10px]">v1.0</span>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation Menu
          </div>
          
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4A853] to-[#B88D3B] text-[#101D35] shadow-md shadow-[#D4A853]/20 font-bold'
                    : item.highlight
                    ? 'text-[#D4A853] hover:bg-white/5 border border-[#D4A853]/30'
                    : 'text-slate-300 hover:bg-[#182B4D] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#101D35]' : item.highlight ? 'text-[#D4A853]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}

                {item.count !== undefined && !item.badge && (
                  <span className={`text-[11px] font-mono ${isActive ? 'text-[#101D35]/80' : 'text-slate-500'}`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2 bg-[#0B1324]/50">
          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-center gap-2 bg-[#182B4D] hover:bg-[#233D6B] text-slate-200 py-2.5 rounded-xl text-xs font-bold transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#D4A853]" />
            <span>View Public Website</span>
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              onExitAdmin();
            }}
            className="w-full flex items-center justify-center gap-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock CRM / Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Backdrop for mobile */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 shadow-xs">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-base sm:text-lg font-bold font-['Outfit'] text-[#101D35] capitalize">
                {currentTab.replace('-', ' ')}
              </h2>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Pradhan Properties Private Workspace • West Delhi Operations
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Add Buttons */}
            <button
              onClick={onOpenNewCustomer}
              className="bg-[#101D35] hover:bg-[#182B4D] text-[#D4A853] px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs border border-[#D4A853]/30"
              title="Add New Customer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Customer</span>
            </button>

            <button
              onClick={onOpenNewProperty}
              className="bg-[#D4A853] hover:bg-[#B88D3B] text-[#101D35] px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
              title="Add Property Inventory"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Property</span>
            </button>

            {/* Public switch */}
            <button
              onClick={onExitAdmin}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
              title="Go to Public Website"
            >
              <ExternalLink className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline">Public Site</span>
            </button>

            {/* Profile Tag */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#101D35] to-[#182B4D] text-[#D4A853] flex items-center justify-center font-bold text-xs border border-[#D4A853]/40">
                PP
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-bold text-[#101D35] leading-none">Pradhan Admin</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Authorised User</p>
              </div>
            </div>

          </div>

        </header>

        {/* Page Content View */}
        <main className="p-4 sm:p-8 flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}
