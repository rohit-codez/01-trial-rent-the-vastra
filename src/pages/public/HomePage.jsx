import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  MapPin, 
  Key, 
  ShoppingBag, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Award, 
  ArrowRight, 
  Phone, 
  MessageSquare,
  Sparkles,
  Layers,
  Clock
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import PropertyCard from '../../components/public/PropertyCard';
import PropertyModal from '../../components/public/PropertyModal';

export default function HomePage({ setCurrentRoute }) {
  const { properties } = useData();
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Search filter states
  const [searchLocation, setSearchLocation] = useState('All');
  const [searchType, setSearchType] = useState('All');
  const [searchBhk, setSearchBhk] = useState('All');
  const [searchDeal, setSearchDeal] = useState('All');

  // Filter properties that are marked as public
  const publicProperties = properties.filter(p => p.isPublic !== false);

  // Filtered list based on search bar
  const filteredProperties = publicProperties.filter(prop => {
    if (searchLocation !== 'All' && !prop.location.toLowerCase().includes(searchLocation.toLowerCase())) return false;
    if (searchType !== 'All' && prop.constructionType !== searchType && prop.propertyType !== searchType) return false;
    if (searchBhk !== 'All' && !prop.bhk.includes(searchBhk)) return false;
    if (searchDeal !== 'All' && prop.dealType !== searchDeal) return false;
    return true;
  });

  const featuredProperties = publicProperties.filter(p => p.isFeatured).slice(0, 6);

  const locations = [
    'Uttam Nagar',
    'Nawada',
    'Dwarka Mor',
    'Matiala',
    'Bindapur',
    'Nanhe Park',
    'Mohan Garden',
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] bg-[#101D35] text-white flex items-center overflow-hidden">
        {/* Background photo overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
            alt="West Delhi Real Estate"
            className="w-full h-full object-cover opacity-25 scale-105 transform motion-safe:animate-pulse duration-[8000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101D35] via-[#101D35]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182B4D] border border-[#D4A853]/40 text-[#D4A853] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4A853]" />
              <span>West Delhi's Most Trusted Property Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-['Outfit'] tracking-tight leading-tight">
              Find Your Dream Property with <span className="text-[#D4A853]">Pradhan Properties</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Specialists in builder floors, Jad Se independent houses, commercial shops and rental homes across Uttam Nagar, Nawada, Dwarka Mor, Mohan Garden, Bindapur, and Delhi NCR.
            </p>

            {/* Quick Hero Highlights */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4A853]" />
                <span>100% Registry Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4A853]" />
                <span>Jad Se Independent Houses</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4A853]" />
                <span>Easy Bank Loan Support</span>
              </div>
            </div>

          </div>

          {/* Interactive Search Bar Box */}
          <div className="mt-10 bg-white rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-200 text-slate-800 max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Location Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#D4A853] absolute left-3 top-3" />
                  <select
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                  >
                    <option value="All">All West Delhi Locations</option>
                    {locations.map((loc, i) => (
                      <option key={i} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Deal Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Looking To
                </label>
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-[#D4A853] absolute left-3 top-3" />
                  <select
                    value={searchDeal}
                    onChange={(e) => setSearchDeal(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                  >
                    <option value="All">Buy or Rent (All)</option>
                    <option value="Sale">Buy Property</option>
                    <option value="Rent">Rent Property</option>
                  </select>
                </div>
              </div>

              {/* BHK */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Configuration (BHK)
                </label>
                <select
                  value={searchBhk}
                  onChange={(e) => setSearchBhk(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="All">Any BHK</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                  <option value="Commercial">Commercial Shop</option>
                </select>
              </div>

              {/* Construction Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Property Type
                </label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A853] bg-white font-medium"
                >
                  <option value="All">All Types</option>
                  <option value="Jad Se">Jad Se (Roof Rights)</option>
                  <option value="Builder Floor">Builder Floor</option>
                  <option value="Floor">Independent Floor</option>
                  <option value="Commercial">Commercial Shop</option>
                </select>
              </div>

            </div>

            {/* Search Results Summary & Reset */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <span className="font-semibold text-[#101D35]">
                Showing {filteredProperties.length} verified listings
              </span>
              <div className="flex items-center gap-2">
                {(searchLocation !== 'All' || searchType !== 'All' || searchBhk !== 'All' || searchDeal !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchLocation('All');
                      setSearchType('All');
                      setSearchBhk('All');
                      setSearchDeal('All');
                    }}
                    className="text-[#D4A853] hover:underline font-semibold"
                  >
                    Reset Filters
                  </button>
                )}
                <button
                  onClick={() => {
                    const el = document.getElementById('featured-listings');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#101D35] hover:bg-[#182B4D] text-[#D4A853] px-5 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>View Matches</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. CATEGORY QUICK LINKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div 
            onClick={() => { setCurrentRoute('buy'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#D4A853] shadow-sm hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#101D35] text-[#D4A853] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-['Outfit'] text-[#101D35] group-hover:text-[#D4A853] transition-colors">
              Buy Builder Floors
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Explore 1, 2, 3 & 4 BHK ready-to-move flats with lift, car parking, modular kitchen and loan support.
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101D35] mt-4 group-hover:translate-x-1 transition-transform">
              Explore Buy Listings <ArrowRight className="w-3.5 h-3.5 text-[#D4A853]" />
            </span>
          </div>

          <div 
            onClick={() => { setCurrentRoute('buy'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#101D35] to-[#182B4D] text-white border border-[#D4A853]/40 shadow-md hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4A853] text-[#101D35] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-['Outfit'] text-[#D4A853]">
              Jad Se Independent Houses
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Ground to roof ownership (Pillar se Chhat tak) on 25 Gaj, 45 Gaj, 50 Gaj, and 100+ Gaj plots. Complete privacy!
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white mt-4 group-hover:translate-x-1 transition-transform">
              View Jad Se Inventory <ArrowRight className="w-3.5 h-3.5 text-[#D4A853]" />
            </span>
          </div>

          <div 
            onClick={() => { setCurrentRoute('rent'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#D4A853] shadow-sm hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#101D35] text-[#D4A853] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Key className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-['Outfit'] text-[#101D35] group-hover:text-[#D4A853] transition-colors">
              Rent Properties
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Clean family and bachelor flats near metro stations. Starting from ₹8,000 to ₹25,000 per month.
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101D35] mt-4 group-hover:translate-x-1 transition-transform">
              Browse Rentals <ArrowRight className="w-3.5 h-3.5 text-[#D4A853]" />
            </span>
          </div>

          <div 
            onClick={() => { setCurrentRoute('sell'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
            className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#D4A853] shadow-sm hover:shadow-xl transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#D4A853] text-[#101D35] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-['Outfit'] text-[#101D35] group-hover:text-[#D4A853] transition-colors">
              Sell Your Property
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              List your flat, plot or shop with Pradhan Properties for genuine buyer inquiries and instant deal closure.
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101D35] mt-4 group-hover:translate-x-1 transition-transform">
              Submit Property <ArrowRight className="w-3.5 h-3.5 text-[#D4A853]" />
            </span>
          </div>

        </div>
      </section>

      {/* 3. FEATURED PROPERTIES SECTION */}
      <section id="featured-listings" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4A853]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Hand-Picked Inventory</span>
            </div>
            <h2 className="text-3xl font-extrabold font-['Outfit'] text-[#101D35] mt-1">
              Featured Properties in West Delhi
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Exclusive properties in Uttam Nagar, Nawada, Dwarka Mor, and Mohan Garden with clean titles.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => { setCurrentRoute('buy'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className="px-4 py-2 rounded-xl bg-[#101D35] text-[#D4A853] text-xs font-bold hover:bg-[#182B4D] transition-colors"
            >
              View All For Sale
            </button>
            <button
              onClick={() => { setCurrentRoute('rent'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              View All Rentals
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(filteredProperties.length ? filteredProperties : featuredProperties).map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={(p) => setSelectedProperty(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE PRADHAN PROPERTIES */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4A853]">
              The Pradhan Properties Advantage
            </span>
            <h2 className="text-3xl font-extrabold font-['Outfit'] text-[#101D35] mt-1">
              Why Trust Us with Your Real Estate Journey?
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Buying or selling real estate in West Delhi requires deep local knowledge, registry verification, and honest negotiation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#D4A853] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-['Outfit'] text-[#101D35]">
                100% Legal & Registry Verification
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Every property in our inventory is thoroughly cross-verified for chain registry, mutation, municipal clearance, and zero litigation risks.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-['Outfit'] text-[#101D35]">
                Unmatched Local West Delhi Network
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Operating directly across Uttam Nagar, Nawada, Dwarka Mor, Bindapur, and Nanhe Park with a network of verified builders and co-agents.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-['Outfit'] text-[#101D35]">
                End-to-End Bank Loan Assistance
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Our banking partners (SBI, HDFC, ICICI, PNB) assist you with up to 80-90% home loan processing with minimal paperwork and competitive interest rates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT PRADHAN PROPERTIES & OWNER MESSAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#101D35] to-[#182B4D] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-[#D4A853]/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4A853]">
                About Pradhan Properties
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] leading-tight">
                Building Trust in Every Square Gaj Across Delhi NCR.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Pradhan Properties was founded with a single mission: to bring corporate professionalism, utmost transparency, and honest advisory to West Delhi's vibrant property market.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you are a first-time home buyer looking for an affordable 1 or 2 BHK builder floor, a family seeking independent Jad Se living with complete roof rights, or an investor seeking steady commercial rental yields, we stand with you from initial site inspection to final registry token.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="tel:+919717433469"
                  className="bg-[#D4A853] hover:bg-[#B88D3B] text-[#101D35] px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: 9717433469 / 9507363213</span>
                </a>
                <a
                  href="https://wa.me/919717433469?text=Namaste%20Pradhan%20Properties"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Target Locations Card */}
            <div className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <h3 className="text-lg font-bold font-['Outfit'] text-[#D4A853] flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Primary Operational Hubs</span>
              </h3>
              <p className="text-xs text-slate-300">
                Direct on-ground inventory in these core areas:
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {locations.map((loc, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A853] shrink-0" />
                    <span className="font-semibold text-slate-200">{loc}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-[#D4A853]/10 border border-[#D4A853]/30 text-xs text-[#D4A853]">
                📍 Office located conveniently near Uttam Nagar East Metro Station. Walk-ins and site inspections welcome every day (10:00 AM – 8:00 PM).
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}

    </div>
  );
}
