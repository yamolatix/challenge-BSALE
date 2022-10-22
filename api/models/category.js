/* const pool = require('../config/db'); // Llamo a la db para hacerle los pedidos

// Requiero a la db, a través de la query de SQL, para que devuelva las categorías y la exporto
exports.getAllCategories = async () => {
    const categories = await pool.query('SELECT * FROM category', (err, result) => {
        if (err) return err;

        return result
    })
    return categories
}

// Requiero a la db,a través de la query de SQL, para que devuelva los productos que pertenezcan a X categoría y la exporto
exports.getProductsInCategories = async () => {
    const categories = pool.query('SELECT * FROM category INNER JOIN product ON category.id=product.category WHERE product.category=?', (err, result) => {
        if (err) return err;
        return result
    })
    return categories
} */

// Query que muestra las categorias y la exporto
exports.allCategories = 'SELECT * FROM category'

// Query que muestra las los productos que pertenecen a X categoria y la exporto
exports.productsInCategories = 'SELECT * FROM category INNER JOIN product ON category.id=product.category WHERE product.category=?'