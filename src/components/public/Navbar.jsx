import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  MessageSquare, 
  Lock, 
  Menu, 
  X, 
  Home, 
  ShoppingBag, 
  Key, 
  Upload, 
  MapPin,
  ChevronRight
} from 'lucide-react';

export default function Navbar({ currentRoute, setCurrentRoute, onOpenAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'buy', label: 'Buy Property', icon: ShoppingBag },
    { id: 'rent', label: 'Rent Property', icon: Key },
    { id: 'sell', label: 'Sell Your Property', icon: Upload, highlight: true },
    { id: 'contact', label: 'Contact Us', icon: MapPin },
  ];

  const handleNav = (routeId) => {
    setCurrentRoute(routeId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#101D35] text-white shadow-lg border-b border-[#D4A853]/20">
      {/* Top emergency / quick contact ticker */}
      <div className="bg-[#0B1324] text-xs text-slate-300 py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[#D4A853] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse"></span>
              West Delhi & Delhi NCR Property Specialists
            </span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-slate-400">
              Uttam Nagar • Nawada • Dwarka Mor • Mohan Garden • Matiala • Bindapur
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a 
              href="tel:+919717433469" 
              className="flex items-center gap-1 text-slate-300 hover:text-[#D4A853] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4A853]" />
              <span>+91 97174 33469 / 95073 63213</span>
            </a>
            <span className="text-slate-700">|</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[#D4A853] hover:text-white transition-colors font-medium bg-[#101D35] hover:bg-[#D4A853]/20 px-2.5 py-0.5 rounded border border-[#D4A853]/40"
              title="Private Business Management System"
            >
              <Lock className="w-3 h-3 text-[#D4A853]" />
              <span>Admin CRM</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4A853] to-[#B88D3B] flex items-center justify-center shadow-md shadow-[#D4A853]/20 group-hover:scale-105 transition-transform">
              <Building2 className="w-7 h-7 text-[#101D35]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight font-['Outfit'] text-white">
                  PRADHAN
                </span>
                <span className="text-xl font-bold tracking-tight font-['Outfit'] text-[#D4A853]">
                  PROPERTIES
                </span>
              </div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Real Estate & Property Management
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    item.highlight
                      ? 'bg-gradient-to-r from-[#D4A853] to-[#B88D3B] text-[#101D35] font-semibold hover:shadow-md hover:shadow-[#D4A853]/30 hover:brightness-105'
                      : isActive
                      ? 'bg-[#182B4D] text-[#D4A853] shadow-inner'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.highlight ? 'text-[#101D35]' : isActive ? 'text-[#D4A853]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/919717433469?text=Hello%20Pradhan%20Properties%2C%20I%20am%20looking%20for%20property%20in%20West%20Delhi."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+919717433469"
              className="flex items-center gap-2 bg-[#182B4D] hover:bg-[#233D6B] text-[#D4A853] border border-[#D4A853]/40 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#182B4D] text-slate-200 hover:text-white hover:bg-[#233D6B]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1324] border-t border-slate-800 px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                  item.highlight
                    ? 'bg-gradient-to-r from-[#D4A853] to-[#B88D3B] text-[#101D35] font-bold'
                    : isActive
                    ? 'bg-[#182B4D] text-[#D4A853]'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <a
              href="https://wa.me/919717433469?text=Hello%20Pradhan%20Properties"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-lg text-sm font-semibold"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+919717433469"
              className="flex items-center justify-center gap-2 bg-[#182B4D] text-[#D4A853] border border-[#D4A853]/40 py-2.5 rounded-lg text-sm font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </a>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#101D35] to-[#182B4D] border border-[#D4A853] text-[#D4A853] py-2.5 rounded-lg text-xs uppercase tracking-wider font-bold"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Open Private Admin CRM</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
