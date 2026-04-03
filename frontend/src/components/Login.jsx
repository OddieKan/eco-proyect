import React, { useState } from 'react';
import axios from 'axios';

// Recibe la prop irHome desde App.jsx para volver al inicio tras login
const Login = ({ irRegistro, irVolviste }) => {

  // Estado del formulario - guarda lo que escribe el usuario
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [mensaje, setMensaje] = useState('');   // Mensajes de error o éxito
  const [cargando, setCargando] = useState(false); // Controla el botón mientras espera

  // Se ejecuta cada vez que el usuario escribe en un input
  const handleChange = (e) => {
    setFormData({
      ...formData,           // Mantiene los otros campos
      [e.target.name]: e.target.value  // Actualiza solo el campo que cambió
    });
  };

  // Se ejecuta al pulsar "Acceder"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    try {
      setCargando(true);

      // Llama al backend con email y contraseña
      await axios.post(
        'http://localhost:4000/api/usuarios/login',
        formData
      );

      setMensaje('¡Bienvenido/a!');

      // Espera 1.5 segundos y vuelve al home
      setTimeout(() => {
        irVolviste();
      }, 1500);

    } catch (error) {
      // Muestra el mensaje de error que devuelve el backend
      setMensaje(
        error.response?.data?.error ||
        'Email o contraseña incorrectos'
      );
    } finally {
      setCargando(false);
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

      <img src="/logo-ecopoint.png" alt="logo" width="60" />
      <h2 style={{ margin: '20px 0' }}>Iniciar Sesión</h2>

      {/* Mensaje de éxito o error */}
      {mensaje && (
        <p style={{ color: mensaje.includes('Bienvenido') ? '#27ae60' : 'red' }}>
          {mensaje}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >
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

        <p style={{ textAlign: 'right', fontSize: '12px', color: '#636e72' }}>
          ¿Olvidaste la contraseña?
        </p>

        <button
          type="submit"
          style={botonStyle}
          disabled={cargando}
        >
          {cargando ? 'Accediendo...' : 'Acceder'}
        </button>

      </form>

      <p style={{ marginTop: '20px', fontSize: '14px' }}>
        ¿No tienes cuenta?{' '}
        <span
          onClick={irRegistro}
          style={{ color: '#27ae60', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Regístrate
        </span>
      </p>

    </div>
  );
};

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ddd'
};

const botonStyle = {
  backgroundColor: '#2D3436',
  border: 'none',
  padding: '14px',
  borderRadius: '8px',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '16px'
};

export default Login;