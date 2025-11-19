import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { EstoqueProvider } from './context/EstoqueContext';

export default function Layout() {
  return (
    <EstoqueProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </EstoqueProvider>
  );
}
