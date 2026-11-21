'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/verify');
  };

  return (
    <>
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-beige-50">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-serif text-maroon-700 font-bold tracking-tight">RentTheVastra</h1>
          <p className="text-neutral-500 mt-2 text-sm">Premium Fashion Rental for India</p>
        </div>

        <h2 className="text-2xl font-serif text-neutral-900 mb-6 font-medium">Welcome Back</h2>

        <form onSubmit={handleSendOTP} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-beige-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 outline-none transition-all"
              placeholder="you@example.com"
            />
          </div>
          
          <button type="submit" className="w-full bg-maroon-700 text-white py-3 rounded-lg font-medium hover:bg-maroon-600 transition-colors shadow-sm">
            Send OTP
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-beige-300"></div>
          <span className="mx-4 text-sm text-neutral-400">or</span>
          <div className="flex-grow border-t border-beige-300"></div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-white border border-beige-300 text-neutral-700 py-3 rounded-lg font-medium hover:bg-beige-100 transition-colors shadow-sm">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 24c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 21.53 7.7 24 12 24z" />
            <path fill="#FBBC05" d="M5.84 15.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V8.07H2.18C1.43 9.55 1 11.22 1 13s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-neutral-600">
          New to RentTheVastra?{' '}
          <Link href="/register" className="text-maroon-700 font-medium hover:underline">
            Create Account
          </Link>
        </p>
      </div>
      
      <div className="hidden md:block md:w-1/2 bg-maroon-900 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1583391733958-d15317a72d50?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50 mix-blend-overlay"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h3 className="text-3xl font-serif mb-2">Sustainable Elegance</h3>
          <p className="text-beige-200">Rent premium designer wear for a fraction of the cost. Look stunning, spend smart.</p>
        </div>
      </div>
    </>
  );
}
