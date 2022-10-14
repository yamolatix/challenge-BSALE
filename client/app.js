// TRAIGO PRODUCTOS
async function allProducts() {
    let data = await axios.get('http://localhost:3001/api/products')
    let dataJSON = await data.data
    return dataJSON;
};

const products = await allProducts();

// HTML
// CREO UNA VARIABLE PARA GUARDAR EN MI CARRITO
let carrito = []
// EMPIEZO TRAYENDO EL CONTENTEDOR QUE CREE DESDE MI HTML PARA GUARDAR TODA ESTA LÓGICA DENTRO DE ESA ETIQUETA
const verCarrito = document.getElementById('verCarrito');
const modalContainer = document.getElementById('modal-container');
const shopContent = document.getElementById('shopContent');

// EMPIEZA RECORRIDO DE LOS PRODUCTOS
products.forEach(product => {
    // CREO LA ETIQUETA QUE NECESITO
    let content = document.createElement('div');
    // LE ASIGNO UNA CLASE Y SU NOMBRE
    content.className = 'card';
    // A LA ETIQUETA QUE CREE LE INCORPORO CON 'innerHTML' LO QUE QUIERO QUE VAYA DENTRO
    content.innerHTML = ` 
            <img src='${product.url_image}'>
            <h3> ${product.name}</h3>
            <p class 'price'> $${product.price}</p>`;
    // CON 'append' UNO MI ETIQUETA PADRE A LA NUEVA ETIQUETA COMO HIJO CON SUS HIJOS.
    shopContent.append(content);

    // CREO LA ETIQUETA QUE NECESITO, EN ESTE CASO VA UN PASO MÁS ALLÁ Y DIRECTAMENTE CREO UN BOTÓN
    let comprar = document.createElement('button');
    // LE ASIGNO UNA CLASE Y SU NOMBRE
    comprar.className = 'comprar';
    // Y CON 'innerText' LE ANEXO EL NOMBRE
    comprar.innerText = 'Buy';
    // LE ASIGNO UNA ETIQUETA PADRE
    content.append(comprar);


    comprar.addEventListener('click', () => {
        carrito.push({
            id: product.id,
            name: product.name,
            url_image: product.url_image,
            price: product.price,
            discount: product.discount,
            category: product.category
        });
    });
});

// EMPIEZA LÓGICA DEL CARRITO
verCarrito.addEventListener('click', () => {
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    modalHeader.innerHTML = `<h1 class='mocal-header-title'>Carrito</h1>`;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement('h1');
    modalbutton.className = "modal-header-button";
    modalbutton.innerText = 'x';
    modalHeader.append(modalbutton);

    carrito.forEach(product => {
        let carritoContent = document.createElement('div')
        carritoContent.className = 'modal-content'
        carritoContent.innerHTML = `
        <img src='${product.url_image}'>
        <h3> ${product.name}</h3>
        <p> $${product.price}</p>`;
        modalContainer.append(carritoContent)
    })
});