'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

// Define types based on your schema
type PropertyType = 'sale' | 'rent' | 'bnb' | 'office-sale' | 'office-rent';
type PropertyCategory = 'residential' | 'commercial';
type PropertyStatus = 'available' | 'sold' | 'rented';

// Define property sub-types for UI organization
type SaleSubType = 'home' | 'land' | 'warehouse' | 'commercial';
type RentSubType = 'home' | 'office' | 'warehouse' | 'shop';

export default function EditProperty() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [images, setImages] = useState<string[]>([]);
  
  // Main type selection (sale/rent/bnb)
  const [mainType, setMainType] = useState<'sale' | 'rent' | 'bnb'>('sale');
  
  // Sub-type selection based on main type
  const [saleSubType, setSaleSubType] = useState<SaleSubType>('home');
  const [rentSubType, setRentSubType] = useState<RentSubType>('home');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '1',
    bathrooms: '1',
    area: '',
    location: '',
    status: 'available' as PropertyStatus,
  });

  // Fetch property data on load
  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      console.log('Fetching property with ID:', id);
      const res = await fetch(`/api/properties/${id}`);
      
      if (!res.ok) {
        if (res.status === 404) {
          alert('Property not found');
          router.push('/admin/dashboard');
          return;
        }
        throw new Error('Failed to fetch property');
      }
      
      const property = await res.json();
      console.log('Property data received:', property);
      
      // Set form data
      setFormData({
        title: property.title || '',
        description: property.description || '',
        price: property.price?.toString() || '',
        bedrooms: property.bedrooms?.toString() || '1',
        bathrooms: property.bathrooms?.toString() || '1',
        area: property.area?.toString() || '',
        location: property.location || '',
        status: property.status || 'available',
      });

      // Set features and images
      setFeatures(property.features || []);
      setImages(property.images || []);

      // Determine main type and sub-type
      if (property.type === 'bnb') {
        setMainType('bnb');
      } else if (property.type === 'sale' || property.type === 'office-sale') {
        setMainType('sale');
        
        // Determine sale sub-type based on propertyCategory and other fields
        if (property.propertyCategory === 'residential') {
          // Check if it's land (you might want to add a better way to determine this)
          if (property.title.toLowerCase().includes('land') || property.area > 10000) {
            setSaleSubType('land');
          } else {
            setSaleSubType('home');
          }
        } else {
          // Commercial properties
          if (property.title.toLowerCase().includes('warehouse')) {
            setSaleSubType('warehouse');
          } else {
            setSaleSubType('commercial');
          }
        }
      } else if (property.type === 'rent' || property.type === 'office-rent') {
        setMainType('rent');
        
        // Determine rent sub-type
        if (property.propertyCategory === 'residential') {
          setRentSubType('home');
        } else {
          if (property.title.toLowerCase().includes('warehouse')) {
            setRentSubType('warehouse');
          } else if (property.title.toLowerCase().includes('shop')) {
            setRentSubType('shop');
          } else {
            setRentSubType('office');
          }
        }
      }
    } catch (error) {
      console.error('Error fetching property:', error);
      alert('Failed to load property');
      router.push('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  // Determine the actual property type based on selections
  const getPropertyType = (): PropertyType => {
    if (mainType === 'bnb') return 'bnb';
    
    if (mainType === 'sale') {
      switch (saleSubType) {
        case 'home':
          return 'sale';
        case 'land':
          return 'sale';
        case 'warehouse':
          return 'office-sale';
        case 'commercial':
          return 'office-sale';
        default:
          return 'sale';
      }
    } else { // rent
      switch (rentSubType) {
        case 'home':
          return 'rent';
        case 'office':
          return 'office-rent';
        case 'warehouse':
          return 'rent';
        case 'shop':
          return 'rent';
        default:
          return 'rent';
      }
    }
  };

  // Determine property category based on selections
  const getPropertyCategory = (): PropertyCategory => {
    if (mainType === 'bnb') return 'residential';
    
    if (mainType === 'sale') {
      return saleSubType === 'home' || saleSubType === 'land' ? 'residential' : 'commercial';
    } else { // rent
      return rentSubType === 'home' ? 'residential' : 'commercial';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.description) {
        alert('Please fill in title and description');
        setSaving(false);
        return;
      }

      if (!formData.price || !formData.area || !formData.location) {
        alert('Please fill in all required fields');
        setSaving(false);
        return;
      }

      // Prepare the data for API
      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        type: getPropertyType(),
        propertyCategory: getPropertyCategory(),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        location: formData.location,
        status: formData.status,
        features: features,
        images: images,
      };

      console.log('Updating property data:', propertyData);

      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propertyData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        alert(data.error || 'Failed to update property');
        console.error('Error response:', data);
      }
    } catch (error) {
      console.error('Error updating property:', error);
      alert('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  // Get label for bedrooms field based on selection
  const getBedroomsLabel = () => {
    if (mainType === 'bnb') return 'Bedrooms *';
    
    if (mainType === 'sale') {
      switch (saleSubType) {
        case 'home':
          return 'Bedrooms *';
        case 'land':
          return 'Plot Size (acres) *';
        case 'warehouse':
          return 'Storage Units/Spaces *';
        case 'commercial':
          return 'Office Spaces/Rooms *';
        default:
          return 'Bedrooms *';
      }
    } else { // rent
      switch (rentSubType) {
        case 'home':
          return 'Bedrooms *';
        case 'office':
          return 'Office Spaces/Rooms *';
        case 'warehouse':
          return 'Storage Units/Spaces *';
        case 'shop':
          return 'Shop Units *';
        default:
          return 'Bedrooms *';
      }
    }
  };

  // Get placeholder for bedrooms field
  const getBedroomsPlaceholder = () => {
    if (mainType === 'bnb') return 'Number of bedrooms';
    
    if (mainType === 'sale') {
      switch (saleSubType) {
        case 'home':
          return 'Number of bedrooms';
        case 'land':
          return 'Enter land size in acres';
        case 'warehouse':
          return 'Number of storage units/spaces';
        case 'commercial':
          return 'Number of office spaces/rooms';
        default:
          return 'Number of bedrooms';
      }
    } else { // rent
      switch (rentSubType) {
        case 'home':
          return 'Number of bedrooms';
        case 'office':
          return 'Number of office spaces/rooms';
        case 'warehouse':
          return 'Number of storage units/spaces';
        case 'shop':
          return 'Number of shop units';
        default:
          return 'Number of bedrooms';
      }
    }
  };

  // Get label for bathrooms field based on selection
  const getBathroomsLabel = () => {
    if (shouldHideBathrooms()) {
      return '';
    }
    
    if (mainType === 'sale' && saleSubType === 'land') {
      return '';
    }
    
    if (mainType === 'rent' && (rentSubType === 'warehouse' || rentSubType === 'shop')) {
      return 'Restrooms *';
    }
    
    return 'Bathrooms *';
  };

  // Check if bathrooms field should be hidden
  const shouldHideBathrooms = () => {
    if (mainType === 'sale' && saleSubType === 'land') return true;
    return false;
  };

  // Get placeholder for bathrooms field
  const getBathroomsPlaceholder = () => {
    if (mainType === 'rent' && (rentSubType === 'warehouse' || rentSubType === 'shop')) {
      return 'Number of restrooms';
    }
    return 'Number of bathrooms';
  };

  // Get price label
  const getPriceLabel = () => {
    if (mainType === 'bnb') return 'Price (per night) *';
    if (mainType === 'rent') return 'Price (per month) *';
    return 'Price *';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gold-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading property...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/dashboard"
              className="text-gray-600 hover:text-gold-600 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gold-600">Edit Property</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="e.g., Modern Luxury Villa in Area"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="Describe the property in detail..."
              />
            </div>

            {/* Image Uploader */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Images</label>
              <ImageUploader images={images} onChange={setImages} maxImages={10} />
            </div>

            {/* Main Type Selection */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-3">Property Type *</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setMainType('sale')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    mainType === 'sale'
                      ? 'bg-gold-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  For Sale
                </button>
                <button
                  type="button"
                  onClick={() => setMainType('rent')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    mainType === 'rent'
                      ? 'bg-gold-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  For Rent
                </button>
                <button
                  type="button"
                  onClick={() => setMainType('bnb')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    mainType === 'bnb'
                      ? 'bg-gold-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  BnB
                </button>
              </div>
            </div>

            {/* Sub-type Selection based on main type */}
            {mainType === 'sale' && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">Property Sub-type *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['home', 'land', 'warehouse', 'commercial'] as SaleSubType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSaleSubType(type)}
                      className={`py-2 px-3 rounded-lg font-medium transition-all ${
                        saleSubType === type
                          ? 'bg-gold-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type === 'home' && 'Home'}
                      {type === 'land' && 'Land'}
                      {type === 'warehouse' && 'Warehouse'}
                      {type === 'commercial' && 'Commercial/Office'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mainType === 'rent' && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">Property Sub-type *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['home', 'office', 'warehouse', 'shop'] as RentSubType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setRentSubType(type)}
                      className={`py-2 px-3 rounded-lg font-medium transition-all ${
                        rentSubType === type
                          ? 'bg-gold-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type === 'home' && 'Home'}
                      {type === 'office' && 'Office'}
                      {type === 'warehouse' && 'Warehouse'}
                      {type === 'shop' && 'Shop'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{getPriceLabel()}</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="Enter price in Malawi Kwacha"
              />
            </div>

            {/* Bedrooms/Units */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{getBedroomsLabel()}</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                min="0"
                step={saleSubType === 'land' ? '0.01' : '1'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder={getBedroomsPlaceholder()}
              />
            </div>

            {/* Bathrooms */}
            {!shouldHideBathrooms() && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{getBathroomsLabel()}</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder={getBathroomsPlaceholder()}
                />
              </div>
            )}

            {/* Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {saleSubType === 'land' ? 'Area (acres) *' : 'Area (m²) *'}
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                min="0"
                step={saleSubType === 'land' ? '0.01' : '1'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder={saleSubType === 'land' ? 'Enter area in acres' : 'Enter area in square meters'}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Area, City"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>

            {/* Features */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Features/Amenities</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature (e.g., Swimming Pool, Garden, Parking)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addFeature();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="bg-gold-500 hover:bg-gold-600 text-white px-4 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-gold-50 text-gold-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{saving ? 'Saving...' : 'Update Property'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}