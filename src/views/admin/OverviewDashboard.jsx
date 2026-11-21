import React from 'react';
import { 
  Users, 
  ShoppingBag, 
  Upload, 
  Home, 
  Key, 
  UserCheck, 
  GitPullRequest, 
  CalendarClock, 
  AlertTriangle, 
  Plus, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function OverviewDashboard({ 
  onSelectTab, 
  onOpenCustomer, 
  onOpenProperty, 
  onOpenFollowup, 
  onOpenDeal,
  onSelectCustomerDetail 
}) {
  const { customers, properties, coAgents, deals, followups, enquiries } = useData();

  // Compute dynamic stats based strictly on actual stored records
  const totalCustomers = customers.length;
  const activeBuyerReqs = customers.filter(c => c.dealType === 'Buy').length;
  const activeSellerReqs = customers.filter(c => c.dealType === 'Sell').length;
  const availableProperties = properties.filter(p => p.availabilityStatus === 'Available').length;
  const propertiesForRent = properties.filter(p => p.dealType === 'Rent' && p.availabilityStatus === 'Available').length;
  const totalCoAgents = coAgents.length;
  const activeDeals = deals.filter(d => d.stage !== 'Deal Closed' && d.stage !== 'Lost').length;
  
  const todayStr = new Date().toISOString().split('T')[0];
  const pendingFollowups = followups.filter(f => f.status === 'Pending');
  const todaysFollowups = pendingFollowups.filter(f => f.dueDate <= todayStr);
  const reviewNeededCustomers = customers.filter(c => c.needsReview);

  // Stats cards configuration
  const stats = [
    { label: 'Total Customers', value: totalCustomers, icon: Users, tab: 'customers', color: 'from-blue-600 to-indigo-700', text: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Buyer Reqs', value: activeBuyerReqs, icon: ShoppingBag, tab: 'customers', color: 'from-emerald-600 to-teal-700', text: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Seller Reqs', value: activeSellerReqs, icon: Upload, tab: 'customers', color: 'from-amber-600 to-orange-700', text: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Available Properties', value: availableProperties, icon: Home, tab: 'inventory', color: 'from-purple-600 to-indigo-800', text: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Properties for Rent', value: propertiesForRent, icon: Key, tab: 'inventory', color: 'from-cyan-600 to-blue-700', text: 'text-cyan-600', bg: 'bg-cyan-50' },
    { label: 'Total Co-Agents', value: totalCoAgents, icon: UserCheck, tab: 'coagents', color: 'from-slate-700 to-slate-900', text: 'text-slate-700', bg: 'bg-slate-100' },
    { label: 'Active Deals', value: activeDeals, icon: GitPullRequest, tab: 'deals', color: 'from-[#D4A853] to-[#B88D3B]', text: 'text-[#D4A853]', bg: 'bg-amber-50/60' },
    { label: 'Pending Follow-ups', value: pendingFollowups.length, icon: CalendarClock, tab: 'followups', color: 'from-rose-600 to-red-700', text: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#101D35] via-[#182B4D] to-[#101D35] rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-[#D4A853]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A853]/20 border border-[#D4A853]/40 text-[#D4A853] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pradhan Properties Management Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
            West Delhi Real Estate Operations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Tracking customer requirements, verified Jad Se & floor inventory, co-agent networks, and live deal closings.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenCustomer}
            className="bg-[#D4A853] hover:bg-[#B88D3B] text-[#101D35] px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>+ Customer</span>
          </button>

          <button
            onClick={onOpenProperty}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4 text-[#D4A853]" />
            <span>+ Property</span>
          </button>

          <button
            onClick={() => onSelectTab('matching')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Match Engine</span>
          </button>
        </div>
      </div>

      {/* Review Warnings if any imported data needs attention */}
      {reviewNeededCustomers.length > 0 && (
        <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-4 sm:p-5 text-amber-900 shadow-xs">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Action Required: {reviewNeededCustomers.length} Record(s) Flagged for Review
              </h3>
              <p className="text-xs text-amber-700 mt-0.5">
                Some initial customer records had ambiguous entries in the original sheet (e.g. Bhavana Kumari had budget entered under BHK). Original text has been preserved.
              </p>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {reviewNeededCustomers.map(c => (
                  <button
                    key={c.id}
                    onClick={() => onSelectCustomerDetail(c)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-xs font-semibold text-amber-900 hover:bg-amber-100 flex items-center gap-1.5 shadow-xs"
                  >
                    <span>{c.name}</span>
                    <span className="text-[10px] text-amber-600 font-mono">({c.phone})</span>
                    <ArrowRight className="w-3 h-3 text-amber-600" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8 DYNAMIC KPI METRICS (As per Section 4 requirement) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Real-time Business Statistics
          </h2>
          <span className="text-xs text-slate-400">Calculated from actual database records</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                onClick={() => onSelectTab(s.tab)}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 group-hover:text-[#101D35] transition-colors">
                    {s.label}
                  </span>
                  <div className={`w-9 h-9 rounded-xl ${s.bg} ${s.text} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold font-['Outfit'] text-[#101D35]">
                    {s.value}
                  </span>
                  <span className="text-xs text-slate-400 group-hover:text-[#D4A853] flex items-center gap-1 font-medium transition-colors">
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column Operational Grid: Today's Follow-ups & Recent Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Today's & Pending Follow-ups */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-[#D4A853]" />
                <h3 className="text-base font-bold font-['Outfit'] text-[#101D35]">
                  Follow-ups Due Today
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                  {todaysFollowups.length} Due
                </span>
              </div>
              <button
                onClick={() => onSelectTab('followups')}
                className="text-xs font-semibold text-[#D4A853] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {todaysFollowups.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No pending follow-ups due today. You're all caught up!
                </div>
              ) : (
                todaysFollowups.map(fol => (
                  <div key={fol.id} className="py-3.5 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#101D35]">{fol.customerName}</span>
                        <span className="text-xs font-mono text-slate-500">{fol.phone}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">{fol.requirement}</p>
                      <p className="text-[11px] text-slate-400 italic">{fol.notes || fol.lastConversation}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={`tel:${fol.phone}`}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-[#101D35] text-slate-700 hover:text-[#D4A853] transition-colors"
                        title="Call Customer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`https://wa.me/91${fol.phone}?text=Namaste%20${fol.customerName}%20ji%2C%20following%20up%20from%20Pradhan%20Properties.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white transition-colors"
                        title="WhatsApp Chat"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={onOpenFollowup}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2"
            >
              <Plus className="w-3.5 h-3.5 text-[#D4A853]" />
              <span>Log Next Follow-up</span>
            </button>
          </div>
        </div>

        {/* Customer Requirements Summary */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#D4A853]" />
                <h3 className="text-base font-bold font-['Outfit'] text-[#101D35]">
                  Active Customer Pipeline
                </h3>
              </div>
              <button
                onClick={() => onSelectTab('customers')}
                className="text-xs font-semibold text-[#D4A853] hover:underline"
              >
                Manage Customers
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {customers.slice(0, 5).map(cust => (
                <div
                  key={cust.id}
                  onClick={() => onSelectCustomerDetail(cust)}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#101D35]">{cust.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        cust.dealType === 'Sell' ? 'bg-amber-100 text-amber-800' :
                        cust.dealType === 'Invest' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {cust.dealType}
                      </span>
                      {cust.needsReview && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500 text-white">
                          Verify
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500">
                      {cust.bhk || 'Config'} • {cust.budget || 'Budget Open'} • {cust.preferredFloor || 'Any Floor'}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-indigo-600 block">{cust.status}</span>
                    <span className="text-[11px] font-mono text-slate-400">{cust.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={onOpenCustomer}
              className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2"
            >
              <Plus className="w-3.5 h-3.5 text-[#D4A853]" />
              <span>Add New Customer Lead</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
