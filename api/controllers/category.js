const pool = require('../config/db');

//Ruta que muestra una categoría
exports.allCategories = async (req, res, next) => {
    try {
        const baseQuery = 'SELECT * FROM category'
        await pool.query(baseQuery, (err, result) => {

            if (err) return next(err);

            const categories = result;
            return res.send(categories);
        })
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
};

//Ruta que muestra los productos correspondientes a una categoría
exports.productsInCategories = async (req, res, next) => {
    try {
        const baseQuery = 'SELECT * FROM product INNER JOIN category ON category.id=product.category WHERE product.category=?'
        await pool.query(baseQuery, [req.params.categoryId], (err, result) => {

            if (err) return next(err);

            const categories = result;
            return res.send(categories);
        })
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
};



