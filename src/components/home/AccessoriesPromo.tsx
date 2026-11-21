'use client';
import { motion } from 'framer-motion';
import { Plus, Equal, Gem } from 'lucide-react';
import Link from 'next/link';

export default function AccessoriesPromo() {
  return (
    <section className="py-20 bg-beige-200/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-beige-200">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-beige-100 text-maroon-700 text-sm font-bold mb-6 w-max">
                <Gem size={16} />
                Exclusive Offer
              </div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
              >
                Free Accessories with <br />
                <span className="text-maroon-700">Every Rental</span>
              </motion.h2>
              <p className="text-neutral-600 mb-8 font-sans text-lg">
                Complete your look without breaking the bank! Every outfit rental comes with a complimentary set of matching accessories. You only pay a fully refundable security deposit.
              </p>
              <div>
                <Link href="/accessories-policy" className="inline-block px-8 py-3 bg-maroon-700 text-white font-medium rounded hover:bg-maroon-600 transition-colors">
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 bg-beige-50 p-8 lg:p-12 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-beige-200">
              <div className="flex flex-wrap items-center justify-center gap-4 text-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md bg-[url('https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center mb-2" />
                  <span className="font-medium text-neutral-700">Outfit</span>
                </motion.div>
                
                <Plus className="text-gold-500 w-8 h-8" />
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md bg-[url('https://images.unsplash.com/photo-1599643477874-cebc0b4b22c7?q=80&w=200&auto=format&fit=crop')] bg-cover bg-center mb-2" />
                  <span className="font-medium text-neutral-700">Accessories</span>
                </motion.div>

                <Equal className="text-gold-500 w-8 h-8" />
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-maroon-700 shadow-lg bg-maroon-700 flex items-center justify-center text-white mb-2">
                    <div className="text-center">
                      <span className="block text-2xl font-bold">₹0</span>
                      <span className="text-xs uppercase opacity-80">Rental Fee*</span>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-500 max-w-[120px]">*Refundable deposit applies</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
