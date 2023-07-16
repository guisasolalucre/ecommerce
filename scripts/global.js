/* creo productos hardcodeados */
const prod1 = new Product(1, "Crema para manos", 2000, "Buena para las manos", "Corporales", "manos", 1)
const prod2 = new Product(2, "Crema para los bigotes", 1500, "No te afeites como Maria Becerra", "Depilatorias", "bigotes", 2)
const prod3 = new Product(3, "Crema para la cara", 2500, "Para pieles sensibles", "Faciales", "cara", 3)
const prod4 = new Product(4, "Crema para cabello seco", 5000, "Adios al cabello quebradizo", "Capilares", "pelo", 3)
const prod5 = new Product(5, "Crema corporal de coco", 3000, "Ideal para el invierno", "Corporales", "cuerpo", 3)

/* array de productos */
const allProd = [];
/* agrego los procutos al array */
allProd.push(prod1, prod2, prod3, prod4, prod5)

/* array de categorias */
const categoriesList = getCategories(allProd)

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
