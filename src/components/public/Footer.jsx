import React from 'react';
import { Building2, Phone, MessageSquare, MapPin, Mail, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export default function Footer({ setCurrentRoute, onOpenAdmin }) {
  const locations = [
    'Uttam Nagar East & West',
    'Nawada Metro & Housing',
    'Dwarka Mor & Pillars 750-790',
    'Mohan Garden & Gurudwara Road',
    'Bindapur & Pocket 3',
    'Nanhe Park & B-Block',
    'Matiala Village & Extension',
    'Sewak Park & Kiran Garden',
  ];

  return (
    <footer className="bg-[#0B1324] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4A853] to-[#B88D3B] flex items-center justify-center">
                <Building2 className="w-6 h-6 text-[#101D35]" />
              </div>
              <span className="text-xl font-bold font-['Outfit'] text-white">
                PRADHAN <span className="text-[#D4A853]">PROPERTIES</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your trusted real estate consultancy for West Delhi & Delhi NCR. We provide verified property transactions, 100% legal registry assistance, Jad Se independent houses, luxury builder floors, and high-yield commercial investments.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#D4A853] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Registry • Legal Due Diligence</span>
            </div>
          </div>

          {/* West Delhi Target Locations */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              Prime Service Locations
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {locations.map((loc, i) => (
                <li key={i} className="flex items-center gap-2 hover:text-[#D4A853] transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-[#D4A853] shrink-0" />
                  <span>{loc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              Property Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => { setCurrentRoute('buy'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                  className="hover:text-[#D4A853] transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Builder Floors for Sale</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentRoute('buy'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                  className="hover:text-[#D4A853] transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Jad Se Independent Houses</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentRoute('rent'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                  className="hover:text-[#D4A853] transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Family & Bachelor Rental Flats</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentRoute('sell'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                  className="hover:text-[#D4A853] transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Sell Your Flat / Land Fast</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentRoute('contact'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                  className="hover:text-[#D4A853] transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Home Loan Consultancy</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              Get In Touch
            </h3>
            <div className="space-y-3 text-sm">
              <a 
                href="tel:+919717433469"
                className="flex items-start gap-3 text-slate-300 hover:text-[#D4A853] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D4A853] mt-0.5" />
                <div>
                  <p className="font-semibold text-white">+91 97174 33469</p>
                  <p className="text-xs text-slate-400">+91 95073 63213 / 93195 39206</p>
                </div>
              </a>

              <a 
                href="https://wa.me/919717433469?text=Hello%20Pradhan%20Properties"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-300 hover:text-[#25D366] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Instant WhatsApp Enquiry</span>
              </a>

              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-4 h-4 text-[#D4A853] mt-0.5 shrink-0" />
                <span>Main Market Office, Uttam Nagar East, Near Metro Station, New Delhi 110059</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-[#D4A853] transition-colors"
              >
                <Lock className="w-3.5 h-3.5 text-[#D4A853]" />
                <span>Staff & Management Portal Login</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Pradhan Properties. All rights reserved. Operating in West Delhi & Delhi NCR.</p>
          <p className="text-slate-400">
            Customer phone numbers, addresses & internal records strictly private & encrypted.
          </p>
        </div>
      </div>
    </footer>
  );
}
