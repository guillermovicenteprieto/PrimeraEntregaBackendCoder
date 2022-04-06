const moment = require("moment");
const fs = require("fs").promises;

class Cart {

    constructor() {
        this.path = "./src/db/carts.txt";
        this.cart = [];
        this.id = 1;
        this.cartProducts = {
            id: this.id,
            timestamp: moment().format("L LTS"),
            name: "",
            description: "",
            code: "",
            img: "",
            price: 0,
            stock: 0,
        };
    }


    async cartList() {
        try {
            const data = await fs.readFile(this.path, "utf8");
            if (data) {
                this.cart = JSON.parse(data);
                if (this.cart.length > 0) {
                    this.id = parseInt(this.cart[this.cart.length - 1].id) + 1;
                }
            }
            return this.cart;
        } catch (error) {
            if (error.code === "ENOENT") {
                await fs.writeFile(this.path, JSON.stringify([], null, 2));
                return 'No hay carrito';
            } else {
                throw new Error((
                    "Se produjo un error en CartList: " + error.message
                ));
            }
        }
    }

    async newCart() {
        try {
            const data = await this.cartList();
            if (!data) {
                data = this.cart;
            } else if (data.length > 0) {
                this.id = parseInt(data[data.length - 1].id) + 1;
            } 
            //this.id = 1;
            const cart = {
            id: this.id,
            timestamp: moment().format("L LTS"),
            products: [{
                ...this.cartProducts,
            }],
        };
        data.push(cart);
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
        return cart;
    } catch(error) {
        throw new Error((
            "Se produjo un error en newCart: " + error.message
        ));
    }
}

    async deleteCart(id) {
    try {
        const data = await this.cartList();
        const index = data.findIndex((cart) => cart.id === parseInt(id));
        if (index === -1) {
            throw new Error("Cart not found");
        }
        data.splice(index, 1);
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        throw new Error((
            "Se produjo un error en deleteCart: " + error.message
        ));
    }
}

    async cartProducts(id) {
    try {
        const data = await this.cartList();
        const cart = data.find((cart) => cart.id == parseInt(id));
        if (!cart) {
            throw new Error("Cart not found");
        }
        return cart.products;

    } catch (error) {
        throw new Error((
            "Se produjo un error en cartProducts: " + error.message
        ));
    }
}

    async addProduct(id, product) {
    try {
        const data = await this.cartList();
        const cart = data.find((cart) => cart.id === parseInt(id));
        if (!cart) {
            cart = await this.newCart();
        }
        product = {
            id: this.id,
            timestamp: moment().format("L LTS"),
            name: product.name,
            description: product.description,
            code: product.code,
            img: product.img,
            price: product.price,
            stock: product.stock,
        };
        cart.products.push(product);
        await fs.writeFile(this.path, JSON.stringify(data, null, 2));
        return cart;
    } catch (error) {
        throw new Error((
            "Se produjo un error en addProduct: " + error.message
        ));
    }
}

    async removeProduct(id, idProd) {
    try {
        const data = await this.cartList();
        const cart = data.find((cart) => cart.id === parseInt(id));
        if (cart) {

            const cartIndex = cart.products.findIndex((product) => product.id == parseInt(id));
            const product = cart.products.findIndex((product) => product.id == parseInt(idProd));
            if (product != -1) {
                throw new Error("Product not found");
            }
            cart.products.splice(product, 1);
            data[cartIndex] = cart;

            await fs.writeFile(this.path, JSON.stringify(data, null, 2));
            return cart;
        } else {
            throw new Error("Cart not found");
        }
    } catch (error) {
        throw new Error((
            "Se produjo un error en removeProduct: " + error.message
        ));
    }

}
}

module.exports = Cart;
