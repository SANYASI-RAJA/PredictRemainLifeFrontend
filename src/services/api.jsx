import axios from 'axios';

const API = axios.create({
  baseURL: 'https://rul-backend.onrender.com//api'
});

// Interceptor to add token to requests
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => Promise.reject(error));

export default API;
