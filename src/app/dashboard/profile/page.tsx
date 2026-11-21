import React from 'react';
import { Camera } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-8 pb-16 md:pb-0 max-w-3xl">
      <header>
        <h1 className="text-3xl font-serif text-maroon-900">Profile Settings</h1>
        <p className="text-neutral-600 mt-1">Manage your personal information and style preferences.</p>
      </header>

      <div className="bg-white rounded-xl border border-beige-200 shadow-sm p-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-maroon-100 rounded-full flex items-center justify-center text-maroon-500 relative group cursor-pointer border-4 border-white shadow-md">
            <span className="text-3xl font-serif">R</span>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={24} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900">Rohit Sharma</h2>
            <p className="text-neutral-500">rohit@example.com</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
              <input type="text" defaultValue="Rohit Sharma" className="w-full px-4 py-2.5 border border-beige-300 rounded-lg focus:ring-2 focus:ring-maroon-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
              <input type="tel" defaultValue="+91 9876543210" className="w-full px-4 py-2.5 border border-beige-300 rounded-lg focus:ring-2 focus:ring-maroon-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Default Delivery Address</label>
            <textarea rows={3} defaultValue="123, Fashion Street, Sector 45" className="w-full px-4 py-2.5 border border-beige-300 rounded-lg focus:ring-2 focus:ring-maroon-500 outline-none" />
          </div>

          <h3 className="text-lg font-serif text-maroon-900 border-b border-beige-200 pb-2 mt-8">Style Preferences (For AI Engine)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Preferred Fit</label>
              <select className="w-full px-4 py-2.5 border border-beige-300 rounded-lg focus:ring-2 focus:ring-maroon-500 outline-none bg-white">
                <option>Slim Fit</option>
                <option>Regular Fit</option>
                <option>Relaxed Fit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Favorite Colors</label>
              <input type="text" defaultValue="Maroon, Navy Blue, Gold" className="w-full px-4 py-2.5 border border-beige-300 rounded-lg focus:ring-2 focus:ring-maroon-500 outline-none" />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="button" className="bg-maroon-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-maroon-600 transition-colors shadow-sm">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
