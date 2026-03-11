import React, {useState} from 'react';
import axios from 'axios';

const Buscador = () => {
    const [busqueda, setBusqueda] = useState(''); //aqui es lo que el user escribe en el buscador 
    const [resultado, setResultado] = useState(null); //lo que devuelve el servidor.
    const [error, setError] = useState(''); //Por si algo falla. 


    //conectamos con backend
    const buscarResiduo = async (e) => {
        e.preventDefault(); //evita que se recarge al dar a buscar.
        setError('');

        try{
            const response = await axios.get(`http://localhost:5000/api/recogidas?nombre=${busqueda}`);

            //se guarda larespuiesta en el estado "resultado"
            setResultado(response.data);
        } catch (err){
            setError('No encontramos ese residuo. ¡ASyudanos a mejorar sugiriéndolo');
            setResultado(null);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center'}}>
            <h2>¿Que quieres reciclar ?</h2>
            {/*Formulario de busqueda */}
            <form onSubmit={buscarResiduo}> 
                <input
                    type= "text"
                    placeholder='Ej:Latas de atun'
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <button type='submit'>Buscar</button>
            </form>

        {/* 3. Renderizado Condicional: Solo se muestra si hay resultados */}
        {resultado && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>Resultado:</h3>
          <p><strong>Depósitalo en:</strong> {resultado.contenedor}</p> [cite: 29, 32]
          <p><em>Consejo: {resultado.consejo}</em></p> [cite: 228]
        </div>
        )}
        {error && <p style={{color: 'red'}}> {error}</p>}
        </div>
    );
};

export default Buscador;
