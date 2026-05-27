import React, { useState } from 'react';
import axios from 'axios';

const Buscador = ({ tab, onPuntosEncontrados }) => {
  const [busqueda, setBusqueda] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  const obtenerIconoProducto = (nombre) => {
    const n = nombre?.toLowerCase() || '';
    if (n.includes('ropa') || n.includes('textil') || n.includes('pantalon')) return '👕';
    if (n.includes('cuaderno') || n.includes('papel') || n.includes('sobre')) return '📄';
    if (n.includes('lata') || n.includes('atun') || n.includes('conserva')) return '🥫';
    if (n.includes('botella') || n.includes('vidrio') || n.includes('cristal')) return '🍾';
    if (n.includes('fruta') || n.includes('comida') || n.includes('organico')) return '🍎';
    if (n.includes('pila') || n.includes('bateria')) return '🔋';
    return '♻️';
  };

  const obtenerImagenPNG = (nombreContenedor) => {
    const nombre = nombreContenedor?.toLowerCase() || '';
    if (nombre.includes('amarillo')) return '/am.png';
    if (nombre.includes('azul')) return '/a.png';
    if (nombre.includes('verde')) return '/v.png';
    if (nombre.includes('marrón') || nombre.includes('marron')) return '/m.png';
    if (nombre.includes('naranja')) return '/n.png';
    return '/am.png';
  };

  const buscarResiduo = async (e) => {
    if (e) e.preventDefault();
    if (!busqueda.trim()) return;

    setError('');
    try {
      let res;

      if (tab === "Punto limpio") {
        res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/puntos-limpios?cp=${busqueda}`
        );
        setResultado(res.data[0] || null);
        if (res.data.length) {
          onPuntosEncontrados(res.data);
        } else {
          setError('No encontramos puntos limpios con ese código postal');
        }
      } else {
        res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/contenedores/buscar-residuo?nombre=${busqueda}`
        );
        setResultado(res.data[0] || null);
        if (!res.data.length) setError('No encontramos ese residuo');
      }

    } catch (err) {
      setError('Error al realizar la búsqueda');
      setResultado(null);
    }
  };

  React.useEffect(() => {
    setResultado(null);
    setError('');
    setBusqueda('');
  }, [tab]);

  if (tab === "Recogida") return null;

  return (
    <div style={{ paddingBottom: '40px' }}>

      <form onSubmit={buscarResiduo} style={contenedorBuscadorStyle}>
        <input
          type="text"
          placeholder={tab === "Punto limpio" ? "Introduce tu CP..." : "¿Qué quieres reciclar?"}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={inputSinBordeStyle}
        />
        <button type="submit" style={botonLupaStyle}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>

      {resultado && tab === "Punto limpio" && (
        <div style={{ marginTop: '20px', backgroundColor: 'white', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
          <span style={{ fontSize: '15px', fontWeight: '800', color: '#2ecc71', letterSpacing: '0.5px' }}>PUNTO LIMPIO ENCONTRADO</span>
          <h3 style={{ margin: '8px 0', fontSize: '20px', color: '#2d3436', fontWeight: '700' }}>{resultado.nombre}</h3>
          <p style={{ margin: '4px 0', fontSize: '16px', color: '#636e72' }}> {resultado.direccion}</p>
          {resultado.horario && <p style={{ margin: '4px 0', fontSize: '20px', color: '#165e78' }}>{resultado.horario}</p>}
          {resultado.distrito && <p style={{ margin: '4px 0', fontSize: '16px', color: '#636e72' }}> {resultado.distrito}</p>}
          {resultado.materialesAceptados?.length > 0 && (
            <p style={{ margin: '8px 0 0 0', fontSize: '20px', color: '#2ecc71', fontWeight: '600' }}>
               {resultado.materialesAceptados.join(', ')}
            </p>
          )}
        </div>
      )}

      {resultado && tab !== "Punto limpio" && (
        <div style={{ marginTop: '30px', animation: 'fadeIn 0.3s ease' }}>
          <p style={{ fontWeight: '500', marginBottom: '15px', color: '#666', fontSize: '14px' }}>Resultado encontrado:</p>

          <div style={tarjetaPrincipalStyle}>
            <div style={{ padding: '45px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '75px', marginBottom: '15px' }}>
                {obtenerIconoProducto(resultado.nombre)}
              </div>
              <h2 style={{ margin: 0, fontSize: '26px', fontWeight: '900', color: '#1A2E35' }}>
                {resultado.nombre?.toUpperCase()}
              </h2>
            </div>

            <div style={franjaContenedorFullStyle}>
              <img
                src={obtenerImagenPNG(resultado.contenedor)}
                alt="contenedor"
                style={{ width: '90px', height: 'auto', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' }}
              />
              <div style={{ marginLeft: '25px' }}>
                <span style={{ fontSize: '13px', color: '#666', display: 'block', fontWeight: 'bold' }}>RECICLAR EN EL CONTENEDOR:</span>
                <span style={{ fontSize: '24px', fontWeight: '950', color: '#000' }}>
                  {resultado.contenedor?.toUpperCase()}
                </span>
              </div>
            </div>

            <div style={seccionConsejosStyle}>
              <strong style={{ display: 'block', marginBottom: '10px', fontSize: '16px' }}>Consejos de reciclaje:</strong>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', fontWeight: '500' }}>
                {resultado.consejos}
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        tab === "Punto limpio" ? (
          <p style={{ textAlign: 'center', color: '#e74c3c', marginTop: '20px' }}>
            {error}
          </p>
        ) : (
          <div style={tarjetaErrorStyle}>
            <p>¿No está en nuestra lista?</p>
            <h2 style={{ margin: '10px 0 20px 0' }}>¡Ayúdanos a crecer!</h2>
            <button style={botonMasStyle}>+</button>
          </div>
        )
      )}

    </div>
  );
};

const contenedorBuscadorStyle = {
  display: 'flex',
  backgroundColor: 'white',
  borderRadius: '30px',
  padding: '5px 5px 5px 25px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
  alignItems: 'center'
};

const inputSinBordeStyle = {
  flex: 1,
  border: 'none',
  outline: 'none',
  fontSize: '16px',
  padding: '15px 0'
};

const botonLupaStyle = {
  backgroundColor: '#000',
  border: 'none',
  borderRadius: '25px',
  width: '50px',
  height: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s'
};

const tarjetaPrincipalStyle = {
  backgroundColor: '#EAEAEA',
  borderRadius: '35px',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
  border: '1px solid #EEE'
};

const franjaContenedorFullStyle = {
  backgroundColor: '#FFFFFF',
  padding: '30px 40px',
  display: 'flex',
  alignItems: 'center',
  borderTop: '1px solid #E0E0E0',
  borderBottom: '1px solid #E0E0E0'
};

const seccionConsejosStyle = {
  backgroundColor: '#FBC02D',
  padding: '35px 40px',
  color: '#000'
};

const tarjetaErrorStyle = {
  marginTop: '40px',
  backgroundColor: '#5D677D',
  padding: '50px',
  borderRadius: '35px',
  color: 'white',
  textAlign: 'center'
};

const botonMasStyle = {
  background: 'none',
  border: '2px solid white',
  color: 'white',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  fontSize: '32px',
  cursor: 'pointer'
};

export default Buscador;