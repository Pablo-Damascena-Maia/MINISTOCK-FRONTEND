import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [autenticado, setAutenticado] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarToken() {
      const token = await AsyncStorage.getItem("@token");

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setAutenticado(true);
      }

      setLoading(false);
    }

    carregarToken();
  }, []);

  async function login(email, senha) {
    try {
      const res = await api.post("/api/usuario/email", { email, senha });

      const token = res.data.token;
      await AsyncStorage.setItem("@token", token);

      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAutenticado(true);

      return { sucesso: true };
    } catch (error) {
      return { sucesso: false, erro: "Email ou senha incorretos" };
    }
  }

  async function logout() {
    await AsyncStorage.removeItem("@token");
    delete api.defaults.headers.Authorization;
    setAutenticado(false);
  }

  async function register(dados) {
    try {
      await api.post("/api/usuario/criar", dados);
      return { sucesso: true };
    } catch (error) {
      return { sucesso: false, erro: "Erro ao cadastrar usuário" };
    }
  }

  return (
    <AuthContext.Provider value={{
      autenticado,
      loading,
      login,
      logout,
      register,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

