'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-beige-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-beige-200">
        <h1 className="text-3xl font-serif text-maroon-700 font-bold">
          RentTheVastra
        </h1>
        
        <div className="space-y-4">
          <h2 className="text-xl font-serif text-neutral-900">
            Something went wrong
          </h2>
          <p className="text-neutral-600 font-sans">
            We apologize for the inconvenience. Our team has been notified.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => reset()}
            className="w-full bg-maroon-700 hover:bg-maroon-600 text-white font-sans font-medium px-8 py-3 rounded-full transition-colors duration-200"
          >
            Try Again
          </button>
          
          <Link 
            href="/contact"
            className="text-gold-400 hover:text-gold-500 font-sans text-sm underline-offset-4 hover:underline"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
