export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'sale' | 'rent' | 'bnb';
  bedrooms: number;
  bathrooms: number;
  area: number; // in square meters
  location: string;
  features: string[];
  images: string[];
  status: 'available' | 'sold' | 'rented';
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Villa in Area 43',
    description: 'Stunning 4-bedroom villa with modern finishes, swimming pool, and beautiful garden. Perfect for families seeking luxury living in Lilongwe.',
    price: 450000,
    type: 'sale',
    bedrooms: 4,
    bathrooms: 3,
    area: 350,
    location: 'Area 43, Lilongwe',
    features: ['Swimming Pool', 'Garden', 'Modern Kitchen', 'Air Conditioning', 'Security System'],
    images: ['/images/property1.jpg', '/images/property1-2.jpg'],
    status: 'available'
  },
  {
    id: '2',
    title: 'Modern Apartment in City Center',
    description: 'Contemporary 2-bedroom apartment in the heart of Lilongwe. Close to shopping malls, restaurants, and business districts.',
    price: 1200,
    type: 'rent',
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    location: 'City Center, Lilongwe',
    features: ['Furnished', 'Gym Access', 'Parking', '24/7 Security', 'Elevator'],
    images: ['/images/property2.jpg', '/images/property2-2.jpg'],
    status: 'available'
  },
  {
    id: '3',
    title: 'Cozy BnB in Area 47',
    description: 'Charming 3-bedroom BnB with traditional Malawian decor. Perfect for tourists and business travelers.',
    price: 85,
    type: 'bnb',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    location: 'Area 47, Lilongwe',
    features: ['Breakfast Included', 'WiFi', 'Airport Shuttle', 'Garden', 'Parking'],
    images: ['/images/property3.jpg', '/images/property3-2.jpg'],
    status: 'available'
  },
  {
    id: '4',
    title: 'Executive Suite in Area 10',
    description: 'Luxurious 1-bedroom suite in a quiet residential area. Ideal for executives and long-term stays.',
    price: 150,
    type: 'bnb',
    bedrooms: 1,
    bathrooms: 1,
    area: 75,
    location: 'Area 10, Lilongwe',
    features: ['Smart TV', 'Work Desk', 'Kitchenette', 'Laundry Service', 'Gym'],
    images: ['/images/property4.jpg', '/images/property4-2.jpg'],
    status: 'available'
  },
  {
    id: '5',
    title: 'Family Home in Area 25',
    description: 'Spacious 5-bedroom house with large yard, perfect for families. Close to international schools.',
    price: 2800,
    type: 'rent',
    bedrooms: 5,
    bathrooms: 4,
    area: 400,
    location: 'Area 25, Lilongwe',
    features: ['Garden', 'Play Area', 'Staff Quarters', 'Borehole', 'Solar System'],
    images: ['/images/property5.jpg', '/images/property5-2.jpg'],
    status: 'available'
  },
  {
    id: '6',
    title: 'Commercial Plot in Area 3',
    description: 'Prime commercial land in bustling Area 3. Perfect for retail or office development.',
    price: 250000,
    type: 'sale',
    bedrooms: 0,
    bathrooms: 0,
    area: 800,
    location: 'Area 3, Lilongwe',
    features: ['Corner Plot', 'Road Access', 'Utilities Available', 'Zoned Commercial'],
    images: ['/images/property6.jpg', '/images/property6-2.jpg'],
    status: 'available'
  }
];