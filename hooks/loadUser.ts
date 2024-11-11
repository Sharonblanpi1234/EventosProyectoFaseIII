import User from "@/components/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export function useLoadUser() {
  const [user, setUser] = useState<User>();
  /**
 * Hook personalizado para cargar los datos de un usuario almacenados en AsyncStorage.
 * 
 * Este hook intenta recuperar los datos del usuario desde el almacenamiento local (AsyncStorage) cuando se monta el componente.
 * Si se encuentra un usuario almacenado, se actualiza el estado `user` con los datos recuperados.
 * En caso de error al cargar los datos, se muestra un error en la consola.
 * 
 * @returns {Object} - Un objeto que contiene los datos del usuario y una función para recargar los datos.
 */

  const loadUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return { user, loadUserData };
}

