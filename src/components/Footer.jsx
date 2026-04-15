import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white text-center py-10">
      <div className="max-w-4xl mx-auto px-4">
        <p className="font-bold text-xl mb-4">Naturals HN</p>
        <p className="mb-2">📍 Calle Morelos, 1 cuadra del IHSS, Barrio Abajo, Tegucigalpa, Honduras</p>
        <p className="mb-4">📞 +504 9925-5867 | ✉️ naturalshn@gmail.com</p>
        <hr className="border-green-600 my-6" />
        <p className="text-green-200 text-sm">&copy; 2026 Naturals HN. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;