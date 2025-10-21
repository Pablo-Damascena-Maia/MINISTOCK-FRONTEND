// src/screens/EstoqueSimplesScreen.js

import React, { useState } from 'react';
import {  View,  Text,  FlatList,  TextInput,  SafeAreaView,  Alert,  Modal,  TouchableOpacity,  StyleSheet,} from 'react-native';

// Importa componentes e estilos (Assumindo que você manteve a estrutura de arquivos)
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import ProductItem from '../components/ProductItem';
import { GlobalStyles, COLORS } from '../components/styles'; // Assumindo estilos compartilhados

/**
 * Componente funcional para a tela principal (Estoque/Inventário)
 */
const EstoqueSimplesScreen = () => {
  const [produtos, setProdutos] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [nextProductId, setNextProductId] = useState(1);

  // --- Estados do Modal de Cadastro/Edição ---
  const [modalVisible, setModalVisible] = useState(false);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState(null); // Armazena o ID do produto sendo editado (null para adição)
  
  // Campos do formulário
  const [nomeProduto, setNomeProduto] = useState('');
  const [quantidadeProduto, setQuantidadeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');


  // --- FUNÇÕES DE AÇÃO DA LISTA ---

  // Botão 1: DELETAR
  const handleDeletarProduto = (id) => {
  Alert.alert(
    'Atenção',
    'Tem certeza que deseja deletar este produto?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Deletar',
        onPress: () => {
          // Lógica de remoção do produto do estado:
          setProdutos((current) => current.filter((p) => p.id !== id));
        },
        style: 'destructive',
      },
    ],
  );
};

  // Botão 2: EDITAR (Prepara o modal para edição)
  const handleEditarProduto = (id) => {
    const produto = produtos.find(p => p.id === id);
    if (produto) {
      // 1. Define que estamos em modo de edição
      setProdutoEmEdicao(id); 
      // 2. Preenche os estados do formulário com os dados do produto
      setNomeProduto(produto.nome);
      setQuantidadeProduto(produto.quantidade.toString());
      setPrecoProduto(produto.preco.toString().replace(',', '.')); // Garante que o input seja preenchido com '.'
      // 3. Abre o modal
      setModalVisible(true);
    }
  };


  // --- FUNÇÕES DO MODAL ---

  // Limpa e fecha o modal
  const closeModal = () => {
    setModalVisible(false);
    setNomeProduto('');
    setQuantidadeProduto('');
    setPrecoProduto('');
    setProdutoEmEdicao(null); // Reseta o modo de edição
  };

  // Lógica Única para salvar (Adicionar ou Editar)
  const handleSaveProduct = () => {
    // Validação
    const precoFloat = parseFloat(precoProduto.replace(',', '.'));
    const quantidadeInt = parseInt(quantidadeProduto);

    if (!nomeProduto || isNaN(quantidadeInt) || isNaN(precoFloat) || quantidadeInt < 0 || precoFloat < 0) {
        Alert.alert("Erro", "Por favor, preencha todos os campos corretamente. Quantidade e Preço devem ser números válidos.");
        return;
    }
    
    const produtoFinal = {
        nome: nomeProduto,
        quantidade: quantidadeInt,
        preco: precoFloat.toFixed(2),
    };

    if (produtoEmEdicao) {
        // --- MODO EDIÇÃO ---
        setProdutos(produtos.map(p => 
            p.id === produtoEmEdicao ? { ...p, ...produtoFinal } : p
        ));
        Alert.alert('Sucesso', `${nomeProduto} atualizado!`);

    } else {
        // --- MODO ADIÇÃO (NOVO) ---
        const newProduct = {
            ...produtoFinal,
            id: `produto-${nextProductId}`, // Gera um novo ID
        };

        setProdutos([newProduct, ...produtos]);
        setNextProductId(nextProductId + 1);
        Alert.alert('Sucesso', `${nomeProduto} adicionado!`);
    }

    closeModal(); // Fecha o modal e limpa os campos
  };

  // --- FUNÇÕES DA TAB BAR ---

  const handleNavegacao = (nomeTela) => {
    if (nomeTela === 'Novo') {
      // Abre o modal em modo de adição (produtoEmEdicao é null)
      closeModal(); // Garante que o estado de edição esteja limpo
      setModalVisible(true);
      return;
    }

    Alert.alert('Navegação', `Navegar para: ${nomeTela}`);
  };

  // --- Lógica de Busca ---
  const produtosFiltrados = produtos.filter(
    (item) =>
      item.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      item.id.includes(termoBusca)
  );

  return (
    <SafeAreaView style={GlobalStyles.safeArea}>
      
      {/* HEADER */}
      <Header title="Inventário Completo" />

      {/* BARRA DE BUSCA */}
      <View style={GlobalStyles.searchContainer}>
        <TextInput
          style={GlobalStyles.searchInput}
          placeholder="Buscar produto ou ID..."
          placeholderTextColor="#666"
          value={termoBusca}
          onChangeText={setTermoBusca}
        />
      </View>

      {/* LISTA DE PRODUTOS */}
      <FlatList
        data={produtosFiltrados}
        renderItem={({ item }) => (
          <ProductItem 
            item={item} 
            onEdit={handleEditarProduto} 
            onDelete={handleDeletarProduto} // <--- ESTE DEVE ESTAR CORRETO
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ backgroundColor: COLORS.background }}
        ListEmptyComponent={() => (
          <View style={GlobalStyles.emptyListContainer}>
            <Text style={GlobalStyles.emptyListText}>Nenhum produto em estoque.</Text>
            <Text style={GlobalStyles.emptyListText}>Aperte 'Novo' para cadastrar o primeiro item.</Text>
          </View>
        )}
      />

      {/* TAB BAR */}
      <TabBar onNavigate={handleNavegacao} />

      {/* MODAL DE CADASTRO/EDIÇÃO */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            {/* Título Dinâmico */}
            <Text style={modalStyles.modalTitle}>
                {produtoEmEdicao ? 'Editar Produto' : 'Adicionar Novo Produto'}
            </Text>

            {/* Input Nome */}
            <TextInput
              style={modalStyles.input}
              placeholder="Nome do Produto"
              value={nomeProduto}
              onChangeText={setNomeProduto}
            />

            {/* Input Quantidade */}
            <TextInput
              style={modalStyles.input}
              placeholder="Quantidade"
              value={quantidadeProduto}
              onChangeText={setQuantidadeProduto}
              keyboardType="numeric"
            />

            {/* Input Preço */}
            <TextInput
              style={modalStyles.input}
              placeholder="Preço (ex: 12.50)"
              value={precoProduto.replace('.', ',')} // Exibe com vírgula para o usuário
              onChangeText={text => setPrecoProduto(text.replace(',', '.'))} // Salva com ponto no estado
              keyboardType="numeric"
            />
            
            {/* Botões de Ação do Modal */}
            <View style={modalStyles.buttonContainer}>
              <TouchableOpacity
                style={[modalStyles.button, modalStyles.buttonClose]}
                onPress={closeModal}
              >
                <Text style={modalStyles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[modalStyles.button, modalStyles.buttonSave]}
                onPress={handleSaveProduct}
              >
                <Text style={modalStyles.textStyle}>
                    {produtoEmEdicao ? 'Salvar Edição' : 'Salvar Produto'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

// --- Estilos Específicos do Modal ---
const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '85%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: COLORS.darkText,
    },
    input: {
        height: 45,
        width: '100%',
        backgroundColor: '#F9F9F9',
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: COLORS.divider,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        borderRadius: 5,
        padding: 12,
        elevation: 2,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonClose: {
        backgroundColor: '#999',
    },
    buttonSave: {
        backgroundColor: COLORS.primary,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default EstoqueSimplesScreen;