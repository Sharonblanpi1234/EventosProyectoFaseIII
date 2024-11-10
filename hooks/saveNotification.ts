import React, { useEffect, useState } from "react";

// eventTypes.ts (puedes crear un archivo separado para esto)
export interface Notification {
    id_notificacion?: number;
    id_evento: number | undefined;
    id_usuario: number;
    mensaje: string; 
    fecha?: string;
}

interface EventNotificationProps {
    notification: Notification;
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    onSuccess: (responseData: any) => void;
    onError: (errorMessage: string) => void;
}


const EventNotification: React.FC<EventNotificationProps> = ({ notification, onSuccess, onError, setIsSubmitting }) => {
    useEffect(() => {
        const sendEventData = async () => {
            console.log("Intentando enviar datos del evento...");
            setIsSubmitting(true);
            try {
                const response = await fetch("http://10.0.2.2:5000/add_notification", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(notification),
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

        if (notification) {
            sendEventData();
        }
    }, [notification, onSuccess, onError]); // Solo ejecuta cuando cambia eventData
    return null;
};


export default EventNotification;
