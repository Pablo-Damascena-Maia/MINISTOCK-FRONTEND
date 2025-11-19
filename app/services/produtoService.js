import API from "./api";

export function criarProduto(data) {
  return API.post("/api/produto/criar", data);
}

export function atualizarProduto(data) {
  return API.put("/api/produto/atualizar", data);
}

export function atualizarProdutoStatus(id, status) {
  return API.put(`/api/produto/atualizarStatus?id=${id}&status=${status}`);
}

export function listarProdutos() {
  return API.get("/api/produto/listar");
}

export function listarProdutoPorId(id) {
  return API.get(`/api/produto/listarPorId?id=${id}`);
}

export function apagarProduto(id) {
  return API.delete(`/api/produto/apagar?id=${id}`);
}
