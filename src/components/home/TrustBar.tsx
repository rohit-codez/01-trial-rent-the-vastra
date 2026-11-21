'use client';

import { ShieldCheck, CheckCircle, RotateCcw, Truck, Gem, Headphones, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'Dry-Cleaned & Sanitized',
    description: 'Hospital-grade organic cleaning before every delivery',
    highlight: '100% Hygienic',
    color: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: CheckCircle,
    title: '10-Point Quality Inspection',
    description: 'Verified fabric, hand-embroidery, and zipper integrity',
    highlight: 'Flawless Finish',
    color: 'text-blue-600',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Truck,
    title: 'Doorstep Delivery & Pickup',
    description: 'Delivered to your home in Delhi NCR with zero-cost return pickup',
    highlight: 'Free In NCR',
    color: 'text-maroon-700',
    bg: 'bg-maroon-500/10',
    border: 'border-maroon-500/20',
  },
  {
    icon: Gem,
    title: '2 Free Luxury Accessories',
    description: 'Matching jewelry, cufflinks, or safa auto-bundled at ₹0',
    highlight: '₹0 Added Cost',
    color: 'text-amber-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    icon: RotateCcw,
    title: '100% Refundable Deposit',
    description: 'Instant security deposit reversal upon hassle-free return pickup',
    highlight: 'Zero Risk',
    color: 'text-purple-600',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Headphones,
    title: 'AI Stylist & Concierge',
    description: 'Personalized fashion and gear consultations 24/7 on demand',
    highlight: 'Always Ready',
    color: 'text-teal-600',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
  },
];

export default function TrustBar() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white via-beige-50/60 to-white border-y border-beige-200/80">
      
      {/* Subtle background ambient mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-gold-400/5 to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Header Label Pill */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-maroon-50 via-gold-50 to-maroon-50 border border-maroon-100/80 text-maroon-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
            <Sparkles size={13} className="text-gold-500" />
            <span>The RentTheVastra Luxury Promise</span>
          </div>
          
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mt-3">
            Effortless Luxury, <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon-700 to-maroon-900">Guaranteed</span>
          </h2>
          <p className="text-neutral-500 text-sm max-w-lg mx-auto mt-2">
            Why thousands of wedding guests, brides, and adventurers trust RentTheVastra.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
        >
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="group relative flex flex-col justify-between p-5 rounded-2xl bg-white/80 hover:bg-white backdrop-blur-sm border border-neutral-200/60 hover:border-gold-400/60 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(212,175,55,0.12)] hover:-translate-y-1.5 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${item.bg} ${item.border} border rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <item.icon size={22} className={item.color} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full group-hover:bg-gold-50 group-hover:text-gold-700 transition-colors">
                    {item.highlight}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-neutral-900 text-sm leading-snug mb-1.5 group-hover:text-maroon-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom micro-accent line */}
              <div className="w-full h-0.5 bg-neutral-100 group-hover:bg-gold-400/60 rounded-full mt-4 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
