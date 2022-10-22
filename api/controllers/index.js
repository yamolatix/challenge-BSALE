const { Router } = require('express');
const router = Router();

const productsController = require('./products');
const categoryController = require('./category');

router.use('/products', productsController);
router.use('/category', categoryController);

// Middelware de error
router.use((req, res, next) => {
    res.status(404).json({
        message: 'Page not found'
    })
});

module.exports = router;