import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEstoque } from '../context/EstoqueContext';

export default function EstoqueScreen() {
  const { bebidas, pereciveis, naoPereciveis, carregarProdutosDoServidor } = useEstoque();

  useEffect(() => {
    carregarProdutosDoServidor();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Estoques</Text>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#0077cc' }]} onPress={() => {}}>
        <Text style={styles.buttonText}>Estoque de Bebidas ({bebidas.length})</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#28a745' }]} onPress={() => {}}>
        <Text style={styles.buttonText}>Itens Perecíveis ({pereciveis.length})</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#ffc107' }]} onPress={() => {}}>
        <Text style={styles.buttonText}>Não Perecíveis ({naoPereciveis.length})</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#003366', marginBottom: 20 },
  button: { width: '90%', padding: 14, borderRadius: 10, marginVertical: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
