import { Image, StyleSheet, TouchableOpacity } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  /**
   * Redirige al formulario para crear un nuevo evento.
   */

  const handleEvent = () => {
    router.push("/EventForm");
  };

  /**
   * Redirige a la pantalla de servicios.
   */

  const handleServices = () => {
    router.push("/services");
  };

  /**
   * Redirige a la pantalla que muestra la lista de eventos.
   */

  const handleEvents = () => {
    router.push("/eventList");
  };

  /**
   * Redirige al formulario de seguimiento.
   */
  const handleFollow = () => {
    router.push("/idForm");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedText style={styles.title} type="title">
              Events
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.headerContainer}>
            <Image
              source={require("@/assets/images/images.jpg")}
              style={styles.headerImage}
            />
          </ThemedView>
        </>
      }
    >
      <ThemedView style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEvent}>
          <ThemedText style={styles.buttonText} type="button">
            Crear Evento
          </ThemedText>
          <TabBarIcon name={"create-outline"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleEvents}>
          <ThemedText style={styles.buttonText} type="button">
            Ver Eventos
          </ThemedText>
          <TabBarIcon name={"calendar"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleFollow}>
          <ThemedText style={styles.buttonText} type="button">
            Ver Seguimiento
          </ThemedText>
          <TabBarIcon name={"eye-outline"} />
          <TabBarIcon name={"analytics"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleServices}>
          <ThemedText style={styles.buttonText} type="button">
            Visualizar Proveedores
          </ThemedText>
          <TabBarIcon name={"storefront"} />
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  headerImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    opacity: 0.8,
  },
  titleContainer: {
    alignItems: "center",
    marginVertical: 15,
    backgroundColor: "rgba(161, 206, 220, 0.9)",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 33,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
    color: "black",
    textAlign: "center",
    letterSpacing: 1,
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    width: "40%",
    padding: 20,
    margin: 10,
    backgroundColor: "#A1CEDC",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "black",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
});
