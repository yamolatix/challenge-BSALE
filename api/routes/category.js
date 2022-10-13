const { Router } = require('express');
const category = Router();

const categoryController = require('../controllers/category')

category.get('/', categoryController.allCategories)
category.get('/:categoryId', categoryController.productsInCategories)

module.exports = category;