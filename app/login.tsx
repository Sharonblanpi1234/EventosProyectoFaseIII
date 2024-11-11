import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Tabs, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "../components/user";

/* * Componente LoginScreen:
   Este componente maneja la pantalla de inicio de sesión, permitiendo al usuario ingresar
   un correo electrónico y una contraseña, y posteriormente autenticarlo. */
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password_hash, setPassword_hash] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  /* * Función saveUser:
     Guarda los detalles del usuario en AsyncStorage y actualiza el estado del usuario. */
  const saveUser = async (updatedUser: User) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error saving users:", error);
    }
  };

  /* * Función handleLogin:
     Maneja el inicio de sesión enviando los datos a un servidor y gestionando la respuesta. */
  const handleLogin = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password_hash }),
      });

      const data = await response.json();
      if (data && data.id !== 0) {
        const newUser = new User(data.id, data.name);
        setUser(newUser);
        saveUser(newUser);
        router.push("/(tabs)/");
      } else {
        Alert.alert(
          "Error",
          "Usuario no encontrado. Verifica tus credenciales."
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "Ha ocurrido un error. Inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type="title">
        Iniciar Sesión
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password_hash}
        onChangeText={setPassword_hash}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <ThemedText style={styles.buttonText} type="button">
          Iniciar Sesión
        </ThemedText>
      </TouchableOpacity>
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
  input: {
    width: "100%",
    height: 50,
    borderColor: "#2D3E50",
    borderWidth: 1.5,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#1D3D47",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
