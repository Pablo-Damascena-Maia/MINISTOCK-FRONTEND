import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useEstoque } from './context/EstoqueContext';

export default function HomeScreen({ navigation }) {
  const { bebidas, pereciveis, naoPereciveis } = useEstoque();

  const bebidasCount = bebidas?.reduce((s, p) => s + (p.quantidade || 0), 0) || 0;
  const pereciveisCount = pereciveis?.reduce((s, p) => s + (p.quantidade || 0), 0) || 0;
  const naoPereciveisCount = naoPereciveis?.reduce((s, p) => s + (p.quantidade || 0), 0) || 0;

  const total = bebidasCount + pereciveisCount + naoPereciveisCount || 1;

  const data = useMemo(() => {
    return [
      { name: 'Bebidas', population: bebidasCount, color: '#3498db', legendFontColor: '#333', legendFontSize: 12 },
      { name: 'Perecíveis', population: pereciveisCount, color: '#e74c3c', legendFontColor: '#333', legendFontSize: 12 },
      { name: 'Não Perecíveis', population: naoPereciveisCount, color: '#2ecc71', legendFontColor: '#333', legendFontSize: 12 },
    ];
  }, [bebidasCount, pereciveisCount, naoPereciveisCount]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo do Estoque</Text>

      <PieChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />

      <View style={styles.stats}>
        <Text style={styles.statText}>Total: {total}</Text>
        <Text style={styles.statText}>Bebidas: {bebidasCount}</Text>
        <Text style={styles.statText}>Perecíveis: {pereciveisCount}</Text>
        <Text style={styles.statText}>Não Perecíveis: {naoPereciveisCount}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Estoque')}>
        <Text style={styles.buttonText}>Ir para Estoques</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', alignItems: 'center', paddingTop: 40 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#003366', marginBottom: 10 },
  stats: { marginTop: 20, alignItems: 'center' },
  statText: { fontSize: 16, color: '#333', marginVertical: 4 },
  button: { marginTop: 20, backgroundColor: '#003366', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
