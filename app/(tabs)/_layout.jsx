import { Tabs } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route, focused }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff', // Fundo branco
          height: 60,
          borderTopWidth: 0,
          elevation: 10, // Sombra para Android
          shadowColor: '#000', // Sombra para iOS
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
        },
        tabBarActiveTintColor: '#003366', // Cor primária do app
        tabBarInactiveTintColor: '#999',
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home-outline';
          let focusedIconName = 'home';
          if (route.name === 'index') { iconName = 'home-outline'; focusedIconName = 'home'; }
          if (route.name === 'dashboard') { iconName = 'stats-chart-outline'; focusedIconName = 'stats-chart'; }
          if (route.name === 'estoque') { iconName = 'cube-outline'; focusedIconName = 'cube'; }
          if (route.name === 'movimentacao') { iconName = 'swap-horizontal-outline'; focusedIconName = 'swap-horizontal'; }
          return <Ionicons name={focused ? focusedIconName : iconName} size={size} color={color} />;
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
