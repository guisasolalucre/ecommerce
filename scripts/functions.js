
/*---------------------------------------------------------------------------------------*/
// FUNCIONES QUE MUESTRAN COSAS EN EL HTML

/* muestra los productos en tarjetas */
/* se le envía una lista (filtada o todos) */
/* evento click en agregar al carrito */
function showProducts(list) {

    showWelcome(list)

    divProdHTML.innerHTML = `<div class="row row-cols-4" id="prodList"></div>`

    const prodListHTML = document.getElementById("prodList")

    prodListHTML.innerHTML = ""
    for (const product of list) {
        let container = document.createElement("div");

        container.innerHTML =
            `<div class="card prodCard" style="width: 18rem;">
            <img src="${product.picture}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <div class="prodFooter">
                <p class="price">$${product.price}</p>
                `+// <button class="btn btn-secondary">Ver más</button>
            `<button class="btn btn-primary" onClick="addToCart(${product.id})">Agregar al carrito</button>
                </div>
            </div>
        </div>`;

        prodListHTML.append(container);
    }
}

/* muestra un mensaje antes de los productos dependiendo de la lista filtrada */
function showWelcome(list) {

    let categories = getCategories(list)
    if (categories.length > 1) {
        welcomeHTML.innerText = `Conocé todos nuestros productos`
    } else {
        welcomeHTML.innerText = `${categories}`
    }
}

/* desplegable para mostrar por categoria, con evento click */
function createDropdownItem(list, key) {
    // creo el contenedor para cada categoria
    let container = document.createElement("li");

    // contenido del container para cada categoria
    container.innerHTML = "<option class='dropdown-item categOption'>" + list.join("</option><option class='dropdown-item categOption'>") + "</option>";

    // agrego el container al drowdown menu
    categoriesHTML.append(container);

    // agrego un event listener de click al option
    // cuando se da el evento se ejecuta una funcion que filtra
    const options = document.getElementsByClassName("categOption")
    for (const op of options) {
        op.addEventListener("click", function () {
            const filter = allProd.filter(prod => prod[key] == this.value);
            showProducts(filter);
        })
    }

}

/*---------------------------------------------------------------------------------------*/
// FUNCIONES AUXILIARES

/* encontrar producto */
function findById(id, list) {
    return list.find(x => x.id == id)
}

/* crea el array de categorias desde el array de los productos */
function getCategories(list) {
    /* mapea las categorias desde el array de productos */
    const allCategories = list.map((prod) => prod.categorie);

    /* nuevo array que va a tener categorias sin repetir */
    const categories = []

    /* itera el array con categorias repetidas, y va agregando a el array sin repetir si es que todavia no está incluida */
    allCategories.forEach(element => {
        if (!categories.includes(element)) {
            categories.push(element)
        }
    });

    categories.sort((a, b) => {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0
    })

    return categories
}

/* transforma los objetos literales en objetos producto */
function literalToProduct(literal) {

    let id = literal.id
    let name = literal.name
    let price = literal.price
    let description = literal.description
    let categorie = literal.categorie;
    let picture = literal.picture;
    let stock = literal.stock;
    let quantity = literal.quantity;

    return new Product(id, name, price, description, categorie, picture, stock, quantity)
}

/* checkear si el producto tiene stock */
function checkStock(p) {

    if (p.quantity < p.stock) {
        return true
    } else {
        Toastify({
            text: `No hay suficiente stock\nNo se pudo agregar '${p.name}' al carrito`,
            duration: 2000,
            close: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#ff0000",
            },
        }).showToast();
        return false
    }
}

/*---------------------------------------------------------------------------------------*/
// FUNCIONES RELACIONADAS AL CARRITO
/* muestra la toast del prod agregado al carrito*/
function toastAddedToCart(name) {
    Toastify({
        text: "Se agregó una unidad de '" + name + "' al carrito",
        duration: 2000,
        close: true,
        gravity: "bottom",
        position: "right",
        style: {
            background: "#474747",
        },
    }).showToast();
}

/* trae el carrito del localstorage */
function getCart() {
    if ("ShopCart" in localStorage) {
        let JSONcart = JSON.parse(localStorage.getItem("ShopCart"));
        JSONcart.forEach(literal => {
            literalToProduct(literal)
        });
        return JSONcart;
    } else {
        return []
    }
}

