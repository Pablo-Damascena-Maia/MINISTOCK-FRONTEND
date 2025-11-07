import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro] = useState('');

  const handleRegister = async () => {
    if (!email || !senha || !confirmar) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (senha !== confirmar) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      const novoUsuario = { email, senha };
      await AsyncStorage.setItem('usuario', JSON.stringify(novoUsuario));
      setErro('');
      navigation.replace('Login');
    } catch (e) {
      setErro('Erro ao salvar os dados.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmar}
        onChangeText={(t) => {
          setConfirmar(t);
          setErro('');
        }}
      />

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem conta? Entrar</Text>
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
