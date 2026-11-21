import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function VendorProductsPage() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">My Products</h1>
          <p className="text-neutral-500 mt-1">Manage your inventory and pricing.</p>
        </div>
        <button className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-neutral-800 transition-colors">
          <Plus size={18} />
          Add New Product
        </button>
      </header>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Rental Price</th>
                <th className="p-4 font-medium">Deposit</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {[1, 2, 3, 4].map((item) => (
                <tr key={item} className="hover:bg-neutral-50">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-12 h-12 bg-neutral-200 rounded object-cover"></div>
                    <div>
                      <p className="font-bold text-neutral-900">Velvet Lehenga Choli</p>
                      <p className="text-xs text-neutral-500">Women • Ethnic</p>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-neutral-700">₹1,500/day</td>
                  <td className="p-4 font-mono text-neutral-700">₹5,000</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Available</span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-neutral-400 hover:text-neutral-900"><Edit2 size={16} /></button>
                    <button className="p-2 text-neutral-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
