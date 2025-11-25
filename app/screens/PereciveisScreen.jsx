import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { criarProduto } from '../../services/produtoService';
import { useEstoque } from '../context/EstoqueContext';

export default function PereciveisScreen() {
  const { pereciveis, adicionarProdutoLocal, carregarProdutosDoServidor } = useEstoque();
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    carregarProdutosDoServidor();
  }, []);

  async function handleAdd() {
    if (!nome || !quantidade) return;
    try {
      const produtoPayload = { nome, quantidade: Number(quantidade), preco: Number(preco || 0), categoria: 'pereciveis' };
      await criarProduto(produtoPayload);
      adicionarProdutoLocal('pereciveis', produtoPayload);
      setNome(''); setQuantidade(''); setPreco('');
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoque de Perecíveis</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Quantidade" value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" />

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Adicionar Produto</Text>
      </TouchableOpacity>

      <FlatList data={pereciveis} keyExtractor={(item) => item.id?.toString() || item.nome} renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.nome} — {item.quantidade} un. — R$ {(item.preco ?? 0).toFixed(2)}</Text>
        </View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#003366', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 8 },
  addButton: { backgroundColor: '#28a745', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  item: { padding: 10, backgroundColor: '#f2f2f2', borderRadius: 8, marginBottom: 8 },
  itemText: { fontSize: 16 },
});
