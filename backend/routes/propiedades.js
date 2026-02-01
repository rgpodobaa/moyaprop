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

// --- RUTA 4: Actualizar una propiedad (PUT) ---
router.put('/:id', async (req, res) => {
    try {
        const propiedadActualizada = await Propiedad.findByIdAndUpdate(
            req.params.id, // Buscamos por el ID que viene en la URL
            req.body,      // Le metemos los datos nuevos
            { new: true }  // Importante: Esto nos devuelve la versión ya cambiada
        );
        res.json(propiedadActualizada);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar", error });
    }
});

export default router;