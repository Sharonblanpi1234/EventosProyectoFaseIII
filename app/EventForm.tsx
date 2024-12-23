import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useLoadUser } from "../hooks/loadUser";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import EventAPI, { EventData } from "@/hooks/saveEvent";

/**
 * Componente que representa un formulario para registrar un evento.
 * Permite al usuario ingresar los detalles del evento como nombre,
 * fecha, hora, alimentación, decoración, transporte, lugar y asistentes.
 */
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
  const [eventData, setEventData] = useState<EventData | null>(null);

  /** Maneja el guardado del evento */
  const handleSaveEvent = () => {
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
    if (!user) {
      Alert.alert("Error", "Necesita iniciar sesión para realizar esta acción");
      return;
    }

    setEventData({
      id_cliente: user?.id,
      nombre_evento: nombreEvento,
      fecha_evento: selectedDate,
      hora_inicio: startTime.toISOString().slice(11, 19),
      hora_final: endTime.toISOString().slice(11, 19),
      alimentacion,
      decoracion,
      transporte,
      alquiler_lugar: alquilerLugar,
      comentarios,
      asistentes,
    });
  };

  const handleSuccess = () => {
    Alert.alert("Éxito", "Evento guardado correctamente.");
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
    setEventData(null);
    router.push("/(tabs)/");
  };

  const handleError = (errorMessage: string) => {
    Alert.alert("Error", errorMessage);
    setEventData(null);
  };

  const handleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
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
        value={String(asistentes)}
        onChangeText={(text) => setAsistentes(text ? parseInt(text) : 0)}
        keyboardType="numeric"
        multiline={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveEvent}>
        <Text style={styles.buttonText}>Guardar Evento</Text>
      </TouchableOpacity>
      {eventData && !isSubmitting && (
        <EventAPI
          eventData={eventData}
          onSuccess={handleSuccess}
          onError={handleError}
          setIsSubmitting={setIsSubmitting}
        />
      )}
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
