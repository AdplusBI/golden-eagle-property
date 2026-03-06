'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

// Define types locally to avoid import issues
type PropertyCategory = 'residential' | 'commercial';
type PropertyType = 'sale' | 'rent' | 'bnb' | 'office-sale' | 'office-rent';
type PropertyStatus = 'available' | 'sold' | 'rented';

export default function NewProperty() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    propertyCategory: 'residential' as PropertyCategory,
    type: 'sale' as PropertyType,
    bedrooms: '',
    bathrooms: '',
    area: '',
    location: '',
    status: 'available' as PropertyStatus,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'propertyCategory') {
      // Reset type when category changes
      let newType: PropertyType;
      if (value === 'residential') {
        newType = 'sale';
      } else {
        newType = 'office-sale';
      }
      
      setFormData(prev => ({ 
        ...prev, 
        [name]: value as PropertyCategory,
        type: newType,
        // Ensure bedrooms has a default value for commercial
        bedrooms: value === 'commercial' ? '1' : prev.bedrooms
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.description) {
        alert('Please fill in title and description');
        setLoading(false);
        return;
      }

      if (!formData.bedrooms) {
        alert('Please enter the number of bedrooms or office spaces');
        setLoading(false);
        return;
      }

      if (!formData.price || !formData.area || !formData.location) {
        alert('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // If no images uploaded, use a default placeholder
      const finalImages = images.length > 0 ? images : ['/placeholder-house.jpg'];
      
      // Prepare the data for API
      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        type: formData.type,
        propertyCategory: formData.propertyCategory,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        location: formData.location,
        status: formData.status,
        features: features,
        images: finalImages,
      };

      console.log('Submitting property data:', propertyData);

      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propertyData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        alert(data.error || 'Failed to create property');
        console.error('Error response:', data);
      }
    } catch (error) {
      console.error('Error creating property:', error);
      alert('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Get available types based on selected category
  const getTypeOptions = () => {
    if (formData.propertyCategory === 'residential') {
      return [
        { value: 'sale', label: 'For Sale' },
        { value: 'rent', label: 'For Rent' },
        { value: 'bnb', label: 'BnB' },
      ];
    } else {
      return [
        { value: 'office-sale', label: 'Office for Sale' },
        { value: 'office-rent', label: 'Office for Rent' },
      ];
    }
  };

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
            <h1 className="text-2xl font-bold text-gold-600">Add New Property</h1>
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
                placeholder="e.g., Modern Luxury Villa in Karen"
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

            {/* Property Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Category *</label>
              <select
                name="propertyCategory"
                value={formData.propertyCategory}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                {getTypeOptions().map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (MWK) * {formData.type === 'bnb' ? '(per night)' : formData.type.includes('rent') ? '(per month)' : ''}
              </label>
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

            {/* Bedrooms/Office Spaces */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.propertyCategory === 'residential' ? 'Bedrooms *' : 'Office Spaces/Units *'}
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder={formData.propertyCategory === 'residential' ? 'Number of bedrooms' : 'Number of office spaces'}
              />
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms *</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                min="0"
                step="0.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="Number of bathrooms"
              />
            </div>

            {/* Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area (m²) *</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                placeholder="Total area in square meters"
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
                  placeholder={formData.propertyCategory === 'residential' 
                    ? "Add a feature (e.g., Swimming Pool, Garden, Parking)" 
                    : "Add a feature (e.g., Meeting Rooms, Reception, Elevator)"}
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
              disabled={loading}
              className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? 'Saving...' : 'Save Property'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}