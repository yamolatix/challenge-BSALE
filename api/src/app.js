const express = require('express'); // Requiero Express para iniciar las rutas 

// Middelwares
const volleyball = require('volleyball') // Depura solicitudes y respuestas asincrónicas
const cors = require('cors'); // Mecanismo de seguridad, ya que el recurso está alojado en otro origen

const routes = require('./routes'); // Importo controllers

const app = express(); // Inicializo Express

// Ejecuto Middelwares
app.use(express.json());
app.use(volleyball)
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    header: 'Origin, X-Requested-With, Content-Type, Accept'
}))

app.use('/api', routes); // Inicializo rutas

// El Middleware para manejo de errores posee un parámetro extra, en este caso lo llamo err
// Este último Middleware detecta los errores y los coloca en dicho parámetro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Some custom error!', err.message);
    next(err);
});

module.exports = app;