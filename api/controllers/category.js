const { Router } = require('express');
const category = Router();
const pool = require('../config/db');
const { allCategories, productsInCategories } = require('../models/category');
// const models = require('../models/category');

/* category.get('/', async (req, res) => {
    try {
        const categories = await models.getAllCategories();
        return res.send(categories);
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong in controller: getAllCategories' })
    }
});

category.get('/:categoryId', async (req, res) => {
    try {
        const categories = await models.getProductsInCategories();
        return res.send(categories);
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong in controller: productsInCategories' })
    }
}); */

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

module.exports = category;