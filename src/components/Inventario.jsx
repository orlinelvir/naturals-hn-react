import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [subiendo, setSubiendo] = useState(false);
  
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "" 
  });

  const [archivoImagen, setArchivoImagen] = useState(null);

  const obtenerProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductos(lista);
    } catch (error) {
      console.error("Error al cargar inventario:", error);
    }
    setCargando(false);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const manejarCambio = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const manejarArchivo = (e) => {
    if (e.target.files[0]) {
      setArchivoImagen(e.target.files[0]);
    }
  };

  const agregarProducto = async (e) => {
    e.preventDefault();
    setSubiendo(true);

    try {
      let urlFinal = nuevoProducto.imagen;

      if (archivoImagen) {
        const storageRef = ref(storage, `productos/${archivoImagen.name}`);
        await uploadBytes(storageRef, archivoImagen);
        urlFinal = await getDownloadURL(storageRef); 
      }

      await addDoc(collection(db, "productos"), {
        nombre: nuevoProducto.nombre,
        descripcion: nuevoProducto.descripcion,
        precio: Number(nuevoProducto.precio),
        stock: Number(nuevoProducto.stock),
        imagen: urlFinal,
        fechaAgregado: new Date()
      });

      setNuevoProducto({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "" });
      setArchivoImagen(null);
      document.getElementById('input-imagen').value = ""; 
      
      obtenerProductos();
      alert("Producto agregado con éxito");
      
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Hubo un error al guardar. Revisa la consola.");
    }

    setSubiendo(false);
  };

  const eliminarProducto = async (id) => {
    if(window.confirm("¿Seguro que deseas eliminar este producto?")) {
      await deleteDoc(doc(db, "productos", id));
      obtenerProductos();
    }
  };

  // --- BOTÓN MÁGICO PARA RECUPERAR PRODUCTOS ---
  // (Colocado exactamente antes del return)
  const restaurarProductosOriginales = async () => {
    if(!window.confirm("¿Deseas inyectar los 4 productos originales a la base de datos?")) return;
    setCargando(true);
    
    const suplementosOriginales = [
      { nombre: "Vitamina C-1000", descripcion: "Refuerza tu sistema inmunológico y protege tus células con vitamina C de alta pureza.", precio: 450, stock: 15, imagen: "/Puritans/c-1000.png" },
      { nombre: "Calcio Absorbible 1200 mg", descripcion: "Calcio de rápida absorción enriquecido con Vitamina D3 para fortalecer huesos y articulaciones.", precio: 500, stock: 10, imagen: "/Puritans/Calcio Absorbible 1200 mg.png" },
      { nombre: "Melatonina", descripcion: "Regula tu ciclo de sueño de forma natural para un descanso profundo y reparador.", precio: 350, stock: 20, imagen: "/Puritans/MELATONIN.png" },
      { nombre: "Omega 3 Natural", descripcion: "Ácidos grasos esenciales para proteger tu salud cardiovascular y cerebral.", precio: 600, stock: 12, imagen: "/Puritans/Omega 3 Natura.png" }
    ];

    try {
      for (const prod of suplementosOriginales) {
        await addDoc(collection(db, "productos"), {
          ...prod,
          fechaAgregado: new Date()
        });
      }
      obtenerProductos();
      alert("¡Productos restaurados con éxito!");
    } catch (error) {
      console.error("Error al restaurar:", error);
      alert("Hubo un error al restaurar los productos. ¿Apagaste el AdBlocker?");
    }
    setCargando(false);
  };

  return (
    <div className="space-y-8">
      {/* Formulario para agregar productos */}
      <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-700">
        <h2 className="text-xl font-bold text-green-800 mb-4">Agregar Nuevo Producto</h2>
        <form onSubmit={agregarProducto} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="nombre" value={nuevoProducto.nombre} onChange={manejarCambio} placeholder="Nombre (Ej. Vitamina C)" required className="border p-3 rounded focus:ring-2 focus:ring-green-500 outline-none" />
          
          <div className="flex gap-4">
            <input type="number" name="precio" value={nuevoProducto.precio} onChange={manejarCambio} placeholder="Precio (L.)" required className="border p-3 rounded w-1/2 focus:ring-2 focus:ring-green-500 outline-none" />
            <input type="number" name="stock" value={nuevoProducto.stock} onChange={manejarCambio} placeholder="Stock" required className="border p-3 rounded w-1/2 focus:ring-2 focus:ring-green-500 outline-none" />
          </div>

          <div className="border p-2 rounded focus-within:ring-2 focus-within:ring-green-500 bg-gray-50 flex flex-col justify-center">
            <label className="text-xs text-gray-500 mb-1 font-bold px-2">Opción 1: Subir foto desde PC</label>
            <input id="input-imagen" type="file" accept="image/png, image/jpeg" onChange={manejarArchivo} className="w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-green-100 file:text-green-800 hover:file:bg-green-200 cursor-pointer" />
          </div>

          <div className="border p-2 rounded focus-within:ring-2 focus-within:ring-green-500 bg-gray-50 flex flex-col justify-center">
            <label className="text-xs text-gray-500 mb-1 font-bold px-2">Opción 2: Usar enlace web</label>
            <input type="text" name="imagen" value={nuevoProducto.imagen} onChange={manejarCambio} placeholder="Ej. https://sitio.com/foto.jpg" className="w-full text-sm bg-transparent outline-none px-2" />
          </div>

          <textarea name="descripcion" value={nuevoProducto.descripcion} onChange={manejarCambio} placeholder="Descripción del producto..." required className="border p-3 rounded md:col-span-2 focus:ring-2 focus:ring-green-500 outline-none"></textarea>
          
          <button type="submit" disabled={subiendo} className={`text-white font-bold py-3 rounded md:col-span-2 transition shadow-md ${subiendo ? 'bg-gray-400' : 'bg-green-700 hover:bg-green-800'}`}>
            {subiendo ? 'Procesando imagen y guardando...' : 'Guardar Producto'}
          </button>
        </form>
      </div>

      {/* Tabla de Inventario */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
          <h2 className="font-semibold">Catálogo Actual</h2>
          <button onClick={restaurarProductosOriginales} className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-sm font-bold shadow transition">
            ↻ Cargar Productos Originales
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 border-b">Foto</th>
                <th className="p-4 border-b">Producto</th>
                <th className="p-4 border-b">Precio</th>
                <th className="p-4 border-b">Stock</th>
                <th className="p-4 border-b text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? <tr><td colSpan="5" className="p-4 text-center">Cargando...</td></tr> : 
                productos.length === 0 ? <tr><td colSpan="5" className="p-4 text-center text-gray-500">No hay productos en inventario.</td></tr> :
                productos.map(prod => (
                  <tr key={prod.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      {prod.imagen ? (
                        <img src={prod.imagen} alt={prod.nombre} className="w-12 h-12 object-cover rounded shadow-sm border" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">Sin foto</div>
                      )}
                    </td>
                    <td className="p-4 font-medium">{prod.nombre}</td>
                    <td className="p-4 text-green-700 font-bold">L. {prod.precio}</td>
                    <td className="p-4">{prod.stock} unids.</td>
                    <td className="p-4 text-center">
                      <button onClick={() => eliminarProducto(prod.id)} className="text-red-500 hover:text-red-700 font-medium bg-red-50 px-3 py-1 rounded">Eliminar</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventario;