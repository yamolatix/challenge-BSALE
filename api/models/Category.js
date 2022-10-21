//Ruta que muestra una categoría
exports.allCategories = 'SELECT * FROM category'

//Ruta que muestra los productos correspondientes a una categoría
exports.productsInCategories = 'SELECT * FROM category INNER JOIN product ON category.id=product.category WHERE product.category=?'