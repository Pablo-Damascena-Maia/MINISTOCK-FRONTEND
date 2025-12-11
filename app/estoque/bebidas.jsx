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

export default function BebidasScreen() {
  const { bebidas, carregarProdutosDoServidor, loading } = useEstoque();
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    quantidadeEstoque: '',
    codigoBarras: '',
    imagemUrl: '',
    dataEntrada: "2025-12-02T14:59:51.544Z",
    usuarioId: 2,
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


      });
    } else {
      setEditMode(false);
      setCurrentProduct(null);
      setFormData({
        nome: '',
        descricao: '',
        quantidadeEstoque: '',


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
      Alert.alert('Erro', 'O nome do produto e obrigatorio');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        nome: formData.nome,
        descricao: formData.descricao,
        quantidadeEstoque: parseInt(formData.quantidadeEstoque) || 0,
        codigoBarras: '',
        imagemUrl: '',
        ativo: true,
        status: 1,
        dataEntrada: "2025-12-02T14:59:51.544Z",
        usuarioId: 2,
        categoria_produtoId: 1, // ID da categoria "Bebidas" - ajustar conforme seu backend
      };

      // Campos adicionais necessarios para o backend (se n?o forem enviados, o backend pode dar 403)
      const requiredPayload = {
        ...payload,
        imagemDataEntrada: currentProduct?.imagemDataEntrada || '', // Garantir que o campo exista
        usuarioId: currentProduct?.usuarioId || 1, // Assumir um ID de usuario padrao se nao estiver logado
      };

      if (editMode && currentProduct) {
        await atualizarProduto({
          ...requiredPayload,
          id: currentProduct.id,
          quantidade: requiredPayload.quantidadeEstoque, // alguns backends esperam "quantidade"
          categoria_produtoId: 1,
        });
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
        await carregarProdutosDoServidor();
        handleCloseModal();
        return;
      }

      await criarProduto(payload);
      await carregarProdutosDoServidor();
      handleCloseModal(); // fecha o modal para nao reabrir cadastro
      Alert.alert('Bebida cadastrada', `A bebida "${formData.nome}" foi cadastrada com sucesso!`);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.mensagem ||
        error?.message ||
        'Nao foi possivel salvar o produto';
      Alert.alert('Erro', message);
    } finally {
      setSaving(false);
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
              setDeletingId(product.id);
	              // O endpoint de apagar pode exigir o ID do usuário ou outros campos
	              // Para garantir, vamos enviar o ID do produto e um ID de usuário padrão
              await apagarProduto(product.id, {
                usuarioId: product.usuarioId || 1,
                categoria_produtoId: 1,
              });
              Alert.alert('Sucesso', 'Produto excluído com sucesso!');
              carregarProdutosDoServidor();
            } catch (error) {
              console.error('Erro ao excluir produto:', error);
              const message =
                error?.response?.data?.message ||
                error?.response?.data?.mensagem ||
                error?.message ||
                'Não foi possível excluir o produto';
              Alert.alert('Erro', message);
            }
            setDeletingId(null);
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
            disabled={saving || deletingId === item.id}
          >
            <Ionicons name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#dc3545' }]}
            onPress={() => handleDelete(item)}
            disabled={saving || deletingId === item.id}
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
        <ActivityIndicator size="large" color="#0077cc" />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Estoque de Bebidas</Text>
        <Text style={styles.headerSubtitle}>Total: {bebidas.length} produtos</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => handleOpenModal()}>
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Adicionar Bebida</Text>
      </TouchableOpacity>

      {bebidas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="beer-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>Nenhuma bebida cadastrada</Text>
          <Text style={styles.emptySubtext}>Toque no botão acima para adicionar</Text>
        </View>
      ) : (
        <FlatList
          data={bebidas}
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
                {editMode ? 'Editar Bebida' : 'Nova Bebida'}
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
                disabled={saving}
              >
                <Text style={styles.buttonText}>{saving ? 'Salvando...' : 'Salvar'}</Text>
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
    backgroundColor: '#0077cc',
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
    color: '#e0e0e0',
    marginTop: 5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28a745',
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
    color: '#0077cc',
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