'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { properties } from '@/data/properties';
import { 
  Bed, Bath, Maximize2, MapPin, DollarSign, 
  Check, Phone, Mail, Calendar, Home, Building2, Hotel,
  ArrowLeft, Share2, Heart
} from 'lucide-react';
import Link from 'next/link';

export default function PropertyDetailPage() {
  const params = useParams();
  const [activeImage, setActiveImage] = useState(0);
  
  const property = properties.find(p => p.id === params.id);

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
        <p className="text-gray-600 mb-8">The property you are looking for does not exist.</p>
        <Link
          href="/properties"
          className="inline-flex items-center bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Properties
        </Link>
      </div>
    );
  }

  const getTypeIcon = () => {
    switch (property.type) {
      case 'sale':
        return <Home className="w-5 h-5" />;
      case 'rent':
        return <Building2 className="w-5 h-5" />;
      case 'bnb':
        return <Hotel className="w-5 h-5" />;
    }
  };

  const getTypeColor = () => {
    switch (property.type) {
      case 'sale':
        return 'bg-green-100 text-green-800';
      case 'rent':
        return 'bg-blue-100 text-blue-800';
      case 'bnb':
        return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <Link
        href="/properties"
        className="inline-flex items-center text-gray-600 hover:text-gold-600 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Properties
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images and Details */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="relative h-96 bg-gray-200">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-white text-6xl font-bold opacity-50">
                  {property.title[0]}
                </span>
              </div>
              
              {/* Property Type Badge */}
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 ${getTypeColor()}`}>
                  {getTypeIcon()}
                  <span className="ml-1 capitalize">{property.type}</span>
                </span>
                {property.status === 'available' ? (
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Available
                  </span>
                ) : (
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {property.status}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{property.location}</span>
            </div>

            <div className="flex items-center justify-between mb-6 text-gray-600 border-y border-gray-200 py-4">
              <div className="flex items-center space-x-2">
                <Bed className="w-5 h-5" />
                <span>{property.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bath className="w-5 h-5" />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center space-x-2">
                <Maximize2 className="w-5 h-5" />
                <span>{property.area} m²</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Key Features</h2>
              <div className="grid grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <Check className="w-4 h-4 text-gold-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact and Booking */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-gold-600 font-bold text-3xl">
                <DollarSign className="w-8 h-8" />
                <span>
                  {property.price.toLocaleString()}
                  {property.type === 'sale' ? '' : property.type === 'rent' ? '/month' : '/night'}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-4">
              <h3 className="font-semibold mb-3">Contact Agent</h3>
              <div className="space-y-3">
                <button className="w-full bg-gold-500 hover:bg-gold-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </button>
                <button className="w-full border border-gold-500 text-gold-600 hover:bg-gold-50 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Agent</span>
                </button>
              </div>
            </div>

            {property.type === 'bnb' && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold mb-3">Book This Stay</h3>
                <div className="space-y-3">
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                    placeholder="Check-in"
                  />
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                    placeholder="Check-out"
                  />
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4+ Guests</option>
                  </select>
                  <button className="w-full bg-gold-500 hover:bg-gold-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Check Availability</span>
                  </button>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-sm text-gray-500 text-center">
                Property ID: {property.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}