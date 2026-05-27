import React, { useState } from 'react';
import axios from 'axios';

const Registro = ({ irHome, irLogin, irBienvenida }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.nombre.length < 2) {
      setMensaje('El nombre debe tener mínimo 2 caracteres');
      return;
    }

    if (formData.apellido.length < 2) {
      setMensaje('El apellido debe tener mínimo 2 caracteres');
      return;
    }

    if (formData.password.length < 6) {
      setMensaje('La contraseña debe tener mínimo 6 caracteres');
      return;
    }

    if (!aceptaTerminos) {
      setMensaje('Debes aceptar los términos y condiciones');
      return;
    }

    try {
      setCargando(true);
      await axios.post(
        // 'https://ecopoint-production-8ab9.up.railway.app/api/usuarios/registro',
        `${import.meta.env.VITE_API_URL}/api/usuarios/registro`,
        formData
      );

      setMensaje('¡Cuenta creada!');
      setTimeout(() => {
        irBienvenida();
      }, 1500);

    } catch (error) {
      setMensaje(
        error.response?.data?.error || 'Error al registrar usuario'
      );
    } finally {
      setCargando(false);
    }
  };

  const inputFigmaStyle = {
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid #EAEAEA',
    backgroundColor: '#F9F9F9',
    fontSize: '15px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  };

  const botonNegroStyle = {
    backgroundColor: '#000',
    color: 'white',
    border: 'none',
    padding: '16px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'opacity 0.2s'
  };

  return (
    <div style={{
      maxWidth: '450px',
      margin: '60px auto',
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '24px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
    }}>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img src="/logo-ecopoint.png" width="50" alt="logo" style={{ marginBottom: '10px' }} />
        <h2 style={{ margin: 0, fontWeight: '700' }}>Crea tu cuenta</h2>
        <p style={{ color: '#888', fontSize: '14px', marginTop: '5px' }}>Únete a la comunidad EcoPoint</p>
      </div>

      {mensaje && (
        <p style={{
          textAlign: 'center',
          color: mensaje.includes('creada') ? '#0d4e28' : '#e74c3c',
          fontSize: '14px',
          marginBottom: '15px'
        }}>
          {mensaje}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        <input
          name="nombre"
          placeholder="Nombre"
          style={inputFigmaStyle}
          onChange={handleChange}
          required
        />

        <input
          name="apellido"
          placeholder="Apellido"
          style={inputFigmaStyle}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          style={inputFigmaStyle}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña (mín. 6 caracteres)"
          style={inputFigmaStyle}
          onChange={handleChange}
          required
        />

        <label style={{ fontSize: '13px', color: '#666', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
          />
          Acepto los términos y condiciones
        </label>
        
        <button
          type="submit"
          style={{ ...botonNegroStyle, opacity: cargando ? 0.7 : 1 }}
          disabled={cargando}
        >
          {cargando ? 'Registrando...' : 'Registrarme'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '14px', color: '#666' }}>
        ¿Ya tienes cuenta?{' '}
        <span
          onClick={irLogin}
          style={{ color: '#27ae60', cursor: 'pointer', fontWeight: '600' }}
        >
          Inicia sesión
        </span>
      </p>

      <p
        onClick={irHome}
        style={{
          textAlign: 'center',
          marginTop: '15px',
          cursor: 'pointer',
          color: '#BBB',
          fontSize: '13px',
          textDecoration: 'underline'
        }}
      >
        Volver al inicio
      </p>
    </div>
  );
};

export default Registro;
