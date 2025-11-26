import { supabase } from './supabaseClient';

export async function criarProduto(nome, quantidade, preco, categoria) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      throw new Error('Usuário não autenticado');
    }

    const { data, error } = await supabase.from('produtos').insert({
      usuario_id: userData.user.id,
      nome,
      quantidade: parseInt(quantidade) || 0,
      preco: parseFloat(preco) || 0,
      categoria,
    }).select();

    if (error) {
      throw new Error(error.message);
    }

    return { sucesso: true, dados: data };
  } catch (e) {
    console.error('Erro ao criar produto:', e);
    return { sucesso: false, erro: e.message };
  }
}

export async function listarProdutos() {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      throw new Error('Usuário não autenticado');
    }

    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('usuario_id', userData.user.id)
      .order('criado_em', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return { sucesso: true, dados: data || [] };
  } catch (e) {
    console.error('Erro ao listar produtos:', e);
    return { sucesso: false, erro: e.message, dados: [] };
  }
}

export async function atualizarProduto(produtoId, { nome, quantidade, preco, categoria }) {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .update({
        nome,
        quantidade: parseInt(quantidade) || 0,
        preco: parseFloat(preco) || 0,
        categoria,
        atualizado_em: new Date().toISOString(),
      })
      .eq('id', produtoId)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return { sucesso: true, dados: data };
  } catch (e) {
    console.error('Erro ao atualizar produto:', e);
    return { sucesso: false, erro: e.message };
  }
}

export async function deletarProduto(produtoId) {
  try {
    const { error } = await supabase.from('produtos').delete().eq('id', produtoId);

    if (error) {
      throw new Error(error.message);
    }

    return { sucesso: true };
  } catch (e) {
    console.error('Erro ao deletar produto:', e);
    return { sucesso: false, erro: e.message };
  }
}
