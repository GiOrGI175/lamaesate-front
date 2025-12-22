import axios from 'axios';

const apiRequest = axios.create({
  baseURL: 'https://your-backend-url.com/api',
  withCredentials: true,
});

apiRequest.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('auth-token');
        if (stored) {
          const parsed = JSON.parse(stored);
          const token = parsed.state?.token;

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (error) {
        console.error('Error reading token:', error);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiRequest;
