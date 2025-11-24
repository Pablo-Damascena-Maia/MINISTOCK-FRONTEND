import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { EstoqueProvider } from './context/EstoqueContext';

export default function Layout() {
  return (
    <EstoqueProvider>
       
        <AppNavigator />
      
    </EstoqueProvider>
  );
}
