// EventList.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLoadUser } from "@/hooks/loadUser";
import useLoadEvents from "@/hooks/loadEvents";

const EventList: React.FC = () => {
  const { user } = useLoadUser();
  const userId = user?.id;
  const { events, loading, error } = useLoadEvents(userId);

  if (user?.id === null) {
    return <Text style={styles.warningText}>Registre su usuario primero</Text>;
  }

  if (loading) {
    return <Text style={styles.loadingText}>Cargando eventos...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  if (!events || events.length === 0) {
    return <Text style={styles.infoText}>No se encontraron eventos.</Text>;
  }

  return (
    <View style={styles.list}>
      {events.map((event) => (
        <View key={event.id_evento} style={styles.card}>
          <Text style={styles.eventName}>{event.nombre_evento}</Text>
          <Text style={styles.eventDate}>Fecha: {event.fecha_evento}</Text>
          <Text style={styles.eventTime}>
            Hora: {event.hora_inicio} - {event.hora_final}
          </Text>
          <Text style={styles.eventDetails}>
            Asistentes: {event.asistentes}
          </Text>
          <Text style={styles.eventDetails}>
            Alimentación: {event.alimentacion}
          </Text>
          <Text style={styles.eventDetails}>
            Decoración: {event.decoracion}
          </Text>
          <Text style={styles.eventDetails}>
            Transporte: {event.transporte}
          </Text>
          <Text style={styles.eventDetails}>
            Alquiler del lugar: {event.alquiler_lugar}
          </Text>
          <Text style={styles.eventComments}>
            Comentarios: {event.comentarios || "Ninguno"}
          </Text>
        </View>
      ))}
    </View>
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
  eventName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796b", // Color verde agua oscuro
  },
  eventDate: {
    fontSize: 16,
    color: "#555",
  },
  eventTime: {
    fontSize: 16,
    color: "#555",
  },
  eventDetails: {
    fontSize: 14,
    color: "#777",
  },
  eventComments: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#888",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    color: "#00796b", // Color verde agua oscuro para el texto de carga
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
  warningText: {
    fontSize: 18,
    textAlign: "center",
    color: "orange", // Color para advertencias
  },
});

export default EventList;
