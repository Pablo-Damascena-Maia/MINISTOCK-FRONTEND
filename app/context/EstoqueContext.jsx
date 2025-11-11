import React, { createContext, useContext, useState } from 'react';

const EstoqueContext = createContext();

export function EstoqueProvider({ children }) {
  const [bebidas, setBebidas] = useState([]);
  const [pereciveis, setPereciveis] = useState([]);
  const [naoPereciveis, setNaoPereciveis] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);

  function getCategoriaSetter(categoria) {
    switch (categoria) {
      case 'bebidas':
        return setBebidas;
      case 'pereciveis':
        return setPereciveis;
      case 'naoPereciveis':
        return setNaoPereciveis;
      default:
        return null;
    }
  }

  function getCategoriaLista(categoria) {
    switch (categoria) {
      case 'bebidas':
        return bebidas;
      case 'pereciveis':
        return pereciveis;
      case 'naoPereciveis':
        return naoPereciveis;
      default:
        return [];
    }
  }

  function adicionarProduto(categoria, produto) {
    const setCategoria = getCategoriaSetter(categoria);
    if (!setCategoria) return;

    setCategoria((prev) => {
      const existe = prev.find((p) => p.nome === produto.nome);
      if (existe) {
        return prev.map((p) =>
          p.nome === produto.nome
            ? { ...p, quantidade: p.quantidade + produto.quantidade }
            : p
        );
      }
      return [...prev, produto];
    });
  }

  function adicionarMovimentacao(mov) {
    setMovimentacoes((prev) => [...prev, mov]);

    const setCategoria = getCategoriaSetter(mov.categoria);
    const listaAtual = getCategoriaLista(mov.categoria);

    if (!setCategoria) return;

    setCategoria(() => {
      const idx = listaAtual.findIndex((p) => p.nome === mov.produto);
      let novaLista = [...listaAtual];

      if (idx !== -1) {
        const atual = novaLista[idx];
        let novaQuantidade =
          mov.tipo === 'entrada'
            ? atual.quantidade + mov.quantidade
            : atual.quantidade - mov.quantidade;

        if (novaQuantidade < 0) novaQuantidade = 0;

        novaLista[idx] = { ...atual, quantidade: novaQuantidade };
      } else if (mov.tipo === 'entrada') {
        novaLista.push({ nome: mov.produto, quantidade: mov.quantidade });
      }

      return novaLista;
    });
  }

  return (
    <EstoqueContext.Provider
      value={{
        bebidas,
        pereciveis,
        naoPereciveis,
        movimentacoes,
        adicionarProduto,
        adicionarMovimentacao,
      }}
    >
      {children}
    </EstoqueContext.Provider>
  );
}

export function useEstoque() {
  return useContext(EstoqueContext);
}
