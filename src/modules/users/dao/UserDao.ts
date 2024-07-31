import BaseDao from '../../../dao/BaseDao';
import { IUser } from '../model/UserModel';
import { Model } from 'mongoose';

/**
 * Data Access Object (DAO) for User documents.
 * Extends BaseDao.
 */
export default class UserDao extends BaseDao<IUser> {
  /**
   * Creates an instance of UserDao.
   * @param {Model<IUser>} model - The Mongoose model associated with this DAO.
   */
  constructor(model: Model<IUser>) {
    super(model);
  }

  /**
   * Creates a new user.
   * @param {Partial<IUser>} data - The data for the new user.
   * @returns {Promise<IUser>} A promise that resolves to the created user.
   */
  async createUser(data: Partial<IUser>): Promise<IUser> {
    return this.create(data);
  }

  /**
   * Finds a user by their ID.
   * @param {string} id - The ID of the user to find.
   * @returns {Promise<IUser | null>} A promise that resolves to the found user, or null if not found.
   */
  async findUserById(id: string): Promise<IUser | null> {
    return this.findById(id);
  }

  /**
   * Finds a user by their username.
   * @param {string} username - The username of the user to find.
   * @returns {Promise<IUser | null>} A promise that resolves to the found user, or null if not found.
   */
  async findUserByUsername(username: string): Promise<IUser | null> {
    return this.findOne({ username });
  }

  /**
   * Finds all users.
   * @returns {Promise<IUser[]>} A promise that resolves to an array of all users.
   */
  async findAllUsers(): Promise<IUser[]> {
    return this.findAll();
  }

  /**
   * Updates a user by their ID.
   * @param {string} id - The ID of the user to update.
   * @param {Partial<IUser>} data - The data to update the user with.
   * @returns {Promise<IUser | null>} A promise that resolves to the updated user, or null if not found.
   */
  async updateUserById(
    id: string,
    data: Partial<IUser>,
  ): Promise<IUser | null> {
    return this.update(id, data);
  }

  /**
   * Deletes a user by their ID.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<IUser | null>} A promise that resolves to the deleted user, or null if not found.
   */
  async deleteUserById(id: string): Promise<IUser | null> {
    return this.delete(id);
  }

  /**
   * Finds a user by their email.
   * @param {string} email - The email of the user to find.
   * @returns {Promise<IUser | null>} A promise that resolves to the found user, or null if not found.
   */
  async findUserByEmail(email: string): Promise<IUser | null> {
    return this.findOne({ email });
  }
}
