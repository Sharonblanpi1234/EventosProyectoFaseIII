import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";
import Providers from "./showProviders";
import { useState } from "react";

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Selecciona un Servicio</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedService("Transporte")}
        >
          <Text style={styles.buttonText}>Transporte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedService("Alimentación")}
        >
          <Text style={styles.buttonText}>Alimentación</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setSelectedService("Decoración")}
        >
          <Text style={styles.buttonText}>Decoración</Text>
        </TouchableOpacity>
      </View>

      {selectedService && <Providers provider={selectedService} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f0f0f0", // Color de fondo para toda la vista
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#00796b", // Color verde agua oscuro para el título
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  button: {
    width: "30%",
    padding: 16,
    backgroundColor: "#A1CEDC",
    alignItems: "center",
    borderRadius: 12,
    borderColor: "#00796b",
    borderWidth: 1,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000", // Color negro para el texto del botón
  },
});
