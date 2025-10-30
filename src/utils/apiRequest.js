import axios from 'axios';

const apiRequest = axios.create({
  baseURL: 'https://lamaestate-back.onrender.com/api',
  withCredentials: true,
});

export default apiRequest;
