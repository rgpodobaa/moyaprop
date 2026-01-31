import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Componentes Estructurales
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas (Ya no hay funciones sueltas aquí, todo se importa)
import Home from './pages/Home'; 
import Admin from './pages/Admin';
import Detalle from './pages/Detalle';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import FloatingWhatsApp from './components/BotonWhatsapp';

// Guardia de Seguridad
const RutaProtegida = ({ esAdmin, children }) => {
  if (!esAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [esAdmin, setEsAdmin] = useState(() => {
    return localStorage.getItem('esAdmin') === 'true';
  });

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar esAdmin={esAdmin} setEsAdmin={setEsAdmin} />

        <FloatingWhatsApp />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/propiedad/:id" element={<Detalle />} />
            
            <Route path="/login" element={<Login setEsAdmin={setEsAdmin} />} />

            <Route 
              path="/admin" 
              element={
                <RutaProtegida esAdmin={esAdmin}>
                  <Admin />
                </RutaProtegida>
              } 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;