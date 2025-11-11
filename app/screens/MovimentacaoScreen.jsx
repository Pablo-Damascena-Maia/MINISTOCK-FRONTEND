import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useEstoque } from '../context/EstoqueContext';

export default function MovimentacaoScreen() {
  const { adicionarMovimentacao } = useEstoque();
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState('');

  function handleMovimentar() {
    if (!produto || !quantidade || !categoria || !tipo) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const qtd = parseInt(quantidade);
    if (isNaN(qtd) || qtd <= 0) {
      Alert.alert('Erro', 'A quantidade deve ser um número positivo.');
      return;
    }

    const movimentacao = {
      produto,
      quantidade: qtd,
      tipo, // entrada ou saida
      categoria, // bebidas, pereciveis, naoPereciveis
      data: new Date().toLocaleString(),
    };

    adicionarMovimentacao(movimentacao);
    Alert.alert('Sucesso', 'Movimentação registrada com sucesso!');
    setProduto('');
    setQuantidade('');
    setCategoria('');
    setTipo('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimentação de Estoque</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
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

      <Text style={styles.label}>Categoria:</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.option, categoria === 'bebidas' && styles.selected]}
          onPress={() => setCategoria('bebidas')}
        >
          <Text style={styles.optionText}>Bebidas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, categoria === 'pereciveis' && styles.selected]}
          onPress={() => setCategoria('pereciveis')}
        >
          <Text style={styles.optionText}>Perecíveis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, categoria === 'naoPereciveis' && styles.selected]}
          onPress={() => setCategoria('naoPereciveis')}
        >
          <Text style={styles.optionText}>Não Perecíveis</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Tipo de Movimentação:</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.option, tipo === 'entrada' && styles.selectedEntrada]}
          onPress={() => setTipo('entrada')}
        >
          <Text style={styles.optionText}>Entrada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, tipo === 'saida' && styles.selectedSaida]}
          onPress={() => setTipo('saida')}
        >
          <Text style={styles.optionText}>Saída</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleMovimentar}>
        <Text style={styles.buttonText}>Registrar Movimentação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#003366', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  label: { fontWeight: 'bold', marginBottom: 5, color: '#003366' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  option: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 10,
    alignItems: 'center',
  },
  selected: { backgroundColor: '#3498db' },
  selectedEntrada: { backgroundColor: '#2ecc71' },
  selectedSaida: { backgroundColor: '#e74c3c' },
  optionText: { color: '#fff', fontWeight: 'bold' },
  button: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
