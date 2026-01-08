import React from 'react';
import { cn } from "@/lib/utils";

const vehicles = [
  { id: 'sedan', label: 'Sedan' },
  { id: 'suv', label: 'SUV' },
  { id: 'truck', label: 'Truck' },
  { id: 'sports', label: 'Sports Car' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'van', label: 'Van' },
  { id: 'other', label: 'Other' }
];

export default function VehicleSelector({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-3">
      {vehicles.map((vehicle) => (
        <button
          key={vehicle.id}
          type="button"
          onClick={() => onSelect(vehicle.id)}
          className={cn(
            "px-5 py-2.5 text-sm tracking-wide border transition-all duration-300",
            selected === vehicle.id 
              ? "border-black bg-black text-white" 
              : "border-gray-200 text-gray-600 hover:border-black hover:text-black"
          )}
        >
          {vehicle.label}
        </button>
      ))}
    </div>
  );
}