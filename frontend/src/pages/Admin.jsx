import { useState, useEffect } from 'react';

function Admin() {
  const [propiedades, setPropiedades] = useState([]);
  
  // Estado para saber si estamos editando (si es null, estamos creando)
  const [idEdicion, setIdEdicion] = useState(null);

  const [formData, setFormData] = useState({
    titulo: '', 
    precio: '', 
    moneda: 'USD', 
    ubicacion: '', 
    localidad: '',        // NUEVO CAMPO
    tipo: 'Casa', 
    operacion: 'Venta', 
    superficieTotal: '',      // NUEVO CAMPO
    superficieConstruida: '', // NUEVO CAMPO
    antiguedad: '',           // NUEVO CAMPO
    descripcion: ''
  });

  const [listaImagenes, setListaImagenes] = useState([]); 
  const [subiendo, setSubiendo] = useState(false);

  const cargarPropiedades = async () => {
    const URL_API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const res = await fetch(`${URL_API}/api/propiedades`);
    const data = await res.json();
    setPropiedades(data);
  };

  useEffect(() => { cargarPropiedades(); }, []);

  // --- CARGAR DATOS EN EL FORMULARIO (Actualizado con nuevos campos) ---
  const cargarDatosParaEditar = (propiedad) => {
    setFormData({
      titulo: propiedad.titulo,
      precio: propiedad.precio,
      moneda: propiedad.moneda || 'USD',
      ubicacion: propiedad.ubicacion,
      localidad: propiedad.localidad || '', // Carga localidad o vacío
      tipo: propiedad.tipo,
      operacion: propiedad.operacion,
      superficieTotal: propiedad.superficieTotal || '',
      superficieConstruida: propiedad.superficieConstruida || '',
      antiguedad: propiedad.antiguedad || '',
      descripcion: propiedad.descripcion
    });
    setListaImagenes(propiedad.imagenes || []);
    setIdEdicion(propiedad._id); 
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- CANCELAR EDICIÓN (Resetea todos los campos) ---
  const cancelarEdicion = () => {
    setIdEdicion(null);
    setFormData({ 
        titulo: '', precio: '', moneda: 'USD', 
        ubicacion: '', localidad: '', 
        tipo: 'Casa', operacion: 'Venta', 
        superficieTotal: '', superficieConstruida: '', antiguedad: '',
        descripcion: '' 
    });
    setListaImagenes([]);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSubiendo(true);
    const data = new FormData();
    data.append('imagen', file);

    try {
      const URL_API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const res = await fetch(`${URL_API}/api/upload`, {
        method: 'POST',
        body: data
      });
      
      const respuesta = await res.json();
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
      const URL_API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      await fetch(`${URL_API}/api/propiedades/${id}`, { method: 'DELETE' });
      cargarPropiedades();
      
      if (id === idEdicion) cancelarEdicion();
    }
  };

  const removerFotoDeLista = (index) => {
    const nuevaLista = listaImagenes.filter((_, i) => i !== index);
    setListaImagenes(nuevaLista);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const propiedadAGuardar = {
        ...formData,
        imagenes: listaImagenes 
    };

    const URL_API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    try {
        let response;
        if (idEdicion) {
            // --- MODO EDICIÓN (PUT) ---
            response = await fetch(`${URL_API}/api/propiedades/${idEdicion}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(propiedadAGuardar)
            });
        } else {
            // --- MODO CREACIÓN (POST) ---
            response = await fetch(`${URL_API}/api/propiedades`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(propiedadAGuardar)
            });
        }

        if (response.ok) {
            alert(idEdicion ? "¡Propiedad actualizada!" : "¡Propiedad creada!");
            cancelarEdicion(); 
            cargarPropiedades(); 
        } else {
            alert("Error al guardar");
        }

    } catch (error) {
        console.error("Error al guardar:", error);
        alert("Hubo un error al intentar guardar.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className={`bg-white shadow-lg rounded-xl p-6 mb-12 border-t-4 ${idEdicion ? 'border-blue-500' : 'border-[#FF8C00]'}`}>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
                {idEdicion ? '✏️ Editando Propiedad' : '🏠 Cargar Nueva Propiedad'}
            </h2>
            {idEdicion && (
                <button 
                    onClick={cancelarEdicion}
                    className="text-sm text-gray-500 underline hover:text-gray-800"
                >
                    Cancelar Edición
                </button>
            )}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Título de la publicación" className="w-full p-2 border rounded"
            onChange={(e) => setFormData({...formData, titulo: e.target.value})}
            value={formData.titulo} required
          />
          
          {/* FILA 1: PRECIO Y MONEDA */}
          <div className="flex gap-4">
            <select 
              className="w-1/6 p-2 border rounded bg-gray-50 font-bold text-gray-700"
              onChange={(e) => setFormData({...formData, moneda: e.target.value})}
              value={formData.moneda}
            >
              <option value="USD">USD</option>
              <option value="ARS">ARS $</option>
            </select>

            <input 
              type="number" placeholder="Precio" className="w-1/3 p-2 border rounded"
              onChange={(e) => setFormData({...formData, precio: e.target.value})}
              value={formData.precio} required
            />

            {/* ANTIGÜEDAD (NUEVO) */}
            <input 
              type="number" placeholder="Antigüedad (años)" className="w-1/2 p-2 border rounded"
              onChange={(e) => setFormData({...formData, antiguedad: e.target.value})}
              value={formData.antiguedad}
            />
          </div>

          {/* FILA 2: UBICACIÓN Y LOCALIDAD (NUEVO) */}
          <div className="flex gap-4">
            <input 
              type="text" placeholder="Dirección / Calle" className="w-1/2 p-2 border rounded"
              onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
              value={formData.ubicacion} required
            />
            <input 
              type="text" placeholder="Localidad / Barrio" className="w-1/2 p-2 border rounded"
              onChange={(e) => setFormData({...formData, localidad: e.target.value})}
              value={formData.localidad} required
            />
          </div>

          {/* FILA 3: SUPERFICIES (NUEVO) */}
          <div className="flex gap-4">
            <input 
              type="number" placeholder="Sup. Total (m²)" className="w-1/2 p-2 border rounded"
              onChange={(e) => setFormData({...formData, superficieTotal: e.target.value})}
              value={formData.superficieTotal}
            />
            <input 
              type="number" placeholder="Sup. Construida (m²)" className="w-1/2 p-2 border rounded"
              onChange={(e) => setFormData({...formData, superficieConstruida: e.target.value})}
              value={formData.superficieConstruida}
            />
          </div>

          {/* FILA 4: TIPO (Con nuevas opciones) Y OPERACIÓN */}
          <div className="flex gap-4">
            <select className="w-1/2 p-2 border rounded" onChange={(e) => setFormData({...formData, tipo: e.target.value})} value={formData.tipo}>
              <option>Casa</option>
              <option>Departamento</option>
              <option>Terreno</option>
              <option>PH</option>
              <option>Local</option>
              <option>Barrio Cerrado</option> {/* NUEVO */}
              <option>Depósito/Galpón</option> {/* NUEVO */}
            </select>
            <select className="w-1/2 p-2 border rounded" onChange={(e) => setFormData({...formData, operacion: e.target.value})} value={formData.operacion}>
              <option>Venta</option>
              <option>Alquiler</option>
            </select>
          </div>

          {/* ZONA DE FOTOS */}
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
          </div>

          <textarea 
            placeholder="Descripción..." className="w-full p-2 border rounded h-32"
            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            value={formData.descripcion}
          ></textarea>

          <button 
            type="submit" 
            className={`w-full py-3 rounded-lg font-bold transition text-white ${idEdicion ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#FF8C00] hover:bg-[#A0522D]'}`}
          >
            {idEdicion ? 'Guardar Cambios' : 'Crear Propiedad'}
          </button>
        </form>
      </div>
      
      {/* LISTA DE GESTIÓN */}
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
                    {/* AQUI MOSTRAMOS LA NUEVA LOCALIDAD */}
                    <p className="text-sm text-gray-500">{prop.localidad} - {prop.ubicacion}</p>
                    <p className="text-sm text-[#A0522D] font-semibold">
                        {prop.operacion} - {prop.moneda === 'ARS' ? '$' : 'USD'} {prop.precio}
                    </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                    onClick={() => cargarDatosParaEditar(prop)} 
                    className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition"
                >
                    Editar
                </button>
                <button 
                    onClick={() => eliminarPropiedad(prop._id)} 
                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-600 hover:text-white transition"
                >
                    Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;