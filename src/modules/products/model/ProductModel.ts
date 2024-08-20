import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  imageKeys: string[]; // Array of keys that are saved in the S3 bucket
  color: string[];
  manufacturer: string;
  sale: boolean;
  ratings: number;
  salePrice: number;
  soldCount: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  imageUrls?: string[]; // Array of full URLs to the images in the S3 bucket
  sellerId: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageKeys: { type: [String], required: true }, // Array of keys that are saved in the S3 bucket
    color: { type: [String], required: false },
    manufacturer: { type: String, required: true },
    sale: { type: Boolean, required: true },
    ratings: { type: Number, required: true },
    salePrice: { type: Number, required: false },
    soldCount: { type: Number, required: true },
    stock: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    imageUrls: { type: [String], required: false }, // Array of full URLs to the images in the S3 bucket
    sellerId: { type: String, required: true },
  },
  { timestamps: true },
);

// Create the Product model
const ProductModel = model<IProduct>('Product', productSchema);

export default ProductModel;
