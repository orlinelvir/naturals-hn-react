import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    try {
      // 1. Crear el usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Crear su "expediente" en Firestore asignándole el rol de "cliente" por defecto
      await setDoc(doc(db, "usuarios", user.uid), {
        nombreCompleto: nombre,
        correo: email,
        rol: "cliente",
        fechaRegistro: new Date()
      });

      // 3. Si todo sale bien, lo mandamos a su nuevo perfil personal
      navigate("/perfil");
      
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        setError("Este correo ya está registrado.");
      } else if (error.code === 'auth/weak-password') {
        setError("La contraseña debe tener al menos 6 caracteres.");
      } else {
        setError("Hubo un error al crear la cuenta. Intenta nuevamente.");
      }
    }
    
    setCargando(false);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full border-t-4 border-green-700">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-2">Crear Cuenta</h2>
        <p className="text-center text-gray-500 mb-8">Únete a Naturals HN</p>
        
        <form onSubmit={manejarRegistro} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-bold mb-1">Nombre Completo</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500 outline-none" placeholder="Ej. Juan Pérez" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">Correo Electrónico</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500 outline-none" placeholder="correo@ejemplo.com" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border p-3 rounded focus:ring-2 focus:ring-green-500 outline-none" placeholder="Mínimo 6 caracteres" />
          </div>
          
          <button type="submit" disabled={cargando} className={`w-full text-white font-bold py-3 rounded transition shadow-md ${cargando ? 'bg-gray-400' : 'bg-green-700 hover:bg-green-800'}`}>
            {cargando ? 'Creando cuenta...' : 'Registrarme'}
          </button>
          
          {error && <p className="text-red-500 text-center text-sm mt-4 p-2 bg-red-50 rounded border border-red-200">{error}</p>}
        </form>

        <div className="mt-6 text-center border-t pt-4">
          <p className="text-gray-600 text-sm">¿Ya tienes una cuenta?</p>
          <Link to="/login" className="text-green-700 font-bold hover:underline">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registro;