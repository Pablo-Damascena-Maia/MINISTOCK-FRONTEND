import { Stack } from 'expo-router';
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { EstoqueProvider } from './context/EstoqueContext';

function RootNavigator() {
  const { autenticado, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!autenticado ? (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <EstoqueProvider>
        <RootNavigator />
      </EstoqueProvider>
    </AuthProvider>
  );
}
