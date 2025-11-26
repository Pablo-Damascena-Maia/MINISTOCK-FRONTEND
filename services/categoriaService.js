import API from "./api";

export function criarCategoria(data) {
  return API.post("/api/categoriaProduto/criar", data);
}

export function atualizarCategoria(data) {
  return API.put(`/api/categoriaProduto/atualizar/${data.id}`, data);
}

export function atualizarCategoriaStatus(id, status) {
  return API.patch(`/api/categoriaProduto/atualizarStatus/${id}`, { status });
}

export function listarCategorias() {
  return API.get("/api/categoriaProduto/listar");
}

export function listarCategoriaPorId(id) {
  return API.get(`/api/categoriaProduto/listarPorId/${id}`);
}

export function apagarCategoria(id) {
  return API.delete(`/api/categoriaProduto/apagar/${id}`);
}
