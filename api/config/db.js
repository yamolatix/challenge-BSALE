const { createPool } = require('mysql'); // Importo la función utilizada para producción de mysql
const DATA_BASE = require('./config') // Llamo al loader

// Conecto la base de datos
const pool = createPool(DATA_BASE);

module.exports = pool; // Exporto la conexión de la db