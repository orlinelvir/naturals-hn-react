import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../firebase";

const Home = () => {
  const [destacados, setDestacados] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Traemos solo 3 productos para la vitrina principal
  const obtenerDestacados = async () => {
    try {
      const q = query(collection(db, "productos"), limit(3));
      const querySnapshot = await getDocs(q);
      const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDestacados(lista);
    } catch (error) {
      console.error("Error al cargar destacados:", error);
    }
    setCargando(false);
  };

  useEffect(() => {
    obtenerDestacados();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. SECCIÓN HERO (La bienvenida) */}
      <section className="relative bg-green-50 py-24 px-6 border-b-4 border-green-700 overflow-hidden">
        {/* Círculos decorativos de fondo */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 transform translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-green-900 mb-6 drop-shadow-sm leading-tight">
            Bienestar Natural <br className="hidden md:block" /> a tu Alcance
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Especialistas en medicina alternativa, suplementación orgánica y terapias de recuperación física.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/agendar" className="bg-green-700 text-white px-8 py-4 rounded-md font-bold hover:bg-green-800 transition shadow-lg text-lg">
              Agendar Evaluación
            </Link>
            <Link to="/suplementos" className="bg-white text-green-800 border-2 border-green-700 px-8 py-4 rounded-md font-bold hover:bg-green-50 transition shadow-lg text-lg">
              Ver Catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PRODUCTOS DESTACADOS (Vitrina) */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-green-800">Suplementos Destacados</h2>
            <p className="text-gray-600 mt-2">Nuestros productos más recomendados para tu salud.</p>
          </div>
          <Link to="/suplementos" className="hidden sm:block text-green-700 font-bold hover:underline">
            Ver todo el catálogo →
          </Link>
        </div>

        {cargando ? (
          <div className="text-center py-10 text-green-700 font-bold animate-pulse">Cargando vitrina...</div>
        ) : destacados.length === 0 ? (
          <div className="text-center py-10 text-gray-500">Agrega productos desde tu Panel de Control para verlos aquí.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destacados.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition flex flex-col overflow-hidden">
                <div className="h-48 bg-gray-50 p-4 flex justify-center items-center border-b">
                  {item.imagen ? (
                    <img src={item.imagen} alt={item.nombre} className="max-h-full object-contain" />
                  ) : (
                    <span className="text-gray-400 text-sm">Sin imagen</span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.nombre}</h3>
                  <p className="text-green-700 font-extrabold mb-4">L. {item.precio}</p>
                  <Link to="/suplementos" className="mt-auto text-center w-full bg-green-50 text-green-800 py-2 rounded font-bold hover:bg-green-100 transition">
                    Más información
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link to="/suplementos" className="sm:hidden block text-center mt-8 text-green-700 font-bold hover:underline">
          Ver todo el catálogo →
        </Link>
      </section>

      {/* 3. BANNER DE TERAPIAS (Llamado a la acción) */}
      <section className="bg-gray-900 text-white py-16 px-6 mt-auto">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas recuperación física o aliviar el estrés?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Conoce nuestros servicios profesionales de Acupuntura, Quiropraxia y Sueroterapia diseñados para restaurar tu equilibrio natural.
          </p>
          <Link to="/terapias" className="inline-block bg-white text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition shadow-lg">
            Conocer Terapias Clínicas
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;