

import fs from 'fs/promises';
import path from 'path';
// import {v4} from 'uuid';

const cartsFilePath = path.resolve('../data', 'carritos.json');

export default class Carts {
    constructor() {
        this.carts = [];
        this.init();

    }

    async init() {
        try {
            const data = await fs.readFile(cartsFilePath, 'utf-8')
            this.carts = JSON.parse(data)
        } catch (error) {
            this.carts = []

        }
    }

    saveToFile() {
        fs.writeFile(cartsFilePath, JSON.stringify(this.carts, null, 2));
    }


    addCarts() {
        const carrito = {
            id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
            products: []

        };

        this.carts.push(carrito)
        this.saveToFile()
        return carrito;
    }

    getCartsId(id) {

        const cartIndex = this.carts.findIndex((c) => c.id === id)
        
        
        return this.carts[cartIndex].products

    }

    addProductsCarts(carId, prodId) {
        const idCart = this.carts.findIndex(c => c.id === carId)
        const idProd = this.carts.findIndex(p => p.id === prodId)
        const miProd = this.carts[idCart].products['product']
        
        let cant = this.carts[idCart].products['quantity']
       

        miProd === prodId ? cant += 1 : cant = 1;
        
        
        const newProd = {
           
            product: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
            quantity: cant
        }
       
        this.carts[idCart].products = newProd


        this.saveToFile()
        return newProd

    }

}