const pool = require('../config/db'); // Llamo a la db para hacerle los pedidos

// Requiero a la db, a través de la query de SQL, para que devuelva las categorías y la exporto
exports.getAllCategories = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM category', (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    });
};

// Requiero a la db,a través de la query de SQL, para que devuelva los productos que pertenezcan a X categoría y la exporto
exports.getProductsInCategories = (categoryId) => {
    return new Promise((resolve, reject) => {
        return pool.query('SELECT * FROM category INNER JOIN product ON category.id=product.category WHERE product.category=?', [categoryId], (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    });
};