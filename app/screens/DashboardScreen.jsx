import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEstoque } from '../context/EstoqueContext';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function DashboardScreen() {
  const { bebidas, pereciveis, naoPereciveis, movimentacoes } = useEstoque();

  const bebidasCount = bebidas?.reduce((s, p) => s + (p.quantidade || 0), 0) || 0;
  const pereciveisCount = pereciveis?.reduce((s, p) => s + (p.quantidade || 0), 0) || 0;
  const naoPereciveisCount = naoPereciveis?.reduce((s, p) => s + (p.quantidade || 0), 0) || 0;

  const total = bebidasCount + pereciveisCount + naoPereciveisCount || 1;

  const data = useMemo(() => [
    { name: 'Bebidas', population: bebidasCount, color: '#3498db', legendFontColor: '#333', legendFontSize: 12 },
    { name: 'Perecíveis', population: pereciveisCount, color: '#e74c3c', legendFontColor: '#333', legendFontSize: 12 },
    { name: 'Não Perecíveis', population: naoPereciveisCount, color: '#2ecc71', legendFontColor: '#333', legendFontSize: 12 },
  ], [bebidasCount, pereciveisCount, naoPereciveisCount]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <PieChart data={data} width={Dimensions.get('window').width - 40} height={220} chartConfig={{
        backgroundGradientFrom: '#fff', backgroundGradientTo: '#fff', color: (opacity = 1) => `rgba(0,0,0,${opacity})`
      }} accessor="population" backgroundColor="transparent" paddingLeft="15" />

      <View style={styles.cards}>
        <View style={styles.card}><Text style={styles.cardTitle}>Total itens</Text><Text style={styles.cardValue}>{total}</Text></View>
        <View style={styles.card}><Text style={styles.cardTitle}>Entradas/saídas</Text><Text style={styles.cardValue}>{movimentacoes.length}</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f6fa', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#003366', marginBottom: 10 },
  cards: { width: '100%', marginTop: 20 },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 10 },
  cardTitle: { color: '#333' },
  cardValue: { fontSize: 20, fontWeight: 'bold', color: '#003366' },
});
