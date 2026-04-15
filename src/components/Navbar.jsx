import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ carrito = [] }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "text-green-200 border-b-2 border-green-200" : "hover:text-green-200 transition";
  };

  // Calcular cuántos artículos hay en el carrito
  const totalArticulos = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  return (
    <header className="flex justify-between items-center p-4 px-8 bg-green-700 text-white sticky top-0 z-50 shadow-md">
      
      <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
        <img src="/Clinica Blanco.png" alt="Naturals HN Logo" className="h-14 w-auto object-contain" />
      </Link>

      <nav className="hidden md:flex gap-6 font-medium items-center">
        <Link to="/" className={isActive("/")}>Inicio</Link>
        <Link to="/suplementos" className={isActive("/suplementos")}>Suplementos</Link>
        <Link to="/terapias" className={isActive("/terapias")}>Terapias</Link>
        <Link to="/agendar" className="bg-white text-green-700 px-5 py-2 rounded-md hover:bg-green-100 transition shadow-sm font-bold">
          Agendar Cita
        </Link>
        
        <div className="h-6 w-px bg-green-500 mx-2"></div> {/* Separador */}

        {/* ICONO DEL CARRITO */}
        <Link to="/carrito" className="relative flex items-center hover:text-green-200 transition">
          <span className="text-2xl">🛒</span>
          {totalArticulos > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
              {totalArticulos}
            </span>
          )}
        </Link>

        {/* BOTÓN DE ACCESO ÚNICO */}
        <Link to="/login" className="hover:text-green-200 transition text-sm flex items-center gap-1">
          👤 Mi Cuenta
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;