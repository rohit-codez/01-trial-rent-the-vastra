'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ArrowRight } from 'lucide-react';

const WHATSAPP_NUMBER = '919876543210';
const QUICK_MESSAGES = [
  { label: '👰 Wedding Outfit Enquiry', message: 'Hi! I need a wedding outfit rental.' },
  { label: '🏔️ Trekking Gear Enquiry', message: 'Hi! I need hiking/trekking gear rental.' },
  { label: '📦 Track My Rental', message: 'Hi! I want to track my rental order.' },
  { label: '💬 General Query', message: 'Hi! I have a question about RentTheVastra.' },
];

export default function WhatsAppFAB() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-80 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-neutral-200/80 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-5 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">RentTheVastra</h3>
                    <p className="text-[11px] text-emerald-100">Usually replies within 5 mins</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                👋 Hi there! How can we help you today?
              </p>
            </div>

            {/* Quick actions */}
            <div className="p-4 space-y-2">
              {QUICK_MESSAGES.map((item, i) => (
                <a
                  key={i}
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(item.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-emerald-50 border border-neutral-100 hover:border-emerald-200 transition-all duration-200"
                >
                  <span className="text-xs font-medium text-neutral-700 group-hover:text-emerald-700">
                    {item.label}
                  </span>
                  <ArrowRight size={12} className="text-neutral-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 pb-4">
              <p className="text-[10px] text-neutral-400 text-center">
                Powered by WhatsApp · Available 10 AM – 8 PM IST
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_6px_24px_rgba(16,185,129,0.4)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.5)] transition-shadow duration-300 flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ping indicator */}
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 items-center justify-center text-[8px] font-bold text-white">1</span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
