import { Schema, model, Document, Types } from 'mongoose';
import { IUser } from '../../users/model/UserModel';
import { IProduct } from '../../products/model/ProductModel';

// Define the IOrder interface
export interface IOrder extends Document {
    user: Types.ObjectId | IUser;
    products: {
        product: Types.ObjectId | IProduct;
        quantity: number;
    }[];
    totalPrice: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new Schema<IOrder>({
    user: { type: Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
    }],
    totalPrice: { type: Number, required: true },
    status: { type: String, required: true, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true }); // Enable timestamps to automatically handle `createdAt` and `updatedAt`

// Create the Order model
const OrderModel = model<IOrder>('Order', orderSchema);

export default OrderModel;
