fetch('data/data.json')
    .then((response) => response.json())
    .then((data) => {

        data.forEach(literal => {
            allProd.push(literalToProduct(literal))
        });

        /* MUESTRA TODOS LOS PRODUCTOS */
        showProducts(allProd)

        categoriesList = getCategories(allProd)

        /* crea el desplegable de categorias */
        /* manda la lista de categorias ya filtradas */
        createDropdownItem(categoriesList, "categorie")
    })
    .catch((msg) => { console.log(msg) })



/* inicia la cantidad del carrito */
cartQuantity.innerText = shopCart.length

/* evento input para la busqueda */
searchHTML.addEventListener("input", function () {
    if (this.value == "") {
        showProducts(allProd)
    }
    else {
        const filter = allProd.filter(prod => prod.name.toLowerCase().includes(this.value.toLowerCase()))

        if (filter.length > 0) {
            filter.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0
            })
            showProducts(filter)
            welcomeHTML.innerText = "Resultado de la búsqueda"
        } else {
            divProdHTML.innerHTML = `<p>No hay productos que coincidan con la búsqueda</p>`
        }
    }
})


/* modal carrito */
const cartModalHTML = document.getElementById("cartModal");
const cartHTML = document.getElementById("cartContent")
const cartTotalHTML = document.getElementById("cartTotal")

// Cuando el usuario hace clic en el botón, se abre la ventana
const openCartModalBtn = document.getElementById("shopCart");
openCartModalBtn.addEventListener("click", function () {
    showCart(shopCart)
    cartModalHTML.style.display = "block";
});

// Si el usuario hace clic en seguir comprando, la ventana se cierra
const span = document.getElementsByClassName("closeModal")[0];
span.addEventListener("click", function () {
    cartModalHTML.style.display = "none";
});

// Si el usuario hace clic fuera de la ventana, se cierra.
window.addEventListener("click", function (event) {
    if (event.target == cartModalHTML) {
        cartModalHTML.style.display = "none";
    }
});

//si el usuario hace click en el boton de comprar, hace la compra, elimina el carrito del localstorage y cierra el modal
const buyBtn = document.getElementById("buyBtn");
buyBtn.addEventListener("click", function () {
    finishBuying();
})
