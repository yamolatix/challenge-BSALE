// Express para las rutas
const express = require('express');

//Requiero el .env
require("dotenv").config();

// Middelwares
const cookieParser = require('cookie-parser');
const cors = require('cors');
const volleyball = require('volleyball')

// Importo rutas
const routes = require('./routes');

const app = express();

// Ejecuto Middelwares
app.use(express.json());
app.use(cookieParser());
app.use(volleyball)
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    header: 'Origin, X-Requested-With, Content-Type, Accept'
}))

// Routes
app.use('/api', routes);

// El Middleware para manejo de errores posee un parámetro extra, en este caso lo llamo err
// Este último Middleware detecta los errores y los coloca en dicho parámetro

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.json({
        message: err.message,
        error: err
    });
});
// Conecto servidor
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
