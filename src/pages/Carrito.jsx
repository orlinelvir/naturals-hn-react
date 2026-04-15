import React from 'react';
import { Link } from 'react-router-dom';

const Carrito = ({ carrito, setCarrito }) => {
  
  // Calcular el total a pagar
  const total = carrito.reduce((suma, item) => suma + (item.precio * item.cantidad), 0);

  // Función para procesar y enviar a WhatsApp
  const enviarPedidoWhatsApp = () => {
    let mensaje = "Hola Naturals HN, me gustaría realizar el siguiente pedido:\n\n";
    
    carrito.forEach(item => {
      mensaje += `- ${item.cantidad}x ${item.nombre} (L. ${item.precio * item.cantidad})\n`;
    });
    
    mensaje += `\n*Total a pagar: L. ${total}*\n\n¿A qué cuenta bancaria puedo realizar la transferencia?`;
    
    // El número de la clínica
    const numeroWhatsApp = "50499255867"; 
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(url, '_blank');
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  if (carrito.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-6">Explora nuestro catálogo y descubre suplementos para tu bienestar.</p>
        <Link to="/suplementos" className="bg-green-700 text-white px-6 py-3 rounded-md font-bold hover:bg-green-800 transition">
          Ver Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 max-w-4xl mx-auto min-h-screen">
      <h2 className="text-3xl font-bold text-green-800 mb-8 border-b pb-4">Tu Carrito de Compras</h2>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        {carrito.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b py-4 last:border-0">
            <div className="flex items-center gap-4">
              {item.imagen ? (
                <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded border" />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded border"></div>
              )}
              <div>
                <h3 className="font-bold text-lg text-gray-800">{item.nombre}</h3>
                <p className="text-gray-500">L. {item.precio} x {item.cantidad}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <p className="font-bold text-green-700 text-lg">L. {item.precio * item.cantidad}</p>
              <button onClick={() => eliminarDelCarrito(item.id)} className="text-red-500 hover:text-red-700 font-bold bg-red-50 px-3 py-1 rounded">
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-50 rounded-xl p-6 border border-green-200 flex flex-col md:flex-row justify-between items-center">
        <div>
          <p className="text-gray-600 mb-1">Total del pedido:</p>
          <p className="text-3xl font-extrabold text-green-900">L. {total}</p>
        </div>
        <button 
          onClick={enviarPedidoWhatsApp}
          className="mt-4 md:mt-0 bg-[#25D366] text-white px-8 py-4 rounded-md font-bold hover:bg-green-500 transition shadow-lg flex items-center gap-2 text-lg"
        >
          Pagar y Enviar a WhatsApp
        </button>
      </div>
    </div>
  );
};

export default Carrito;