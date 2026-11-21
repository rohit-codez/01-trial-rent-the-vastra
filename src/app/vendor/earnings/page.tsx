import React from 'react';

export default function VendorEarningsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-neutral-900">Earnings & Payouts</h1>
        <p className="text-neutral-500 mt-1">Track your revenue and withdrawal history.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-neutral-900 text-white p-6 rounded-xl shadow-sm">
          <p className="text-neutral-400 text-sm font-medium mb-1">Available for Payout</p>
          <p className="text-3xl font-bold">₹12,400</p>
          <button className="mt-4 w-full bg-white text-neutral-900 py-2 rounded-lg text-sm font-bold hover:bg-neutral-100 transition-colors">Request Payout</button>
        </div>
        <div className="bg-white border border-neutral-200 p-6 rounded-xl shadow-sm flex flex-col justify-center">
          <p className="text-neutral-500 text-sm font-medium mb-1">Pending Clearance</p>
          <p className="text-3xl font-bold text-neutral-900">₹4,500</p>
        </div>
        <div className="bg-white border border-neutral-200 p-6 rounded-xl shadow-sm flex flex-col justify-center">
          <p className="text-neutral-500 text-sm font-medium mb-1">Total Lifetime Earnings</p>
          <p className="text-3xl font-bold text-neutral-900">₹145,200</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-neutral-900 mb-6">Earnings Overview</h2>
        
        {/* Simple Bar Chart UI using Divs */}
        <div className="h-48 flex items-end gap-2 sm:gap-4 md:gap-8 border-b border-neutral-200 pb-2">
          {[40, 60, 30, 80, 50, 90, 70].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full bg-neutral-100 rounded-t-sm relative group-hover:bg-neutral-200 transition-colors" style={{ height: '100%' }}>
                <div className="absolute bottom-0 left-0 w-full bg-neutral-900 rounded-t-sm transition-all" style={{ height: `${height}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 sm:gap-4 md:gap-8 mt-2 text-xs text-neutral-500 text-center font-medium">
          <div className="flex-1">Apr</div>
          <div className="flex-1">May</div>
          <div className="flex-1">Jun</div>
          <div className="flex-1">Jul</div>
          <div className="flex-1">Aug</div>
          <div className="flex-1">Sep</div>
          <div className="flex-1">Oct</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden mt-8">
        <div className="p-6 border-b border-neutral-200">
          <h2 className="text-lg font-bold text-neutral-900">Transaction History</h2>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-neutral-600">
            <tr>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Description</th>
              <th className="p-4 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            <tr>
              <td className="p-4 text-neutral-500">Oct 12, 2026</td>
              <td className="p-4 font-medium text-neutral-900">Payout to Bank Account (****4829)</td>
              <td className="p-4 text-right font-mono font-medium text-red-600">- ₹10,000</td>
            </tr>
            <tr>
              <td className="p-4 text-neutral-500">Oct 10, 2026</td>
              <td className="p-4 font-medium text-neutral-900">Rental Income (Order #RTV-72104)</td>
              <td className="p-4 text-right font-mono font-medium text-green-600">+ ₹2,500</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
