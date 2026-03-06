import { Property } from '@/types/property';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${API_BASE}/api/properties`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Fetched properties:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export async function getProperty(id: string): Promise<Property | null> {
  try {
    console.log('Fetching property with ID:', id); // Debug log
    
    const res = await fetch(`${API_BASE}/api/properties/${id}`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        console.log('Property not found with ID:', id);
        return null;
      }
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Property data received:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}