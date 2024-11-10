import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import useLoadNotifications from "@/hooks/loadNotifications";
import { useLoadUser } from "@/hooks/loadUser";
import { View, StyleSheet } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useLoadUser(); // Incluye loading y error
  const userId = user?.id;

  // Obtener las notificaciones usando el hook
  const { notifications, loading, error } = useLoadNotifications(userId);
  const [updatedNotifications, setUpdatedNotifications] =
    useState(notifications);

  // Estado para controlar si hay una nueva notificación
  const [newNotification, setNewNotification] = useState<boolean>(false);

  // Cuando se obtienen las notificaciones, comprobamos si hay una nueva
  useEffect(() => {
    if (notifications.length > updatedNotifications.length) {
      setNewNotification(true); // Si hay notificaciones, marcar como nueva
    } else {
      setNewNotification(false); // Si no hay notificaciones, quitar el estado
    }
  }, [notifications]);

  // Función para manejar la entrada a la pantalla de notificaciones
  const handleTabPress = () => {
    if (newNotification) {
      setNewNotification(false); // Eliminar el punto cuando el usuario entra en la pestaña de notificaciones
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
          title: "Home",
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
          title: "Settings",
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
          title: "Notifications",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "notifications" : "notifications-outline"}
              color={color}
              onPress={handleTabPress} // Llamar a la función cuando se presiona
            >
              {/* Mostrar el punto si hay nuevas notificaciones */}
              {newNotification && !focused && (
                <View style={styles.notificationDot} />
              )}
            </TabBarIcon>
          ),
        }}
        listeners={{
          tabPress: () => {
            // Restablecer el estado de nueva notificación cuando el usuario entre en la pestaña
            setNewNotification(false);
          },
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
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
  notificationDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "white",
  },
});
