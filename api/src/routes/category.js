const { Router } = require('express'); // Requiero Express.js
const category = Router(); // Conecto Express.js para su uso y le asigno el nombre
const c = require("../controllers/category")

// GET "/api/category" Ruta que trae todas las categorias
category.get('/', c.getAllCategoriesController);

// GET "/api/category/:categoryId" Ruta que trae los productos que pertenecen a X categoria
category.get('/:categoryId', c.getProductsInCategoriesController);

module.exports = category; // Exporto las rutas