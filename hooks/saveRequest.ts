import React, { useEffect} from "react";

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

/**
 * Componente que maneja el envío de una solicitud de evento a la API.
 * 
 * Este componente recibe una solicitud de evento y la envía a una API mediante una solicitud POST.
 * Gestiona el estado de envío (indicando si el proceso está en curso) y maneja la respuesta de la API,
 * llamando a las funciones `onSuccess` o `onError` según el resultado.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {EventRequest} props.eventRequest - La solicitud de evento que se enviará a la API.
 * @param {Function} props.onSuccess - Función que se ejecuta cuando la respuesta de la API es exitosa.
 * @param {Function} props.onError - Función que se ejecuta cuando ocurre un error en la solicitud.
 * @param {Function} props.setIsSubmitting - Función para establecer el estado de envío de datos.
 * 
 * @returns {null} - El componente no renderiza nada, su propósito es realizar la solicitud de datos.
 */
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
                setIsSubmitting(false);
            }
        };

        if (eventRequest) {
            sendEventData();
        }
    }, [eventRequest, onSuccess, onError]); 
    return null;
};


export default EventRequestFunction;
