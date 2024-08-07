import { Model, Types } from 'mongoose';
import BaseDao from '../../../../../dao/BaseDao';
import { IToken } from '../model/TokenModel';

class TokenDao extends BaseDao<IToken> {
  constructor(model: Model<IToken>) {
    super(model);
  }

  /**
   * Blacklists a token by saving it to the database with an expiry date.
   * @param {string} token - The JWT token to blacklist.
   * @param {Date} expiryDate - The expiry date of the token.
   * @param {ObjectId} userId - The userId of the user.
   * @returns {Promise<void>}
   */

  async blacklistToken(
    token: string,
    expiryDate: Date,
    userId: Types.ObjectId,
  ): Promise<void> {
    const existingToken = await this.findOne({ token });
    if (!existingToken) {
      await this.create({
        token,
        expiresAt: expiryDate,
        type: 'blacklist',
        userId,
      });
    }
  }
  /**
   * Checks if a token is blacklisted.
   * @param {string} token - The JWT token to check.
   * @returns {Promise<boolean>}
   */
  async isTokenBlacklisted(token: string): Promise<boolean> {
    const tokenRecord = await this.findOne({ token, type: 'blacklist' });
    return !!tokenRecord && tokenRecord.expiresAt > new Date();
  }
}

export default TokenDao;
