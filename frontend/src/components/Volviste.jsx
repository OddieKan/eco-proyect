import React from 'react';

const Volviste = ({ irHome }) => {
  return (
    <div style={{
      maxWidth: '500px',
      margin: '100px auto',
      backgroundColor: 'white',
      padding: '60px 40px',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      textAlign: 'center'
    }}>
      <img src="/logo-ecopoint.png" alt="logo" width="80" />
      
      <h2 style={{ color: '#27ae60', margin: '20px 0' }}>
        ¡Bienvenido/a de nuevo! 👋
      </h2>
      
      <p style={{ color: '#636e72', fontSize: '1.1rem' }}>
        Ya puedes buscar puntos de reciclaje cerca de ti.
      </p>

      <button
        onClick={irHome}
        style={{
          marginTop: '30px',
          backgroundColor: '#96E6A1',
          border: 'none',
          padding: '14px 30px',
          borderRadius: '25px',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Ir al buscador
      </button>
    </div>
  );
};

export default Volviste;