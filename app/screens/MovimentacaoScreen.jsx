import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useEstoque } from '../context/EstoqueContext';

export default function MovimentacaoScreen() {
  const { movimentacoes, adicionarMovimentacao } = useEstoque();
  const [tipo, setTipo] = useState('entrada');
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');

  const registrarMovimentacao = () => {
    if (!produto || !quantidade) return alert('Preencha todos os campos');
    adicionarMovimentacao({
      tipo,
      produto,
      quantidade: parseInt(quantidade),
      data: new Date().toLocaleString('pt-BR'),
    });
    setProduto('');
    setQuantidade('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimentação de Estoque</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          value={produto}
          onChangeText={setProduto}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
        />
        <View style={styles.typeContainer}>
          <TouchableOpacity
            style={[styles.typeButton, tipo === 'entrada' && styles.activeButton]}
            onPress={() => setTipo('entrada')}
          >
            <Text style={styles.typeText}>Entrada</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, tipo === 'saida' && styles.activeButton]}
            onPress={() => setTipo('saida')}
          >
            <Text style={styles.typeText}>Saída</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={registrarMovimentacao}>
          <Text style={styles.addButtonText}>Registrar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Histórico de Movimentações</Text>
      <FlatList
        data={movimentacoes.slice().reverse()}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.tipo === 'entrada' ? '📦 Entrada' : '📤 Saída'} — {item.produto} ({item.quantidade})
            </Text>
            <Text style={styles.date}>{item.data}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f6fa' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#003366', marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#003366', marginVertical: 10 },
  form: { marginBottom: 20 },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  typeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  typeButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeButton: { backgroundColor: '#003366' },
  typeText: { color: '#fff', fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#0066cc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  item: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#003366',
  },
  itemText: { fontSize: 16, fontWeight: '500' },
  date: { fontSize: 12, color: '#666' },
});
