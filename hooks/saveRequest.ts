import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

// eventTypes.ts (puedes crear un archivo separado para esto)
export interface EventRequest {
    id_evento: number | undefined;
    id_proveedor: number;
}

interface EventRequestProps {
    eventRequest: EventRequest;
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    onSuccess: (responseData: any) => void;
    onError: (errorMessage: string) => void;
}


const EventRequestFunction: React.FC<EventRequestProps> = ({ eventRequest,onSuccess, onError, setIsSubmitting }) => {
    useEffect(() => {
        const sendEventData = async () => {
            console.log("Intentando enviar datos del evento...");
            setIsSubmitting(true);
            try {
                const response = await fetch("http://10.0.2.2:5000/evento_proveedor", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(eventRequest),
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

        if (eventRequest) {
            sendEventData();
        }
    }, [eventRequest, onSuccess, onError]); // Solo ejecuta cuando cambia eventData
    return null;
};


export default EventRequestFunction;
