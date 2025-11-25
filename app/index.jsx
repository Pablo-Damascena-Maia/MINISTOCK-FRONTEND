import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from './context/AuthContext';

export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao MiniStock</Text>
      <Text style={styles.subtitle}>Sistema de Gerenciamento de Estoque</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Use as abas abaixo para navegar:</Text>
        <Text style={styles.infoItem}>Dashboard - Visualize estatísticas</Text>
        <Text style={styles.infoItem}>Estoque - Gerencie produtos</Text>
        <Text style={styles.infoItem}>Movimentação - Registre entradas/saídas</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
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
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 15,
  },
  infoItem: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
