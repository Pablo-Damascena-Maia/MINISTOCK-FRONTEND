// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { COLORS } from './styles';

const Header = ({ title }) => (
  <>
    <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  </>
);

const styles = StyleSheet.create({
  header: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: COLORS.primary,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default Header;