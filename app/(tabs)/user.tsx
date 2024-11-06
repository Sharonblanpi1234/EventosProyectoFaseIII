import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import User from "@/components/user";
import { useLoadUser } from "@/hooks/loadUser";
export default function Login() {
  const router = useRouter();
  const { user, loadUserData } = useLoadUser();

  const handleLogin = () => {
    router.push("/login");
  };

  const deleteTeam = async (userName: string) => {
    try {
      await AsyncStorage.removeItem(userName);
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  const handleLogout = async () => {
    if (user) {
      await deleteTeam("user");
      //setUser(null);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} type="title">
        Iniciar Sesión
      </ThemedText>
      {user ? (
        <>
          <Text>Bienvenido {user.name}</Text>
          <Button title="log Out" onPress={handleLogout} />
        </>
      ) : (
        <Button title="log In" onPress={handleLogin} />
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
