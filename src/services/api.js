import { Platform } from 'react-native';

export const getBaseUrl = () => {
  return Platform.OS === 'ios'
    ? 'http://localhost:3600'
    : 'http://10.0.2.2:3600';
};
