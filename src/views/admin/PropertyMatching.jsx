import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Users, 
  Home, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Bed, 
  Layers, 
  IndianRupee, 
  ExternalLink,
  Info,
  Check,
  Copy
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function PropertyMatching({ preSelectedCustomer }) {
  const { customers, properties, findMatchesForCustomer, generateWhatsAppMessage } = useData();

  const [selectedCustomerId, setSelectedCustomerId] = useState(() => {
    return preSelectedCustomer?.id || customers[0]?.id || '';
  });

  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (preSelectedCustomer?.id) {
      setSelectedCustomerId(preSelectedCustomer.id);
    }
  }, [preSelectedCustomer]);

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  const matches = selectedCustomer 
    ? findMatchesForCustomer(selectedCustomer) 
    : { exact: [], partial: [], alternative: [], isMissingCriticalData: false };

  const handleCopyMessage = (property) => {
    const text = generateWhatsAppMessage(selectedCustomer, property);
    navigator.clipboard.writeText(text);
    setCopiedId(property.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleOpenWhatsApp = (property) => {
    const text = encodeURIComponent(generateWhatsAppMessage(selectedCustomer, property));
    const phone = selectedCustomer?.phone ? `91${selectedCustomer.phone}` : '';
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#101D35] to-[#182B4D] rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-[#D4A853]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A853]/20 border border-[#D4A853]/40 text-[#D4A853] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>AI-Driven Customer-Property Match Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit']">
            Intelligent Inventory Matching
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Matches active buyer/investor requirements against inventory using Budget, BHK, Floor, Gaj and Construction Type (Jad Se vs Builder Floor).
          </p>
        </div>

        {/* Customer Selector Dropdown in Banner */}
        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 w-full md:w-80">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#D4A853] mb-1.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>Select Customer to Match</span>
          </label>
          <select
            value={selectedCustomerId}
            onChange={(e) => setSelectedCustomerId(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-white text-[#101D35] text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#D4A853]"
          >
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.dealType}) - {c.bhk || 'No BHK'} {c.budget || ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCustomer && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-['Outfit'] text-[#101D35]">
                  Active Requirement Profile: {selectedCustomer.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {selectedCustomer.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  {selectedCustomer.dealType}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Phone: <strong className="font-mono text-slate-700">{selectedCustomer.phone}</strong> • Status: <strong className="text-indigo-600">{selectedCustomer.status}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${selectedCustomer.phone}`}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-[#101D35] text-slate-700 hover:text-[#D4A853] text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Client</span>
              </a>
            </div>
          </div>

          {/* Quick Criteria Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Budget</span>
              <span className="font-bold text-[#101D35] text-sm">{selectedCustomer.budget || 'Open / Not fixed'}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Configuration</span>
              <span className="font-bold text-[#101D35] text-sm">{selectedCustomer.bhk || 'Not specified'}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Structure / Jad Se</span>
              <span className={`font-bold text-sm ${selectedCustomer.constructionType === 'Jad Se' ? 'text-amber-600' : 'text-[#101D35]'}`}>
                {selectedCustomer.constructionType || 'Any Structure'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Preferred Floor</span>
              <span className="font-bold text-[#101D35] text-sm">{selectedCustomer.preferredFloor || 'Any Floor'}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Plot Size (Gaj)</span>
              <span className="font-bold text-[#101D35] text-sm">{selectedCustomer.gaj || 'Standard'}</span>
            </div>
          </div>

          {/* Notes display */}
          {selectedCustomer.notes && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
              <Info className="w-4 h-4 text-[#D4A853] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Recorded Customer Notes:</strong> {selectedCustomer.notes}
              </div>
            </div>
          )}

          {/* Ambiguity / Critical Missing Info Alert */}
          {matches.isMissingCriticalData && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Strict Matching Guard:</strong> Customer profile is missing critical details (e.g. BHK, budget, or flagged for review). Properties are classified as <em>Partial</em> or <em>Alternative</em> matches until details are fully verified.
              </span>
            </div>
          )}
        </div>
      )}

      {/* 3 MATCH TIERS (Section 10 requirement: Exact, Partial, Alternative) */}
      <div className="space-y-10">
        
        {/* TIER 1: EXACT MATCHES */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></span>
              <h2 className="text-lg font-bold font-['Outfit'] text-[#101D35]">
                Exact Matches ({matches.exact.length})
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Meets budget, BHK, construction type, and floor alignment
            </span>
          </div>

          {matches.exact.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-xs text-slate-500">
              No exact matches in current inventory. Check partial matches below or add a new property listing.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.exact.map(({ property, score, reasons }) => (
                <MatchCard
                  key={property.id}
                  property={property}
                  score={score}
                  reasons={reasons}
                  tier="exact"
                  onWhatsApp={() => handleOpenWhatsApp(property)}
                  onCopy={() => handleCopyMessage(property)}
                  copied={copiedId === property.id}
                />
              ))}
            </div>
          )}
        </div>

        {/* TIER 2: PARTIAL MATCHES */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#D4A853] ring-4 ring-amber-100"></span>
              <h2 className="text-lg font-bold font-['Outfit'] text-[#101D35]">
                Partial Matches ({matches.partial.length})
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Compatible budget (±20%), matching BHK or location with flexible floor
            </span>
          </div>

          {matches.partial.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-xs text-slate-500">
              No partial matches available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.partial.map(({ property, score, reasons }) => (
                <MatchCard
                  key={property.id}
                  property={property}
                  score={score}
                  reasons={reasons}
                  tier="partial"
                  onWhatsApp={() => handleOpenWhatsApp(property)}
                  onCopy={() => handleCopyMessage(property)}
                  copied={copiedId === property.id}
                />
              ))}
            </div>
          )}
        </div>

        {/* TIER 3: ALTERNATIVE PROPERTIES */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-400 ring-4 ring-slate-100"></span>
              <h2 className="text-lg font-bold font-['Outfit'] text-[#101D35]">
                Alternative Properties ({matches.alternative.length})
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Nearby locality or comparable options to pitch if primary choice is unavailable
            </span>
          </div>

          {matches.alternative.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-xs text-slate-500">
              No alternative properties available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.alternative.map(({ property, score, reasons }) => (
                <MatchCard
                  key={property.id}
                  property={property}
                  score={score}
                  reasons={reasons}
                  tier="alternative"
                  onWhatsApp={() => handleOpenWhatsApp(property)}
                  onCopy={() => handleCopyMessage(property)}
                  copied={copiedId === property.id}
                />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

// Subcomponent: Match Result Card
function MatchCard({ property, score, reasons, tier, onWhatsApp, onCopy, copied }) {
  const isJadSe = property.constructionType === 'Jad Se' || property.title.toLowerCase().includes('jad se');

  const badgeColor = 
    tier === 'exact' ? 'bg-emerald-500 text-white' :
    tier === 'partial' ? 'bg-[#D4A853] text-[#101D35]' :
    'bg-slate-200 text-slate-700';

  const photo = property.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
      <div>
        {/* Photo Header */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
          <img src={photo} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}>
              {tier === 'exact' ? 'Exact Match' : tier === 'partial' ? 'Partial Match' : 'Alternative'}
            </span>

            {isJadSe && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D4A853] text-[#101D35]">
                ★ Jad Se
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold font-['Outfit'] text-[#D4A853]">
                {property.priceFormatted || `₹${(property.price/100000).toFixed(1)} L`}
              </span>
              <span className="text-[10px] font-mono text-slate-300">
                {property.id}
              </span>
            </div>
            <p className="text-xs truncate font-medium text-slate-200">
              📍 {property.location}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-3">
          <h4 className="text-sm font-bold text-[#101D35] line-clamp-1">
            {property.title}
          </h4>

          {/* Quick Specs */}
          <div className="grid grid-cols-3 gap-1.5 py-2 border-y border-slate-100 text-[11px] text-slate-600">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">BHK</span>
              <span className="font-bold text-slate-800">{property.bhk}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Gaj</span>
              <span className="font-bold text-slate-800">{property.gaj || 'Plot'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Floor</span>
              <span className="font-bold text-slate-800 truncate block">{property.floor}</span>
            </div>
          </div>

          {/* Why it matches reasons checklist */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Match Criteria Breakdown:
            </span>
            <ul className="space-y-1 text-xs text-slate-600">
              {reasons.slice(0, 3).map((r, i) => (
                <li key={i} className="flex items-center gap-1.5 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* WhatsApp Sharing CTA (Section 10 requirement) */}
      <div className="p-4 pt-2 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={onWhatsApp}
          className="flex-1 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-transform hover:scale-[1.02]"
          title="Send matching brochure on WhatsApp"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Send via WhatsApp</span>
        </button>

        <button
          onClick={onCopy}
          className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold"
          title="Copy WhatsApp Message Text"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
}
