import 'dotenv/config'; // <--- ¡IMPORTANTE! Esto carga las variables del archivo .env
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import propiedadRoutes from './routes/propiedades.js';
import uploadRoutes from './routes/upload.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/propiedades', propiedadRoutes);
app.use('/api/upload', uploadRoutes);

// --- CONFIGURACIÓN DE MONGODB ---
// Ahora leemos la dirección desde el archivo .env (más seguro)
const mongoURI = process.env.MONGO_URI; 

mongoose.connect(mongoURI)
  .then(() => console.log("⭐⭐⭐⭐⭐ ¡CONEXIÓN A NUBE EXITOSA! ⭐⭐⭐⭐⭐"))
  .catch((err) => {
      console.error("❌ Error de conexión:", err.message);
      console.error("¿Olvidaste poner el MONGO_URI en el archivo .env?");
  });

// Ruta de prueba
app.get('/', (req, res) => {
  res.send("El servidor está vivo");
});

// --- RUTA DE LOGIN ---
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    
    // Comparamos con la clave guardada en .env
    if (password === process.env.ADMIN_PASSWORD) {
        res.json({ success: true, mensaje: "Bienvenido" });
    } else {
        res.status(401).json({ success: false, mensaje: "Contraseña incorrecta" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});