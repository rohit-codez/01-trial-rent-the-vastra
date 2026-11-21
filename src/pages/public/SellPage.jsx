import React, { useState } from 'react';
import { 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Phone, 
  Coins, 
  MapPin, 
  Layers, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function SellPage({ setCurrentRoute }) {
  const { addCustomer, addEnquiry } = useData();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    location: 'Uttam Nagar',
    propertyType: 'Builder Floor',
    dealType: 'Sell',
    bhk: '2 BHK',
    gaj: '',
    expectedPrice: '',
    floor: 'Upper Ground Floor',
    constructionType: 'Floor',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // 1. Add to CRM as a Customer with dealType = 'Sell'
    addCustomer({
      name: formData.name,
      phone: String(formData.phone),
      address: `${formData.address || ''} (${formData.location})`,
      dealType: 'Sell',
      bhk: formData.bhk,
      budget: formData.expectedPrice,
      gaj: formData.gaj ? `${formData.gaj} Gaj` : '',
      constructionType: formData.constructionType,
      preferredFloor: formData.floor,
      status: 'New',
      notes: `Public website Sell submission: ${formData.propertyType} in ${formData.location}. Expected Price: ${formData.expectedPrice}. Notes: ${formData.notes}`,
      assignedAgent: 'Pradhan Properties Team',
    });

    // 2. Also register in Enquiries inbox for immediate notifications
    addEnquiry({
      name: formData.name,
      phone: String(formData.phone),
      serviceType: 'Sell',
      preferredLocation: formData.location,
      budget: formData.expectedPrice,
      message: `Owner submitted ${formData.propertyType} (${formData.gaj} Gaj, ${formData.bhk}) in ${formData.location}. ${formData.notes}`,
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      address: '',
      location: 'Uttam Nagar',
      propertyType: 'Builder Floor',
      dealType: 'Sell',
      bhk: '2 BHK',
      gaj: '',
      expectedPrice: '',
      floor: 'Upper Ground Floor',
      constructionType: 'Floor',
      notes: '',
    });
    setSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Intro */}
      <div className="bg-gradient-to-r from-[#101D35] to-[#182B4D] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-[#D4A853]/20">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4A853]">
            Owner Direct Listing Service
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit']">
            Sell or Rent Your Property Fast with Pradhan Properties
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Have a builder floor, independent Jad Se house, plot or shop in Uttam Nagar, Nawada, Dwarka Mor or Delhi NCR? Connect with our network of 500+ verified buyers.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-[#D4A853]">
              <ShieldCheck className="w-4 h-4" />
              100% Privacy: Your phone number is NEVER published publicly
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Direct Buyer Meetings & Quick Token Closures
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Form Container */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
            
            {submitted ? (
              <div className="text-center py-12 space-y-5 animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-['Outfit'] text-[#101D35]">
                  Property Details Submitted Successfully!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you! Your property record has been logged in our secure internal management system. Our West Delhi area manager will call you shortly to inspect the property and begin matching with active buyer leads.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Submit Another Property
                  </button>
                  <button
                    onClick={() => { setCurrentRoute('home'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                    className="px-6 py-2.5 rounded-xl bg-[#101D35] text-[#D4A853] text-xs font-bold hover:bg-[#182B4D]"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold font-['Outfit'] text-[#101D35]">
                    Submit Property Details
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill in the details below. Required fields are marked with an asterisk (*).
                  </p>
                </div>

                {/* Section 1: Owner Details */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#101D35] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4A853]"></span>
                    Owner / Contact Person
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Owner Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bhupindra Mehra"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number (Text format) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9818419845"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Property Address / Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 101 - B/1 registry, Gali No. 3, Nanhe Park"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white"
                    />
                  </div>
                </div>

                {/* Section 2: Property Specifications */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#101D35] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4A853]"></span>
                    Property Specifications
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Target Location *
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white"
                      >
                        <option value="Uttam Nagar">Uttam Nagar</option>
                        <option value="Nawada">Nawada</option>
                        <option value="Dwarka Mor">Dwarka Mor</option>
                        <option value="Matiala">Matiala</option>
                        <option value="Bindapur">Bindapur</option>
                        <option value="Nanhe Park">Nanhe Park</option>
                        <option value="Mohan Garden">Mohan Garden</option>
                        <option value="Nearby West Delhi">Nearby West Delhi</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Property Category *
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white"
                      >
                        <option value="Builder Floor">Builder Floor</option>
                        <option value="Independent Floors">Independent Floor</option>
                        <option value="Residential Land">Plot / Residential Land</option>
                        <option value="Commercial Shops">Commercial Shop</option>
                        <option value="Residential Flats">Residential Flat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Construction Type
                      </label>
                      <select
                        value={formData.constructionType}
                        onChange={(e) => setFormData({ ...formData, constructionType: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white"
                      >
                        <option value="Floor">Floor in Building</option>
                        <option value="Jad Se">Jad Se (Ground to Roof)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Configuration (BHK)
                      </label>
                      <select
                        value={formData.bhk}
                        onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white"
                      >
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK">4 BHK</option>
                        <option value="Commercial">Commercial / Shop</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Plot Size in Gaj
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 50, 62, 75 Gaj"
                        value={formData.gaj}
                        onChange={(e) => setFormData({ ...formData, gaj: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Floor
                      </label>
                      <select
                        value={formData.floor}
                        onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white"
                      >
                        <option value="Ground Floor">Ground Floor</option>
                        <option value="Upper Ground Floor">Upper Ground Floor</option>
                        <option value="First Floor">First Floor</option>
                        <option value="Second Floor">Second Floor</option>
                        <option value="Third Floor">Third Floor</option>
                        <option value="Top Floor">Top Floor</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Asking Price / Expected Amount *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ₹28 Lakhs / ₹1.2 Crore"
                      value={formData.expectedPrice}
                      onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Additional Information / Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Registry clear, front road width, lift available, car parking, urgent sale etc."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B88D3B] text-[#101D35] font-bold text-sm shadow-md hover:shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Submit Property for Fast Sale</span>
                </button>
              </form>
            )}

          </div>
        </div>

        {/* Benefits Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#101D35] text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-[#D4A853]/20 space-y-6">
            <h3 className="text-lg font-bold font-['Outfit'] text-[#D4A853]">
              Why Sell Through Pradhan Properties?
            </h3>
            
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4A853] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Active Buyer Pool:</strong> We have ready pre-approved buyers looking for 1, 2 & 3 BHK flats and Jad Se homes right now.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4A853] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Privacy Assured:</strong> No random calls. All viewings are pre-qualified and escorted by our staff.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D4A853] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Legal Documentation:</strong> We draft the agreements, handle token advance procedures and assist at the Sub-Registrar office.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400 mb-3">Prefer discussing on the phone first?</p>
              <a
                href="tel:+919319539206"
                className="w-full flex items-center justify-center gap-2 bg-[#182B4D] hover:bg-[#233D6B] text-[#D4A853] border border-[#D4A853]/40 py-2.5 rounded-xl font-bold text-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Owner Helpline: 9319539206</span>
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
