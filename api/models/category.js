const pool = require('../config/db'); // Llamo a la db para hacerle los pedidos

// Requiero a la db, a través de la query de SQL, para que devuelva las categorías y la exporto
exports.getAllCategories = (callback) => {
    return pool.query('SELECT * FROM category', callback)
}

// Requiero a la db,a través de la query de SQL, para que devuelva los productos que pertenezcan a X categoría y la exporto
exports.getProductsInCategories = (categoryId, callback) => {
    return pool.query('SELECT * FROM category INNER JOIN product ON category.id=product.category WHERE product.category=?', [categoryId], callback)
}