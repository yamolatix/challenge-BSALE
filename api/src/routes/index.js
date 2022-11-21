const { Router } = require('express'); // Requiero Express.js
const router = Router(); // Conecto Express.js para su uso y le asigno el nombre. En este caso será "router" 

// Llamo a los controllers (rutas)
const productsRoutes = require('./products');
const categoryRoutes = require('./category');

// Conecto y ruteo 
router.use('/products', productsRoutes);
router.use('/category', categoryRoutes);

// Middelware de error
router.use((req, res) => {
    res.status(404).json('Page not found')
});

module.exports = router; // Exporto el nodo padre de las rutas