'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyGrid from '@/components/PropertyGrid';
import PropertyFilters, { Filters } from '@/components/PropertyFilters';
import { getProperties } from '@/lib/api';
import type { Property } from '@/types/property';
import { Loader2 } from 'lucide-react';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    location: '',
  });

  // Fetch properties on mount
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const data = await getProperties();
        console.log('Fetched properties:', data);
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Get type from URL params
  const typeParam = searchParams.get('type');

  // Filter properties whenever filters or type changes
  useEffect(() => {
    if (!properties.length) return;

    let filtered = [...properties];

    // Apply type filter from URL if present
    if (typeParam) {
      switch(typeParam) {
        case 'sale':
          filtered = filtered.filter(p => p.type === 'sale');
          break;
        case 'rent':
          filtered = filtered.filter(p => p.type === 'rent');
          break;
        case 'bnb':
          filtered = filtered.filter(p => p.type === 'bnb');
          break;
        case 'office-sale':
          filtered = filtered.filter(p => p.type === 'office-sale');
          break;
        case 'office-rent':
          filtered = filtered.filter(p => p.type === 'office-rent');
          break;
        default:
          // If type is 'all' or anything else, show all
          break;
      }
    }

    // Apply price filters
    if (filters.minPrice && filters.minPrice.trim() !== '') {
      filtered = filtered.filter(p => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice && filters.maxPrice.trim() !== '') {
      filtered = filtered.filter(p => p.price <= Number(filters.maxPrice));
    }

    // Apply bedrooms filter - only for residential property types
    if (filters.bedrooms && filters.bedrooms.trim() !== '') {
      filtered = filtered.filter(p => {
        // Check if it's a residential property type (sale, rent, bnb)
        const isResidential = ['sale', 'rent', 'bnb'].includes(p.type);
        // Only apply bedroom filter to residential properties
        return isResidential ? p.bedrooms >= Number(filters.bedrooms) : true;
      });
    }

    // Apply bathrooms filter - only for residential property types
    if (filters.bathrooms && filters.bathrooms.trim() !== '') {
      filtered = filtered.filter(p => {
        // Check if it's a residential property type (sale, rent, bnb)
        const isResidential = ['sale', 'rent', 'bnb'].includes(p.type);
        // Only apply bathroom filter to residential properties
        return isResidential ? p.bathrooms >= Number(filters.bathrooms) : true;
      });
    }

    // Apply location filter
    if (filters.location && filters.location.trim() !== '') {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  }, [filters, typeParam, properties]);

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      location: '',
    });
  }, []);

  const getPageTitle = () => {
    switch(typeParam) {
      case 'sale':
        return 'Properties for Sale';
      case 'rent':
        return 'Properties for Rent';
      case 'bnb':
        return 'BnB Accommodations';
      case 'office-sale':
        return 'Offices for Sale';
      case 'office-rent':
        return 'Offices for Rent';
      default:
        return 'All Properties';
    }
  };

  const getPageDescription = () => {
    switch(typeParam) {
      case 'sale':
        return 'Find your dream home or investment property';
      case 'rent':
        return 'Quality rental properties for every need';
      case 'bnb':
        return 'Comfortable short-term accommodations';
      case 'office-sale':
        return 'Prime office spaces for purchase';
      case 'office-rent':
        return 'Flexible office spaces for rent';
      default:
        return 'Browse our complete collection of properties';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-gold-500 animate-spin mb-4" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
      <p className="text-gray-600 mb-8">{getPageDescription()}</p>
      
      <PropertyFilters onFilterChange={handleFilterChange} />
      
      {filteredProperties.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
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
        <>
          <p className="mb-4 text-gray-600">
            Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
          </p>
          <PropertyGrid properties={filteredProperties} />
        </>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-gold-500 animate-spin mb-4" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}