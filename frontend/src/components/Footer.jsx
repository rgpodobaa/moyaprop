import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Columna 1: Marca y Slogan */}
        <div>
          <Link to="/" className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-1">
            MOYA<span className="text-[#FF8C00]">PROPIEDADES</span>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Somos una joven empresa familiar dedicada a cumplir el sueño de la vivienda propia. Experiencia, compromiso y seriedad en la zona sur.
          </p>
          <p className="mt-4 font-bold text-[#FF8C00] italic">
            "Construyendo confianza en la gestión."
          </p>

          {/* Redes Sociales (Integradas al estilo del footer) */}
          <div className="flex gap-4 mt-6">
            <a href="https://www.tiktok.com/@moya.propiedades" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              {/* Icono TikTok */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 1 0-7.7 7.72 6.84 6.84 0 0 0 6.85-6.83V7.09a7.37 7.37 0 0 0 3.84 1.48v-3.73a3.57 3.57 0 0 1 2.24-1.15z"/></svg>
            </a>
            <a href="https://wa.me/5491138633987" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              {/* Icono WhatsApp */}
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>
          </div>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 border-b border-gray-700 pb-2 inline-block">Navegación</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-[#FF8C00] transition">Inicio</Link></li>
            <li><Link to="/nosotros" className="hover:text-[#FF8C00] transition">Nosotros</Link></li>
            <li><Link to="/contacto" className="hover:text-[#FF8C00] transition">Contacto</Link></li>
            {/* Eliminado "Propiedades" */}
            <li><Link to="/admin" className="hover:text-[#FF8C00] transition">Acceso Administrativo</Link></li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4 border-b border-gray-700 pb-2 inline-block">Contacto</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#FF8C00]">📍</span>
              <span>Burzaco, Buenos Aires,<br/>Argentina</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#FF8C00]">📞</span>
              <a href="https://wa.me/5491138633987" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF8C00] transition">
                11-3863-3987
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-[#FF8C00]">✉️</span>
              <a href="mailto:consultas@moyaprop.com.ar" className="hover:text-[#FF8C00] transition">
                consultas@moyaprop.com.ar
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Moya Propiedades. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;