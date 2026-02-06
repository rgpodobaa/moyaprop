import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Detalle() {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);

  useEffect(() => {
    const URL_API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    fetch(`${URL_API}/api/propiedades`)
      .then(res => res.json())
      .then(data => {
        const encontrada = data.find(p => p._id === id);
        setPropiedad(encontrada);
      });
  }, [id]);

  useEffect(() => {
    if (propiedad) {
        document.title = `${propiedad.titulo} | Moya Propiedades`;
    }
    return () => {
        document.title = 'Moya Propiedades';
    };
  }, [propiedad]);

  // --- FUNCIÓN PARA COMPARTIR ---
  const handleShare = async () => {
    // Datos a compartir
    const shareData = {
        title: `${propiedad.titulo} | Moya Propiedades`,
        text: `¡Mirá esta propiedad en ${propiedad.ubicacion}!`,
        url: window.location.href // El enlace actual de la página
    };

    // Si el navegador soporta compartir nativo (Celulares principalmente)
    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Error al compartir:', err);
        }
    } else {
        // Si estamos en PC y no soporta nativo, copiamos al portapapeles
        navigator.clipboard.writeText(window.location.href);
        alert('¡Enlace copiado! Ya podés pegarlo en WhatsApp.');
    }
  };

  if (!propiedad) return <div className="text-center mt-20 font-bold">Cargando...</div>;

  const imagenes = propiedad.imagenes || [];

  const siguienteImagen = () => {
    setIndiceActual((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1));
  };

  const anteriorImagen = () => {
    setIndiceActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  const direccionMapa = `${propiedad.ubicacion}, ${propiedad.localidad || ''}`;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 print:max-w-full print:p-0">
      
      {/* --- ENCABEZADO (SOLO IMPRESIÓN) --- */}
      <div className="hidden print:flex justify-between items-end mb-6 border-b-2 border-gray-800 pb-2">
          <div>
              <h1 className="text-2xl font-black text-black tracking-tighter">
                  MOYA<span className="text-gray-600"> Propiedades</span>
              </h1>
              <p className="text-xs font-bold text-gray-600">C.M.C.P.L.Z Col. 4238</p>
          </div>
          <div className="text-right text-xs text-gray-800 font-medium">
              <p>www.moyaprop.com.ar | 11-3863-3987</p>
              <p>Burzaco, Buenos Aires</p>
          </div>
      </div>

      <Link to="/" className="text-[#A0522D] mb-6 inline-block print:hidden font-semibold hover:underline">
        ← Volver al listado
      </Link>

      {/* ESTRUCTURA PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4 print:flex print:gap-6 print:items-start print:mt-0">

        {/* --- COLUMNA 1: FOTO --- */}
        <div className="relative h-[400px] print:w-5/12 print:h-64 bg-gray-200 rounded-3xl overflow-hidden shadow-lg group print:shadow-none print:rounded-lg print:border print:border-gray-300">
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
              {/* Controles (Ocultos al imprimir) */}
              {imagenes.length > 1 && (
                <>
                  <button onClick={anteriorImagen} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-[#FF8C00] text-white p-2 rounded-full transition-colors print:hidden">❮</button>
                  <button onClick={siguienteImagen} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-[#FF8C00] text-white p-2 rounded-full transition-colors print:hidden">❯</button>
                </>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">Sin imagen</div>
          )}
        </div>

        {/* --- COLUMNA 2: DATOS TÉCNICOS --- */}
        <div className="space-y-6 print:space-y-2 print:w-7/12">
          
          <div className="flex gap-2 print:hidden">
            <span className="bg-[#FF8C00] text-white px-3 py-1 rounded-full text-sm font-bold uppercase">{propiedad.operacion}</span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-bold uppercase">{propiedad.tipo}</span>
          </div>

          <div>
            <h1 className="text-4xl print:text-xl font-extrabold text-gray-900 leading-tight">{propiedad.titulo}</h1>
            <p className="text-xl print:text-sm text-gray-500 mt-2">
                {propiedad.localidad && <span className="font-semibold text-gray-700">{propiedad.ubicacion} - </span>} 
                {propiedad.localidad}
            </p>
          </div>

          <p className="text-4xl print:text-2xl font-black text-[#FF8C00] print:text-black">
            {propiedad.moneda === 'ARS' ? '$' : 'USD'} {propiedad.precio.toLocaleString('es-AR')}
          </p>

          {/* FICHA TÉCNICA */}
          <div className="grid grid-cols-3 gap-2 bg-orange-50 p-4 rounded-xl border border-orange-100 text-center print:bg-transparent print:border-0 print:p-0 print:block print:text-left print:text-sm">
             {propiedad.superficieTotal && (
                 <div className="print:flex print:justify-between print:border-b print:border-gray-200 print:mb-1">
                    <p className="text-xs text-gray-500 uppercase font-bold">Sup. Total</p>
                    <p className="text-lg font-semibold text-gray-800 print:text-sm">{propiedad.superficieTotal} m²</p>
                 </div>
             )}
             {propiedad.superficieConstruida && (
                 <div className="print:flex print:justify-between print:border-b print:border-gray-200 print:mb-1">
                    <p className="text-xs text-gray-500 uppercase font-bold">Sup. Cubierta</p>
                    <p className="text-lg font-semibold text-gray-800 print:text-sm">{propiedad.superficieConstruida} m²</p>
                 </div>
             )}
             {propiedad.antiguedad && (
                 <div className="print:flex print:justify-between print:border-b print:border-gray-200 print:mb-1">
                    <p className="text-xs text-gray-500 uppercase font-bold">Antigüedad</p>
                    <p className="text-lg font-semibold text-gray-800 print:text-sm">{propiedad.antiguedad} años</p>
                 </div>
             )}
          </div>

          {/* --- BOTONES DE ACCIÓN (Compartir e Imprimir) --- */}
          <div className="flex gap-4 print:hidden">
            
            {/* Botón COMPARTIR (Nuevo) */}
            <button 
                onClick={handleShare} 
                className="text-[#FF8C00] hover:text-[#A0522D] font-bold flex items-center gap-2 transition-colors"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                Compartir
            </button>

            {/* Botón IMPRIMIR */}
            <button 
                onClick={() => window.print()} 
                className="text-gray-600 hover:text-black font-semibold flex items-center gap-2"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                Imprimir Ficha
            </button>
          </div>

          {/* DESCRIPCIÓN (SOLO PANTALLA) */}
          <div className="border-t border-b py-6 text-gray-700 leading-relaxed whitespace-pre-line print:hidden">
            <h3 className="font-bold text-lg mb-2 text-gray-900">Descripción</h3>
            {propiedad.descripcion || "Sin descripción."}
            <p className="mt-6 text-xs text-gray-400 italic leading-tight">
                Las imágenes publicadas no son necesariamente vinculantes ni tampoco contractuales. Las medidas enunciadas son aproximadas y han sido dadas al sólo hecho orientativo, las exactas surgirán del respectivo título, plano y/o plancheta catastral.
            </p>
          </div>

          {/* MAPA (SOLO PANTALLA) */}
          <div className="mt-6 mb-6 print:hidden">
            <h3 className="font-bold text-lg mb-3 text-gray-900">Ubicación Aproximada</h3>
            <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden shadow-lg border border-gray-300">
                <iframe
                  title="Mapa" width="100%" height="100%" frameBorder="0" style={{ border: 0 }}
                  // URL OFICIAL DE GOOGLE MAPS
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(direccionMapa)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                ></iframe>
            </div>
          </div>

          {/* Botón WhatsApp */}
          <a
            href={`https://wa.me/5491138633987?text=Hola! Vengo de la página web y estoy interesado en: ${propiedad.titulo} (${propiedad.localidad || ''})`}
            target="_blank" rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold text-xl transition-transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 print:hidden"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>

      {/* --- ZONA INFERIOR SOLO PARA IMPRESIÓN --- */}
      <div className="hidden print:block mt-4 pt-4 border-t border-gray-300">
        <h3 className="font-bold text-sm mb-1 text-black">Descripción</h3>
        <div className="text-xs text-justify text-black leading-snug whitespace-pre-line">
            {propiedad.descripcion || "Sin descripción."}
        </div>
        
        {/* LEYENDA LEGAL */}
        <p className="mt-4 text-[9px] text-gray-500 italic text-justify leading-tight">
            Las imágenes publicadas no son necesariamente vinculantes ni tampoco contractuales. Las medidas enunciadas son aproximadas y han sido dadas al sólo hecho orientativo, las exactas surgirán del respectivo título, plano y/o plancheta catastral.
        </p>
      </div>

    </div>
  );
}

export default Detalle;