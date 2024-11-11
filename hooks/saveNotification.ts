import React, { useEffect, useState } from "react";

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
/**
 * Componente que maneja el envío de una notificación de evento a través de una API.
 * 
 * Este componente recibe una notificación de evento y la envía a una API mediante una solicitud POST.
 * Gestiona el estado de envío (indicando si el proceso está en curso) y maneja la respuesta de la API, 
 * llamando a las funciones `onSuccess` o `onError` según el resultado.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Notification} props.notification - La notificación de evento que se enviará a la API.
 * @param {Function} props.onSuccess - Función que se ejecuta cuando la respuesta de la API es exitosa.
 * @param {Function} props.onError - Función que se ejecuta cuando ocurre un error en la solicitud.
 * @param {Function} props.setIsSubmitting - Función para establecer el estado de envío de datos.
 * 
 * @returns {null} - El componente no renderiza nada, su propósito es realizar la solicitud de datos.
 */

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
                setIsSubmitting(false);
            }
        };

        if (notification) {
            sendEventData();
        }
    }, [notification, onSuccess, onError]); 
    return null;
};


export default EventNotification;
