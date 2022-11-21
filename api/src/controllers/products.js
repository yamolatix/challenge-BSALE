const models = require('../models/product'); // Llamo a los models con los pedidos

exports.getAllProductsController = async (req, res) => {
    try {
        const products = await models.getAllProducts()
        res.send(products);

    } catch (error) {
        return res.status(500).send({ message: 'Something goes wrong in controller: allProducts' })
    }
}

exports.getSearchProductsController = async (req, res) => {
    try {
        const products = await models.getSearchProducts(req.params.name)

        // En caso de que el arreglo que devuelva esté vacío es porque no se encontró coincidencias en la búsqueda
        if (products.length <= 0) return res.status(204).json({ message: 'Product not found' })

        res.send(products);

    } catch (error) {
        return res.status(500).send({ message: 'Something goes wrong in controller: searchProducts' })
    }
};