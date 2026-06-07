// Base URL for the backend API.
// - In dev: leave VITE_API_URL unset → calls go to "/api/..." and Vite proxies
//   them to localhost:5000.
// - In prod (static host): set VITE_API_URL to your deployed backend URL
//   (e.g. https://atelier-api.onrender.com). If unset, calls fall back to
//   relative paths and the UI uses its built-in fallback data gracefully.
export const API_BASE = import.meta.env.VITE_API_URL || "";

export const apiUrl = (path) => `${API_BASE}${path}`;
