const moment = require("moment");
const fs = require("fs").promises;

class Products {

    constructor() {
        this.path = "./src/db/products.txt";
        this.products = [];
        this.id = 1;
    }

    async getAll() {
        try {
            const data = await fs.readFile(this.path, "utf8");
            if (data) {
                this.products = JSON.parse(data);
                if (this.products.length > 0) {
                    this.id = this.products[this.products.length - 1].id + 1;
                } else {
                    this.id = 1;
                }
            }
            return this.products;
        } catch (error) {
            if (error.code === "ENOENT") {
                await fs.writeFile(this.path, JSON.stringify([], null, 2));
                return 'Aún no hay productos cargados';
            } else {
                throw new Error((
                    "Se produjo un error en getAll: " + error.message
                ));
            }
        }
    }

    async save(product) {
        try {
            const data = await this.getAll();
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
            data.push(product);
            await fs.writeFile(this.path, JSON.stringify(data, null, 2));
            this.id++;
            return product;
        } catch (error) {
            throw new Error((
                "Se produjo un error en save: " + error.message
            ));
        }
    }

    async getById(id) {
        try {
            const data = await this.getAll();
            const product = data.find((product) => product.id == parseInt(id));
            if (!product) {
                return 
            }
            return product;
        } catch (error) {
            throw new Error((
                "Se produjo un error en getById: " + error.message
            ));
        }
    }

    async updated(id, product) {
        try 
        {
            const data = await this.getAll();
            const index = data.findIndex((product) => product.id == id);
            data[index] = {
                id: id,
                timestamp: moment().format("L LTS"),
                ...product,
            };
            await fs.writeFile(this.path, JSON.stringify(data, null, 2));
            return data[index];
        } catch (error) {
            throw new Error((
                "Se produjo un error en updated: " + error.message
                    
            ));
        }
    }

    async deleteByiD(id) {
        try {
            const data = await this.getAll();
            const index = data.findIndex((product) => product.id == id);
            data.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(data, null, 2));
            return `Se ha eliminado el producto con id: ${id}`;
        } catch (error) {
            throw new Error((
                "Se produjo un error en deleteById: " + error.message
            ));
        }
    }
}

module.exports = Products;