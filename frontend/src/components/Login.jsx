import React from 'react';

const Login = ({ onBack }) => {
  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #dfe6e9',
    backgroundColor: '#fff',
    boxSizing: 'border-box'
  };

  const btnAcceder = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2D3436', // El color oscuro de tu Figma
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '16px'
  };

  return (
    <div style={{ maxWidth: '400px', margin: '60px auto', backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center' }}>
      <img src="https://cdn-icons-png.flaticon.com/512/3299/3299935.png" alt="logo" width="60" />
      <h2 style={{ margin: '20px 0' }}>Iniciar Sesión</h2>
      
      <form>
        <input type="email" placeholder="Correo electrónico" style={inputStyle} />
        <input type="password" placeholder="Contraseña" style={inputStyle} />
        
        <p style={{ textAlign: 'right', fontSize: '12px', color: '#636e72', cursor: 'pointer' }}>
          ¿Olvidaste la contraseña?
        </p>

        <button type="submit" style={btnAcceder}>Acceder</button>
      </form>
      
      <p style={{ marginTop: '20px', fontSize: '14px' }}>
        ¿No tienes cuenta? <span style={{ color: '#27ae60', cursor: 'pointer', fontWeight: 'bold' }} onClick={onBack}>Regístrate</span>
      </p>
    </div>
  );
};

export default Login;