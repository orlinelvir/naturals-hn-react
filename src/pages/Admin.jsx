import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase"; // Importamos auth para el botón de salir
import { signOut } from 'firebase/auth';
import Inventario from '../components/Inventario'; // Importamos el nuevo módulo

const Admin = () => {
  const [vistaActiva, setVistaActiva] = useState('citas'); // 'citas' o 'inventario'
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerCitas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "citas"));
      const listaCitas = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCitas(listaCitas);
    } catch (error) {
      console.error("Error al obtener las citas:", error);
    }
    setCargando(false);
  };

  useEffect(() => {
    obtenerCitas();
  }, []);

  const marcarComoAtendido = async (id) => {
    if(window.confirm("¿Seguro que deseas marcar este paciente como atendido?")) {
      await deleteDoc(doc(db, "citas", id));
      obtenerCitas(); 
    }
  };

  const cerrarSesion = () => {
    signOut(auth);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* ENCABEZADO DEL PANEL */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Panel de Control</h1>
          <button onClick={cerrarSesion} className="text-red-600 hover:bg-red-50 px-4 py-2 rounded border border-red-200 transition font-medium">
            Cerrar Sesión
          </button>
        </div>

        {/* MENÚ DE PESTAÑAS */}
        <div className="flex gap-4 mb-6 border-b pb-4">
          <button 
            onClick={() => setVistaActiva('citas')} 
            className={`px-6 py-2 rounded-md font-bold transition ${vistaActiva === 'citas' ? 'bg-green-700 text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
          >
            📋 Citas Médicas
          </button>
          <button 
            onClick={() => setVistaActiva('inventario')} 
            className={`px-6 py-2 rounded-md font-bold transition ${vistaActiva === 'inventario' ? 'bg-green-700 text-white shadow-md' : 'bg-white text-gray-600 border hover:bg-gray-50'}`}
          >
            📦 Inventario
          </button>
          <button 
            disabled
            className="px-6 py-2 rounded-md font-bold text-gray-400 bg-gray-100 border cursor-not-allowed hidden md:block"
          >
            👤 CRM (Próximamente)
          </button>
        </div>

        {/* CONTENIDO DINÁMICO */}
        {vistaActiva === 'citas' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-t-4 border-green-700">
            <div className="p-6 bg-gray-50 flex justify-between items-center border-b">
              <h2 className="text-xl font-semibold text-gray-800">Citas Pendientes</h2>
              <button onClick={obtenerCitas} className="bg-white border hover:bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm transition font-medium shadow-sm">
                ↻ Actualizar
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="p-4 border-b">Paciente</th>
                    <th className="p-4 border-b">Servicio</th>
                    <th className="p-4 border-b">Modalidad</th>
                    <th className="p-4 border-b text-center">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {cargando ? (
                    <tr><td colSpan="4" className="p-4 text-center text-gray-500">Cargando datos...</td></tr>
                  ) : citas.length === 0 ? (
                    <tr><td colSpan="4" className="p-4 text-center text-gray-500">No hay citas pendientes.</td></tr>
                  ) : (
                    citas.map((cita) => (
                      <tr key={cita.id} className="hover:bg-gray-50 transition border-b">
                        <td className="p-4 font-medium text-gray-800">{cita.nombreCliente}</td>
                        <td className="p-4 text-gray-600">{cita.servicioInteres}</td>
                        <td className="p-4 text-gray-600">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${cita.modalidadElegida === 'A Domicilio' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {cita.modalidadElegida}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button onClick={() => marcarComoAtendido(cita.id)} className="bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1 rounded border border-green-200 transition text-sm font-medium">
                            ✔ Atendido
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {vistaActiva === 'inventario' && (
           <Inventario />
        )}

      </div>
    </div>
  );
};

export default Admin;