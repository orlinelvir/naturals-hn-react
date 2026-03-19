import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- Herramienta de la base de datos

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