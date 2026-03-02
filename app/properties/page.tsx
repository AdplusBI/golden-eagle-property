'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyGrid from '@/components/PropertyGrid';
import PropertyFilters from '@/components/PropertyFilters';
import { properties, Property } from '@/data/properties';

interface Filters {
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  location: string;
}

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
  });
  
  // Derive filtered properties from source data
  const getFilteredProperties = (): Property[] => {
    const typeParam = searchParams.get('type');
    let filtered = [...properties];

    // Apply type filter from URL if present
    if (typeParam) {
      filtered = filtered.filter(p => p.type === typeParam);
    }

    // Apply price filters
    if (filters.minPrice && filters.minPrice.trim() !== '') {
      filtered = filtered.filter(p => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice && filters.maxPrice.trim() !== '') {
      filtered = filtered.filter(p => p.price <= Number(filters.maxPrice));
    }

    // Apply bedrooms filter
    if (filters.bedrooms && filters.bedrooms.trim() !== '') {
      filtered = filtered.filter(p => p.bedrooms >= Number(filters.bedrooms));
    }

    // Apply bathrooms filter
    if (filters.bathrooms && filters.bathrooms.trim() !== '') {
      filtered = filtered.filter(p => p.bathrooms >= Number(filters.bathrooms));
    }

    // Apply location filter
    if (filters.location && filters.location.trim() !== '') {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredProperties = getFilteredProperties();

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      location: '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">
        Properties in <span className="text-gold-500">Lilongwe</span>
      </h1>
      <p className="text-gray-600 mb-8">
        Find your perfect property from our extensive collection
      </p>
      
      <PropertyFilters onFilterChange={handleFilterChange} />
      
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Properties Found</h3>
          <p className="text-gray-500">Try adjusting your filters or check back later.</p>
          <button
            onClick={handleClearFilters}
            className="mt-4 text-gold-600 hover:text-gold-700 font-semibold"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <PropertyGrid properties={filteredProperties} />
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold-500 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        </div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}