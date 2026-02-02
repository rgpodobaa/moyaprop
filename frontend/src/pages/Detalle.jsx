import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Detalle() {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);

  // Estado para controlar qué foto estamos viendo (0 es la primera)
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    // 1. Definimos la dirección inteligente
    const URL_API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

    // 2. Usamos la variable con comillas invertidas
    fetch(`${URL_API}/api/propiedades`)
      .then(res => res.json())
      .then(data => {
        const encontrada = data.find(p => p._id === id);
        setPropiedad(encontrada);
      });
  }, [id]);

  if (!propiedad) return <div className="text-center mt-20 font-bold">Cargando...</div>;

  const imagenes = propiedad.imagenes || [];

  // Funciones para las flechas
  const siguienteImagen = () => {
    setIndiceActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };

  const anteriorImagen = () => {
    setIndiceActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  // Preparamos la dirección completa para el mapa
  const direccionMapa = `${propiedad.ubicacion}, ${propiedad.localidad || ''}`;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <Link to="/" className="text-[#A0522D] mb-6 inline-block print:hidden font-semibold hover:underline">
        ← Volver al listado
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">

        {/* --- COLUMNA IZQUIERDA: GALERÍA DE IMÁGENES --- */}
        <div className="relative h-[400px] bg-gray-200 rounded-3xl overflow-hidden shadow-lg group">
          {imagenes.length > 0 ? (
            <div className="relative w-full h-full">
              {imagenes.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Foto ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === indiceActual ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                />
              ))}

              {imagenes.length > 1 && (
                <>
                  <button onClick={anteriorImagen} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-[#FF8C00] text-white p-2 rounded-full transition-colors print:hidden">❮</button>
                  <button onClick={siguienteImagen} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-[#FF8C00] text-white p-2 rounded-full transition-colors print:hidden">❯</button>
                  <div className="absolute bottom-4 right-4 z-20 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-bold print:hidden">
                    {indiceActual + 1} / {imagenes.length}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">Sin imágenes disponibles</div>
          )}
        </div>

        {/* --- COLUMNA DERECHA: INFORMACIÓN --- */}
        <div className="space-y-6">
          
          {/* Etiquetas Superiores */}
          <div className="flex gap-2">
            <span className="bg-[#FF8C00] text-white px-3 py-1 rounded-full text-sm font-bold uppercase">{propiedad.operacion}</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold uppercase">{propiedad.tipo}</span>
          </div>

          {/* Título y Ubicación */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">{propiedad.titulo}</h1>
            <p className="text-xl text-gray-500 mt-2">
                {/* Muestra "Localidad - Dirección" o solo Dirección si no hay localidad */}
                {propiedad.localidad && <span className="font-semibold text-gray-700">{propiedad.localidad} - </span>} 
                {propiedad.ubicacion}
            </p>
          </div>

          {/* Precio */}
          <p className="text-4xl font-black text-[#FF8C00]">
            {propiedad.moneda === 'ARS' ? '$' : 'USD'} {propiedad.precio.toLocaleString('es-AR')}
          </p>

          {/* --- NUEVO: FICHA TÉCNICA (Grid de detalles) --- */}
          <div className="grid grid-cols-2 gap-4 bg-orange-50 p-4 rounded-xl border border-orange-100">
             {/* Renderizamos solo si el dato existe */}
             {propiedad.superficieTotal && (
                 <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Sup. Total</p>
                    <p className="text-lg font-semibold text-gray-800">{propiedad.superficieTotal} m²</p>
                 </div>
             )}
             {propiedad.superficieConstruida && (
                 <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Sup. Cubierta</p>
                    <p className="text-lg font-semibold text-gray-800">{propiedad.superficieConstruida} m²</p>
                 </div>
             )}
             {propiedad.antiguedad && (
                 <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Antigüedad</p>
                    <p className="text-lg font-semibold text-gray-800">{propiedad.antiguedad} años</p>
                 </div>
             )}
             {propiedad.localidad && (
                 <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Zona</p>
                    <p className="text-lg font-semibold text-gray-800">{propiedad.localidad}</p>
                 </div>
             )}
          </div>

          {/* Botón Imprimir */}
          <button
            onClick={() => window.print()}
            className="text-gray-600 hover:text-black font-semibold flex items-center gap-2 print:hidden text-sm"
          >
            🖨️ Imprimir Ficha
          </button>

          {/* Descripción */}
          <div className="border-t border-b py-6 text-gray-700 leading-relaxed whitespace-pre-line">
            <h3 className="font-bold text-lg mb-2 text-gray-900">Descripción</h3>
            {propiedad.descripcion || "Sin descripción."}
          </div>

          {/* Mapa Corregido */}
          <div className="mt-6 mb-6 print:hidden">
            <h3 className="font-bold text-lg mb-3 text-gray-900">Ubicación Aproximada</h3>
            <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden shadow-lg border border-gray-300">
                <iframe
                  title="Mapa de la Propiedad"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  // Usamos la URL estándar de Google Maps Embed
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(direccionMapa)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                ></iframe>
            </div>
          </div>

          {/* Botón WhatsApp */}
          <a
            href={`https://wa.me/5491138633987?text=Hola! Vengo de la página web y estoy interesado en: ${propiedad.titulo} (${propiedad.localidad || ''})`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold text-xl transition-transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 print:hidden"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default Detalle;