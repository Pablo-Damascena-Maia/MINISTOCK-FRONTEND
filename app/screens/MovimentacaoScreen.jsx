import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { useEstoque } from '../context/EstoqueContext';

export default function MovimentacaoScreen() {
  const { bebidas, pereciveis, naoPereciveis, adicionarMovimentacao } = useEstoque();
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tipo, setTipo] = useState('');
  const [historico, setHistorico] = useState([]);

  function getListaPorCategoria(cat) {
    switch (cat) {
      case 'bebidas': return bebidas;
      case 'pereciveis': return pereciveis;
      case 'naoPereciveis': return naoPereciveis;
      default: return [];
    }
  }

  function handleMovimentar() {
    if (!produto || !quantidade || !categoria || !tipo) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const qtd = parseInt(quantidade);
    if (isNaN(qtd) || qtd <= 0) {
      Alert.alert('Erro', 'A quantidade deve ser um número positivo.');
      return;
    }

    // Busca produto no estoque da categoria
    const listaAtual = getListaPorCategoria(categoria);
    const produtoExistente = listaAtual.find(p => p.nome === produto);

    const antes = produtoExistente ? produtoExistente.quantidade : 0;
    const precoAtual = produtoExistente ? produtoExistente.preco || 0 : 0;

    // Se não preencher o preço, mantém o do estoque
    const valor = preco ? parseFloat(preco) : precoAtual;

    if (isNaN(valor) || valor < 0) {
      Alert.alert('Erro', 'O preço deve ser um número válido.');
      return;
    }

    const depois =
      tipo === 'entrada'
        ? antes + qtd
        : Math.max(0, antes - qtd);

    const mov = {
      produto,
      quantidade: qtd,
      preco: valor,
      tipo,
      categoria,
      antes,
      depois,
      data: new Date().toLocaleString(),
    };

    adicionarMovimentacao(mov);
    setHistorico((prev) => [mov, ...prev]);

    Alert.alert('Sucesso', 'Movimentação registrada com sucesso!');
    setProduto('');
    setQuantidade('');
    setPreco('');
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
      <TextInput
        style={styles.input}
        placeholder="Preço (R$) — opcional"
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
      />

      <Text style={styles.label}>Categoria:</Text>
      <View style={styles.row}>
        {['bebidas', 'pereciveis', 'naoPereciveis'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.option, categoria === cat && styles.selected]}
            onPress={() => setCategoria(cat)}
          >
            <Text style={styles.optionText}>
              {cat === 'bebidas' ? 'Bebidas' : cat === 'pereciveis' ? 'Perecíveis' : 'Não Perecíveis'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Tipo de Movimentação:</Text>
      <View style={styles.row}>
        {['entrada', 'saida'].map((t) => (
          <TouchableOpacity
            key={t}
            style={[
              styles.option,
              tipo === t && (t === 'entrada' ? styles.selectedEntrada : styles.selectedSaida),
            ]}
            onPress={() => setTipo(t)}
          >
            <Text style={styles.optionText}>{t === 'entrada' ? 'Entrada' : 'Saída'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleMovimentar}>
        <Text style={styles.buttonText}>Registrar Movimentação</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Histórico de Movimentações</Text>
      {historico.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma movimentação registrada.</Text>
      ) : (
        <FlatList
          data={historico}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.produtoNome}>{item.produto}</Text>
              <Text>Categoria: {item.categoria}</Text>
              <Text>Tipo: {item.tipo.toUpperCase()}</Text>
              <Text>Preço: R$ {item.preco.toFixed(2)}</Text>
              <Text>Antes: {item.antes}</Text>
              <Text>
                {item.tipo === 'entrada'
                  ? `Entrou: +${item.quantidade}`
                  : `Saiu: -${item.quantidade}`}
              </Text>
              <Text>Depois: {item.depois}</Text>
              <Text style={styles.data}>{item.data}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#003366', textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
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
    backgroundColor: '#E0E0E0',
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
    marginBottom: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  subtitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 10 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  produtoNome: { fontSize: 16, fontWeight: 'bold', color: '#003366' },
  data: { fontSize: 12, color: '#888', marginTop: 5 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 20 },
});
