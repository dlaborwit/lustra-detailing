import React from 'react';
import { cn } from "@/lib/utils";
import { Sun, Sunrise, Sunset, Moon } from "lucide-react";

const timeWindows = [
  { id: 'morning', label: 'Morning', time: '8AM - 11AM', icon: Sunrise },
  { id: 'midday', label: 'Midday', time: '11AM - 2PM', icon: Sun },
  { id: 'afternoon', label: 'Afternoon', time: '2PM - 5PM', icon: Sunset },
  { id: 'evening', label: 'Evening', time: '5PM - 8PM', icon: Moon }
];

export default function TimeSelector({ selected, onSelect, bookedSlots = [], selectedDate }) {
  const dateStr = selectedDate ? selectedDate.toISOString().split('T')[0] : null;
  
  const isSlotBooked = (timeWindowId) => {
    if (!dateStr) return false;
    return bookedSlots.some(slot => slot.date === dateStr && slot.time_window === timeWindowId);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {timeWindows.map((window) => {
        const booked = isSlotBooked(window.id);
        return (
          <button
            key={window.id}
            type="button"
            onClick={() => !booked && onSelect(window.id)}
            disabled={booked}
            className={cn(
              "p-4 border transition-all duration-300 text-left group",
              booked
                ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                : selected === window.id 
                  ? "border-black bg-black text-white" 
                  : "border-gray-200 hover:border-black"
            )}
          >
            <window.icon className={cn(
              "w-5 h-5 mb-2 transition-colors",
              booked 
                ? "text-gray-300"
                : selected === window.id ? "text-white" : "text-gray-400 group-hover:text-black"
            )} />
            <p className="font-medium text-sm tracking-wide">
              {window.label}
              {booked && <span className="ml-2 text-xs">(Booked)</span>}
            </p>
            <p className={cn(
              "text-xs mt-1",
              booked
                ? "text-gray-300"
                : selected === window.id ? "text-white/70" : "text-gray-400"
            )}>
              {window.time}
            </p>
          </button>
        );
      })}
    </div>
  );
}