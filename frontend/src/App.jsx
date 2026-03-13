import React, { useState } from 'react';
import Home from './components/Home';
import Registro from './components/Registro';
import Login from './components/Login';

function App() {

  const [vistaActual, setVistaActual] = useState('home');

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 60px',
    backgroundColor: 'white',
    boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0
  };

  const linkStyle = {
    margin: '0 15px',
    cursor: 'pointer',
    color: '#27ae60',
    fontWeight: '600',
    border: 'none',
    background: 'none',
    fontSize: '15px'
  };

  const botonRegistroStyle = {
    ...linkStyle,
    backgroundColor: '#96E6A1',
    padding: '10px 20px',
    borderRadius: '25px',
    color: 'white'
  };

  return (
    <div style={{ backgroundColor: '#F9FBF2', minHeight: '100vh', fontFamily: '"Segoe UI", Roboto, Arial, sans-serif' }}>

      {/* NAVBAR */}
      <nav style={navStyle}>

        <div 
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => setVistaActual('home')}
        >
          <img src="/logo-ecopoint.png" alt="logo" style={{ width: '35px', marginRight: '10px' }} />
          <h1 style={{ color: '#27ae60', margin: 0 }}>EcoPoint</h1>
        </div>

        <div>
          <button style={linkStyle} onClick={() => setVistaActual('home')}>
            Inicio
          </button>

          <button style={linkStyle} onClick={() => setVistaActual('login')}>
            Iniciar Sesión
          </button>

          <button style={botonRegistroStyle} onClick={() => setVistaActual('registro')}>
            Registrarse
          </button>
        </div>

      </nav>

      {/* CONTENIDO */}
      <div style={{ width: '100%'}}>

        {vistaActual === 'home' && <Home />}

        {vistaActual === 'registro' && (
          <Registro
            irHome={() => setVistaActual('home')}
            irLogin={() => setVistaActual('login')}
          />
        )}

        {vistaActual === 'login' && (
          <Login irHome={() => setVistaActual('home')} />
        )}

      </div>

      {/* FOOTER */}
      <footer style={{ textAlign: 'center', padding: '40px', color: '#bdc3c7' }}>
        © 2026 EcoPoint Madrid
      </footer>

    </div>
  );
}

export default App;