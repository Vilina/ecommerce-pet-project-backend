import { Schema, model, Document, Types } from 'mongoose';

// Define the IUser interface
export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  role: string;
  firstName: string;
  lastName: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  wishlist: Types.ObjectId[]; // References to Product
  orderHistory: Types.ObjectId[]; // References to Order
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user', // Default role
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    phone: { type: String, required: true },
    wishlist: [{ type: Types.ObjectId, ref: 'Product' }],
    orderHistory: [{ type: Types.ObjectId, ref: 'Order' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// Create the User model
const UserModel = model<IUser>('User', userSchema);

export default UserModel;
