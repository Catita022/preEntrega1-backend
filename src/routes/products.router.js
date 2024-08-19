
import { Router } from 'express'
import ProductManager from '../service/ProductManager.js'


const router = Router();

const productManager = new ProductManager();


// Aqui van las apis 


// GET

router.get('/', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productManager.getAllProducts(limit)
        res.json(products)
    } catch (error) {
        console.log(error)
    }
})

// busca producto por id

router.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid)
        const product = await productManager.getProductsById(productId);
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ error: 'productos no encontrado' });
        }

    } catch (error) {
        console.log(error )
    }
})

//POST

router.post('/', async (req, res) => {
    try {

        const { title, description, code, price, stock, category, thumbnails } = req.body;
        if (!title || !description || !code || !price || !stock || !category)  {
            return res.status(400).json({ error: 'todos los campos son obligatorios menos thumbnails' });
        }
        const newProduct = await productManager.addProducts({ title, description, code, price, stock, category, thumbnails })
        res.status(201).json(newProduct)

    } catch (error) {
        console.log(error,'error');
    }
})






// PUT 


router.put('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const updateProduct = await productManager.updateProduct(productId, req.body)

        if (updateProduct) {
            res.json(updateProduct)
        } else {
            res.status(404).json({ error: 'producto no encontrado' });
        }

    } catch (error) {
        console.log(error)

    }
})

// DELETE 

router.delete('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const deleteProduct = await productManager.deleteProduct(productId);

        if (deleteProduct) {
            res.json(deleteProduct);
        } else {
            res.status(400).json({ error: 'el producto no se pudo encontrar' })
        }

    } catch (error) {
        console.log(error)

    }
})

export default router;