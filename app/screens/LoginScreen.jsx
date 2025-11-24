import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { criarUsuario } from '../services/usuarioService';
import { api } from '../services/api'; // optional if you have auth endpoint
import { useEstoque } from '../context/EstoqueContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  async function handleLogin() {
    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }
    try {
      // Exemplo: POST /auth/login -> retorna token
      // Se seu backend não tiver auth, use AsyncStorage local flow
      const res = await api.post('/api/usuario/email', { email, senha }); // Sim eu estou logando com email
      const token = res.data.token;
      await AsyncStorage.setItem('token', token);
      setErro('');
      navigation.replace('MainApp');
    } catch (e) {
      // fallback: se não existir rota auth, você pode usar usuário salvo localmente
      console.warn(e);
      setErro('Email ou senha incorretos.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MiniStock - Login</Text>

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(t) => { setEmail(t); setErro(''); }} keyboardType="email-address" />

      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={(t) => { setSenha(t); setErro(''); }} />

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#003366', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  input: { width: '100%', backgroundColor: '#fff', borderRadius: 8, padding: 12, marginBottom: 12 },
  erro: { color: '#ff6666', marginBottom: 12, fontWeight: 'bold' },
  button: { width: '100%', backgroundColor: '#007bff', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#fff', textDecorationLine: 'underline', marginTop: 8 },
});
