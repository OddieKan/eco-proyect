import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaPuntos = () => {
    //estados para la logica
    const [distrito,setDistrito] = useState('');
    const [puntos, setPuntos] = useState([]);
    const [cargando, setCargando] = useState(false);

    //lista de distritos.
    const distritosMadrid= ["Arganzuela", "Retiro", "Centro", "Hortaleza", "Moncloa - Aravaca", "Chamberí"];

    //funcion para obtener los puntos del backend
    const obtenerPuntos = async () => {
        if (!distrito) return;
        setCargando(true);
        try{
            const res= await axios.get(`http://localhost:5000/api/contenedores?distrito=${distrito}`);
            setPuntos(res.data);
        } catch (err) {
            console.error("Error obteniendo puntos", err);
        }finally{
            setCargando(false);
        }
    };
    //si el distrito cambia en el desplegable ejecutamos la busqueda 
    useEffect(() => {
        obtenerPuntos();
    }, [distrito]);
    
    return (
        <div style={{padding:'20px', fontFamily:'Arial'}}> 
            <h3>Localizador de puntos especiales</h3>
            
            <label>Selecciona tu distrito: </label>
            <select value={distrito} onChange={(e) => setDistrito(e.target.value)}>
                <option value="">-- Elige un distrito --</option>
                {distritosMadrid.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <hr/>
            {cargando && <p>Buscando Contenedores...</p>}

            <div style={{ display: 'grid', gap: '15px' }}>
                {puntos.map((punto, index) => (
                <div key={index} style={{ 
                    borderLeft: `10px solid ${punto.tipo === 'aceite' ? '#f1c40f' : '#34495e'}`,
                    padding: '10px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px'
                    }}>
                    <h4 style={{ margin: '0 0 5px 0' }}>
                        {punto.tipo === 'aceite' ? '🟡 Aceite Vegetal' : '🔋 Pilas y Baterías'}
                    </h4>
                    <p style={{ margin: '0', fontSize: '14px' }}>{punto.direccion}</p>
                    <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '12px' }}>
                        Horario: {punto.horario} [cite: 255]
                    </p>
                </div>
                ))}
            </div>

            {distrito && puntos.length === 0 && !cargando && (
            <p>No se encontraron puntos en este distrito.</p>)}
       </div>
    );
    };

    export default ListaPuntos;
      

       
    
