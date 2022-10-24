const { Router } = require('express'); // Requiero Express.js
const products = Router();  // Conecto Express.js para su uso y le asigno el nombre
const models = require('../models/product'); // Llamo a los models con los pedidos

// GET "/api/products" Controller que trae todos los productos
products.get('/', async (req, res) => {
    try {
        const products = await models.getAllProducts()
        res.send(products);

    } catch (error) {
        return res.status(500).send({ message: 'Something goes wrong in controller: allProducts' })
    }
});

// GET "/api/products/search/:name" Controller que trae los productos que decidan buscarse
products.get('/search/:name', async (req, res) => {
    try {
        const products = await models.getSearchProducts(req.params.name)

        // En caso de que el arreglo que devuelva esté vacío es porque no se encontró coincidencias en la búsqueda
        if (products.length <= 0) return res.status(204).json({ message: 'Product not found' })

        res.send(products);

    } catch (error) {
        return res.status(500).send({ message: 'Something goes wrong in controller: searchProducts' })
    }
});

module.exports = products; // Exporto los controllers