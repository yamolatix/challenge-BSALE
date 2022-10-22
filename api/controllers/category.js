const { Router } = require('express'); // Requiero Express.js
const category = Router(); // Conecto Express.js para su uso y le asigno el nombre
const pool = require('../config/db'); // Llamo a la db para hacerle los pedidos
const { allCategories, productsInCategories } = require('../models/category'); // Llamo a los models con los pedidos
// const models = require('../models/category'); // Llamo a los models con los pedidos

// GET "/api/category" Controller que trae todas las categorias
/* category.get('/', async (req, res) => {
    try {
        const categories = await models.getAllCategories();
        return res.send(categories);
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong in controller: getAllCategories' })
    }
});

// GET "/api/category/:categoryId" Controller que trae los productos que pertenecen a X categoria
category.get('/:categoryId', async (req, res) => {
    try {
        const categories = await models.getProductsInCategories();
        return res.send(categories);
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong in controller: productsInCategories' })
    }
}); */

// GET "/api/category" Controller que trae todas las categorias
category.get('/', async (req, res, next) => {
    try {
        await pool.query(allCategories, (err, result) => {

            if (err) return next(err);

            const categories = result;
            return res.send(categories);
        })
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong in controller: allCategories' })
    }
});

// GET "/api/category/:categoryId" Controller que trae los productos que pertenecen a X categoria
category.get('/:categoryId', async (req, res, next) => {
    try {
        await pool.query(productsInCategories, [req.params.categoryId], (err, result) => {

            if (err) return next(err);

            const categories = result;
            return res.send(categories);
        })
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong in controller: productsInCategories' })
    }
});

module.exports = category; // Exporto los controllers