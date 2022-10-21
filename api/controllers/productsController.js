const { Router } = require('express');
const products = Router();
const pool = require('../config/db');
const { allProducts, searchProducts } = require('../models/Product');

products.get('/', async (req, res, next) => {
    try {
        await pool.query(allProducts, (err, result) => {

            if (err) return next(err);

            const products = result;

            return res.send(products);
        })
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong in controller: allProducts' })
    }
});

products.get('/search/:name', async (req, res, next) => {
    try {
        await pool.query(searchProducts(req.params.name), (err, result) => {

            if (err) return next(err);

            const search = result;

            if (search.length <= 0) return res.status(404).json({ message: 'Product not found' })

            return res.send(search);
        })
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong in controller: searchProducts' })
    }
});

module.exports = products;