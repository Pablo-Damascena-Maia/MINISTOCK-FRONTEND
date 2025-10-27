import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useRouter } from "expo-router";
import { useEstoque } from "../context/EstoqueContext";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const router = useRouter();
  const { bebidas, pereciveis, naoPereciveis } = useEstoque();

  const totalBebidas = bebidas.length;
  const totalPereciveis = pereciveis.length;
  const totalNaoPereciveis = naoPereciveis.length;

  const total = totalBebidas + totalPereciveis + totalNaoPereciveis || 1;

  const data = [
    {
      name: "Bebidas",
      population: totalBebidas,
      color: "#36A2EB",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Perecíveis",
      population: totalPereciveis,
      color: "#da1d1dff",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Não Perecíveis",
      population: totalNaoPereciveis,
      color: "#96741fff",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoque Geral</Text>

      <PieChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/BebidasScreen")}>
          <Text style={styles.buttonText}>Bebidas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/PereciveisScreen")}>
          <Text style={styles.buttonText}>Itens Perecíveis</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/NaoPereciveisScreen")}>
          <Text style={styles.buttonText}>Itens Não Perecíveis</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#b8b085ff", paddingTop: 50 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  buttonsContainer: { marginTop: 30, width: "100%", alignItems: "center" },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 8,
    width: "80%",
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
