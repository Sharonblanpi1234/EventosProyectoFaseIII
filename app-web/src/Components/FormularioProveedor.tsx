// src/components/FormularioProveedor.tsx

import React, { useState } from 'react';
import { handleFormSubmit } from '../Services/AxiosConfig';

const FormularioProveedor: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [servicio, setServicio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Nueva contraseña
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [website, setWebsite] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      nombre,
      servicio,
      email,
      password_hash: password, // La contraseña será procesada en el backend
      telefono,
      direccion,
      website,
      calificacion: parseFloat(calificacion) || null,
      descripcion,
    };

    // Usa la configuración de AxiosConfig.ts para manejar la solicitud
    await handleFormSubmit(formData, 'proveedor');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold">Registro de Proveedor</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Servicio"
        value={servicio}
        onChange={(e) => setServicio(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="url"
        placeholder="Sitio Web"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Calificación"
        value={calificacion}
        onChange={(e) => setCalificacion(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
        Registrar Proveedor
      </button>
    </form>
  );
};

export default FormularioProveedor;
