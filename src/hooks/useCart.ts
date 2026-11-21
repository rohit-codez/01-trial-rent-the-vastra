import { useState, useEffect } from 'react';
import { Product } from '@/types';

export interface CartItem {
  id: string;
  product: Product;
  duration: number;
  accessories: string[];
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('rentTheVastra_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('rentTheVastra_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  const addItem = (product: Product, duration: number, accessories: string[] = []) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, duration, accessories } 
            : item
        );
      }
      return [...prev, { id: Math.random().toString(36).substring(7), product, duration, accessories }];
    });
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateDuration = (id: string, duration: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, duration } : item
    ));
  };

  const toggleAccessory = (itemId: string, accessoryId: string) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const has = item.accessories.includes(accessoryId);
        return {
          ...item,
          accessories: has 
            ? item.accessories.filter(a => a !== accessoryId)
            : [...item.accessories, accessoryId]
        };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  // Mock calculations
  const totalRental = cartItems.reduce((acc, item) => acc + (item.product.rentalPrice3Day), 0);
  const totalDeposit = cartItems.reduce((acc, item) => {
    const itemDeposit = item.product.securityDeposit || 0;
    const accessoryDeposit = item.accessories.length * 50; // Mock 50 rupees per accessory
    return acc + itemDeposit + accessoryDeposit;
  }, 0);
  const totalPayable = totalRental + totalDeposit;
  const itemCount = cartItems.length;

  return {
    cartItems,
    addItem,
    removeItem,
    updateDuration,
    toggleAccessory,
    clearCart,
    totalRental,
    totalDeposit,
    totalPayable,
    itemCount,
    isLoaded
  };
};
