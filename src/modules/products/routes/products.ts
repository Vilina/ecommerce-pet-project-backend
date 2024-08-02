import express from 'express';
import * as ProductController from '../controller/productController';
import imageUpload  from "../../../middleware/image-upload/multer";
import {authenticateJwt} from "../../../middleware/passport/strategies/jwt/jwt-strategy";


const router = express.Router();

// POST /products - Create a new product
router.post('/products', imageUpload, ProductController.createProduct);

// GET /products/:id - Retrieve a product by its ID
router.get('/products/:id', ProductController.getProductById);

// GET /products - Retrieve all products
router.get('/products', authenticateJwt, ProductController.getAllProducts);

// PUT /products/:id - Update a product by its ID
router.put('/products/:id', ProductController.updateProductById);

// DELETE /products/:id - Delete a product by its ID
router.delete('/products/:id', ProductController.deleteProductById);

export default router;