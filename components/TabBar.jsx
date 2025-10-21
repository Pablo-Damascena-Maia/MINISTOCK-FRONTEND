// src/components/TabBar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from './styles';

const TAB_BUTTONS = [
  { name: 'Início', icon: 'home', screen: 'Home' },
  { name: 'Novo', icon: 'plus-box', screen: 'Novo' }, // Este será o botão de ação
  { name: 'Relatórios', icon: 'file-document-outline', screen: 'Reports' },
  { name: 'Imp/Exp', icon: 'import', screen: 'ImportExport' },
];

const TabBar = ({ onNavigate }) => (
  <View style={styles.tabBar}>
    {TAB_BUTTONS.map((tab) => (
      <TouchableOpacity
        key={tab.name}
        style={styles.tabButton}
        onPress={() => onNavigate(tab.name)}
      >
        <Icon name={tab.icon} size={24} color={COLORS.white} />
        <Text style={styles.tabText}>{tab.name}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: '#00000030', // Leve sombra
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 10,
    color: COLORS.white,
    marginTop: 2,
  },
});

export default TabBar;