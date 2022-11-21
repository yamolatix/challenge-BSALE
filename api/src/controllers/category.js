const models = require('../models/category'); // Llamo a los models con los pedidos

exports.getAllCategoriesController = async (req, res) => {
    try {
        const categories = await models.getAllCategories()
        res.send(categories)
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong in controller: getAllCategories' })
    }
};

exports.getProductsInCategoriesController = async (req, res) => {
    try {
        const productsInCategories = await models.getProductsInCategories(req.params.categoryId)
        res.send(productsInCategories)
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong in controller: productsInCategories' })
    }
}