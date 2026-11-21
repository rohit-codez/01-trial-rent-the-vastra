import React from 'react';
import { 
  Inbox, 
  Phone, 
  MessageSquare, 
  UserPlus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  IndianRupee 
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function EnquiriesInbox({ onOpenCustomerDetail }) {
  const { enquiries, updateEnquiry, deleteEnquiry, convertEnquiryToCustomer } = useData();

  const handleConvert = (enq) => {
    const newCustomer = convertEnquiryToCustomer(enq.id);
    if (newCustomer && onOpenCustomerDetail) {
      onOpenCustomerDetail(newCustomer);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-['Outfit'] text-[#101D35]">
          Website Enquiries & Inbound Leads
        </h1>
        <p className="text-xs text-slate-500">
          Messages received from public website "Sell Your Property", callback requests, and Contact forms
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {enquiries.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No public inquiries received yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {enquiries.map(enq => (
              <div
                key={enq.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                      {enq.id}
                    </span>
                    <h3 className="text-sm font-bold text-[#101D35]">{enq.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      enq.serviceType === 'Sell' ? 'bg-amber-100 text-amber-800' :
                      enq.serviceType === 'Rent' ? 'bg-cyan-100 text-cyan-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {enq.serviceType}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-700">
                      📞 {enq.phone}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    {enq.preferredLocation && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#D4A853]" />
                        <span>{enq.preferredLocation}</span>
                      </span>
                    )}
                    {enq.budget && (
                      <span>Budget: <strong className="text-slate-800">{enq.budget}</strong></span>
                    )}
                    <span className="text-[11px] text-slate-400">Received on {enq.date}</span>
                  </div>

                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                    "{enq.message}"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <a
                    href={`tel:${enq.phone}`}
                    className="p-2.5 rounded-xl bg-[#101D35] hover:bg-[#182B4D] text-[#D4A853] transition-colors"
                    title="Call Lead"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://wa.me/91${enq.phone}?text=Namaste%20${enq.name}%20ji%2C%20thank%20you%20for%20contacting%20Pradhan%20Properties.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white transition-colors"
                    title="WhatsApp Lead"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>

                  {enq.status !== 'Converted to Customer' ? (
                    <button
                      onClick={() => handleConvert(enq)}
                      className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B88D3B] text-[#101D35] text-xs font-bold flex items-center gap-1 shadow-xs hover:brightness-105"
                      title="Create Customer record in CRM"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Convert to Customer</span>
                    </button>
                  ) : (
                    <span className="px-3 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      ✓ In CRM
                    </span>
                  )}

                  <button
                    onClick={() => deleteEnquiry(enq.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
