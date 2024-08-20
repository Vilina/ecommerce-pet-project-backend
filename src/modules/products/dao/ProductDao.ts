import BaseDao from '../../../dao/BaseDao';
import { IProduct } from '../model/ProductModel';
import { Model } from 'mongoose';

/**
 * Data Access Object (DAO) for Product documents.
 * Extends BaseDao.
 */
export default class ProductDao extends BaseDao<IProduct> {
  /**
   * Creates an instance of ProductDao.
   * @param {Model<IProduct>} model - The Mongoose model associated with this DAO.
   */
  constructor(model: Model<IProduct>) {
    super(model);
  }

  /**
   * Creates a new product.
   * @param {Partial<IProduct>} data - The data for the new product.
   * @returns {Promise<IProduct>} A promise that resolves to the created product.
   */
  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    return this.create(data);
  }

  /**
   * Finds a product by its ID.
   * @param {string} id - The ID of the product to find.
   * @returns {Promise<IProduct | null>} A promise that resolves to the found product, or null if not found.
   */
  async findProductById(id: string): Promise<IProduct | null> {
    return this.findById(id);
  }

  /**
   * Finds all products.
   * @returns {Promise<IProduct[]>} A promise that resolves to an array of all products.
   */
  async findAllProducts(): Promise<IProduct[]> {
    return this.findAll();
  }

  /**
   * Updates a product by its ID.
   * @param {string} id - The ID of the product to update.
   * @param {Partial<IProduct>} data - The data to update the product with.
   * @returns {Promise<IProduct | null>} A promise that resolves to the updated product, or null if not found.
   */
  async updateProductById(
    id: string,
    data: Partial<IProduct>,
  ): Promise<IProduct | null> {
    return this.update(id, data);
  }

  /**
   * Deletes a product by its ID.
   * @param {string} id - The ID of the product to delete.
   * @returns {Promise<IProduct | null>} A promise that resolves to the deleted product, or null if not found.
   */
  async deleteProductById(id: string): Promise<IProduct | null> {
    return this.delete(id);
  }

  /**
   * Finds all products by the seller's ID.
   * @param {string} sellerId - The seller ID to search for.
   * @returns {Promise<IProduct[]>} A promise that resolves to an array of products for the given seller ID.
   */
  async findProductsBySellerId(sellerId: string): Promise<IProduct[]> {
    return this.getModel().find({ sellerId }).exec();
  }
}
