import React, { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import Buscador from './Buscador';
import MapaContenedores from "./MapaContenedores";
import Recogida from './Recogida';

function Home() {
  const [tabActiva, setTabActiva] = useState("Reciclaje");
  const [contenedores, setContenedores] = useState([]);
  const [miPosicion, setMiPosicion] = useState(null);
  const [residuo, setResiduo] = useState(null);

  // --- LÓGICA DE CÁLCULO DE DISTANCIAS ---
  const contenedoresCercanos = useMemo(() => {
    if (!miPosicion || contenedores.length === 0) return [];

    const calcularDistancia = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radio de la Tierra en km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) ** 2 +
                Math.cos(lat1 * Math.PI / 180) *
                Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) ** 2;
      return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    return contenedores
      .map(c => ({
        ...c,
        distancia: calcularDistancia(miPosicion.lat, miPosicion.lng, c.lat, c.lng)
      }))
      .filter(c => c.distancia < 2) // Filtrar los que están a menos de 2km
      .sort((a, b) => a.distancia - b.distancia);
  }, [contenedores, miPosicion]);

  // --- EFECTO: CARGAR CONTENEDORES (CON FILTRO DE RESIDUO) ---
  useEffect(() => {
    if (tabActiva !== "Punto limpio") return;

    const cargar = async () => {
      try {
        // Si el usuario eligió un residuo en la pestaña anterior, filtramos en la API
        const parametroTipo = residuo ? `?tipo=${residuo}` : "";
        const res = await axios.get(`https://ecopoint-production-8ab9.up.railway.app/contenedores/buscar${parametroTipo}`);
        setContenedores(res.data);
      } catch (err) {
        console.error("Error cargando contenedores:", err);
      }
    };
    cargar();
  }, [tabActiva, residuo]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMiPosicion({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        (error) => console.warn("Error obteniendo ubicación:", error)
      );
    }
  }, []);

  // --- MANEJADOR DE SELECCIÓN INTELIGENTE ---
  const seleccionarResiduo = (tipo) => {
    setResiduo(tipo);
    if (tipo === "Muebles") {
      setTabActiva("Recogida");
    } else {
      setTabActiva("Punto limpio");
    }
  };

  const tabs = ["Punto limpio", "Reciclaje", "Recogida"];

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        
        {/* HEADER */}
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={logoStyle}>EcoPoint</h1>
          <p style={{ color: '#636e72', margin: 0 }}>Gestión inteligente de residuos</p>
        </header>

        {/* NAVEGACIÓN POR TABS */}
        <nav style={tabsContainerStyle}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setTabActiva(tab)}
              style={{
                ...tabButtonStyle,
                backgroundColor: tabActiva === tab ? '#2ecc71' : 'transparent',
                color: tabActiva === tab ? 'white' : '#636e72',
                boxShadow: tabActiva === tab ? '0 4px 10px rgba(46, 204, 113, 0.3)' : 'none',
              }}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* BUSCADOR GENERAL */}
        <div style={{ marginBottom: '30px' }}>
          <Buscador tab={tabActiva} />
        </div>

        {/* CONTENIDO DINÁMICO */}
        <main style={{ minHeight: '400px' }}>
          
          {tabActiva === "Reciclaje" && (
            <div style={{ animation: 'fadeIn 0.5s ease' }}>
              <h3 style={sectionTitleStyle}>¿Qué quieres reciclar hoy?</h3>
              <div style={gridResiduosStyle}>
                {[
                  { id: "Aceite", icon: "🧴" },
                  { id: "Ropa", icon: "👕" },
                  { id: "Pilas", icon: "🔋" },
                  { id: "Vidrio", icon: "🍾" },
                  { id: "Muebles", icon: "🪑" }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => seleccionarResiduo(item.id)}
                    style={botonResiduoEstilo}
                  >
                    <span style={{ fontSize: '32px', marginBottom: '10px' }}>{item.icon}</span>
                    <span style={{ fontWeight: '700' }}>{item.id}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {tabActiva === "Punto limpio" && (
  <div style={{ animation: 'fadeIn 0.5s ease' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
      <h3 style={sectionTitleStyle}>Puntos cercanos</h3>
      {residuo && <span style={filtroBadgeStyle}>Filtro: {residuo}</span>}
    </div>

    <MapaContenedores 
      contenedores={contenedores} 
      miPosicion={miPosicion} 
      tipo={residuo}
    />

    <div style={{ marginTop: '30px' }}>
      <h4 style={{ fontSize: '16px', color: '#1A2E35', marginBottom: '15px' }}>Lista de puntos:</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {contenedoresCercanos.length > 0 ? (
          contenedoresCercanos.slice(0, 5).map((c, index) => (
            <div key={index} style={infoCardStyle}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={distanciaBadgeStyle}>{(c.distancia).toFixed(2)} km</span>
                  <span style={{ fontSize: '12px', color: '#2ecc71', fontWeight: 'bold' }}>🕒 {c.horario || 'Consultar'}</span>
                </div>
                <p style={{ margin: '8px 0 4px 0', fontWeight: 'bold', fontSize: '14px', color: '#2d3436' }}>
                  {c.direccion}
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: '#636e72', textTransform: 'uppercase' }}>
                  Contenedor de {c.tipo}
                </p>
              </div>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}`}
                target="_blank"
                rel="noreferrer"
                style={rutaButtonStyle}
              >
                📍 Cómo llegar
              </a>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#636e72', fontSize: '14px' }}>
            No hay contenedores de {residuo} a menos de 2km.
          </p>
        )}
      </div>
    </div>
  </div>
)}

          {tabActiva === "Recogida" && (
            <div style={{ animation: 'fadeIn 0.5s ease' }}>
              <Recogida />
            </div>
          )}
          
        </main>
      </div>
    </div>
  );
}


const containerStyle = { 
  minHeight: '100vh', 
  backgroundColor: '#f8f9fa', 
  display: 'flex', 
  justifyContent: 'center', 
  padding: '40px 20px',
  fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
};

const cardStyle = { 
  width: '100%', 
  maxWidth: '1000px', 
  backgroundColor: 'white', 
  borderRadius: '30px', 
  padding: '40px', 
  boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
  border: '1px solid #f0f0f0'
};

const logoStyle = { 
  fontSize: '32px', 
  fontWeight: '900', 
  color: '#1A2E35', 
  margin: 0,
  letterSpacing: '-1px'
};

const tabsContainerStyle = { 
  display: 'flex', 
  backgroundColor: '#f1f2f6', 
  borderRadius: '20px', 
  padding: '6px', 
  marginBottom: '30px' 
};

const tabButtonStyle = { 
  flex: 1, 
  padding: '14px', 
  borderRadius: '16px', 
  border: 'none', 
  fontWeight: '700', 
  cursor: 'pointer', 
  transition: 'all 0.3s ease',
  fontSize: '15px'
};

const sectionTitleStyle = { 
  fontSize: '20px', 
  fontWeight: '800', 
  color: '#2d3436', 
  margin: '0 0 20px 0' 
};

const gridResiduosStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "20px"
};

const botonResiduoEstilo = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px 20px',
  border: '1px solid #f1f2f6',
  borderRadius: '24px',
  backgroundColor: '#fff',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  color: '#2d3436'
};

const filtroBadgeStyle = {
  backgroundColor: '#e8f9ef',
  color: '#2ecc71',
  padding: '6px 14px',
  borderRadius: '10px',
  fontSize: '13px',
  fontWeight: '800'
};

const infoTextoStyle = { 
  fontSize: '15px', 
  color: '#636e72', 
  lineHeight: '1.6',
  marginBottom: '20px'
};

const infoCardStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
  borderRadius: '18px',
  backgroundColor: '#fff',
  border: '1px solid #f0f0f0',
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
};

const distanciaBadgeStyle = {
  backgroundColor: '#1A2E35',
  color: 'white',
  padding: '4px 10px',
  borderRadius: '8px',
  fontSize: '11px',
  fontWeight: 'bold'
};

const rutaButtonStyle = {
  textDecoration: 'none',
  backgroundColor: '#2ecc71',
  color: 'white',
  padding: '10px 18px',
  borderRadius: '12px',
  fontSize: '13px',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  marginLeft: '15px'
};

export default Home;