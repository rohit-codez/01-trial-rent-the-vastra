'use client';
import { Product } from '@/types/index';
import Link from 'next/link';
import { Heart, Star, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercent = product.retailPrice && product.rentalPrice3Day
    ? Math.round((1 - product.rentalPrice3Day / product.retailPrice) * 100)
    : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(91,14,45,0.12)] transition-all duration-400 border border-neutral-200/70 hover:border-gold-400/60 flex-shrink-0 w-[290px] flex flex-col justify-between"
    >
      <div>
        {/* Image Container with Floating Badges */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            loading="lazy"
          />

          {/* Subtle image dark gradient at bottom for badge contrast */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Top Occasion Tag */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1 text-[11px] font-bold rounded-full text-white border border-white/20 uppercase tracking-wider shadow-sm">
              {product.occasionTags?.[0] || product.category}
            </span>
          </div>

          {/* Wishlist Button */}
          <button 
            aria-label="Add to wishlist"
            className="absolute top-3 right-3 z-10 p-2.5 bg-white/80 hover:bg-white backdrop-blur-md rounded-full text-neutral-500 hover:text-maroon-700 transition-all duration-200 shadow-md hover:scale-110 active:scale-95"
          >
            <Heart size={16} />
          </button>

          {/* Bottom Floating Free Accessories Pill */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-400/30 shadow-md">
              <span>🎁</span>
              <span>2 Free Accessories</span>
            </span>

            {discountPercent && (
              <span className="inline-block bg-gold-400 text-maroon-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                Save {discountPercent}%
              </span>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-5">
          {/* Designer Name & Star Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600 truncate">
              {product.designerName || 'Designer Collection'}
            </span>

            <div className="flex items-center text-gold-500 text-xs font-bold shrink-0 bg-gold-50 px-2 py-0.5 rounded-full border border-gold-200/50">
              <Star size={12} className="fill-gold-400 text-gold-400 mr-1" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-neutral-900 text-base leading-snug truncate group-hover:text-maroon-700 transition-colors mb-2">
            {product.title}
          </h3>

          {/* Rental Pricing */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-serif font-bold text-xl text-maroon-700">
              ₹{product.rentalPrice3Day.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-neutral-500 font-medium">/ 3 days</span>
            <span className="text-xs text-neutral-400 line-through ml-auto">
              ₹{product.retailPrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Action CTA Button */}
      <div className="px-5 pb-5 pt-0">
        <Link 
          href={`/product/${product.slug}`}
          className="group/btn relative flex w-full items-center justify-center gap-2 py-2.5 rounded-xl bg-beige-100 hover:bg-maroon-700 border border-neutral-200/80 hover:border-maroon-700 text-neutral-800 hover:text-white font-semibold text-xs transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
        >
          <span>View Details &amp; Free Gifts</span>
          <ArrowRight size={13} className="transform group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
