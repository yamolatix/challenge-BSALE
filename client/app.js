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
}

// Pedido que busca las categorias
async function allCategories() {
    let result = await axios.get(`http://localhost:3001/api/category`)
    let productsSearch = showSelectCategories(result.data)
    return productsSearch
}

// Pedido de los productos que trae cada categoría
async function productsInCategories(id) {
    let result = await axios.get(`http://localhost:3001/api/category/${id}`);
    let productsSearch = result.data;
    shopContent.innerHTML = '';
    productsGrid(productsSearch);
}

// HTML
// Empiezo trayendo el contenedor para guardar adentro la lógica
const shopContent = document.getElementById('shopContent');
const inputSearch = document.getElementById('inputSearch');
const categoriesUl = document.getElementById('categories');
const renderProd = document.getElementById('renderProducts');

// Función que renderiza los productos:
/*  +  Recorro los productos para que se renderizen como grilla
    +   Función reutilizable */
async function productsGrid(products) {
    products.forEach(product => {
        let content = document.createElement('div');
        content.className = 'col-md-4 mt-2';
        content.innerHTML = ` 
        <div class="card">
            <div class="card-body">
                <div class="card-img-actions">
                    <img src='${product.url_image === '' ? "https://talentclick.com/wp-content/uploads/2021/08/placeholder-image-300x200.png" : product.url_image}' class='card-img img-fluid' width="96" height="350">
                </div> 

                <div class="card-body bg-light text-center">
                    <div class="mb-2">
                        <h6 class="font-weight-semibold mb-2">${product.name.toUpperCase()}</h6>
                    </div>

                    <h3 class="mb-0 font-weight-semibold" id='price'>
                    $ ${product.price}
                    </h3>
                    
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
    + Primer forEach: renderiza cada categoría traída por la ruta allCategories()
    + Segundo forEach: comparando cada id de la utiqueda HTML, renderizado en el primer forEach, con el que entrega el evento.onclick, renderizamos los productos de la categoría correspondiente*/
async function showSelectCategories(categories) {
    function capitalizarPrimeraLetra(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    categories.forEach(categorie => {
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
async function renderProducts() {
    const products = await allProducts();
    renderProd.addEventListener('click', productsGrid(products));
}

// Funcion que ejecuta todas las funciones anteriores:
/* + Las funciones se concentran en una sola para saber que es lo que se renderiza y en que orden*/
async function startApplication() {
    let getProducts = await allProducts();
    productsGrid(getProducts);
    await allCategories();
    showSearchProducts();
};

// Ejecuto la aplicación
startApplication();