import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Mail, 
  CheckCircle2, 
  Building2, 
  Send 
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function ContactPage() {
  const { addEnquiry } = useData();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: 'Buy',
    preferredLocation: 'Uttam Nagar',
    budget: '',
    message: '',
  });

  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    addEnquiry({
      name: form.name,
      phone: String(form.phone),
      email: form.email,
      serviceType: form.serviceType,
      preferredLocation: form.preferredLocation,
      budget: form.budget,
      message: form.message,
    });

    setSent(true);
    setForm({
      name: '',
      phone: '',
      email: '',
      serviceType: 'Buy',
      preferredLocation: 'Uttam Nagar',
      budget: '',
      message: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#101D35] to-[#182B4D] rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-[#D4A853]/20">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4A853]">
            Connect with Pradhan Properties
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-['Outfit']">
            We Are Here to Guide Your Property Search
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Visit our office in Uttam Nagar, reach out over phone, or send an instant WhatsApp message. We respond within minutes during business hours.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#D4A853] flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#101D35]">Phone Helplines</h3>
              <p className="text-xs text-slate-500 mt-1">Direct call for quick inquiries</p>
              <div className="mt-3 space-y-1">
                <a href="tel:+919717433469" className="block text-sm font-bold text-[#101D35] hover:text-[#D4A853]">
                  +91 97174 33469
                </a>
                <a href="tel:+919507363213" className="block text-sm font-bold text-[#101D35] hover:text-[#D4A853]">
                  +91 95073 63213
                </a>
                <a href="tel:+919319539206" className="block text-xs font-semibold text-slate-500 hover:text-[#D4A853]">
                  +91 93195 39206 (Office Line)
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#101D35]">WhatsApp Support</h3>
              <p className="text-xs text-slate-500 mt-1">Get photos, location pins and video tours instantly</p>
              <div className="mt-3">
                <a
                  href="https://wa.me/919717433469?text=Namaste%20Pradhan%20Properties%2C%20I%20have%20an%20enquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-transform hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#101D35] flex items-center justify-center">
              <MapPin className="w-6 h-6 text-[#D4A853]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#101D35]">Office Address</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Pradhan Properties, Main Metro Road, Near Uttam Nagar East Metro Station, New Delhi 110059
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                <Clock className="w-4 h-4 text-[#D4A853]" />
                <span>Mon – Sun: 10:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
            <h3 className="text-xl font-bold font-['Outfit'] text-[#101D35]">
              Send Us a Message
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Tell us your requirements and our property advisor will connect with tailored recommendations.
            </p>

            {sent ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-3">
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  <span>Your Message Has Been Received!</span>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Thank you for reaching out to Pradhan Properties. An advisor will contact you within 30 minutes.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 text-xs font-bold text-emerald-900 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9819000000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Looking To</label>
                    <select
                      value={form.serviceType}
                      onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white"
                    >
                      <option value="Buy">Buy Property</option>
                      <option value="Rent">Rent Property</option>
                      <option value="Sell">Sell Property</option>
                      <option value="Invest">Commercial Investment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Location</label>
                    <select
                      value={form.preferredLocation}
                      onChange={(e) => setForm({ ...form, preferredLocation: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853] bg-white"
                    >
                      <option value="Uttam Nagar">Uttam Nagar</option>
                      <option value="Nawada">Nawada</option>
                      <option value="Dwarka Mor">Dwarka Mor</option>
                      <option value="Matiala">Matiala</option>
                      <option value="Bindapur">Bindapur</option>
                      <option value="Nanhe Park">Nanhe Park</option>
                      <option value="Mohan Garden">Mohan Garden</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Approx Budget</label>
                    <input
                      type="text"
                      placeholder="e.g. 25-30 Lakhs"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Requirements / Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what kind of property you are looking for (e.g. 2 BHK Upper Ground, Jad Se house, lift required)..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-[#D4A853]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#101D35] hover:bg-[#182B4D] text-[#D4A853] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 border border-[#D4A853]/40"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry to Pradhan Properties</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
