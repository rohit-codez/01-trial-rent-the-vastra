'use client';
import { motion } from 'framer-motion';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

export default function TrendingSection() {
  const trendingProducts = products.slice(0, 8);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4"
            >
              Trending <span className="text-maroon-700">This Season</span>
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: '80px' }}
              viewport={{ once: true }}
              className="h-1 bg-gold-400"
            />
          </div>
          <motion.a 
            href="/trending" 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:inline-block text-maroon-700 font-semibold hover:text-maroon-600 transition-colors"
          >
            View All Trending &rarr;
          </motion.a>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {trendingProducts.map((product) => (
            <div key={product.id} className="snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <a 
            href="/trending" 
            className="inline-block border border-maroon-700 text-maroon-700 px-6 py-2 rounded font-medium"
          >
            View All Trending
          </a>
        </div>
      </div>
    </section>
  );
}
