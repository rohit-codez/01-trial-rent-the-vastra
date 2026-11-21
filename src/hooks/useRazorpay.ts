import { useCallback } from 'react';

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: any) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
}

export const useRazorpay = () => {
  const loadScript = useCallback(() => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const openCheckout = useCallback(async (options: Partial<RazorpayOptions>) => {
    const res = await loadScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const defaultOptions = {
      name: 'RentTheVastra',
      description: 'Fashion Rental Checkout',
      theme: { color: '#5B0E2D' }, // maroon theme
    };

    const finalOptions = { ...defaultOptions, ...options };
    
    // @ts-ignore
    const rzp = new window.Razorpay(finalOptions);
    rzp.on('payment.failed', function (response: any) {
      console.error(response.error);
      alert('Payment Failed');
    });
    rzp.open();
  }, [loadScript]);

  return { openCheckout };
};
