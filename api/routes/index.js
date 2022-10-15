const { Router } = require('express');
const router = Router();

const productsRoutes = require('./products');
const categoryRoutes = require('./category');

router.use('/products', productsRoutes);
router.use('/category', categoryRoutes);

// Middelware de error
router.use((req, res, next) => {
    res.status(404).json({
        message: 'Page not found'
    })
});

module.exports = router;