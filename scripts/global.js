/* array de productos */
let allProd = [];

/* array de categorias */
let categoriesList = []

/* p que dice si se muestran todos los productos o cual categoria en el body */
const welcomeHTML = document.getElementById("welcome");

/* div de productos en el body */
const divProdHTML = document.getElementById("prodContainer")

/* ul (lista) desplegable donde se muestran las categorias en la navbar */
const categoriesHTML = document.getElementById("categories");

/* carrito */
const shopCart = getCart();
const cartQuantity = document.getElementById("cartQuantity")

/* busqueda */
const searchHTML = document.getElementById("search")
