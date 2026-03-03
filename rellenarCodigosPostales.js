import fs from "fs";
import axios from "axios";

const data = JSON.parse(fs.readFileSync("contenedores_ropa.json", "utf-8"));

async function obtenerCP(direccion) {
  const url = "https://nominatim.openstreetmap.org/search";

  const response = await axios.get(url, {
    params: {
      q: `${direccion}, Madrid, España`,
      format: "json",
      addressdetails: 1,
      limit: 1
    },
    headers: {
      "User-Agent": "EcoPointApp/1.0"
    }
  });

  if (response.data.length === 0) return "";

  const address = response.data[0].address;
  return address.postcode || "";
}

async function procesar() {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    if (!item.codigoPostal || item.codigoPostal === "") {
      try {
        const cp = await obtenerCP(item.direccion);
        item.codigoPostal = cp;
        console.log(`✔ ${item.direccion} → ${cp}`);
      } catch (err) {
        console.log(`✖ Error con: ${item.direccion}`);
      }

      // IMPORTANTE: pausa para no saturar la API
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  fs.writeFileSync("contenedores_ropa_con_cp.json", JSON.stringify(data, null, 2));
  console.log("Archivo final generado: contenedores_ropa_con_cp.json");
}

procesar();