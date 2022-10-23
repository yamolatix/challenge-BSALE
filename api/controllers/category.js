const { Router } = require('express'); // Requiero Express.js
const category = Router(); // Conecto Express.js para su uso y le asigno el nombre
const models = require('../models/category'); // Llamo a los models con los pedidos

// GET "/api/category" Controller que trae todas las categorias
category.get('/', async (req, res) => {
    try {
        await models.getAllCategories((err, result) => {
            if (err) return err;
            res.send(result);
        });
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong in controller: getAllCategories' })
    }
});

// GET "/api/category/:categoryId" Controller que trae los productos que pertenecen a X categoria
category.get('/:categoryId', async (req, res) => {
    try {
        await models.getProductsInCategories(req.params.categoryId, (err, result) => {
            if (err) return err;
            res.send(result);
        });
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong in controller: productsInCategories' })
    }
});

module.exports = category; // Exporto los controllers