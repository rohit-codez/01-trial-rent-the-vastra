import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Bed, 
  Maximize2, 
  Layers, 
  Car, 
  Compass, 
  ShieldCheck, 
  CheckCircle, 
  MessageSquare, 
  Phone, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function PropertyModal({ property, onClose }) {
  const { addEnquiry } = useData();
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    message: `Hi, I am interested in visiting ${property?.title} (${property?.id}). Please contact me.`,
  });
  const [submitted, setSubmitted] = useState(false);

  if (!property) return null;

  const isRent = property.dealType === 'Rent';
  const priceDisplay = isRent 
    ? `₹${property.rent?.toLocaleString('en-IN') || property.priceFormatted} / month`
    : property.priceFormatted || (property.price ? `₹${(property.price / 100000).toFixed(1)} Lakhs` : 'Call for Price');

  const photos = property.photos?.length 
    ? property.photos 
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'];

  const isJadSe = property.constructionType === 'Jad Se' || property.title.toLowerCase().includes('jad se');

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!enquiryForm.name || !enquiryForm.phone) return;

    addEnquiry({
      name: enquiryForm.name,
      phone: enquiryForm.phone,
      serviceType: isRent ? 'Rent' : 'Buy',
      preferredLocation: property.location,
      budget: priceDisplay,
      message: `${enquiryForm.message} [Property Ref: ${property.id} - ${property.title}]`,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Pradhan Properties, I am interested in booking a site visit for property Ref: ${property.id} - "${property.title}" in ${property.location} (${priceDisplay}). Please connect with me.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Photo & Gallery */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-slate-900 overflow-hidden">
          <img
            src={photos[selectedPhoto]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isRent ? 'bg-indigo-600 text-white' : 'bg-[#101D35] text-[#D4A853] border border-[#D4A853]'
            }`}>
              {isRent ? 'For Rent' : 'For Sale'}
            </span>

            {isJadSe && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D4A853] text-[#101D35] flex items-center gap-1 shadow-md">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>Jad Se Independent House</span>
              </span>
            )}
          </div>

          {/* Bottom Title Bar */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <span className="text-xs font-mono text-[#D4A853] bg-black/40 px-2 py-0.5 rounded border border-[#D4A853]/40">
                  REF: {property.id}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-['Outfit'] mt-1">
                  {property.title}
                </h2>
                <p className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-300">
                  <MapPin className="w-4 h-4 text-[#D4A853] shrink-0" />
                  <span>{property.location}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase text-slate-300 font-medium">Asking Price / Rent</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#D4A853] font-['Outfit']">
                  {priceDisplay}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector if multiple photos */}
        {photos.length > 1 && (
          <div className="flex gap-2 p-3 bg-slate-900 border-t border-slate-800 overflow-x-auto">
            {photos.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhoto(idx)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                  selectedPhoto === idx ? 'border-[#D4A853] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={p} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Key Specifications Grid */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              Property Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <Bed className="w-4 h-4 text-[#D4A853]" />
                  <span>Configuration</span>
                </div>
                <p className="text-base font-bold text-[#101D35]">{property.bhk || 'Residential'}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <Maximize2 className="w-4 h-4 text-[#D4A853]" />
                  <span>Plot / Carpet</span>
                </div>
                <p className="text-base font-bold text-[#101D35]">{property.gaj || 'Standard Gaj'}</p>
                <p className="text-[11px] text-slate-500">{property.builtUpArea || ''}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <Layers className="w-4 h-4 text-[#D4A853]" />
                  <span>Floor & Type</span>
                </div>
                <p className="text-base font-bold text-[#101D35]">{property.floor || 'Floor'}</p>
                <p className="text-[11px] text-slate-500">{property.constructionType || ''}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                  <Car className="w-4 h-4 text-[#D4A853]" />
                  <span>Parking</span>
                </div>
                <p className="text-base font-bold text-[#101D35]">{property.parking || 'Street Parking'}</p>
              </div>
            </div>
          </div>

          {/* Description & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                About this Property
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>

              {/* Verified Features Checklist */}
              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Pradhan Properties Assurances
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Clear Registry Title & Clean Paperwork</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Bank Home Loan Assistance (Up to 80-90%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>24x7 Water Supply & BSES Electric Meter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Walking distance to Metro & Local Markets</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact & WhatsApp Action Box */}
            <div className="bg-gradient-to-br from-[#101D35] to-[#182B4D] text-white p-6 rounded-2xl flex flex-col justify-between shadow-lg">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#D4A853]">
                  Direct Verification
                </span>
                <h4 className="text-lg font-bold font-['Outfit'] mt-1 text-white">
                  Schedule a Site Visit
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Our local West Delhi area expert will show you this property and manage complete paperwork.
                </p>
              </div>

              <div className="space-y-3 pt-6">
                <a
                  href={`https://wa.me/919319539206?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <a
                  href="tel:+919319539206"
                  className="w-full flex items-center justify-center gap-2 bg-[#D4A853] hover:bg-[#B88D3B] text-[#101D35] py-3 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call +91 93195 39206</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Callback Request Form */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#101D35] mb-2">
              Request a Callback for this Property
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Leave your contact number. Our team will get back to you with keys and inspection timings.
            </p>

            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Thank you! Your callback request has been recorded. Our executive will call you shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A853]"
                />
                <input
                  type="tel"
                  placeholder="Your 10-digit Phone Number"
                  required
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A853]"
                />
                <button
                  type="submit"
                  className="bg-[#101D35] hover:bg-[#182B4D] text-[#D4A853] border border-[#D4A853] px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:shadow-md"
                >
                  Request Callback
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
