import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMemo, useEffect } from "react";
import { useMap } from "react-leaflet";

function distancia(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView(center, 13);
    setTimeout(() => map.invalidateSize(), 100);
  }, [center, map]);
  return null;
}

const MapaContenedores = ({ contenedores, miPosicion, tipo }) => {

  // Si los contenedores tienen lat/lng directos (puntos limpios buscados)
  const sonPuntosLimpios = contenedores.length > 0 && contenedores[0]?.codigoPostal;

  const contenedoresFiltrados = useMemo(() => {
    if (sonPuntosLimpios) {
      // Puntos limpios: mostrar todos los encontrados sin filtro de distancia
      return contenedores.filter(c => c.lat && c.lng);
    }
    // Contenedores normales: filtrar por tipo y distancia
    const porTipo = tipo
      ? contenedores.filter(c => c.tipo?.toLowerCase().includes(tipo.toLowerCase()))
      : contenedores;

    if (!miPosicion || porTipo.length === 0) return [];

    return porTipo
      .map(c => ({ ...c, distancia: distancia(miPosicion.lat, miPosicion.lng, c.lat, c.lng) }))
      .filter(c => c.distancia < 2)
      .sort((a, b) => a.distancia - b.distancia);
  }, [contenedores, miPosicion, tipo, sonPuntosLimpios]);

  // Centro del mapa: primer punto limpio encontrado, o posición del usuario
  const centroMapa = useMemo(() => {
    if (sonPuntosLimpios && contenedoresFiltrados.length > 0) {
      return [contenedoresFiltrados[0].lat, contenedoresFiltrados[0].lng];
    }
    return miPosicion ? [miPosicion.lat, miPosicion.lng] : [40.4168, -3.7038];
  }, [contenedoresFiltrados, miPosicion, sonPuntosLimpios]);

  return (
    <MapContainer
      center={centroMapa}
      zoom={13}
      style={{ height: "60vh", width: "100%", borderRadius: "15px" }}
    >
      <RecenterMap center={centroMapa} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {miPosicion && !sonPuntosLimpios && (
        <Marker position={[miPosicion.lat, miPosicion.lng]}>
          <Popup>📍 Estás aquí</Popup>
        </Marker>
      )}

      {contenedoresFiltrados.map((c) => (
        <Marker key={c._id} position={[c.lat, c.lng]}>
          <Popup>
            <strong>{c.nombre || c.tipo}</strong>
            <br />
            {c.direccion}
            <br />
            {c.horario && <span>🕒 {c.horario}</span>}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaContenedores;