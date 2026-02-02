import mongoose from 'mongoose';

const propiedadSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    precio: Number,
    
    moneda: { 
        type: String, 
        default: 'USD',
        enum: ['USD', 'ARS']
    },

    tipo: String, 
    operacion: String,
    
    // --- CAMBIOS DE UBICACIÓN ---
    ubicacion: String,  // Esto será la Dirección exacta (Calle y altura)
    localidad: String,  // NUEVO: Barrio o Ciudad (Ej: José Mármol)

    // --- NUEVOS CAMPOS DE DETALLE ---
    superficieTotal: Number,      // en m2
    superficieConstruida: Number, // en m2
    antiguedad: Number,           // en años
    
    imagenes: [String]
});

export default mongoose.model('Propiedad', propiedadSchema);