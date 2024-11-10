import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Notification } from "./saveNotification";

interface NotificationsResponse {
  listaNotificaciones: Notification[];
}

export default function useLoadNotifications(userId: number | undefined) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newNotification, setNewNotification] = useState<boolean>(false);

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
        console.log(data);

        if (data && data.listaNotificaciones.length) {
          setNotifications(data.listaNotificaciones);
          setNewNotification(true); // Hay notificaciones nuevas
        } else {
          setNewNotification(false); // No hay nuevas notificaciones
        }
      } catch (error) {
        console.error(error);
        setError("Ocurrió un error al cargar las notificaciones.");
        Alert.alert("Error", "Ocurrió un error al cargar las notificaciones.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications(); // Cargar notificaciones al principio

    // Configurar recarga cada 30 segundos
    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000); // 30 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);

  }, [userId]); // Solo se ejecuta cuando userId cambia

  return { notifications, loading, error, newNotification };
}
