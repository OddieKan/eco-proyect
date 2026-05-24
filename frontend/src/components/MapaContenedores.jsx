import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMemo } from "react";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

function distancia(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function ArreglarMapa() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);

  return null;
}




const MapaContenedores = ({ contenedores, miPosicion, tipo }) => {

  const contenedoresFiltrados = tipo
  ? contenedores.filter(c =>
      c.tipo?.toLowerCase().includes(tipo.toLowerCase())
    )
  : contenedores;

  const contenedoresCercanos = useMemo(() => {
      if (!miPosicion || contenedoresFiltrados.length === 0) return [];

      return contenedoresFiltrados
        .map(c => ({
          ...c,
          distancia: distancia(
            miPosicion.lat,
            miPosicion.lng,
            c.lat,
            c.lng
          )
        }))
      .filter(c => c.distancia < 2)
      .sort((a, b) => a.distancia - b.distancia);
  }, [contenedoresFiltrados, miPosicion]);

  return (
    <MapContainer
      center={
        miPosicion
          ? [miPosicion.lat, miPosicion.lng]
          : [40.4168, -3.7038]
      }
      zoom={13}
      style={{ height: "60vh", width: "100%", borderRadius: "15px" }}
    >
      <ArreglarMapa />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 📍 TU UBICACIÓN */}
      {miPosicion && (
        <Marker position={[miPosicion.lat, miPosicion.lng]}>
          <Popup>📍 Estás aquí</Popup>
        </Marker>
      )}

      {/* 🟢 CONTENEDORES */}
      {contenedoresCercanos.map((c) => (
        <Marker key={c._id} position={[c.lat, c.lng]}>
          <Popup>
            <strong>{c.tipo}</strong>
            <br />
            {c.direccion}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapaContenedores;