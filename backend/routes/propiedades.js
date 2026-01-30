import express from 'express';
import Propiedad from '../models/Propiedad.js';

const router = express.Router();

// --- RUTA 1: Obtener todas las propiedades (GET) ---
router.get('/', async (req, res) => {
    try {
        const propiedades = await Propiedad.find();
        res.json(propiedades);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener propiedades" });
    }
});

// --- RUTA 2: Crear una nueva propiedad (POST) ---
router.post('/', async (req, res) => {
    try {
        const nuevaPropiedad = new Propiedad(req.body);
        const guardada = await nuevaPropiedad.save();
        res.status(201).json(guardada);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear la propiedad", error });
    }
});

// --- RUTA 3: Borrar una propiedad (DELETE) ---
router.delete('/:id', async (req, res) => {
    try {
        await Propiedad.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Propiedad eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al borrar" });
    }
});

export default router;