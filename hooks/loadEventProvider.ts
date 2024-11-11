import { useState, useEffect } from "react";
import { Alert } from "react-native";

interface EventProvider {
  nombre_proveedor: string,
  telefono: string,
  email: string,
  website: string,
  nombre_evento: string,
  servicio: string,
  estado: string,
  fecha_respuesta: string,
  justificacion: string,
}

interface ProvidersResponse {
  listaConexiones: EventProvider[];
}
/**
 * Hook personalizado para cargar solicitudes de un evento.
 * 
 * Este hook realiza una solicitud HTTP para obtener la lista de solicitudes relacionadas con un evento,
 * según el ID del evento y el ID del usuario. Maneja el estado de carga, error y los datos obtenidos.
 * Utiliza `useEffect` para hacer la solicitud cuando cambian los parámetros `id_evento` o `userId`.
 * 
 * @param {number} id_evento - El ID del evento para el cual se buscan proveedores.
 * @param {number | undefined} userId - El ID del usuario para la autenticación o filtrado.
 * 
 * @returns {Object} - Un objeto que contiene el estado de la carga, el error y los datos de los proveedores.
 */
export default function useLoadEventProvider(id_evento: number, userId:number | undefined) {
  const [eventProvider, setEventProvider] = useState<ProvidersResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userId === undefined) {
      setLoading(false);
      return;
    }
    const fetchProvider = async () => {
      try {
        const response = await fetch("http://10.0.2.2:5000/showEventProvider", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_evento, userId }),
        });

        const data: ProvidersResponse = await response.json();
        console.log(data);
        if (data && data.listaConexiones.length > 0) {
            setEventProvider(data);
        } else {
          Alert.alert(
            "Error",
            "No se encontraron proveedores para el servicio especificado."
          );
        }
      } catch (error) {
        console.error(error);
        setError("Ha ocurrido un error. Inténtalo de nuevo más tarde.");
        Alert.alert(
          "Error",
          "Ha ocurrido un error. Inténtalo de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [id_evento, userId]);

  return { eventProvider, loading, error };
}
