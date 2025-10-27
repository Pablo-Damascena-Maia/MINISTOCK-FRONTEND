import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEstoque } from "../context/EstoqueContext";

export default function PereciveisScreen() {
  const { pereciveis, adicionarProduto, removerProduto } = useEstoque();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const router = useRouter();

  const handleAdd = () => {
    if (!nome || !preco || !quantidade) return;
    const novo = {
      id: Date.now().toString(),
      nome,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade),
    };
    adicionarProduto("pereciveis", novo);
    setNome("");
    setPreco("");
    setQuantidade("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estoque de Pereciveis</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        keyboardType="numeric"
        value={preco}
        onChangeText={setPreco}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Adicionar Produto</Text>
      </TouchableOpacity>

      <FlatList
        data={pereciveis}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.nome} — {item.quantidade} un. — R$ {item.preco.toFixed(2)}
            </Text>
            <TouchableOpacity onPress={() => removerProduto("pereciveis", item.id)}>
              <Text style={styles.delete}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>⬅ Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
  addButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: { fontSize: 16 },
  delete: { fontSize: 18 },
  backButton: { marginTop: 20, alignSelf: "center", backgroundColor: "#ddd", padding: 10, borderRadius: 8 },
  backButtonText: { fontWeight: "bold" },
});
