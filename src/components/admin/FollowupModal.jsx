import React, { useState, useEffect } from 'react';
import { X, CalendarClock, Phone, User, CheckCircle2, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function FollowupModal({ isOpen, onClose, followupToEdit }) {
  const { customers, addFollowup, updateFollowup, deleteFollowup } = useData();

  const [formData, setFormData] = useState({
    customerId: '',
    customerName: '',
    phone: '',
    requirement: '',
    lastConversation: '',
    dueDate: new Date().toISOString().split('T')[0],
    status: 'Pending',
    notes: '',
  });

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (followupToEdit) {
      setFormData({
        customerId: followupToEdit.customerId || '',
        customerName: followupToEdit.customerName || '',
        phone: String(followupToEdit.phone || ''),
        requirement: followupToEdit.requirement || '',
        lastConversation: followupToEdit.lastConversation || '',
        dueDate: followupToEdit.dueDate || new Date().toISOString().split('T')[0],
        status: followupToEdit.status || 'Pending',
        notes: followupToEdit.notes || '',
      });
      setConfirmDelete(false);
    } else {
      const firstCust = customers[0];
      setFormData({
        customerId: firstCust?.id || '',
        customerName: firstCust?.name || '',
        phone: String(firstCust?.phone || ''),
        requirement: firstCust ? `${firstCust.bhk || ''} ${firstCust.dealType || ''} ${firstCust.budget || ''}`.trim() : '',
        lastConversation: '',
        dueDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
        notes: '',
      });
      setConfirmDelete(false);
    }
  }, [followupToEdit, isOpen, customers]);

  if (!isOpen) return null;

  const handleCustomerSelect = (custId) => {
    const cust = customers.find(c => c.id === custId);
    if (cust) {
      setFormData({
        ...formData,
        customerId: cust.id,
        customerName: cust.name,
        phone: String(cust.phone),
        requirement: `${cust.bhk || ''} ${cust.dealType || ''} ${cust.budget || ''}`.trim() || cust.notes || 'Buyer Requirement',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customerName) return;

    if (followupToEdit) {
      updateFollowup(followupToEdit.id, formData);
    } else {
      addFollowup(formData);
    }
    onClose();
  };

  const handleDelete = () => {
    if (followupToEdit) {
      deleteFollowup(followupToEdit.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-['Outfit'] text-[#101D35]">
              {followupToEdit ? 'Edit Follow-up Log' : 'Schedule Customer Follow-up'}
            </h3>
            <p className="text-xs text-slate-500">
              Keep customer relationships warm and never miss an inspection
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Customer *</label>
            <select
              value={formData.customerId}
              onChange={(e) => handleCustomerSelect(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#D4A853] bg-white"
            >
              <option value="">Select Existing Customer</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.phone}) - {c.dealType}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Name</label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Follow-up Due Date *</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#D4A853] bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Property Requirement</label>
            <input
              type="text"
              placeholder="e.g. 3 BHK Jad Se, 40 Lakhs budget in Nawada"
              value={formData.requirement}
              onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Last Conversation / What happened?</label>
            <textarea
              rows={2}
              placeholder="e.g. Sent WhatsApp brochure. Agreed to visit site Sunday afternoon."
              value={formData.lastConversation}
              onChange={(e) => setFormData({ ...formData, lastConversation: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Next Action Required</label>
            <textarea
              rows={2}
              placeholder="e.g. Call at 11 AM to confirm meeting at Nawada metro pillar 760."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            {followupToEdit ? (
              <div>
                {confirmDelete ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-rose-600 font-bold">Delete?</span>
                    <button type="button" onClick={handleDelete} className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold">
                      Yes
                    </button>
                    <button type="button" onClick={() => setConfirmDelete(false)} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs">
                      No
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setConfirmDelete(true)} className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            ) : <div />}

            <div className="flex items-center gap-3">
              <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#101D35] text-[#D4A853] font-bold text-xs uppercase border border-[#D4A853]/40">
                {followupToEdit ? 'Save Follow-up' : 'Create Follow-up'}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
