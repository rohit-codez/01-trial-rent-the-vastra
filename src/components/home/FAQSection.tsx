'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How does RentTheVastra work?",
    answer: "Browse our collection, select your outfit, choose your rental duration (3, 5, or 7 days), and book. We'll deliver it to your doorstep professionally dry-cleaned. After your event, pack it in the provided return bag, and we'll pick it up!"
  },
  {
    question: "Are the outfits clean and hygienic?",
    answer: "Absolutely! Every outfit goes through a rigorous premium dry-cleaning and sanitization process followed by a 10-point quality check before it reaches you."
  },
  {
    question: "Do I need to wash the clothes before returning?",
    answer: "No, please do not wash or dry-clean the outfits. We take care of all the cleaning. Just pack the worn outfit in the return bag we provide."
  },
  {
    question: "What happens if I accidentally damage the outfit?",
    answer: "We understand that minor wear and tear (like a missing bead or small stain) happens, and it's covered. However, for significant damage like large tears or permanent stains, deductions may be made from your security deposit."
  },
  {
    question: "How does the AI Stylist work?",
    answer: "Our AI Stylist analyzes details about your event (type, time, location, your body type, and preferences) to recommend 3 complete curated looks, including matching complimentary accessories."
  },
  {
    question: "Do you deliver across India?",
    answer: "Currently, RentTheVastra provides premium delivery and pickup services exclusively across Delhi NCR. We are expanding to other major cities soon!"
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4"
          >
            Frequently Asked <span className="text-maroon-700">Questions</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: '80px' }}
            viewport={{ once: true }}
            className="h-1 bg-gold-400 mx-auto"
          />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-beige-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-5 text-left bg-beige-50/50 hover:bg-beige-50 transition-colors"
              >
                <span className="font-bold text-neutral-900 font-sans">{faq.question}</span>
                <ChevronDown 
                  className={`text-maroon-700 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={20}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-5 pt-0 bg-beige-50/50 text-neutral-600 font-sans border-t border-beige-100">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
