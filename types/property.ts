export type PropertyType = 'sale' | 'rent' | 'bnb' | 'office-sale' | 'office-rent';
export type PropertyCategory = 'residential' | 'commercial';
export type PropertyStatus = 'available' | 'sold' | 'rented';

export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  category: PropertyCategory;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  features: string[];
  images: string[];
  status: PropertyStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface PropertyFormData {
  title: string;
  description: string;
  price: string;
  type: PropertyType;
  category: PropertyCategory;
  bedrooms: string;
  bathrooms: string;
  area: string;
  location: string;
  status: PropertyStatus;
  features: string[];
  images: string[];
}