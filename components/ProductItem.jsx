// src/components/ProductItem.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Importa ícones. Certifique-se de ter 'react-native-vector-icons' instalado.
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

// Importa cores. (Ajuste o caminho se necessário)
import { COLORS } from './styles'; 

/**
 * Componente ProductItem
 * * Recebe o item e as funções de ação do componente pai (EstoqueSimplesScreen).
 */
const ProductItem = ({ item, onEdit, onDelete }) => {
  // item: { id: string, nome: string, quantidade: number, preco: string }
  // onEdit: função que recebe o ID
  // onDelete: função que recebe o ID

  return (
    <View style={styles.itemContainer}>
      
      {/* Coluna 1: Ícone da caixa */}
      <View style={styles.iconColumn}>
        <Icon name="package-variant-closed" size={30} color={COLORS.primary} />
      </View>

      {/* Coluna 2: Informações do produto */}
      <View style={styles.infoColumn}>
        <Text style={styles.productName}>{item.nome}</Text>
        <Text style={styles.productDetail}>
          Quantidade: {item.quantidade}
        </Text>
        <Text style={styles.productDetail}>
          {/* Formata o preço com vírgula para exibição */}
          R$ {item.preco.toString().replace('.', ',')}
        </Text>
      </View>

      {/* Coluna 3: Ações (Editar e Deletar) */}
      <View style={styles.actionsColumn}>
        
        {/* Botão EDITAR (Chama onEdit) */}
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => onEdit(item.id)}
        >
          <FeatherIcon name="edit" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        
        {/* Botão DELETAR (Lixeira Vermelha) (Chama onDelete) */}
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => onDelete(item.id)} 
        >
          <FeatherIcon name="trash-2" size={20} color={COLORS.red} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Estilos Específicos do Item ---
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  iconColumn: {
    marginRight: 15,
  },
  infoColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkText,
  },
  productDetail: {
    fontSize: 14,
    color: COLORS.lightText,
  },
  actionsColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 15,
    padding: 5,
  },
});

export default ProductItem;