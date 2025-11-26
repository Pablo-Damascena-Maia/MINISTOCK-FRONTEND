import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEstoque } from '../context/EstoqueContext';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function DashboardScreen() {
  const { bebidas, pereciveis, naoPereciveis, movimentacoes } = useEstoque();

  const bebidasCount = bebidas?.reduce((s, p) => s + (p.quantidade || 0), 0) || 0;
  const pereciveisCount = pereciveis?.reduce((s, p) => s + (p.quantidade || 0), 0) || 0;
  const naoPereciveisCount = naoPereciveis?.reduce((s, p) => s + (p.quantidade || 0), 0) || 0;

  const total = bebidasCount + pereciveisCount + naoPereciveisCount;
  const totalParaGrafico = total || 1;

  const data = useMemo(() => [
    { name: 'Bebidas', population: bebidasCount, color: '#0077cc', legendFontColor: '#333', legendFontSize: 12 },
    { name: 'Perecíveis', population: pereciveisCount, color: '#28a745', legendFontColor: '#333', legendFontSize: 12 },
    { name: 'Não Perecíveis', population: naoPereciveisCount, color: '#ffc107', legendFontColor: '#333', legendFontSize: 12 },
  ], [bebidasCount, pereciveisCount, naoPereciveisCount]);

  const entradas = movimentacoes.filter(m => m.tipo === 'entrada').length;
  const saidas = movimentacoes.filter(m => m.tipo === 'saida').length;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Visão Geral do Estoque</Text>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Distribuição por Categoria</Text>
        {total === 0 ? (
          <View style={styles.emptyChart}>
            <Ionicons name="pie-chart-outline" size={50} color="#ccc" />
            <Text style={styles.emptyChartText}>Nenhum produto em estoque para exibir</Text>
          </View>
        ) : (
          <PieChart
            data={data}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
              decimalPlaces: 0,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 0]}
            absolute
          />
        )}
      </View>

      <View style={styles.cards}>
        <View style={[styles.card, { backgroundColor: '#003366' }]}>
          <Ionicons name="cube-outline" size={30} color="#fff" />
          <Text style={styles.cardTitleTotal}>Total de Itens</Text>
          <Text style={styles.cardValueTotal}>{total}</Text>
        </View>

        <View style={styles.rowCards}>
          <View style={[styles.cardSmall, { backgroundColor: '#0077cc' }]}>
            <Ionicons name="beer-outline" size={24} color="#fff" />
            <Text style={styles.cardTitleSmall}>Bebidas</Text>
            <Text style={styles.cardValueSmall}>{bebidasCount}</Text>
          </View>
          <View style={[styles.cardSmall, { backgroundColor: '#28a745' }]}>
            <Ionicons name="nutrition-outline" size={24} color="#fff" />
            <Text style={styles.cardTitleSmall}>Perecíveis</Text>
            <Text style={styles.cardValueSmall}>{pereciveisCount}</Text>
          </View>
          <View style={[styles.cardSmall, { backgroundColor: '#ffc107' }]}>
            <Ionicons name="cube-outline" size={24} color="#fff" />
            <Text style={styles.cardTitleSmall}>Não Perecíveis</Text>
            <Text style={styles.cardValueSmall}>{naoPereciveisCount}</Text>
          </View>
        </View>

        <Text style={styles.subTitle}>Movimentações Recentes</Text>
        <View style={styles.rowCards}>
          <View style={[styles.cardSmall, { backgroundColor: '#2ecc71' }]}>
            <Ionicons name="arrow-down-circle-outline" size={24} color="#fff" />
            <Text style={styles.cardTitleSmall}>Entradas</Text>
            <Text style={styles.cardValueSmall}>{entradas}</Text>
          </View>
          <View style={[styles.cardSmall, { backgroundColor: '#e74c3c' }]}>
            <Ionicons name="arrow-up-circle-outline" size={24} color="#fff" />
            <Text style={styles.cardTitleSmall}>Saídas</Text>
            <Text style={styles.cardValueSmall}>{saidas}</Text>
          </View>
          <View style={[styles.cardSmall, { backgroundColor: '#95a5a6' }]}>
            <Ionicons name="list-outline" size={24} color="#fff" />
            <Text style={styles.cardTitleSmall}>Total Movs</Text>
            <Text style={styles.cardValueSmall}>{movimentacoes.length}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#003366', margin: 16 },
  chartContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  emptyChart: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyChartText: {
    marginTop: 10,
    color: '#999',
  },
  cards: { width: '100%', paddingHorizontal: 16 },
  card: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitleTotal: { color: '#fff', fontSize: 16, marginTop: 5 },
  cardValueTotal: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  rowCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  cardSmall: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitleSmall: { color: '#fff', fontSize: 12, marginTop: 5 },
  cardValueSmall: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
});
