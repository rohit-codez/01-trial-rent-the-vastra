'use client';
import { motion } from 'framer-motion';
import { Star, Quote, MapPin, Sparkles } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    city: 'New Delhi',
    occasion: 'Wedding Guest',
    text: 'RentTheVastra completely changed how I attend weddings! The AI stylist recommended a stunning Sabyasachi lehenga that fit perfectly. The complimentary accessories were just the cherry on top.',
    rating: 5,
    avatar: 'PS',
    gradient: 'from-rose-500 to-maroon-700',
  },
  {
    name: 'Rahul Verma',
    city: 'Gurgaon',
    occasion: 'Reception',
    text: "I needed a premium tuxedo for my brother's reception but didn't want to spend 30k on something I'd wear once. RentTheVastra provided a brand new looking piece with zero hassle on returns.",
    rating: 5,
    avatar: 'RV',
    gradient: 'from-blue-500 to-indigo-700',
  },
  {
    name: 'Ananya Gupta',
    city: 'Noida',
    occasion: 'Diwali Party',
    text: 'The dry cleaning and quality check is top-notch. I was skeptical about renting clothes, but the Anarkali I received smelled fresh and looked absolutely untouched. Huge fan of their service!',
    rating: 5,
    avatar: 'AG',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Vikram Singh',
    city: 'Delhi',
    occasion: 'Kedarkantha Trek',
    text: 'Rented a full hiking kit for my Kedarkantha trek — jacket, boots, and backpack. Everything was premium quality. Saved me ₹25,000+ compared to buying. Will definitely rent again!',
    rating: 5,
    avatar: 'VS',
    gradient: 'from-emerald-500 to-teal-700',
  },
  {
    name: 'Meera Kapoor',
    city: 'Gurgaon',
    occasion: 'Sangeet Night',
    text: 'The mirror-work sharara set I rented for the sangeet was absolutely gorgeous. Everyone asked where I bought it! The free matching jewelry was a perfect touch. 10/10 experience.',
    rating: 5,
    avatar: 'MK',
    gradient: 'from-purple-500 to-violet-700',
  },
  {
    name: 'Arjun Patel',
    city: 'Noida',
    occasion: 'Engagement Ceremony',
    text: 'Rented a designer sherwani for my engagement. The fabric quality and fitting was impeccable. My fiancée couldn\'t believe it was rented. The safa and brooch came free — amazing deal!',
    rating: 5,
    avatar: 'AP',
    gradient: 'from-gold-400 to-amber-600',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-beige-50/40 to-white overflow-hidden relative">
      
      {/* Decorative ambient */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-gold-400/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-50 via-white to-gold-50 border border-gold-200/80 text-maroon-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm mb-4">
            <Sparkles size={13} className="text-gold-500" />
            <span>Loved By Thousands</span>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4"
          >
            Real Stories From{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-maroon-700 to-maroon-900">
              Happy Customers
            </span>
          </motion.h2>
          
          <p className="text-neutral-500 text-sm sm:text-base max-w-lg mx-auto">
            Over 15,000 brides, grooms, and adventurers have trusted RentTheVastra for their special moments.
          </p>

          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '70px' }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-gold-400 to-amber-300 mx-auto mt-5 rounded-full"
          />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative bg-white/90 backdrop-blur-sm p-7 rounded-3xl border border-neutral-200/70 hover:border-gold-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(91,14,45,0.1)] hover:-translate-y-1.5 transition-all duration-400"
            >
              {/* Decorative quote */}
              <Quote className="absolute top-5 right-5 text-beige-200/80 w-12 h-12 group-hover:text-gold-400/20 transition-colors" />
              
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              
              {/* Text */}
              <p className="text-neutral-700 font-sans text-sm mb-7 leading-relaxed relative z-10">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3.5 border-t border-beige-200/80 pt-5">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-serif font-bold text-sm shadow-md`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="text-gold-500" />
                    {testimonial.occasion} • {testimonial.city}
                  </p>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="w-full h-0.5 bg-neutral-100 group-hover:bg-gold-400/60 rounded-full mt-5 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Social proof summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-6 bg-beige-50/80 border border-beige-200/80 rounded-2xl px-8 py-5 shadow-sm">
            <div className="text-center">
              <div className="font-serif text-2xl font-bold text-maroon-700">15,000+</div>
              <div className="text-[11px] text-neutral-500 font-medium">Happy Customers</div>
            </div>
            <div className="w-px h-10 bg-beige-200" />
            <div className="text-center">
              <div className="font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-500">4.9★</div>
              <div className="text-[11px] text-neutral-500 font-medium">Average Rating</div>
            </div>
            <div className="w-px h-10 bg-beige-200" />
            <div className="text-center">
              <div className="font-serif text-2xl font-bold text-maroon-700">2,400+</div>
              <div className="text-[11px] text-neutral-500 font-medium">Verified Reviews</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
