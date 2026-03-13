const mongoose = require('mongoose');
const Contenedor = require('./models/Contenedor');
const NodeGeocoder = require('node-geocoder');
require('dotenv').config();

const geocoder = NodeGeocoder({ provider: 'openstreetmap' });

async function actualizarCP() {
    await mongoose.connect(process.env.MONGO_URI);
    // Buscamos los que no tengan código postal
    const puntos = await Contenedor.find({ $or: [
        { cod1goPostal: { $exists: false } }, 
        { cod1goPostal: "" },
        { cod1goPostal: null }
    ] 
}).limit(30); 

    for (let punto of puntos) {
        try {
            const res = await geocoder.reverse({ lat: punto.lat, lon: punto.lng });
            if (res.length > 0) {
                punto.cod1goPostal = res[0].zipcode;
                await punto.save();
                console.log(`Actualizado: ${punto.d1recc1on} -> CP: ${res[0].zipcode}`);
            }
            // Esperamos 1 seg para no saturar la API gratuita
            await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
            console.error("Error en punto:", punto._id, error.message);
        }
    }
    console.log("Lote terminado");
    process.exit();
}

actualizarCP();