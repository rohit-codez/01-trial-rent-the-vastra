import React from 'react';
import { TrendingUp, Package, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export default function VendorDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Vendor Dashboard</h1>
          <p className="text-neutral-500 mt-1">Overview of your rental business</p>
        </div>
        <Link href="/vendor/products" className="bg-neutral-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-neutral-800 transition-colors">
          + Add Product
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: '₹45,200', icon: TrendingUp, color: 'text-green-600' },
          { label: 'Active Listings', value: '24', icon: Package, color: 'text-blue-600' },
          { label: 'Pending Bookings', value: '5', icon: Clock, color: 'text-orange-600' },
          { label: 'This Month', value: '12', icon: Calendar, color: 'text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-neutral-50 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-neutral-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-lg font-bold text-neutral-900">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Dates</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {[1, 2, 3].map((item) => (
                <tr key={item}>
                  <td className="p-4 font-medium text-neutral-900">Rahul Verma</td>
                  <td className="p-4 text-neutral-600">Designer Sherwani</td>
                  <td className="p-4 text-neutral-600">Oct 15 - Oct 18</td>
                  <td className="p-4 font-mono">₹2,500</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending Confirmation</span>
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
