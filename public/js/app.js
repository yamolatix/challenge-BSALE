// Pedido que trae todos los products
async function allProducts() {
    let result = await axios.get('http://localhost:3001/api/products')
    return result.data
};

// Pedido que busca los productos de acuerdo a su nombre
async function searchProducts(name) {
    try {
        let result = await axios.get(`http://localhost:3001/api/products/search/${name}`)
        // Desde el servidor se programó que si arroja un arreglo vacío (Ya que no encontró ninguna coincidencia) devuelva un status 204 - No content -. Por ende la data devuelve un string vacío. Entonces se le devuelve al "client" un jumbotron diciendole que no hubo coincidencias.
        if (result.data === "") {
            shopContent.innerHTML = `
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-4">Product not found</h1>
                    <p class="lead">Keep searching if you want</p>
                </div>
            </div>
            `;
        }
        // Si no que devuelva la información que coincida con la búsqueda.
        else {
            return result.data
        }
    } catch (error) {
        // Al ir eliminando cada letra en el input de la búsqueda al borrar la última letra devuelve un error del middelware que no encuentra la página al buscar un string vacío. Por ende se pide que devuelva todos los productos.
        if (error.response.status === 404) {
            let getProducts = await allProducts();
            shopContent.innerHTML = ''
            return productsGrid(getProducts);
        }
    }
};

// Pedido que busca las categorias
async function allCategories() {
    let result = await axios.get(`http://localhost:3001/api/category`)
    // Allcategories() devuelve el arreglo de objetos con todas las cateogrias y showSelectCategories se encarga de recorrerlo y darle un funcionamiento con productsInCageories()
    return showSelectCategories(result.data)
};

// Función que trae los productos de cada categoría.
async function productsInCategories(id) {
    let result = await axios.get(`http://localhost:3001/api/category/${id}`)
    //Antes de renderizar los productos que pertenecen a X cateogría. Limpio el contenedor par renderizar los nuevos.
    shopContent.innerHTML = '';
    return productsGrid(result.data)
};

// HTML
// Empiezo trayendo el contenedor genérico para guardar adentro la lógica
const shopContent = document.getElementById('shopContent');

// Función que renderiza los productos:
/*  +  Recorro los productos para que se renderizen como grilla
    +   Función reutilizable */
async function productsGrid(products) {
    products.map((product) => {
        let content = document.createElement('div');
        content.className = 'col-xl-3 col-md-6 mb-4';
        content.innerHTML = ` 
        <div class='card border-0 shadow'>
            
                <img src='${product.url_image === '' ? 'https://talentclick.com/wp-content/uploads/2021/08/placeholder-image-300x200.png' : product.url_image}' class='card-img-top' alt='...'>
        
                <div class='card-body text-center'>
                    <h6 class='card-title mb-0'>${product.name.toUpperCase()}</h6>        
                    <div class='card-text text-black-50' id='price'>
                        $ ${product.price}
                    </div>    
                </div>
            
        </div>
        `;
        shopContent.append(content);
    })
};

// Función que busca los productos: 
/*  + Utilizo keyup para que el renderizado de los productos a la hora de buscar sea en el momento. 
    + PreventDefault para que no recargue la página a la hora de buscar */
async function showSearchProducts() {
    const formSearch = document.getElementById('formSearch')

    formSearch.addEventListener('submit', async (e) => {
        e.preventDefault();
        const inputSearch = await document.getElementById('inputSearch').value
        let productsSearch = await searchProducts(inputSearch);

        if (productsSearch !== undefined) {
            shopContent.innerHTML = ''
            return productsGrid(productsSearch);
        }
    })
};

/* async function showSearchProducts() {
    const inputSearch = document.getElementById('inputSearch');
    inputSearch.addEventListener('keyup', async (e) => {

        let productsSearch = await searchProducts(e.target.value);

        if (productsSearch !== undefined) {
            shopContent.innerHTML = ''
            return productsGrid(productsSearch);
        }
    })
}; */

// Función que muestra y renderiza las categorías:
/*  + Empiezo creando una función para hacer que la primera letra sea en Mayus.
    + Primer map: renderiza cada categoría traída por la ruta allCategories()
    + Segundo forEach: comparando cada id de la utiqueda HTML, renderizado en el primer map, con el que entrega el evento.onclick, renderizamos los productos de la categoría correspondiente*/
async function showSelectCategories(categories) {
    const categoriesUl = document.getElementById('categories');

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

    const itemLink = document.querySelectorAll('#categories li a');
    itemLink.forEach(item => {
        item.addEventListener('click', (event) => {
            if (event.target.id === item.id) productsInCategories(item.id)
        });
    });
};

// Función para botón que muestre todos los productos:
/*  + Le asigno a al botón Productos la funcionalidad de que muestre todos los productos en caso de necesitarlo */
async function renderProducts(products) {
    const home = document.getElementById('home');
    home.addEventListener('click', () => {
        shopContent.innerHTML = ''
        return productsGrid(products)
    });
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