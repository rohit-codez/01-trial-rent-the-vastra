import React from 'react';
import { Shirt, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-16 md:pb-0">
      <header>
        <h1 className="text-3xl font-serif text-maroon-900">Welcome back, Rohit!</h1>
        <p className="text-neutral-600 mt-2">Manage your rentals, track deposits, and discover new styles.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Rentals', value: '2', icon: Shirt, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Past Rentals', value: '12', icon: Shirt, color: 'text-neutral-600', bg: 'bg-neutral-100' },
          { label: 'Deposit Balance', value: '₹4,500', icon: ShieldCheck, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Wishlist', value: '8', icon: Heart, color: 'text-maroon-600', bg: 'bg-maroon-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-beige-200 shadow-sm flex flex-col justify-between">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${stat.bg} ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
              <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Rentals */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-serif text-maroon-900">Current Rentals</h2>
            <Link href="/dashboard/rentals" className="text-sm text-maroon-700 font-medium hover:underline flex items-center gap-1">View All <ArrowRight size={16}/></Link>
          </div>
          
          <div className="bg-white rounded-xl border border-beige-200 shadow-sm overflow-hidden">
            <div className="p-4 flex flex-col sm:flex-row gap-4 items-center border-b border-beige-100">
              <div className="w-24 h-24 bg-neutral-200 rounded-lg overflow-hidden shrink-0">
                <div className="w-full h-full bg-maroon-100 flex items-center justify-center text-maroon-300">Img</div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-bold text-neutral-900 text-lg">Royal Maroon Sherwani</h3>
                <p className="text-neutral-500 text-sm">Delivery: Oct 15 • Return: Oct 18</p>
                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Shipped</span>
              </div>
              <div className="text-right">
                <button className="px-4 py-2 border border-maroon-700 text-maroon-700 rounded-lg text-sm font-medium hover:bg-maroon-50 transition-colors">Track Order</button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Stylist Promo */}
        <div className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-4 -top-4 opacity-20"><Sparkles size={120} /></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-white" size={24} />
              <h3 className="font-serif text-xl font-bold">AI Stylist</h3>
            </div>
            <p className="text-gold-50 mb-6 text-sm leading-relaxed">
              Not sure what to wear for the upcoming Diwali party? Let our AI recommend the perfect outfit based on your body type and preferences.
            </p>
          </div>
          <button className="relative z-10 w-full bg-white text-gold-700 py-3 rounded-lg font-bold hover:bg-beige-50 transition-colors shadow-sm">
            Get Recommendations
          </button>
        </div>
      </div>
    </div>
  );
}
