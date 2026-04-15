import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase";

const BookingForm = () => {
  const [mensajeExito, setMensajeExito] = useState("");
  const [cargando, setCargando] = useState(false);
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: "",
    modalidad: "En la Tienda",
    servicio: "Examen Cuántico"
  });

  const manejarCambio = (e) => {
    setDatosFormulario({ ...datosFormulario, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setCargando(true);

    try {
      // 1. Guardar en la base de datos
      await addDoc(collection(db, "citas"), {
        nombreCliente: datosFormulario.nombre,
        modalidadElegida: datosFormulario.modalidad,
        servicioInteres: datosFormulario.servicio,
        fechaRegistro: new Date()
      });

      setMensajeExito("¡Cita agendada con éxito!");

      // 2. Notificación Inmediata por WhatsApp
      const mensajeWhatsApp = `Hola Naturals HN, soy ${datosFormulario.nombre} y acabo de solicitar una cita para ${datosFormulario.servicio} (${datosFormulario.modalidad}) desde la web.`;
      const urlWhatsApp = `https://wa.me/50499255867?text=${encodeURIComponent(mensajeWhatsApp)}`;
      
      // Abrir WhatsApp en una nueva pestaña
      window.open(urlWhatsApp, '_blank');

      // 3. Limpiar formulario
      setDatosFormulario({ nombre: "", modalidad: "En la Tienda", servicio: "Examen Cuántico" });
      
    } catch (error) {
      console.error("Error al guardar la cita: ", error);
      setMensajeExito("Hubo un error al conectar con el servidor.");
    }

    setCargando(false);
    setTimeout(() => setMensajeExito(""), 5000);
  };

  return (
    <section id="contacto" className="py-16 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Agenda tu Espacio</h2>
      <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
        <form onSubmit={manejarEnvio} className="space-y-6">
          <div>
            <label className="block text-green-800 font-bold mb-2">Nombre Completo</label>
            <input 
              type="text" name="nombre" value={datosFormulario.nombre} onChange={manejarCambio} required 
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
              placeholder="Ej. Fernando Elvir" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-green-800 font-bold mb-2">Modalidad</label>
              <select name="modalidad" value={datosFormulario.modalidad} onChange={manejarCambio} className="w-full border p-3 rounded-md">
                <option value="En la Tienda">En la Tienda</option>
                <option value="A Domicilio">A Domicilio</option>
              </select>
            </div>
            <div>
              <label className="block text-green-800 font-bold mb-2">Servicio de Interés</label>
              <select name="servicio" value={datosFormulario.servicio} onChange={manejarCambio} className="w-full border p-3 rounded-md">
                <option value="Examen Cuántico">Examen Cuántico</option>
                <option value="Sueroterapia">Sueroterapia</option>
                <option value="Quiropraxia">Quiropraxia</option>
                <option value="Información de Suplementos">Información</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={cargando} className={`w-full text-white font-bold py-4 rounded-md shadow-md ${cargando ? 'bg-gray-400' : 'bg-green-700 hover:bg-green-800'}`}>
            {cargando ? 'Procesando...' : 'Solicitar Cita'}
          </button>
          {mensajeExito && <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">{mensajeExito}</div>}
        </form>
      </div>
    </section>
  );
};

export default BookingForm;