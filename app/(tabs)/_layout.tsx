import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import useLoadNotifications from "@/hooks/loadNotifications";
import { useLoadUser } from "@/hooks/loadUser";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Notification } from "@/hooks/saveNotification";
/**
 * Componente que configura el diseño de navegación de pestañas para la aplicación.
 * Este componente configura y renderiza diferentes pestañas con iconos, e incluye
 * un indicador para señalar nuevas notificaciones.
 * @returns {JSX.Element} - El diseño de pestañas de la aplicación
 */

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useLoadUser();
  const userId = user?.id;
  const { notifications, loading, error } = useLoadNotifications(userId);
  const [updatedNotification, setUpdatedNotification] = useState(false);

  /**
   * Verifica nuevas notificaciones comparando las notificaciones actuales con las almacenadas.
   * Si hay nuevas notificaciones, actualiza el estado para mostrar un punto en la pestaña.
   * @param {Notification[]} notifications - Lista de notificaciones actuales.
   * @param {Function} setUpdatedNotification - Función para actualizar el estado de notificaciones nuevas.
   */

  const checkNotificationStatus = async (
    notifications: Notification[],
    setUpdatedNotification: {
      (value: React.SetStateAction<boolean>): void;
      (arg0: boolean): void;
    }
  ) => {
    try {
      const newNotifications = JSON.stringify(notifications);

      const seenNotifications = await AsyncStorage.getItem("Notifications");

      if (seenNotifications !== "[]" && newNotifications !== "[]") {
        if (seenNotifications !== newNotifications) {
          setUpdatedNotification(true);
          await AsyncStorage.setItem("Notifications", newNotifications);
        } else {
          setUpdatedNotification(false);
        }
      } else {
        setUpdatedNotification(false);
        await AsyncStorage.setItem("Notifications", newNotifications);
      }
    } catch (error) {
      console.error(
        "Error al verificar el estado de las notificaciones:",
        error
      );
    }
  };

  /**
   * useEffect para verificar el estado de las notificaciones cada vez que cambian.
   */
  useEffect(() => {
    checkNotificationStatus(notifications, setUpdatedNotification);
  }, [notifications]);

  /**
   * Restablece el estado de la notificación cuando el usuario accede a la pestaña de notificaciones.
   */
  const handleTabPress = () => {
    if (updatedNotification) {
      setUpdatedNotification(false);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Página Principal",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notificaciones",
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <TabBarIcon
                name={focused ? "notifications" : "notifications-outline"}
                color={color}
              />
              {/* Mostrar el punto si hay nuevas notificaciones */}
              {updatedNotification && !focused && (
                <View style={styles.notificationDot} />
              )}
            </View>
          ),
        }}
        listeners={{
          tabPress: () => {
            // Restablecer el estado de nueva notificación cuando el usuario entre en la pestaña
            handleTabPress();
          },
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: "Usuario",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "white",
  },
});
