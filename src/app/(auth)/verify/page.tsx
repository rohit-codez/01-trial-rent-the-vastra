'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const router = useRouter();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    // Mock verification
    router.push('/dashboard');
  };

  return (
    <div className="w-full p-8 md:p-12 flex flex-col items-center justify-center bg-beige-50 min-h-[400px]">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-serif text-maroon-700 font-bold tracking-tight mb-2">RentTheVastra</h1>
        <h2 className="text-xl text-neutral-900 font-medium">Verify Your Email</h2>
        <p className="text-neutral-500 mt-2 text-sm max-w-sm">We've sent a 6-digit code to your email. Please enter it below to verify your account.</p>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-12 h-14 text-center text-xl font-bold border border-beige-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500 outline-none bg-white"
            maxLength={1}
          />
        ))}
      </div>

      <button onClick={handleVerify} className="w-full max-w-sm bg-maroon-700 text-white py-3 rounded-lg font-medium hover:bg-maroon-600 transition-colors shadow-sm mb-4">
        Verify
      </button>

      <div className="text-sm text-neutral-600 text-center">
        {countdown > 0 ? (
          <p>Resend OTP in <span className="font-medium text-maroon-700">{countdown}s</span></p>
        ) : (
          <button className="font-medium text-maroon-700 hover:underline">Resend OTP Now</button>
        )}
      </div>
    </div>
  );
}
