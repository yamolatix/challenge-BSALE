const d = document;

// TRAIGO DEL SERVIDOR LA RUTA QUE TRAE LOS PRODUCTOS
async function allProducts() {
    let result = await axios.get('http://localhost:3001/api/products');
    let products = await result.data;
    return products;
};

// TRAIGO DEL SERVIDOR LA RUTA QUE BUSCA
async function searchProducts(name) {
    let result = await axios.get(`http://localhost:3001/api/products/search/${name}`);
    let productsSearch = result.data;
    return productsSearch;
};

// TRAIGO DEL SERVIDOR LA RUTA QUE LAS CATEGORIAS
async function allCategories() {
    let result = await axios.get(`http://localhost:3001/api/category`);
    let productsSearch = showSelectCategories(result.data);
    return productsSearch;
};

// TRAIGO DEL SERVIDOR LA RUTA QUE TRAE TRAE LOS PRODUCTOS QUE PERTENECEN A LA CATEGORÍA 
async function productsInCategories(id) {
    let result = await axios.get(`http://localhost:3001/api/category/${id}`);
    let productsSearch = result.data;
    shopContent.innerHTML = '';
    productsGrid(productsSearch);
};

// HTML
// EMPIEZO TRAYENDO EL CONTENTEDOR QUE CREE DESDE INDEX.HTML PARA GUARDAR TODA ESTA LÓGICA DENTRO DE ESA ETIQUETA
const verCarrito = d.getElementById('verCarrito');
const modalContainer = d.getElementById('modalContainer');
const shopContent = d.getElementById('shopContent');
const cantidadCarrito = d.getElementById('cantidadCarrito');
const inputSearch = d.getElementById('inputSearch');
const comprar = d.getElementById('addToCart');
const categoriesUl = d.getElementById('categories');
const renderProducts = d.getElementById('renderProducts');
const showProducts = d.getElementById('showProducts');

// FUNCIÓN QUE RENDERIZA TODOS LOS PRODUCTOS
async function productsGrid(products) {
    products.forEach(product => {
        let content = d.createElement('div');
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

{/* <button type="button" class="btn bg-cart" id="addToCart">Add to cart</button> */}

async function showSearchProducts() {
    inputSearch.addEventListener('keyup', async (event) => {
        let products = await searchProducts(event.target.value);
        shopContent.innerHTML = '';
        productsGrid(products);
    });
};

async function showSelectCategories(categories) {
    const products = await allProducts();

    categories.forEach(categorie => {

        function capitalizarPrimeraLetra(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        let content = d.createElement('li');
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
            if (event.target.id === item.id) {
                productsInCategories(item.id)
            } else {
                shopContent.innerHTML = ""
                productsGrid(products)
            };
        });
    });
    showProducts.addEventListener('click', productsGrid(products));
};

//EJECUTO LA APLICACIÓN
async function startApplication() {
    let getProducts = await allProducts();
    productsGrid(getProducts);
    await allCategories();
    showSearchProducts();
};

startApplication();