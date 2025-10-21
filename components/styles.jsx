// src/components/styles.js
import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#0A4C9B',
  background: '#EFEFEF',
  white: '#FFF',
  darkText: '#333',
  lightText: '#666',
  divider: '#DDD',
  red: 'red',
};

export const GlobalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  // Estilo para a Barra de Busca
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  // Estilo para lista vazia
  emptyListContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 5,
  },
});