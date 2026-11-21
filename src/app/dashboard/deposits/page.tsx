import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export default function DepositsPage() {
  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <header>
        <h1 className="text-3xl font-serif text-maroon-900">Security Deposits</h1>
        <p className="text-neutral-600 mt-1">Track your refundable security deposits for all rentals.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-maroon-50 border border-maroon-100 rounded-xl p-6">
          <div className="flex items-center gap-2 text-maroon-800 mb-2">
            <ShieldCheck size={20} />
            <h3 className="font-medium">Currently Held</h3>
          </div>
          <p className="text-3xl font-bold text-maroon-900">₹4,500</p>
          <p className="text-sm text-maroon-600 mt-1">Across 2 active rentals</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-6">
          <div className="flex items-center gap-2 text-green-800 mb-2">
            <ShieldCheck size={20} />
            <h3 className="font-medium">Total Refunded</h3>
          </div>
          <p className="text-3xl font-bold text-green-900">₹12,000</p>
          <p className="text-sm text-green-600 mt-1">Lifetime refunds processed</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-blue-800">
        <AlertCircle className="shrink-0 mt-0.5" size={18} />
        <p className="text-sm">Deposits are typically refunded within 24-48 hours after the item is picked up and quality checked.</p>
      </div>

      <div className="bg-white rounded-xl border border-beige-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-beige-50 text-neutral-600 border-b border-beige-200">
            <tr>
              <th className="p-4 font-medium">Order ID / Item</th>
              <th className="p-4 font-medium">Deposit Amount</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-beige-100">
            <tr>
              <td className="p-4">
                <p className="font-medium text-neutral-900">#RTV-84729</p>
                <p className="text-neutral-500">Royal Maroon Sherwani</p>
              </td>
              <td className="p-4 font-mono font-medium">₹3,500</td>
              <td className="p-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Held</span>
              </td>
              <td className="p-4 text-neutral-500">Oct 12, 2026</td>
            </tr>
            <tr>
              <td className="p-4">
                <p className="font-medium text-neutral-900">#RTV-84729</p>
                <p className="text-neutral-500">Accessories (x2)</p>
              </td>
              <td className="p-4 font-mono font-medium">₹1,000</td>
              <td className="p-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Held</span>
              </td>
              <td className="p-4 text-neutral-500">Oct 12, 2026</td>
            </tr>
            <tr>
              <td className="p-4">
                <p className="font-medium text-neutral-900">#RTV-72104</p>
                <p className="text-neutral-500">Designer Blue Lehenga</p>
              </td>
              <td className="p-4 font-mono font-medium">₹5,000</td>
              <td className="p-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Refunded</span>
              </td>
              <td className="p-4 text-neutral-500">Sep 05, 2026</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
