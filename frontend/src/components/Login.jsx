import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ irHome, irRegistro, setUsuarioLogueado }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [mensaje, setMensaje] = useState('');

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
    backgroundColor: '#2D3436',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '16px'
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'http://localhost:4000/api/usuarios/login',
        formData
      );
      localStorage.setItem("token", res.data.token);
      setUsuarioLogueado(true);
      setMensaje('Login correcto');

      setTimeout(() => {
        irHome();
      }, 1000);

    } catch (error) {
      setMensaje(
        error.response?.data?.error ||
        'Error al iniciar sesión'
      );
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '60px auto',
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      textAlign: 'center'
    }}>
      
      <img 
        src="https://cdn-icons-png.flaticon.com/512/3299/3299935.png" 
        alt="logo" 
        width="60" 
      />

      <h2 style={{ margin: '20px 0' }}>Iniciar Sesión</h2>

      {mensaje && (
        <p style={{ color: '#27ae60' }}>
          {mensaje}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          style={inputStyle}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          style={inputStyle}
          onChange={handleChange}
          required
        />
        
        <p style={{
          textAlign: 'right',
          fontSize: '12px',
          color: '#636e72',
          cursor: 'pointer'
        }}>
          ¿Olvidaste la contraseña?
        </p>

        <button type="submit" style={btnAcceder}>
          Acceder
        </button>
      </form>
      
      <p style={{ marginTop: '20px', fontSize: '14px' }}>
        ¿No tienes cuenta?{' '}
        <span 
          style={{ color: '#27ae60', cursor: 'pointer', fontWeight: 'bold' }} 
          onClick={irRegistro}
        >
          Regístrate
        </span>
      </p>
    </div>
  );
};

export default Login;