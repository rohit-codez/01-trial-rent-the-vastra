import React from 'react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

export const CartSummary = () => {
  const { cartItems, removeItem, totalRental, totalDeposit, totalPayable } = useCart();

  if (cartItems.length === 0) {
    return <div className="p-4 bg-beige-50 rounded-lg text-neutral-500">Your cart is empty.</div>;
  }

  return (
    <div className="bg-beige-50 p-6 rounded-xl border border-beige-200">
      <h3 className="font-serif text-xl text-maroon-700 mb-4">Cart Summary</h3>
      
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-start border-b border-beige-200 pb-4">
            <div className="flex gap-3">
              <div className="w-16 h-16 bg-neutral-200 rounded overflow-hidden">
                {item.product.images?.[0] && (
                  <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-neutral-900">{item.product.title}</h4>
                <p className="text-sm text-neutral-500">Duration: {item.duration} days</p>
                {item.accessories.length > 0 && (
                  <p className="text-xs text-gold-600">+{item.accessories.length} accessories</p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="font-medium">{formatPrice(item.product.rentalPrice3Day)}</span>
              <button onClick={() => removeItem(item.id)} className="text-maroon-600 hover:text-maroon-700">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm text-neutral-600">
        <div className="flex justify-between">
          <span>Total Rental</span>
          <span>{formatPrice(totalRental)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Security Deposit (Refundable)</span>
          <span>{formatPrice(totalDeposit)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-maroon-700 pt-4 border-t border-beige-200">
          <span>Total Payable</span>
          <span>{formatPrice(totalPayable)}</span>
        </div>
      </div>
    </div>
  );
};
