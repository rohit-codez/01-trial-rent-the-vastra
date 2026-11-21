import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  Layers, 
  Maximize2, 
  Bed, 
  Sparkles, 
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import PropertyCard from '../../components/public/PropertyCard';
import PropertyModal from '../../components/public/PropertyModal';

export default function BuyPage() {
  const { properties } = useData();
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Filters
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedBhk, setSelectedBhk] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedFloor, setSelectedFloor] = useState('All');
  const [selectedConstruction, setSelectedConstruction] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Only public sale properties
  const saleProperties = properties.filter(p => p.isPublic !== false && p.dealType === 'Sale');

  const locations = [
    'Uttam Nagar',
    'Nawada',
    'Dwarka Mor',
    'Matiala',
    'Bindapur',
    'Nanhe Park',
    'Mohan Garden',
    'Som Bazar Road',
  ];

  const filteredProperties = saleProperties.filter(prop => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(q);
      const matchLoc = prop.location.toLowerCase().includes(q);
      const matchDesc = prop.description?.toLowerCase().includes(q);
      const matchId = prop.id.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchDesc && !matchId) return false;
    }

    // Location
    if (selectedLocation !== 'All' && !prop.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
      return false;
    }

    // BHK
    if (selectedBhk !== 'All' && !prop.bhk.includes(selectedBhk)) {
      return false;
    }

    // Floor
    if (selectedFloor !== 'All' && !prop.floor.toLowerCase().includes(selectedFloor.toLowerCase())) {
      return false;
    }

    // Construction Type (Jad Se / Floor)
    if (selectedConstruction !== 'All') {
      const isJadSe = prop.constructionType === 'Jad Se' || prop.title.toLowerCase().includes('jad se');
      if (selectedConstruction === 'Jad Se' && !isJadSe) return false;
      if (selectedConstruction === 'Floor' && isJadSe) return false;
    }

    // Price Range
    if (selectedPriceRange !== 'All') {
      const price = prop.price || 0;
      if (selectedPriceRange === 'under-25' && price > 2500000) return false;
      if (selectedPriceRange === '25-45' && (price < 2500000 || price > 4500000)) return false;
      if (selectedPriceRange === '45-75' && (price < 4500000 || price > 7500000)) return false;
      if (selectedPriceRange === 'above-75' && price < 7500000) return false;
    }

    return true;
  });

  const resetFilters = () => {
    setSelectedLocation('All');
    setSelectedBhk('All');
    setSelectedPriceRange('All');
    setSelectedFloor('All');
    setSelectedConstruction('All');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#101D35] to-[#182B4D] rounded-3xl p-8 sm:p-10 text-white shadow-lg border border-[#D4A853]/20">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4A853]">
            Properties For Sale • West Delhi & NCR
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] mt-1">
            Buy Verified Real Estate with Pradhan Properties
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Browse our verified inventory of builder floors, independent Jad Se houses, and commercial shops. Every property has clear registry verification and complete bank loan support.
          </p>
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        
        {/* Top Search bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search by area, road name, property ref (e.g. Uttam Nagar, Nawada, Jad Se, 75 Gaj)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A853]"
          />
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          
          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#D4A853] bg-white"
            >
              <option value="All">All Locations</option>
              {locations.map((loc, i) => (
                <option key={i} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* BHK */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Configuration</label>
            <select
              value={selectedBhk}
              onChange={(e) => setSelectedBhk(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#D4A853] bg-white"
            >
              <option value="All">Any BHK</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4 BHK</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Budget Range</label>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#D4A853] bg-white"
            >
              <option value="All">Any Price</option>
              <option value="under-25">Under ₹25 Lakhs</option>
              <option value="25-45">₹25 Lakhs – ₹45 Lakhs</option>
              <option value="45-75">₹45 Lakhs – ₹75 Lakhs</option>
              <option value="above-75">₹75 Lakhs & Above (Luxury / Kothi)</option>
            </select>
          </div>

          {/* Floor */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Floor Preference</label>
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#D4A853] bg-white"
            >
              <option value="All">Any Floor</option>
              <option value="Ground">Ground Floor</option>
              <option value="Upper Ground">Upper Ground Floor</option>
              <option value="First">First Floor</option>
              <option value="Second">Second Floor</option>
              <option value="Top">Top Floor (with Roof Rights)</option>
            </select>
          </div>

          {/* Construction Type */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Construction Type</label>
            <select
              value={selectedConstruction}
              onChange={(e) => setSelectedConstruction(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#D4A853] bg-white"
            >
              <option value="All">All Types</option>
              <option value="Jad Se">Jad Se (Ground to Roof)</option>
              <option value="Floor">Builder Floor</option>
            </select>
          </div>

        </div>

        {/* Action / Reset Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <p className="font-semibold text-slate-600">
            Found <span className="text-[#101D35] font-bold text-sm">{filteredProperties.length}</span> properties matching criteria
          </p>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-slate-500 hover:text-[#D4A853] font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>

      </div>

      {/* Property Cards Grid */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-[#D4A853] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-['Outfit'] text-[#101D35]">
            No Properties Found Matching Your Filters
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            We regularly receive off-market listings across Uttam Nagar and West Delhi. Click below to reset filters or connect with us on WhatsApp to find custom matches.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#101D35] text-[#D4A853] text-xs font-bold hover:bg-[#182B4D]"
            >
              Reset Filters
            </button>
            <a
              href="https://wa.me/919319539206?text=Hello%20Pradhan%20Properties%2C%20I%20am%20looking%20for%20a%20property%20to%20buy."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba5a]"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={(p) => setSelectedProperty(p)}
            />
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

    </div>
  );
}
