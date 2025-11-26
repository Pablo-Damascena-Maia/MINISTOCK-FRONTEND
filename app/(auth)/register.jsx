import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro] = useState('');
  const { register } = useAuth();
  const router = useRouter();

  async function handleRegister() {
    if (!nome || !email || !senha || !confirmar) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (senha !== confirmar) {
      setErro('As senhas não coincidem.');
      return;
    }

    const resultado = await register({ nome, email, senha, ativo: true, status: 1 });

    if (resultado.sucesso) {
      setErro('');
      router.replace('/(auth)/login');
    } else {
      setErro(resultado.erro || 'Erro ao cadastrar.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(t) => { setNome(t); setErro(''); }}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={(t) => { setEmail(t); setErro(''); }}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={(t) => { setSenha(t); setErro(''); }}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        secureTextEntry
        value={confirmar}
        onChangeText={(t) => { setConfirmar(t); setErro(''); }}
      />

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
        <Text style={styles.link}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { color: '#003366', fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  input: { width: '100%', backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#ccc' },
  erro: { color: '#ff6666', marginBottom: 12, fontWeight: 'bold' },
  button: { width: '100%', backgroundColor: '#003366', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#0077cc', textDecorationLine: 'underline', marginTop: 8 },
});
