import { useState, useEffect } from 'react';

function Admin() {
  const [propiedades, setPropiedades] = useState([]);
  
const [formData, setFormData] = useState({
    titulo: '', 
    precio: '', 
    moneda: 'USD', // <--- AGREGAR ESTO
    ubicacion: '', 
    tipo: 'Casa', 
    operacion: 'Venta', 
    descripcion: ''
  });

  // AHORA ES UN ARRAY (Lista de fotos)
  const [listaImagenes, setListaImagenes] = useState([]); 
  const [subiendo, setSubiendo] = useState(false);

const cargarPropiedades = async () => {
    // 1. Definimos la dirección inteligente
    const URL_API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    // 2. Usamos esa dirección (OJO: usa comillas invertidas `` para que funcione el ${})
    const res = await fetch(`${URL_API}/api/propiedades`);
    
    const data = await res.json();
    setPropiedades(data);
  };

  useEffect(() => { cargarPropiedades(); }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSubiendo(true);

    const data = new FormData();
    data.append('imagen', file);

try {
      // 1. Definimos la dirección inteligente
      const URL_API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

      // 2. Usamos esa dirección con comillas invertidas ``
      const res = await fetch(`${URL_API}/api/upload`, {
        method: 'POST',
        body: data
      });
      
      const respuesta = await res.json();
      
      // AQUÍ ESTÁ EL CAMBIO: Agregamos la nueva URL a la lista existente
      setListaImagenes([...listaImagenes, respuesta.url]);
      
    } catch (error) {
      console.error("Error al subir:", error);
      alert("Error al subir la imagen");
    } finally {
      setSubiendo(false);
    }
  };

const eliminarPropiedad = async (id) => {
    if (window.confirm("¿Borrar esta propiedad?")) {
      // 1. Definimos la dirección inteligente
      const URL_API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

      // 2. Usamos esa dirección (manteniendo el /${id} al final)
      await fetch(`${URL_API}/api/propiedades/${id}`, { method: 'DELETE' });
      
      cargarPropiedades();
    }
  };

  // Función para quitar una foto de la lista ANTES de guardar
  const removerFotoDeLista = (index) => {
    const nuevaLista = listaImagenes.filter((_, i) => i !== index);
    setListaImagenes(nuevaLista);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Enviamos la lista completa de imágenes
    const propiedadAGuardar = {
        ...formData,
        imagenes: listaImagenes 
    };

// 1. Definimos la dirección inteligente
    const URL_API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    // 2. Usamos esa dirección con comillas invertidas
    const response = await fetch(`${URL_API}/api/propiedades`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(propiedadAGuardar)
    });

    if (response.ok) {
      alert("¡Propiedad guardada con éxito!");
      setFormData({ titulo: '', precio: '', ubicacion: '', tipo: 'Casa', operacion: 'Venta', descripcion: '' });
      setListaImagenes([]); // Limpiamos las fotos
      cargarPropiedades();
    }
  };

return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white shadow-lg rounded-xl p-6 mb-12 border-t-4 border-[#FF8C00]">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Cargar Nueva Propiedad</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Título" className="w-full p-2 border rounded"
            onChange={(e) => setFormData({...formData, titulo: e.target.value})}
            value={formData.titulo} required
          />
          
          {/* --- FILA MODIFICADA: MONEDA | PRECIO | UBICACIÓN --- */}
          <div className="flex gap-4">
            {/* 1. Selector de Moneda */}
            <select 
              className="w-1/6 p-2 border rounded bg-gray-50 font-bold text-gray-700"
              onChange={(e) => setFormData({...formData, moneda: e.target.value})}
              value={formData.moneda}
            >
              <option value="USD">USD</option>
              <option value="ARS">ARS $</option>
            </select>

            {/* 2. Input de Precio (Ahora ocupa 1/3) */}
            <input 
              type="number" placeholder="Precio" className="w-1/3 p-2 border rounded"
              onChange={(e) => setFormData({...formData, precio: e.target.value})}
              value={formData.precio} required
            />

            {/* 3. Input de Ubicación (Ahora ocupa 1/2) */}
            <input 
              type="text" placeholder="Ubicación" className="w-1/2 p-2 border rounded"
              onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
              value={formData.ubicacion} required
            />
          </div>
          {/* --------------------------------------------------- */}

          <div className="flex gap-4">
            <select className="w-1/2 p-2 border rounded" onChange={(e) => setFormData({...formData, tipo: e.target.value})} value={formData.tipo}>
              <option>Casa</option>
              <option>Departamento</option>
              <option>Terreno</option>
              <option>PH</option>
              <option>Local</option>
            </select>
            <select className="w-1/2 p-2 border rounded" onChange={(e) => setFormData({...formData, operacion: e.target.value})} value={formData.operacion}>
              <option>Venta</option>
              <option>Alquiler</option>
            </select>
          </div>

          {/* --- ZONA DE CARGA DE IMÁGENES MÚLTIPLES --- */}
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <label className="block text-gray-700 font-bold mb-2">Galería de Fotos</label>
            <input 
              type="file" 
              onChange={handleImageUpload} 
              disabled={subiendo}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#FF8C00] hover:file:bg-orange-100"
            />
            {subiendo && <p className="text-blue-500 mt-2 text-sm font-bold">Subiendo foto...</p>}
            
            <div className="flex gap-2 mt-4 overflow-x-auto py-2">
              {listaImagenes.map((img, index) => (
                <div key={index} className="relative flex-shrink-0">
                  <img src={img} alt="preview" className="h-24 w-24 object-cover rounded-lg shadow" />
                  <button 
                    type="button"
                    onClick={() => removerFotoDeLista(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            {listaImagenes.length > 0 && <p className="text-xs text-gray-400 mt-1">{listaImagenes.length} fotos cargadas</p>}
          </div>

          <textarea 
            placeholder="Descripción..." className="w-full p-2 border rounded h-32"
            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            value={formData.descripcion}
          ></textarea>

          <button type="submit" className="w-full bg-[#FF8C00] hover:bg-[#A0522D] text-white py-3 rounded-lg font-bold transition">
            Guardar Propiedad
          </button>
        </form>
      </div>
      
      {/* --- LISTA DE GESTIÓN (ACTUALIZADA PARA MOSTRAR LA MONEDA) --- */}
      <div className="bg-white shadow-lg rounded-xl p-6 mt-10 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Gestionar Inventario</h2>
        <div className="grid gap-4">
          {propiedades.map(prop => (
            <div key={prop._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex gap-4 items-center">
                {prop.imagenes && prop.imagenes[0] && (
                    <img src={prop.imagenes[0]} alt="mini" className="w-16 h-16 object-cover rounded" />
                )}
                <div>
                    <p className="font-bold text-gray-800">{prop.titulo}</p>
                    {/* AQUÍ CAMBIAMOS PARA QUE MUESTRE $ O USD DINÁMICAMENTE */}
                    <p className="text-sm text-[#A0522D] font-semibold">
                        {prop.operacion} - {prop.moneda === 'ARS' ? '$' : 'USD'} {prop.precio}
                    </p>
                </div>
              </div>
              <button onClick={() => eliminarPropiedad(prop._id)} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-600 hover:text-white transition">Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
);
}
export default Admin;