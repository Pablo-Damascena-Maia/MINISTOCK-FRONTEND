import API from "./api";

export function criarProduto(data) {
  console.log("Criando produto com dados:", data);
  return API.post("/api/produto/criar", data);
}

export function atualizarProduto(data) {
  return API.put(`/api/produto/atualizar/${data.id}`, data);
}

export function atualizarProdutoStatus(id, status) {
  return API.patch(`/api/produto/atualizarStatus/${id}`, { status });
}

export function listarProdutos() {
  return API.get("/api/produto/listar");
}

export function listarProdutoPorId(id) {
  return API.get(`/api/produto/listarPorId/${id}`);
}

export function apagarProduto(id, data = {}) {
  return API.delete(`/api/produto/apagar/${id}`, { data });
}
