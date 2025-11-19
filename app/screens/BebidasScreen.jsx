import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useEstoque } from '../context/EstoqueContext';
import { criarProduto, listarProdutos } from '../services/produtoService';

export default function BebidasScreen() {
  const { bebidas, adicionarProdutoLocal, carregarProdutosDoServidor } = useEstoque();
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    carregarProdutosDoServidor();
  }, []);

  async function handleAdd() {
    if (!nome || !quantidade) return;
    try {
      const produtoPayload = { nome, quantidade: Number(quantidade), preco: Number(preco || 0), categoria: 'bebidas' };
      await criarProduto(produtoPayload); // cria no backend
      adicionarProdutoLocal('bebidas', produtoPayload); // atualiza local
      setNome(''); setQuantidade(''); setPreco('');
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoque de Bebidas</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Quantidade" value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" />

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Adicionar Produto</Text>
      </TouchableOpacity>

      <FlatList data={bebidas} keyExtractor={(item) => item.id?.toString() || item.nome} renderItem={({ item }) => (
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
  addButton: { backgroundColor: '#0077cc', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  item: { padding: 10, backgroundColor: '#f2f2f2', borderRadius: 8, marginBottom: 8 },
  itemText: { fontSize: 16 },
});
