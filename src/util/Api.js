import axios from 'axios';
import { main } from '../secrets/main';

const { API } = main;

const axiosHandler = axios.create({
  baseURL: API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosHandler.interceptors.response.use((response) => response, (error) => {
  const statusCode = error.response ? error.response.status : null;
  if (parseInt(statusCode, 10) === 401 || parseInt(statusCode, 10) === 403) {
    console.error('Please login to access this resource');
    localStorage.clear();
    window.location.href = '/signin';
  }
});

export default axiosHandler;
