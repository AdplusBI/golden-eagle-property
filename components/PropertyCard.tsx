"use client";

import { Property } from '@/data/properties';
import { Bed, Bath, Maximize2, MapPin, DollarSign, Home, Hotel, Building2, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
}

// Optimized placeholder images
const placeholderImages = [
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75',
    blur: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=20',
    alt: 'Luxury home exterior'
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75',
    blur: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=20',
    alt: 'Modern living room'
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75',
    blur: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=20',
    alt: 'Luxury bedroom'
  },
];

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getTypeIcon = () => {
    switch (property.type) {
      case 'sale':
        return <Home className="w-4 h-4" />;
      case 'rent':
        return <Building2 className="w-4 h-4" />;
      case 'bnb':
        return <Hotel className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (property.type) {
      case 'sale':
        return 'bg-green-500';
      case 'rent':
        return 'bg-blue-500';
      case 'bnb':
        return 'bg-purple-500';
    }
  };

  const getTypeBg = () => {
    switch (property.type) {
      case 'sale':
        return 'bg-green-50 text-green-700';
      case 'rent':
        return 'bg-blue-50 text-blue-700';
      case 'bnb':
        return 'bg-purple-50 text-purple-700';
    }
  };

  const imageIndex = parseInt(property.id) % placeholderImages.length;
  const image = imageError ? placeholderImages[0] : placeholderImages[imageIndex];

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-gold-100">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            onError={() => setImageError(true)}
            loading="lazy"
            quality={75}
            placeholder="blur"
            blurDataURL={image.blur}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Property Type Badge */}
          <div className="absolute top-4 left-4 flex space-x-2">
            <span className={`${getTypeBg()} px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-md`}>
              {getTypeIcon()}
              <span className="ml-1 capitalize">{property.type}</span>
            </span>
            {property.status === 'available' && (
              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                Available
              </span>
            )}
          </div>

          {/* Like Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsLiked(!isLiked);
            }}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>

          {/* Price Tag */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-full px-4 py-2 shadow-md">
            <div className="flex items-center text-gold-600 font-bold">
              <DollarSign className="w-4 h-4" />
              <span className="text-lg">
                {property.price.toLocaleString()}
                {property.type === 'sale' ? '' : property.type === 'rent' ? '/mo' : '/night'}
              </span>
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
              <Bed className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">{property.bedrooms}</span>
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
              <Bath className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">{property.bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
              <Maximize2 className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">{property.area} m²</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {property.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-gold-50 text-gold-700 px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{property.features.length - 3}
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