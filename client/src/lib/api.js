import axios from 'axios';

// Vite proxy forwards /api → http://localhost:5000 in dev.
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export const getServices = (params) => api.get('/services', { params }).then((r) => r.data);
export const getService = (slug) => api.get(`/services/${slug}`).then((r) => r.data);
export const getTestimonials = (params) =>
  api.get('/testimonials', { params }).then((r) => r.data);
export const getAvailability = (params) =>
  api.get('/bookings/availability', { params }).then((r) => r.data);
export const createBooking = (data) => api.post('/bookings', data).then((r) => r.data);

export default api;
