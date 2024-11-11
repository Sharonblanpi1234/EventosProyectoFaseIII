import React, { useEffect } from "react";

export interface EventData {
    id_evento?: number;
    id_cliente: number | undefined;
    nombre_evento: string;
    fecha_evento: string;
    hora_inicio: string;
    hora_final: string;
    alimentacion: string;
    decoracion: string;
    transporte: string;
    alquiler_lugar: string;
    comentarios: string;
    asistentes: number;
}

interface EventAPIProps {
    eventData: EventData;
    onSuccess: (responseData: any) => void;
    onError: (errorMessage: string) => void;
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}
/**
 * Componente que maneja el envío de datos de un evento a través de una API.
 * 
 * Este componente toma los datos de un evento y los envía a una API mediante una solicitud POST.
 * Se encarga de gestionar el estado de envío de datos (indicando si está enviando, y manejando los
 * errores o éxitos), y llama a las funciones `onSuccess` o `onError` dependiendo del resultado.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {EventData} props.eventData - Los datos del evento que se enviarán a la API.
 * @param {Function} props.onSuccess - Función que se ejecuta cuando la respuesta de la API es exitosa.
 * @param {Function} props.onError - Función que se ejecuta cuando ocurre un error en la solicitud.
 * @param {Function} props.setIsSubmitting - Función para establecer el estado de envío de datos.
 * 
 * @returns {null} - El componente no renderiza nada, su propósito es realizar la solicitud de datos.
 */

const EventAPI: React.FC<EventAPIProps> = ({ eventData, onSuccess, onError, setIsSubmitting }) => {
    useEffect(() => {
        const sendEventData = async () => {
            console.log("Intentando enviar datos del evento...");
            setIsSubmitting(true);
            try {
                const response = await fetch("http://10.0.2.2:5000/events", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(eventData),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    onSuccess(responseData);
                } else {
                    const errorData = await response.json();
                    console.error("Error al guardar el evento:", errorData);
                    onError("Hubo un problema al guardar el evento. Intenta de nuevo.");
                }
            } catch (error) {
                console.error("Error de red:", error);
                onError("Hubo un problema al guardar el evento. Intenta de nuevo.");
            } finally {
                setIsSubmitting(false);
            }
        };

        if (eventData) {
            sendEventData();
        }
    }, [eventData, onSuccess, onError]); 

    return null;
};


export default EventAPI;


