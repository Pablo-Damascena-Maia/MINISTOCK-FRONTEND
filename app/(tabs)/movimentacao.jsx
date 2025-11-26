import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { criarMovimentacao } from '../../services/movimentacaoService';
import { useEstoque } from '../context/EstoqueContext';

export default function MovimentacaoScreen() {
  const { bebidas, pereciveis, naoPereciveis, movimentacoes, adicionarMovimentacaoLocal, carregarMovimentacoesDoServidor } = useEstoque();
  const [produtoId, setProdutoId] = useState('');
  const [produtoNome, setProdutoNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoriaId, setCategoriaId] = useState(1); // 1: Bebidas, 2: Pereciveis, 3: Nao Pereciveis
  const [tipo, setTipo] = useState('entrada');

  useEffect(() => {
    carregarMovimentacoesDoServidor();
  }, []);

  async function handleRegistrar() {
    if (!produtoId || !quantidade || !categoriaId || !tipo) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    const qtd = Number(quantidade);
    if (isNaN(qtd) || qtd <= 0) {
      Alert.alert('Erro', 'Quantidade inválida.');
      return;
    }
    const payload = {
      produtoId: produtoId,
      quantidade: qtd,
      tipoMovimentacao: tipo === 'entrada' ? 1 : 2, // 1: Entrada, 2: Saída
      dataMovimentacao: new Date().toISOString(),
      // Os campos abaixo são para o backend, mas o frontend precisa do nome e categoria para o contexto local
      // O backend deve inferir a categoria pelo produtoId
    };

    try {
      const res = await criarMovimentacao(payload); // envia ao backend
      adicionarMovimentacaoLocal({
        id: res.data.id,
        produto: produtoNome,
        quantidade: qtd,
        categoria: categoriaId === 1 ? 'bebidas' : categoriaId === 2 ? 'pereciveis' : 'naoPereciveis',
        tipo: tipo,
        data: new Date().toLocaleString(),
      }); // atualiza local
      setProdutoId(''); setProdutoNome(''); setQuantidade('');
      Alert.alert('Sucesso', 'Movimentação registrada.');
    } catch (e) {
      console.warn(e);
      Alert.alert('Erro', 'Não foi possível registrar movimentação.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movimentações</Text>

	  <TextInput style={styles.input} placeholder="ID do produto" value={produtoId} onChangeText={setProdutoId} keyboardType="numeric" />
	  <TextInput style={styles.input} placeholder="Nome do produto (para histórico local)" value={produtoNome} onChangeText={setProdutoNome} />
      <TextInput style={styles.input} placeholder="Quantidade" value={quantidade} onChangeText={setQuantidade} keyboardType="numeric" />

      <View style={styles.row}>
	      <TouchableOpacity style={[styles.option, categoriaId === 1 && styles.selected]} onPress={() => setCategoriaId(1)}><Text style={[styles.optText, categoriaId === 1 && { color: '#fff' }]}>Bebidas</Text></TouchableOpacity>
	      <TouchableOpacity style={[styles.option, categoriaId === 2 && styles.selected]} onPress={() => setCategoriaId(2)}><Text style={[styles.optText, categoriaId === 2 && { color: '#fff' }]}>Perecíveis</Text></TouchableOpacity>
	      <TouchableOpacity style={[styles.option, categoriaId === 3 && styles.selected]} onPress={() => setCategoriaId(3)}><Text style={[styles.optText, categoriaId === 3 && { color: '#fff' }]}>Não Perecíveis</Text></TouchableOpacity>
      </View>

      <View style={styles.row}>
	        <TouchableOpacity style={[styles.option, tipo === 'entrada' && styles.selectedEntrada]} onPress={() => setTipo('entrada')}><Text style={[styles.optText, tipo === 'entrada' && { color: '#fff' }]}>Entrada</Text></TouchableOpacity>
	        <TouchableOpacity style={[styles.option, tipo === 'saida' && styles.selectedSaida]} onPress={() => setTipo('saida')}><Text style={[styles.optText, tipo === 'saida' && { color: '#fff' }]}>Saída</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegistrar}><Text style={styles.btnText}>Registrar</Text></TouchableOpacity>

      <Text style={styles.sub}>Histórico</Text>
      <FlatList data={movimentacoes.slice().reverse()} keyExtractor={(item, i) => i.toString()} renderItem={({ item }) => (
        <View style={[styles.movItem, item.tipo === 'entrada' ? { borderLeftColor: '#2ecc71' } : { borderLeftColor: '#e74c3c' }]}>
          <Text style={styles.movText}>{item.tipo === 'entrada' ? '📦 Entrada' : '📤 Saída'} — {item.produto} ({item.quantidade})</Text>
          <Text style={styles.movDate}>{item.data ? new Date(item.data).toLocaleString() : ''}</Text>
        </View>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#003366', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  option: { flex: 1, marginHorizontal: 4, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', alignItems: 'center', backgroundColor: '#eee' },
  selected: { backgroundColor: '#0077cc' },
  selectedEntrada: { backgroundColor: '#2ecc71' },
  selectedSaida: { backgroundColor: '#e74c3c' },
  optText: { color: '#333', fontWeight: 'bold' },
  button: { backgroundColor: '#003366', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  sub: { fontSize: 18, fontWeight: '600', marginVertical: 8, color: '#333' },
  movItem: { padding: 12, backgroundColor: '#f7f7f7', borderRadius: 8, marginBottom: 8, borderLeftWidth: 6 },
  movText: { fontSize: 16 },
  movDate: { color: '#666', fontSize: 12, marginTop: 6 },
});
