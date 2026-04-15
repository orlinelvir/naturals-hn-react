import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const ProtectedRoute = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Firebase nos avisa en tiempo real si hay alguien logueado o si cerraron sesión
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUsuario(currentUser);
      setCargando(false);
    });
    
    return () => unsubscribe();
  }, []);

  if (cargando) {
    return <div className="min-h-screen flex items-center justify-center text-green-800 font-bold text-xl">Verificando credenciales de seguridad...</div>;
  }

  // Si no hay usuario logueado, lo expulsamos a la página de login
  if (!usuario) {
    return <Navigate to="/login" />;
  }

  // Si está logueado, le mostramos el componente que pidió (el Panel Admin)
  return children;
};

export default ProtectedRoute;