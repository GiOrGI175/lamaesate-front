import axios from 'axios';
import { getStoredToken } from '../lib/tokenStore';

const apiRequest = axios.create({
  baseURL: 'https://lamaesate-back.onrender.com/api/',
  // baseURL: 'http://localhost:8800/api/',  withCredentials: true,
});

apiRequest.interceptors.request.use(
  (config) => {
    const token = getStoredToken(); // <-- შეიცვალა

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiRequest;
