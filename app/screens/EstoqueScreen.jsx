import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEstoque } from '../context/EstoqueContext';

export default function EstoqueScreen() {
  const navigation = useNavigation();
  const { bebidas, pereciveis, naoPereciveis } = useEstoque();
  const [filtro, setFiltro] = useState('todos');

  const produtos = [
    ...bebidas.map((p) => ({ ...p, categoria: 'Bebidas' })),
    ...pereciveis.map((p) => ({ ...p, categoria: 'Perecíveis' })),
    ...naoPereciveis.map((p) => ({ ...p, categoria: 'Não Perecíveis' })),
  ];

  const produtosFiltrados =
    filtro === 'todos'
      ? produtos
      : produtos.filter((p) => p.categoria.toLowerCase() === filtro);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoque Geral</Text>

      {/* Botões de acesso rápido */}
      <View style={styles.accessContainer}>
        <TouchableOpacity
          style={[styles.accessButton, { backgroundColor: '#3498db' }]}
          onPress={() => navigation.navigate('Bebidas')}
        >
          <Text style={styles.accessText}>🍹 Bebidas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.accessButton, { backgroundColor: '#e74c3c' }]}
          onPress={() => navigation.navigate('Pereciveis')}
        >
          <Text style={styles.accessText}>🥩 Perecíveis</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.accessButton, { backgroundColor: '#2ecc71' }]}
          onPress={() => navigation.navigate('NaoPereciveis')}
        >
          <Text style={styles.accessText}>🍪 Não Perecíveis</Text>
        </TouchableOpacity>
      </View>

      {/* Filtros */}
      <View style={styles.filterContainer}>
        {['todos', 'bebidas', 'perecíveis', 'não perecíveis'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterButton,
              filtro === cat && styles.filterButtonActive,
            ]}
            onPress={() => setFiltro(cat)}
          >
            <Text
              style={[
                styles.filterText,
                filtro === cat && styles.filterTextActive,
              ]}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de produtos */}
      {produtosFiltrados.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
      ) : (
        <FlatList
          data={produtosFiltrados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.info}>Categoria: {item.categoria}</Text>
              <Text style={styles.info}>Quantidade: {item.quantidade}</Text>
              <Text style={styles.preco}>
                Preço: R$ {item.preco?.toFixed(2) || '0.00'}
              </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 20,
  },

  // === Botões de acesso rápido ===
  accessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  accessButton: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  accessText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },

  // === Filtros ===
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#003366',
  },
  filterText: {
    color: '#333',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  filterTextActive: {
    color: '#fff',
  },

  // === Cards ===
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#003366' },
  info: { fontSize: 14, color: '#555' },
  preco: { fontSize: 14, color: '#27ae60', marginTop: 5 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 20 },
});
