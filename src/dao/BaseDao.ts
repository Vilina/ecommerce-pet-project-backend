import { Model, Document } from 'mongoose';

/**
 * Base Data Access Object (DAO) providing common CRUD operations.
 * @template T - The type of document managed by this DAO.
 */
export default class BaseDao<T extends Document> {
    private model: Model<T>;

    /**
     * Creates an instance of BaseDao.
     * @param {Model<T>} model - The Mongoose model associated with this DAO.
     */
    constructor(model: Model<T>) {
        this.model = model;
    }

    /**
     * Creates a new document.
     * @param {Partial<T>} data - The data for the new document.
     * @returns {Promise<T>} A promise that resolves to the created document.
     */
    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    /**
     * Finds a document by its ID.
     * @param {string} id - The ID of the document to find.
     * @returns {Promise<T | null>} A promise that resolves to the found document, or null if not found.
     */
    async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    /**
     * Finds a single document that matches the query.
     * @param {any} query - The query to match documents against.
     * @returns {Promise<T | null>} A promise that resolves to the found document, or null if not found.
     */
    async findOne(query: any): Promise<T | null> {
        return this.model.findOne(query).exec();
    }

    /**
     * Finds all documents that match the query.
     * @param {any} [query={}] - The query to match documents against (optional).
     * @returns {Promise<T[]>} A promise that resolves to an array of documents.
     */
    async findAll(query: any = {}): Promise<T[]> {
        return this.model.find(query).exec();
    }

    /**
     * Updates a document by its ID.
     * @param {string} id - The ID of the document to update.
     * @param {Partial<T>} data - The data to update the document with.
     * @returns {Promise<T | null>} A promise that resolves to the updated document, or null if not found.
     */
    async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    /**
     * Deletes a document by its ID.
     * @param {string} id - The ID of the document to delete.
     * @returns {Promise<T | null>} A promise that resolves to the deleted document, or null if not found.
     */
    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
