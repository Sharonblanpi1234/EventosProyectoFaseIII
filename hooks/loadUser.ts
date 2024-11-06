import User from "@/components/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export function useLoadUser() {
  const [user, setUser] = useState<User>();

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

