import React, { useState, useEffect } from 'react';
import { 
  X, 
  Home, 
  MapPin, 
  IndianRupee, 
  Layers, 
  Car, 
  Compass, 
  FileText, 
  Image, 
  Trash2, 
  Eye, 
  EyeOff,
  UploadCloud,
  Star,
  Plus,
  Loader2
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { processImageFile } from '../../utils/imageUtils';

export default function PropertyModal({ isOpen, onClose, propertyToEdit }) {
  const { coAgents, addProperty, updateProperty, deleteProperty } = useData();

  const [formData, setFormData] = useState({
    title: '',
    sourceType: 'Internal',
    sourceName: 'Pradhan Properties',
    coAgentId: '',
    location: 'Uttam Nagar',
    propertyType: 'Builder Floors',
    dealType: 'Sale',
    bhk: '2 BHK',
    gaj: '50 Gaj',
    builtUpArea: '450 sq.ft',
    price: '',
    rent: '',
    priceFormatted: '',
    constructionType: 'Floor',
    floor: 'First Floor',
    totalFloors: '4 Floors',
    parking: 'Bike & Car Parking',
    facing: 'North Facing',
    description: '',
    photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
    availabilityStatus: 'Available',
    isPublic: true,
    isFeatured: false,
    internalNotes: '',
  });

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [photoInput, setPhotoInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (propertyToEdit) {
      setFormData({
        title: propertyToEdit.title || '',
        sourceType: propertyToEdit.sourceType || 'Internal',
        sourceName: propertyToEdit.sourceName || 'Pradhan Properties',
        coAgentId: propertyToEdit.coAgentId || '',
        location: propertyToEdit.location || 'Uttam Nagar',
        propertyType: propertyToEdit.propertyType || 'Builder Floors',
        dealType: propertyToEdit.dealType || 'Sale',
        bhk: propertyToEdit.bhk || '2 BHK',
        gaj: propertyToEdit.gaj || '',
        builtUpArea: propertyToEdit.builtUpArea || '',
        price: propertyToEdit.price || '',
        rent: propertyToEdit.rent || '',
        priceFormatted: propertyToEdit.priceFormatted || '',
        constructionType: propertyToEdit.constructionType || 'Floor',
        floor: propertyToEdit.floor || 'First Floor',
        totalFloors: propertyToEdit.totalFloors || '4 Floors',
        parking: propertyToEdit.parking || 'Street Parking',
        facing: propertyToEdit.facing || 'East',
        description: propertyToEdit.description || '',
        photos: propertyToEdit.photos?.length ? propertyToEdit.photos : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
        availabilityStatus: propertyToEdit.availabilityStatus || 'Available',
        isPublic: propertyToEdit.isPublic ?? true,
        isFeatured: propertyToEdit.isFeatured ?? false,
        internalNotes: propertyToEdit.internalNotes || '',
      });
      setConfirmDelete(false);
    } else {
      setFormData({
        title: '',
        sourceType: 'Internal',
        sourceName: 'Pradhan Properties',
        coAgentId: '',
        location: 'Uttam Nagar',
        propertyType: 'Builder Floors',
        dealType: 'Sale',
        bhk: '2 BHK',
        gaj: '50 Gaj',
        builtUpArea: '450 sq.ft',
        price: '',
        rent: '',
        priceFormatted: '',
        constructionType: 'Floor',
        floor: 'First Floor',
        totalFloors: '4 Floors',
        parking: 'Bike & Car Parking',
        facing: 'East Facing',
        description: '',
        photos: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
        availabilityStatus: 'Available',
        isPublic: true,
        isFeatured: false,
        internalNotes: '',
      });
      setConfirmDelete(false);
    }
  }, [propertyToEdit, isOpen]);

  if (!isOpen) return null;

  const handleCoAgentChange = (agentId) => {
    if (!agentId) {
      setFormData({
        ...formData,
        coAgentId: '',
        sourceType: 'Internal',
        sourceName: 'Pradhan Properties',
      });
    } else {
      const agent = coAgents.find(a => a.id === agentId);
      setFormData({
        ...formData,
        coAgentId: agentId,
        sourceType: 'Co-Agent',
        sourceName: agent ? agent.name : 'Co-Agent',
      });
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setIsProcessingFiles(true);
    setUploadError('');
    try {
      const dataUrls = await Promise.all(files.map(f => processImageFile(f)));
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...dataUrls]
      }));
    } catch (err) {
      setUploadError('Failed to process image file. Please try another image.');
    } finally {
      setIsProcessingFiles(false);
      e.target.value = '';
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files || []);
    if (!files.length) return;
    setIsProcessingFiles(true);
    setUploadError('');
    try {
      const dataUrls = await Promise.all(files.map(f => processImageFile(f)));
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...dataUrls]
      }));
    } catch (err) {
      setUploadError('Failed to process image file.');
    } finally {
      setIsProcessingFiles(false);
    }
  };

  const handleSetCoverPhoto = (idx) => {
    if (idx === 0) return;
    setFormData(prev => {
      const updated = [...prev.photos];
      const [selected] = updated.splice(idx, 1);
      return { ...prev, photos: [selected, ...updated] };
    });
  };

  const handleAddPhoto = () => {
    if (photoInput.trim()) {
      setFormData(prev => ({ ...prev, photos: [...prev.photos, photoInput.trim()] }));
      setPhotoInput('');
    }
  };

  const handleRemovePhoto = (idx) => {
    setFormData(prev => ({ ...prev, photos: prev.photos.filter((_, i) => i !== idx) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const dataToSave = {
      ...formData,
      price: formData.price ? Number(formData.price) : null,
      rent: formData.rent ? Number(formData.rent) : null,
      priceFormatted: formData.priceFormatted || (formData.dealType === 'Rent' ? `₹${formData.rent} / month` : `₹${(Number(formData.price)/100000).toFixed(1)} Lakhs`),
    };

    if (propertyToEdit) {
      updateProperty(propertyToEdit.id, dataToSave);
    } else {
      addProperty(dataToSave);
    }
    onClose();
  };

  const handleDelete = () => {
    if (propertyToEdit) {
      deleteProperty(propertyToEdit.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-['Outfit'] text-[#101D35]">
              {propertyToEdit ? `Edit Property: ${propertyToEdit.title} (${propertyToEdit.id})` : 'Add Property to Inventory'}
            </h3>
            <p className="text-xs text-slate-500">
              Manage inventory details, floor condition, and public visibility
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Property Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 50 Gaj Prime Builder Property / 45 Gaj Jad Se House"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Inventory Source</label>
                <select
                  value={formData.coAgentId || ''}
                  onChange={(e) => handleCoAgentChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="">Internal (Pradhan Properties)</option>
                  {coAgents.map(agent => (
                    <option key={agent.id} value={agent.id}>Co-Agent: {agent.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Deal Type</label>
                <select
                  value={formData.dealType}
                  onChange={(e) => setFormData({ ...formData, dealType: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="Sale">For Sale</option>
                  <option value="Rent">For Rent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Uttam Nagar, Nawada, Dwarka Mor"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Dimensions */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101D35] flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-[#D4A853]" />
              <span>Pricing & Property Dimensions</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {formData.dealType === 'Sale' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Numeric Price (in INR)</label>
                  <input
                    type="number"
                    placeholder="e.g. 2500000 for 25 Lakhs"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Monthly Rent (in INR)</label>
                  <input
                    type="number"
                    placeholder="e.g. 12000"
                    value={formData.rent}
                    onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Price Label / Display Text</label>
                <input
                  type="text"
                  placeholder="e.g. ₹25 Lakhs / ₹42 Lakhs Net"
                  value={formData.priceFormatted}
                  onChange={(e) => setFormData({ ...formData, priceFormatted: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Plot Size in Gaj</label>
                <input
                  type="text"
                  placeholder="e.g. 50 Gaj, 75 Gaj"
                  value={formData.gaj}
                  onChange={(e) => setFormData({ ...formData, gaj: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="Builder Floors">Builder Floors</option>
                  <option value="Independent Floors">Independent Floors</option>
                  <option value="Residential Land">Residential Land</option>
                  <option value="Commercial Shops">Commercial Shops</option>
                  <option value="Commercial Properties">Commercial Properties</option>
                  <option value="Residential Flats">Residential Flats</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Configuration (BHK)</label>
                <select
                  value={formData.bhk}
                  onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Built-up Area</label>
                <input
                  type="text"
                  placeholder="e.g. 450 sq.ft"
                  value={formData.builtUpArea}
                  onChange={(e) => setFormData({ ...formData, builtUpArea: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                />
              </div>
            </div>
          </div>

          {/* Construction & Condition */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#101D35] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D4A853]" />
              <span>Construction, Floor & Structure</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Construction Type</label>
                <select
                  value={formData.constructionType}
                  onChange={(e) => setFormData({ ...formData, constructionType: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="Floor">Builder Floor</option>
                  <option value="Jad Se">Jad Se (Pillar to Roof)</option>
                  <option value="Commercial">Commercial Unit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Floor</label>
                <select
                  value={formData.floor}
                  onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="Basement">Basement</option>
                  <option value="Ground Floor">Ground Floor</option>
                  <option value="Upper Ground Floor">Upper Ground Floor</option>
                  <option value="First Floor">First Floor</option>
                  <option value="Second Floor">Second Floor</option>
                  <option value="Third Floor">Third Floor</option>
                  <option value="Top Floor">Top Floor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Facing / Side</label>
                <select
                  value={formData.facing}
                  onChange={(e) => setFormData({ ...formData, facing: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="North Facing">North Facing</option>
                  <option value="East Facing">East Facing</option>
                  <option value="L-Type">L-Type Corner</option>
                  <option value="Two Side Open">Two Side Open</option>
                  <option value="Three Side Open">Three Side Open</option>
                  <option value="Road Facing">Road Facing</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Parking</label>
                <input
                  type="text"
                  placeholder="e.g. Covered Car Parking, Stilt, Bike"
                  value={formData.parking}
                  onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={formData.availabilityStatus}
                  onChange={(e) => setFormData({ ...formData, availabilityStatus: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="Available">Available</option>
                  <option value="Under Negotiation">Under Negotiation</option>
                  <option value="Sold">Sold</option>
                  <option value="Rented">Rented</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Public Description</label>
              <textarea
                rows={3}
                placeholder="Marketing description displayed to visitors on website..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Internal Private Notes (Only visible to admin & staff)
              </label>
              <textarea
                rows={2}
                placeholder="Preserve raw co-agent notes, landlord negotiation ceiling, registry status..."
                value={formData.internalNotes}
                onChange={(e) => setFormData({ ...formData, internalNotes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
            </div>

            {/* Public vs Internal Only Toggle */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  className="w-4 h-4 rounded text-[#D4A853] focus:ring-[#D4A853]"
                />
                <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  Show in Public Website Showcase
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#D4A853] focus:ring-[#D4A853]"
                />
                <span className="text-xs font-semibold text-slate-700">
                  Mark as Featured Listing
                </span>
              </label>
            </div>
          </div>

          {/* Redesigned Easy Photo Upload & Management */}
          <div className="space-y-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#101D35] flex items-center gap-2">
                  <Image className="w-4 h-4 text-[#D4A853]" />
                  <span>Property Photos & Picture Gallery ({formData.photos.length})</span>
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Easily upload pictures from your computer or phone camera. The 1st photo is used as the main showcase cover.
                </p>
              </div>

              {formData.photos.length > 0 && (
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {formData.photos.length} photo{formData.photos.length === 1 ? '' : 's'} attached
                </span>
              )}
            </div>

            {/* Error notice if file failed */}
            {uploadError && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {uploadError}
              </div>
            )}

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                isDragging 
                  ? 'border-[#D4A853] bg-amber-50/70 scale-[1.01]' 
                  : 'border-slate-300 hover:border-[#D4A853] bg-slate-50/70 hover:bg-white'
              }`}
            >
              <input
                type="file"
                id="property-photo-upload"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-white text-[#D4A853] shadow-xs border border-slate-200 flex items-center justify-center">
                  {isProcessingFiles ? (
                    <Loader2 className="w-6 h-6 animate-spin text-[#D4A853]" />
                  ) : (
                    <UploadCloud className="w-6 h-6" />
                  )}
                </div>

                <div>
                  <label
                    htmlFor="property-photo-upload"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#101D35] hover:bg-[#182B4D] text-[#D4A853] text-xs font-bold cursor-pointer transition-all shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload Pictures from Computer / Phone</span>
                  </label>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    or drag & drop your photos directly here (JPG, PNG, WebP)
                  </p>
                </div>
              </div>
            </div>

            {/* Alternative: Paste URL */}
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Or paste an online photo URL (https://...)"
                value={photoInput}
                onChange={(e) => setPhotoInput(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl text-slate-700 transition-colors"
              >
                Add URL
              </button>
            </div>

            {/* Thumbnail Preview Grid with Cover Photo Badge & Quick Actions */}
            {formData.photos.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Click <strong>"Make Cover"</strong> on any photo to set as the primary front photo:</span>
                  {formData.photos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, photos: [] }))}
                      className="text-rose-600 hover:underline text-[10px]"
                    >
                      Clear all photos
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {formData.photos.map((p, idx) => {
                    const isCover = idx === 0;
                    return (
                      <div 
                        key={idx} 
                        className={`relative rounded-xl overflow-hidden border-2 group aspect-[4/3] bg-slate-900 shadow-xs transition-all ${
                          isCover ? 'border-[#D4A853] ring-2 ring-[#D4A853]/30' : 'border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        <img 
                          src={p} 
                          alt={`Property photo ${idx + 1}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        
                        {/* Cover Badge */}
                        {isCover && (
                          <div className="absolute top-1.5 left-1.5 z-10 bg-[#D4A853] text-[#101D35] text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            <span>Cover</span>
                          </div>
                        )}

                        {/* Hover Overlay Controls */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(idx)}
                              className="p-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white transition-colors"
                              title="Delete photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {!isCover && (
                            <button
                              type="button"
                              onClick={() => handleSetCoverPhoto(idx)}
                              className="w-full py-1 rounded bg-[#D4A853] hover:bg-[#B88D3B] text-[#101D35] text-[10px] font-bold flex items-center justify-center gap-1 shadow-xs"
                            >
                              <Star className="w-3 h-3" />
                              <span>Make Cover</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            {propertyToEdit ? (
              <div>
                {confirmDelete ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-rose-600 font-bold">Delete property?</span>
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
                    <span>Delete</span>
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
                {propertyToEdit ? 'Save Changes' : 'Save Property'}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
