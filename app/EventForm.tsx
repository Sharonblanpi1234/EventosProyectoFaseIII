import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { useLoadUser } from "../hooks/loadUser";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import EventAPI, { EventData } from "@/hooks/saveEvent";

export default function EventForm() {
  const { user } = useLoadUser();
  const [nombreEvento, setNombreEvento] = useState("");
  const [alimentacion, setAlimentacion] = useState("");
  const [decoracion, setDecoracion] = useState("");
  const [transporte, setTransporte] = useState("");
  const [alquilerLugar, setAlquilerLugar] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [asistentes, setAsistentes] = useState(0);
  const router = useRouter();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState<EventData | null>(null); // Estado para pasar los datos a EventAPI
  const [isSending, setIsSending] = useState(false);
  //console.log("user", user?.id);

  const handleSaveEvent = async () => {
    // Validación de campos
    if (
      !nombreEvento ||
      !selectedDate ||
      !startTime ||
      !endTime ||
      !alimentacion ||
      !decoracion ||
      !transporte ||
      !alquilerLugar ||
      !asistentes
    ) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    const newEventData: EventData = {
      id_cliente: user?.id,
      nombre_evento: nombreEvento,
      fecha_evento: selectedDate,
      hora_inicio: startTime?.toISOString().slice(11, 19),
      hora_final: endTime?.toISOString().slice(11, 19),
      alimentacion,
      decoracion,
      transporte,
      alquiler_lugar: alquilerLugar,
      comentarios,
      asistentes,
    };

    if (isSending) return; // Si ya se está enviando, no permitir otro envío
    setIsSending(true); // Cambiar estado a enviando
    // setEventData(newEventData); // Asigna los datos para el envío
    // setIsSubmitting(true); // Indica que se está enviando el formulario
    try {
      // Llama a la función para enviar los datos (asegúrate de que sea asíncrona)
      await sendEventData(newEventData); // Reemplaza con tu función para enviar datos
      Alert.alert("Éxito", "Evento guardado correctamente.");
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar el evento.");
      console.error("Error al guardar el evento:", error); // Log para depuración
    } finally {
      setIsSending(false); // Restablecer el estado de carga
    }
  };
  const sendEventData = async (eventData: EventData) => {
    <EventAPI
      eventData={eventData}
      onSuccess={handleSuccess}
      onError={handleError}
    />;
    router.push("/(tabs)/");
  };

  const handleSuccess = (responseData: any) => {
    Alert.alert("Éxito", "Evento guardado correctamente.");
    // Reiniciar el formulario
    setNombreEvento("");
    setAlimentacion("");
    setDecoracion("");
    setTransporte("");
    setAlquilerLugar("");
    setComentarios("");
    setSelectedDate("");
    setStartTime(null);
    setEndTime(null);
    setAsistentes(0);
    setIsSubmitting(false);
    setEventData(null); // Restablece el estado para detener el envío
  };

  const handleError = (errorMessage: string) => {
    Alert.alert("Error", errorMessage);
    setIsSubmitting(false);
    setEventData(null); // Restablece el estado para detener el envío
  };

  const handleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false); // Oculta el calendario al seleccionar la fecha
  };

  const handleStartTimeChange = (
    event: any,
    selectedTime: Date | undefined
  ) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const handleEndTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Evento</Text>

      <TextInput
        style={styles.inputText}
        placeholder="Nombre del Evento"
        value={nombreEvento}
        onChangeText={setNombreEvento}
      />

      <View style={styles.dateTimeSection}>
        <TouchableOpacity style={styles.dateButton} onPress={handleCalendar}>
          <Text style={styles.dateButtonText}>
            {selectedDate ? `Fecha: ${selectedDate}` : "Elegir fecha"}
          </Text>
        </TouchableOpacity>
        {showCalendar && (
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
              [selectedDate]: {
                selected: true,
                marked: true,
                selectedColor: "#4CAF50",
              },
            }}
          />
        )}
      </View>

      <View style={styles.timePickerSection}>
        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setShowStartTimePicker(true)}
        >
          <Text style={styles.timeButtonText}>
            {startTime
              ? `Hora de Inicio: ${startTime.toLocaleTimeString()}`
              : "Seleccionar Hora de Inicio"}
          </Text>
        </TouchableOpacity>
        {showStartTimePicker && (
          <DateTimePicker
            value={startTime || new Date()}
            mode="time"
            display="default"
            onChange={handleStartTimeChange}
          />
        )}

        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setShowEndTimePicker(true)}
        >
          <Text style={styles.timeButtonText}>
            {endTime
              ? `Hora de Fin: ${endTime.toLocaleTimeString()}`
              : "Seleccionar Hora de Fin"}
          </Text>
        </TouchableOpacity>
        {showEndTimePicker && (
          <DateTimePicker
            value={endTime || new Date()}
            mode="time"
            display="default"
            onChange={handleEndTimeChange}
          />
        )}
      </View>

      <TextInput
        style={styles.inputText}
        placeholder="Alimentación (ej. 50 hamburguesas)"
        value={alimentacion}
        onChangeText={setAlimentacion}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Decoración (ej. Globos rojos y azules)"
        value={decoracion}
        onChangeText={setDecoracion}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Transporte (ej. 2 autobuses)"
        value={transporte}
        onChangeText={setTransporte}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Alquiler del Lugar (ej. Salón de fiestas)"
        value={alquilerLugar}
        onChangeText={setAlquilerLugar}
      />
      <TextInput
        style={styles.inputText}
        placeholder="Comentarios adicionales"
        value={comentarios}
        onChangeText={setComentarios}
        multiline
      />
      <TextInput
        style={styles.inputText}
        placeholder="Número de invitados"
        value={String(asistentes)} // Convierte el número a string para mostrarlo
        onChangeText={(text) => setAsistentes(text ? parseInt(text) : 0)} // Convierte el texto a número
        keyboardType="numeric" // Asegura que se muestre el teclado numérico
        multiline={false} // Asegura que no se permita varias líneas
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveEvent}>
        <Text style={styles.buttonText}>Guardar Evento</Text>
      </TouchableOpacity>
      {/* {eventData && (
          <EventAPI
            eventData={eventData}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        )} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
  dateTimeSection: {
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: "#A1CEDC",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  dateButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  timePickerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  timeButton: {
    flex: 1,
    backgroundColor: "#A1CEDC",
    borderRadius: 10,
    paddingVertical: 12,
    marginHorizontal: 5,
    alignItems: "center",
  },
  timeButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#A1CEDC",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputText: {
    width: "100%",
    height: 50,
    borderColor: "#A1CEDC",
    borderWidth: 4,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
});
