'use client';
import React from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <>
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-beige-50 order-2 md:order-1">
        <div className="mb-8">
          <h2 className="text-2xl font-serif text-maroon-700 mb-2 font-medium">Create Your Account</h2>
          <p className="text-neutral-500 text-sm">Join RentTheVastra and upgrade your wardrobe</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required 
              className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 outline-none transition-all"
              placeholder="Rohit Sharma"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-beige-300 bg-beige-100 text-neutral-500 sm:text-sm">
                +91
              </span>
              <input 
                type="tel" 
                required 
                className="flex-1 min-w-0 block w-full px-4 py-3 rounded-none rounded-r-lg border border-beige-300 focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 outline-none transition-all"
                placeholder="9876543210"
              />
            </div>
          </div>
          
          <button type="button" className="w-full bg-maroon-700 text-white py-3 rounded-lg font-medium hover:bg-maroon-600 transition-colors shadow-sm mt-4">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-600">
          Already have an account?{' '}
          <Link href="/login" className="text-maroon-700 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
      
      <div className="hidden md:block md:w-1/2 bg-gold-900 relative order-1 md:order-2">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-60 mix-blend-overlay"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h3 className="text-3xl font-serif mb-2">Curated for You</h3>
          <p className="text-beige-200">Access thousands of designer pieces tailored for Indian occasions and festivals.</p>
        </div>
      </div>
    </>
  );
}
