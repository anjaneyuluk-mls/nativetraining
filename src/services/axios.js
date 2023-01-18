import axios from 'axios';
import { getBaseUrl } from './api';

export const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
});

axiosInstance.interceptors.request.use((req) => {
  // const token = AsyncStorage.getItem('token');
  req.headers['Authorization'] = 'token';
  return req;
});

axiosInstance.interceptors.response.use((res) => {
  return res;
});
