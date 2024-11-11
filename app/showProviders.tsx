import useLoadProvider from "@/hooks/loadProvider";
import { Link } from "expo-router";
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
/**
 * Función principal del componente Providers
 *
 * @param {ProvidersProps} props - Las propiedades que contiene el tipo de servicio (provider)
 *
 * El componente usa el hook useLoadProvider para cargar los proveedores de un servicio específico.
 * Muestra una lista de proveedores con detalles de contacto y servicio, y un botón para ir a la lista de eventos de ese proveedor.
 */
export default function Providers({ provider }: ProvidersProps) {
  const { provider: providers, loading, error } = useLoadProvider(provider);

  if (loading) return <Text style={styles.loadingText}>Cargando...</Text>;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <ScrollView contentContainerStyle={styles.buttonsContainer}>
      {providers?.proveedores?.map((provider) => (
        <View key={provider.id_proveedor} style={styles.card}>
          <View style={styles.providerDetails}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{provider.nombre}</Text>
              <Text style={styles.serviceText}>
                Servicio: {provider.servicio}
              </Text>
              <Text style={styles.contactText}>Email: {provider.email}</Text>
              <Text style={styles.phoneText}>
                Teléfono: {provider.telefono}
              </Text>
              <Text style={styles.addressText}>
                Dirección: {provider.direccion}
              </Text>
              <Text style={styles.addressText}>
                WebSide: {provider.website}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton}>
              <Link
                href={`/eventList?providerId=${provider.id_proveedor}&message=Seleccione el evento`}
                asChild
              >
                <Text style={styles.submitButtonText}>
                  Ir a la lista de eventos
                </Text>
              </Link>
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
    backgroundColor: "#A1CEDC",
    elevation: 4,
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
    backgroundColor: "#A1CEDC",
    borderRadius: 10,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#004d40",
  },
  serviceText: {
    fontSize: 16,
    color: "#00796b",
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
    color: "red",
  },
  submitButton: {
    padding: 10,
    backgroundColor: "#00796b",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
