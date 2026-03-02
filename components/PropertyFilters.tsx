"use client";


import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

// Define the filter shape
interface Filters {
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  location: string;
}

interface PropertyFiltersProps {
  onFilterChange: (filters: Filters) => void; // Replaced 'any' with proper type
}

export default function PropertyFilters({ onFilterChange }: PropertyFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<Filters>({ // Added type here
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters); // Now TypeScript knows this is a valid Filters object
  };

  const clearFilters = () => {
    const cleared = {
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      location: '',
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  // Rest of the component remains the same...
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      {/* ... JSX content ... */}
    </div>
  );
}