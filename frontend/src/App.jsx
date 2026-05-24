import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Registro from './components/Registro';
import Login from './components/Login';
import Bienvenida from './components/Bienvenida';

function App() {
  const [vistaActual, setVistaActual] = useState('home');
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);

  // Detectar sesión al cargar
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUsuarioLogueado(true);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    setUsuarioLogueado(false);
    setVistaActual('home');
  };


  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 80px',
    backgroundColor: '#F2F6E9',
    position: 'sticky',
    top: 0,
    zIndex: 100
  };

  const linkStyle = {
    margin: '0 15px',
    cursor: 'pointer',
    color: '#000000',
    fontWeight: '500',
    border: 'none',
    background: 'none',
    fontSize: '16px'
  };

  const botonRegistroStyle = {
    ...linkStyle,
    backgroundColor: '#000000',
    padding: '10px 25px',
    borderRadius: '12px',
    color: 'white'
  };

  return (
    <div style={{
      backgroundColor: '#F2F6E9',
      minHeight: '100vh',
      fontFamily: '"Inter", "Segoe UI", sans-serif'
    }}>

      {/* NAVBAR */}
      <nav style={navStyle}>
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => setVistaActual('home')}
        >
          <img src="/logo-ecopoint.png" alt="logo" style={{ width: '40px', marginRight: '10px' }} />
          <h1 style={{ color: '#000', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>EcoPoint</h1>
        </div>

        <div>
          <button style={linkStyle} onClick={() => setVistaActual('home')}>Inicio</button>

          {!usuarioLogueado ? (
            <>
              <button style={linkStyle} onClick={() => setVistaActual('login')}>Login</button>
              <button style={botonRegistroStyle} onClick={() => setVistaActual('registro')}>Registro</button>
            </>
          ) : (
            <button style={botonRegistroStyle} onClick={cerrarSesion}>Cerrar sesión</button>
          )}
        </div>
      </nav>

      {/* CONTENIDO PROTEGIDO */}
      <div style={{ width: '100%' }}>

        {/* LÓGICA DE VISTAS */}
        {vistaActual === 'home' && (
          usuarioLogueado
            ? <Home />
            : <Login
              irHome={() => setVistaActual('home')}
              irRegistro={() => setVistaActual('registro')}
              setUsuarioLogueado={setUsuarioLogueado}
            />
        )}

        {vistaActual === 'registro' && !usuarioLogueado && (
          <Registro
            irHome={() => { setVistaActual('home'); }}
            irLogin={() => setVistaActual('login')}
            irBienvenida={() => setVistaActual('bienvenida')}
          />
        )}

        {vistaActual === 'bienvenida' && (
          <Bienvenida irHome={() => {
            setUsuarioLogueado(true);
            setVistaActual('home');
          }} />
        )}

        {vistaActual === 'login' && !usuarioLogueado && (
          <Login
            irHome={() => setVistaActual('home')}
            irRegistro={() => setVistaActual('registro')}
            setUsuarioLogueado={setUsuarioLogueado}
          />
        )}
      </div>

      <footer style={{ textAlign: 'center', padding: '60px', color: '#888', fontSize: '14px' }}>
        © 2026 EcoPoint Madrid • Tu guía de reciclaje
      </footer>

    </div>
  );
}

export default App;
