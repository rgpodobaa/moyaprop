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

  // Funciones para las flechas (permiten dar la vuelta completa)
  const siguienteImagen = () => {
    setIndiceActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };

  const anteriorImagen = () => {
    setIndiceActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <Link to="/" className="text-[#A0522D] ... mb-6 inline-block print:hidden"> {/* <--- AGREGADO */}
        ← Volver al listado
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">

        {/* --- GALERÍA DE IMÁGENES CON EFECTO SUAVE --- */}
        <div className="relative h-[400px] bg-gray-200 rounded-3xl overflow-hidden shadow-lg group">

          {imagenes.length > 0 ? (
            // Contenedor relativo para apilar las imágenes
            <div className="relative w-full h-full">
              {imagenes.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Foto ${index + 1}`}
                  // --- CLASES CLAVE PARA EL EFECTO ---
                  // absolute inset-0: Apila todas las imágenes una sobre otra.
                  // transition-opacity duration-700: Hace que el cambio de opacidad dure 0.7 segundos.
                  // Si el índice coincide, opacidad 1 (visible), si no, opacidad 0 (invisible).
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${index === indiceActual ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                />
              ))}

              {/* Controles (Solo si hay más de 1 foto) */}
              {imagenes.length > 1 && (
                <>
                  {/* Flecha Izquierda (z-20 para asegurar que esté sobre la imagen) */}
                  <button
                    onClick={anteriorImagen}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-[#FF8C00] text-white p-2 rounded-full transition-colors print:hidden"
                  >
                    ❮
                  </button>

                  {/* Flecha Derecha (z-20) */}
                  <button
                    onClick={siguienteImagen}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-[#FF8C00] text-white p-2 rounded-full transition-colors print:hidden"
                  >
                    ❯
                  </button>

                  {/* Contador (z-20) */}
                  <div className="absolute bottom-4 right-4 z-20 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-bold print:hidden">
                    {indiceActual + 1} / {imagenes.length}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Sin imágenes disponibles
            </div>
          )}
        </div>

        {/* --- INFORMACIÓN DE LA PROPIEDAD --- */}
        <div className="space-y-6">
          <div className="flex gap-2">
            <span className="bg-[#FF8C00] text-white px-3 py-1 rounded-full text-sm font-bold uppercase">{propiedad.operacion}</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold uppercase">{propiedad.tipo}</span>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900">{propiedad.titulo}</h1>
          <p className="text-xl text-gray-500">{propiedad.ubicacion}</p>

          <p className="text-3xl font-black text-[#FF8C00]">
            {propiedad.moneda === 'ARS' ? '$' : 'U$S'} {propiedad.precio.toLocaleString('es-AR')}
          </p>

          {/* BOTÓN DE IMPRIMIR (Solo visible en pantalla, se oculta al imprimir) */}
          <button
            onClick={() => window.print()}
            className="mt-4 text-gray-600 hover:text-black font-semibold flex items-center gap-2 print:hidden"
          >
            🖨️ Imprimir Ficha
          </button>

          <div className="border-t border-b py-6 text-gray-700 leading-relaxed">
            <h3 className="font-bold text-lg mb-2 text-gray-900">Descripción</h3>
            {propiedad.descripcion || "Sin descripción."}
          </div>

          <div className="mt-6 mb-6 print:hidden">
            <h3 className="font-bold text-lg mb-3 text-gray-900">Ubicación</h3>
            <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden shadow-lg border border-gray-300">
                <iframe
                  title="Mapa de la Propiedad"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  // Usamos encodeURIComponent para que direcciones con espacios o tildes funcionen bien
                  src={`https://www.google.com/maps?q=${encodeURIComponent(propiedad.ubicacion)}&output=embed`}
                  allowFullScreen
                ></iframe>
            </div>
             {/* Texto de ayuda opcional */}
             <p className="text-xs text-gray-400 mt-1 text-center print:hidden">
                * La ubicación en el mapa es aproximada según la dirección cargada.
             </p>
          </div>

          <a
            href={`https://wa.me/5491138633987?text=Hola! Vengo de la página web y estoy interesado en la propiedad: ${propiedad.titulo}`}
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