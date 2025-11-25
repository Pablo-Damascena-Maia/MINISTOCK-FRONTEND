import API from "./api";

export function criarNotificacao(data) {
  return API.post("/api/notificacao/criar", data);
}

export function atualizarNotificacao(data) {
  return API.put("/api/notificacao/atualizar", data);
}

export function marcarComoLida(id) {
  return API.put(`/api/notificacao/marcarComoLida?id=${id}`);
}

export function atualizarNotificacaoStatus(id, status) {
  return API.put(`/api/notificacao/atualizarStatus?id=${id}&status=${status}`);
}

export function listarNotificacoes() {
  return API.get("/api/notificacao/listar");
}

export function listarPorNotificacaoId(id) {
  return API.get(`/api/notificacao/listarPorNotificacaoId?id=${id}`);
}

export function apagarNotificacao(id) {
  return API.delete(`/api/notificacao/apagar?id=${id}`);
}
