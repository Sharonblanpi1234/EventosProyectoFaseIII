import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { EventData } from "./saveEvent";

interface EventsResponse {
  eventos: EventData[];
}

export default function useLoadEvents(userId: number | undefined) {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verifica que userId esté definido antes de hacer la solicitud
    if (userId === undefined) {
      setLoading(false);
      return;
    }

    const fetchEvents = async () => {
      setLoading(true);
      setError(null); // Resetea el estado de error antes de la solicitud

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
  }, [userId]); // Solo ejecuta el efecto si userId cambia a un valor definido

  return { events, loading, error };
}
