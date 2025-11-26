import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useEstoque } from '../context/EstoqueContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EstoqueScreen() {
  const router = useRouter();
  const { bebidas, pereciveis, naoPereciveis, carregarProdutosDoServidor } = useEstoque();

  useEffect(() => {
    carregarProdutosDoServidor();
  }, []);

  const navigateTo = (route) => {
    router.push(`/estoque/${route}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="cube" size={48} color="#003366" />
        <Text style={styles.title}>Gerenciar Estoques</Text>
        <Text style={styles.subtitle}>Selecione uma categoria para gerenciar</Text>
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#0077cc' }]} 
          onPress={() => navigateTo('bebidas')}
          activeOpacity={0.8}
        >
          <View style={styles.cardIconContainer}>
            <Ionicons name="beer" size={48} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>Estoque de Bebidas</Text>
          <View style={styles.cardBadge}>
            <Text style={styles.cardBadgeText}>{bebidas.length} produtos</Text>
          </View>
          <View style={styles.cardArrow}>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#28a745' }]} 
          onPress={() => navigateTo('pereciveis')}
          activeOpacity={0.8}
        >
          <View style={styles.cardIconContainer}>
            <Ionicons name="nutrition" size={48} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>Itens Perecíveis</Text>
          <View style={styles.cardBadge}>
            <Text style={styles.cardBadgeText}>{pereciveis.length} produtos</Text>
          </View>
          <View style={styles.cardArrow}>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#ffc107' }]} 
          onPress={() => navigateTo('nao-pereciveis')}
          activeOpacity={0.8}
        >
          <View style={styles.cardIconContainer}>
            <Ionicons name="cube" size={48} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>Não Perecíveis</Text>
          <View style={styles.cardBadge}>
            <Text style={styles.cardBadgeText}>{naoPereciveis.length} produtos</Text>
          </View>
          <View style={styles.cardArrow}>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Text style={styles.footerLabel}>Total de Produtos</Text>
          <Text style={styles.footerValue}>
            {bebidas.length + pereciveis.length + naoPereciveis.length}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f6fa',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#003366', 
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  cardsContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    minHeight: 120,
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  cardIconContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  cardTitle: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 20,
    marginLeft: 80,
    marginBottom: 8,
  },
  cardBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginLeft: 80,
  },
  cardBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  cardArrow: {
    position: 'absolute',
    right: 20,
    top: '50%',
    marginTop: -12,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  footerItem: {
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  footerValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#003366',
  },
});
