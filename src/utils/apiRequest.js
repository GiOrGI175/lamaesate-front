import axios from 'axios';
import { useTokenStore } from '../lib/tokenStore';

const apiRequest = axios.create({
  baseURL: 'https://lamaesate-back.onrender.com/api/',
  withCredentials: true,
});

apiRequest.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiRequest;
