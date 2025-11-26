import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEstoque } from '../../context/EstoqueContext';
import { deletarProduto } from '../../../services/produtoSupabaseService';

export default function CategoriaScreen() {
  const { categoria } = useLocalSearchParams();
  const { bebidas, pereciveis, naoPereciveis } = useEstoque();
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const mapa = {
      bebidas: bebidas,
      pereciveis: pereciveis,
      naoPereciveis: naoPereciveis,
    };
    setProdutos(mapa[categoria] || []);
  }, [categoria, bebidas, pereciveis, naoPereciveis]);

  const nomeCategoria = {
    bebidas: 'Bebidas',
    pereciveis: 'Itens Perecíveis',
    naoPereciveis: 'Não Perecíveis',
  };

  async function handleDeletar(produtoId) {
    Alert.alert('Confirmar', 'Deseja deletar este produto?', [
      { text: 'Cancelar', onPress: () => {} },
      {
        text: 'Deletar',
        onPress: async () => {
          const resultado = await deletarProduto(produtoId);
          if (resultado.sucesso) {
            Alert.alert('Sucesso', 'Produto deletado');
            router.back();
          } else {
            Alert.alert('Erro', resultado.erro);
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{nomeCategoria[categoria]}</Text>
      </View>

      {produtos.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhum produto nesta categoria</Text>
        </View>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.produtoNome}>{item.nome}</Text>
                <Text style={styles.produtoInfo}>Qtd: {item.quantidade}</Text>
                {item.preco > 0 && <Text style={styles.produtoInfo}>R$ {item.preco.toFixed(2)}</Text>}
              </View>
              <View style={styles.cardButtons}>
                <TouchableOpacity
                  style={styles.btnEditar}
                  onPress={() => router.push(`/(tabs)/estoque/editar/${item.id}`)}
                >
                  <Text style={styles.btnText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnDeletar}
                  onPress={() => handleDeletar(item.id)}
                >
                  <Text style={styles.btnText}>Deletar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
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
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  card: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  produtoInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  cardButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  btnEditar: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnDeletar: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
