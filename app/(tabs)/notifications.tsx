import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons"; // Usando Ionicons para iconos
import useLoadNotifications from "@/hooks/loadNotifications";
import { useLoadUser } from "@/hooks/loadUser";

export default function Notifications() {
  const { user } = useLoadUser();
  const { notifications, loading, error } = useLoadNotifications(user?.id);

  if (loading) {
    return (
      <ThemedText style={styles.loading}>Cargando notificaciones...</ThemedText>
    );
  }

  if (error) {
    return <ThemedText style={styles.error}>{error}</ThemedText>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {notifications.length === 0 ? (
        <ThemedText style={styles.noNotifications}>
          No tienes nuevas notificaciones.
        </ThemedText>
      ) : (
        notifications.map((notification: any) => (
          <ThemedView
            key={notification.id_notificacion}
            style={styles.notificationCard}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="notifications-outline"
                size={30}
                color="#ff6347"
              />
            </View>
            <View style={styles.textContainer}>
              <ThemedText style={styles.title}>
                {notification.mensaje}
              </ThemedText>
              <Text style={styles.date}>
                Fecha de Notificación:{" "}
                {new Date(notification.fecha).toLocaleString()}
              </Text>
            </View>
          </ThemedView>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: "#f9f9f9",
  },
  loading: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 20,
    fontSize: 18,
  },
  noNotifications: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
    fontSize: 18,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 3, // sombra para un efecto de elevación en dispositivos Android
    shadowColor: "#000", // sombra en iOS
    shadowOpacity: 0.1, // sombra suave
    shadowRadius: 5, // radio de la sombra
    shadowOffset: { width: 0, height: 4 }, // desplazamiento de la sombra
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: "#333",
  },
});
