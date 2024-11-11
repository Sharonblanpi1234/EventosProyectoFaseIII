import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "@/components/user";
import { useLoadUser } from "@/hooks/loadUser";

export default function Login() {
  const router = useRouter();
  const { user, loadUserData } = useLoadUser();
  const [localUser, setLocalUser] = useState<User | undefined>(user);

  /**
   * Efecto para cargar el usuario desde AsyncStorage al montar el componente.
   * Si hay un usuario almacenado, lo establecemos en el estado local.
   */

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setLocalUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, [user]);

  /**
   * Función que redirige al usuario a la pantalla de inicio de sesión.
   */
  const handleLogin = () => {
    router.push("/login");
  };

  /**
   * Función para eliminar los datos del usuario almacenados en AsyncStorage.
   * Se utiliza para cerrar sesión.
   */

  const deleteUser = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setLocalUser(undefined);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  /**
   * Función para manejar la salida del usuario, llamando a deleteUser.
   * Se utiliza para cerrar sesión.
   */
  const handleLogout = async () => {
    await deleteUser();
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type="title">
        Iniciar Sesión
      </ThemedText>

      {localUser ? (
        <>
          <Text style={styles.welcomeText}>Bienvenido, {localUser.name}!</Text>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <ThemedText style={styles.buttonText} type="button">
              Cerrar Sesión
            </ThemedText>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <ThemedText style={styles.buttonText} type="button">
            Iniciar Sesión
          </ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#A1CEDC",
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
    color: "#2D3E50",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 30,
    color: "#2D3E50",
  },
  button: {
    backgroundColor: "#1D3D47",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
