import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'image' | 'card' | 'circle';
}

export function Skeleton({ className, variant = 'text', ...props }: SkeletonProps) {
  const baseClasses = "animate-pulse bg-neutral-200";
  
  const variants = {
    text: "h-4 w-full rounded",
    image: "w-full aspect-[3/4] rounded-xl",
    card: "w-full h-48 rounded-xl",
    circle: "w-12 h-12 rounded-full"
  };

  return (
    <div
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    />
  );
}
