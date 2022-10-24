// Loader con la información para la conexion de la DB
const config = {
    db: {
        host: "mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com",
        user: "bsale_test",
        password: "bsale_test",
        database: "bsale_test",
        multipleStatements: true
    }
}

module.exports = config // Exporto el loader