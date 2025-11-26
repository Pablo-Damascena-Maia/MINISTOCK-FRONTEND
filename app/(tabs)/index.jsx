import { useRouter } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { logout, autenticado } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!autenticado) {
      router.replace('/(auth)/login');
    }
  }, [autenticado]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="cube-outline" size={40} color="#fff" />
        <Text style={styles.titleHeader}>MiniStock</Text>
        <Text style={styles.subtitleHeader}>Seu Sistema de Gerenciamento de Estoque</Text>
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity style={[styles.card, { backgroundColor: '#0077cc' }]} onPress={() => router.push('/dashboard')}>
          <Ionicons name="stats-chart-outline" size={40} color="#fff" />
          <Text style={styles.cardTitle}>Dashboard</Text>
          <Text style={styles.cardSubtitle}>Visualize estatísticas e relatórios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#28a745' }]} onPress={() => router.push('/estoque')}>
          <Ionicons name="cube-outline" size={40} color="#fff" />
          <Text style={styles.cardTitle}>Estoque</Text>
          <Text style={styles.cardSubtitle}>Gerencie produtos por categoria</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#ffc107' }]} onPress={() => router.push('/movimentacao')}>
          <Ionicons name="swap-horizontal-outline" size={40} color="#fff" />
          <Text style={styles.cardTitle}>Movimentação</Text>
          <Text style={styles.cardSubtitle}>Registre entradas e saídas</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    backgroundColor: '#003366',
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  titleHeader: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subtitleHeader: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 5,
  },
  cardsContainer: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#eee',
    marginTop: 5,
  },


  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
