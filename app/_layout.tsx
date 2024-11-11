import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  /**
   * Utilizamos el hook useColorScheme para determinar el esquema de colores (oscuro o claro).
   */
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  /**
   * Usamos el hook useEffect para ocultar la pantalla de inicio (splash screen)
   * una vez que las fuentes estén completamente cargadas.
   */
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  /**
   * Proveemos el esquema de colores (oscuro o claro) al ThemeProvider para que
   * todos los componentes de navegación utilicen el tema adecuado.
   */

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: "Iniciar Sesión" }} />
        <Stack.Screen name="services" options={{ title: "Servicios" }} />
        <Stack.Screen name="showProviders" options={{ title: "Proveedores" }} />
        <Stack.Screen name="EventForm" options={{ title: "Crear evento" }} />
        <Stack.Screen name="eventList" options={{ title: "Ver eventos" }} />
        <Stack.Screen name="idForm" options={{ title: "Ver Seguimiento" }} />
        <Stack.Screen
          name="eventProviderList"
          options={{ title: "Lista de Solicitudes" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
