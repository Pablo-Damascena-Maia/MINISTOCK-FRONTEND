// import React, { useState } from "react";
// import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
// import ProdutoItem from "../components/ProdutoItem";
// import BottomNav from "../components/BottomNav";

// export default function EstoqueScreen() {
//   // const [busca, setBusca] = useState("");
//   // const [produtos, setProdutos] = useState([
//   //   { id: "1", nome: "Produto 1", quantidade: 10, preco: 5.5 },
//   //   { id: "2", nome: "Produto 2", quantidade: 5, preco: 3.5 },
//   //   { id: "3", nome: "Produto 3", quantidade: 26, preco: 6.9 },
//   //   { id: "4", nome: "Produto 4", quantidade: 12, preco: 1.99 },
//   // ]);
//   const [tasks, setTasks] = useState([]);

//   const addTask = (content) => {
//     if (content.trim()) {
//       setTasks((prev) => [
//         ...prev,
//         { id: Date.now().toString(), content: content.trim(), done: false },
//       ]);
//     }
//   };
  

//   const filtrados = produtos.filter((p) =>
//     p.nome.toLowerCase().includes(busca.toLowerCase())
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.titulo}>Minestock</Text>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder="Buscar por..."
//         value={busca}
//         onChangeText={setBusca}
//       />

//       <FlatList
//         data={filtrados}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <ProdutoItem
//             nome={item.nome}
//             quantidade={item.quantidade}
//             preco={item.preco}
//             onEdit={() => {}}
//             onDelete={() => {}}
//           />
//         )}
//       />

//       <BottomNav />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   header: {
//     backgroundColor: "#004080",
//     paddingVertical: 15,
//     alignItems: "center",
//   },
//   titulo: { color: "#fff", fontSize: 20, fontWeight: "bold" },
//   input: {
//     backgroundColor: "#f0f0f0",
//     margin: 10,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 40,
//   },
// });
