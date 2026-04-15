import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// 1. Recibimos la función agregarAlCarrito como prop
const Suplementos = ({ agregarAlCarrito }) => {
  const [suplementos, setSuplementos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const lista = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSuplementos(lista);
    } catch (error) {
      console.error("Error al cargar los suplementos:", error);
    }
    setCargando(false);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <section id="suplementos" className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Nuestros Suplementos Destacados</h2>
      
      {cargando ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-xl text-green-700 font-bold animate-pulse">Cargando catálogo natural...</p>
        </div>
      ) : suplementos.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p>Pronto agregaremos nuevos productos a nuestro catálogo.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {suplementos.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300 flex flex-col">
              
              <div className="h-56 bg-gray-50 p-4 flex items-center justify-center border-b">
                {item.imagen ? (
                  <img src={item.imagen} alt={item.nombre} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                ) : (
                  <span className="text-gray-400 font-medium">Sin imagen</span>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-bold text-green-700 leading-tight">{item.nombre}</h3>
                  <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-full text-sm">
                    L. {item.precio}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{item.descripcion}</p>
                
                {/* 2. El botón ahora tiene el evento onClick */}
                <button 
                  onClick={() => agregarAlCarrito(item)} 
                  className={`w-full font-bold py-3 rounded-md transition shadow-md ${item.stock > 0 ? 'bg-green-700 hover:bg-green-800 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  disabled={item.stock <= 0}
                >
                  {item.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
                </button>
                {item.stock > 0 && item.stock <= 5 && (
                  <p className="text-orange-500 text-xs text-center mt-2 font-semibold">¡Solo quedan {item.stock} disponibles!</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}; // <--- Esta era la llave que faltaba para cerrar el componente

export default Suplementos;