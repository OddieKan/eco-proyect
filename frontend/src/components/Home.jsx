import React from 'react';
import Buscador from './Buscador';
import ListaPuntos from './ListaPuntos';

function Home() {

  return (
    <div style={{ width: '100%' }}>

      {/* HERO */}
      <header style={{
        textAlign: 'center',
        padding: '100px 20px',
        backgroundColor: 'white',
        borderRadius: '0 0 40px 40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
        marginBottom: '60px'
      }}>

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <h2 style={{
            fontSize: '3rem',
            color: '#2D3436',
            fontWeight: '800'
          }}>
            EcoPoint Madrid
          </h2>

          <p style={{
            fontSize: '1.2rem',
            color: '#636e72',
            maxWidth: '600px',
            margin: '20px auto'
          }}>
            Pequeños gestos, grandes cambios.
            Encuentra el contenedor de <strong>aceite, ropa o pilas</strong> más cercano a ti.
          </p>

          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Buscador />
          </div>

        </div>

      </header>


      {/* CONTENEDOR PRINCIPAL */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px 60px 20px'
      }}>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '30px'
        }}>
          <h3>Puntos de Reciclaje</h3>

          <span style={{
            color: '#27ae60',
            fontWeight: 'bold',
            backgroundColor: '#eef9f1',
            padding: '5px 15px',
            borderRadius: '15px'
          }}>
            📍 Madrid
          </span>
        </div>

        <ListaPuntos />

      </section>

    </div>
  );
}

export default Home;