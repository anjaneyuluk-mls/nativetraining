import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:3600',
});

axiosInstance.interceptors.request.use((req) => {
  // const token = AsyncStorage.getItem('token');
  req.headers['Authorization'] = 'token';
  return req;
});

axiosInstance.interceptors.response.use((res) => {
  return res;
});
