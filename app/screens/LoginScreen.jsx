import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      const dadosSalvos = await AsyncStorage.getItem('usuario');

      if (!dadosSalvos) {
        setErro('Nenhum usuário cadastrado.');
        return;
      }

      const usuario = JSON.parse(dadosSalvos);

      if (usuario.email === email && usuario.senha === senha) {
        setErro('');
        navigation.replace('MainApp');
      } else {
        setErro('Email ou senha incorretos.');
      }
    } catch (e) {
      setErro('Erro ao tentar fazer login.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao MiniStock</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={(t) => {
          setEmail(t);
          setErro('');
        }}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={senha}
        onChangeText={(t) => {
          setSenha(t);
          setErro('');
        }}
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
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  erro: {
    color: '#ff6666',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
