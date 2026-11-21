import React from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <header>
        <h1 className="text-3xl font-serif text-maroon-900">My Wishlist</h1>
        <p className="text-neutral-600 mt-1">Items you've saved for later.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-xl border border-beige-200 overflow-hidden shadow-sm group">
            <div className="aspect-[3/4] bg-beige-100 relative">
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-red-500 hover:bg-white transition-colors z-10 shadow-sm">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-neutral-900 truncate">Designer Outfit Name</h3>
              <p className="text-sm text-neutral-500 mb-3">Rent from ₹1,200/day</p>
              <button className="w-full flex items-center justify-center gap-2 bg-maroon-50 text-maroon-700 py-2.5 rounded-lg text-sm font-bold hover:bg-maroon-100 transition-colors">
                <ShoppingBag size={16} />
                Rent Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
