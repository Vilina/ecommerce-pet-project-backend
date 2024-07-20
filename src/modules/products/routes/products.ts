import express from 'express';
import * as ProductController from '../controller/productController';
import imageUpload  from "../../../middleware/image-upload/multer";
import imageUpdateDelete from "../../../middleware/image-update-delete/imageUpdateDelete";

const router = express.Router();

// POST /products - Create a new product
router.post('/products', imageUpload, ProductController.createProduct);

// GET /products/:id - Retrieve a product by its ID
router.get('/products/:id', ProductController.getProductById);

// GET /products - Retrieve all products
router.get('/products', ProductController.getAllProducts);

// PUT /products/:id - Update a product by its ID
router.put('/products/:id',imageUpdateDelete, ProductController.updateProductById);

// DELETE /products/:id - Delete a product by its ID
router.delete('/products/:id', imageUpdateDelete, ProductController.deleteProductById);

export default router;
