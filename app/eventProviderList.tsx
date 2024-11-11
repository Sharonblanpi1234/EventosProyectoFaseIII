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

/* * Definición de la interfaz para los props que recibe el componente 
   Se espera un `id_evento` de tipo número que será utilizado para cargar los proveedores */
interface EventProviderListProps {
  id_evento: number;
}

/* * Componente principal que maneja la lista de las solicitudes del evento
   Este componente obtiene los datos del proveedor y los muestra de forma dinámica */
const EventProviderList: React.FC<EventProviderListProps> = () => {
  const { user } = useLoadUser();
  const UserId = user?.id;
  /* * Hook que obtiene el parámetro `idEvento` desde la URL.
     Este parámetro es importante para saber qué evento estamos consultando */
  const { idEvento } = useLocalSearchParams();

  /* * Parseo seguro del parámetro `idEvento` para asegurarse de que es un número.
     Si el valor es un array, tomamos el primer valor; de lo contrario, lo convertimos directamente */

  const event_id = Array.isArray(idEvento)
    ? parseInt(idEvento[0])
    : parseInt(idEvento as string);
  /* * Hook que carga los proveedores del evento utilizando el `event_id` y `UserId`.
     Devuelve los datos del proveedor, el estado de carga y posibles errores */
  const { eventProvider, loading, error } = useLoadEventProvider(
    event_id,
    UserId
  );

  /* * Si los datos aún se están cargando, se muestra un indicador de carga */

  if (loading) {
    return (
      <ActivityIndicator style={styles.loading} size="large" color="#00796b" />
    );
  }
  /* * Si ocurre un error al cargar los datos, se muestra un mensaje de error */
  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  /* * Si no hay proveedores de evento o si la lista está vacía, mostramos un mensaje informativo */
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
          {/* Contenedor Turquesa para los títulos */}
          <View style={styles.turquoiseContainer}>
            <Text style={styles.eventProviderTitle}>Proveedor:</Text>
            <Text style={styles.eventProviderDetail}>
              {eventoProveedor.nombre_proveedor}
            </Text>
            <Text style={styles.eventProviderTitle}>Telefono:</Text>
            <Text style={styles.eventProviderDetail}>
              {eventoProveedor.telefono}
            </Text>
            <Text style={styles.eventProviderTitle}>Email:</Text>
            <Text style={styles.eventProviderDetail}>
              {eventoProveedor.email}
            </Text>
            <Text style={styles.eventProviderTitle}>Website:</Text>
            <Text style={styles.eventProviderDetail}>
              {eventoProveedor.website}
            </Text>
            <Text style={styles.eventProviderTitle}>Evento:</Text>
            <Text style={styles.eventName}>
              {eventoProveedor.nombre_evento}
            </Text>
          </View>

          {/* Contenedor Blanco para los detalles de estado, fecha de respuesta y justificación */}
          <View style={styles.whiteContainer}>
            <Text style={styles.TitleSecondBlock}>Servicio:</Text>
            <Text style={styles.service}>{eventoProveedor.servicio}</Text>
            <Text style={styles.TitleSecondBlock}>Estado:</Text>
            <Text style={styles.status}>{eventoProveedor.estado}</Text>
            <Text style={styles.TitleSecondBlock}>Fecha de respuesta:</Text>
            <Text style={styles.responseDate}>
              {eventoProveedor.fecha_respuesta || "Ninguna"}
            </Text>
            <Text style={styles.TitleSecondBlock}>Justificación:</Text>
            <Text style={styles.justification}>
              {eventoProveedor.justificacion || "Ninguna"}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: "#80CBC4",
  },
  card: {
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    paddingHorizontal: 24,
    marginVertical: 16,
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  turquoiseContainer: {
    backgroundColor: "#00796b", // Fondo turquesa
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
  },
  whiteContainer: {
    backgroundColor: "#ffffff", // Fondo blanco
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
  },
  eventProviderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff", // Blanco para títulos en el contenedor turquesa
    marginBottom: 4,
  },
  TitleSecondBlock: {
    fontSize: 18,
    fontWeight: "600",
    color: "black", // Blanco para títulos en el contenedor turquesa
    marginBottom: 4,
  },
  eventProviderDetail: {
    fontSize: 16,
    fontWeight: "400",
    color: "#ffffff", // Blanco para detalles en el contenedor turquesa
    marginBottom: 12,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff", // Blanco para el nombre del evento
    marginTop: 14,
    textTransform: "capitalize",
    letterSpacing: 0.4,
    marginBottom: 12,
  },
  service: {
    fontSize: 18,
    color: "#757575",
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
    color: "#607d8b",
    marginTop: 6,
    fontWeight: "500",
    marginBottom: 10,
  },
  responseDate: {
    fontSize: 18,
    color: "#9e9e9e",
    marginTop: 6,
    marginBottom: 10,
  },
  justification: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#9e9e9e",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7fafc",
  },
  errorText: {
    fontSize: 20,
    textAlign: "center",
    color: "#d32f2f",
    fontWeight: "600",
    marginVertical: 20,
  },
  infoText: {
    fontSize: 20,
    textAlign: "center",
    color: "#00796b",
    fontWeight: "600",
    marginVertical: 18,
  },
});

export default EventProviderList;
