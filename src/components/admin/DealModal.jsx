import React, { useState, useEffect } from 'react';
import { X, GitPullRequest, IndianRupee, User, Home, Calendar, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function DealModal({ isOpen, onClose, dealToEdit }) {
  const { customers, properties, addDeal, updateDeal, deleteDeal } = useData();

  const [formData, setFormData] = useState({
    title: '',
    customerId: '',
    customerName: '',
    propertyId: '',
    propertyTitle: '',
    stage: 'New Lead',
    dealValue: '',
    expectedCommission: '',
    closeProbability: 50,
    targetCloseDate: '',
    notes: '',
  });

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (dealToEdit) {
      setFormData({
        title: dealToEdit.title || '',
        customerId: dealToEdit.customerId || '',
        customerName: dealToEdit.customerName || '',
        propertyId: dealToEdit.propertyId || '',
        propertyTitle: dealToEdit.propertyTitle || '',
        stage: dealToEdit.stage || 'New Lead',
        dealValue: dealToEdit.dealValue || '',
        expectedCommission: dealToEdit.expectedCommission || '',
        closeProbability: dealToEdit.closeProbability ?? 50,
        targetCloseDate: dealToEdit.targetCloseDate || '',
        notes: dealToEdit.notes || '',
      });
      setConfirmDelete(false);
    } else {
      const firstCust = customers[0];
      const firstProp = properties[0];
      setFormData({
        title: firstCust ? `${firstCust.name} Deal` : 'New Property Deal',
        customerId: firstCust?.id || '',
        customerName: firstCust?.name || '',
        propertyId: firstProp?.id || '',
        propertyTitle: firstProp?.title || '',
        stage: 'Interested',
        dealValue: firstProp?.price || 2500000,
        expectedCommission: 50000,
        closeProbability: 50,
        targetCloseDate: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
        notes: '',
      });
      setConfirmDelete(false);
    }
  }, [dealToEdit, isOpen, customers, properties]);

  if (!isOpen) return null;

  const handleCustomerChange = (custId) => {
    const cust = customers.find(c => c.id === custId);
    if (cust) {
      setFormData(prev => ({
        ...prev,
        customerId: cust.id,
        customerName: cust.name,
        title: `${cust.name} - ${prev.propertyTitle || 'Deal'}`,
      }));
    }
  };

  const handlePropertyChange = (propId) => {
    const prop = properties.find(p => p.id === propId);
    if (prop) {
      const val = prop.price || (prop.rent ? prop.rent * 12 : 2500000);
      setFormData(prev => ({
        ...prev,
        propertyId: prop.id,
        propertyTitle: prop.title,
        dealValue: val,
        expectedCommission: Math.round(val * 0.02), // 2% standard brokerage estimate
        title: `${prev.customerName || 'Customer'} - ${prop.title}`,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const dealData = {
      ...formData,
      dealValue: Number(formData.dealValue) || 0,
      expectedCommission: Number(formData.expectedCommission) || 0,
      closeProbability: Number(formData.closeProbability) || 50,
    };

    if (dealToEdit) {
      updateDeal(dealToEdit.id, dealData);
    } else {
      addDeal(dealData);
    }
    onClose();
  };

  const handleDelete = () => {
    if (dealToEdit) {
      deleteDeal(dealToEdit.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-['Outfit'] text-[#101D35]">
              {dealToEdit ? 'Edit Deal Pipeline Record' : 'Create New Deal in Pipeline'}
            </h3>
            <p className="text-xs text-slate-500">
              Track closing probability, token stage, and brokerage revenue
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Deal Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Vinay - 2 BHK Upper Ground Purchase"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Customer</label>
              <select
                value={formData.customerId}
                onChange={(e) => handleCustomerChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#D4A853] bg-white"
              >
                <option value="">Select Customer</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.dealType})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Property</label>
              <select
                value={formData.propertyId}
                onChange={(e) => handlePropertyChange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#D4A853] bg-white"
              >
                <option value="">Select Property</option>
                {properties.map(p => (
                  <option key={p.id} value={p.id}>{p.id} - {p.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Deal Stage *</label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#D4A853] bg-white"
              >
                <option value="New Lead">New Lead</option>
                <option value="Contacted">Contacted</option>
                <option value="Interested">Interested</option>
                <option value="Site Visit">Site Visit</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Deal Closed">Deal Closed (Won)</option>
                <option value="Lost">Deal Lost</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Closing Date</label>
              <input
                type="date"
                value={formData.targetCloseDate}
                onChange={(e) => setFormData({ ...formData, targetCloseDate: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Deal Value (₹)</label>
              <input
                type="number"
                placeholder="e.g. 2800000"
                value={formData.dealValue}
                onChange={(e) => setFormData({ ...formData, dealValue: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Est. Commission (₹)</label>
              <input
                type="number"
                placeholder="e.g. 56000"
                value={formData.expectedCommission}
                onChange={(e) => setFormData({ ...formData, expectedCommission: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Probability ({formData.closeProbability}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={formData.closeProbability}
                onChange={(e) => setFormData({ ...formData, closeProbability: Number(e.target.value) })}
                className="w-full mt-2 accent-[#D4A853]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Negotiation / Deal Notes</label>
            <textarea
              rows={3}
              placeholder="e.g. Customer offered 27 Lakhs, seller counter-offered 28 Lakhs. Meeting arranged Sunday."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            {dealToEdit ? (
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
                {dealToEdit ? 'Save Deal' : 'Create Deal'}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
