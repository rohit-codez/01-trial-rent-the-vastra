import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Plus, 
  Download, 
  Edit, 
  Trash2, 
  MapPin, 
  Layers, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  IndianRupee,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function PropertyInventory({ onOpenAdd, onEditProperty, onOpenPublicPreview }) {
  const { properties, exportCSV, updateProperty } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [dealTypeFilter, setDealTypeFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [bhkFilter, setBhkFilter] = useState('All');
  const [constructionFilter, setConstructionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredProperties = properties.filter(prop => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = prop.title.toLowerCase().includes(q);
      const matchLoc = prop.location.toLowerCase().includes(q);
      const matchSource = (prop.sourceName || '').toLowerCase().includes(q);
      const matchNotes = (prop.internalNotes || '').toLowerCase().includes(q);
      const matchId = prop.id.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchSource && !matchNotes && !matchId) return false;
    }

    if (dealTypeFilter !== 'All' && prop.dealType !== dealTypeFilter) return false;
    if (sourceFilter !== 'All' && prop.sourceType !== sourceFilter) return false;
    if (bhkFilter !== 'All' && !prop.bhk.includes(bhkFilter)) return false;
    if (statusFilter !== 'All' && prop.availabilityStatus !== statusFilter) return false;

    if (constructionFilter !== 'All') {
      const isJadSe = prop.constructionType === 'Jad Se' || prop.title.toLowerCase().includes('jad se');
      if (constructionFilter === 'Jad Se' && !isJadSe) return false;
      if (constructionFilter === 'Floor' && isJadSe) return false;
    }

    return true;
  });

  const handleExport = () => {
    exportCSV(properties, 'pradhan_properties_inventory');
  };

  const togglePublicVisibility = (prop) => {
    updateProperty(prop.id, { isPublic: !prop.isPublic });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-['Outfit'] text-[#101D35]">
            Property Inventory Management
          </h1>
          <p className="text-xs text-slate-500">
            Total {properties.length} properties • Internal stock & co-agent shared inventory
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExport}
            className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B88D3B] text-[#101D35] text-xs font-bold flex items-center gap-1.5 shadow-sm hover:brightness-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search inventory by title, location (Uttam Nagar, Nawada), co-agent source, internal notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#D4A853]"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Deal Type</label>
            <select
              value={dealTypeFilter}
              onChange={(e) => setDealTypeFilter(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white font-medium"
            >
              <option value="All">All Deals</option>
              <option value="Sale">For Sale</option>
              <option value="Rent">For Rent</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Source</label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white font-medium"
            >
              <option value="All">All Sources</option>
              <option value="Internal">Pradhan Properties (Internal)</option>
              <option value="Co-Agent">Co-Agent Network</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Configuration</label>
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
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Construction</label>
            <select
              value={constructionFilter}
              onChange={(e) => setConstructionFilter(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white font-medium"
            >
              <option value="All">All Types</option>
              <option value="Jad Se">Jad Se (Roof Rights)</option>
              <option value="Floor">Builder Floor</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Availability</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 rounded-xl border border-slate-300 bg-white font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Under Negotiation">Under Negotiation</option>
              <option value="Sold">Sold</option>
              <option value="Rented">Rented</option>
            </select>
          </div>

        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong className="text-[#101D35]">{filteredProperties.length}</strong> inventory records</span>
          <button
            onClick={() => {
              setSearchQuery('');
              setDealTypeFilter('All');
              setSourceFilter('All');
              setBhkFilter('All');
              setConstructionFilter('All');
              setStatusFilter('All');
            }}
            className="flex items-center gap-1 text-slate-500 hover:text-[#D4A853] font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        </div>

      </div>

      {/* Property Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#101D35] text-white uppercase text-[10px] tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3.5">Property Title & ID</th>
                <th className="px-4 py-3.5">Source / Co-Agent</th>
                <th className="px-4 py-3.5">Location</th>
                <th className="px-4 py-3.5">Type & Floor</th>
                <th className="px-4 py-3.5">Gaj / Area</th>
                <th className="px-4 py-3.5">Price / Rent</th>
                <th className="px-4 py-3.5">Public Portal</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Internal Notes</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-slate-400">
                    No property records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredProperties.map(prop => {
                  const isJadSe = prop.constructionType === 'Jad Se' || prop.title.toLowerCase().includes('jad se');
                  return (
                    <tr key={prop.id} className="hover:bg-slate-50 transition-colors group">
                      
                      {/* Title & ID */}
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-[#101D35] group-hover:text-[#D4A853] transition-colors line-clamp-1 max-w-[200px]">
                          {prop.title}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 block">{prop.id}</span>
                      </td>

                      {/* Source */}
                      <td className="px-4 py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          prop.sourceType === 'Internal' ? 'bg-[#101D35] text-[#D4A853]' : 'bg-slate-100 text-slate-800'
                        }`}>
                          {prop.sourceName}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="px-4 py-3.5 font-medium text-slate-800 max-w-[140px] truncate">
                        📍 {prop.location}
                      </td>

                      {/* Type & Floor */}
                      <td className="px-4 py-3.5">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-slate-800 block">{prop.bhk}</span>
                          <span className="text-[11px] text-slate-500 block">{prop.floor}</span>
                          {isJadSe && (
                            <span className="text-[10px] font-bold text-amber-600 block">
                              ★ Jad Se
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Gaj / Size */}
                      <td className="px-4 py-3.5 font-mono text-xs font-semibold text-slate-800">
                        {prop.gaj || '—'}
                      </td>

                      {/* Price / Rent */}
                      <td className="px-4 py-3.5 font-bold text-[#101D35] whitespace-nowrap">
                        {prop.priceFormatted || (prop.rent ? `₹${prop.rent}/mo` : `₹${(prop.price/100000).toFixed(1)} L`)}
                      </td>

                      {/* Public Toggle */}
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => togglePublicVisibility(prop)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                            prop.isPublic ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                          title="Click to toggle visibility on public website"
                        >
                          {prop.isPublic ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{prop.isPublic ? 'Visible' : 'Internal'}</span>
                        </button>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          prop.availabilityStatus === 'Available' ? 'bg-emerald-100 text-emerald-800' :
                          prop.availabilityStatus === 'Sold' ? 'bg-rose-100 text-rose-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {prop.availabilityStatus}
                        </span>
                      </td>

                      {/* Internal Notes */}
                      <td className="px-4 py-3.5 max-w-[180px]">
                        <p className="text-[11px] text-slate-500 truncate" title={prop.internalNotes}>
                          {prop.internalNotes || <span className="italic text-slate-400">None</span>}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => onEditProperty(prop)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#101D35] hover:bg-slate-100 transition-colors"
                          title="Edit Property"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
