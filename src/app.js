const express = require('express');
const app = express();

const productRouter = require('./routers/productRouter');
const cartRouter = require('./routers/cartRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);

module.exports = app;