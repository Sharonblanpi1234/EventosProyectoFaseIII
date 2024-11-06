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

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const saveUser = async (updatedUser: User) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error saving users:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5000/login", {
        // Cambia localhost por la IP de tu servidor si es necesario
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (data.id && data.id !== 0) {
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

      <>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <ThemedText style={styles.buttonText} type="button">
            Iniciar Sesión
          </ThemedText>
        </TouchableOpacity>
      </>
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
  input: {
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
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
