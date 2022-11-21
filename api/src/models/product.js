const pool = require('../config/db'); // Llamo a la db para hacerle los pedidos

// Requiero a la db, a través de la query de SQL, para que devuelva los productos y lo exporto
exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM product', (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    });
};

// Requiero a la db, a través de la query de SQL, para que devuelva los productos que coincidan con el nombre con lo que se le pasa por parametro y lo exporto
exports.getSearchProducts = (name) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM product WHERE name LIKE '%${name}%'`, (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    });
};