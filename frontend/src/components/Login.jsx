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
    padding: '14px',
    margin: '10px 0',
    borderRadius: '12px', 
    border: '1px solid #EAEAEA',
    backgroundColor: '#F9F9F9', 
    boxSizing: 'border-box',
    fontSize: '15px',
    outline: 'none'
  };

  const btnAcceder = {
    width: '100%',
    padding: '16px',
    backgroundColor: '#000000', 
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    marginTop: '15px',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'opacity 0.2s'
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
      //  'https://ecopoint-production-8ab9.up.railway.app/api/usuarios/login',
      `${import.meta.env.VITE_API_URL}/api/usuarios/login`,  
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
        error.response?.data?.error || 'Error al iniciar sesión'
      );
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '60px auto',
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '24px', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
      textAlign: 'center'
    }}>
      
      <img 
        src="/logo-ecopoint.png" 
        alt="logo" 
        width="60" 
        style={{ marginBottom: '10px' }}
      />

      <h2 style={{ margin: '10px 0', fontWeight: '700' }}>Iniciar Sesión</h2>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '25px' }}>
        Inicia sesión para cuidar el planeta
      </p>

      {mensaje && (
        <p style={{ 
          color: mensaje.includes('Error') ? '#e74c3c' : '#27ae60',
          fontSize: '14px',
          marginBottom: '15px' 
        }}>
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
          color: '#999',
          cursor: 'pointer',
          marginTop: '5px'
        }}>
          ¿Olvidaste la contraseña?
        </p>

        <button type="submit" style={btnAcceder}>
          Acceder
        </button>
      </form>
      
      <p style={{ marginTop: '25px', fontSize: '14px', color: '#666' }}>
        ¿No tienes cuenta?{' '}
        <span 
          style={{ color: '#27ae60', cursor: 'pointer', fontWeight: '600' }} 
          onClick={irRegistro}
        >
          Regístrate gratis
        </span>
      </p>
    </div>
  );
};

export default Login;