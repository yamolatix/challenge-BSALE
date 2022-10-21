//Importo la función utilizada para producción de mysql
const { createPool } = require('mysql');
const DATA_BASE = require('./config')

const pool = createPool(DATA_BASE);

module.exports = pool;