import { useState, useEffect } from "react";
import { Alert } from "react-native";

interface Provider {
  id_proveedor: number;
  nombre: string;
  servicio: string;
  email: string;
  telefono: string;
  direccion: string;
  website: string;
}

interface ProvidersResponse {
  proveedores: Provider[];
}
/**
 * Hook personalizado para cargar proveedores de un servicio específico.
 * 
 * Este hook realiza una solicitud HTTP para obtener la lista de proveedores que ofrecen un servicio determinado.
 * Si los proveedores se cargan correctamente, actualiza el estado con los datos obtenidos. Si no se encuentran
 * proveedores o ocurre un error, muestra una alerta al usuario.
 * 
 * @param {string} service - El nombre del servicio para el cual se buscan proveedores.
 * 
 * @returns {Object} - Un objeto que contiene los proveedores, el estado de carga y el error.
 */
export default function useLoadProvider(service: string) {
  const [provider, setProvider] = useState<ProvidersResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  

  useEffect(() => {
    
    const fetchProvider = async () => {
      try {
        const response = await fetch("http://10.0.2.2:5000/providers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ service }),
        });

        const data: ProvidersResponse = await response.json();
        if (data && data.proveedores.length > 0) {
          setProvider(data);
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
  }, [service]);

  return { provider, loading, error };
}
