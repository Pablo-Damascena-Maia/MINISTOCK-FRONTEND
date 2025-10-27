import React, { createContext, useContext, useState } from "react";

const EstoqueContext = createContext();

export function EstoqueProvider({ children }) {
  const [bebidas, setBebidas] = useState([]);
  const [pereciveis, setPereciveis] = useState([]);
  const [naoPereciveis, setNaoPereciveis] = useState([]);

  const adicionarProduto = (tipo, produto) => {
    if (tipo === "bebidas") setBebidas((prev) => [...prev, produto]);
    if (tipo === "pereciveis") setPereciveis((prev) => [...prev, produto]);
    if (tipo === "naoPereciveis") setNaoPereciveis((prev) => [...prev, produto]);
  };

  const removerProduto = (tipo, id) => {
    if (tipo === "bebidas") setBebidas((prev) => prev.filter((p) => p.id !== id));
    if (tipo === "pereciveis") setPereciveis((prev) => prev.filter((p) => p.id !== id));
    if (tipo === "naoPereciveis") setNaoPereciveis((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <EstoqueContext.Provider
      value={{ bebidas, pereciveis, naoPereciveis, adicionarProduto, removerProduto }}
    >
      {children}
    </EstoqueContext.Provider>
  );
}

export function useEstoque() {
  return useContext(EstoqueContext);
}
