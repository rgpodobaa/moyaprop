import { Link } from 'react-router-dom';

function CardPropiedad({ propiedad }) {
  // Verificamos si hay imágenes
  const imagenMostrar = propiedad.imagenes && propiedad.imagenes.length > 0 
    ? propiedad.imagenes[0] 
    : null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      
      {/* ZONA DE IMAGEN */}
      <div className="h-56 bg-gray-200 relative overflow-hidden group">
        {imagenMostrar ? (
          <img 
            src={imagenMostrar} 
            alt={propiedad.titulo} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-sm">Sin imagen</span>
          </div>
        )}
        
        {/* Etiqueta flotante de Operación */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm ${propiedad.operacion === 'Venta' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
            {propiedad.operacion}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-bold text-[#A0522D] uppercase tracking-wide">{propiedad.tipo}</p>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{propiedad.titulo}</h3>
        <p className="text-gray-500 text-sm mb-4 flex-grow">{propiedad.ubicacion}</p>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          {/* --- AQUÍ ESTÁ EL CAMBIO --- */}
          <p className="text-2xl font-black text-gray-900 mb-4">
             {propiedad.moneda === 'ARS' ? '$' : 'U$S'} {propiedad.precio.toLocaleString('es-AR')}
          </p>
          {/* --------------------------- */}
          
          <Link 
            to={`/propiedad/${propiedad._id}`}
            className="block w-full text-center bg-[#FF8C00] hover:bg-[#A0522D] text-white py-3 rounded-lg font-bold transition-colors shadow-sm"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardPropiedad;