import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "http://academico3.rj.senac.br/ministock",
  //baseURL: "http://localhost:8404",
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(async (config) => {
  // Verifica se o token já foi definido no header (pelo AuthContext)
  if (config.headers.Authorization) {
    return config;
  }

  // Se não, tenta carregar do AsyncStorage
  const token = await AsyncStorage.getItem("@token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
