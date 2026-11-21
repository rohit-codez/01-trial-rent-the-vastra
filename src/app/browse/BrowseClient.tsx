'use client';

import { useState } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import FilterSidebar from '@/components/product/FilterSidebar';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';

interface BrowseClientProps {
  initialProducts: Product[];
}

export default function BrowseClient({ initialProducts }: BrowseClientProps) {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Filters */}
      <FilterSidebar 
        isMobileOpen={isMobileFilterOpen} 
        onCloseMobile={() => setIsMobileFilterOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4 pb-4 border-b border-beige-200">
          <button 
            className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-beige-300 rounded text-neutral-700 font-medium"
            onClick={() => setIsMobileFilterOpen(true)}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="flex items-center space-x-4 ml-auto lg:ml-0">
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-beige-300 rounded pl-4 pr-10 py-2 text-neutral-700 focus:outline-none focus:ring-2 focus:ring-maroon-700 cursor-pointer"
              >
                <option value="relevance">Sort by: Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="popular">Most Popular</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
            </div>

            <div className="hidden sm:flex border border-beige-300 rounded overflow-hidden">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-beige-200 text-maroon-700' : 'bg-white text-neutral-500 hover:bg-beige-100'}`}
                title="Grid View"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-beige-200 text-maroon-700' : 'bg-white text-neutral-500 hover:bg-beige-100'}`}
                title="List View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6"
            : "flex flex-col space-y-6"
        }>
          {initialProducts.map((product) => (
            <div key={product.id} className={viewMode === 'list' ? "max-w-3xl" : ""}>
               <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {/* Pagination placeholder */}
        <div className="mt-12 flex justify-center">
          <button className="px-6 py-3 border-2 border-maroon-700 text-maroon-700 font-medium rounded hover:bg-maroon-50 transition-colors">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
