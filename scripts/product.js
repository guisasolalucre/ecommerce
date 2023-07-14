/* clase producto */
class Product {
    constructor(id, name, price, description, categorie, picture, stock, quantity){
        this.id = id;
        this.name = name;
        this.price = parseFloat(price);
        this.description = description;
        this.categorie = categorie;
        this.picture = picture;
        this.stock = stock;
        this.quantity = quantity || 0;
    }
}