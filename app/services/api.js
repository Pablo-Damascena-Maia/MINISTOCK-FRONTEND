import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
  baseURL: "http://http://academico3.rj.senac.br/ministock:8484", // <- coloque aqui seu IP ou URL do backend
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

API.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

export default API;
