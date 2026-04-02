import React from 'react';

// Componente para nuevos usuarios tras registro exitoso
const Bienvenida = ({ irHome }) => {

  return (
    <div style={tarjetaStyle}>

      {/* Logo de EcoPoint */}
      <img src="/logo-ecopoint.png" alt="logo" width="80" />

      {/* Título de bienvenida para nuevo usuario */}
      <h2 style={tituloStyle}>
        ¡Bienvenido/a a EcoPoint!
      </h2>

      {/* Texto descriptivo */}
      <p style={textoStyle}>
        Tu cuenta ha sido creada correctamente.
        Ya puedes buscar puntos de reciclaje cerca de ti.
      </p>

      {/* Botón que llama a irHome() para ir al inicio */}
      <button
        onClick={irHome}
        style={botonStyle}
      >
        Empezar a reciclar
      </button>

    </div>
  );
};

// Estilo del contenedor principal
const tarjetaStyle = {
  maxWidth: '500px',
  margin: '100px auto',
  backgroundColor: 'white',
  padding: '60px 40px',
  borderRadius: '20px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
  textAlign: 'center'
};

// Estilo del título
const tituloStyle = {
  color: '#27ae60',
  margin: '20px 0'
};

// Estilo del texto descriptivo
const textoStyle = {
  color: '#636e72',
  fontSize: '1.1rem',
  lineHeight: '1.6'
};

// Estilo del botón
const botonStyle = {
  marginTop: '30px',
  backgroundColor: '#96E6A1',
  border: 'none',
  padding: '14px 30px',
  borderRadius: '25px',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '16px'
};

export default Bienvenida;