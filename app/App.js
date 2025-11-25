import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { EstoqueProvider } from "./context/EstoqueContext";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
        <AppNavigator />
    </AuthProvider>
  );
}
