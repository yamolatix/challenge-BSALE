const { Router } = require('express');
const products = Router();

const productsController = require('../controllers/products')

products.get('/', productsController.allProducts)
products.get('/:id', productsController.individualProduct)
products.get('/search/:name', productsController.searchProducts)

module.exports = products;