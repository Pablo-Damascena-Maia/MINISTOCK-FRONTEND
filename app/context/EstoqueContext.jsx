import React, { createContext, useContext, useState } from 'react';

const EstoqueContext = createContext();

export function EstoqueProvider({ children }) {
  const [bebidas, setBebidas] = useState([]);
  const [pereciveis, setPereciveis] = useState([]);
  const [naoPereciveis, setNaoPereciveis] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);

  function adicionarProduto(tipo, produto) {
    if (tipo === 'bebidas') setBebidas(prev => [...prev, produto]);
    if (tipo === 'pereciveis') setPereciveis(prev => [...prev, produto]);
    if (tipo === 'naoPereciveis') setNaoPereciveis(prev => [...prev, produto]);
  }

  function adicionarMovimentacao(mov) {
    setMovimentacoes(prev => [...prev, mov]);

    const atualizarEstoque = (lista, setLista) => {
      const idx = lista.findIndex(p => p.nome === mov.produto);
      if (idx !== -1) {
        const atualizados = [...lista];
        atualizados[idx].quantidade += mov.tipo === 'entrada' ? mov.quantidade : -mov.quantidade;
        setLista(atualizados);
      }
    };

    if (mov.categoria === 'bebidas') atualizarEstoque(bebidas, setBebidas);
    if (mov.categoria === 'pereciveis') atualizarEstoque(pereciveis, setPereciveis);
    if (mov.categoria === 'naoPereciveis') atualizarEstoque(naoPereciveis, setNaoPereciveis);
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
  const context = useContext(EstoqueContext);
  if (!context) {
    throw new Error('useEstoque deve ser usado dentro de um EstoqueProvider');
  }
  return context;
}
