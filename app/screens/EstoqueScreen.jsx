import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EstoqueScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Estoques</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#0077cc' }]}
        onPress={() => navigation.navigate('Bebidas')}
      >
        <Text style={styles.buttonText}>🍹 Estoque de Bebidas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#28a745' }]}
        onPress={() => navigation.navigate('Pereciveis')}
      >
        <Text style={styles.buttonText}>🥫 Itens Perecíveis</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ffc107' }]}
        onPress={() => navigation.navigate('NaoPereciveis')}
      >
        <Text style={styles.buttonText}>📦 Itens Não Perecíveis</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#003366',
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
