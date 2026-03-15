import React, { useState } from 'react';

function App() {
 // --- 1. BASE DE DATOS LOCAL CON IMÁGENES REALES ---
  const suplementos = [
    {
      id: 1,
      nombre: "Vitamina C-1000",
      descripcion: "Refuerza tu sistema inmunológico y protege tus células con vitamina C de alta pureza.",
      imagen: "/Puritans/c-1000.png" // Ruta directa a tu carpeta public
    },
    {
      id: 2,
      nombre: "Calcio Absorbible 1200 mg",
      descripcion: "Calcio de rápida absorción enriquecido con Vitamina D3 para fortalecer huesos y articulaciones.",
      // Copia el nombre exacto de tu archivo. Si tiene espacios, ponlos tal cual.
      imagen: "/Puritans/Absorbable Calcium 1200 mg Plus Vitamin D3 25 mcg.png"
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
      // Asumiendo que tienes una imagen llamada "acupuntura1.jpg" dentro de esa carpeta.
      // Cambia el nombre "acupuntura1.jpg" por el nombre real de tu foto.
      imagen: "/Material/Acupuntura/acupuntura1.jpg" 
    },
    {
      id: 2,
      nombre: "Sueroterapia",
      descripcion: "Cócteles vitamínicos intravenosos para hidratación profunda y recuperación inmediata.",
      // Cambia "suero1.jpg" por el nombre de archivo real
      imagen: "/Material/Sueroterapia/suero1.jpg"
    },
    {
      id: 3,
      nombre: "Quiropraxia",
      descripcion: "Alineación física experta para corregir postura y liberar la tensión acumulada en la columna.",
      // Cambia "quiro1.jpg" por el nombre de archivo real
      imagen: "/Material/Quiropraxia/quiro1.jpg"
    }
  ];

  // --- 2. ESTADO DEL FORMULARIO (Interactividad) ---
  const [mensajeExito, setMensajeExito] = useState("");

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    // Aquí capturaríamos los datos, por ahora solo mostramos el mensaje
    setMensajeExito("¡Gracias! Hemos recibido tu solicitud. Nos contactaremos pronto para confirmar tu espacio.");
    
    // Borramos el mensaje después de 5 segundos
    setTimeout(() => {
      setMensajeExito("");
    }, 5000);
    
    evento.target.reset(); // Limpia los campos
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans cursor-default scroll-smooth">
      
      {/* Navegación */}
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
        {/* Hero Section */}
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

        {/* Sección de Suplementos */}
        <section id="suplementos" className="py-16 px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Nuestros Suplementos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {suplementos.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300">
                <img src={item.imagen} alt={item.nombre} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-green-700 mb-3">{item.nombre}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Terapias */}
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

        {/* Sección de Contacto (Formulario) */}
        <section id="contacto" className="py-16 px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Agenda tu Espacio</h2>
          <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
            <form onSubmit={manejarEnvio} className="space-y-6">
              <div>
                <label className="block text-green-800 font-bold mb-2">Nombre Completo</label>
                <input type="text" required className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Ej. Fernando Elvir" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-green-800 font-bold mb-2">Modalidad</label>
                  <select className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>En la Tienda</option>
                    <option>A Domicilio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-green-800 font-bold mb-2">Servicio de Interés</label>
                  <select className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Examen Cuántico</option>
                    <option>Sueroterapia</option>
                    <option>Quiropraxia</option>
                    <option>Información de Suplementos</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full bg-green-700 text-white font-bold py-4 rounded-md hover:bg-green-800 transition text-lg shadow-md">
                Solicitar Cita
              </button>

              {/* Mensaje de éxito dinámico */}
              {mensajeExito && (
                <div className="bg-green-100 border-l-4 border-green-600 text-green-800 p-4 mt-4 rounded">
                  {mensajeExito}
                </div>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
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