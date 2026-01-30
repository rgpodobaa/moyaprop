import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setEsAdmin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await res.json();

      if (data.success) {
        // Si la contraseña es correcta:
        setEsAdmin(true); // Avisamos a la App que somos admin
        localStorage.setItem('esAdmin', 'true'); // Guardamos en el navegador para no loguearnos a cada rato
        navigate('/admin'); // Nos manda al panel
      } else {
        setError("Contraseña incorrecta");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border-t-4 border-[#FF8C00]">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Acceso <span className="text-[#FF8C00]">Administrativo</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FF8C00]"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-center font-bold">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-[#FF8C00] hover:bg-[#A0522D] text-white py-3 rounded-lg font-bold transition-transform hover:scale-105"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;