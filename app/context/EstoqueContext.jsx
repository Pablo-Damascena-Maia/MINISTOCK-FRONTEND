import React, { createContext, useContext, useEffect, useState } from 'react';
import { listarMovimentacoes } from '../../services/movimentacaoService';
import { listarProdutos } from '../../services/produtoService';

const EstoqueContext = createContext();

export function EstoqueProvider({ children }) {
  const [bebidas, setBebidas] = useState([]);
  const [pereciveis, setPereciveis] = useState([]);
  const [naoPereciveis, setNaoPereciveis] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Carrega produtos do backend e separa por categoria
  async function carregarProdutosDoServidor() {
    try {
      setLoading(true);
      const [bebidasRes, pereciveisRes, naoPereciveisRes] = await Promise.all([
        listarProdutos(1),
        listarProdutos(2),
        listarProdutos(3),
      ]);

      const mapItem = (prod, categoria) => {
        const quantidadeRaw =
          prod.quantidadeEstoque ?? prod.quantidade ?? prod.estoque ?? prod.qtd ?? prod.qtdEstoque;
        return {
          id: prod.id ?? prod.produtoId ?? Date.now().toString(),
          nome: prod.nome ?? prod.descricao ?? 'Produto',
          quantidade:
            typeof quantidadeRaw === 'number' ? quantidadeRaw : Number(quantidadeRaw) || 0,
          preco: prod.preco ?? prod.valor ?? 0,
          categoria,
        };
      };

      setBebidas((bebidasRes?.data || []).map((prod) => mapItem(prod, 'bebidas')));
      setPereciveis((pereciveisRes?.data || []).map((prod) => mapItem(prod, 'pereciveis')));
      setNaoPereciveis((naoPereciveisRes?.data || []).map((prod) => mapItem(prod, 'naoPereciveis')));
    } catch (e) {
      console.warn('Erro ao carregar produtos:', e);
    } finally {
      setLoading(false);
    }
  };

  async function carregarMovimentacoesDoServidor() {
    try {
      const res = await listarMovimentacoes();
      const list = res.data || [];
      setMovimentacoes(list);
    } catch (e) {
      console.warn('Erro carregar movs:', e);
    }
  }

  useEffect(() => {
    // carrega inicialmente do backend
    carregarProdutosDoServidor();
    carregarMovimentacoesDoServidor();
  }, []);

  // adicionar produto localmente (usado ao criar produto no app)
  function adicionarProdutoLocal(categoria, produto) {
    const setCategoria = getCategoriaSetter(categoria);
    if (!setCategoria) return;
    setCategoria((prev) => {
      const existe = prev.find((p) => p.nome === produto.nome);
      if (existe) {
        return prev.map((p) =>
          p.nome === produto.nome ? { ...p, quantidade: p.quantidade + produto.quantidade } : p
        );
      }
      return [...prev, produto];
    });
  }

  // adicionar movimentação e atualizar estoque localmente (sincroniza com backend via services nas telas)
  function adicionarMovimentacaoLocal(mov) {
    setMovimentacoes((prev) => [...prev, mov]);

    const setCategoria = getCategoriaSetter(mov.categoria);
    const listaAtual = getCategoriaLista(mov.categoria);
    if (!setCategoria) return;

    setCategoria(() => {
      const idx = listaAtual.findIndex((p) => p.nome === mov.produto);
      const novaLista = [...listaAtual];
      if (idx !== -1) {
        const atual = novaLista[idx];
        let novaQuantidade =
          mov.tipo === 'entrada' ? atual.quantidade + mov.quantidade : atual.quantidade - mov.quantidade;
        if (novaQuantidade < 0) novaQuantidade = 0;
        novaLista[idx] = { ...atual, quantidade: novaQuantidade };
      } else if (mov.tipo === 'entrada') {
        novaLista.push({ id: Date.now().toString(), nome: mov.produto, quantidade: mov.quantidade, categoria: mov.categoria });
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
        loading,
        carregarProdutosDoServidor,
        carregarMovimentacoesDoServidor,
        adicionarProdutoLocal,
        adicionarMovimentacaoLocal,
      }}
    >
      {children}
    </EstoqueContext.Provider>
  );
}

export function useEstoque() {
  const ctx = useContext(EstoqueContext);
  if (!ctx) {
    throw new Error('useEstoque deve ser usado dentro de EstoqueProvider');
  }
  return ctx;
}
export default EstoqueProvider;