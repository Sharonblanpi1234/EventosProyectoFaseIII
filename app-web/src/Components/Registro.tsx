// src/components/Registro.tsx

import React, { useState } from 'react';
import FormularioCliente from './FormularioCliente';
import FormularioProveedor from './FormularioProveedor';

const Registro: React.FC = () => {
  const [tipoRegistro, setTipoRegistro] = useState<'cliente' | 'proveedor' | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-teal-100 to-teal-300 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-gray-200 rounded-full p-4">
            <img src="/Images/Designer.png" alt="icon" className="" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center mb-4">Registro de Clientes y Proveedores</h1>
        
        {/* Cambia de flex-row a flex-col en pantallas pequeñas */}
        <div className="flex flex-col sm:flex-row justify-around mb-6 space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setTipoRegistro('cliente')}
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Registrar Cliente
          </button>
          <button
            onClick={() => setTipoRegistro('proveedor')}
            className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Registrar Proveedor
          </button>
        </div>
        
        <div>{tipoRegistro === 'cliente' && <FormularioCliente />}</div>
        <div>{tipoRegistro === 'proveedor' && <FormularioProveedor />}</div>
      </div>
    </div>
  );
};

export default Registro;
