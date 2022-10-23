const pool = require('../config/db'); // Llamo a la db para hacerle los pedidos

// Requiero a la db, a través de la query de SQL, para que devuelva los productos y lo exporto
exports.getAllProducts = (callback) => {
    return pool.query('SELECT * FROM product', callback);
}

// Requiero a la db, a través de la query de SQL, para que devuelva los productos que coincidan con el nombre con lo que se le pasa por parametro y lo exporto
exports.getSearchProducts = (name, callback) => {
    return pool.query(`SELECT * FROM product WHERE name LIKE '%${name}%'`, callback)
}
