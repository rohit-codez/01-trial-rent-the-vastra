import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon-900 via-maroon-800 to-beige-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center">
        <h1 className="text-[20vw] font-serif font-bold text-white whitespace-nowrap transform -rotate-12">RentTheVastra</h1>
      </div>
      
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {children}
      </div>
    </div>
  );
}
