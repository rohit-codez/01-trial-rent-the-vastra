import React from 'react';
import { MapPin, Bed, Maximize2, Layers, Car, MessageSquare, Phone, ShieldCheck, Sparkles } from 'lucide-react';

export default function PropertyCard({ property, onSelect }) {
  const isRent = property.dealType === 'Rent';
  const priceDisplay = isRent 
    ? `₹${property.rent?.toLocaleString('en-IN') || property.priceFormatted} /mo`
    : property.priceFormatted || (property.price ? `₹${(property.price / 100000).toFixed(1)} Lakhs` : 'Call for Price');

  const isJadSe = property.constructionType === 'Jad Se' || property.title.toLowerCase().includes('jad se');

  const photo = property.photos?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

  const whatsappMessage = encodeURIComponent(
    `Hello Pradhan Properties, I am interested in property ${property.id}: "${property.title}" in ${property.location} priced at ${priceDisplay}. Please share more details and arrange a site visit.`
  );

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col group">
      {/* Property Image & Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onSelect(property)}>
        <img
          src={photo}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
            isRent ? 'bg-indigo-600 text-white' : 'bg-[#101D35] text-[#D4A853] border border-[#D4A853]/40'
          }`}>
            {isRent ? 'For Rent' : 'For Sale'}
          </span>

          {isJadSe && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#D4A853] text-[#101D35] shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current" />
              <span>Jad Se (Roof Rights)</span>
            </span>
          )}

          {property.isFeatured && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-600 text-white shadow-sm flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Registry</span>
            </span>
          )}
        </div>

        {/* Bottom Location Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-xs font-medium drop-shadow-md">
            <MapPin className="w-3.5 h-3.5 text-[#D4A853] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & ID */}
          <div className="flex items-baseline justify-between mb-2">
            <div className="text-2xl font-bold font-['Outfit'] text-[#101D35]">
              {priceDisplay}
            </div>
            <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {property.id}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(property)} 
            className="text-base font-bold text-[#101D35] line-clamp-1 hover:text-[#D4A853] transition-colors cursor-pointer mb-3"
          >
            {property.title}
          </h3>

          {/* Specification Pills */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs text-slate-600 mb-4">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-semibold text-slate-800">{property.bhk || 'Standard'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-semibold text-slate-800">{property.gaj || 'Plot Size'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate text-slate-800 font-medium">{property.floor || 'Floor'}</span>
            </div>
          </div>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => onSelect(property)}
            className="flex-1 py-2 px-3 rounded-xl border border-slate-300 hover:border-[#101D35] hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors"
          >
            View Details
          </button>
          
          <a
            href={`https://wa.me/919319539206?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white transition-transform hover:scale-105 shadow-sm"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>

          <a
            href="tel:+919319539206"
            className="p-2 rounded-xl bg-[#101D35] hover:bg-[#182B4D] text-[#D4A853] transition-transform hover:scale-105 shadow-sm"
            title="Call Pradhan Properties"
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
