import axios from 'axios';

// Vite proxy forwards /api → http://localhost:5000 in dev.
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// --- Auth ---
export const apiRegister = (data) => api.post('/auth/register', data).then((r) => r.data);
export const apiLogin = (data) => api.post('/auth/login', data).then((r) => r.data);
export const apiLogout = () => api.post('/auth/logout').then((r) => r.data);
export const apiMe = () => api.get('/auth/me').then((r) => r.data);

// --- My bookings ---
export const getMyBookings = () => api.get('/bookings/mine').then((r) => r.data);
export const cancelBooking = (id) => api.patch(`/bookings/${id}/cancel`).then((r) => r.data);

// --- Admin ---
export const adminStats = () => api.get('/admin/stats').then((r) => r.data);
export const adminBookings = () => api.get('/admin/bookings').then((r) => r.data);
export const adminUpdateBooking = (id, status) =>
  api.patch(`/admin/bookings/${id}`, { status }).then((r) => r.data);
export const adminTestimonials = () => api.get('/admin/testimonials').then((r) => r.data);
export const adminUpdateTestimonial = (id, data) =>
  api.patch(`/admin/testimonials/${id}`, data).then((r) => r.data);

// --- Services ---
export const getServices = (params) => api.get('/services', { params }).then((r) => r.data);
export const getService = (slug) => api.get(`/services/${slug}`).then((r) => r.data);

// --- Testimonials ---
export const getTestimonials = (params) =>
  api.get('/testimonials', { params }).then((r) => r.data);
export const createTestimonial = (data) => api.post('/testimonials', data).then((r) => r.data);

// --- Therapists ---
export const getTherapists = () => api.get('/therapists').then((r) => r.data);

// --- Bookings ---
export const getAvailability = (params) =>
  api.get('/bookings/availability', { params }).then((r) => r.data);
export const createBooking = (data) => api.post('/bookings', data).then((r) => r.data);

// --- Blog ---
export const getPosts = (params) => api.get('/blog', { params }).then((r) => r.data);
export const getPost = (slug) => api.get(`/blog/${slug}`).then((r) => r.data);

// --- Gift cards ---
export const purchaseGiftCard = (data) => api.post('/giftcards', data).then((r) => r.data);

// --- Newsletter & contact ---
export const subscribeNewsletter = (email, source) =>
  api.post('/newsletter', { email, source }).then((r) => r.data);
export const sendContact = (data) => api.post('/contact', data).then((r) => r.data);

export default api;
