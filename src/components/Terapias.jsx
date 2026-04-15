import React from 'react';

const Terapias = () => {
  // Mudamos la lista de terapias para acá adentro
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

  return (
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
  );
};

export default Terapias;