// import React from "react";
// import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
// import { PieChart } from "react-native-chart-kit";

// export default function HomeScreen({ navigation }) {
//   const data = [
//     { name: "Bebidas", population: 12, color: "#0077b6", legendFontColor: "#fff", legendFontSize: 14 },
//     { name: "Perecíveis", population: 8, color: "#00b4d8", legendFontColor: "#fff", legendFontSize: 14 },
//     { name: "Não Perecíveis", population: 10, color: "#90e0ef", legendFontColor: "#fff", legendFontSize: 14 },
//   ];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>MINISTOCK 🏷️</Text>
//       <Text style={styles.subtitle}>Controle de Estoques</Text>

//       <PieChart
//         data={data}
//         width={Dimensions.get("window").width - 40}
//         height={220}
//         chartConfig={{
//           color: () => `rgba(255, 255, 255, 1)`,
//         }}
//         accessor={"population"}
//         backgroundColor={"transparent"}
//         paddingLeft={"15"}
//         absolute
//       />

//       <View style={styles.buttonContainer}>
//         <Pressable style={styles.button} onPress={() => navigation.navigate("Bebidas")}>
//           <Text style={styles.buttonText}>Bebidas 🍹</Text>
//         </Pressable>
//         <Pressable style={styles.button} onPress={() => navigation.navigate("Pereciveis")}>
//           <Text style={styles.buttonText}>Itens Perecíveis 🧀</Text>
//         </Pressable>
//         <Pressable style={styles.button} onPress={() => navigation.navigate("NaoPereciveis")}>
//           <Text style={styles.buttonText}>Itens Não Perecíveis 📦</Text>
//         </Pressable>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#0d1b2a", alignItems: "center", paddingTop: 60 },
//   title: { color: "#fff", fontSize: 28, fontWeight: "bold" },
//   subtitle: { color: "#ccc", fontSize: 16, marginBottom: 30 },
//   buttonContainer: { marginTop: 40, gap: 15 },
//   button: { backgroundColor: "#1b263b", paddingVertical: 14, paddingHorizontal: 40, borderRadius: 12 },
//   buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
// });
