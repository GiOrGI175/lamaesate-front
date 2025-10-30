import axios from 'axios';

const apiRequest = axios.create({
  baseURL: 'https://lamaesate-back.onrender.com/api',
  withCredentials: true,
});

export default apiRequest;
