// src/utils/AxiosConfig.ts
import axios from 'axios';

export const handleFormSubmit = async (formData: any, tipoRegistro: 'cliente' | 'proveedor') => {
  const endpoint = tipoRegistro === 'cliente' ? '/clientes' : '/proveedores';

  try {
    const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
    console.log(response.data);

    if (response.status === 201) {
      alert(`${tipoRegistro.charAt(0).toUpperCase() + tipoRegistro.slice(1)} registrado exitosamente`);
    }
  } catch (error) {
    // Muestra información detallada sobre el error
    if (axios.isAxiosError(error)) {
      console.error('Error de Axios:', error.response ? error.response.data : error.message);
      alert(`Hubo un error al conectar con el servidor: ${error.message}`);
    } else {
      console.error('Error inesperado:', error);
      alert('Hubo un error inesperado al conectar con el servidor');
    }
  }
};
