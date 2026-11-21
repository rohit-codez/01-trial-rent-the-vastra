import React, { useState } from 'react';
import { 
  UserCheck, 
  Search, 
  Plus, 
  Phone, 
  MessageSquare, 
  Building2, 
  MapPin, 
  Home, 
  Edit, 
  Download, 
  CheckCircle2, 
  ChevronRight,
  IndianRupee,
  Layers
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function CoAgentManagement({ onOpenAdd, onEditAgent, onSelectProperty }) {
  const { coAgents, properties, exportCSV } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgentId, setSelectedAgentId] = useState(coAgents[0]?.id || null);

  const filteredAgents = coAgents.filter(agent => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      agent.name.toLowerCase().includes(q) ||
      (agent.shortName || '').toLowerCase().includes(q) ||
      String(agent.phone).includes(q) ||
      (agent.agencyName || '').toLowerCase().includes(q) ||
      (agent.location || '').toLowerCase().includes(q) ||
      (agent.propertyDetails || '').toLowerCase().includes(q)
    );
  });

  const selectedAgent = coAgents.find(a => a.id === selectedAgentId) || filteredAgents[0];

  // Properties linked to this agent
  const linkedProperties = properties.filter(p => p.coAgentId === selectedAgent?.id);

  const handleExport = () => {
    exportCSV(coAgents, 'pradhan_properties_coagents');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-['Outfit'] text-[#101D35]">
            Co-Agent Management & Broker Network
          </h1>
          <p className="text-xs text-slate-500">
            Total {coAgents.length} verified co-agents • Shared inventory from Vikas Agg., Chahar Manu, Jai Prakash & associates
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
            <span>Add Co-Agent</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search co-agent by name, agency, phone (e.g. Vikas Agg., Chahar Manu), area, or shared listing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
          />
        </div>
      </div>

      {/* 2-Column Layout: Agent Directory & Selected Agent Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Co-Agents List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Registered Co-Agents ({filteredAgents.length})
          </h3>

          <div className="space-y-2.5">
            {filteredAgents.map(agent => {
              const isSelected = selectedAgent?.id === agent.id;
              const propsCount = properties.filter(p => p.coAgentId === agent.id).length;
              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#101D35] text-white border-[#D4A853] shadow-md'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-[#101D35]'}`}>
                          {agent.name}
                        </h4>
                        {agent.shortName && (
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            isSelected ? 'bg-[#182B4D] text-[#D4A853]' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {agent.shortName}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {agent.agencyName || 'Independent Real Estate Associate'}
                      </p>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {agent.id}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200/20 flex items-center justify-between text-xs">
                    <span className={`flex items-center gap-1 ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                      <MapPin className="w-3 h-3 text-[#D4A853]" />
                      <span className="truncate max-w-[150px]">{agent.location || 'West Delhi'}</span>
                    </span>

                    <span className={`font-semibold ${isSelected ? 'text-[#D4A853]' : 'text-indigo-600'}`}>
                      {propsCount} linked {propsCount === 1 ? 'property' : 'properties'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Co-Agent Profile & Shared Inventory */}
        {selectedAgent && (
          <div className="lg:col-span-2 space-y-6">
            
            {/* Agent Detail Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#101D35] text-[#D4A853] flex items-center justify-center font-bold text-xl font-['Outfit'] border border-[#D4A853]/40 shadow-sm">
                    {selectedAgent.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold font-['Outfit'] text-[#101D35]">
                        {selectedAgent.name}
                      </h2>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {selectedAgent.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {selectedAgent.agencyName} • {selectedAgent.location}
                    </p>
                  </div>
                </div>

                {/* Edit & Contact Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedAgent.phone}`}
                    className="p-2.5 rounded-xl bg-[#101D35] hover:bg-[#182B4D] text-[#D4A853] transition-colors"
                    title="Call Co-Agent"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://wa.me/91${selectedAgent.phone}?text=Namaste%20${selectedAgent.name}%20ji%2C%20this%20is%20from%20Pradhan%20Properties.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white transition-colors"
                    title="WhatsApp Co-Agent"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => onEditAgent(selectedAgent)}
                    className="p-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 transition-colors"
                    title="Edit Co-Agent Details"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Specs & Portfolio Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Phone</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{selectedAgent.phone}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Gaj / Land Size</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedAgent.gaj || selectedAgent.landSize || 'Variable'}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Price Segment</span>
                  <span className="font-bold text-[#101D35] text-sm">{selectedAgent.price || 'Market Rates'}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Network Status</span>
                  <span className="font-bold text-emerald-600 text-sm">{selectedAgent.availability || 'Active'}</span>
                </div>
              </div>

              {/* Original Property Details from Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Shared Inventory & Requirements Record
                </h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-wrap">
                  {selectedAgent.propertyDetails || 'No additional property specs recorded.'}
                </div>
              </div>

              {/* Internal Broker Notes */}
              {selectedAgent.notes && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Internal Collaboration Notes
                  </h4>
                  <p className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 leading-relaxed">
                    {selectedAgent.notes}
                  </p>
                </div>
              )}

            </div>

            {/* Properties Linked to this Co-Agent */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold font-['Outfit'] text-[#101D35] flex items-center gap-2">
                  <Home className="w-4 h-4 text-[#D4A853]" />
                  <span>Properties Shared by {selectedAgent.name} ({linkedProperties.length})</span>
                </h3>
              </div>

              {linkedProperties.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No property listings currently linked to this co-agent. You can link properties when adding or editing an inventory item.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {linkedProperties.map(prop => (
                    <div
                      key={prop.id}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-[#D4A853] hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-400">{prop.id}</span>
                          <span className="text-xs font-bold text-[#101D35]">
                            {prop.priceFormatted || `₹${(prop.price/100000).toFixed(1)} L`}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#101D35] line-clamp-1 group-hover:text-[#D4A853]">
                          {prop.title}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {prop.bhk} • {prop.floor} • {prop.gaj}
                        </p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-emerald-600 font-semibold">{prop.availabilityStatus}</span>
                        <span className="text-slate-400 italic">Added {prop.dateAdded}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
