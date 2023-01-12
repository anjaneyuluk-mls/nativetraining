import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { Platform } from 'react-native';

export const axiosInstance = axios.create({
  baseURL:
    Platform.OS === 'ios' ? 'http://localhost:3600' : 'http://10.0.2.2:3600',
});

axiosInstance.interceptors.request.use((req) => {
  // const token = AsyncStorage.getItem('token');
  req.headers['Authorization'] = 'token';
  return req;
});

axiosInstance.interceptors.response.use((res) => {
  return res;
});
