'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export default function SizeGuide({ isOpen, onClose, category }: SizeGuideProps) {
  const [activeTab, setActiveTab] = useState<'in' | 'cm'>('in');

  // Dummy data for Indian ethnic wear
  const sizeChart = [
    { size: 'XS', bust: 32, waist: 26, hip: 34 },
    { size: 'S', bust: 34, waist: 28, hip: 36 },
    { size: 'M', bust: 36, waist: 30, hip: 38 },
    { size: 'L', bust: 38, waist: 32, hip: 40 },
    { size: 'XL', bust: 40, waist: 34, hip: 42 },
    { size: 'XXL', bust: 42, waist: 36, hip: 44 },
  ];

  const convert = (val: number) => activeTab === 'in' ? val : Math.round(val * 2.54);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-beige-200">
              <h2 className="text-2xl font-serif text-maroon-700 flex items-center gap-2">
                <Ruler className="w-6 h-6" />
                Size Guide
              </h2>
              <button 
                onClick={onClose}
                className="p-2 text-neutral-500 hover:text-maroon-700 hover:bg-beige-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-neutral-600 mb-6">
                Measurements are for {category.replace('-', ' ')}. If you are between sizes, we recommend choosing the larger size. All measurements are body measurements, not garment measurements.
              </p>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setActiveTab('in')}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                    activeTab === 'in' 
                      ? 'bg-maroon-700 text-white' 
                      : 'bg-beige-100 text-neutral-700 hover:bg-beige-200'
                  }`}
                >
                  Inches (in)
                </button>
                <button
                  onClick={() => setActiveTab('cm')}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                    activeTab === 'cm' 
                      ? 'bg-maroon-700 text-white' 
                      : 'bg-beige-100 text-neutral-700 hover:bg-beige-200'
                  }`}
                >
                  Centimeters (cm)
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-beige-50">
                      <th className="py-3 px-4 font-semibold text-maroon-700 border-b border-beige-200">Size</th>
                      <th className="py-3 px-4 font-semibold text-maroon-700 border-b border-beige-200">Bust</th>
                      <th className="py-3 px-4 font-semibold text-maroon-700 border-b border-beige-200">Waist</th>
                      <th className="py-3 px-4 font-semibold text-maroon-700 border-b border-beige-200">Hip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.map((row, idx) => (
                      <tr key={row.size} className={idx % 2 === 0 ? 'bg-white' : 'bg-beige-50/50'}>
                        <td className="py-3 px-4 font-medium text-neutral-900 border-b border-beige-100">{row.size}</td>
                        <td className="py-3 px-4 text-neutral-600 border-b border-beige-100">{convert(row.bust)}</td>
                        <td className="py-3 px-4 text-neutral-600 border-b border-beige-100">{convert(row.waist)}</td>
                        <td className="py-3 px-4 text-neutral-600 border-b border-beige-100">{convert(row.hip)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 bg-beige-50 p-4 rounded-lg border border-beige-200 text-sm text-neutral-600">
                <strong>Need custom fitting?</strong> Select 'Custom' size during checkout, and our stylists will contact you for detailed measurements.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
