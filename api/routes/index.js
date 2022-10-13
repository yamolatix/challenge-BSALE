const { Router } = require('express');
const router = Router();

const productsRoutes = require('./products');

router.use('/products', productsRoutes);

module.exports = router;