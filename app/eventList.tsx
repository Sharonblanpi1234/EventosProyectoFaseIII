// EventList.tsx
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
import { Link, router, useLocalSearchParams } from "expo-router";
import EventRequestFunction, { EventRequest } from "@/hooks/saveRequest";
import EventNotification, { Notification } from "@/hooks/saveNotification";

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

  const handleEventInfo = (
    idEvento: number | undefined,
    nombreEvento: string
  ) => {
    // Convertir providerId a number, manejando el caso en que sea un array
    const providerIdNumber = Array.isArray(providerId)
      ? parseInt(providerId[0])
      : parseInt(providerId as string);
    console.log(providerIdNumber);

    if (isNaN(providerIdNumber)) {
      console.error("El providerId no es un número válido.");
      return;
    }

    // Crear el objeto de solicitud con los valores correctos
    const request: EventRequest = {
      id_evento: idEvento || 0, // Manejo de undefined en idEvento
      id_proveedor: providerIdNumber,
    };
    setEventRequest(request);
    const notification: Notification = {
      id_evento: idEvento || 0, // Manejo de undefined en idEvento
      id_usuario: providerIdNumber,
      mensaje: `Has sido seleccionado para el evento ${nombreEvento}`,
    };
    setNotificationRequest(notification);

    // Mostrar un mensaje de éxito
  };

  const handleSuccessNot = () => {
    Alert.alert("La solicitud ha sido enviada exitosamente");
    setNotificationRequest(null);
    router.push("/(tabs)/");
  };

  const handleErrorNot = (errorMessage: string) => {
    Alert.alert("Error", errorMessage);
    setNotificationRequest(null);
  };

  const handleSuccess = () => {
    Alert.alert("La solicitud ha sido enviada exitosamente");
    setEventRequest(null);
    router.push("/(tabs)/");
  };

  const handleError = (errorMessage: string) => {
    Alert.alert("Error", errorMessage);
    setEventRequest(null);
  };

  return (
    <ScrollView style={styles.list}>
      {message && <Text style={styles.messageText}> {message} </Text>}
      {events.map((event) => (
        <View key={event.id_evento} style={styles.card}>
          <Text style={styles.eventName}>Id: {event.id_evento}</Text>
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
  messageText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#00796b", // Color verde agua oscuro para el título
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

export default EventList;
