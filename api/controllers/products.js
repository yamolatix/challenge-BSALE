const { Router } = require('express'); // Requiero Express.js
const products = Router();  // Conecto Express.js para su uso y le asigno el nombre
// const pool = require('../config/db');  // Llamo a la db para hacerle los pedidos
// const { allProducts, searchProducts } = require('../models/product'); // Llamo a los models con los pedidos
const models = require('../models/product'); // Llamo a los models con los pedidos

// GET "/api/products" Controller que trae todos los productos
products.get('/', async (req, res) => {
    try {
        const products = await models.getAllProducts();
        return await res.send(products);
    } catch (error) {
        console.log(error)
    }
});

//  return res.status(500).json({ message: 'Something goes wrong in controller: allProducts' })

// GET "/api/products/search/:name" Controller que trae los productos que decidan buscarse
products.get('/search/:name', async (req, res) => {
    try {
        const search = await models.getSearchProducts(req.params.name);
        // En caso de que el arreglo que devuelva esté vacío es porque no se encontró coincidencias en la búsqueda
        if (search.length <= 0) return res.status(204).json({ message: 'Product not found' })
        return res.send(search);
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong in controller: searchProducts' })
    }
});

// GET "/api/products" Controller que trae todos los productos
/* products.get('/', async (req, res, next) => {
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

// GET "/api/products/search/:name" Controller que trae los productos que decidan buscarse
products.get('/search/:name', async (req, res, next) => {
    try {
        await pool.query(searchProducts(req.params.name), (err, result) => {

            if (err) return next(err);

            const search = result;

            // En caso de que el arreglo que devuelva esté vacío es porque no se encontró coincidencias en la búsqueda
            if (search.length <= 0) return res.status(204).json({ message: 'Product not found' })

            return res.send(search);
        })
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong in controller: searchProducts' })
    }
}); */

module.exports = products; // Exporto los controllers