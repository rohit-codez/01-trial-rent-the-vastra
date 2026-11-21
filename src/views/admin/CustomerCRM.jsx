import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Phone, 
  MessageSquare, 
  Download, 
  Edit, 
  Trash2, 
  Sparkles, 
  AlertTriangle, 
  CalendarClock, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  IndianRupee,
  RotateCcw
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function CustomerCRM({ onOpenAdd, onEditCustomer, onSelectCustomerDetail, onFindMatches }) {
  const { customers, deleteCustomer, exportCSV } = useData();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [dealTypeFilter, setDealTypeFilter] = useState('All');
  const [bhkFilter, setBhkFilter] = useState('All');
  const [floorFilter, setFloorFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [reviewOnlyFilter, setReviewOnlyFilter] = useState(false);
  const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'name' | 'status'

  // Filter logic
  const filteredCustomers = customers.filter(cust => {
    // Search query (matches name or phone number as string)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = cust.name.toLowerCase().includes(q);
      const matchPhone = String(cust.phone).includes(q);
      const matchAddress = (cust.address || '').toLowerCase().includes(q);
      const matchNotes = (cust.notes || '').toLowerCase().includes(q);
      const matchId = cust.id.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchAddress && !matchNotes && !matchId) return false;
    }

    // Deal Type Filter (Buy / Sell / Rent / Invest)
    if (dealTypeFilter !== 'All' && cust.dealType !== dealTypeFilter) {
      return false;
    }

    // BHK Filter
    if (bhkFilter !== 'All') {
      if (!cust.bhk || !cust.bhk.includes(bhkFilter)) return false;
    }

    // Floor Filter
    if (floorFilter !== 'All') {
      if (!cust.preferredFloor || !cust.preferredFloor.toLowerCase().includes(floorFilter.toLowerCase())) return false;
    }

    // Status Filter
    if (statusFilter !== 'All' && cust.status !== statusFilter) {
      return false;
    }

    // Review flag
    if (reviewOnlyFilter && !cust.needsReview) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'status') return (a.status || '').localeCompare(b.status || '');
    return (b.id || '').localeCompare(a.id || ''); // recent by default
  });

  const handleExport = () => {
    exportCSV(customers, 'pradhan_properties_customers');
  };

  const resetFilters = () => {
    setSearchQuery('');
    setDealTypeFilter('All');
    setBhkFilter('All');
    setFloorFilter('All');
    setStatusFilter('All');
    setReviewOnlyFilter(false);
    setSortBy('recent');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-['Outfit'] text-[#101D35]">
            Customer CRM & Requirements
          </h1>
          <p className="text-xs text-slate-500">
            Total {customers.length} records • Stored securely with text phone formatting
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExport}
            className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
            title="Download CSV Spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B88D3B] text-[#101D35] text-xs font-bold flex items-center gap-1.5 shadow-sm hover:brightness-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search customer by name, phone (e.g. 9319539206), address, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#D4A853]"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          
          {/* Deal Type */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Deal Type</label>
            <select
              value={dealTypeFilter}
              onChange={(e) => setDealTypeFilter(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white font-medium"
            >
              <option value="All">All Deals</option>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
              <option value="Rent">Rent</option>
              <option value="Invest">Invest</option>
            </select>
          </div>

          {/* BHK */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">BHK</label>
            <select
              value={bhkFilter}
              onChange={(e) => setBhkFilter(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white font-medium"
            >
              <option value="All">All BHK</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK</option>
            </select>
          </div>

          {/* Floor */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Floor Preference</label>
            <select
              value={floorFilter}
              onChange={(e) => setFloorFilter(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white font-medium"
            >
              <option value="All">Any Floor</option>
              <option value="Ground">Ground Floor</option>
              <option value="Upper Ground">Upper Ground</option>
              <option value="First">First Floor</option>
              <option value="Second">Second Floor</option>
              <option value="Top">Top Floor</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Interested">Interested</option>
              <option value="Site Visit">Site Visit</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Closed">Closed</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white font-medium"
            >
              <option value="recent">Most Recent</option>
              <option value="name">Name (A-Z)</option>
              <option value="status">Status</option>
            </select>
          </div>

          {/* Needs Review Toggle */}
          <div className="flex flex-col justify-end">
            <button
              onClick={() => setReviewOnlyFilter(!reviewOnlyFilter)}
              className={`w-full p-2 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors ${
                reviewOnlyFilter ? 'bg-amber-500 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Needs Review ({customers.filter(c => c.needsReview).length})</span>
            </button>
          </div>

        </div>

        {/* Status Count and Reset */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong className="text-[#101D35]">{filteredCustomers.length}</strong> matching customers</span>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-slate-500 hover:text-[#D4A853] font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        </div>

      </div>

      {/* Customer CRM Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#101D35] text-white uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3.5">Customer Name & ID</th>
                <th className="px-4 py-3.5">Phone Number</th>
                <th className="px-4 py-3.5">Deal Type</th>
                <th className="px-4 py-3.5">BHK / Config</th>
                <th className="px-4 py-3.5">Budget</th>
                <th className="px-4 py-3.5">Floor / Jad Se</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Notes & Context</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-slate-400">
                    No customer records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(cust => (
                  <tr 
                    key={cust.id}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    {/* Name & ID */}
                    <td className="px-4 py-3.5">
                      <div 
                        onClick={() => onSelectCustomerDetail(cust)}
                        className="cursor-pointer"
                      >
                        <div className="font-bold text-[#101D35] group-hover:text-[#D4A853] transition-colors flex items-center gap-1.5">
                          <span>{cust.name}</span>
                          {cust.needsReview && (
                            <span 
                              className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-amber-500 text-white"
                              title={cust.reviewNote || 'Flagged for verification'}
                            >
                              Verify
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 block">{cust.id}</span>
                        {cust.address && (
                          <span className="text-[10px] text-slate-500 truncate max-w-[140px] block" title={cust.address}>
                            📍 {cust.address}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Phone Number (stored as text) */}
                    <td className="px-4 py-3.5 font-mono text-xs font-semibold whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span>{cust.phone}</span>
                        <a
                          href={`tel:${cust.phone}`}
                          className="p-1 rounded bg-slate-100 hover:bg-[#101D35] text-slate-600 hover:text-[#D4A853]"
                          title="Call Customer"
                        >
                          <Phone className="w-3 h-3" />
                        </a>
                        <a
                          href={`https://wa.me/91${cust.phone}?text=Namaste%20${cust.name}%20ji%2C%20this%20is%20from%20Pradhan%20Properties.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-emerald-50 hover:bg-[#25D366] text-emerald-600 hover:text-white"
                          title="WhatsApp Chat"
                        >
                          <MessageSquare className="w-3 h-3" />
                        </a>
                      </div>
                    </td>

                    {/* Deal Type */}
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        cust.dealType === 'Sell' ? 'bg-amber-100 text-amber-800' :
                        cust.dealType === 'Invest' ? 'bg-purple-100 text-purple-800' :
                        cust.dealType === 'Rent' ? 'bg-cyan-100 text-cyan-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {cust.dealType || 'Buy'}
                      </span>
                    </td>

                    {/* BHK */}
                    <td className="px-4 py-3.5 font-semibold text-slate-800">
                      {cust.bhk || <span className="text-slate-400 font-normal">—</span>}
                    </td>

                    {/* Budget */}
                    <td className="px-4 py-3.5 font-bold text-[#101D35]">
                      {cust.budget || <span className="text-slate-400 font-normal">—</span>}
                    </td>

                    {/* Floor & Jad Se */}
                    <td className="px-4 py-3.5">
                      <div className="space-y-0.5">
                        <span className="block font-medium text-slate-700">
                          {cust.preferredFloor || 'Any Floor'}
                        </span>
                        {cust.constructionType === 'Jad Se' && (
                          <span className="text-[10px] font-bold text-amber-600 block">
                            ★ Jad Se
                          </span>
                        )}
                        {cust.gaj && (
                          <span className="text-[10px] text-slate-500 font-mono block">
                            {cust.gaj}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        cust.status === 'Closed' ? 'bg-emerald-100 text-emerald-800' :
                        cust.status === 'Negotiation' ? 'bg-indigo-100 text-indigo-800' :
                        cust.status === 'Site Visit' ? 'bg-purple-100 text-purple-800' :
                        cust.status === 'Interested' ? 'bg-blue-100 text-blue-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {cust.status}
                      </span>
                    </td>

                    {/* Notes */}
                    <td className="px-4 py-3.5 max-w-[200px]">
                      <p className="text-[11px] text-slate-600 truncate" title={cust.notes}>
                        {cust.notes || <span className="text-slate-400 italic">No notes</span>}
                      </p>
                      {cust.needsReview && (
                        <p className="text-[10px] text-amber-700 font-semibold truncate" title={cust.reviewNote}>
                          ⚠️ {cust.reviewNote}
                        </p>
                      )}
                    </td>

                    {/* Action Buttons */}
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onFindMatches(cust)}
                          className="px-2.5 py-1 rounded-lg bg-[#D4A853]/20 hover:bg-[#D4A853] text-[#101D35] font-bold text-[11px] flex items-center gap-1 transition-colors"
                          title="Match with Properties"
                        >
                          <Sparkles className="w-3 h-3 text-[#D4A853] group-hover:text-[#101D35]" />
                          <span>Match</span>
                        </button>

                        <button
                          onClick={() => onEditCustomer(cust)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#101D35] hover:bg-slate-100"
                          title="Edit Customer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
