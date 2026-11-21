'use client';

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  label?: string;
  formatValue?: (value: number) => string;
  className?: string;
}

export function Slider({
  min,
  max,
  value,
  onChange,
  step = 1,
  label,
  formatValue = (v) => v.toString(),
  className
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  const handleMove = (clientX: number) => {
    if (trackRef.current) {
      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = x / rect.width;
      const rawValue = min + percentage * (max - min);
      
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));
      
      if (clampedValue !== value) {
        onChange(clampedValue);
      }
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className={cn("w-full select-none touch-none", className)}>
      <div className="flex justify-between items-center mb-4">
        {label && <label className="text-sm font-medium text-neutral-700">{label}</label>}
        <span className="text-sm font-semibold text-maroon-700 bg-maroon-50 px-2 py-1 rounded">
          {formatValue(value)}
        </span>
      </div>
      
      <div 
        className="relative h-6 flex items-center cursor-pointer group"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div ref={trackRef} className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-maroon-700 transition-all duration-75 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div 
          className={cn(
            "absolute w-5 h-5 bg-white border-2 border-maroon-700 rounded-full -ml-2.5 shadow-sm transition-transform duration-75 ease-out group-hover:scale-110",
            isDragging && "scale-110 border-gold-400"
          )}
          style={{ left: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center mt-2 text-xs text-neutral-500">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}
