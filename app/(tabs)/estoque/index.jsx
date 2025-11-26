import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useEstoque } from '../../context/EstoqueContext';

export default function EstoqueScreen() {
  const { bebidas, pereciveis, naoPereciveis, carregarProdutosDoServidor } = useEstoque();
  const router = useRouter();

  useEffect(() => {
    carregarProdutosDoServidor();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gerenciar Estoques</Text>
        <TouchableOpacity
          style={styles.btnAdicionar}
          onPress={() => router.push('/(tabs)/estoque/criar')}
        >
          <Text style={styles.btnAdicionarText}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#3498db' }]}
        onPress={() => router.push('/(tabs)/estoque/bebidas')}
      >
        <Text style={styles.buttonText}>Bebidas ({bebidas.length})</Text>
        <Text style={styles.buttonSubtext}>Total: {bebidas.reduce((s, p) => s + p.quantidade, 0)} itens</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#e74c3c' }]}
        onPress={() => router.push('/(tabs)/estoque/pereciveis')}
      >
        <Text style={styles.buttonText}>Itens Perecíveis ({pereciveis.length})</Text>
        <Text style={styles.buttonSubtext}>Total: {pereciveis.reduce((s, p) => s + p.quantidade, 0)} itens</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#2ecc71' }]}
        onPress={() => router.push('/(tabs)/estoque/naoPereciveis')}
      >
        <Text style={styles.buttonText}>Não Perecíveis ({naoPereciveis.length})</Text>
        <Text style={styles.buttonSubtext}>Total: {naoPereciveis.reduce((s, p) => s + p.quantidade, 0)} itens</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
  },
  btnAdicionar: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  btnAdicionarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSubtext: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
    opacity: 0.8,
  },
});