/* mostrar el modal de carrito */
function showCart() {

    // cantidad de articulos diferentes en el carrito
    cartQuantity.innerText = shopCart.length

    // suma total del carrito
    let cartTotal = shopCart.reduce((sum, prod) => (sum + prod.price * prod.quantity), 0)

    // si el carrito está vacío, indica tal cosa
    // si no, muestra el carrito
    if (shopCart.length === 0) {
        cartHTML.innerHTML = "<p>El carrito está vacío</p>";
        cartQuantity.innerText = shopCart.length
        cartTotalHTML.innerHTML = "";
    } else {
        cartHTML.innerHTML = "";

        for (const prod of shopCart) {
            let divProd = document.createElement("div");

            divProd.innerHTML += `  <div class="divProdCart">
                                <div>
                                    <img src="${prod.picture}" alt="${prod.name}">
                                </div>

                                <div>
                                    <p><strong>${prod.name}</strong></p>
                                    <p>Cantidad: ${prod.quantity}</p> 
                                    <p>Precio: $${prod.price}</p>
                                    <p>Subtotal: $` + prod.price * prod.quantity + `</p>
                                </div>

                                <div class="prodCartBtn d-grid gap-1">
                                    <button id="${prod.id}" class="btn btn-outline-secondary btn-sm btn-add"
                                        onClick="addToCart(${prod.id})">Agregar</button>
                                    <button id="${prod.id}" class="btn btn-outline-secondary btn-sm btn-sub"
                                        onClick="subFromCart(${prod.id})">Restar</button>
                                    <button id="${prod.id}" class="btn btn-outline-secondary btn-sm btn-delete"
                                        onClick="deleteFromCart(${prod.id})">Eliminar</button>
                                </div>
                                </div>
                                <hr>`
            cartHTML.append(divProd);

            cartTotalHTML.innerHTML = `<p><strong>Total de la compra: </strong></p>
                                    <p><strong>$${cartTotal}</strong></p>`
        }
    }

    // actualiza la cantidad del carrito
    cartQuantity.innerText = shopCart.length

}

/* agregar al carrito */
function addToCart(id) {

    const prod = findById(id, allProd)

    if (shopCart.some((p) => p.id === prod.id)) {
        prodInCart = findById(id, shopCart)
        if (checkStock(prodInCart)) {
            prodInCart.quantity++,
                toastAddedToCart(prod.name)
        }
    } else {
        if (checkStock(prod)) {
            prodInCart = literalToProduct({ ...prod })
            prodInCart.quantity++
            shopCart.push(prodInCart),
                toastAddedToCart(prod.name)
        }
    }

    /* actualiza la cantidad del carrito */
    cartQuantity.innerText = shopCart.length

    /* guarda el carrito (en json) en el localstorage */
    localStorage.setItem("ShopCart", JSON.stringify(shopCart))

    showCart()

}

/* elimina el producto del carrito */
function deleteFromCart(id) {

    let prodInCart = findById(id, shopCart);
    prodInCart.quantity = 0

    let position = shopCart.findIndex(prod => prod.id == id);
    shopCart.splice(position, 1);

    Toastify({
        text: `'${prodInCart.name}' se eliminó del carrito`,
        duration: 2000,
        close: true,
        gravity: "bottom",
        position: "right",
        style: {
            background: "#474747",
        },
    }).showToast();

    //actualiza la vista del carrito
    showCart()

    /* actualiza la cantidad del carrito */
    cartQuantity.innerText = shopCart.length

    /* guarda el carrito (en json) en el localstorage */
    localStorage.setItem("ShopCart", JSON.stringify(shopCart))

}

/* resta una unidad producto al carrito */
function subFromCart(id) {
    let prodInCart = findById(id, shopCart);

    //Verifico que no reste si es 1
    if (prodInCart.quantity > 1) {
        prodInCart.quantity--;

        //actualiza la vista del carrito
        showCart()

        Toastify({
            text: `Se restó una unidad de '${prodInCart.name}'`,
            duration: 2000,
            close: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#474747",
            },
        }).showToast();

        /* actualiza la cantidad del carrito */
        cartQuantity.innerText = shopCart.length

        /* guarda el carrito (en json) en el localstorage */
        localStorage.setItem("ShopCart", JSON.stringify(shopCart))
    }
}

/* terminar la compra */
/* falta toda la parte de modificar el back */
function finishBuying() {
    if (shopCart.length > 0) {
        localStorage.clear()

        shopCart.splice(0, shopCart.length)

        //sweetalert
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Gracias por tu compra!',
            showConfirmButton: false,
            timer: 2000
        });

        cartModalHTML.style.display = "none";

        setTimeout("location.reload()", 2000)

    } else {
        Swal.fire({
            icon: 'error',
            title: 'El carrito está vacío',
            text: 'Agregá productos a tu carrito para poder realizar la compra',
            confirmButtonText: 'Seguir comprando',
        })
    }
}

