import { supabase } from './supabaseClient';

export async function registrarUsuario(nome, email, senha) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (authError) {
      return { sucesso: false, erro: authError.message };
    }

    const userId = authData.user.id;

    const { error: profileError } = await supabase.from('usuarios').insert({
      id: userId,
      nome,
      email,
    });

    if (profileError) {
      return { sucesso: false, erro: profileError.message };
    }

    return { sucesso: true };
  } catch (e) {
    console.error('Erro ao registrar:', e);
    return { sucesso: false, erro: 'Erro ao registrar usuário' };
  }
}

export async function fazerLogin(email, senha) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      return { sucesso: false, erro: error.message };
    }

    return { sucesso: true, user: data.user, session: data.session };
  } catch (e) {
    console.error('Erro ao fazer login:', e);
    return { sucesso: false, erro: 'Erro ao fazer login' };
  }
}

export async function fazerLogout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Erro ao deslogar:', error);
    }
    return true;
  } catch (e) {
    console.error('Erro ao deslogar:', e);
    return false;
  }
}

export async function obterUsuarioAtual() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      return null;
    }
    return data.user;
  } catch (e) {
    console.error('Erro ao obter usuário:', e);
    return null;
  }
}

export async function obterSessaoAtual() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      return null;
    }
    return data.session;
  } catch (e) {
    console.error('Erro ao obter sessão:', e);
    return null;
  }
}
