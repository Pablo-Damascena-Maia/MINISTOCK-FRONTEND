import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  async function handleLogin() {
    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    const resultado = await login(email, senha);

    if (resultado.sucesso) {
      setErro('');
      router.replace('/(tabs)');
    } else {
      setErro(resultado.erro || 'Email ou senha incorretos.');
    }
  }

  return (
    <View style={styles.container}>
	      <Text style={styles.title}>Bem-vindo ao MiniStock</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={t => { setEmail(t); setErro(''); }}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        secureTextEntry
        onChangeText={t => { setSenha(t); setErro(''); }}
      />

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa', // Fundo claro do app
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    color: '#003366', // Cor primária do app
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  erro: {
    color: '#ff6666',
    marginBottom: 12,
    fontWeight: 'bold'
  },
  button: {
    width: '100%',
    backgroundColor: '#003366', // Cor primária do app
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  link: {
    color: '#0077cc', // Cor de link do app
    textDecorationLine: 'underline',
    marginTop: 8
  }
});
