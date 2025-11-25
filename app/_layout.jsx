import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { EstoqueProvider } from './context/EstoqueContext';
import AppNavigator from './navigation/AppNavigator';

export default function RootLayout() {
  return (
    <AuthProvider>
      <EstoqueProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </EstoqueProvider>
    </AuthProvider>
  );
}
