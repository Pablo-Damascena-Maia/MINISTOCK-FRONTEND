import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../index';
import DashboardScreen from '../screens/DashboardScreen';
import EstoqueScreen from '../screens/EstoqueScreen';
import BebidasScreen from '../screens/BebidasScreen';
import PereciveisScreen from '../screens/PereciveisScreen';
import NaoPereciveisScreen from '../screens/NaoPereciveisScreen';
import MovimentacaoScreen from '../screens/MovimentacaoScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function EstoqueStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EstoquePrincipal"
        component={EstoqueScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Bebidas"
        component={BebidasScreen}
        options={{ title: 'Estoque de Bebidas' }}
      />
      <Stack.Screen
        name="Pereciveis"
        component={PereciveisScreen}
        options={{ title: 'Itens Perecíveis' }}
      />
      <Stack.Screen
        name="NaoPereciveis"
        component={NaoPereciveisScreen}
        options={{ title: 'Itens Não Perecíveis' }}
      />
    </Stack.Navigator>
  );
}

export default function MainAppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#003366', height: 60 },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ccc',
        tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Início':
              iconName = 'home-outline';
              break;
            case 'Dashboard':
              iconName = 'stats-chart-outline';
              break;
            case 'Estoque':
              iconName = 'cube-outline';
              break;
            case 'Movimentação':
              iconName = 'swap-horizontal-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Estoque" component={EstoqueStack} />
      <Tab.Screen name="Movimentação" component={MovimentacaoScreen} />
    </Tab.Navigator>
  );
}
