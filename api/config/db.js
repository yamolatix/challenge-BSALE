//Importo la función utilizada para producción de mysql
const { createPool } = require('mysql');

// Creo el objeto de conexion y lo guardo en una constante
const pool = createPool({
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user: 'bsale_test',
    password: 'bsale_test',
    database: 'bsale_test',
});

function handleConnection() {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.error("mysql getConnection err", err);
            return;
        }
        connection.ping();
        connection.release();
    });
}
setInterval(handleConnection, 5000);

module.exports = pool;