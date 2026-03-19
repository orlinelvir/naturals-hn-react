import React, { useState } from 'react';
// 1. Importamos las herramientas mágicas de Firebase
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./firebase"; // Tu archivo de conexión

function App() {
  const suplementos = [
    {
      id: 1,
      nombre: "Vitamina C-1000",
      descripcion: "Refuerza tu sistema inmunológico y protege tus células con vitamina C de alta pureza.",
      imagen: "/Puritans/c-1000.png"
    },
    {
      id: 2,
      nombre: "Calcio Absorbible 1200 mg",
      descripcion: "Calcio de rápida absorción enriquecido con Vitamina D3 para fortalecer huesos y articulaciones.",
      imagen: "/Puritans/Calcio Absorbible 1200 mg.png"
    },
    {
      id: 3,
      nombre: "Melatonina",
      descripcion: "Regula tu ciclo de sueño de forma natural para un descanso profundo y reparador.",
      imagen: "/Puritans/MELATONIN.png"
    },
    {
      id: 4,
      nombre: "Omega 3 Natural",
      descripcion: "Ácidos grasos esenciales para proteger tu salud cardiovascular y cerebral.",
      imagen: "/Puritans/Omega 3 Natura.png"
    }
  ];

  const terapias = [
    {
      id: 1,
      nombre: "Acupuntura Profesional",
      descripcion: "Terapia milenaria para equilibrar tu energía, aliviar el dolor crónico y reducir el estrés.",
      imagen: "/Material/Acupuntura/acupuntura1.jpg" 
    },
    {
      id: 2,
      nombre: "Sueroterapia",
      descripcion: "Cócteles vitamínicos intravenosos para hidratación profunda y recuperación inmediata.",
      imagen: "/Material/Sueroterapia/suero1.jpg"
    },
    {
      id: 3,
      nombre: "Quiropraxia",
      descripcion: "Alineación física experta para corregir postura y liberar la tensión acumulada en la columna.",
      imagen: "/Material/Quiropraxia/quiro1.jpg"
    }
  ];

  // --- 2. ESTADOS DEL FORMULARIO Y FIREBASE ---
  const [mensajeExito, setMensajeExito] = useState("");
  const [cargando, setCargando] = useState(false); // Para mostrar "Enviando..."
  
  // Guardamos lo que el usuario escribe
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    modalidad: "En la Tienda",
    servicio: "Examen Cuántico"
  });

  // Función que actualiza el estado cuando el usuario teclea o selecciona
  const manejarCambio = (e) => {
    setDatosFormulario({
      ...datosFormulario,
      [e.target.name]: e.target.value
    });
  };

  // --- 3. ENVÍO DE DATOS A LA NUBE ---
  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setCargando(true); // Encendemos el modo de carga

    try {
      // Intentamos guardar en la colección "citas" de Firebase
      await addDoc(collection(db, "citas"), {
        nombreCliente: datosFormulario.nombre,
        modalidadElegida: datosFormulario.modalidad,
        servicioInteres: datosFormulario.servicio,
        fechaRegistro: new Date() // Guarda la fecha y hora exacta
      });

      // Si todo sale bien, mostramos el éxito y limpiamos el formulario
      setMensajeExito("¡Gracias! Hemos recibido tu solicitud. Nos contactaremos pronto para confirmar tu espacio.");
      setDatosFormulario({ nombre: "", modalidad: "En la Tienda", servicio: "Examen Cuántico" });
      
    } catch (error) {
      console.error("Error al guardar la cita: ", error);
      setMensajeExito("Hubo un error al conectar con el servidor. Intenta de nuevo.");
    }

    setCargando(false); // Apagamos el modo de carga
    
    // Borramos el mensaje después de 5 segundos
    setTimeout(() => {
      setMensajeExito("");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans cursor-default scroll-smooth">
      
      <header className="flex justify-between items-center p-4 px-8 bg-green-700 text-white sticky top-0 z-50 shadow-md">
        <div className="text-2xl font-bold tracking-wide">Naturals HN</div>
        <nav className="hidden md:block">
          <ul className="flex gap-6 font-medium">
            <li><a href="#inicio" className="hover:text-green-200 transition">Inicio</a></li>
            <li><a href="#suplementos" className="hover:text-green-200 transition">Suplementos</a></li>
            <li><a href="#terapias" className="hover:text-green-200 transition">Terapias</a></li>
            <li><a href="#contacto" className="bg-white text-green-700 px-4 py-2 rounded-md hover:bg-green-100 transition shadow-sm">Agendar Cita</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="inicio" className="py-20 flex flex-col justify-center items-center text-center bg-green-50 px-4 border-b-4 border-green-700">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6 drop-shadow-sm">Bienestar Natural a tu Alcance</h1>
          <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-2xl leading-relaxed">
            Especialistas en medicina alternativa, suplementación y terapias de recuperación. Visítanos en Barrio Abajo o solicita atención a domicilio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contacto" className="bg-green-700 text-white px-8 py-3 rounded-md font-bold hover:bg-green-800 transition shadow-md">Agendar Evaluación</a>
            <a href="https://wa.me/50499255867" target="_blank" rel="noreferrer" className="bg-[#25D366] text-white px-8 py-3 rounded-md font-bold hover:bg-green-500 transition shadow-md flex items-center gap-2">
              Escríbenos al WhatsApp
            </a>
          </div>
        </section>

        <section id="suplementos" className="py-16 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Nuestros Suplementos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {suplementos.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300">
                <img src={item.imagen} alt={item.nombre} className="w-full h-56 object-contain bg-gray-50 p-4" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-green-700 mb-3">{item.nombre}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="terapias" className="py-16 px-6 bg-green-50 border-t border-b border-green-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Clínica y Terapias</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {terapias.map((terapia) => (
                <div key={terapia.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:-translate-y-1 hover:shadow-xl transition duration-300 border-b-4 border-green-700">
                  <img src={terapia.imagen} alt={terapia.nombre} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{terapia.nombre}</h3>
                    <p className="text-gray-600">{terapia.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FORMULARIO CONECTADO A FIREBASE --- */}
        <section id="contacto" className="py-16 px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Agenda tu Espacio</h2>
          <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
            <form onSubmit={manejarEnvio} className="space-y-6">
              <div>
                <label className="block text-green-800 font-bold mb-2">Nombre Completo</label>
                <input 
                  type="text" 
                  name="nombre"
                  value={datosFormulario.nombre}
                  onChange={manejarCambio}
                  required 
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                  placeholder="Ej. Fernando Elvir" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-green-800 font-bold mb-2">Modalidad</label>
                  <select 
                    name="modalidad"
                    value={datosFormulario.modalidad}
                    onChange={manejarCambio}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="En la Tienda">En la Tienda</option>
                    <option value="A Domicilio">A Domicilio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-green-800 font-bold mb-2">Servicio de Interés</label>
                  <select 
                    name="servicio"
                    value={datosFormulario.servicio}
                    onChange={manejarCambio}
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Examen Cuántico">Examen Cuántico</option>
                    <option value="Sueroterapia">Sueroterapia</option>
                    <option value="Quiropraxia">Quiropraxia</option>
                    <option value="Información de Suplementos">Información de Suplementos</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={cargando}
                className={`w-full text-white font-bold py-4 rounded-md transition text-lg shadow-md ${cargando ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'}`}
              >
                {cargando ? 'Enviando a la base de datos...' : 'Solicitar Cita'}
              </button>

              {mensajeExito && (
                <div className={`border-l-4 p-4 mt-4 rounded ${mensajeExito.includes("error") ? "bg-red-100 border-red-600 text-red-800" : "bg-green-100 border-green-600 text-green-800"}`}>
                  {mensajeExito}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white text-center py-10">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-bold text-xl mb-4">Naturals HN</p>
          <p className="mb-2">📍 Calle Morelos, 1 cuadra del IHSS, Barrio Abajo, Tegucigalpa, Honduras</p>
          <p className="mb-4">📞 +504 9925-5867 | ✉️ naturalshn@gmail.com</p>
          <hr className="border-green-600 my-6" />
          <p className="text-green-200 text-sm">&copy; 2026 Naturals HN. Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;