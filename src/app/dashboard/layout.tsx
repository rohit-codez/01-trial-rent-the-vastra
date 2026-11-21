import React from 'react';
import Link from 'next/link';
import { Home, Shirt, ShieldCheck, Heart, User, Sparkles, LogOut, Menu } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: Home },
    { name: 'My Rentals', href: '/dashboard/rentals', icon: Shirt },
    { name: 'Security Deposits', href: '/dashboard/deposits', icon: ShieldCheck },
    { name: 'Wishlist', href: '/dashboard/wishlist', icon: Heart },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'AI Recommendations', href: '/dashboard/ai', icon: Sparkles, highlight: true },
  ];

  return (
    <div className="min-h-screen bg-beige-50 flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-maroon-900 text-white fixed h-full z-10">
        <div className="p-6">
          <Link href="/" className="text-2xl font-serif font-bold text-gold-400">
            RentTheVastra
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${item.highlight ? 'bg-gold-500/20 text-gold-300 hover:bg-gold-500/30' : 'text-beige-200 hover:bg-maroon-800 hover:text-white'}`}>
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-maroon-800">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-beige-200 hover:bg-maroon-800 hover:text-white w-full transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-maroon-900 text-white p-4 flex justify-between items-center sticky top-0 z-20 shadow-md">
        <Link href="/" className="text-xl font-serif font-bold text-gold-400">RentTheVastra</Link>
        <button><Menu size={24} /></button>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-beige-200 flex justify-around p-2 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {navItems.slice(0, 5).map((item) => (
          <Link key={item.name} href={item.href} className="flex flex-col items-center p-2 text-neutral-500 hover:text-maroon-700">
            <item.icon size={20} />
            <span className="text-[10px] mt-1 font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
