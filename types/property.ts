export interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  type: 'sale' | 'rent' | 'bnb';
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  features: string[];
  images: string[];
  status: 'available' | 'sold' | 'rented';
  createdAt?: string;
  updatedAt?: string;
}