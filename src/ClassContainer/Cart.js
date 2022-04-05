const moment = require("moment");
const fs = require("fs").promises;

class Cart {

    constructor() {
        this.path = "./src/db/carts.txt";
        this.cart = [];
        this.id = 1;
        this.product = {
            id: this.id,
            timestamp: moment().format("L LTS"),
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
                return 'No hay carritos aún';
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
            const cart = {
                id: this.id,
                timestamp: moment().format("L LTS"),
                // products: [{
                //     ...this.product,
                // }],
            };
            data.push(cart);
            await fs.writeFile(this.path, JSON.stringify(data, null, 2));
            //this.id++;
            return cart;
        } catch (error) {
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
            const cart = data.find((cart) => cart.id === parseInt(id));
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
                throw new Error("Cart not found");
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

    async removeProduct(id, productId) {
        try {
            const data = await this.cartList();
            const cart = data.find((cart) => cart.id === parseInt(id));
            if (!cart) {
                throw new Error("Cart not found");
            }
            const index = cart.products.findIndex(
                (product) => product.id === parseInt(productId.id)
            );
            if (index === -1) {
                throw new Error("Product not found");
            }
            cart.products.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(data, null, 2));
            return cart;
        } catch (error) {
            throw new Error((
                "Se produjo un error en removeProduct: " + error.message
            ));
        }
    }

}

module.exports = Cart;





//   async save(product) {
//     try {
//       const data = await this.cartList();
//       product = {
//         id: this.id,
//         timestamp: moment().format("L LTS"),
//         name: product.name,
//         description: product.description,
//         code: product.code,
//         img: product.img,
//         price: product.price,
//         stock: product.stock,
//       };
//       data.push(product);
//       await fs.writeFile(this.path, JSON.stringify(data, null, 2));
//       this.id++;
//       return product;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async getById(id) {
//     try {
//       const data = await this.cartList();
//       const product = data.find((product) => product.id == id);
//       return product;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async update(id, product) {
//     try {
//       const data = await this.cartList();
//       const index = data.findIndex((product) => product.id == id);
//       data[index] = {
//         id: this.id,
//         timestamp: moment().format("L LTS"),
//         name: product.name,
//         description: product.description,
//         code: product.code,
//         img: product.img,
//         price: product.price,
//         stock: product.stock,
//       };
//       await fs.writeFile(this.path, JSON.stringify(data, null, 2));
//       this.id++;
//       return product;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async delete(id) {
//     try {
//       const data = await this.cartList();
//       const index = data.findIndex((product) => product.id == id);
//       data.splice(index, 1);
//       await fs.writeFile(this.path, JSON.stringify(data, null, 2));
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   }

//   async deleteAll() {
//     try {
//       const data = await this.cartList();
//       data.splice(0, data.length);
//       await fs.writeFile(this.path, JSON.stringify(data, null, 2));
//       return data;
//     } catch (error) {
//       throw error;
//     }
//   }

