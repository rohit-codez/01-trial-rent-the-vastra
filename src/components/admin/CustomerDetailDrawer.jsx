import React from 'react';
import { 
  X, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Bed, 
  IndianRupee, 
  Maximize2, 
  Layers, 
  Calendar, 
  User, 
  Sparkles, 
  AlertTriangle, 
  Edit, 
  FileText 
} from 'lucide-react';

export default function CustomerDetailDrawer({ customer, onClose, onEdit, onFindMatches }) {
  if (!customer) return null;

  const whatsappMessage = encodeURIComponent(
    `Namaste ${customer.name} ji, this is from Pradhan Properties (West Delhi). We are following up regarding your property requirement.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
        
        {/* Top Header */}
        <div className="p-6 bg-[#101D35] text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#182B4D] text-[#D4A853] border border-[#D4A853]/40">
                {customer.id}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                customer.dealType === 'Sell' ? 'bg-amber-500/20 text-amber-300' :
                customer.dealType === 'Invest' ? 'bg-purple-500/20 text-purple-300' :
                'bg-emerald-500/20 text-emerald-300'
              }`}>
                {customer.dealType || 'Buy'}
              </span>
            </div>
            <h2 className="text-xl font-bold font-['Outfit'] mt-1 text-white">
              {customer.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(customer)}
              className="p-2 rounded-xl bg-[#182B4D] hover:bg-[#233D6B] text-[#D4A853] transition-colors"
              title="Edit Customer"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#182B4D] hover:bg-[#233D6B] text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 space-y-6">
          
          {/* Review Warning if Flagged */}
          {customer.needsReview && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Notice: Ambiguous Entry / Verification Needed</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                {customer.reviewNote || 'Original sheet contains ambiguous values or missing fields. Verify with customer.'}
              </p>
            </div>
          )}

          {/* Quick Contact Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Contact Phone</p>
              <p className="text-base font-bold font-mono text-[#101D35]">{customer.phone}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <a
                href={`tel:${customer.phone}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#101D35] text-[#D4A853] text-xs font-bold hover:bg-[#182B4D] transition-transform hover:scale-105"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>

              <a
                href={`https://wa.me/91${customer.phone}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba5a] transition-transform hover:scale-105 shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Core Specs Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Customer Requirements Specification
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Budget</span>
                <span className="text-sm font-bold text-[#101D35]">{customer.budget || 'Open / Not fixed'}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Configuration</span>
                <span className="text-sm font-bold text-[#101D35]">{customer.bhk || 'Not specified'}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Plot Size (Gaj)</span>
                <span className="text-sm font-bold text-[#101D35]">{customer.gaj || 'Any size'}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Structure</span>
                <span className={`text-sm font-bold ${customer.constructionType === 'Jad Se' ? 'text-amber-600' : 'text-[#101D35]'}`}>
                  {customer.constructionType || 'Any'}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Preferred Floor</span>
                <span className="text-sm font-bold text-[#101D35]">{customer.preferredFloor || 'Any'}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block mb-0.5">Deal Status</span>
                <span className="text-sm font-bold text-indigo-600">{customer.status}</span>
              </div>
            </div>
          </div>

          {/* Address & Assigned Agent */}
          <div className="space-y-3 text-xs">
            {customer.address && (
              <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <MapPin className="w-4 h-4 text-[#D4A853] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-500 block">Address / Registry:</span>
                  <span className="font-medium text-slate-800">{customer.address}</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-slate-500">Next Scheduled Follow-up:</span>
              <span className="font-bold text-[#101D35]">{customer.nextFollowupDate || 'None scheduled'}</span>
            </div>
          </div>

          {/* Raw Notes & Information */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#D4A853]" />
              <span>Original Notes & Requirement Context</span>
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-wrap">
              {customer.notes || 'No specific notes recorded yet.'}
            </div>
          </div>

          {/* Direct Matching Action Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                onFindMatches(customer);
                onClose();
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D4A853] to-[#B88D3B] text-[#101D35] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:brightness-105"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Find Matching Properties for {customer.name}</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Created: {customer.createdDate}</span>
          <button
            onClick={() => onEdit(customer)}
            className="text-xs font-bold text-[#101D35] hover:text-[#D4A853] underline"
          >
            Edit Customer Details
          </button>
        </div>

      </div>
    </div>
  );
}
