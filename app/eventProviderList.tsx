// EventProviderList.tsx
import useLoadEventProvider from "@/hooks/loadEventProvider";
import { useLoadUser } from "@/hooks/loadUser";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

interface EventProviderListProps {
  id_evento: number;
}

const EventProviderList: React.FC<EventProviderListProps> = () => {
  const { user } = useLoadUser();
  const UserId = user?.id;
  const { idEvento } = useLocalSearchParams();
  const event_id = Array.isArray(idEvento)
    ? parseInt(idEvento[0])
    : parseInt(idEvento as string);
  const { eventProvider, loading, error } = useLoadEventProvider(
    event_id,
    UserId
  );

  if (loading) {
    return (
      <ActivityIndicator style={styles.loading} size="large" color="#00796b" />
    );
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (!eventProvider || eventProvider.listaConexiones.length === 0) {
    return (
      <Text style={styles.infoText}>
        No se encontraron eventos proveedor para este evento.
      </Text>
    );
  }

  return (
    <ScrollView style={styles.list}>
      {eventProvider.listaConexiones.map((eventoProveedor, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.eventProviderName}>
            Evento Proveedor: {eventoProveedor.nombre_proveedor}
          </Text>
          <Text style={styles.eventName}>
            Evento: {eventoProveedor.nombre_evento}
          </Text>
          <Text style={styles.service}>
            Servicio: {eventoProveedor.servicio}
          </Text>
          <Text style={styles.status}>Estado: {eventoProveedor.estado}</Text>
          <Text style={styles.responseDate}>
            Fecha de respuesta: {eventoProveedor.fecha_respuesta || "Ninguna"}
          </Text>
          <Text style={styles.justification}>
            Justificación: {eventoProveedor.justificacion || "Ninguna"}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: "#e0f7fa", // Color de fondo suave
    flex: 1,
  },
  card: {
    backgroundColor: "#ffffff", // Fondo blanco para la tarjeta
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  eventProviderName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796b", // Color verde agua oscuro
  },
  eventName: {
    fontSize: 16,
    color: "#555",
  },
  service: {
    fontSize: 16,
    color: "#555",
  },
  status: {
    fontSize: 16,
    color: "#777",
  },
  responseDate: {
    fontSize: 14,
    color: "#888",
  },
  justification: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#888",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    color: "red", // Color para errores
  },
  infoText: {
    fontSize: 18,
    textAlign: "center",
    color: "#00796b", // Color verde agua oscuro
  },
});

export default EventProviderList;
