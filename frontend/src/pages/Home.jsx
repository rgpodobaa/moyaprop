import { useState, useEffect } from 'react';
import CardPropiedad from '../components/CardPropiedad';
import Hero from '../components/Hero';
import logoCliente from '../assets/logo.png'

function Home() {
  const [propiedades, setPropiedades] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroOperacion, setFiltroOperacion] = useState("Todas");

  useEffect(() => {
    // 1. Cargar propiedades
    fetch('http://localhost:5000/api/propiedades')
      .then(res => res.json())
      .then(data => setPropiedades(data))
      .catch(err => console.error("Error:", err));

    // 2. Cargar el Script de TikTok (Necesario para que aparezca el perfil)
    const script = document.createElement('script');
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Limpieza al salir de la página
      document.body.removeChild(script);
    }
  }, []);

  const propiedadesFiltradas = propiedades.filter(prop => {
    const coincideTexto = prop.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) || 
                          prop.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideOperacion = filtroOperacion === "Todas" || prop.operacion === filtroOperacion;
    return coincideTexto && coincideOperacion;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      
      <Hero setBusqueda={setBusqueda} setFiltroOperacion={setFiltroOperacion} />

      <div className="max-w-7xl mx-auto px-4 py-16" id='propiedades'>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-[#FF8C00] pl-4">
          Propiedades Destacadas
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propiedadesFiltradas.map(prop => (
            <CardPropiedad key={prop._id} propiedad={prop} />
          ))}
        </div>

        {propiedadesFiltradas.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No encontramos propiedades con esos criterios.</p>
          </div>
        )}
      </div>
      {/* --- SECCIÓN INSTAGRAM --- */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Síguenos en Instagram</h2>
          <p className="text-gray-500 mb-8">Descubre nuestras últimas novedades y recorridos exclusivos</p>

          {/* TARJETA TIPO PERFIL DE INSTAGRAM */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 p-6 md:p-8">
            
            {/* CABECERA DEL PERFIL */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
              {/* Foto de Perfil (Círculo con borde degradado de Instagram) */}
              <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
                <div className="bg-white p-1 rounded-full">
                  {/* Puse una imagen genérica, cámbiala por el logo del cliente si quieres */}
                  <img 
                    src={logoCliente}
                    alt="Perfil" 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Info del Usuario */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900">@moya.propiedades</h3>
                <p className="text-gray-500 text-sm mb-3">Expertos en encontrar tu hogar ideal 🏠</p>
                
                <a 
                  href="https://www.instagram.com/moya.propiedades/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[#0095F6] hover:bg-[#0074CC] text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors"
                >
                  Seguir
                </a>
              </div>

              {/* Estadísticas Falsas (Estética) */}
              <div className="hidden md:flex gap-6 text-center">
                <div><span className="font-bold block text-lg">150+</span><span className="text-gray-500 text-xs">Propiedades</span></div>
                <div><span className="font-bold block text-lg">1.2k</span><span className="text-gray-500 text-xs">Seguidores</span></div>
              </div>
            </div>

            {/* GRILLA SIMULADA (Fotos Pequeñas que parecen el Feed) */}
            {/* Usamos las primeras 3 propiedades para rellenar, o fotos fijas */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
               {/* FOTO 1 */}
               <a href="https://www.instagram.com/moya.propiedades/" target="_blank" className="aspect-square bg-gray-200 relative group overflow-hidden rounded-lg cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1600596542815-e36cb06c378d?q=80&w=400" alt="post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
               </a>
               
               {/* FOTO 2 */}
               <a href="https://www.instagram.com/moya.propiedades/" target="_blank" className="aspect-square bg-gray-200 relative group overflow-hidden rounded-lg cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400" alt="post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
               </a>

               {/* FOTO 3 */}
               <a href="https://www.instagram.com/moya.propiedades/" target="_blank" className="aspect-square bg-gray-200 relative group overflow-hidden rounded-lg cursor-pointer">
                 <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=400" alt="post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
               </a>
            </div>
            
            <div className="mt-6">
                 <a href="https://www.instagram.com/moya.propiedades/" target="_blank" className="text-[#0095F6] font-semibold hover:underline">Ver más publicaciones en Instagram →</a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default Home