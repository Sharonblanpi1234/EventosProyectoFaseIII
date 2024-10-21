import { Image, StyleSheet, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useFonts } from "expo-font";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function HomeScreen() {
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
              style={styles.headerImage} // Ajusta el estilo de la imagen
            />
          </ThemedView>
        </>
      }
    >
      <ThemedView style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText} type="button">
            Crear Evento
          </ThemedText>
          <TabBarIcon name={"create-outline"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText} type="button">
            Ver Eventos
          </ThemedText>
          <TabBarIcon name={"calendar"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <ThemedText style={styles.buttonText} type="button">
            Ver Seguimiento
          </ThemedText>
          <TabBarIcon name={"eye-outline"} />
          <TabBarIcon name={"analytics"} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
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
  },
  headerImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  titleContainer: {
    alignItems: "center",
    marginVertical: 15,
    backgroundColor: "#A1CEDC",
  },
  title: {
    fontSize: 33, // Tamaño de fuente más grande
    fontWeight: "bold", // Peso de la fuente
    fontFamily: "SpaceMono",
    color: "black", // Color blanco para el texto
    textAlign: "center",
    letterSpacing: 1, // Espaciado entre letras
    textShadowColor: "#000000", // Color de la sombra
    textShadowOffset: { width: 1, height: 1 }, // Desplazamiento de la sombra
    textShadowRadius: 1, // Difuminado de la sombra
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    width: "40%",
    padding: 20,
    margin: 10, // Espaciado reducido para que los botones se toquen
    backgroundColor: "#A1CEDC",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "black",
    elevation: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
