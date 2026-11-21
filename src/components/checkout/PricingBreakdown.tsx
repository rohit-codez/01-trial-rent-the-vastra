import React from 'react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';

export const PricingBreakdown = () => {
  const { cartItems, totalRental, totalDeposit, totalPayable } = useCart();

  return (
    <div className="bg-white p-6 rounded-xl border border-beige-200 shadow-sm font-mono text-sm">
      <h3 className="font-serif text-lg text-maroon-700 mb-4 border-b pb-2">Pricing Breakdown</h3>
      
      <div className="space-y-2 mb-4">
        {cartItems.map(item => (
          <div key={`rental-${item.id}`} className="flex justify-between text-neutral-700">
            <span>Outfit Rental ({item.product.title} x {item.duration} days):</span>
            <span>{formatPrice(item.product.rentalPrice3Day)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-neutral-900 border-t pt-2 mt-2">
          <span>Rental Charges:</span>
          <span>{formatPrice(totalRental)}</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="text-neutral-600 font-medium">Accessories Security Deposit:</div>
        {cartItems.map(item => (
          item.accessories.map((acc, idx) => (
            <div key={`acc-${item.id}-${idx}`} className="flex justify-between text-neutral-500 pl-4">
              <span>Accessory {idx + 1}:</span>
              <span>₹50 (Refundable)</span>
            </div>
          ))
        ))}
        <div className="flex justify-between font-bold text-neutral-900 border-t pt-2 mt-2">
          <span>Security Deposit:</span>
          <span>{formatPrice(totalDeposit)} <span className="text-xs font-normal text-green-600">(Fully Refundable)</span></span>
        </div>
      </div>

      <div className="flex justify-between text-neutral-700 mb-4">
        <span>Delivery Fee:</span>
        <span className="text-green-600 font-bold">FREE</span>
      </div>

      <div className="flex justify-between font-bold text-lg text-maroon-700 border-t border-maroon-200 pt-4 bg-maroon-50 p-2 rounded">
        <span>Total Payable:</span>
        <span>{formatPrice(totalPayable)}</span>
      </div>
    </div>
  );
};
