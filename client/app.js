const d = document;

// TRAIGO DEL SERVIDOR LA RUTA QUE TRAE LOS PRODUCTOS
async function allProducts() {
    let result = await axios.get('http://localhost:3001/api/products')
    let products = await result.data
    return products;
};

// TRAIGO DEL SERVIDOR LA RUTA QUE BUSCA
async function searchProducts(name) {
    let result = await axios.get(`http://localhost:3001/api/products/search/${name}`)
    let productsSearch = result.data
    return productsSearch
}

// HTML
// CREO UNA VARIABLE PARA GUARDAR EN MI CARRITO
let carrito = []
// EMPIEZO TRAYENDO EL CONTENTEDOR QUE CREE DESDE INDEX.HTML PARA GUARDAR TODA ESTA LÓGICA DENTRO DE ESA ETIQUETA
const verCarrito = d.getElementById('verCarrito');
const modalContainer = d.getElementById('modalContainer');
const shopContent = d.getElementById('shopContent');
const cantidadCarrito = d.getElementById('cantidadCarrito');
const inputSearch = d.getElementById('inputSearch');

// EMPIEZA RECORRIDO DE LOS PRODUCTOS PARA MOSTRARLOS
const productsGrid = (products) => {
    products.forEach(product => {
        // CREPRODUCTOSO LA ETIQUETA QUE NECESITO
        let content = d.createElement('div');
        // LE ASIGNO UNA CLASE Y SU NOMBRE
        content.className = 'col-md-4';
        // A LA ETIQUETA QUE CREE LE INCORPORO CON 'innerHTML' LO QUE QUIERO QUE VAYA DENTRO
        content.innerHTML = ` 
            <div class='card p-3'>
                <div class='d-flex flex-row mb-3'>
                    <img src='${product.url_image}' class='img-card'>
                </div>
                <h3> ${product.name}</h3>
                <p class='price'> $ ${product.price}</p>
            </div>`;
        // CON 'append' UNO MI ETIQUETA PADRE A LA NUEVA ETIQUETA COMO HIJO CON SUS CORRESPONDIENTES HIJOS.
        shopContent.append(content);

        //EMPIEZA LÓGICA PARA AGREGAR PRODUCTOS AL CARRITO
        // CREO LA ETIQUETA QUE NECESITO, EN ESTE CASO VA UN PASO MÁS ALLÁ Y DIRECTAMENTE CREO UN BOTÓN
        let comprar = d.createElement('button');
        // LE ASIGNO UNA CLASE Y SU NOMBRE
        comprar.className = 'comprar';
        // Y CON 'innerText' LE ANEXO EL CONTENIDO
        comprar.innerText = 'Buy';
        // LE ASIGNO UNA ETIQUETA PADRE
        content.append(comprar);

        comprar.addEventListener('click', () => {
            // CONDICIONAL PARA SABER EN EL CARRITO YA HAY UN PRODUCTO IGUAL. A TRAVÉS DEL MÉTODO 'some' QUE RETORNA TRUE O FALSE
            const repeat = carrito.some(repeatProduct => repeatProduct.id === product.id)

            //SI RETORNA TRUE ES PORQUE YA EXISTE UN PRODUCTO IGUAL EN MI CARRITO
            if (repeat) {
                // MAPEO EL ARREGLO DEL CARRITO Y HAGO UNA CONDICIÓN DONDE SI EL PRODUCTO A SUMAR ES IGUAL A UNO QUE YA ESTÁ EN LA LISTA Y LE SUMO UNA UNIDAD
                carrito.map(prod => {
                    if (prod.id === product.id) {
                        prod.units++
                    }
                })
            } else {
                // SINO PUSHEO AL CARRITO EL NUEVO ARTICULO A COMPRAR
                carrito.push({
                    id: product.id,
                    name: product.name,
                    url_image: product.url_image,
                    price: product.price,
                    discount: product.discount,
                    category: product.category,
                    units: 1
                });
            }
            // CADA VEZ QUE AGREGO UN PRODUCTO SE DEBE EJECTUAR LA FUNCIÓN QUE AGREGA LA CANTIDAD VISIBLE AL CARRITO
            carritoCounter()
        });
    });
}

