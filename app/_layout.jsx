import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { EstoqueProvider } from '../context/EstoqueContext';

import EstoqueScreen from './EstoqueScreen';
import DashboardScreen from './DashboardScreen';
import HomeScreen from './index';
import MovimentacaoScreen from './MovimentacaoScreen';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <EstoqueProvider>
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
        <Tab.Screen name="Estoque" component={EstoqueScreen} />
        <Tab.Screen name="Movimentação" component={MovimentacaoScreen} />
      </Tab.Navigator>
    </EstoqueProvider>
  );
}