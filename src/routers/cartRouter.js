const express = require('express');
const cartRouter = express.Router();

const Cart = require("../ClassContainer/Cart");
const cartManager = new Cart();

const Products = require("../ClassContainer/Products");
const productsManager = new Products();

//GET: '/' -  Obtener todos los productos del carrito
cartRouter.get("/", async (req, res) => {
    try {
        const cart = await cartManager.cartList();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
            error: -1,
            description: error.message,
            status: 500
        });
    }
});

//GET: '/:id/productos' - listar todos los productos guardados en el carrito
cartRouter.get("/:id/products", async (req, res) => {
    try {
        const cart = await cartManager.cartProducts(req.params.id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
            error: -1,
            description: error.message,
            status: 500
        });
    }
});

//POST: '/' - Crea un carrito y devuelve su id.
cartRouter.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.newCart();
        res.status(200).json(newCart);
    } catch (error) {
        res.status(500).json({
            error: -1,
            description: error.message,
            status: 500
        });
    }
});

//POST: '/:id/productos' - incorporar productos al carrito por su id de producto
cartRouter.post("/:id/products", async (req, res) => {
    try {
        const product = await productsManager.save(req.body);
        const cart = await cartManager.addProduct(req.params.id, product);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
            error: -1,
            description: error.message,
            status: 500
        });
    }
});

//DELETE: '/:id' - Vacía un carrito y lo elimina.
cartRouter.delete("/:id", async (req, res) => {
    try {
        const cart = await cartManager.deleteCart(req.params.id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
            error: -1,
            description: error.message,
            status: 500
        });
    }
});

//DELETE: '/:id/productos/:productId' - Eliminar un producto del carrito por su id de carrito y de producto
cartRouter.delete("/:id/products/:productId", async (req, res) => {
    try {
        const cart = await cartManager.removeProduct(req.params.id, req.params.productId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
            error: -1,
            description: error.message,
            status: 500
        });
    }
});

module.exports = cartRouter;