function renderSearchProducts() {
    inputSearch.addEventListener('keyup', async (e) => {
        let products = await searchProducts(e.target.value)
        shopContent.innerHTML = ''
        productsGrid(products)
    })
};

//EJECUTO LA FUNCIÓN
async function start() {
    let getProducts = await allProducts();
    productsGrid(getProducts)
    renderSearchProducts()
}

start()



// EMPIEZA LÓGICA DEL CARRITO
const pintarCarrito = () => {
    // PARA QUE NO SE REPITA CADA VEZ QUE LE DOY CLICK AL CARRITO LE DOY AL CONTENEDOR UN ESTADO VACÍO
    modalContainer.innerHTML = '';
    modalContainer.style.display = 'flex';

    // CREO EL HEADER DE LA VISTA DEL CARRITO
    const modalHeader = d.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.innerHTML = `<h1 class='mocal-header-title'>Carrito</h1>`;
    modalContainer.append(modalHeader);

    // BOTÓN DEL HEADER PARA SALIR
    const modalbutton = d.createElement('h1');
    modalbutton.className = 'modal-header-button';
    modalbutton.innerText = 'Exit';
    modalHeader.append(modalbutton);

    // PARA QUE AL VOLVER A HACER CLICK SE VAYA A LA VENTANA PRINCIPAL
    modalbutton.addEventListener('click', () => {
        modalContainer.style.display = 'none'
    });

    carrito.forEach(cart => {
        // RENDERIZADO DEL PRODUCTO ELEGIDO
        let carritoContent = d.createElement('div');
        carritoContent.className = 'modal-content';
        carritoContent.innerHTML = `
        <img src='${cart.url_image}'>
        <h3> ${cart.name}</h3>
        <p> $${cart.price} (unit)</p>
        <p> U.${cart.units}</p>
        <p> $ ${cart.units * cart.price}</p>
        `;
        modalContainer.append(carritoContent);

        // BOTON ELIMINAR PRODUCTO DE LA LISTA DE CARRITO
        let eliminar = d.createElement('span');
        eliminar.innerText = 'X';
        eliminar.className = 'delete-product';
        carritoContent.append(eliminar);

        // DOY FUNCIONALIDAD AL BOTÓN ELIMINIR
        eliminar.addEventListener('click', eliminarProducto);
    });

    // SUMA DEL TOTAL DE LOS PRODUCTOS A COMPRAR
    const total = carrito.reduce((acc, el) => acc + el.price * el.units, 0);

    // LE DOY FORMA CON HTML
    const totalBuying = d.createElement('div');
    totalBuying.className = 'total-content';
    totalBuying.innerHTML = `Total: $ ${total}`;
    modalContainer.append(totalBuying);
};

// EJECUTO LA FUNCIÓN A TRAVÉS DE UN CLICK
verCarrito.addEventListener('click', pintarCarrito);

// FUNCIÓN PARA QUE SE ELIMINE UN PRODUCTO DEL CARRITO
const eliminarProducto = () => {
    // BUSCO EN EL CARRITO 
    const foundId = carrito.find(element => element.id);

    carrito = carrito.filter(id => id !== foundId);

    // EJECUTO OTRA VEZ LAS FUNCIONES QUE CREAN EL CARRITO Y LA QUE LE SUMA LA CANTIDAD DESPUÉS DE ELIMINAR UN PRODUCTO DEL CARRITO
    pintarCarrito()
    carritoCounter()
};

// FUNCIÓN DE CONTADOR DE CARRITO
const carritoCounter = () => {
    cantidadCarrito.style.display = 'block';

    //SI EL CARRITO ESTÁ VACÍO QUE EL NÚMERO DESAPAREZCA
    carrito.length === 0 ? cantidadCarrito.style.display = 'none' :
        cantidadCarrito.innerText = carrito.length;
}
