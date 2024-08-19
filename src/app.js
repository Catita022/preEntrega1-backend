import express from 'express';
import productsRouter from './routes/products.router.js';
import carts from './routes/carts.router.js';

const app = express();

// middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router

app.use('/api/products/', productsRouter)
app.use('/api/carts/', carts)

// levanto servidor

const PORT = 9090;
app.listen(PORT, () => {
    console.log(`escuchando en el puerto ${PORT}`)
});