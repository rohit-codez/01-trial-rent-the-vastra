import React, { useState, useEffect } from 'react';
import { X, UserCheck, Phone, Building2, MapPin, IndianRupee, Layers, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function CoAgentModal({ isOpen, onClose, agentToEdit }) {
  const { addCoAgent, updateCoAgent, deleteCoAgent } = useData();

  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    phone: '',
    agencyName: '',
    location: 'Uttam Nagar',
    propertyDetails: '',
    landSize: '',
    rent: '',
    bhk: '',
    gaj: '',
    price: '',
    notes: '',
    availability: 'Active',
  });

  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (agentToEdit) {
      setFormData({
        name: agentToEdit.name || '',
        shortName: agentToEdit.shortName || '',
        phone: String(agentToEdit.phone || ''),
        agencyName: agentToEdit.agencyName || '',
        location: agentToEdit.location || '',
        propertyDetails: agentToEdit.propertyDetails || '',
        landSize: agentToEdit.landSize || '',
        rent: agentToEdit.rent || '',
        bhk: agentToEdit.bhk || '',
        gaj: agentToEdit.gaj || '',
        price: agentToEdit.price || '',
        notes: agentToEdit.notes || '',
        availability: agentToEdit.availability || 'Active',
      });
      setConfirmDelete(false);
    } else {
      setFormData({
        name: '',
        shortName: '',
        phone: '',
        agencyName: '',
        location: 'Uttam Nagar',
        propertyDetails: '',
        landSize: '',
        rent: '',
        bhk: '2 BHK',
        gaj: '',
        price: '',
        notes: '',
        availability: 'Active',
      });
      setConfirmDelete(false);
    }
  }, [agentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    if (agentToEdit) {
      updateCoAgent(agentToEdit.id, formData);
    } else {
      addCoAgent(formData);
    }
    onClose();
  };

  const handleDelete = () => {
    if (agentToEdit) {
      deleteCoAgent(agentToEdit.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-['Outfit'] text-[#101D35]">
              {agentToEdit ? `Edit Co-Agent: ${agentToEdit.name}` : 'Add New Co-Agent'}
            </h3>
            <p className="text-xs text-slate-500">
              Manage external broker connections and shared inventory
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Agent Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikas Aggarwal"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Short / Informal Name</label>
              <input
                type="text"
                placeholder="e.g. Vikas Agg."
                value={formData.shortName}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (Text) *</label>
              <input
                type="text"
                required
                placeholder="e.g. 9811223344"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Agency / Office Name</label>
              <input
                type="text"
                placeholder="e.g. Aggarwal Real Estate"
                value={formData.agencyName}
                onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Operational Area / Location</label>
            <input
              type="text"
              placeholder="e.g. Uttam Nagar / Mohan Garden / Som Bazar"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Land / Gaj</label>
              <input
                type="text"
                placeholder="e.g. 40-50 Gaj"
                value={formData.gaj}
                onChange={(e) => setFormData({ ...formData, gaj: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Price Range</label>
              <input
                type="text"
                placeholder="e.g. 15–18 Lakhs"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Rent / Commercial Info</label>
              <input
                type="text"
                placeholder="e.g. 9/6 Dukan Hai"
                value={formData.rent}
                onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Property Inventory Details</label>
            <textarea
              rows={2}
              placeholder="e.g. 50 Gaj 2 Side Ground Floor, 15 Lakhs; 42 Gaj L-Type"
              value={formData.propertyDetails}
              onChange={(e) => setFormData({ ...formData, propertyDetails: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Co-Agent Notes / Terms</label>
            <textarea
              rows={2}
              placeholder="Commission sharing ratio, direct contacts, key access instructions..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            {agentToEdit ? (
              <div>
                {confirmDelete ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-rose-600 font-bold">Delete agent?</span>
                    <button type="button" onClick={handleDelete} className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold">
                      Confirm
                    </button>
                    <button type="button" onClick={() => setConfirmDelete(false)} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setConfirmDelete(true)} className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 px-2 py-1">
                    <Trash2 className="w-4 h-4" />
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
                {agentToEdit ? 'Save Changes' : 'Add Co-Agent'}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
