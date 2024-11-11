import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { EventData } from "@/hooks/saveEvent";

/**
 * Propiedades que recibe el componente EventCard.
 * El componente espera un objeto de tipo EventData que contiene
 * la información del evento que se debe mostrar.
 */
interface EventCardProps {
  event: EventData;
}

/**
 * Componente funcional EventCard.
 * Muestra los detalles del evento en una tarjeta, incluyendo nombre,
 * fecha, hora, asistentes y otros servicios relacionados.
 */
const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.eventName}>{event.nombre_evento}</Text>
      <Text style={styles.eventDate}>Fecha: {event.fecha_evento}</Text>
      <Text style={styles.eventTime}>
        Hora: {event.hora_inicio} - {event.hora_final}
      </Text>
      <Text style={styles.eventDetails}>Asistentes: {event.asistentes}</Text>
      <Text style={styles.eventDetails}>
        Alimentación: {event.alimentacion}
      </Text>
      <Text style={styles.eventDetails}>Decoración: {event.decoracion}</Text>
      <Text style={styles.eventDetails}>Transporte: {event.transporte}</Text>
      <Text style={styles.eventDetails}>
        Alquiler del lugar: {event.alquiler_lugar}
      </Text>
      <Text style={styles.eventComments}>
        Comentarios: {event.comentarios || "Ninguno"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
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
});

export default EventCard;
