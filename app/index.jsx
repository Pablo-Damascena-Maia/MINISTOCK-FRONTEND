import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useEstoque } from './context/EstoqueContext';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { bebidas, pereciveis, naoPereciveis } = useEstoque();

  const bebidasCount = bebidas?.length || 0;
  const pereciveisCount = pereciveis?.length || 0;
  const naoPereciveisCount = naoPereciveis?.length || 0;

  const total = bebidasCount + pereciveisCount + naoPereciveisCount || 1;

  const data = [
    { name: 'Bebidas', population: bebidasCount, color: '#3498db' },
    { name: 'Perecíveis', population: pereciveisCount, color: '#e74c3c' },
    { name: 'Não Perecíveis', population: naoPereciveisCount, color: '#2ecc71' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visão Geral do Estoque</Text>

      <PieChart
        data={data.map(d => ({
          ...d,
          population: (d.population / total) * 100,
        }))}
        width={350}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Estoque')}
      >
        <Text style={styles.buttonText}>Ir para Estoques</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  button: {
    backgroundColor: '#003366',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
