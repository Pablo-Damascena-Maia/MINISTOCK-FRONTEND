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
      <Ionicons name="cube-outline" size={80} color="#003366" style={styles.logo} />
      <Text style={styles.title}>MiniStock</Text>
      <Text style={styles.subtitle}>Seu Sistema de Gerenciamento de Estoque</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Use as abas abaixo para navegar:</Text>
        <View style={styles.infoItem}>
          <Ionicons name="stats-chart-outline" size={18} color="#003366" style={{ marginRight: 8 }} />
          <Text style={styles.infoTextItem}>Dashboard - Visualize estatísticas</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="cube-outline" size={18} color="#003366" style={{ marginRight: 8 }} />
          <Text style={styles.infoTextItem}>Estoque - Gerencie produtos</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="swap-horizontal-outline" size={18} color="#003366" style={{ marginRight: 8 }} />
          <Text style={styles.infoTextItem}>Movimentação - Registre entradas/saídas</Text>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 15,
  },
  infoTextItem: {
    fontSize: 14,
    color: '#555',
  },
  logo: {
    marginBottom: 20,
  },
  infoItem: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    width: '90%',
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
