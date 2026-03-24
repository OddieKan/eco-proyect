import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaPuntos = () => {
    const [distrito, setDistrito] = useState('');
    const [puntos, setPuntos] = useState([]);
    const [cargando, setCargando] = useState(false);

    const distritosMadrid = ["Arganzuela", "Retiro", "Centro", "Hortaleza", "Moncloa - Aravaca", "Chamberí"];

    const obtenerPuntos = async () => {
        setCargando(true);
        try {
            // AHORA SÍ enviamos el distrito como parámetro para que el backend filtre
            const res = await axios.get(`http://localhost:4000/api/contenedores/buscar?distrito=${distrito}`);
            
            if (res.data) {
                setPuntos(res.data);
            }
        } catch (err) {
            console.error("Error crítico de conexión:", err);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerPuntos();
    }, [distrito]); 

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}> 
            <h3>Localizador de puntos especiales</h3>
            
            <label>Selecciona tu distrito: </label>
            <select value={distrito} onChange={(e) => setDistrito(e.target.value)}>
                <option value="">-- Todos los distritos --</option>
                {distritosMadrid.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <hr/>
            {cargando && <p>Buscando Contenedores...</p>}

            <div style={{ display: 'grid', gap: '15px' }}>
                {puntos.map((punto, index) => {
                    // Lógica para detectar el tipo y poner color/icono
                    const tipoLimpio = punto.tipo ? punto.tipo.toLowerCase() : '';
                    let color = '#34495e'; 
                    let icono = '♻️';

                    if (tipoLimpio.includes('aceite')) { color = '#f1c40f'; icono = '🟡'; }
                    else if (tipoLimpio.includes('ropa')) { color = '#9b59b6'; icono = '👕'; }
                    else if (tipoLimpio.includes('pila')) { color = '#e67e22'; icono = '🔋'; }
                    else if (tipoLimpio.includes('vidrio')) { color = '#2ecc71'; icono = '🍷'; }

                    return (
                        <div key={index} style={{ 
                            borderLeft: `10px solid ${color}`,
                            padding: '15px',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '5px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}>
                            <h4 style={{ margin: '0 0 5px 0', textTransform: 'capitalize' }}>
                                {icono} {punto.tipo || 'Punto de Reciclaje'}
                            </h4>
                            <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold' }}>{punto.direccion}</p>
                            <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '12px' }}>
                                🕒 Horario: {punto.horario || '24h'} 
                                {punto.codigoPostal && ` | 📮 CP: ${punto.codigoPostal}`}
                            </p>
                        </div>
                    );
                })}
            </div>

            {puntos.length === 0 && !cargando && (
                <p>No se encontraron puntos. Prueba con otro distrito o revisa la conexión.</p>
            )}
        </div>
    );
};

export default ListaPuntos;