import React, { useState, useEffect } from 'react';
import { X, User, Phone, MapPin, IndianRupee, Layers, FileText, Calendar, AlertTriangle, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function CustomerModal({ isOpen, onClose, customerToEdit }) {
  const { addCustomer, updateCustomer, deleteCustomer } = useData();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    dealType: 'Buy',
    bhk: '2 BHK',
    budget: '',
    gaj: '',
    constructionType: 'Floor',
    preferredFloor: 'Upper Ground Floor',
    notes: '',
    status: 'New',
    nextFollowupDate: '',
    assignedAgent: 'Pradhan Properties Team',
    needsReview: false,
    reviewNote: '',
  });

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (customerToEdit) {
      setFormData({
        name: customerToEdit.name || '',
        phone: String(customerToEdit.phone || ''),
        address: customerToEdit.address || '',
        dealType: customerToEdit.dealType || 'Buy',
        bhk: customerToEdit.bhk || '',
        budget: customerToEdit.budget || '',
        gaj: customerToEdit.gaj || '',
        constructionType: customerToEdit.constructionType || '',
        preferredFloor: customerToEdit.preferredFloor || 'Any Floor',
        notes: customerToEdit.notes || '',
        status: customerToEdit.status || 'New',
        nextFollowupDate: customerToEdit.nextFollowupDate || '',
        assignedAgent: customerToEdit.assignedAgent || 'Pradhan Properties Team',
        needsReview: customerToEdit.needsReview || false,
        reviewNote: customerToEdit.reviewNote || '',
      });
      setConfirmDelete(false);
    } else {
      setFormData({
        name: '',
        phone: '',
        address: '',
        dealType: 'Buy',
        bhk: '2 BHK',
        budget: '',
        gaj: '',
        constructionType: 'Floor',
        preferredFloor: 'Any Floor',
        notes: '',
        status: 'New',
        nextFollowupDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        assignedAgent: 'Pradhan Properties Team',
        needsReview: false,
        reviewNote: '',
      });
      setConfirmDelete(false);
    }
  }, [customerToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    if (customerToEdit) {
      updateCustomer(customerToEdit.id, formData);
    } else {
      addCustomer(formData);
    }
    onClose();
  };

  const handleDelete = () => {
    if (customerToEdit) {
      deleteCustomer(customerToEdit.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-['Outfit'] text-[#101D35]">
              {customerToEdit ? `Edit Customer: ${customerToEdit.name} (${customerToEdit.id})` : 'Add New Customer Record'}
            </h3>
            <p className="text-xs text-slate-500">
              Private business record • Stored strictly in CRM
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Review Warning if Flagged */}
          {formData.needsReview && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Information Flagged for Review</span>
              </div>
              <input
                type="text"
                placeholder="Explanation of review note..."
                value={formData.reviewNote}
                onChange={(e) => setFormData({ ...formData, reviewNote: e.target.value })}
                className="w-full px-3 py-1.5 rounded-lg border border-amber-300 text-xs bg-white text-amber-950 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          )}

          {/* Section: Basic Identity */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101D35] flex items-center gap-2">
              <User className="w-4 h-4 text-[#D4A853]" />
              <span>Identity & Contact</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ajay Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number (Stored as Text) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 9319539206"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Customer Address / Landmark
              </label>
              <input
                type="text"
                placeholder="e.g. 101 - B/1 registry, Gali No. 3 Nanhe Park"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>
          </div>

          {/* Section: Requirement Specs */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101D35] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D4A853]" />
              <span>Property Requirement Details</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Deal Type</label>
                <select
                  value={formData.dealType}
                  onChange={(e) => setFormData({ ...formData, dealType: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                  <option value="Rent">Rent</option>
                  <option value="Invest">Invest</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Required BHK</label>
                <select
                  value={formData.bhk}
                  onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="">(Not specified)</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                  <option value="Review Required">Review Required</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Budget</label>
                <input
                  type="text"
                  placeholder="e.g. 25 Lakhs, 1–1.25 Crore"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Plot Size (Gaj)</label>
                <input
                  type="text"
                  placeholder="e.g. 45 Gaj, 62 Gaj"
                  value={formData.gaj}
                  onChange={(e) => setFormData({ ...formData, gaj: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Construction Type</label>
                <select
                  value={formData.constructionType}
                  onChange={(e) => setFormData({ ...formData, constructionType: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="">(Any / Not Specified)</option>
                  <option value="Jad Se">Jad Se (Pillar to Roof)</option>
                  <option value="Floor">Floor in Building</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Floor</label>
                <select
                  value={formData.preferredFloor}
                  onChange={(e) => setFormData({ ...formData, preferredFloor: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="Any Floor">Any Floor</option>
                  <option value="Basement">Basement</option>
                  <option value="Ground Floor">Ground Floor</option>
                  <option value="Upper Ground Floor">Upper Ground Floor</option>
                  <option value="First Floor">First Floor</option>
                  <option value="Second Floor">Second Floor</option>
                  <option value="Third Floor">Third Floor</option>
                  <option value="Top Floor">Top Floor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Status & CRM Workflow */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101D35] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#D4A853]" />
              <span>CRM Workflow & Follow-up</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Interested">Interested</option>
                  <option value="Site Visit">Site Visit</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Closed">Closed</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Next Follow-up Date</label>
                <input
                  type="date"
                  value={formData.nextFollowupDate}
                  onChange={(e) => setFormData({ ...formData, nextFollowupDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Agent</label>
                <input
                  type="text"
                  value={formData.assignedAgent}
                  onChange={(e) => setFormData({ ...formData, assignedAgent: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Internal Requirements / Original Notes
              </label>
              <textarea
                rows={3}
                placeholder="Preserve raw customer requirements, grandmother floor preferences, registry details..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>

            {/* Needs Review Toggle */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="needsReviewToggle"
                checked={formData.needsReview}
                onChange={(e) => setFormData({ ...formData, needsReview: e.target.checked })}
                className="w-4 h-4 rounded text-[#D4A853] focus:ring-[#D4A853]"
              />
              <label htmlFor="needsReviewToggle" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Mark as "Needs Verification / Review" (Ambiguous or incomplete data)
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            {customerToEdit ? (
              <div>
                {confirmDelete ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-rose-600 font-bold">Confirm delete?</span>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
                    >
                      Yes, Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Customer</span>
                  </button>
                )}
              </div>
            ) : <div />}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#101D35] hover:bg-[#182B4D] text-[#D4A853] font-bold text-xs uppercase tracking-wider border border-[#D4A853]/40 shadow-sm"
              >
                {customerToEdit ? 'Save Changes' : 'Create Customer'}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
