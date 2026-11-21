'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { Info } from 'lucide-react';

interface AccessorySelectorProps {
  accessories: Product[];
  onSelectionChange: (selectedAccessories: Product[], totalDeposit: number) => void;
}

export default function AccessorySelector({ accessories, onSelectionChange }: AccessorySelectorProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  if (!accessories || accessories.length === 0) return null;

  const toggleAccessory = (accessory: Product) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(accessory.id)) {
      newSelected.delete(accessory.id);
    } else {
      newSelected.add(accessory.id);
    }
    
    setSelectedIds(newSelected);
    
    const selectedProducts = accessories.filter(a => newSelected.has(a.id));
    const totalDeposit = selectedProducts.reduce((sum, a) => sum + a.securityDeposit, 0);
    
    onSelectionChange(selectedProducts, totalDeposit);
  };

  const totalDeposit = accessories
    .filter(a => selectedIds.has(a.id))
    .reduce((sum, a) => sum + a.securityDeposit, 0);

  return (
    <div className="bg-beige-50 rounded-xl p-5 mt-8 border border-beige-200">
      <h3 className="font-serif text-xl text-maroon-700 font-semibold mb-2">
        Complete Your Look - Free Accessories
      </h3>
      
      <div className="flex items-start gap-2 mb-4 text-sm text-neutral-600 bg-blue-50/50 p-3 rounded-md">
        <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
        <p>
          Rent these matching accessories for <strong>FREE</strong> with your outfit! 
          You only pay the fully refundable security deposit.
        </p>
      </div>

      <div className="space-y-3">
        {accessories.map((accessory) => (
          <label 
            key={accessory.id}
            className={`flex items-center gap-4 p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedIds.has(accessory.id) 
                ? 'border-maroon-700 bg-white shadow-sm' 
                : 'border-beige-200 hover:border-beige-300 bg-white/50'
            }`}
          >
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-beige-300 text-maroon-700 focus:ring-maroon-700"
              checked={selectedIds.has(accessory.id)}
              onChange={() => toggleAccessory(accessory)}
            />
            
            <div className="w-12 h-12 bg-beige-100 rounded-md overflow-hidden flex-shrink-0">
              <img 
                src={accessory.images[0] || '/images/placeholder.jpg'} 
                alt={accessory.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="font-medium text-neutral-900 line-clamp-1">{accessory.title}</div>
              <div className="text-sm text-neutral-500">Rental: <span className="line-through">₹{accessory.rentalPrice3Day}</span> <span className="text-green-600 font-medium">Free</span></div>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-neutral-900">+ ₹{accessory.securityDeposit.toLocaleString('en-IN')}</div>
              <div className="text-xs text-neutral-500">Deposit</div>
            </div>
          </label>
        ))}
      </div>

      {selectedIds.size > 0 && (
        <div className="mt-4 pt-4 border-t border-beige-200 flex justify-between items-center">
          <span className="font-medium text-neutral-900">Total Accessory Deposit:</span>
          <span className="font-semibold text-lg text-maroon-700">₹{totalDeposit.toLocaleString('en-IN')}</span>
        </div>
      )}
    </div>
  );
}
