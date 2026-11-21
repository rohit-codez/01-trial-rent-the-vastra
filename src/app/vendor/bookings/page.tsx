import React from 'react';

export default function VendorBookingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-neutral-900">Bookings</h1>
        <p className="text-neutral-500 mt-1">Manage incoming orders and returns.</p>
      </header>

      <div className="flex gap-2">
        {['All', 'Pending', 'Active', 'Completed', 'Cancelled'].map(filter => (
          <button key={filter} className="px-4 py-1.5 rounded-full border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-50">
            {filter}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr>
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Dates</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr className="hover:bg-neutral-50">
                <td className="p-4 font-mono text-xs text-neutral-500">#RTV-84729</td>
                <td className="p-4 font-medium text-neutral-900">Rohit Sharma</td>
                <td className="p-4 text-neutral-600">Royal Maroon Sherwani</td>
                <td className="p-4 text-neutral-600">Oct 15 - Oct 18</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>
                </td>
                <td className="p-4 text-right">
                  <button className="bg-neutral-900 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-neutral-800">Confirm Order</button>
                </td>
              </tr>
              <tr className="hover:bg-neutral-50">
                <td className="p-4 font-mono text-xs text-neutral-500">#RTV-72104</td>
                <td className="p-4 font-medium text-neutral-900">Priya Singh</td>
                <td className="p-4 text-neutral-600">Designer Lehenga</td>
                <td className="p-4 text-neutral-600">Oct 10 - Oct 12</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Active (Shipped)</span>
                </td>
                <td className="p-4 text-right">
                  <button className="border border-neutral-300 text-neutral-700 px-3 py-1.5 rounded text-xs font-medium hover:bg-neutral-50">Mark Returned</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
