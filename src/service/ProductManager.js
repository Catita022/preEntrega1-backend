
import fs from 'fs/promises'
import path from 'path'



const productosFilePath = path.resolve('../data', 'productos.json')



export default class ProductManager {
    constructor() {
        this.products = []
        this.init()
    }

    async init() {
        try {
            const data = await fs.readFile(productosFilePath, 'utf-8')
            this.products = JSON.parse(data)
        } catch (error) {
            this.products = []

        }
    }

    saveToFile() {
        fs.writeFile(productosFilePath, JSON.stringify(this.products, null, 2));
    }

    //obtener todos los productos
    getAllProducts(limit) {
        if (limit) {
            return this.products.slice(0, limit)
        }
        return this.products
    }

    // busca el productos por id
    getProductsById(id) {
        return this.products.find((p) => p.id === id)

    }

    // agregar productos
    addProducts(product) {
        const newProduct = {
            id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
            ...product,
            status: true

        };

        this.products.push(newProduct)
        this.saveToFile()
        return newProduct;
    }

    // actualiza productos
    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex((p) => p.id === id)

        if (productIndex === -1) return null;

        const updateProduct = {
            ...this.products[productIndex],
            ...updatedFields,
            id: this.products[productIndex].id //para q el id no se actucalice
        }
        this.products[productIndex] = updateProduct;
        this.saveToFile();
        return updateProduct;


    }

    // borra producto
    deleteProduct(id) {
        const prodIndex = this.products.findIndex((p) => p.id === id)
        if (prodIndex === -1) {
            return null
        }
        const deleteProduct = this.products.splice(prodIndex, 1);
        this.saveToFile();
        return deleteProduct[0];
    }
}