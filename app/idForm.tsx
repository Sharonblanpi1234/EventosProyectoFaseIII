import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const IdForm: React.FC = () => {
  const [idEvento, setIdEvento] = useState("");

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Digite el número de identificación del evento
        </Text>
        <TextInput
          style={styles.inputText}
          placeholder=""
          value={idEvento}
          onChangeText={(text) => setIdEvento(text.replace(/[^0-9]/g, ""))} // Solo números
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button}>
        {/* Link envuelve todo el TouchableOpacity */}
        <Link href={`/eventProviderList?idEvento=${idEvento}`} asChild>
          <Text style={styles.button}>Ver Estado</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F7F7", // Fondo de pantalla verde agua claro
  },
  container: {
    width: 300, // Aumenta el ancho del contenedor
    padding: 30, // Más espacio interno
    backgroundColor: "#f0f2f5",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8, // Sombra en Android
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A4A4A", // Color de texto elegante
    textAlign: "center",
    marginBottom: 20, // Espacio debajo del título
  },
  inputText: {
    width: "100%",
    height: 50,
    borderColor: "#A1CEDC",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FFF",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#80CBC4", // Color del botón verde agua
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    overflow: "hidden",
  },
});

export default IdForm;
