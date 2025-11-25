import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const { setAutenticado } = useAuth();

  async function handleLogin() {
    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      // ---- LOGIN COM O SEU ENDPOINT ----
      const res = await api.post('/api/usuario/email', {
        email: email,
        senha: senha
      });

      if (!res.data || !res.data.token) {
        setErro("Backend não retornou token.");
        return;
      }

      const token = res.data.token;

      // salva token
      await AsyncStorage.setItem("token", token);

      //setAutenticado(true);
      setErro('');

      navigation.replace("MainApp");

    } catch (error) {
      console.log(error);
      setErro('Email ou senha incorretos.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MiniStock - Login</Text>

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

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  erro: {
    color: '#ff6666',
    marginBottom: 12,
    fontWeight: 'bold'
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
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
    color: '#fff',
    textDecorationLine: 'underline',
    marginTop: 8
  }
});
