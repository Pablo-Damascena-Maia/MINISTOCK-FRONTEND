import api from "./api";

export async function login(email, senha) {
  try {
    const response = await api.post("/api/usuario/email", { email, senha });
    return response.data;
  } catch (error) {
    console.log("Erro login:", error.response?.data || error);
    return null;
  }
}

export async function criarUsuario({ nome, email, senha }) {
  const payload = {
    nome: nome || "Usuário",
    email,
    senha,
    perfil: "CLIENTE",
    status: 1,
    rolesList: ["USER"],
  };

  try {
    const response = await API.post("/api/usuario/criar", payload);
    return response.data;
  } catch (error) {
    console.log("Erro registrar:", error.response?.data || error);
    return null;
  }
}

export default {
  login,
  criarUsuario,
};
