'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getProperty } from '@/lib/api';
import { Property } from '@/types/property';
import { 
  Bed, Bath, Maximize2, MapPin, DollarSign, 
  Check, Phone, Mail, Calendar, Home, Building2, Hotel,
  ArrowLeft, Share2, Heart, Loader2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!params.id) return;
      
      setLoading(true);
      const data = await getProperty(params.id as string);
      setProperty(data);
      setLoading(false);
    };

    fetchProperty();
  }, [params.id]);

  const getTypeIcon = () => {
    if (!property) return null;
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
    if (!property) return '';
    switch (property.type) {
      case 'sale':
        return 'bg-green-100 text-green-800';
      case 'rent':
        return 'bg-blue-100 text-blue-800';
      case 'bnb':
        return 'bg-purple-100 text-purple-800';
    }
  };

  const getTypeBadgeColor = () => {
    if (!property) return '';
    switch (property.type) {
      case 'sale':
        return 'bg-green-500';
      case 'rent':
        return 'bg-blue-500';
      case 'bnb':
        return 'bg-purple-500';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-gold-500 animate-spin mb-4" />
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Property Not Found</h1>
          <p className="text-gray-600 mb-8">The property you are looking for does not exist or has been removed.</p>
          <Link
            href="/properties"
            className="inline-flex items-center bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg transition-all hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Browse All Properties
          </Link>
        </div>
      </div>
    );
  }

  // Use first image or placeholder
  const mainImage = property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=75';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <Link
        href="/properties"
        className="inline-flex items-center text-gray-600 hover:text-gold-600 mb-6 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Properties
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images and Details */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6 group">
            <div className="relative h-[500px] overflow-hidden">
              <Image
                src={mainImage}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              {/* Property Type Badge */}
              <div className="absolute top-6 left-6 flex space-x-3">
                <span className={`${getTypeBadgeColor()} text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2 shadow-lg`}>
                  {getTypeIcon()}
                  <span className="ml-1 capitalize">{property.type}</span>
                </span>
                {property.status === 'available' ? (
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Available
                  </span>
                ) : (
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {property.status}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex space-x-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 transition-all"
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${
                      isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
                <button className="bg-white/90 backdrop-blur p-3 rounded-full shadow-lg hover:scale-110 transition-all">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Price Tag */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur rounded-full px-6 py-3 shadow-lg">
                <div className="flex items-center text-gold-600 font-bold text-2xl">
                  <DollarSign className="w-6 h-6" />
                  <span>
                    {property.price.toLocaleString()}
                    {property.type === 'sale' ? '' : property.type === 'rent' ? '/mo' : '/night'}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {property.images && property.images.length > 1 && (
              <div className="p-4 flex gap-2 overflow-x-auto">
                {property.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                      activeImage === index ? 'ring-2 ring-gold-500 scale-105' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${property.title} - ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{property.title}</h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="w-5 h-5 mr-2 text-gold-500" />
              <span>{property.location}</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Bed className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-800">{property.bedrooms}</div>
                <div className="text-sm text-gray-500">Bedrooms</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Bath className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-800">{property.bathrooms}</div>
                <div className="text-sm text-gray-500">Bathrooms</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Maximize2 className="w-6 h-6 text-gold-500 mx-auto mb-2" />
                <div className="font-semibold text-gray-800">{property.area}</div>
                <div className="text-sm text-gray-500">m² Area</div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Description</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Key Features</h2>
              <div className="grid grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <Check className="w-4 h-4 text-gold-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact and Booking */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-gold-600 mb-1">
                ${property.price.toLocaleString()}
                <span className="text-base font-normal text-gray-500 ml-1">
                  {property.type === 'sale' ? '' : property.type === 'rent' ? '/month' : '/night'}
                </span>
              </div>
              <p className="text-sm text-gray-500">+ fees and taxes</p>
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="font-semibold mb-4 text-gray-800">Contact Agent</h3>
              <div className="space-y-3">
                <button className="w-full bg-gold-500 hover:bg-gold-600 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </button>
                <button className="w-full border-2 border-gold-500 text-gold-600 hover:bg-gold-50 py-3 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Agent</span>
                </button>
              </div>
            </div>

            {property.type === 'bnb' && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold mb-4 text-gray-800">Book This Stay</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Check-in</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Check-out</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Guests</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4+ Guests</option>
                    </select>
                  </div>
                  <button className="w-full bg-gold-500 hover:bg-gold-600 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105 flex items-center justify-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Check Availability</span>
                  </button>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="text-xs text-gray-400 text-center">
                Property ID: {property._id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}