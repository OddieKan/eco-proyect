import React from 'react';
import Buscador from './components/Buscador';
import ListaPuntos from './components/ListaPuntos';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#27ae60' }}>EcoPoint</h1>
      
      <section>
        <h2>¿Dónde lo tiro?</h2>
        <Buscador />
      </section>

      <hr />

      <section>
        <h2>Localizador de Aceite y Pilas</h2>
        <ListaPuntos />
      </section>
    </div>
  );
}

export default App;