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
}

const EventAPI: React.FC<EventAPIProps> = ({ eventData, onSuccess, onError }) => {
    useEffect(() => {
        const sendEventData = async () => {
            console.log("Intentando enviar datos del evento...");
            console.log(eventData.fecha_evento)
            try {
                const response = await fetch("http://10.0.2.2:5000/events", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(eventData),
                });

                if (response.ok) {
                    console.log("Solicitud exitosa");
                    const responseData = await response.json();
                    onSuccess(responseData);
                } else {
                    const errorData = await response.json();
                    console.log("Solicitud fallida");
                    console.error("Error al guardar el evento:", errorData);
                    onError("Hubo un problema al guardar el evento. Intenta de nuevo.");
                }
            } catch (error) {
                console.log("Error de red");
                console.error("Error de red:", error);
                onError("Hubo un problema al guardar el evento. Intenta de nuevo.");
            }
        };

        // Solo ejecuta la función si eventData está disponible
        if (eventData) {
            sendEventData();
        }
    }, [eventData, onSuccess, onError]); // Ejecuta el efecto solo cuando eventData cambia

    return null;
};

export default EventAPI;


