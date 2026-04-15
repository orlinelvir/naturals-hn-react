import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- Herramienta de la base de datos
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"; // Importar Storage

const firebaseConfig = {
  apiKey: "AIzaSyA3AU-VC4BLf9G9PjzxCeGkSdMmso1-Spc",
  authDomain: "naturals-hn.firebaseapp.com",
  projectId: "naturals-hn",
  storageBucket: "naturals-hn.firebasestorage.app",
  messagingSenderId: "432112011962",
  appId: "1:432112011962:web:70f3a87f49befbcad1d083"
};

// Inicializamos la app
export const app = initializeApp(firebaseConfig);

// Inicializamos y EXPORTAMOS la base de datos (¡Esta es la línea que React no encontraba!)
export const db = getFirestore(app);

// Exportamos el sistema de autenticación (¡NUEVO!)
export const auth = getAuth(app);

export const storage = getStorage(app); // Exportar la conexión a archivos