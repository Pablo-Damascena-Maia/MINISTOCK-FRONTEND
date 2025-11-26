import { Stack } from 'expo-router';

export default function EstoqueLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[categoria]" />
      <Stack.Screen name="criar" />
      <Stack.Screen name="editar/[id]" />
    </Stack>
  );
}
