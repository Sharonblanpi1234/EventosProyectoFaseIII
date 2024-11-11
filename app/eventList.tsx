import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLoadUser } from "@/hooks/loadUser";
import useLoadEvents from "@/hooks/loadEvents";
import { router, useLocalSearchParams } from "expo-router";
import EventRequestFunction, { EventRequest } from "@/hooks/saveRequest";
import EventNotification, { Notification } from "@/hooks/saveNotification";

/* * Muestra los eventos del usuario*/
const EventList: React.FC = () => {
  const { user } = useLoadUser();
  const { providerId, message } = useLocalSearchParams();
  const userId = user?.id;
  const { events, loading, error } = useLoadEvents(userId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventRequest, setEventRequest] = useState<EventRequest | null>(null);
  const [notificationRequest, setNotificationRequest] =
    useState<Notification | null>(null);
  const [isSubmittingNot, setIsSubmittingNot] = useState(false);

  /* * Comprobación si el usuario está autenticado */
  if (user?.id === null) {
    return (
      <Text style={styles.warningText}>Por favor, registre su usuario.</Text>
    );
  }
  /* * Cargando los eventos o mostrando errores */
  if (loading) {
    return <Text style={styles.loadingText}>Cargando eventos...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Hubo un error: {error}</Text>;
  }

  /* * Si no hay eventos disponibles */
  if (!events || events.length === 0) {
    return (
      <Text style={styles.infoText}>
        No se encontraron eventos disponibles.
      </Text>
    );
  }

  /* * Creación de la solicitud de evento y notificación */
  const handleEventInfo = (
    idEvento: number | undefined,
    nombreEvento: string
  ) => {
    const providerIdNumber = Array.isArray(providerId)
      ? parseInt(providerId[0])
      : parseInt(providerId as string);

    if (isNaN(providerIdNumber)) {
      console.error("El providerId no es un número válido.");
      return;
    }

    const request: EventRequest = {
      id_evento: idEvento || 0,
      id_proveedor: providerIdNumber,
    };
    setEventRequest(request);
    const notification: Notification = {
      id_evento: idEvento || 0,
      id_usuario: providerIdNumber,
      mensaje: `¡Felicidades! Has sido seleccionado para el evento ${nombreEvento}`,
    };
    setNotificationRequest(notification);
  };

  const handleSuccessNot = () => {
    Alert.alert("Éxito", "Tu solicitud ha sido enviada con éxito.");
    setNotificationRequest(null);
    router.push("/(tabs)/");
  };

  const handleErrorNot = (errorMessage: string) => {
    Alert.alert("Error", errorMessage);
    setNotificationRequest(null);
  };

  const handleSuccess = () => {
    Alert.alert("Éxito", "Tu solicitud ha sido enviada con éxito.");
    setEventRequest(null);
    router.push("/(tabs)/");
  };

  const handleError = (errorMessage: string) => {
    Alert.alert("Error", errorMessage);
    setEventRequest(null);
  };

  return (
    <ScrollView style={styles.list}>
      {message && <Text style={styles.messageText}>{message}</Text>}
      {events.map((event) => (
        <View key={event.id_evento} style={styles.card}>
          <Text style={styles.eventName}>{event.nombre_evento}</Text>
          <Text style={styles.eventDate}>Fecha: {event.fecha_evento}</Text>
          <Text style={styles.eventTime}>
            Hora: {event.hora_inicio} - {event.hora_final}
          </Text>
          <View style={styles.eventDetailsContainer}>
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

          {message && (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() =>
                handleEventInfo(event.id_evento, event.nombre_evento)
              }
            >
              <Text style={styles.submitButtonText}>Seleccionar</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {eventRequest && !isSubmitting && (
        <EventRequestFunction
          eventRequest={eventRequest}
          setIsSubmitting={setIsSubmitting}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      )}
      {notificationRequest && !isSubmittingNot && (
        <EventNotification
          notification={notificationRequest}
          setIsSubmitting={setIsSubmittingNot}
          onSuccess={handleSuccessNot}
          onError={handleErrorNot}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 16,
    backgroundColor: "#A1CEDC", // Fondo gris claro
  },
  card: {
    backgroundColor: "#ffffff", // Fondo blanco para cada tarjeta
    padding: 20,
    marginVertical: 12,
    borderRadius: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#dfe6e9", // Borde sutil
  },
  eventName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black", // Color morado para el nombre del evento
  },
  eventDate: {
    fontSize: 16,
    color: "#2c3e50", // Azul para la fecha
    marginBottom: 5,
  },
  eventTime: {
    fontSize: 16,
    color: "#2c3e50", // Verde menta para la hora
    marginBottom: 5,
  },
  eventDetailsContainer: {
    marginVertical: 10,
    backgroundColor: "#ecf0f1", // Fondo gris muy suave para los detalles
    borderRadius: 10,
    padding: 10,
  },
  eventDetails: {
    fontSize: 14,
    color: "#2c3e50", // Gris oscuro para los detalles
    marginBottom: 5,
  },
  eventComments: {
    fontSize: 14,
    color: "#2c3e50", // Naranja para los comentarios
    fontStyle: "italic",
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    color: "#3498db", // Azul para el texto de carga
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    color: "#e74c3c", // Rojo para errores
  },
  infoText: {
    fontSize: 18,
    textAlign: "center",
    color: "#2ecc71", // Verde para la información
  },
  warningText: {
    fontSize: 18,
    textAlign: "center",
    color: "#f39c12", // Naranja para advertencias
  },
  messageText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#34495e", // Gris oscuro para el mensaje
  },
  submitButton: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: "#34495e", // Naranja brillante para el botón
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff", // Texto blanco en el botón
  },
});

export default EventList;
