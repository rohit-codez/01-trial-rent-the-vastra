'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const occasions = [
  { name: 'Bridal & Wedding', count: '120+ Outfits', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop', highlight: 'Sabyasachi Lehengas' },
  { name: 'Groom & Wedding', count: '80+ Sets', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop', highlight: 'Zari Sherwanis' },
  { name: 'Sangeet & Dance', count: '85+ Outfits', image: 'https://images.unsplash.com/photo-1605763240000-7e93b172d754?q=80&w=600&auto=format&fit=crop', highlight: 'Twirl-Friendly Lehengas' },
  { name: 'Hiking & Trekking', count: '45+ Gear Kits', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=600&auto=format&fit=crop', highlight: 'Waterproof Shells & Boots' },
  { name: 'Reception & Cocktail', count: '90+ Gowns', image: 'https://images.unsplash.com/photo-1594938298596-70f56f916e46?q=80&w=600&auto=format&fit=crop', highlight: 'Evening Ball Gowns' },
  { name: 'Diwali & Puja', count: '150+ Outfits', image: 'https://images.unsplash.com/photo-1611095940024-f7b243b74737?q=80&w=600&auto=format&fit=crop', highlight: 'Festive Silk Kurtas' },
  { name: 'Navratri Garba', count: '75+ Chaniya Cholis', image: 'https://images.unsplash.com/photo-1610189013233-0498eb1b6c0f?q=80&w=600&auto=format&fit=crop', highlight: 'Mirror-Work Sets' },
  { name: 'Goa & Vacation', count: '60+ Outfits', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop', highlight: 'Resort & Beachwear' },
  { name: 'Kids & Babies', count: '50+ Cute Outfits', image: 'https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=600&auto=format&fit=crop', highlight: 'Organic Cotton Lined' },
];

export default function OccasionShop() {
  return (
    <section className="py-24 bg-gradient-to-b from-beige-50 via-white to-beige-50 relative overflow-hidden">
      
      {/* Decorative ambient blur */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[300px] bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-50 via-white to-gold-50 border border-gold-200/80 text-maroon-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm mb-4">
            <Sparkles size={13} className="text-gold-500" />
            <span>Style For Every Milestone</span>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 tracking-tight"
          >
            Shop By <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon-700 to-maroon-900">Occasion &amp; Adventure</span>
          </motion.h2>

          <p className="text-neutral-500 text-sm sm:text-base max-w-lg mx-auto">
            Choose your celebration or trail — our stylists and outdoor experts have bundled the exact look you need.
          </p>

          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '70px' }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-gold-400 to-amber-300 mx-auto mt-5 rounded-full"
          />
        </div>

        {/* Occasions Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {occasions.map((occasion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <Link 
                href={`/browse?occasion=${encodeURIComponent(occasion.name)}`} 
                className="group relative flex items-center gap-4 p-3.5 rounded-3xl bg-white/90 hover:bg-white backdrop-blur-sm border border-neutral-200/80 hover:border-gold-400/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(91,14,45,0.1)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image Thumb */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-neutral-100 shadow-sm">
                  <img
                    src={occasion.image}
                    alt={occasion.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 pr-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600 block mb-0.5">
                    {occasion.highlight}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-neutral-900 group-hover:text-maroon-700 transition-colors truncate">
                    {occasion.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium mt-0.5">
                    {occasion.count} available for rent
                  </p>
                </div>

                {/* Arrow Action */}
                <div className="w-9 h-9 rounded-full bg-neutral-100 group-hover:bg-maroon-700 group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 text-neutral-500 mr-1 shadow-sm">
                  <ArrowRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
