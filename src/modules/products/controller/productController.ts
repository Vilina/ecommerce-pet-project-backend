import { Request, Response } from 'express';
import ProductDao from '../dao/ProductDao';
import ProductModel from '../model/ProductModel';

/**
 * Creates a new product.
 * @param req - The request object.
 * @param res - The response object.
 */

export const createProduct = async (req: any, res: Response) => {
  try {
    const productDao = new ProductDao(ProductModel);
    if (req.files && req.files.length > 0) {
      // Assert the type of req.files to Express.Multer.File[]
      const files = req.files as Express.Multer.File[];
      const filePaths: string[] =
        files?.map((file) => `uploads/${file.filename}`) || [];
      // Prepare product data including file paths
      const productObject = JSON.parse(req.body.data);
      const productData = {
        ...productObject,
        image: [...filePaths, ...productObject.image],
      };
      const product = await productDao.createProduct(productData);
      res.status(201).json(product);
    } else {
      const product = await productDao.createProduct(req.body);
      res.status(201).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

/**
 * Finds a product by its ID.
 * @param req - The request object.
 * @param res - The response object.
 */
export const getProductById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productDao = new ProductDao(ProductModel);
    const product = await productDao.findProductById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error finding product', error });
  }
};

/**
 * Finds all products.
 * @param req - The request object.
 * @param res - The response object.
 */
export const getAllProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productDao = new ProductDao(ProductModel);
    const products = await productDao.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error finding products', error });
  }
};

/**
 * Updates a product by its ID.
 * @param req - The request object.
 * @param res - The response object.
 */
export const updateProductById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productDao = new ProductDao(ProductModel);
    const product = await productDao.updateProductById(req.params.id, req.body);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

/**
 * Deletes a product by its ID.
 * @param req - The request object.
 * @param res - The response object.
 */
export const deleteProductById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const productDao = new ProductDao(ProductModel);
    const product = await productDao.deleteProductById(req.params.id);
    if (product) {
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
