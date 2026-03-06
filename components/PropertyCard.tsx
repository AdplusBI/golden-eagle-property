'use client';

import { Property } from '@/types/property';
import { Bed, Bath, Maximize2, MapPin, Home, Hotel, Building2, Heart, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';

interface PropertyCardProps {
  property: Property;
}

const placeholderImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75',
];

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Store previous property ID to detect changes during render
  const [prevPropertyId, setPrevPropertyId] = useState(property._id);

  // Reset image error during render if property changed
  if (prevPropertyId !== property._id) {
    setPrevPropertyId(property._id);
    setImageError(false);
  }

  // Calculate image URL during rendering
  const imageUrl = useMemo(() => {
    if (imageError) {
      const index = parseInt(property._id.slice(-2), 16) % placeholderImages.length;
      return placeholderImages[index];
    }
    
    if (property.images && property.images.length > 0) {
      return property.images[0];
    }
    
    const index = parseInt(property._id.slice(-2), 16) % placeholderImages.length;
    return placeholderImages[index];
  }, [property._id, property.images, imageError]);

  const handleImageError = () => {
    console.log('Image failed to load:', imageUrl);
    setImageError(true);
  };

  const getTypeIcon = () => {
    switch (property.type) {
      case 'sale': return <Home className="w-4 h-4" />;
      case 'rent': return <Building2 className="w-4 h-4" />;
      case 'bnb': return <Hotel className="w-4 h-4" />;
      case 'office-sale':
      case 'office-rent': return <Briefcase className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  const getTypeLabel = () => {
    switch (property.type) {
      case 'sale': return 'For Sale';
      case 'rent': return 'For Rent';
      case 'bnb': return 'BnB';
      case 'office-sale': return 'Office for Sale';
      case 'office-rent': return 'Office for Rent';
      default: return property.type;
    }
  };

  const getTypeBg = () => {
    switch (property.type) {
      case 'sale': return 'bg-green-50 text-green-700';
      case 'rent': return 'bg-blue-50 text-blue-700';
      case 'bnb': return 'bg-purple-50 text-purple-700';
      case 'office-sale': return 'bg-orange-50 text-orange-700';
      case 'office-rent': return 'bg-indigo-50 text-indigo-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getPriceSuffix = () => {
    switch (property.type) {
      case 'sale':
      case 'office-sale': return '';
      case 'rent':
      case 'office-rent': return '/mo';
      case 'bnb': return '/night';
      default: return '';
    }
  };

  return (
    <Link href={`/properties/${property._id}`}>
      <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gold-100">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            onError={handleImageError}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={imageUrl.startsWith('/api/')}
          />
          
          <div className="absolute top-4 left-4 flex space-x-2 z-10">
            <span className={`${getTypeBg()} px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-md backdrop-blur-sm bg-opacity-90`}>
              {getTypeIcon()}
              <span className="ml-1 capitalize">{getTypeLabel()}</span>
            </span>
            {property.status === 'available' && (
              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                Available
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md z-10"
          >
            <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>

          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-md z-10">
            <div className="flex items-center text-gold-600 font-bold">
              <span className="text-sm mr-1">MWK</span>
              <span className="text-lg">{property.price.toLocaleString()}{getPriceSuffix()}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-gold-600 transition-colors line-clamp-1">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0 text-gold-400" />
            <span className="text-sm line-clamp-1">{property.location}</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
              {property.type === 'office-sale' || property.type === 'office-rent' ? (
                <>
                  <Briefcase className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Office</span>
                </>
              ) : (
                <>
                  <Bed className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
              <Bath className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
              <Maximize2 className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">{property.area} m²</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {property.features?.slice(0, 3).map((feature, index) => (
              <span key={index} className="text-xs bg-gold-50 text-gold-700 px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
            {property.features && property.features.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{property.features.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-gold-600 font-semibold group-hover:translate-x-2 transition-transform">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}