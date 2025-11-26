import { supabase } from './supabaseClient';

export async function criarMovimentacao(produtoNome, quantidade, tipo, categoria) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      throw new Error('Usuário não autenticado');
    }

    const { data, error } = await supabase.from('movimentacoes').insert({
      usuario_id: userData.user.id,
      produto_nome: produtoNome,
      quantidade: parseInt(quantidade) || 0,
      tipo,
      categoria,
    }).select();

    if (error) {
      throw new Error(error.message);
    }

    return { sucesso: true, dados: data };
  } catch (e) {
    console.error('Erro ao criar movimentação:', e);
    return { sucesso: false, erro: e.message };
  }
}

export async function listarMovimentacoes() {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      throw new Error('Usuário não autenticado');
    }

    const { data, error } = await supabase
      .from('movimentacoes')
      .select('*')
      .eq('usuario_id', userData.user.id)
      .order('criado_em', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return { sucesso: true, dados: data || [] };
  } catch (e) {
    console.error('Erro ao listar movimentações:', e);
    return { sucesso: false, erro: e.message, dados: [] };
  }
}
