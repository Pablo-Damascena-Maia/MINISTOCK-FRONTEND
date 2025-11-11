import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { EstoqueProvider } from './context/EstoqueContext';

export default function App() {
  return (
    <EstoqueProvider>
      
        <AppNavigator />
      
    </EstoqueProvider>
  );
}
