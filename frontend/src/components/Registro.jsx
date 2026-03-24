import React, { useState } from 'react';
import axios from 'axios';

const Registro = ({ irHome, irLogin }) => {

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setMensaje('La contraseña debe tener mínimo 6 caracteres');
      return;
    }

    try {

      setCargando(true);

      await axios.post(
        'http://localhost:4000/api/usuarios/registro',
        formData
      );

      setMensaje('Registro exitoso');

      setTimeout(() => {
        irLogin();
      }, 1500);

    } catch (error) {

      setMensaje(
        error.response?.data?.error ||
        'Error al registrar usuario'
      );

    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{
      maxWidth: '450px',
      margin: '60px auto',
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
    }}>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img src="/logo-ecopoint.png" width="60" alt="logo" />
        <h2>Crea tu cuenta</h2>
      </div>

      {mensaje && (
        <p style={{ textAlign: 'center', color: '#27ae60' }}>
          {mensaje}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
      >

        <input
          name="nombre"
          placeholder="Nombre"
          style={inputStyle}
          onChange={handleChange}
          required
        />

        <input
          name="apellido"
          placeholder="Apellido"
          style={inputStyle}
          onChange={handleChange}
          required
        />

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

        <button
          type="submit"
          style={botonStyle}
          disabled={cargando}
        >
          {cargando ? 'Registrando...' : 'Registrarme'}
        </button>

      </form>

      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        ¿Ya tienes cuenta?{' '}
        <span
          onClick={irLogin}
          style={{ color: '#27ae60', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Inicia sesión
        </span>
      </p>

      <p
        onClick={irHome}
        style={{
          textAlign: 'center',
          marginTop: '10px',
          cursor: 'pointer',
          color: '#999'
        }}
      >
        Volver al inicio
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
  backgroundColor: '#96E6A1',
  border: 'none',
  padding: '14px',
  borderRadius: '8px',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default Registro;