'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const categories = [
  {
    title: 'Women',
    tag: '180+ Designer Pieces',
    description: 'Lehengas, Heritage Sarees, Reception Gowns & Anarkalis',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    link: '/browse?gender=women',
    badge: 'Popular',
  },
  {
    title: 'Men',
    tag: '90+ Royal Outfits',
    description: 'Nawab Sherwanis, Kurta Sets, Tuxedos & Bandhgalas',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=85',
    link: '/browse?gender=men',
    badge: 'Wedding Season',
  },
  {
    title: 'Travel & Hiking',
    tag: 'Expedition Rated',
    description: 'Gore-Tex Shells, Down Puffers, Trail Boots & 65L Packs',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1000&q=85',
    link: '/browse?occasion=Hiking+%26+Trekking',
    badge: 'Adventure',
  },
  {
    title: 'Kids & Babies',
    tag: 'Organic & Sanitized',
    description: 'Pre-draped Sarees, Mini Sherwanis & Princess Gowns',
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=85',
    link: '/browse?gender=kids',
    badge: 'Cute Collection',
  },
  {
    title: 'Luxury Accessories',
    tag: 'Free With Rentals',
    description: 'Kundan Jewelry, Potlis, Clutches, Safas & Brooches',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
    link: '/browse?category=Jewelry',
    badge: '2 Free Included',
  }
];

export default function FeaturedCategories() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-beige-50/50 to-beige-50 relative overflow-hidden">
      
      {/* Decorative ambient bloom */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-maroon-700/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-maroon-50 text-maroon-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-maroon-100 shadow-sm mb-4">
            <Sparkles size={13} className="text-gold-500" />
            <span>Discover The Collections</span>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 tracking-tight"
          >
            Curated For Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon-700 via-maroon-800 to-maroon-900">Grand Occasion</span>
          </motion.h2>

          <p className="text-neutral-500 text-sm sm:text-base max-w-xl mx-auto">
            From royal weddings in Delhi NCR to Himalayan mountain treks, rent heirloom quality for a fraction of retail.
          </p>

          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '70px' }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-gold-400 to-amber-300 mx-auto mt-5 rounded-full"
          />
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link 
                href={category.link} 
                className="group relative block h-[420px] lg:h-[490px] rounded-3xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(91,14,45,0.2)] border border-neutral-200/80 hover:border-gold-400/80 transition-all duration-500"
              >
                {/* Background Image with Zoom */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />

                {/* Dark Luxury Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 group-hover:via-black/25 transition-all duration-500" />
                
                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/20 text-gold-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {category.badge}
                  </span>
                </div>

                {/* Card Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <span className="text-[11px] font-semibold text-gold-300 uppercase tracking-widest block mb-1">
                      {category.tag}
                    </span>

                    <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight drop-shadow-md">
                      {category.title}
                    </h3>

                    <p className="text-beige-200/90 text-xs mb-4 font-sans leading-relaxed line-clamp-2">
                      {category.description}
                    </p>

                    <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 group-hover:text-white transition-colors">
                      <span>Explore Collection</span>
                      <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Bottom Gold Accent Bar */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
