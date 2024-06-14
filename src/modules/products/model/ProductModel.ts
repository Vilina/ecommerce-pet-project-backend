import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string[];
    color: string[];
    manufacturer: string;
    sale: boolean;
    ratings: number;
    salePrice: number;
    soldCount: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: [String], required: false },
    color: { type: [String], required: false },
    manufacturer: { type: String, required: true },
    sale: { type: Boolean, required: true },
    ratings:  { type: Number, required: true },
    salePrice: { type: Number, required: true },
    soldCount: { type: Number, required: true },
    stock: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Create the Product model
const ProductModel = model<IProduct>('Product', productSchema);

export default ProductModel;
