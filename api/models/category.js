/* const pool = require('../config/db');

//Ruta que muestra una categoría
exports.getAllCategories = async () => {
    const categories = await pool.query('SELECT * FROM category', (err, result) => {
        if (err) return err;

        return result
    })
    return categories
}

//Ruta que muestra los productos correspondientes a una categoría
exports.getProductsInCategories = async () => {
    const categories = pool.query('SELECT * FROM category INNER JOIN product ON category.id=product.category WHERE product.category=?', (err, result) => {
        if (err) return err;
        return result
    })
    return categories
} */

//Ruta que muestra una categoría
exports.allCategories = 'SELECT * FROM category'

//Ruta que muestra los productos correspondientes a una categoría
exports.productsInCategories = 'SELECT * FROM category INNER JOIN product ON category.id=product.category WHERE product.category=?'