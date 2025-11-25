import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "../context/AuthContext";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainAppNavigator from "./MainAppNavigator";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { autenticado, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
  
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!autenticado ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="MainApp" component={MainAppNavigator} />
        )}
      </Stack.Navigator>
    
  );
}
