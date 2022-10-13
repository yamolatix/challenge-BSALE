const { Router } = require('express');
const router = Router();

const productsRoutes = require('./products');
const categoryRoutes = require('./category');

router.use('/products', productsRoutes);
router.use('/category', categoryRoutes);

module.exports = router;