const fs = require('fs');

// Lee tu archivo original
const data = JSON.parse(fs.readFileSync('data/recogidasClean.json', 'utf8'));

// Elimina _id de cada item
const cleaned = data.map(({ _id, ...rest }) => rest);

// Guarda el nuevo archivo limpio
fs.writeFileSync('recogidas_clean.json', JSON.stringify(cleaned, null, 2));

console.log('✔ _id eliminados correctamente');
