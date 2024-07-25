import { Schema, model, Document, Types } from 'mongoose';

export interface IToken extends Document {
    userId: Types.ObjectId;
    token: string;
    type: 'access' | 'refresh' | 'blacklist';
    expiresAt: Date;
}

const tokenSchema = new Schema<IToken>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    type: { type: String, required: true, enum: ['access', 'refresh', 'blacklist'] },
    expiresAt: { type: Date, required: true }
}, { timestamps: true });

const TokenModel = model<IToken>('Token', tokenSchema);
export default TokenModel;
