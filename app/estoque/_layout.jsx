import { Stack } from 'expo-router';

export default function EstoqueLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#003366' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="bebidas"
        options={{
          title: 'Estoque de Bebidas',
        }}
      />
      <Stack.Screen
        name="pereciveis"
        options={{
          title: 'Itens Perecíveis',
        }}
      />
      <Stack.Screen
        name="nao-pereciveis"
        options={{
          title: 'Itens Não Perecíveis',
        }}
      />
    </Stack>
  );
}
