const pool = require('../config/db');

//Ruta que muestra todos los productos
exports.allProducts = async (req, res) => {
    const baseQuery = 'SELECT * FROM product'

    await pool.query(baseQuery, (err, result) => {

        if (err) return next(err);

        const products = result;
        res.send(products);
    })
};

exports.individualProduct = async (req, res) => {
    const baseQuery = 'SELECT * FROM product WHERE id = ?'

    await pool.query(baseQuery, [req.params.id], (err, result) => {

        if (err) return next(err);

        const product = result;

        if (result.length <= 0) return res.status(404).json({ message: 'Product not found' })

        res.send(product);
    })
}; 