import useLoadProvider from "@/hooks/loadProvider";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

type ProvidersProps = {
  provider: string;
};

export default function Providers({ provider }: ProvidersProps) {
  const { provider: providers, loading, error } = useLoadProvider(provider);
  const [idsProvider, setIdsProvider] = useState<number[]>([]);

  if (loading) return <Text style={styles.loadingText}>Cargando...</Text>;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  const handleId = (id: number) => {
    setIdsProvider((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((itemId) => itemId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.buttonsContainer}>
      {providers?.proveedores?.map((provider) => (
        <View key={provider.id_proveedor} style={styles.card}>
          <View style={styles.providerDetails}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleId(provider.id_proveedor)}
            >
              <Text style={styles.buttonText}>{provider.nombre_proveedor}</Text>
              <Text style={styles.serviceText}>
                Servicio: {provider.servicio}
              </Text>
              <Text style={styles.contactText}>
                Contacto: {provider.contacto_proveedor}
              </Text>
              <Text style={styles.phoneText}>
                Teléfono: {provider.telefono_proveedor}
              </Text>
              <Text style={styles.addressText}>
                Dirección: {provider.direccion_proveedor}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
  },
  card: {
    width: "90%",
    marginVertical: 8,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#A1CEDC", // Color verde agua suave
    elevation: 4, // Sombra para efecto 3D
  },
  providerDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 15,
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: "#A1CEDC", // Color principal
    borderRadius: 10,
    marginRight: 10, // Espacio entre el botón y el botón de enviar
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#004d40", // Texto oscuro para contraste
  },
  serviceText: {
    fontSize: 16,
    color: "#00796b", // Texto en verde agua más oscuro
  },
  contactText: {
    fontSize: 16,
    color: "#00796b",
  },
  phoneText: {
    fontSize: 16,
    color: "#00796b",
  },
  addressText: {
    fontSize: 16,
    color: "#00796b",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    color: "#00796b",
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    color: "red", // Color para errores
  },
  submitButton: {
    padding: 10,
    backgroundColor: "#00796b", // Botón de enviar en verde agua oscuro
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff", // Texto blanco
  },
});
