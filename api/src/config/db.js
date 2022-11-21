const { createPool } = require('mysql'); // Importo la función utilizada para producción de mysql
const config = require('./config') // Llamo al loader

// Conecto la base de datos
const pool = createPool(config.db);

module.exports = pool; // Exporto la conexión de la db