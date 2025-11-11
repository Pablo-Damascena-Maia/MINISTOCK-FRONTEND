import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useEstoque } from '../context/EstoqueContext';

export default function NãoPereciveisScreen() {
  const { naoPereciveis, adicionarProduto } = useEstoque();
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  function adicionarBebida() {
    if (!nome || !quantidade || !preco) return;
    adicionarProduto('naoPereciveis', {
      nome,
      quantidade: Number(quantidade),
      preco: Number(preco),
    });
    setNome('');
    setQuantidade('');
    setPreco('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoque de Não Pereciveis</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Não Pereciveis"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço (R$)"
          keyboardType="numeric"
          value={preco}
          onChangeText={setPreco}
        />
        <TouchableOpacity style={styles.button} onPress={adicionarBebida}>
          <Text style={styles.buttonText}>Adicionar Não Pereciveis</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Lista de Não Pereciveis</Text>

      {naoPereciveis.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma bebida cadastrada.</Text>
      ) : (
        <FlatList
          data={naoPereciveis}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.produtoNome}>{item.nome}</Text>
              <Text style={styles.produtoQtd}>Quantidade: {item.quantidade}</Text>
              <Text style={styles.produtoPreco}>Preço: R$ {item.preco?.toFixed(2) || '0.00'}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#003366', textAlign: 'center', marginBottom: 20 },
  form: { marginBottom: 25 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 10 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  produtoNome: { fontSize: 16, fontWeight: 'bold', color: '#003366' },
  produtoQtd: { fontSize: 14, color: '#555' },
  produtoPreco: { fontSize: 14, color: '#27ae60' },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 20 },
});
