import React, { useEffect } from "react";

// eventTypes.ts (puedes crear un archivo separado para esto)
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
                // Establecer el estado a 'false' una vez completada la solicitud
                setIsSubmitting(false);
            }
        };

        if (eventData) {
            sendEventData();
        }
    }, [eventData, onSuccess, onError]); // Solo ejecuta cuando cambia eventData

    return null;
};


export default EventAPI;


