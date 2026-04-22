/**
 * API utility for communicating with the backend server
 * Backend runs on http://127.0.0.1:3000
 * Vite dev server proxies requests to /auth, /bookings, /users to the backend
 */

const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname !== '127.0.0.1' 
  ? 'https://winter2026-comp307-group09.cs.mcgill.ca'
  : '';

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function apiCall(
  endpoint: string,
  options: FetchOptions = {}
) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add auth token if it exists
  const token = localStorage.getItem('accessToken');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Auth Endpoints
export const auth = {
  login: (email: string, password: string) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
};

// User Endpoints
export const users = {
  getAll: () => apiCall('/user/active', { method: 'GET' }),
  getById: (id: string) => apiCall(`/user/${id}`, { method: 'GET' }),
  create: (data: any) =>
    apiCall('/user/create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: any) =>
    apiCall(`/user/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiCall(`/user/${id}`, { method: 'DELETE' }),
};

// Booking Endpoints
export const bookings = {
  getAll: (userId: string) => apiCall(`/booking/${userId}`, { method: 'GET' }),
  getById: (id: string) => apiCall(`/booking/${id}`, { method: 'GET' }),
  getMyBookings: (userId: string) => apiCall(`/booking/${userId}`, { method: 'GET' }),
  create: (data: any) =>
    apiCall('/booking', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  book: (slotId: string) =>
    apiCall(`/slot/${localStorage.getItem('userId') || ''}/${slotId}/book`, {
      method: 'POST',
    }),
  update: (id: string, data: any) =>
    apiCall(`/booking/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string) =>
    apiCall(`/booking/${id}`, { method: 'DELETE' }),
};
