import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { Readable } from 'stream';

dotenv.config();

const router = express.Router();

// 1. Configurar Cloudinary con tus claves
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Configurar Multer (para recibir el archivo en memoria RAM temporalmente)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 3. La Ruta POST
router.post('/', upload.single('imagen'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ mensaje: "No se subió ningún archivo" });
        }

        // Convertir el buffer de memoria a un stream legible para Cloudinary
        const stream = cloudinary.uploader.upload_stream(
            { folder: "inmopro_casas" }, // Carpeta en Cloudinary
            (error, result) => {
                if (error) return res.status(500).json({ mensaje: "Error en Cloudinary", error });
                
                // ¡Éxito! Devolvemos la URL segura
                res.json({ url: result.secure_url });
            }
        );

        Readable.from(req.file.buffer).pipe(stream);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
});

export default router;