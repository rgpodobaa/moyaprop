function Nosotros() {
  return (
    <div className="bg-white min-h-screen">
      {/* Encabezado de la página */}
      <div className="bg-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Nuestra Historia</h1>
          <div className="h-1.5 w-24 bg-[#FF8C00] mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-8 text-lg text-gray-700 leading-relaxed text-center md:text-left">
          
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#FF8C00] first-letter:mr-3 first-letter:float-left">
            Somos una joven empresa familiar, con una vasta experiencia en el mercado inmobiliario, habiendo formado parte en su momento, del staff de ventas de una de las más reconocidas empresas inmobiliarias de la zona sur del gran Buenos Aires.
          </p>

          <p className="bg-[#FFF5EB] p-6 border-l-4 border-[#A0522D] rounded-r-xl italic">
            "Nuestra finalidad es brindar todas las alternativas posibles para culminar cualquier negocio inmobiliario con éxito, cumpliendo así, con las necesidades y exigencias de cada uno de nuestros clientes."
          </p>

          <p>
            Estamos para asesorarlo y acompañarlo en cada uno de los procesos del negocio inmobiliario, comprendiendo el valor trascendental que tiene tomar la decisión de adquirir su ansiada vivienda o la de realizar la mejor inversión para resguardar sus ahorros.
          </p>

          <div className="pt-10">
            <p className="text-2xl font-bold text-[#A0522D] text-center border-t border-gray-100 pt-8">
              Construyendo confianza en la gestión.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;