import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useEstoque } from '../context/EstoqueContext';
import { PieChart } from 'react-native-chart-kit';

export default function DashboardScreen() {
  const { bebidas, pereciveis, naoPereciveis } = useEstoque();

  const total =
    bebidas.length + pereciveis.length + naoPereciveis.length || 0;

  const data = [
    {
      name: 'Bebidas',
      population: bebidas.length,
      color: '#3498db',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'Perecíveis',
      population: pereciveis.length,
      color: '#e74c3c',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
    {
      name: 'Não Perecíveis',
      population: naoPereciveis.length,
      color: '#2ecc71',
      legendFontColor: '#333',
      legendFontSize: 14,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard do Estoque</Text>

      <PieChart
        data={data}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />

      <View style={styles.statsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total de Itens</Text>
          <Text style={styles.cardValue}>{total}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bebidas</Text>
          <Text style={styles.cardValue}>{bebidas.length}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Perecíveis</Text>
          <Text style={styles.cardValue}>{pereciveis.length}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Não Perecíveis</Text>
          <Text style={styles.cardValue}>{naoPereciveis.length}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#003366',
  },
  statsContainer: {
    width: '100%',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
  },
  cardValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
  },
});
