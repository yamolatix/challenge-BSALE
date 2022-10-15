// Express para las rutas
const express = require('express');

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
app.use(
    cors({
        header: 'Access-Control-Allow-Origin: *',
        methods: 'PUT, GET, POST, DELETE, OPTIONS',
        credentials: true,
    })
);

// Routes
app.use('/api', routes);

// El Middleware para manejo de errores posee un parámetro extra, en este caso lo llamo err
// Este último Middleware detecta los errores y los coloca en dicho parámetro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Some custom error!', err.message);
});

// Conecto servidor
const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
