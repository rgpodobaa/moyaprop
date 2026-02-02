import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

// Recibimos esAdmin y la función para cambiarlo (setEsAdmin)
function Navbar({ esAdmin, setEsAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Borramos la "memoria" del navegador
    localStorage.removeItem('esAdmin');
    // 2. Avisamos a la App que ya no somos admin
    setEsAdmin(false);
    // 3. Redirigimos al inicio
    navigate('/');
    setIsOpen(false); // Cerramos menú móvil si estaba abierto
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logo} alt="Logo Moya" className="h-16 w-auto object-contain transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-gray-800 tracking-wide leading-none">MOYA</span>
              <span className="text-sm font-bold text-[#A0522D] tracking-widest leading-none">Propiedades</span>
            </div>
          </Link>

          {/* MENÚ DESKTOP */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-[#FF8C00] font-medium transition-colors uppercase text-sm tracking-wide">Inicio</Link>
            <a href="/#propiedades" className="text-gray-600 hover:text-[#FF8C00] font-medium transition-colors uppercase text-sm tracking-wide">
              PROPIEDADES
            </a>
            <Link to="/nosotros" className="text-gray-600 hover:text-[#FF8C00] font-medium transition-colors uppercase text-sm tracking-wide">Nosotros</Link>
            <Link to="/contacto" className="text-gray-600 hover:text-[#FF8C00] font-medium transition-colors uppercase text-sm tracking-wide">Contacto</Link>

            {/* LÓGICA DEL BOTÓN ADMIN / LOGOUT */}
            {esAdmin ? (
              <div className="flex gap-4 items-center">
                <Link to="/admin" className="text-[#FF8C00] font-bold hover:underline">Panel</Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-bold transition-all shadow-md text-sm"
                >
                  SALIR
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="bg-[#FF8C00] hover:bg-[#A0522D] text-white px-5 py-2 rounded-lg font-bold transition-all shadow-md hover:shadow-lg text-sm"
              >
                ACCESO
              </Link>
            )}
          </div>

          {/* BOTÓN HAMBURGUESA (Móvil) */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-[#FF8C00] focus:outline-none">
              {isOpen ? (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-orange-50 border-b border-gray-100">INICIO</Link>
            <a href="/#propiedades" className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-orange-50 border-b border-gray-100">
              PROPIEDADES
            </a>
            <Link to="/nosotros" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-orange-50 border-b border-gray-100">NOSOTROS</Link>
            <Link to="/contacto" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-orange-50 border-b border-gray-100">CONTACTO</Link>

            {esAdmin ? (
              <>
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-bold text-[#FF8C00] hover:bg-orange-50">IR AL PANEL</Link>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-4 text-base font-bold text-red-500 hover:bg-red-50">CERRAR SESIÓN</button>
              </>
            ) : (
              <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-base font-bold text-[#FF8C00] hover:bg-orange-50">ACCESO ADMIN</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;