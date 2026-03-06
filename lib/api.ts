import { Property } from '@/types/property';

// DELETE THESE LINES - they are causing the problem
// const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getProperties(): Promise<Property[]> {
  try {
    console.log('Fetching properties from API...');
    
    // USE RELATIVE URL - this is the fix
    const res = await fetch(`/api/properties`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Fetched properties:', data);
    return data;
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
}

export async function getProperty(id: string): Promise<Property | null> {
  try {
    console.log('Fetching property with ID:', id);
    
    // USE RELATIVE URL
    const res = await fetch(`/api/properties/${id}`, {
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
    console.log('Property data received:', data);
    return data;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}