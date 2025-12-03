import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useEstoque } from '../context/EstoqueContext';
import { criarProduto, atualizarProduto, apagarProduto } from '../../services/produtoService';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function NaoPereciveisScreen() {
  const { naoPereciveis, carregarProdutosDoServidor, loading } = useEstoque();
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    quantidadeEstoque: '',
    dataEntrada: "2025-12-02T14:59:51.544Z",
    usuarioId: 2,
    
    codigoBarras: '',
    categoria_produtoId: 1
    
  });

  useEffect(() => {
    carregarProdutosDoServidor();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditMode(true);
      setCurrentProduct(product);
      setFormData({
        nome: product.nome || '',
        descricao: product.descricao || '',
        quantidadeEstoque: String(product.quantidade || product.quantidadeEstoque || ''),
        dataEntrada: product.dataEntrada || "2025-12-02T14:59:51.544Z",
        usuarioId: product.usuarioId || 2,
        codigoBarras: product.codigoBarras || '',
        categoria_produtoId: 1
        


      });
    } else {
      setEditMode(false);
      setCurrentProduct(null);
      setFormData({
        nome: '',
        descricao: '',
        quantidadeEstoque: '',
        dataEntrada: "2025-12-02T14:59:51.544Z",
        usuarioId: 2,
        codigoBarras: '',
        categoria_produtoId: 1



      });
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditMode(false);
    setCurrentProduct(null);
  };

  const handleSave = async () => {
    if (!formData.nome.trim()) {
      Alert.alert('Erro', 'O nome do produto é obrigatório');
      return;
    }

    try {
      const payload = {
        nome: formData.nome,
        descricao: formData.descricao,
        quantidadeEstoque: parseInt(formData.quantidadeEstoque) || 0,
        dataEntrada: "2025-12-02T14:59:51.544Z",
        usuarioId: 2,
        
        categoria_produtoId: 1, // ID da categoria "Não Perecíveis" - ajustar conforme seu backend
        
      };

      if (editMode && currentProduct) {
        await atualizarProduto({ ...payload, id: currentProduct.id });
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      } else {
        await criarProduto(payload);
        Alert.alert('Sucesso', 'Produto criado com sucesso!');
      }

      handleCloseModal();
      carregarProdutosDoServidor();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      Alert.alert('Erro', 'Não foi possível salvar o produto');
    }
  };

  const handleDelete = (product) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja realmente excluir "${product.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await apagarProduto(product.id);
              Alert.alert('Sucesso', 'Produto excluído com sucesso!');
              carregarProdutosDoServidor();
            } catch (error) {
              console.error('Erro ao excluir produto:', error);
              Alert.alert('Erro', 'Não foi possível excluir o produto');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.nome}</Text>
          {item.descricao ? <Text style={styles.cardDescription}>{item.descricao}</Text> : null}
          <Text style={styles.cardQuantity}>
            Quantidade: {item.quantidade || item.quantidadeEstoque || 0}
          </Text>

        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#ffc107' }]}
            onPress={() => handleOpenModal(item)}
          >
            <Ionicons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#dc3545' }]}
            onPress={() => handleDelete(item)}
          >
            <Ionicons name="trash" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffc107" />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Itens Não Perecíveis</Text>
        <Text style={styles.headerSubtitle}>Total: {naoPereciveis.length} produtos</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => handleOpenModal()}>
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Adicionar Não Perecível</Text>
      </TouchableOpacity>

      {naoPereciveis.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cube-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Nenhum item não perecível cadastrado</Text>
          <Text style={styles.emptySubtext}>Toque no botão acima para adicionar</Text>
        </View>
      ) : (
        <FlatList
          data={naoPereciveis}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Modal de Adicionar/Editar */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editMode ? 'Editar Não Perecível' : 'Novo Não Perecível'}
              </Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <Ionicons name="close" size={28} color="#003366" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Nome *"
              value={formData.nome}
              onChangeText={(text) => setFormData({ ...formData, nome: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={formData.descricao}
              onChangeText={(text) => setFormData({ ...formData, descricao: text })}
              multiline
            />

            <TextInput
              style={styles.input}
              placeholder="Quantidade"
              value={formData.quantidadeEstoque}
              onChangeText={(text) => setFormData({ ...formData, quantidadeEstoque: text })}
              keyboardType="numeric"
            />





            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={handleCloseModal}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: '#ffc107',
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0077cc',
    margin: 16,
    padding: 14,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cardQuantity: {
    fontSize: 14,
    color: '#ffc107',
    fontWeight: '600',
    marginTop: 4,
  },
  cardBarcode: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
