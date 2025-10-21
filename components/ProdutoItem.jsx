// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// export default function ProdutoItem({ nome, quantidade, preco, onEdit, onDelete }) {
//   return (
//     <View style={styles.container}>
//       <Ionicons name="cube-outline" size={40} color="#004080" />
//       <View style={styles.info}>
//         <Text style={styles.nome}>{nome}</Text>
//         <Text>Quantidade: {quantidade}</Text>
//         <Text>R$ {preco.toFixed(2)}</Text>
//       </View>
//       <View style={styles.acoes}>
//         <TouchableOpacity onPress={onEdit}>
//           <Ionicons name="pencil-outline" size={24} color="#004080" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={onDelete}>
//           <Ionicons name="trash-outline" size={24} color="#004080" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     borderBottomColor: "#ddd",
//     borderBottomWidth: 1,
//   },
//   info: { flex: 1, marginLeft: 10 },
//   nome: { fontWeight: "bold" },
//   acoes: { flexDirection: "row", gap: 10 },
// });
