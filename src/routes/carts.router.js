
import {Router} from 'express';
import Carts from '../service/Carts.js'

const router = Router();

const carrito = new Carts();

// post 
router.post('/',async (req,res)=>{
    try {
        const cart = await carrito.addCarts();
        res.json(carrito)
    } catch (error) {
        console.log(error)
    }
    
})

// get

router.get('/:cid', async (req,res)=>{
    try {
        const cartId = parseInt(req.params.cid)
        const cart = await carrito.getCartsId(cartId)
        
        if (cart) {
            res.json(cart)
        } else {
            res.status(404).json({ error: 'id no encontrado' });
        }
       
    } catch (error) {
        console.log(error)
        
    }
})

router.post('/:cid/product/:pid', async (req, res)=>{
    try {
        const carId = parseInt(req.params.cid);
        const prodId = parseInt(req.params.pid);
        const addProd = await carrito.addProductsCarts(carId,prodId) 
        if (addProd) {
            res.json(addProd)
        } else {
            res.status(404).json({ error: 'id no encontrado' });
        }
        
    } catch (error) {
        console.log(error)
        
    }
})

export default router;