//Query que muestra todos los productos
exports.allProducts = 'SELECT * FROM product'

// Busca productos por nombre
exports.searchProducts = (name) => `SELECT * FROM product WHERE name LIKE '%${name}%'`