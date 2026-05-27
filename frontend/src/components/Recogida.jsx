import React, { useState } from 'react';
import axios from 'axios';

const Recogida = () => {
  const [cp, setCp] = useState("");
  const [puntos, setPuntos] = useState([]);
  const [recogidas, setRecogidas] = useState([]);
  const [cargando, setCargando] = useState(false);

  const buscar = async () => {
    if (!cp.trim()) return;
    setCargando(true);
    try {
      const [resRecogidas, resPuntos] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/recogidas?cp=${cp}`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/puntos-limpios?cp=${cp}`)
      ]);
      setRecogidas(resRecogidas.data);
      setPuntos(resPuntos.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <h3 style={mainTitleStyle}>Recogidas especiales</h3>


      <div style={searchContainerStyle}>
        <input 
          style={minimalInputStyle}
          placeholder='Código postal (ej: 28032)'
          value={cp}
          onChange={(e) => setCp(e.target.value)}
        />
        <button onClick={buscar} style={primaryButtonStyle}>
          {cargando ? 'Cargando...' : 'Buscar'}
        </button>
      </div>

     
      {puntos.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h4 style={sectionTitleStyle}>Puntos Limpios Fijos</h4>
          {puntos.map(p => (
            <div key={p._id} style={cleanCardStyle}>
              <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '15px', marginBottom: '15px' }}>
                <span style={tagStyle}>MADRID • DISTRITO</span>
                <h4 style={cardTitleStyle}>{p.nombre}</h4>
                <p style={addressStyle}>{p.direccion}</p>
              </div>
              
              <div style={gridInfoStyle}>
                <div style={infoBlockStyle}>
                  <span style={labelStyle}>HORARIO</span>
                  <span style={valueStyle}>{p.horario}</span>
                </div>
                <div style={infoBlockStyle}>
                  <span style={labelStyle}>RESIDUOS ADMITIDOS</span>
                  <span style={valueStyle}>Aceite, Pilas, Ropa, Enseres, Radiografías</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    
      {recogidas.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h4 style={sectionTitleStyle}>Muebles y Enseres</h4>
          {recogidas.map(r => (
            <div key={r._id} style={furnitureCardStyle}>
              {/* Lateral de fecha limpio */}
              <div style={dateSideStyle}>
                <span style={{ fontSize: '11px', letterSpacing: '1px', opacity: 0.8 }}>RECOGIDA</span>
                <span style={dateDayStyle}>{r.diasRecogida?.[0]?.split(' ')[0] || 'Día'}</span>
                <span style={dateMonthStyle}>{r.diasRecogida?.[0]?.split(' ').slice(1).join(' ') || 'Asignado'}</span>
                <div style={smallZoneStyle}>ZONA {r.zona}</div>
              </div>

              <div style={{ padding: '25px', flex: 1 }}>
                <h4 style={{ margin: '0 0 15px 0', color: '#2d3436', fontSize: '18px' }}>{r.distrito}</h4>
                
                <div style={instructionBoxStyle}>
                  <span style={{ fontWeight: '700', fontSize: '12px', display: 'block', marginBottom: '4px', color: '#636e72' }}>
                    INSTRUCCIONES DE DEPÓSITO
                  </span>
                  {r.instrucciones || "Depositar en la acera sin interrumpir el paso peatonal."}
                </div>

                <div style={{ marginTop: '15px', display: 'flex', gap: '20px' }}>
                  <div style={{ fontSize: '13px' }}>
                    <b style={{ color: '#636e72' }}>HORA:</b> {r.horario || '20:00 a 22:00'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const mainTitleStyle = { fontSize: '24px', fontWeight: '800', color: '#1A2E35', marginBottom: '25px' };

const searchContainerStyle = { display: 'flex', gap: '12px', background: '#fff', padding: '8px', borderRadius: '18px', border: '1px solid #e0e0e0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
const minimalInputStyle = { flex: 1, border: 'none', padding: '12px 15px', outline: 'none', fontSize: '16px', color: '#2d3436' };
const primaryButtonStyle = { background: '#2ecc71', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s' };

const sectionTitleStyle = { fontSize: '16px', fontWeight: '700', color: '#b2bec3', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' };

const cleanCardStyle = { background: '#fff', borderRadius: '20px', padding: '25px', marginBottom: '20px', border: '1px solid #f0f0f0', boxShadow: '0 10px 20px rgba(0,0,0,0.02)' };
const tagStyle = { fontSize: '10px', fontWeight: '800', color: '#2ecc71', letterSpacing: '0.5px' };
const cardTitleStyle = { margin: '8px 0', fontSize: '19px', color: '#2d3436', fontWeight: '700' };
const addressStyle = { color: '#636e72', fontSize: '14px', margin: 0 };

const gridInfoStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' };
const infoBlockStyle = { display: 'flex', flexDirection: 'column' };
const labelStyle = { fontSize: '10px', fontWeight: '700', color: '#b2bec3', marginBottom: '4px' };
const valueStyle = { fontSize: '13px', color: '#2d3436', lineHeight: '1.4' };

const furnitureCardStyle = { display: 'flex', background: '#fff', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px', border: '1px solid #f0f0f0', boxShadow: '0 10px 25px rgba(0,0,0,0.04)' };
const dateSideStyle = { width: '130px', background: '#f8f9fa', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid #f0f0f0', padding: '20px' };
const dateDayStyle = { fontSize: '24px', fontWeight: '900', color: '#2d3436', marginTop: '5px' };
const dateMonthStyle = { fontSize: '12px', fontWeight: '700', color: '#636e72', textAlign: 'center', textTransform: 'uppercase' };
const smallZoneStyle = { marginTop: '10px', fontSize: '10px', background: '#dfe6e9', padding: '4px 8px', borderRadius: '6px', fontWeight: '700' };

const instructionBoxStyle = { background: '#f1f2f6', padding: '15px', borderRadius: '12px', fontSize: '13px', color: '#2d3436', lineHeight: '1.5' };

export default Recogida;