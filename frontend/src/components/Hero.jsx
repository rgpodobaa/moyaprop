import { useState } from 'react';

function Hero({ setBusqueda, setFiltroOperacion }) {
  // Usamos un estado local para no filtrar letra por letra (solo al dar clic)
  const [textoLocal, setTextoLocal] = useState("");
  const [opLocal, setOpLocal] = useState("Todas");

  const manejarBusqueda = () => {
    setBusqueda(textoLocal);
    setFiltroOperacion(opLocal);
  };

  return (
    <div className="relative h-[500px] w-full flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1920')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 text-center px-4 w-full">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
          Tu próximo hogar está <span className="text-[#FF8C00]">aquí</span>
        </h1>

        <div className="bg-white p-2 rounded-lg shadow-2xl flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Barrio, ciudad o título..."
            className="flex-grow p-3 focus:outline-none text-gray-700"
            onChange={(e) => setTextoLocal(e.target.value)}
          />
          <select
            className="p-3 border-l border-gray-200 text-gray-600 focus:outline-none"
            onChange={(e) => setOpLocal(e.target.value)}
          >
            <option value="Todas">Operación</option>
            <option value="Venta">Venta</option>
            <option value="Alquiler">Alquiler</option>
          </select>
          <button
            onClick={manejarBusqueda}
            className="bg-[#FF8C00] hover:bg-[#A0522D] text-white px-8 py-3 rounded-md font-bold transition-colors"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero