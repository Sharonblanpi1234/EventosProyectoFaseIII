import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "@/components/user";
import { useLoadUser } from "@/hooks/loadUser";

export default function Login() {
  const router = useRouter();
  const { user, loadUserData } = useLoadUser(); // Asegúrate de no usar let aquí
  const [localUser, setLocalUser] = useState(user); // Agrega un estado local si no usas `setUser`

  // Cargar el usuario al montar el componente
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setLocalUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, [user]); // `user` como dependencia para actualizar cuando cambia

  const handleLogin = () => {
    router.push("/login");
  };

  const deleteUser = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setLocalUser(undefined); // Usa `setLocalUser` para actualizar el estado local
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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
          <Text>Bienvenido {localUser.name}</Text>
          <Button title="Log Out" onPress={handleLogout} />
        </>
      ) : (
        <Button title="Log In" onPress={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#A1CEDC",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1D3D47",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
