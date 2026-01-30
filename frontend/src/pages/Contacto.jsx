import { useState } from 'react';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de envío
    alert(`¡Gracias ${formData.nombre}! Hemos recibido tu consulta en consultas@moyaprop.com.ar. Te responderemos a la brevedad.`);
    setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900">Contáctanos</h1>
          <p className="mt-4 text-xl text-gray-600">
            Estamos en Burzaco para asesorarte en tu próxima operación inmobiliaria.
          </p>
          <div className="h-1 w-20 bg-[#FF8C00] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* COLUMNA 1: Información Oficial (Sin Mapa) */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#FF8C00]">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Vías de Contacto</h3>

            <div className="space-y-8">
              {/* Dirección */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-3xl shadow-sm">
                  📍
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Ubicación</p>
                  <p className="text-gray-600 text-lg">Burzaco, Buenos Aires, Argentina</p>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-3xl shadow-sm">
                  📱
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">WhatsApp / Teléfono</p>
                  <a
                    href="https://wa.me/5491138633987"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 text-lg hover:text-[#FF8C00] transition font-medium"
                  >
                    11-3863-3987
                  </a>
                  <p className="text-sm text-gray-400 mt-1">Haga clic para enviar mensaje</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center text-3xl shadow-sm">
                  ✉️
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Correo Electrónico</p>
                  <a
                    href="mailto:consultas@moyaprop.com.ar"
                    className="text-gray-600 text-lg hover:text-[#FF8C00] transition font-medium"
                  >
                    consultas@moyaprop.com.ar
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA 2: Formulario */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Déjanos tu mensaje</h3>

            <form
              action="https://formspree.io/f/mdaaabdv"
              method="POST"
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                <input
                  type="text" name="nombre" required
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email" name="email" required
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition"
                    placeholder="tucorreo@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="tel" name="telefono"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition"
                    placeholder="11 ..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Consulta</label>
                <textarea
                  name="mensaje" required rows="5"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FF8C00] focus:outline-none transition"
                  placeholder="Hola, quisiera saber más sobre..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#A0522D] hover:bg-[#8B4513] text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                Enviar Consulta
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contacto;