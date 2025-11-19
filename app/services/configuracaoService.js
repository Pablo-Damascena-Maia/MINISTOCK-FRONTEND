import API from "./api";

export function criarConfiguracao(data) {
  return API.post("/api/configuracao/criar", data);
}

export function atualizarConfiguracao(data) {
  return API.put("/api/configuracao/atualizar", data);
}

export function atualizarConfiguracaoStatus(id, status) {
  return API.put(`/api/configuracao/atualizarStatus?id=${id}&status=${status}`);
}

export function listarConfiguracoes() {
  return API.get("/api/configuracao/listar");
}

export function listarConfiguracaoPorId(id) {
  return API.get(`/api/configuracao/listarPorId?id=${id}`);
}

export function apagarConfiguracao(id) {
  return API.delete(`/api/configuracao/apagar?id=${id}`);
}
