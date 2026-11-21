import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Key, 
  Bed, 
  Layers, 
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Phone,
  MessageSquare
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import PropertyCard from '../../components/public/PropertyCard';
import PropertyModal from '../../components/public/PropertyModal';

export default function RentPage() {
  const { properties } = useData();
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedBhk, setSelectedBhk] = useState('All');
  const [selectedRentRange, setSelectedRentRange] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Only public rental properties
  const rentalProperties = properties.filter(p => p.isPublic !== false && p.dealType === 'Rent');

  const locations = [
    'Uttam Nagar',
    'Nawada',
    'Dwarka Mor',
    'Matiala',
    'Bindapur',
    'Mohan Garden',
  ];

  const filteredProperties = rentalProperties.filter(prop => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = prop.title.toLowerCase().includes(q) ||
                    prop.location.toLowerCase().includes(q) ||
                    prop.id.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedLocation !== 'All' && !prop.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
      return false;
    }

    if (selectedBhk !== 'All' && !prop.bhk.includes(selectedBhk)) {
      return false;
    }

    if (selectedRentRange !== 'All') {
      const rent = prop.rent || 0;
      if (selectedRentRange === 'under-10k' && rent > 10000) return false;
      if (selectedRentRange === '10k-15k' && (rent < 10000 || rent > 15000)) return false;
      if (selectedRentRange === 'above-15k' && rent < 15000) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#101D35] to-[#182B4D] rounded-3xl p-8 sm:p-10 text-white shadow-lg border border-[#D4A853]/20">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4A853]">
            Verified Rental Flats • West Delhi
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] mt-1">
            Rent Homes with Pradhan Properties
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Clean, family-friendly and bachelor-friendly flats near Dwarka Mor and Nawada metro stations. Complete police verification assistance, direct landlord keys, and fair agreement terms.
          </p>
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Search text */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Search Rentals</label>
            <input
              type="text"
              placeholder="Metro station, area, flat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#D4A853]"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Area / Metro</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#D4A853] bg-white"
            >
              <option value="All">All Rental Areas</option>
              {locations.map((loc, i) => (
                <option key={i} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* BHK */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">BHK Configuration</label>
            <select
              value={selectedBhk}
              onChange={(e) => setSelectedBhk(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#D4A853] bg-white"
            >
              <option value="All">Any BHK</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
            </select>
          </div>

          {/* Monthly Rent */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Monthly Budget</label>
            <select
              value={selectedRentRange}
              onChange={(e) => setSelectedRentRange(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:ring-2 focus:ring-[#D4A853] bg-white"
            >
              <option value="All">Any Rent</option>
              <option value="under-10k">Under ₹10,000 / month</option>
              <option value="10k-15k">₹10,000 – ₹15,000 / month</option>
              <option value="above-15k">Above ₹15,000 / month</option>
            </select>
          </div>

        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <p className="font-semibold text-slate-600">
            Available Rental Listings: <span className="text-[#101D35] font-bold">{filteredProperties.length}</span>
          </p>
          <button
            onClick={() => {
              setSelectedLocation('All');
              setSelectedBhk('All');
              setSelectedRentRange('All');
              setSearchQuery('');
            }}
            className="flex items-center gap-1.5 text-slate-500 hover:text-[#D4A853] font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <PropertyCard
            key={property.id}
            property={property}
            onSelect={(p) => setSelectedProperty(p)}
          />
        ))}
      </div>

      {/* Renter Support Notice */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold font-['Outfit'] text-[#101D35]">
            Looking for something specific or customized?
          </h3>
          <p className="text-xs text-slate-500">
            Our team maintains direct keys with 50+ landlords in Uttam Nagar, Nawada and Dwarka Mor. Let us know your move-in date and budget.
          </p>
        </div>
        <a
          href="https://wa.me/919319539206?text=Hi%20Pradhan%20Properties%2C%20I%20am%20looking%20for%20a%20flat%20for%20rent."
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 shadow-md transition-all hover:scale-105"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp Rental Request</span>
        </a>
      </div>

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
