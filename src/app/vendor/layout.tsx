import React from 'react';
import Link from 'next/link';
import { TrendingUp, Package, Users, DollarSign, Menu, LayoutDashboard, Settings } from 'lucide-react';

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', href: '/vendor', icon: LayoutDashboard },
    { name: 'My Products', href: '/vendor/products', icon: Package },
    { name: 'Bookings', href: '/vendor/bookings', icon: Users },
    { name: 'Earnings', href: '/vendor/earnings', icon: DollarSign },
    { name: 'Settings', href: '/vendor/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col md:flex-row">
      <aside className="hidden md:flex flex-col w-64 bg-neutral-900 text-white fixed h-full z-10">
        <div className="p-6 border-b border-neutral-800">
          <Link href="/" className="text-xl font-serif font-bold text-white flex flex-col">
            <span>RentTheVastra</span>
            <span className="text-xs text-gold-400 tracking-widest uppercase mt-1">Vendor Portal</span>
          </Link>
        </div>
        <nav className="flex-1 py-6 space-y-1">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} 
              className="flex items-center gap-3 px-6 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors">
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="md:hidden bg-neutral-900 text-white p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="font-serif font-bold">RTV Vendor</div>
        <button><Menu size={24} /></button>
      </div>

      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
