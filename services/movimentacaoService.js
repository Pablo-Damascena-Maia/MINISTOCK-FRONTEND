import API from "./api";

export function criarMovimentacao(data) {
  return API.post("/api/movimentacoes_estoque/criar", data);
}

export function atualizarMovimentacao(data) {
  return API.put("/api/movimentacoes_estoque/atualizar", data);
}

export function listarMovimentacoes() {
  return API.get("/api/movimentacoes_estoque/listar");
}

export function apagarMovimentacao(id) {
  return API.delete(`/api/movimentacoes_estoque/apagar?id=${id}`);
}
