import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export default function BookingCalendar({ selected, onSelect, bookedSlots = [] }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if a date has all time slots booked
  const isFullyBooked = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const slotsForDate = bookedSlots.filter(slot => slot.date === dateStr);
    const allTimeWindows = ['morning', 'midday', 'afternoon', 'evening'];
    return allTimeWindows.every(window => 
      slotsForDate.some(slot => slot.time_window === window)
    );
  };

  return (
    <div className="flex justify-center">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={onSelect}
        disabled={(date) => date < today || isFullyBooked(date)}
        className="rounded-none border border-gray-200 p-4"
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium tracking-wide",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-7 w-7 bg-transparent p-0 hover:bg-gray-100 inline-flex items-center justify-center"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-gray-500 rounded-none w-9 font-normal text-[0.8rem] uppercase tracking-wider",
          row: "flex w-full mt-2",
          cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
          day: cn(
            "h-9 w-9 p-0 font-normal",
            "hover:bg-gray-100 focus:bg-gray-100",
            "inline-flex items-center justify-center"
          ),
          day_selected: "!bg-black !text-white hover:!bg-black hover:!text-white focus:!bg-black focus:!text-white !border-0",
          day_today: selected ? "" : "border border-black",
          day_outside: "text-gray-300",
          day_disabled: "text-gray-300 hover:bg-transparent cursor-not-allowed",
          day_hidden: "invisible",
        }}
      />
    </div>
  );
}