import mongoose, { Schema, Document, model } from 'mongoose';

// Define a TypeScript interface for your document
export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  quantity: number;
  createdAt: Date;
}

// Define the Mongoose schema
const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, min: 1 },
  description: { type: String },
  imageUrl: { type: String },
  quantity: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

// Create the model
export const Product = model<IProduct>('Product', ProductSchema);
