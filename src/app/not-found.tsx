import Link from 'next/link';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-beige-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-4xl font-serif text-maroon-700 font-bold">404</h1>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-serif text-neutral-900">
            Looks like this outfit is out on rental!
          </h2>
          <p className="text-neutral-600 font-sans">
            The page you are looking for doesn't exist or has been moved. 
            Let's get you back to our fabulous collection.
          </p>
        </div>

        <div className="relative max-w-sm mx-auto">
          <input 
            type="text" 
            placeholder="Search RentTheVastra..." 
            className="w-full pl-10 pr-4 py-3 rounded-full border border-beige-200 focus:border-maroon-700 focus:ring-1 focus:ring-maroon-700 outline-none bg-white font-sans"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
        </div>

        <Link 
          href="/browse"
          className="inline-block bg-maroon-700 hover:bg-maroon-600 text-white font-sans font-medium px-8 py-3 rounded-full transition-colors duration-200"
        >
          Browse Collection
        </Link>
      </div>
    </div>
  );
}
