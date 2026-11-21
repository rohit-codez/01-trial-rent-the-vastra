import { Metadata } from 'next';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import BrowseClient from './BrowseClient';

export const metadata: Metadata = {
  title: 'Rent Designer Fashion in Delhi NCR | RentTheVastra',
  description: 'Browse our extensive collection of premium designer wear for rent in Delhi NCR. Find the perfect outfit for your next occasion.',
};

export default function BrowsePage() {
  // In a real app, you would fetch and filter data based on search params here
  // For this static version, we'll pass initial data to a client component
  
  return (
    <div className="bg-beige-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif text-maroon-700 font-bold mb-2">
            Browse Our Collection
          </h1>
          <p className="text-neutral-600">Showing {products.length} results</p>
        </div>
        
        <BrowseClient initialProducts={products} />
      </div>
    </div>
  );
}
