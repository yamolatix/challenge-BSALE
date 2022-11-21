const { Router } = require('express'); // Requiero Express.js
const products = Router();  // Conecto Express.js para su uso y le asigno el nombre
const c = require("../controllers/products")

// GET "/api/products" Ruta que trae todos los productos
products.get('/', c.getAllProductsController);

// GET "/api/products/search/:name" Ruta que trae los productos que decidan buscarse
products.get('/search/:name', c.getSearchProductsController);

module.exports = products; // Exporto las rutas