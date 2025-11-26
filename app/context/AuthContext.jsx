import React, { createContext, useState, useEffect, useContext } from "react";
import { registrarUsuario, fazerLogin, fazerLogout, obterSessaoAtual } from "../../services/authService";
import { supabase } from "../../services/supabaseClient";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [autenticado, setAutenticado] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function verificarSessao() {
      try {
        const session = await obterSessaoAtual();
        if (session?.user) {
          setAutenticado(true);
          setUser(session.user);
        }
      } catch (e) {
        console.error("Erro ao verificar sessão:", e);
      } finally {
        setLoading(false);
      }
    }

    verificarSessao();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setAutenticado(true);
          setUser(session.user);
        } else {
          setAutenticado(false);
          setUser(null);
        }
      }
    );

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  async function login(email, senha) {
    const resultado = await fazerLogin(email, senha);
    if (resultado.sucesso) {
      setAutenticado(true);
      setUser(resultado.user);
    }
    return resultado;
  }

  async function logout() {
    await fazerLogout();
    setAutenticado(false);
    setUser(null);
  }

  async function register({ nome, email, senha }) {
    return await registrarUsuario(nome, email, senha);
  }

  return (
    <AuthContext.Provider value={{
      autenticado,
      loading,
      login,
      logout,
      register,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

