import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { EventData } from "./saveEvent";

interface EventsResponse {
  eventos: EventData[];
}

/**
 * Hook personalizado para cargar los eventos asociados a un usuario.
 * 
 * Este hook realiza una solicitud HTTP para obtener los eventos registrados para un usuario específico,
 * utilizando el `userId` proporcionado. Gestiona los estados de carga, error y los eventos obtenidos.
 * Utiliza `useEffect` para ejecutar la solicitud cuando el `userId` cambia.
 * 
 * @param {number | undefined} userId - El ID del usuario para el cual se cargan los eventos.
 * 
 * @returns {Object} - Un objeto que contiene el estado de los eventos, el estado de carga y el error.
 */
export default function useLoadEvents(userId: number | undefined) {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId === undefined) {
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      setLoading(true);
      setError(null); 

      try {
        const response = await fetch("http://10.0.2.2:5000/showEvents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        const data: EventsResponse = await response.json();

        if (data && data.eventos.length > 0) {
          setEvents(data.eventos);
        } else {
          Alert.alert(
            "No se encontraron eventos",
            "No hay eventos registrados para este usuario."
          );
        }
      } catch (error) {
        console.error(error);
        setError("Ocurrió un error al cargar los eventos. Inténtalo más tarde.");
        Alert.alert("Error", "Ocurrió un error al cargar los eventos.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [userId]); 

  return { events, loading, error };
}
