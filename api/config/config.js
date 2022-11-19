require('dotenv').config(); //Requiero el .env para su funcionamiento

// Loader con la información para la conexion de la DB
const config = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
    }
}

module.exports = config // Exporto el loader