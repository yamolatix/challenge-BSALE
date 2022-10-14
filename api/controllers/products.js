const pool = require('../config/db');

//Ruta que muestra todos los productos
exports.allProducts = async (req, res, next) => {
    try {
        const baseQuery = 'SELECT * FROM product'

        await pool.query(baseQuery, (err, result) => {

            if (err) return next(err);

            const products = result;

            return res.send(products);
        })
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
};

//Ruta que muestra un producto en particular
exports.individualProduct = async (req, res, next) => {
    try {
        const baseQuery = 'SELECT * FROM product WHERE id = ?'

        await pool.query(baseQuery, [req.params.id], (err, result) => {

            if (err) return next(err);

            const product = result;

            if (result.length <= 0) return res.status(404).json({ message: 'Product not found' })

            return res.send(product);
        })
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
};

// Busca productos por nombre
exports.searchProducts = async (req, res, next) => {
    try {
        const baseQuery = `SELECT * FROM product WHERE name LIKE '%${req.params.name}%'`

        await pool.query(baseQuery, (err, result) => {

            if (err) return next(err);

            const search = result;

            if (search.length <= 0) return res.status(404).json({ message: 'Product not found' })

            return res.send(search);
        })
    } catch (error) {
        return res.status(500).json({ message: 'Something goes wrong' })
    }
}