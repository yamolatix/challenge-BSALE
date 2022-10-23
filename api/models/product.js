const pool = require('../config/db'); // Llamo a la db para hacerle los pedidos

// Requiero a la db, a través de la query de SQL, para que devuelva los productos y lo exporto
exports.getAllProducts = async () => {

    const products = await pool.query('SELECT * FROM product', (err, result) => {
        if (err) throw err;
        return result;
    })
    return products
}

// Requiero a la db, a través de la query de SQL, para que devuelva los productos que coincidan con el nombre con lo que se le pasa por parametro y lo exporto
exports.getSearchProducts = async (name) => {
    const products = pool.query(`SELECT * FROM product WHERE name LIKE '%${name}%'`, (err, result) => {
        if (err) return err;
        return result
    })
    return products
}

//Query que muestra todos los productos y la exporto
// exports.allProducts = 'SELECT * FROM product'

//Query que muestra busca los productos de acuerdo a los que se le pasa por parametro y la exporto
// exports.searchProducts = (name) => `SELECT * FROM product WHERE name LIKE '%${name}%'`