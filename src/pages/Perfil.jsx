import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Perfil = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-green-800">Mi Perfil</h1>
          <button onClick={() => signOut(auth)} className="text-red-600 font-medium">Cerrar Sesión</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h2 className="text-xl font-bold text-green-800 mb-4">Información Personal</h2>
            <p className="text-gray-600"><strong>Correo:</strong> {auth.currentUser?.email}</p>
            <p className="text-gray-400 text-sm mt-4 italic">Pronto podrás editar tus datos personales aquí.</p>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Mis Pedidos</h2>
            <p className="text-gray-500">Aún no has realizado pedidos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;