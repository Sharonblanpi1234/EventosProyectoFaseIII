import { useState, useEffect } from "react";
import { Alert } from "react-native";

// Interfaces
interface Provider {
  id_proveedor: number;
  nombre_proveedor: string;
  servicio: string;
  contacto_proveedor: string;
  telefono_proveedor: string;
  direccion_proveedor: string;
}

interface ProvidersResponse {
  proveedores: Provider[];
}

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
