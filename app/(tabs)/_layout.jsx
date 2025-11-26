import { Tabs } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#003366', height: 60 },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ccc',
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home-outline';
          if (route.name === 'index') iconName = 'home-outline';
          if (route.name === 'dashboard') iconName = 'stats-chart-outline';
          if (route.name === 'estoque') iconName = 'cube-outline';
          if (route.name === 'movimentacao') iconName = 'swap-horizontal-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="estoque"
        options={{
          title: 'Estoque',
        }}
      />
      <Tabs.Screen
        name="movimentacao"
        options={{
          title: 'Movimentação',
        }}
      />
    </Tabs>
  );
}
