import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { atualizarProduto } from '../../../../services/produtoSupabaseService';
import { useEstoque } from '../../../context/EstoqueContext';

export default function EditarProdutoScreen() {
  const { id } = useLocalSearchParams();
  const { bebidas, pereciveis, naoPereciveis, carregarProdutosDoServidor } = useEstoque();
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const todosProdutos = [...bebidas, ...pereciveis, ...naoPereciveis];
    const produto = todosProdutos.find((p) => p.id === id);
    if (produto) {
      setNome(produto.nome);
      setQuantidade(produto.quantidade.toString());
      setPreco(produto.preco.toString());
      setCategoria(produto.categoria);
    }
  }, [id, bebidas, pereciveis, naoPereciveis]);

  async function handleAtualizar() {
    if (!nome || !quantidade || !categoria) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios');
      return;
    }

    setLoading(true);
    const resultado = await atualizarProduto(id, {
      nome,
      quantidade,
      preco,
      categoria,
    });

    if (resultado.sucesso) {
      Alert.alert('Sucesso', 'Produto atualizado');
      await carregarProdutosDoServidor();
      router.back();
    } else {
      Alert.alert('Erro', resultado.erro || 'Erro ao atualizar');
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Editar Produto</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome *</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Quantidade *</Text>
        <TextInput
          style={styles.input}
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Preço</Text>
        <TextInput
          style={styles.input}
          value={preco}
          onChangeText={setPreco}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Categoria *</Text>
        <View style={styles.categorias}>
          {['bebidas', 'pereciveis', 'naoPereciveis'].map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.catBtn, categoria === cat && styles.catBtnSelected]}
              onPress={() => setCategoria(cat)}
            >
              <Text
                style={[
                  styles.catBtnText,
                  categoria === cat && styles.catBtnTextSelected,
                ]}
              >
                {cat === 'bebidas' ? 'Bebidas' : cat === 'pereciveis' ? 'Perecíveis' : 'Não Perecíveis'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleAtualizar}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Atualizando...' : 'Atualizar'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backBtn: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
    flex: 1,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  categorias: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  catBtn: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  catBtnSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  catBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  catBtnTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
