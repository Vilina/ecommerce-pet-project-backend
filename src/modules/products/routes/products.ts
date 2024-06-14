import express from 'express';
import * as ProductController from '../controller/productController';


const router = express.Router();

// POST /products - Create a new product
router.post('/product', ProductController.createProduct);

// GET /products/:id - Retrieve a product by its ID
router.get('/products/:id', ProductController.getProductById);

// GET /products - Retrieve all products
router.get('/products', ProductController.getAllProducts);

// PUT /products/:id - Update a product by its ID
router.put('/product/:id', ProductController.updateProductById);

// DELETE /products/:id - Delete a product by its ID
router.delete('/product/:id', ProductController.deleteProductById);

export default router;