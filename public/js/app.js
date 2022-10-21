// Pedido que trae todos los products
async function allProducts() {
    let result = await axios.get('http://localhost:3001/api/products')
    let products = await result.data
    return products;
};

// Pedido que busca los productos de acuerdo a su nombre
async function searchProducts(name) {
    let result = await axios.get(`http://localhost:3001/api/products/search/${name}`)
    let productsSearch = result.data
    return productsSearch
};

// Pedido que busca las categorias
async function allCategories() {
    let result = await axios.get(`http://localhost:3001/api/category`)
    let productsSearch = showSelectCategories(result.data)
    return productsSearch
};

// Función que trae los productos de cada categoría.
async function productsInCategories(id) {
    let result = await axios.get(`http://localhost:3001/api/category/${id}`)
    shopContent.innerHTML = '';
    let categoryProducts = await productsGrid(result.data)
    return categoryProducts
};

// HTML
// Empiezo trayendo el contenedor para guardar adentro la lógica
const shopContent = document.getElementById('shopContent');
const inputSearch = document.getElementById('inputSearch');
const categoriesUl = document.getElementById('categories');

// Función que renderiza los productos:
/*  +  Recorro los productos para que se renderizen como grilla
    +   Función reutilizable */
async function productsGrid(products) {
    products.map((product) => {
        let content = document.createElement('div');
        content.className = 'col-xl-3 col-md-6 mb-4';
        content.innerHTML = ` 
        <div class="card border-0 shadow">
            <div class="card-body">
                <img src='${product.url_image === '' ? "https://talentclick.com/wp-content/uploads/2021/08/placeholder-image-300x200.png" : product.url_image}' class="card-img-top" alt="...">
        
                <div class="card-body text-center">
                    <h6 class="card-title mb-0">${product.name.toUpperCase()}</h6>
        
                    <div class="card-text text-black-50" id='price'>
                        $ ${product.price}
                    </div>    
                </div>
            </div>
        </div>
        `;
        shopContent.append(content);
    });
};

// Función que busca los productos: 
/*  + Utilizo keyup para que el renderizado de los productos a la hora de buscar sea en el momento. 
    + PreventDefault para que no recargue la página a la hora de buscar */
async function showSearchProducts() {
    inputSearch.addEventListener('keyup', async (event) => {
        event.preventDefault();
        let products = await searchProducts(event.target.value);
        shopContent.innerHTML = '';
        productsGrid(products);
    });
};

// Función que muestra y renderiza las categorías:
/*  + Empiezo creando una función para hacer que la primera letra sea en Mayus.
    + Primer map: renderiza cada categoría traída por la ruta allCategories()
    + Segundo map: comparando cada id de la utiqueda HTML, renderizado en el primer map, con el que entrega el evento.onclick, renderizamos los productos de la categoría correspondiente*/
async function showSelectCategories(categories) {
    function capitalizarPrimeraLetra(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    categories.map(categorie => {
        let content = document.createElement('li');
        content.className = 'dropdown-item';
        content.innerHTML = ` 
        <li>
            <a class='dropdown-item' id='${categorie.id}'>${capitalizarPrimeraLetra(categorie.name)}</a>
        </li>       
        `;
        categoriesUl.append(content);
    });

    const itemLink = document.querySelectorAll("#categories li a");
    itemLink.forEach(item => {
        item.addEventListener('click', (event) => {
            if (event.target.id === item.id) productsInCategories(item.id)
        });
    });
};

// Función para botón que muestre todos los productos:
/*  + Le asigno a al botón Productos la funcionalidad de que muestre todos los productos en caso de necesitarlo */
async function renderProducts(products) {
    const renderProd = document.getElementById('renderProducts');
    renderProd.addEventListener('click', productsGrid(products));
}

// Funcion que ejecuta todas las funciones anteriores:
/* + Las funciones se concentran en una sola para saber que es lo que se renderiza y en que orden*/
async function startApplication() {
    let getProducts = await allProducts();
    productsGrid(getProducts);
    renderProducts(getProducts)
    allCategories();
    showSearchProducts();
};

// Ejecuto la aplicación
startApplication();