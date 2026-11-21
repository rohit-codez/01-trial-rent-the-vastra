'use client';

import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday, 
  isBefore, 
  startOfDay,
  isWithinInterval
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

interface CalendarProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  disabledDates?: Date[];
  className?: string;
}

export function Calendar({ value, onChange, disabledDates = [], className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(value?.from || new Date()));
  const today = startOfDay(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const isDateDisabled = (date: Date) => {
    if (isBefore(startOfDay(date), today)) return true;
    return disabledDates.some(disabledDate => isSameDay(date, disabledDate));
  };

  const handleDateClick = (date: Date) => {
    if (isDateDisabled(date)) return;
    
    if (!onChange) return;

    if (!value?.from || (value.from && value.to) || isBefore(date, value.from)) {
      onChange({ from: date, to: undefined });
    } else {
      onChange({ from: value.from, to: date });
    }
  };

  const isSelected = (date: Date) => {
    if (value?.from && isSameDay(date, value.from)) return true;
    if (value?.to && isSameDay(date, value.to)) return true;
    return false;
  };

  const isInRange = (date: Date) => {
    if (value?.from && value?.to) {
      return isWithinInterval(date, { start: value.from, end: value.to });
    }
    return false;
  };

  return (
    <div className={cn("p-4 bg-white rounded-xl border border-beige-200 shadow-sm w-[320px]", className)}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="font-serif font-semibold text-maroon-700">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400"
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-neutral-500 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: currentMonth.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="p-2" />
        ))}
        
        {days.map(date => {
          const disabled = isDateDisabled(date);
          const selected = isSelected(date);
          const inRange = isInRange(date);
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              disabled={disabled}
              className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400",
                disabled && "text-neutral-300 cursor-not-allowed",
                !disabled && !selected && !inRange && "hover:bg-maroon-50 text-neutral-700",
                selected && "bg-maroon-700 text-white font-medium shadow-sm",
                inRange && !selected && "bg-maroon-50 text-maroon-700 rounded-none",
                isToday(date) && !selected && "border border-maroon-200"
              )}
            >
              {format(date, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
