import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom'; // <-- REVISA QUE DIGA ', Link' AQUÍ

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    try {
      // 1. Autenticación básica
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Consultar el rol en Firestore
      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().rol === "admin") {
        navigate("/admin"); // Es admin, va al panel de control
      } else {
        navigate("/perfil"); // Es cliente, va a su área personal
      }
    } catch (error) {
      setError("Credenciales incorrectas o usuario no registrado.");
    }
    setCargando(false);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full border-t-4 border-green-700">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Naturals HN</h2>
        <form onSubmit={manejarLogin} className="space-y-6">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border p-3 rounded" placeholder="Correo electrónico" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border p-3 rounded" placeholder="Contraseña" />
          <button type="submit" disabled={cargando} className="w-full bg-green-700 text-white font-bold py-3 rounded">
            {cargando ? 'Verificando...' : 'Entrar a Mi Cuenta'}
          </button>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        </form>
        <div className="mt-6 text-center border-t pt-4">
          <p className="text-gray-600 text-sm">¿Aún no tienes cuenta?</p>
          <Link to="/registro" className="text-green-700 font-bold hover:underline">
            Regístrate como paciente aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;