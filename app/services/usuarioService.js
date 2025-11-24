import API from "./api";

// Criar usuário (cadastro)
export function criarUsuario(data) {
  return API.post("/api/usuario/criar", data);
}
// Criar email (cadastro)
export function emailUsuario(data) {
  return API.post("/api/usuario/email", data);
}

// Atualizar usuário
export function atualizarUsuario(data) {
  return API.put("/api/usuario/atualizar", data);
}

// Atualizar status
export function atualizarUsuarioStatus(id, status) {
  return API.put(`/api/usuario/atualizarStatus?id=${id}&status=${status}`);
}

// Listar usuários
export function listarUsuarios() {
  return API.get("/api/usuario/listar");
}

// Buscar por ID
export function listarUsuarioPorId(id) {
  return API.get(`/api/usuario/listarPorId?id=${id}`);
}

// Apagar
export function apagarUsuario(id) {
  return API.delete(`/api/usuario/apagar?id=${id}`);
}
