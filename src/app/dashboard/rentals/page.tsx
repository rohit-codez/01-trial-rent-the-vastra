import React from 'react';

export default function RentalsPage() {
  const tabs = ['Active', 'Past', 'All'];

  return (
    <div className="space-y-6 pb-16 md:pb-0">
      <header>
        <h1 className="text-3xl font-serif text-maroon-900">My Rentals</h1>
        <p className="text-neutral-600 mt-1">Track and manage your rental orders.</p>
      </header>

      <div className="flex gap-4 border-b border-beige-200">
        {tabs.map((tab, i) => (
          <button key={tab} className={`pb-3 px-2 font-medium text-sm transition-colors ${i === 0 ? 'border-b-2 border-maroon-700 text-maroon-700' : 'text-neutral-500 hover:text-neutral-800'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {/* Mock Rental Card */}
        <div className="bg-white rounded-xl border border-beige-200 shadow-sm p-5">
          <div className="flex justify-between items-start mb-4 pb-4 border-b border-beige-100">
            <div>
              <p className="text-xs text-neutral-500 font-mono">ORDER #RTV-84729</p>
              <h3 className="font-bold text-neutral-900 mt-1">Royal Maroon Sherwani</h3>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Shipped</span>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="w-24 h-32 bg-beige-100 rounded-lg"></div>
            
            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Rental Period</p>
                  <p className="text-sm font-medium text-neutral-900">Oct 15 - Oct 18 (3 Days)</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Amount Paid</p>
                  <p className="text-sm font-medium text-neutral-900">₹4,500</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-beige-200 -translate-y-1/2 z-0 hidden sm:block"></div>
                <div className="absolute top-1/2 left-0 w-1/2 h-0.5 bg-maroon-700 -translate-y-1/2 z-0 hidden sm:block"></div>
                
                <div className="relative z-10 flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
                  {['Booked', 'Confirmed', 'Shipped', 'Delivered', 'Returned'].map((step, idx) => (
                    <div key={step} className="flex sm:flex-col items-center gap-3 sm:gap-1">
                      <div className={`w-4 h-4 rounded-full border-2 ${idx <= 2 ? 'bg-maroon-700 border-maroon-700' : 'bg-white border-beige-300'}`}></div>
                      <span className={`text-xs font-medium ${idx <= 2 ? 'text-maroon-900' : 'text-neutral-400'}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-beige-100 flex justify-end gap-3">
            <button className="px-4 py-2 border border-beige-300 text-neutral-700 rounded-lg text-sm font-medium hover:bg-beige-50">View Details</button>
            <button className="px-4 py-2 bg-maroon-700 text-white rounded-lg text-sm font-medium hover:bg-maroon-600">Track Package</button>
          </div>
        </div>
      </div>
    </div>
  );
}
