import mongoose from 'mongoose';

const propiedadSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    precio: Number,
    
    // --- NUEVO CAMPO SOLICITADO POR EL CLIENTE ---
    moneda: { 
        type: String, 
        default: 'USD', // Si no especifican, será Dólares
        enum: ['USD', 'ARS'] // Solo permitimos estos dos valores
    },
    // ---------------------------------------------

    tipo: String, // Casa, Departamento, etc.
    operacion: String, // Venta o Alquiler
    ubicacion: String,
    imagenes: [String]
});

export default mongoose.model('Propiedad', propiedadSchema);