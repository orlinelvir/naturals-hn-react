import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Suplementos from './components/Suplementos';
import Terapias from './components/Terapias';
import BookingForm from './components/BookingForm';
import Carrito from './pages/Carrito'; // <-- Importamos la nueva página

import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Registro from './pages/Registro';
import Perfil from './pages/Perfil';

function App() {
  // --- MEMORIA GLOBAL DEL CARRITO (Con LocalStorage) ---
  // 1. Al cargar la página, revisamos si había algo guardado de antes
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carritoNaturals');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // 2. Cada vez que el carrito cambie (agregas o quitas algo), lo guardamos automáticamente
  React.useEffect(() => {
    localStorage.setItem('carritoNaturals', JSON.stringify(carrito));
  }, [carrito]);

  // Función para agregar productos (evita duplicados y suma cantidades)
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find(item => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map(item => item.id === producto.id ? { ...existe, cantidad: existe.cantidad + 1 } : item));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
    alert(`${producto.nombre} agregado al carrito 🛒`);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans selection:bg-green-100">
        {/* Le pasamos el carrito al Navbar para que muestre el numerito */}
        <Navbar carrito={carrito} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} /> 
            {/* Le pasamos la función a Suplementos */}
            <Route path="/suplementos" element={<Suplementos agregarAlCarrito={agregarAlCarrito} />} />
            <Route path="/terapias" element={<Terapias />} />
            <Route path="/agendar" element={<BookingForm />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/perfil" element={<Perfil />} />
            
            {/* RUTA DEL CARRITO */}
            <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;