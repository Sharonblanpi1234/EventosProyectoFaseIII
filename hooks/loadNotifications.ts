import { useEffect, useState } from "react";
import { Alert, LayoutAnimation } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Notification } from "./saveNotification";

interface NotificationsResponse {
  listaNotificaciones: Notification[];
}
/**
 * Hook personalizado para cargar las notificaciones de un usuario.
 * 
 * Este hook realiza una solicitud HTTP para obtener las notificaciones asociadas a un usuario específico
 * utilizando el `userId`. Además, se configura un intervalo para recargar las notificaciones cada 30 segundos
 * y compara los datos obtenidos con los ya existentes para actualizar el estado solo si ha habido cambios.
 * 
 * @param {number | undefined} userId - El ID del usuario para el cual se cargan las notificaciones.
 * 
 * @returns {Object} - Un objeto que contiene las notificaciones, el estado de carga y el error.
 */

export default function useLoadNotifications(userId: number | undefined) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (userId === undefined) {
      setLoading(false);
      return;
    }

    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://10.0.2.2:5000/get_notifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        const data: NotificationsResponse = await response.json();

        
        if (
          data &&
          (data.listaNotificaciones.length !== notifications.length ||
            JSON.stringify(data.listaNotificaciones) !== JSON.stringify(notifications))
        ) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setNotifications(data.listaNotificaciones);
        }
      } catch (error) {
        console.error(error);
        setError("Ocurrió un error al cargar las notificaciones.");
        Alert.alert("Error", "Ocurrió un error al cargar las notificaciones.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications(); 


    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [userId, notifications.length]); 
  return { notifications, loading, error };
}