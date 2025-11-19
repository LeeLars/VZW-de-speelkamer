// API Service for cloud storage
// Update API_URL with your Hostinger domain after deployment

// For development, use localhost. For production, update this to your Hostinger domain
const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8000/api';

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
}

// Activities API
export const activitiesAPI = {
  getAll: () => apiCall('activities.php'),
  
  create: (activity: any) => apiCall('activities.php', {
    method: 'POST',
    body: JSON.stringify(activity),
  }),
  
  update: (activity: any) => apiCall('activities.php', {
    method: 'PUT',
    body: JSON.stringify(activity),
  }),
  
  delete: (id: string) => apiCall(`activities.php?id=${id}`, {
    method: 'DELETE',
  }),
};

// Team API
export const teamAPI = {
  getAll: () => apiCall('team.php'),
  
  create: (member: any) => apiCall('team.php', {
    method: 'POST',
    body: JSON.stringify(member),
  }),
  
  update: (member: any) => apiCall('team.php', {
    method: 'PUT',
    body: JSON.stringify(member),
  }),
  
  delete: (id: string) => apiCall(`team.php?id=${id}`, {
    method: 'DELETE',
  }),
};

// Pricing API
export const pricingAPI = {
  get: () => apiCall('pricing.php'),
  
  update: (pricing: any) => apiCall('pricing.php', {
    method: 'PUT',
    body: JSON.stringify(pricing),
  }),
};
