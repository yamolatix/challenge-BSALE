/* const pool = require('../config/db');

//Query que muestra todos los productos
exports.getAllProducts = async () => {
    const products = pool.query('SELECT * FROM product', async (err, result) => {
        if (err) throw err;
        return result;
    })
     return products
}

// Busca productos por nombre
exports.getSearchProducts = async (name) => {
    const products = pool.query(`SELECT * FROM product WHERE name LIKE '%${name}%'`, (err, result) => {
        if (err) return err;
        return result
    })
    return products
} */

//Query que muestra todos los productos
exports.allProducts = 'SELECT * FROM product'

// Busca productos por nombre
exports.searchProducts = (name) => `SELECT * FROM product WHERE name LIKE '%${name}%'`