'use client';

import { motion } from 'framer-motion';
import { Search, CalendarDays, Sparkles, CreditCard, Package, RotateCcw } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Browse & Choose',
    description: 'Explore 500+ premium outfits or let our AI Stylist pick the perfect look for your event.',
    color: 'from-rose-500 to-maroon-700',
    link: '/browse',
    linkLabel: 'Browse Collection',
  },
  {
    icon: CalendarDays,
    step: '02',
    title: 'Select Your Dates',
    description: 'Pick 3, 5, or 7 days. Your outfit is reserved exclusively for you on those dates.',
    color: 'from-violet-500 to-purple-700',
    link: null,
    linkLabel: null,
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'Add Accessories Free',
    description: 'Choose matching jewelry, clutches, and accessories — all bundled at no extra charge.',
    color: 'from-gold-400 to-yellow-600',
    link: '/browse?category=Jewelry',
    linkLabel: 'View Accessories',
  },
  {
    icon: CreditCard,
    step: '04',
    title: 'Secure Checkout',
    description: 'Pay safely via UPI, Card, or NetBanking. Razorpay powered with a refundable security deposit.',
    color: 'from-teal-500 to-emerald-700',
    link: null,
    linkLabel: null,
  },
  {
    icon: Package,
    step: '05',
    title: 'Doorstep Delivery',
    description: 'Your outfit arrives fresh, dry-cleaned, and neatly packed — straight to your door in Delhi NCR.',
    color: 'from-blue-500 to-indigo-700',
    link: null,
    linkLabel: null,
  },
  {
    icon: RotateCcw,
    step: '06',
    title: 'We Pick It Up',
    description: 'Simply keep the outfit ready. We send our team to collect it. No hassle, no trips needed.',
    color: 'from-orange-500 to-red-600',
    link: null,
    linkLabel: null,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Section heading */}
        <div className="text-center mb-16">
          <span className="inline-block bg-gold-400/10 text-gold-400 border border-gold-400/20 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            How it works
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Rent in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
              6 Easy Steps
            </span>
          </motion.h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            From browsing your dream outfit to returning it — the smoothest rental experience in India.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="h-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-400/30 rounded-2xl p-6 transition-all duration-300 flex flex-col gap-4">
                {/* Step number */}
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon size={22} className="text-white" />
                  </div>
                  <span className="font-serif text-5xl font-bold text-white/5 select-none">
                    {step.step}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{step.description}</p>
                </div>

                {step.link && (
                  <Link
                    href={step.link}
                    className="mt-auto inline-flex items-center gap-1.5 text-gold-400 hover:text-gold-300 text-sm font-semibold transition-colors"
                  >
                    {step.linkLabel}
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-300 text-maroon-950 font-bold px-10 py-4 rounded-full text-base shadow-xl transition-all duration-300 hover:shadow-gold-400/30 hover:shadow-2xl active:scale-95"
          >
            Start Renting Now
            <span>→</span>
          </Link>
          <p className="text-neutral-500 text-sm mt-4">No subscription. Pay only for what you rent.</p>
        </motion.div>
      </div>
    </section>
  );
}
