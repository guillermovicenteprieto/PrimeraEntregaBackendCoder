const express = require('express');
const productRouter = express.Router();

const Products = require("../ClassContainer/Products");
const productsManager = new Products();

const admin = true

productRouter.get("/", async (req, res) => {
    try {
        const products = await productsManager.getAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            error: -1,
            description: error.message,
            status: 500
        });
    }
})

//GET: '/:id' -  Obtener producto por su id 
//(disponible para usuarios y administradores)
productRouter.get("/:id", async (req, res) => {
    if (admin) {
        try {
            const product = await productsManager.getById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({
                error: -1,
                description: error.message,
                status: 500
            });
        }
    } else {
        res.status(403).json({
            error: -1,
            description: `ruta ${req.baseUrl} no autorizada`,
            status: 403
        });
    }
});

//POST: '/' - Incorporar productos al listado 
//(disponible para administradores)
productRouter.post("/", async (req, res) => {
    if (admin) {
        try {
            const product = await productsManager.save(req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({
                error: -1,
                description: error.message,
                status: 500
            });

        }
    } else {
        res.status(403).json({
            error: -1,
            description: `ruta ${req.baseUrl} no autorizada`,
            status: 403
        });
    }
})

//PUT: '/:id' - Actualizar un producto por su id 
//(disponible para administradores)
productRouter.put("/:id", async (req, res) => {
    if (admin) {
        try {
            const product = await productsManager.updated(req.params.id, req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({
                error: -1,
                description: error.message,
                status: 500
            });
        }
    } else {
        res.status(403).json({
            error: -1,
            description: `ruta ${req.baseUrl} no autorizada`,
            status: 403
        });
    }
})

//DELETE: '/:id' - Borrar un producto por su id 
//(disponible para administradores)
productRouter.delete("/:id", async (req, res) => {
    if (admin) {
        try {
            const product = await productsManager.deleteByiD(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({
                error: -1,
                description: error.message,
                status: 500
            });
        }
    } else {
        res.status(403).json({
            error: -1,
            description: `ruta ${req.baseUrl} no autorizada`,
            status: 403
        });
    }
});

module.exports = productRouter;
