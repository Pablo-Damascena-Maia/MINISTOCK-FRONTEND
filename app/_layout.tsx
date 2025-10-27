import { Stack } from "expo-router";
import { EstoqueProvider } from "../context/EstoqueContext";

export default function Layout() {
  return (
    <EstoqueProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </EstoqueProvider>
  );
}
